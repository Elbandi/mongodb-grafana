import prunk from 'prunk';
import { JSDOM } from 'jsdom';
import chai from 'chai';

// Mock Grafana modules that are not available outside of the core project
// Required for loading module.js
prunk.mock('./css/query-editor.css!', 'no css, dude.');
prunk.mock('app/plugins/sdk', {
    QueryCtrl: null
});

// Setup jsdom
// Required for loading angularjs
const dom = new JSDOM('<html><head><script></script></head><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Setup Chai
chai.should();
global.assert = chai.assert;
global.expect = chai.expect;
