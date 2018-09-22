import SharedBox from '../src/sharedbox';
import * as chai from 'chai';
import sinon from 'sinon';

let expect = chai.expect;
let assert = chai.assert;

export default describe ('JsonClient', () => {
  let jsonClient;
  // let stub;
  // let setStub = 

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
    it ('Should call the _makeRequest function with one parameter', () => {
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

  describe ('submitSharedbox function', () => {

  });

  describe ('addRecipient function', () => {

  });

  describe ('closeSharedbox function', () => {

  });
});
