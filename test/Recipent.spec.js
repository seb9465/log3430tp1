import SharedBox from '../src/sharedbox';
import * as chai from 'chai';

let expect = chai.expect;
let assert = chai.assert;

export default describe('Recipient', () => {
  const RECIPIENT_OBJ = {
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
  let recipient;

  beforeEach(() => {
    recipient = new SharedBox.Helpers.Recipient(RECIPIENT_OBJ);
  });

  it('Should be defined', () => {
    assert(recipient);
  });

  it('Should do nothing', () => {
    expect(true).to.be.true;
  });

  describe('Constructor', () => {
    describe('Should initialize every properties with the object passed to the constructor', () => {
      it ('id property', () => {
        expect(recipient.id).to.deep.equal(RECIPIENT_OBJ.id);
      });
      it ('firstName property', () => {
        expect(recipient.firstName).to.deep.equal(RECIPIENT_OBJ.firstName);
      });
      it ('lastName property', () => {
        expect(recipient.lastName).to.deep.equal(RECIPIENT_OBJ.lastName);
      });
      it ('email property', () => {
        expect(recipient.email).to.deep.equal(RECIPIENT_OBJ.email);
      });
      it ('locked option property', () => {
        expect(recipient.options.locked).to.deep.equal(RECIPIENT_OBJ.options.locked);
      });
      it ('bouncedEmail option property', () => {
        expect(recipient.options.bouncedEmail).to.deep.equal(RECIPIENT_OBJ.options.bouncedEmail);
      });
      it ('verified option property', () => {
        expect(recipient.options.verified).to.deep.equal(RECIPIENT_OBJ.options.verified);
      });
      it ('contactMethod option property', () => {
        expect(recipient.options.contactMethods).to.be.an('array').that.is.not.empty;
      });
    });
    describe('Should initialize with null or default value when no object is given to the constructor', () => {
      beforeEach(() => {
        recipient = new SharedBox.Helpers.Recipient();
      });

      it ('id property', () => {
        expect(recipient.id).to.be.null;
      });
      it ('firstName property', () => {
        expect(recipient.firstName).to.be.null;
      });
      it ('lastName property', () => {
        expect(recipient.lastName).to.be.null;
      });
      it ('email property', () => {
        expect(recipient.email).to.be.null;
      });
      it ('locked option property', () => {
        expect(recipient.options.locked).to.be.null;
      });
      it ('bouncedEmail option property', () => {
        expect(recipient.options.bouncedEmail).to.be.null;
      });
      it ('verified option property', () => {
        expect(recipient.options.verified).to.be.null;
      });
      it ('contactMethod option property', () => {
        expect(recipient.options.contactMethods).to.be.an('array').that.is.empty;
      });
    });
  });
});
