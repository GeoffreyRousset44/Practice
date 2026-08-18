import { test,expect } from "@playwright/test";


test.skip('Skip', async ({page}) => {
    //
})

test('Fail', async ({page}) => {
    test.fail(); 
})

test.fixme('Fixxy', async ({page}) => {
    //
})

test('Slow', async ({page}) => {
    test.slow();
})

//tags
test('Slow @smoke', async ({page}) => {
    test.slow();
    //to run: npx playwright test tests/tutorial/tuto12-annotations.spec.ts --grep @smoke
    //to skip: npx playwright test tests/tutorial/tuto12-annotations.spec.ts --grep-invert @smoke
})