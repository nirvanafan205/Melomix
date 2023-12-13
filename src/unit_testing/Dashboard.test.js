// Dashboard.test.js
const { expect, assert} = require('chai');
const puppeteer = require('puppeteer');

describe('Dashboard Test', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  it('should load the dashboard and display a search bar', async () => {
    
    await page.goto('http://localhost:5173/dashboard'); // Update with your actual development server port
   
   //Test if the dashboard search bar is present
    await page.waitForTimeout(1000)
    const searchElement = await page.waitForSelector('form > .form-control'); 
    assert.isNotNull(searchElement)
  });

  it('should display "No tracks found" if search yields no results', async () => {
    const searchBtn = await page.waitForSelector('form > button');
    await page.type('input[type="text"]', 'asdasdasfgfasfasfgdfasfdasdasf');
    await page.waitForTimeout(1000)
    await searchBtn.click()
    await searchBtn.dispose();
    const trackTextElement = await page.waitForSelector('.albums-container > .text-secondary');
    const trackText = await page.evaluate(trackTextElement => trackTextElement.textContent, trackTextElement);

    assert.equal(trackText, "No tracks found")

  });

  it('when searching for valid input, a list of items should populate the screen', async () => {
    const searchBtn = await page.waitForSelector('form > button');
    //Removing previous text
    await page.focus('.form-control');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
  //testing
    console.log("test")
    
    await page.type('input[type="text"]', 'peee');
    await page.waitForTimeout(1000)
    await searchBtn.click()
    await page.waitForTimeout(2000)

   const albumContainer = await page.waitForSelector('.albums-container > .album-container');
   assert.isNotNull(albumContainer)
    //
  });

  //ButtonRSWP rswp__toggle _ControlsButtonRSWP __3hmsj

  it("when selecting a valid input's play button, a spotify player and lyrics button should appear", async () => {
    const itemButton = await page.waitForSelector('.album-container > button');
    //Removing previous text
    await itemButton.click()
    await page.waitForTimeout(3000)
    
    const spotifyBtn = await page.waitForSelector('[class*="ButtonRSWP"]');
    const lyricsBtn = await page.waitForSelector('[class*="lyrics-button"]');
    assert.isNotNull(spotifyBtn)
    assert.isNotNull(lyricsBtn)
  });

});
