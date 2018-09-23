import SharedBox from '../src/sharedbox';
import * as chai from 'chai';
import sinon from 'sinon';

let expect = chai.expect;
let assert = chai.assert;

export default describe('JsonClient', () => {
  let jsonClient;
  // let stub;
  // let setStub = 

  beforeEach(() => {
    jsonClient = new SharedBox.JsonClient('api', 1, 'endpoint');

  });

  it('Should do nothing', () => {
    expect(true).to.be.true;
  });

  it('Should be defined', () => {
    assert(jsonClient);
  });

  describe('Constructor', () => {
    it('Should have initialized apiToken property with the good value', () => {
      expect(jsonClient['apiToken']).to.deep.equal('api');
    });
    it('Should have initialized userId property with the good value', () => {
      expect(jsonClient['userId']).to.deep.equal(1);
    });
    it('Should have initialized endpoint property with the good value', () => {
      expect(jsonClient['endpoint']).to.deep.equal('endpoint');
    });
    it('Should have initialized noCaching property with the good value', () => {
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
      let makeResquestStub = sinon.stub(jsonClient, '_makeRequest').callsFake(() => {
        return SHAREDBOX;
      });

      let result = jsonClient.submitSharedBox(SHAREDBOX);

      expect(result).to.deep.equal(SHAREDBOX);
      assert(makeResquestStub.calledOnceWith('api/sharedboxes', {
        headers: {
          'Authorization-Token': jsonClient.apiToken,
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: SHAREDBOX
      }));
    });
  });

  describe('addRecipient function', () => {
    it('Should call the _makeRequest function with two parameters', () => {
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


      const result = jsonClient.addRecipient(jsonClient.guid, message).then((stubResolve) => {
        expect(stubResolve).to.deep.equal('The request has been made.');
      });

      assert(stub.calledOnceWith(expectedSuffix, expectedRequest));
      expect(result).not.to.be.an('error');
    });
    it ('Should return the added recipient', () => {
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

      const result = jsonClient.addRecipient(jsonClient.guid, message);

      expect(result).to.deep.equal(FAKE_RECIPIENT);
      assert.isDefined(result);
    });

  });

  describe('closeSharedbox function', () => {
    it ('Should call the _makeRequest function with two parameters', () => {
      const expectedSuffix = 'api/sharedboxes/dc6f21e0f02c41123b795e4/close';
      const expectedRequest = {
        headers: {
          'Authorization-Token': jsonClient.apiToken,
          'Content-Type': 'application/json'
        },
        method: 'patch'
      };
      let stub = sinon.stub(jsonClient, '_makeRequest').withArgs(sinon.match.string, sinon.match.object);

      jsonClient.closeSharedbox('dc6f21e0f02c41123b795e4');

      sinon.assert.calledWith(stub, expectedSuffix, expectedRequest);
    });

    it ('Should return a json saying every worked', () => {
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
      
      const result = jsonClient.closeSharedbox('dc6f21e0f02c41123b795e4');
      
      expect(result).to.deep.equal(expectedResult);
    });

    it ('Should return a json saying it didin\'t close', () => {
      
    });
  });
});
