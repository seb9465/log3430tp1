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

  describe('Constructor', () => {
    it('should be defined', () => {
      sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_OBJ);
      assert(sharedbox);
    });

    it('Should set the properties with the passed object to the constructor', () => {
      sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_OBJ);

      expect(sharedbox.guid).to.deep.equal(SHAREDBOX_OBJ.guid);
      expect(sharedbox.userEmail).to.deep.equal(SHAREDBOX_OBJ.userEmail);
      expect(sharedbox.uploadUrl).to.deep.equal(SHAREDBOX_OBJ.uploadUrl);
      expect(sharedbox.recipients).to.deep.equal(SHAREDBOX_OBJ.recipients);
      expect(sharedbox.attachements).to.deep.equal(SHAREDBOX_OBJ.attachements);
      expect(sharedbox.message).to.deep.equal(SHAREDBOX_OBJ.message);
      expect(sharedbox.subject).to.deep.equal(SHAREDBOX_OBJ.subject);
      expect(sharedbox.notificationLanguage).to.deep.equal(SHAREDBOX_OBJ.notificationLanguage);
      expect(sharedbox.securityOptions.allowRememberMe).to.deep.equal(SHAREDBOX_OBJ.securityOptions.allowRememberMe);
      expect(sharedbox.securityOptions.allowSms).to.deep.equal(SHAREDBOX_OBJ.securityOptions.allowSms);
      expect(sharedbox.securityOptions.allowVoice).to.deep.equal(SHAREDBOX_OBJ.securityOptions.allowVoice);
      expect(sharedbox.securityOptions.allowEmail).to.deep.equal(SHAREDBOX_OBJ.securityOptions.allowEmail);
      expect(sharedbox.securityOptions.expirationValue).to.deep.equal(SHAREDBOX_OBJ.securityOptions.expirationValue);
      expect(sharedbox.securityOptions.expirationUnit).to.deep.equal(SHAREDBOX_OBJ.securityOptions.expirationUnit);
      expect(sharedbox.securityOptions.retentionPeriodType).to.deep.equal(SHAREDBOX_OBJ.securityOptions.retentionPeriodType);
      expect(sharedbox.securityOptions.retentionPeriodValue).to.deep.equal(SHAREDBOX_OBJ.securityOptions.retentionPeriodValue);
      expect(sharedbox.securityOptions.retentionPeriodUnit).to.deep.equal(SHAREDBOX_OBJ.securityOptions.retentionPeriodUnit);
      expect(sharedbox.securityOptions.allowManualClose).to.deep.equal(SHAREDBOX_OBJ.securityOptions.allowManualClose);
      expect(sharedbox.userId).to.deep.equal(SHAREDBOX_OBJ.userId);
      expect(sharedbox.status).to.deep.equal(SHAREDBOX_OBJ.status);
      expect(sharedbox.previewUrl).to.deep.equal(SHAREDBOX_OBJ.previewUrl);
      expect(sharedbox.createdAt).to.deep.equal(SHAREDBOX_OBJ.createdAt);
      expect(sharedbox.updatedAt).to.deep.equal(SHAREDBOX_OBJ.updatedAt);
      expect(sharedbox.expiration).to.deep.equal(SHAREDBOX_OBJ.expiration);
      expect(sharedbox.closedAt).to.deep.equal(SHAREDBOX_OBJ.closedAt);
    });

    it('Should set the properties to null if when no parameter is passed to the constructor', () => {
      sharedbox = new SharedBox.Helpers.Sharedbox();
      
      expect(sharedbox.guid).to.be.null;
      expect(sharedbox.userEmail).to.be.null;
      expect(sharedbox.uploadUrl).to.be.null;
      expect(sharedbox.recipients).to.be.an('array').that.is.empty;
      expect(sharedbox.attachements).to.be.undefined;
      expect(sharedbox.message).to.be.null;
      expect(sharedbox.subject).to.be.null;
      expect(sharedbox.notificationLanguage).to.be.null;
      expect(sharedbox.securityOptions.allowRememberMe).to.be.null;
      expect(sharedbox.securityOptions.allowSms).to.be.null;
      expect(sharedbox.securityOptions.allowVoice).to.be.null;
      expect(sharedbox.securityOptions.allowEmail).to.be.null;
      expect(sharedbox.securityOptions.expirationValue).to.be.null;
      expect(sharedbox.securityOptions.expirationUnit).to.be.null;
      expect(sharedbox.securityOptions.retentionPeriodType).to.be.null;
      expect(sharedbox.securityOptions.retentionPeriodValue).to.be.null;
      expect(sharedbox.securityOptions.retentionPeriodUnit).to.be.null;
      expect(sharedbox.securityOptions.allowManualClose).to.be.null;
      expect(sharedbox.userId).to.be.null;
      expect(sharedbox.status).to.be.null;
      expect(sharedbox.previewUrl).to.be.null;
      expect(sharedbox.createdAt).to.be.null;
      expect(sharedbox.updatedAt).to.be.null;
      expect(sharedbox.expiration).to.be.null;
      expect(sharedbox.closedAt).to.be.null;
    });
  });

  describe('toJson function', () => {
    it('Should return the json object', () => {
      sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_OBJ);
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

      let result = sharedbox.toJson();

      expect(JSON.parse(result)).to.deep.equal(expectedResult);
      expect(result).to.be.a('string');
    });

    describe('When converting to json, parsing it, and creating a new object with that object', () => {
      sharedbox = new SharedBox.Helpers.Sharedbox(SHAREDBOX_OBJ);
      const sharedboxToJson = sharedbox.toJson();
      const sharedboxParsed = JSON.parse(sharedboxToJson);
      console.log(sharedboxParsed);
      const newSharedbox = new SharedBox.Helpers.Sharedbox(sharedboxParsed.sharedbox);
      console.log(newSharedbox);

      it('Should set the GUID property to the same one as the first sharedbox', () => {
        expect(newSharedbox.guid).to.deep.equal(sharedbox.guid);
      });
      it('Should set the UserEmail property to the same one as the first sharedbox', () => {
        expect(newSharedbox.userEmail).to.deep.equal(sharedbox.userEmail);
      });
      it('Should set the UploadUrl property to the same one as the first sharedbox', () => {
        expect(newSharedbox.uploadUrl).to.deep.equal(sharedbox.uploadUrl);
      });
      it('Should set the Recipients property to the same one as the first sharedbox', () => {
        expect(newSharedbox.recipients).to.deep.equal(sharedbox.recipients);
      });
      it('Should set the Attachements property to the same one as the first sharedbox', () => {
        expect(newSharedbox.attachements).to.deep.equal(sharedbox.attachements);
      });
      it('Should set the Message property to the same one as the first sharedbox', () => {
        expect(newSharedbox.message).to.deep.equal(sharedbox.message);
      });
      it('Should set the Subject property to the same one as the first sharedbox', () => {
        expect(newSharedbox.subject).to.deep.equal(sharedbox.subject);
      });
      it('Should set the NotificationLanguage property to the same one as the first sharedbox', () => {
        expect(newSharedbox.notificationLanguage).to.deep.equal(sharedbox.notificationLanguage);
      });
      it.skip('Should set the securityOptions.allowRememberMe property to the same one as the first sharedbox', () => {
        expect(newSharedbox.securityOptions.allowRememberMe).to.deep.equal(sharedbox.securityOptions.allowRememberMe);
      });
      it.skip('Should set the securityOptions.allowSms property to the same one as the first sharedbox', () => {
        expect(newSharedbox.securityOptions.allowSms).to.deep.equal(sharedbox.securityOptions.allowSms);
      });
      it.skip('Should set the securityOptions.allowVoice property to the same one as the first sharedbox', () => {
        expect(newSharedbox.securityOptions.allowVoice).to.deep.equal(sharedbox.securityOptions.allowVoice);
      });
      it.skip('Should set the securityOptions.allowEmail property to the same one as the first sharedbox', () => {
        expect(newSharedbox.securityOptions.allowEmail).to.deep.equal(sharedbox.securityOptions.allowEmail);
      });
      it.skip('Should set the securityOptions.expirationValue property to the same one as the first sharedbox', () => {
        expect(newSharedbox.securityOptions.expirationValue).to.deep.equal(sharedbox.securityOptions.expirationValue);
      });
      it.skip('Should set the securityOptions.expirationUnit property to the same one as the first sharedbox', () => {
        expect(newSharedbox.securityOptions.expirationUnit).to.deep.equal(sharedbox.securityOptions.expirationUnit);
      });
      it.skip('Should set the securityOptions.retentionPeriodType property to the same one as the first sharedbox', () => {
        expect(newSharedbox.securityOptions.retentionPeriodType).to.deep.equal(sharedbox.securityOptions.retentionPeriodType);
      });
      it('Should set the securityOptions.retentionPeriodValue property to the same one as the first sharedbox', () => {
        expect(newSharedbox.securityOptions.retentionPeriodValue).to.deep.equal(sharedbox.securityOptions.retentionPeriodValue);
      });
      it.skip('Should set the securityOptions.retentionPeriodUnit property to the same one as the first sharedbox', () => {
        expect(newSharedbox.securityOptions.retentionPeriodUnit).to.deep.equal(sharedbox.securityOptions.retentionPeriodUnit);
      });
      it.skip('Should set the SecurityOptions.allowManualClose property to the same one as the first sharedbox', () => {
        expect(newSharedbox.securityOptions.allowManualClose).to.deep.equal(sharedbox.securityOptions.allowManualClose);
      });
      it.skip('Should set the UserID property to the same one as the first sharedbox', () => {
        expect(newSharedbox.userId).to.deep.equal(sharedbox.userId);
      });
      it.skip('Should set the Status property to the same one as the first sharedbox', () => {
        expect(newSharedbox.status).to.deep.equal(sharedbox.status);
      });
      it.skip('Should set the PreviewURL property to the same one as the first sharedbox', () => {
        expect(newSharedbox.previewUrl).to.deep.equal(sharedbox.previewUrl);
      });
      it.skip('Should set the CreatedAt property to the same one as the first sharedbox', () => {
        expect(newSharedbox.createdAt).to.deep.equal(sharedbox.createdAt);
      });
      it.skip('Should set the UpdatedAt property to the same one as the first sharedbox', () => {
        expect(newSharedbox.updatedAt).to.deep.equal(sharedbox.updatedAt);
      });
      it.skip('Should set the Expiration property to the same one as the first sharedbox', () => {
        expect(newSharedbox.expiration).to.deep.equal(sharedbox.expiration);
      });
      it('Should set the ClosedAt property to the same one as the first sharedbox', () => {
        expect(newSharedbox.closedAt).to.deep.equal(sharedbox.closedAt);
      });
    });
  });
});
