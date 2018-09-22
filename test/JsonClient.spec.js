import SharedBox from '../src/sharedbox';
import * as chai from 'chai';

let expect = chai.expect;
let assert = chai.assert;

export default describe ('JsonClient', () => {
  let jsonClient;

  beforeEach(() => {
    jsonClient = new SharedBox.JsonClient('api', 1, 'endpoint');
  });

  it ('Should do nothing', () => {
    expect(true).to.be.true;
  });

  it ('Should be defined', () => {
    assert(jsonClient);
  });

  describe('Constructor', () => {
    it ('Should have initialized apiToken property with the good value', () => {
      expect(jsonClient['apiToken']).to.deep.equal('api');
    });
    it ('Should have initialized userId property with the good value', () => {
      expect(jsonClient['userId']).to.deep.equal(1);
    });
    it ('Should have initialized endpoint property with the good value', () => {
      expect(jsonClient['endpoint']).to.deep.equal('endpoint');
    });
    it ('Should have initialized noCaching property with the good value', () => {
      expect(jsonClient['noCaching']).to.be.false;
    });
  });

  describe ('initializeSharedbox function', () => {

  });

  describe ('submitSharedbox function', () => {

  });

  describe ('addRecipient function', () => {

  });

  describe ('closeSharedbox function', () => {

  });
});
