import Sharedbox from '../src/sharedbox';
import * as chai from 'chai';
import * as Utils from '../src/Utils/platform.js';
import sinon from 'sinon';

let expect = chai.expect;
let assert = chai.assert;

export default describe('Client', () => {
  const SHAREDBOX = {
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

    it('Should have initialized the apiToken with the right value', () => {
      expect(client['apiToken']).to.deep.equal('api');
    });
    it('Should have initialized the userId with the right value', () => {
      expect(client['userId']).to.deep.equal(1);
    });
    it('Should have initialized the endpoint with the right value', () => {
      expect(client['endpoint']).to.deep.equal('endpoint');
    });
    it('Should have initialized the jsonClient', () => {
      assert.isDefined(client['jsonClient']);
    });
  });


  describe('initializeSharedBox function', () => {
    it('Should have called the fetch method twice', () => {
      let stub = sinon.stub(Utils, 'fetch').onCall(0).resolves({
        status: 200,
        text: () => {
          return '';
        },
        json: () => {
          return '';
        },
        statusText: '',
        ok: true
      });
      stub.onCall(1).resolves({
        text: () => {
          return new Promise((resolve) => {
            resolve({});
          });
        },
        status: 200,
        json: () => {
          return '';
        },
        statusText: '',
        ok: true
      });

      client.initializeSharedBox(SHAREDBOX).then(() => {
        assert(stub.calledTwice);
      });
    });
  });
});
