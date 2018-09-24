
import * as chai from 'chai';
import SharedBox from '../src/sharedbox';

let expect = chai.expect;
let assert = chai.assert;

const SHAREDBOX_OBJ = {
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

export default describe('Sharedbox', () => {
  let sharedbox;

  beforeEach(() => {
    sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_OBJ);
  });

  it('Should do nothing', () => {
    expect(true).to.be.true;
  });

  describe('Constructor', () => {
    it('should be defined', () => {
      assert(sharedbox);
    });

    describe('When given a sharedbox object as parameter', () => {
      it('Should set the guid property', () => {
        expect(sharedbox.guid).to.deep.equal(SHAREDBOX_OBJ.guid);
      });
      it('Should set the userEmail property', () => {
        expect(sharedbox.userEmail).to.deep.equal(SHAREDBOX_OBJ.userEmail);
      });
      it('Should set the uploadUrl property', () => {
        expect(sharedbox.uploadUrl).to.deep.equal(SHAREDBOX_OBJ.uploadUrl);
      });
      it('Should set the recipients property', () => {
        expect(sharedbox.recipients).to.deep.equal(SHAREDBOX_OBJ.recipients);
      });
      it('Should set the attachements property', () => {
        expect(sharedbox.attachements).to.deep.equal(SHAREDBOX_OBJ.attachements);
      });
      it('Should set the message property', () => {
        expect(sharedbox.message).to.deep.equal(SHAREDBOX_OBJ.message);
      });
      it('Should set the subject property', () => {
        expect(sharedbox.subject).to.deep.equal(SHAREDBOX_OBJ.subject);
      });
      it('Should set the notificationLanguage property', () => {
        expect(sharedbox.notificationLanguage).to.deep.equal(SHAREDBOX_OBJ.notificationLanguage);
      });
      it('Should set the securityOptions.allowRememberMe property', () => {
        expect(sharedbox.securityOptions.allowRememberMe).to.deep.equal(SHAREDBOX_OBJ.securityOptions.allowRememberMe);
      });
      it('Should set the securityOptions.allowSms property', () => {
        expect(sharedbox.securityOptions.allowSms).to.deep.equal(SHAREDBOX_OBJ.securityOptions.allowSms);
      });
      it('Should set the securityOptions.allowVoice property', () => {
        expect(sharedbox.securityOptions.allowVoice).to.deep.equal(SHAREDBOX_OBJ.securityOptions.allowVoice);
      });
      it('Should set the securityOptions.allowEmail property', () => {
        expect(sharedbox.securityOptions.allowEmail).to.deep.equal(SHAREDBOX_OBJ.securityOptions.allowEmail);
      });
      it('Should set the securityOptions.expirationValue property', () => {
        expect(sharedbox.securityOptions.expirationValue).to.deep.equal(SHAREDBOX_OBJ.securityOptions.expirationValue);
      });
      it('Should set the securityOptions.expirationUnit property', () => {
        expect(sharedbox.securityOptions.expirationUnit).to.deep.equal(SHAREDBOX_OBJ.securityOptions.expirationUnit);
      });
      it('Should set the securityOptions.retentionPeriodType property', () => {
        expect(sharedbox.securityOptions.retentionPeriodType).to.deep.equal(SHAREDBOX_OBJ.securityOptions.retentionPeriodType);
      });
      it('Should set the securityOptions.retentionPeriodValue property', () => {
        expect(sharedbox.securityOptions.retentionPeriodValue).to.deep.equal(SHAREDBOX_OBJ.securityOptions.retentionPeriodValue);
      });
      it('Should set the securityOptions.retentionPeriodUnit property', () => {
        expect(sharedbox.securityOptions.retentionPeriodUnit).to.deep.equal(SHAREDBOX_OBJ.securityOptions.retentionPeriodUnit);
      });
      it('Should set the securityOptions.allowManualClose property', () => {
        expect(sharedbox.securityOptions.allowManualClose).to.deep.equal(SHAREDBOX_OBJ.securityOptions.allowManualClose);
      });
      it('Should set the userId property', () => {
        expect(sharedbox.userId).to.deep.equal(SHAREDBOX_OBJ.userId);
      });
      it('Should set the status property', () => {
        expect(sharedbox.status).to.deep.equal(SHAREDBOX_OBJ.status);
      });
      it('Should set the previewUrl property', () => {
        expect(sharedbox.previewUrl).to.deep.equal(SHAREDBOX_OBJ.previewUrl);
      });
      it('Should set the createdAt property', () => {
        expect(sharedbox.createdAt).to.deep.equal(SHAREDBOX_OBJ.createdAt);
      });
      it('Should set the updatedAt property', () => {
        expect(sharedbox.updatedAt).to.deep.equal(SHAREDBOX_OBJ.updatedAt);
      });
      it('Should set the expiration property', () => {
        expect(sharedbox.expiration).to.deep.equal(SHAREDBOX_OBJ.expiration);
      });
      it('Should set the closedAt property', () => {
        expect(sharedbox.closedAt).to.deep.equal(SHAREDBOX_OBJ.closedAt);
      });
    });

    describe('When given no parameter', () => {
      beforeEach(() =>{
        sharedbox = new SharedBox.Helpers.Sharedbox();
      });

      it('Should set the guid property to null', () => {
        expect(sharedbox.guid).to.be.null;
      });
      it('Should set the userEmail property to null', () => {
        expect(sharedbox.userEmail).to.be.null;
      });
      it('Should set the uploadUrl property to null', () => {
        expect(sharedbox.uploadUrl).to.be.null;
      });
      it('Should set the recipients property to null', () => {
        expect(sharedbox.recipients).to.be.an('array').that.is.empty;
      });
      it('Should set the attachements property to null', () => {
        expect(sharedbox.attachements).to.be.undefined;
      });
      it('Should set the message property to null', () => {
        expect(sharedbox.message).to.be.null;
      });
      it('Should set the subject property to null', () => {
        expect(sharedbox.subject).to.be.null;
      });
      it('Should set the notificationLanguage property to null', () => {
        expect(sharedbox.notificationLanguage).to.be.null;
      });
      it('Should set the securityOptions.allowRememberMe property to null', () => {
        expect(sharedbox.securityOptions.allowRememberMe).to.be.null;
      });
      it('Should set the securityOptions.allowSms property to null', () => {
        expect(sharedbox.securityOptions.allowSms).to.be.null;
      });
      it('Should set the securityOptions.allowVoice property to null', () => {
        expect(sharedbox.securityOptions.allowVoice).to.be.null;
      });
      it('Should set the securityOptions.allowEmail property to null', () => {
        expect(sharedbox.securityOptions.allowEmail).to.be.null;
      });
      it('Should set the securityOptions.expirationValue property to null', () => {
        expect(sharedbox.securityOptions.expirationValue).to.be.null;
      });
      it('Should set the securityOptions.expirationUnit property to null', () => {
        expect(sharedbox.securityOptions.expirationUnit).to.be.null;
      });
      it('Should set the securityOptions.retentionPeriodType property to null', () => {
        expect(sharedbox.securityOptions.retentionPeriodType).to.be.null;
      });
      it('Should set the securityOptions.retentionPeriodValue property to null', () => {
        expect(sharedbox.securityOptions.retentionPeriodValue).to.be.null;
      });
      it('Should set the securityOptions.retentionPeriodUnit property to null', () => {
        expect(sharedbox.securityOptions.retentionPeriodUnit).to.be.null;
      });
      it('Should set the securityOptions.allowManualClose property to null', () => {
        expect(sharedbox.securityOptions.allowManualClose).to.be.null;
      });
      it('Should set the userId property to null', () => {
        expect(sharedbox.userId).to.be.null;
      });
      it('Should set the status property to null', () => {
        expect(sharedbox.status).to.be.null;
      });
      it('Should set the previewUrl property to null', () => {
        expect(sharedbox.previewUrl).to.be.null;
      });
      it('Should set the createdAt property to null', () => {
        expect(sharedbox.createdAt).to.be.null;
      });
      it('Should set the updatedAt property to null', () => {
        expect(sharedbox.updatedAt).to.be.null;
      });
      it('Should set the expiration property to null', () => {
        expect(sharedbox.expiration).to.be.null;
      });
      it('Should set the closedAt property to null', () => {
        expect(sharedbox.closedAt).to.be.null;
      });      
    });
  });

  describe('toJson function', () => {
    it('Should return the json object', () => {
      const expectedResult = {
        'sharedbox': {
          'guid': SHAREDBOX_OBJ.guid,
          'userEmail': SHAREDBOX_OBJ.userEmail,
          'uploadUrl': SHAREDBOX_OBJ.uploadUrl,
          'subject': SHAREDBOX_OBJ.subject,
          'message': SHAREDBOX_OBJ.message,
          'recipients': SHAREDBOX_OBJ.recipients,
          'documentIds': [],
          'expirationValue': SHAREDBOX_OBJ.securityOptions.expirationValue,
          'expirationUnit': SHAREDBOX_OBJ.securityOptions.expirationUnit,
          'retentionPeriodType': SHAREDBOX_OBJ.securityOptions.retentionPeriodType,
          'retentionPeriodValue': SHAREDBOX_OBJ.securityOptions.retentionPeriodValue,
          'retentionPeriodUnit': SHAREDBOX_OBJ.securityOptions.retentionPeriodUnit,
          'notificationLanguage': SHAREDBOX_OBJ.notificationLanguage
        }
      };

      let result = JSON.parse(sharedbox.toJson());

      expect(result).to.deep.equal(expectedResult);
    });
  });
});
