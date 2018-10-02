import SharedBox from '../src/sharedbox';
import * as chai from 'chai';
import sinon from 'sinon';
import * as Utils from '../src/Utils/platform.js';
import { SharedBoxException } from '../src/modules/SharedBoxException';

let expect = chai.expect;
let assert = chai.assert;

export default describe('JsonClient', () => {
  let jsonClient;

  beforeEach(() => {
    jsonClient = new SharedBox.JsonClient('api', 1, 'endpoint');
  });

  describe('Constructor', () => {
    it('Should be defined', () => {
      assert(jsonClient);
    });

    it('Should have initialized the properties with the good value', () => {
      expect(jsonClient['apiToken']).to.deep.equal('api');
      expect(jsonClient['userId']).to.deep.equal(1);
      expect(jsonClient['endpoint']).to.deep.equal('endpoint');
      expect(jsonClient['noCaching']).to.be.false;
    });
  });

  describe('initializeSharedbox function', () => {
    it('Should call the _makeRequest function with one parameter', () => {
      let makeRequestStub = sinon.stub(jsonClient, '_makeRequest').callsFake((userEmail) => {
        return userEmail;
      });

      const someUserEmail = 'john.doe@email.com';
      const expectedResult = `api/sharedboxes/new?email=${someUserEmail}`;

      let result = jsonClient.initializeSharedBox(someUserEmail);

      expect(result).to.deep.equal(expectedResult);
      assert(makeRequestStub.calledOnceWith(expectedResult));
    });

    it('Should have called the fetch method twice with the good urls', () => {
      // Arrange
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

      const expectedArgumentFirstCall = 'endpoint/services/sharedbox/server/url';
      const expectedArgumentSecondCall = 'endpoint/api/sharedboxes/new?email=jonh.doe@me.com';
      const expectedJsonResult = { guid: 'dc6f21e0f02c41123b795e4', uploadUrl: 'upload_url' };

      // Act
      jsonClient.initializeSharedBox('jonh.doe@me.com').then((res) => {
        // Assert
        expect(stub.getCall(0).args[0]).to.deep.equal(expectedArgumentFirstCall);
        expect(stub.getCall(1).args[0]).to.deep.equal(expectedArgumentSecondCall);
        expect(res).to.deep.equal(expectedJsonResult);
        expect(stub.callCount).to.deep.equal(2);
      }).catch(() => {
        assert(false);
      });
    });

    it('Should throw an error if the first fetch call responded with an non-ok response', () => {
      // Arrange
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: false,
        status: 501,
        statusText: 'Internal server error'
      });

      // Act
      jsonClient.initializeSharedBox('').then(() => {
        assert(false);
      }).catch((err) => {
        // Assert.
        expect(err).to.be.an('error');
      });
    });

    it('Should throw an error if the second fetch call responded with an non-ok response', () => {
      // Arrange
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
      expect(function () { jsonClient.initializeSharedBox(''); }, SharedBoxException);
    });
  });

  describe('submitSharedbox function', () => {
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

    it('Should call the _makeRequest function with 2 parameters', () => {
      // Arrange
      let makeResquestStub = sinon.stub(jsonClient, '_makeRequest').callsFake(() => {
        return SHAREDBOX;
      });
      const expectedSecondArg = {
        headers: {
          'Authorization-Token': jsonClient.apiToken,
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: SHAREDBOX
      };

      // Act
      let result = jsonClient.submitSharedBox(SHAREDBOX);

      // Assert
      expect(result).to.deep.equal(SHAREDBOX);
      assert(makeResquestStub.calledOnceWith('api/sharedboxes', expectedSecondArg));
    });
  });

  describe('addRecipient function', () => {
    it('Should call the _makeRequest function with two parameters', () => {
      // Arrange
      let stub = sinon.stub(jsonClient, '_makeRequest').withArgs(sinon.match.string, sinon.match.object);
      stub.resolves('The request has been made.');
      const message = 'hello world';
      const expectedSuffix = `api/sharedboxes/${jsonClient.guid}/recipients`;
      const expectedRequest = {
        headers: {
          'Authorization-Token': jsonClient.apiToken,
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: message
      };

      // Act
      const result = jsonClient.addRecipient(jsonClient.guid, message).then((stubResolve) => {
        expect(stubResolve).to.deep.equal('The request has been made.');
      });

      // Assert
      assert(stub.calledOnceWith(expectedSuffix, expectedRequest));
      expect(result).not.to.be.an('error');
    });

    it('Should return the added recipient', () => {
      // Arrange
      const FAKE_RECIPIENT = {
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
      const message = 'Hello world';
      sinon.stub(jsonClient, '_makeRequest').withArgs(sinon.match.string, sinon.match.object).callsFake(() => {
        return FAKE_RECIPIENT;
      });

      // Act
      const result = jsonClient.addRecipient(jsonClient.guid, message);

      // Assert
      expect(result).to.deep.equal(FAKE_RECIPIENT);
      assert.isDefined(result);
    });
  });

  describe('closeSharedbox function', () => {
    it('Should call the _makeRequest function with two parameters', () => {
      // Arrange
      const expectedSuffix = 'api/sharedboxes/dc6f21e0f02c41123b795e4/close';
      const expectedRequest = {
        headers: {
          'Authorization-Token': jsonClient.apiToken,
          'Content-Type': 'application/json'
        },
        method: 'patch'
      };
      let stub = sinon.stub(jsonClient, '_makeRequest').withArgs(sinon.match.string, sinon.match.object);

      // Act
      jsonClient.closeSharedbox('dc6f21e0f02c41123b795e4');

      // Assert
      sinon.assert.calledWith(stub, expectedSuffix, expectedRequest);
    });

    it('Should return a json saying every worked', () => {
      // Arrange
      const expectedResult = {
        'result': true,
        'message': 'Sharedbox successfully closed.'
      };
      sinon.stub(jsonClient, '_makeRequest').withArgs(sinon.match.string, sinon.match.object)
        .callsFake(() => {
          return {
            'result': true,
            'message': 'Sharedbox successfully closed.'
          };
        });

      // Act
      const result = jsonClient.closeSharedbox('dc6f21e0f02c41123b795e4');

      // Assert
      expect(result).to.deep.equal(expectedResult);
    });

    it('Should return a json saying it didin\'t close', () => {
      // Arrange
      const expectedResult = {
        'result': false,
        'message': 'Unable to close the Sharedbox.'
      };
      sinon.stub(jsonClient, '_makeRequest').withArgs(sinon.match.string, sinon.match.object)
        .callsFake(() => {
          return {
            'result': false,
            'message': 'Unable to close the Sharedbox.'
          };
        });

      // Act
      const result = jsonClient.closeSharedbox('dc6f21e0f02c41123b795e4');

      // Assert
      expect(result).to.deep.equal(expectedResult);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
