
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
    it('Should set all the property of the class correctly with the given sharedbox object', () => {
      expect(sharedbox.guid).to.deep.equal(SHAREDBOX_OBJ.guid);
      expect(sharedbox.userEmail).to.deep.equal(SHAREDBOX_OBJ.userEmail);
      /* TODO : Liste de tous les autres propriétés de la classe. */
    });
    it('Should set to null (or default) all the property if no object is passed to the constructor', () => {
      sharedbox = new SharedBox.Helpers.Sharedbox();

      expect(sharedbox.guid).to.be.null;
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
