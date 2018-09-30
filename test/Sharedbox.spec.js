
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
  
  describe('Constructor', () => {
    it('should be defined', () => {
      assert(sharedbox);
    });

    it('Should set the properties with the passed object to the constructor', () => {
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
    
  });
});
