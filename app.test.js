const chalk = require('chalk')
const puppeteer = require('puppeteer')

const timeout = 15000
browser = null

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
// NOTE: use node app.js before running test script
// TODO: should maybe do that here
describe(
  '/ (Home Page)',
  () => {
    let page
    beforeEach(async () => {
      console.log(chalk.green('Setup Puppeteer'))
      browser = await puppeteer.launch({
        headless: false
      })
      page = await browser.newPage()
      await page.goto('http://localhost:8080', 
        { waitUntil: 'networkidle0' })
    }, timeout)

    afterEach(async () => {
      await page.close()
      console.log(chalk.green('Teardown Puppeteer'))
      await browser.close()
      browser = null
    })

    it('Takes height of 200 cm and weight of 80 kg and returns 20', async () => {
      await page.$eval('#cm', el => el.value = "200")
      await page.$eval('#kg', el => el.value = "80")
      await page.click('#send')
      await page.waitForSelector('body');
      await delay(2000);
      let text = await page.evaluate(() => document.body.textContent)
      console.log(text);
      expect(text).toContain('Note:')
      expect(text).toContain('Your body mass index is')
      expect(text).toContain('20')});

    it('Takes height of 0 cm and weight of 80 kg and returns null', async () => {
      await page.$eval('#cm', el => el.value = "0")
      await page.$eval('#kg', el => el.value = "80")
      await page.click('#send')
      await page.waitForSelector('body');
      await delay(2000);
      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('Please enter your details!')
    })
  },
  timeout
)

// ------------------ UNIT TESTS ------------------

const bmiCategory = require('./bmiCategory')
const waistHipRatio = require ('./waistHipRatio')

test('18 is underweight', () => {
  expect(bmiCategory(18)).toBe("underweight");
});
test('21 is healthy', () => {
  expect(bmiCategory(21)).toBe("healthy");
});
test('28 is overweight', () => {
  expect(bmiCategory(28)).toBe("overweight");
});
test('32 is obese', () => {
  expect(bmiCategory(32)).toBe("obese");
});

test('0.85 and male is healthy', () => {
  expect(waistHipRatio(0.85, "male")).toBe("healthy");
});
test('0.75 and female is healthy', () => {
  expect(waistHipRatio(0.75, "female")).toBe("healthy");
});
test('0.90 and male is overweight', () => {
  expect(waistHipRatio(0.90, "male")).toBe("overweight");
});
test('0.84 and female is overweight', () => {
  expect(waistHipRatio(0.84, "female")).toBe("overweight");
});
test('1 and male is obese', () => {
  expect(waistHipRatio(1, "male")).toBe("obese");
});
test('0.85 and female is obese', () => {
  expect(waistHipRatio(0.85, "female")).toBe("obese");
});
