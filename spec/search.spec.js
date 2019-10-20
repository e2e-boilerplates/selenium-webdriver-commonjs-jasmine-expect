const { Builder, By, Key } = require("selenium-webdriver");
require("chromedriver");

describe("google Search", () => {
  let browser;

  beforeAll(async () => {
    browser = await new Builder().forBrowser("chrome").build();
    browser.get("https://www.google.com");
  });

  it("should be on google search page", async () => {
    const title = await browser.getTitle();
    expect(title).toEqual("Google");
  });

  it("should search for Cheese!", async () => {
    const searchBox = await browser.findElement(By.name("q"));
    expect(await searchBox.isDisplayed()).toBe(true);
    searchBox.sendKeys("Cheese!", Key.ENTER);
  });

  it('the page title should start with "Cheese!"', async () => {
    const title = await browser.getTitle();
    const isTitleStartWithCheese = title.lastIndexOf("Cheese!", 0) === 0;
    expect(isTitleStartWithCheese).toBe(true);
  });

  afterAll(() => {
    browser.quit();
  });
});
