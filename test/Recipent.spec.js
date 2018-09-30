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
    it('Should initialize every properties with the object passed to the constructor', () => {
      expect(recipient.id).to.deep.equal(RECIPIENT_OBJ.id);
      expect(recipient.firstName).to.deep.equal(RECIPIENT_OBJ.firstName);
      expect(recipient.lastName).to.deep.equal(RECIPIENT_OBJ.lastName);
      expect(recipient.email).to.deep.equal(RECIPIENT_OBJ.email);
      expect(recipient.options.locked).to.deep.equal(RECIPIENT_OBJ.options.locked);
      expect(recipient.options.bouncedEmail).to.deep.equal(RECIPIENT_OBJ.options.bouncedEmail);
      expect(recipient.options.verified).to.deep.equal(RECIPIENT_OBJ.options.verified);
      expect(recipient.options.contactMethods).to.be.an('array').that.is.not.empty;
    });

    describe('Should initialize with null or default value when no object is given to the constructor', () => {
      beforeEach(() => {
      });

      it('Should initialize all the properties with null or default value when no object is given to the constructor', () => {
        recipient = new SharedBox.Helpers.Recipient();

        expect(recipient.id).to.be.null;
        expect(recipient.firstName).to.be.null;
        expect(recipient.lastName).to.be.null;
        expect(recipient.email).to.be.null;
        expect(recipient.options.locked).to.be.null;
        expect(recipient.options.bouncedEmail).to.be.null;
        expect(recipient.options.verified).to.be.null;
        expect(recipient.options.contactMethods).to.be.an('array').that.is.empty;
      });
    });
  });

  describe('toJson function', () => {
    it('Should return the json object', () => {
      const expectedResult = {
        'recipient': {
          'email': 'john.doe@email.com',
          'firstName': 'John',
          'lastName': 'Doe',
          'contactMethods': [
            {
              'destinationType': 'office_phone',
              'destination': '+55555555555'
            },
            {
              'destinationType': 'cell_phone',
              'destination': '+1111111111'
            }
          ]
        }
      };

      let result = JSON.parse(recipient.toJson());

      expect(result).to.deep.equal(expectedResult);
    });
  });
});
