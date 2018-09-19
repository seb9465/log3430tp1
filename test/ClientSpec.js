import Sharedbox from '../src/sharedbox';
import * as chai from 'chai';

let expect = chai.expect;
let assert = chai.assert;

export default describe('Client', () => {
  let client;

  beforeEach(() => {
    client = new Sharedbox.Client('api', 1, 'endpoint');
  });

  describe('initializeSharedBox function', () => {
    it('Should do nothing', () => {
      expect(true).to.be.true;
    });

    it('should be defined', () => {
      assert(client);      
    });
  });
});
