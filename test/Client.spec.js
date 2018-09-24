import Sharedbox from '../src/sharedbox';
import * as chai from 'chai';

let expect = chai.expect;
let assert = chai.assert;

export default describe('Client', () => {
  let client;

  beforeEach(() => {
    client = new Sharedbox.Client('api', 1, 'endpoint');
  });

  describe('Constructor', () => {
    it('should be defined', () => {
      assert(client);
    });

    it('Should have initialized the apiToken with the right value', () => {
      expect(client['apiToken']).to.deep.equal('api');
    });
    it('Should have initialized the userId with the right value', () => {
      expect(client['userId']).to.deep.equal(1);
    });
    it('Should have initialized the endpoint with the right value', () => {
      expect(client['endpoint']).to.deep.equal('endpoint');
    });
    it('Should have initialized the jsonClient', () => {
      assert.isDefined(client['jsonClient']);
    });
  });


  describe('initializeSharedBox function', () => {
    


  });
});
