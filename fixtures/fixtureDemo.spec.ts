import {test} from '@playwright/test'

test('test1', async({page}) => {
    console.log('This is test1')
    await page.goto('https://playwright.dev')
})


test('test2', async({page}) => {
    console.log('This is test2')
    await page.goto('https://www.google.fr')
    
})