import Sharedbox from '../src/sharedbox';
import * as chai from 'chai';
import * as Utils from '../src/Utils/platform.js';
import sinon from 'sinon';
import SharedBox from '../src/sharedbox';
import { SharedBoxException } from '../src/modules/SharedBoxException';

let expect = chai.expect;
let assert = chai.assert;

const SHAREDBOX_JSON = {
  'userEmail': 'user@acme.com',
  'guid': '1c820789a50747df8746aa5d71922a3f',
  'uploadUrl': 'upload_url',
  'recipients': [/* list of Recipient objects*/],
  'attachments': [/*list of Attachment objects*/],
  'message': 'lorem ipsum...',
  'subject': 'Donec rutrum congue leo eget malesuada.',
  'notificationLanguage': 'en',
  'securityOptions': {
    'allowRememberMe': true,
    'allowSms': true,
    'allowVoice': true,
    'allowEmail': true,
    'expirationValue': 5,
    'expirationUnit': 'days',
    'retentionPeriodType': 'do_not_discard',
    'retentionPeriodValue': null,
    'retentionPeriodUnit': 'hours',
    'allowManualClose': true
  },
  'userId': 1,
  'status': 'in_progress',
  'previewUrl': 'http://sharedbox.com/sharedboxes/dhjewg67ewtfg476/preview',
  'createdAt': '2018-05-24T14:45:35.062Z',
  'updatedAt': '2018-05-24T14:45:35.589Z',
  'expiration': '2018-05-31T14:45:35.038Z',
  'closedAt': null
};

export default describe('Client', () => {
  let client;

  beforeEach(() => {
    client = new Sharedbox.Client('api', 1, 'endpoint');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Constructor', () => {
    it('should be defined', () => {
      assert(client);
    });
    it('Should have initialized the properties with the right value', () => {
      expect(client['apiToken']).to.deep.equal('api');
      expect(client['userId']).to.deep.equal(1);
      expect(client['endpoint']).to.deep.equal('endpoint');
      assert.isDefined(client['jsonClient']);
    });
  });

  describe('initializeSharedBox function', () => {
    it('Should call the fetch method twice and return the updated SharedBox', () => {
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: true,
        text: () => { return 'endpoint/'; },
        status: 200,
        statusText: 'Everything\'s fine'
      });
      stub.onCall(1).resolves({
        status: 200,
        ok: true,
        json: () => { return new Promise((resolve) => { resolve({ guid: 'dc6f21e0f02c41123b795e4', uploadUrl: 'upload_url' }); }); },
        text: () => { return new Promise((resolve) => { resolve({ status: 501, statusText: 'An error as occuried' }); }); }
      });
      const sharedbox = new SharedBox.Helpers.Sharedbox({ userEmail: 'jonh.doe@me.com' });

      client.initializeSharedBox(sharedbox).then((result) => {
        expect(result.guid).to.deep.equal('dc6f21e0f02c41123b795e4');
        expect(result.uploadUrl).to.deep.equal('upload_url');
        assert(stub.calledTwice);
      }).catch(() => {
        assert(false);
      });
    });

    it('Should throw an error if the first fetch call respondes with a non-ok response', () => {
      // Arrange
      const sharedbox = new SharedBox.Helpers.Sharedbox({ userEmail: 'jonh.doe@me.com' });
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: false,
        status: 501,
        statusText: 'Internal server error',
      });
      stub.onCall(1).resolves({
        status: 200,
        ok: true,
        json: () => { return new Promise((resolve) => { resolve({ guid: 'dc6f21e0f02c41123b795e4', uploadUrl: 'upload_url' }); }); },
        text: () => { return new Promise((resolve) => { resolve({ status: 501, statusText: 'An error as occuried' }); }); }
      });

      // Act & Arrange
      expect(function () { client.initializeSharedBox(sharedbox); }, SharedBoxException);
    });

    it('Should throw an error if the second fetch call repondes with a non-ok response', () => {
      // Arrange
      const sharedbox = new SharedBox.Helpers.Sharedbox({ userEmail: 'jonh.doe@me.com' });
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: true,
        text: () => { return 'endpoint/'; },
      });
      stub.onCall(1).resolves({
        status: 501,
        ok: false,
        text: () => {
          return new Promise((resolve) => {
            resolve({
              status: 501,
              statusText: 'Internal Server Error'
            });
          });
        },
        statusText: 'Internal Server Error',
      });

      // Act & Arrange
      expect(function () { client.initializeSharedBox(sharedbox); }, SharedBoxException);
    });
  });

  describe('submitSharedbox function', () => {
    it('Should return exception if guid field is empty', () => {
      let sharedbox = new SharedBox.Helpers.Sharedbox();

      assert.throws(function () { client.submitSharedBox(sharedbox); }, SharedBoxException);
    });

    it('Should call the fetch method twice and return the updated SharedBox', () => {
      let sharedbox = new Sharedbox.Helpers.Sharedbox(SHAREDBOX_JSON);
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: true,
        text: () => { return 'endpoint/'; },
        status: 200,
        statusText: 'Everything\'s fine'
      });
      stub.onCall(1).resolves({
        status: 200,
        ok: true,
        json: () => {
          return new Promise((resolve) => {
            resolve({
              'guid': '1c820789a50747df8746aa5d71922a3f',
              'userId': 3,
              'subject': 'Donec rutrum congue leo eget malesuada.',
              'expiration': '2018-12-06T05:38:09.951Z',
              'notificationLanguage': 'en',
              'status': 'in_progress',
              'allowRememberMe': false,
              'allowSms': false,
              'allowVoice': false,
              'allowEmail': true,
              'retentionPeriodType': 'discard_at_expiration',
              'retentionPeriodValue': null,
              'retentionPeriodUnit': null,
              'previewUrl': 'http://sharedbox.com/sharedboxes/dhjewg67ewtfg476/preview',
              'createdAt': '2018-12-05T22:38:09.965Z',
              'updatedAt': '2018-12-05T22:38:09.965Z'
            });
          });
        },
        text: () => { return new Promise((resolve) => { resolve({ status: 501, statusText: 'An error as occuried' }); }); }
      });

      client.initializeSharedBox(sharedbox).then((res) => {
        assert(stub.calledTwice);
        expect(res.securityOptions).to.be.an('object');
        expect(stub.getCall(0).args[0]).to.be.a('string');
        expect(stub.getCall(1).args[1]).to.be.an('object');
      });
    });

    
  });

  afterEach(() => {
    sinon.restore();
  });
});
