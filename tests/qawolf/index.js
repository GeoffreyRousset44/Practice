// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

const TARGET = 100;

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  const articles = [];
  const seenIds = new Set();

  // HN shows 30 articles per page, so follow the "More" link until we have 100
  while (articles.length < TARGET) {
    await page.waitForSelector("tr.athing.submission");

    const pageArticles = await page.$$eval("tr.athing.submission", (rows) =>
      rows.map((row) => {
        const subtext = row.nextElementSibling;
        const age = subtext && subtext.querySelector("span.age");
        return {
          id: row.getAttribute("id"),
          title: (row.querySelector(".titleline a") || {}).textContent || "",
          // the age span's title holds the exact submission time, e.g.
          // "2024-05-01T12:34:56 1714566896"
          timestamp: age ? age.getAttribute("title") : null,
        };
      })
    );

    for (const article of pageArticles) {
      if (articles.length >= TARGET) break;
      if (seenIds.has(article.id)) continue; // guard against overlap between pages
      if (!article.timestamp) {
        throw new Error(`Article ${article.id} has no timestamp`);
      }
      seenIds.add(article.id);
      articles.push({
        ...article,
        // prefer the epoch seconds when present, otherwise parse the ISO part
        time: parseTimestamp(article.timestamp),
      });
    }

    if (articles.length >= TARGET) break;

    const more = page.locator("a.morelink");
    if ((await more.count()) === 0) {
      throw new Error(
        `Ran out of pages with only ${articles.length} articles collected`
      );
    }
    await Promise.all([page.waitForLoadState("load"), more.click()]);
  }

  // validate we got EXACTLY 100 articles
  if (articles.length !== TARGET) {
    throw new Error(`Expected exactly ${TARGET} articles, got ${articles.length}`);
  }

  // validate newest -> oldest ordering
  const failures = [];
  for (let i = 1; i < articles.length; i++) {
    if (articles[i].time > articles[i - 1].time) {
      failures.push(
        `#${i} "${articles[i].title}" (${articles[i].timestamp}) is newer than ` +
          `#${i - 1} "${articles[i - 1].title}" (${articles[i - 1].timestamp})`
      );
    }
  }

  if (failures.length > 0) {
    console.error(`FAIL: ${failures.length} ordering violation(s):`);
    failures.forEach((f) => console.error(`  - ${f}`));
  } else {
    console.log(
      `PASS: exactly ${TARGET} articles, sorted from newest to oldest ` +
        `(${articles[0].timestamp} -> ${articles[TARGET - 1].timestamp})`
    );
  }

  await browser.close();

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

function parseTimestamp(title) {
  // title looks like "2024-05-01T12:34:56 1714566896" (epoch may be absent)
  const [iso, epoch] = title.split(" ");
  if (epoch && /^\d+$/.test(epoch)) return Number(epoch) * 1000;
  const parsed = Date.parse(`${iso}Z`);
  if (Number.isNaN(parsed)) throw new Error(`Unparseable timestamp: ${title}`);
  return parsed;
}

(async () => {
  await sortHackerNewsArticles();
})();
