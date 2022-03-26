// import _ from 'lodash';
import { remote } from 'webdriverio';
import { startServer } from '../../lib/server';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import { HOST, PORT, MOCHA_TIMEOUT, APP_NAME } from '../utils';

chai.should();
chai.use(chaiAsPromised);

const CAPS = {
  platformName: 'Linux',
  automationName: 'atspi2',
  appName: APP_NAME
};

describe('AtSpi2Driver - elements interaction', function () {
  this.timeout(MOCHA_TIMEOUT);

  let server;
  let driver;
  before(async function () {
    server = await startServer(PORT, HOST);
  });
  after(async function () {
    if (server) {
      await server.close();
      server = null;
    }
  });
  beforeEach(async function () {
    driver = await remote({
      hostname: HOST,
      port: PORT,
      capabilities: CAPS,
    });
  });
  afterEach(async function () {
    if (driver) {
      try {
        await driver.deleteSession();
      } finally {
        driver = null;
      }
    }
  });

  it('should set a text to a text view', async function () {
    const el = await driver.findElement('name', 'Find');
    await el.click();
    const txtEl = await driver.findElement('xpath', '(//text[@name="Search"])[1]');
    await txtEl.click();
    await driver.elementSendKeys(txtEl, 'hello world');
    await driver.getElementText(txtEl).should.eventually.eql('hello world');
  });

  // it('should click a button by absolute coordinate', async function () {
  //   const el = _.first(await driver.findElements('-ios predicate string', 'elementType == 12 AND label == "bold"'));
  //   const {x, y, width, height} = await driver.getElementAttribute(el, 'frame');
  //   await driver.executeScript('macos: click', {
  //     x: x + width / 2,
  //     y: y + height / 2,
  //   });
  //   const els = await driver.findElements('-ios predicate string', 'value == "Bold" AND label == "type face"');
  //   els.length.should.eql(1);
  // });

  // it('should clear a text view', async function () {
  //   const el = await driver.findElement('class name', 'XCUIElementTypeTextView');
  //   await driver.elementSendKeys(el, 'hello world');
  //   await driver.getElementText(el).should.eventually.eql('hello world');
  //   await driver.elementClear(el);
  //   await driver.getElementText(el).should.eventually.eql('');
  // });

  // it('should send keys with modifiers into a text view', async function () {
  //   const el = await driver.findElement('class name', 'XCUIElementTypeTextView');
  //   await driver.elementClick(el);
  //   const flagsShift = 1 << 1;
  //   await driver.executeScript('macos: keys', {
  //     keys: [{
  //       key: 'h',
  //       modifierFlags: flagsShift,
  //     }, {
  //       key: 'i',
  //       modifierFlags: flagsShift,
  //     }]
  //   });
  //   await driver.getElementText(el).should.eventually.eql('HI');
  // });

  // it('should open context menu if left click with Ctrl depressed', async function () {
  //   const el = await driver.findElement('class name', 'XCUIElementTypeTextView');
  //   const flagsCtrl = 1 << 2;
  //   await driver.executeScript('macos: click', {
  //     elementId: el,
  //     keyModifierFlags: flagsCtrl,
  //   });
  //   const els = await driver.findElements('-ios predicate string', `title == 'Import Image'`);
  //   els.length.should.be.above(1);
  // });

});
