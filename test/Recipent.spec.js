import SharedBox from '../src/sharedbox';
import * as chai from 'chai';

let expect = chai.expect;
let assert = chai.assert;

export default describe('Recipient', () => {
  let recipient;

  beforeEach(() => {
    recipient = new SharedBox.Helpers.Recipient();
  });

  it('Should be defined', () => {
    assert(recipient);
  });

  it('Should do nothing', () => {
    expect(true).to.be.true;
  });

  // describe('Constructor', () => {
    
  // });
});
