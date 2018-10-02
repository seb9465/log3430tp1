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
const RECIPIENT_JSON = {
  'id': '59adbccb-87cc-4224-bfd7-314dae796e48',
  'firstName': 'John',
  'lastName': 'Doe',
  'email': 'john.doe@email.com',
  'options': {
    'locked': false,
    'bouncedEmail': false,
    'verified': false,
    'contactMethods': [
      {
        'id': 1,
        'destination': '+55555555555',
        'destinationType': 'office_phone',
        'verified': false,
        'createdAt': '2018-09-01T16:26:07-04:00',
        'updatedAt': '2018-09-01T16:26:07-04:00'
      },
      {
        'id': 2,
        'destination': '+1111111111',
        'destinationType': 'cell_phone',
        'verified': true,
        'createdAt': '2018-09-01T16:26:07-04:00',
        'updatedAt': '2018-09-01T16:26:07-04:00'
      }
    ]
  }
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

    it('Should throw an error if the first fetch called respondes with a non-ok response', () => {
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
      expect(() => { client.initializeSharedBox(sharedbox); }, SharedBoxException);
    });

    it('Should throw an error if the second fetch called respondes with a non-ok response', () => {
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
      expect(() => { client.initializeSharedBox(sharedbox); }, SharedBoxException);
    });
  });

  describe('submitSharedbox function', () => {
    it('Should return exception if guid field is empty', () => {
      // Arrange
      let sharedbox = new SharedBox.Helpers.Sharedbox();

      // Act & Arrange
      assert.throws(() => { client.submitSharedBox(sharedbox); }, SharedBoxException);
    });

    it('Should call the fetch method twice and return the updated SharedBox', () => {
      // Arrange
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

      // Act
      client.submitSharedBox(sharedbox).then((res) => {
        // Assert
        assert(stub.calledTwice);
        expect(res.securityOptions).to.be.an('object');
        expect(stub.getCall(0).args[0]).to.be.a('string');
        expect(stub.getCall(0).args[1]).to.be.an('object');
        expect(stub.getCall(1).args[0]).to.be.an('string');
        expect(stub.getCall(1).args[1]).to.be.an('object');
      });
    });

    it('Should throw an error if the first fetch called respondes with a non-ok response', () => {
      // Arrange
      const sharedbox = new Sharedbox.Helpers.Sharedbox(SHAREDBOX_JSON);
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: false,
        status: 501,
        statusText: 'Internal server error',
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

      // Act & Assert
      expect(() => { client.submitSharedBox(sharedbox); }, SharedBoxException);
    });

    it('Should throw an error if the second fetch called respondes with a non-ok response', () => {
      // Arrange
      let sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_JSON);
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: true,
        text: () => { return 'endpoint/'; },
        status: 200,
        statusText: 'Everything\'s fine'
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
      expect(() => { client.sbmitSharedBox(sharedbox); }, SharedBoxException);
    });
  });

  describe('addRecipient function', () => {
    it('Should throw an error if the sharedbox\'s guid is undefined', () => {
      // Arrange
      const sharedbox = new SharedBox.Helpers.Sharedbox();
      const recipient = new SharedBox.Helpers.Recipient(RECIPIENT_JSON);

      // Act & Assert
      assert.throws(() => { client.addRecipient(sharedbox, recipient); }, SharedBoxException, 'SharedBox GUID cannot be null or undefined');
    });

    it('Should throw an error if the recipient\'s email is undefined', () => {
      const sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_JSON);
      const recipient = new SharedBox.Helpers.Recipient();

      // Act & Asser
      assert.throws(() => { client.addRecipient(sharedbox, recipient); }, SharedBoxException, 'Recipient email cannot be null or undefined');
    });

    it('Should return the updated recipient', () => {
      const sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_JSON);
      const recipient = new SharedBox.Helpers.Recipient(RECIPIENT_JSON);
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: true,
        text: () => { return 'endpoint/'; },
        status: 200,
        statusText: 'Everything\'s fine',
      });
      stub.onCall(1).resolves({
        status: 200,
        ok: true,
        json: () => {
          return new Promise((resolve) => {
            resolve({
              'id': '59adbccb-87cc-4224-bfd7-314dae796e48',
              'firstName': 'John',
              'lastName': 'Doe',
              'email': 'john.doe@email.com',
              'options': {
                'locked': false,
                'bouncedEmail': false,
                'verified': false,
                'contactMethods': [
                  {
                    'id': 1,
                    'destination': '+55555555555',
                    'destinationType': 'office_phone',
                    'verified': false,
                    'createdAt': '2018-09-01T16:26:07-04:00',
                    'updatedAt': '2018-09-01T16:26:07-04:00'
                  },
                  {
                    'id': 2,
                    'destination': '+1111111111',
                    'destinationType': 'cell_phone',
                    'verified': true,
                    'createdAt': '2018-09-01T16:26:07-04:00',
                    'updatedAt': '2018-09-01T16:26:07-04:00'
                  }
                ]
              }
            });
          });
        },
        text: () => { return new Promise((resolve) => { resolve({ status: 501, statusText: 'An error as occuried' }); }); }
      });

      const expectedSecondCallSuffix = `endpoint/api/sharedboxes/${SHAREDBOX_JSON.guid}/recipients`;

      client.addRecipient(sharedbox, recipient).then((res) => {
        expect(stub.getCall(1).args[0]).to.deep.equal(expectedSecondCallSuffix);
        expect(res).to.be.an('object');
        expect(sharedbox.recipients.length).to.equal(1);
      }).catch(() => {
        assert(false);
      });
    });

    it('Should throw and error if the first fetch called respondes with a non-ok response', () => {
      // Arrange
      const sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_JSON);
      const recipient = new SharedBox.Helpers.Recipient(RECIPIENT_JSON);
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: false,
        status: 501,
        statusText: 'Internal Server Error',
      });
      stub.onCall(1).resolves({
        status: 200,
        ok: true,
        json: () => {
          return new Promise((resolve) => {
            resolve({
              'id': '59adbccb-87cc-4224-bfd7-314dae796e48',
              'firstName': 'John',
              'lastName': 'Doe',
              'email': 'john.doe@email.com',
              'options': {
                'locked': false,
                'bouncedEmail': false,
                'verified': false,
                'contactMethods': [
                  {
                    'id': 1,
                    'destination': '+55555555555',
                    'destinationType': 'office_phone',
                    'verified': false,
                    'createdAt': '2018-09-01T16:26:07-04:00',
                    'updatedAt': '2018-09-01T16:26:07-04:00'
                  },
                  {
                    'id': 2,
                    'destination': '+1111111111',
                    'destinationType': 'cell_phone',
                    'verified': true,
                    'createdAt': '2018-09-01T16:26:07-04:00',
                    'updatedAt': '2018-09-01T16:26:07-04:00'
                  }
                ]
              }
            });
          });
        },
        text: () => { return new Promise((resolve) => { resolve({ status: 501, statusText: 'An error as occuried' }); }); }
      });

      // Act
      client.addRecipient(sharedbox, recipient).then(() => {
        assert(false);
      }).catch((err) => {
        // Assert
        expect(err).to.be.an('error');
      });
    });

    it('Should throw and error if the second fetch called respondes with a non-ok response', () => {
      const sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_JSON);
      const recipient = new SharedBox.Helpers.Recipient(RECIPIENT_JSON);
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: true,
        text: () => { return 'endpoint/'; },
        status: 200,
        statusText: 'Everything\'s fine',
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

      // Act
      client.addRecipient(sharedbox, recipient).then(() => {
        assert(false);
      }).catch((err) => {
        // Assert
        expect(err).to.be.an('error');
      });
    });
  });

  describe('closeSharedbox function', () => {
    it('Should throw an error if the sharebox\'s guid is undefined', () => {
      // Arrange
      const sharedbox = new SharedBox.Helpers.Sharedbox();

      // Act & Assert
      assert.throws(() => { client.closeSharedbox(sharedbox); }, SharedBoxException, 'SharedBox GUID cannot be null or undefined');
    });

    it('Should return the request result', () => {
      // Arrange
      const sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_JSON);
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: true,
        text: () => { return 'endpoint/'; },
        status: 200,
        statusText: 'Everything\'s fine',
      });
      stub.onCall(1).resolves({
        status: 200,
        ok: true,
        json: () => {
          return new Promise((resolve) => {
            resolve({
              'result': true,
              'message': 'Sharedbox successfully closed.'
            });
          });
        },
        text: () => { return new Promise((resolve) => { resolve({ status: 200, statusText: 'Everything\'s fine' }); }); }
      });
      const expectedSecondCallFirstArg = `endpoint/api/sharedboxes/${sharedbox.guid}/close`;
      const expectedSecondCallSecondArg = {
        headers: {
          'Authorization-Token': 'api',
          'Content-Type': 'application/json'
        },
        method: 'patch'
      };
      const expectedResult = {
        'result': true,
        'message': 'Sharedbox successfully closed.'
      };

      // Act
      client.closeSharedbox(sharedbox).then((res) => {
        // Assert
        expect(res).to.deep.equal(expectedResult);
        expect(stub.getCall(1).args[0]).to.deep.equal(expectedSecondCallFirstArg);
        expect(stub.getCall(1).args[1]).to.deep.equal(expectedSecondCallSecondArg);
      });
    });

    it('Should throw and error if the first fetch called respondes with a non-ok response', () => {
      // Arrange
      const sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_JSON);
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: false,
        status: 501,
        statusText: 'Internal Server Error',
      });
      stub.onCall(1).resolves({
        status: 200,
        ok: true,
        json: () => {
          return new Promise((resolve) => {
            resolve({
              'result': true,
              'message': 'Sharedbox successfully closed.'
            });
          });
        },
        text: () => { return new Promise((resolve) => { resolve({ status: 200, statusText: 'Everything\'s fine' }); }); }
      });

      // Act
      client.closeSharedbox(sharedbox).then(() => {
        assert(false);
      }).catch((err) => {
        // Assert
        expect(err).to.be.an('error');
      });
    });

    it('Should throw and error if the second fetch called respondes with a non-ok response', () => {
      // Arrange
      const sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_JSON);
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: true,
        text: () => { return 'endpoint/'; },
        status: 200,
        statusText: 'Everything\'s fine',
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

      // Act
      client.closeSharedbox(sharedbox).then(() => {
        assert(false);
      }).catch((err) => {
        // Assert
        expect(err).to.be.an('error');
      });
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
