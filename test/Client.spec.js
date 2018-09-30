import Sharedbox from '../src/sharedbox';
import * as chai from 'chai';
// import * as Utils from '../src/Utils/platform.js';
import sinon from 'sinon';
import SharedBox from '../src/sharedbox';
import { SharedBoxException } from '../src/modules/SharedBoxException';

let expect = chai.expect;
let assert = chai.assert;

export default describe('Client', () => {
  let client;

  beforeEach(() => {
    client = new Sharedbox.Client('api', 1, 'endpoint');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Constructor', () => {
    it('should be defined', () => {
      assert(client);
    });
    it('Should have initialized the properties with the right value', () => {
      expect(client['apiToken']).to.deep.equal('api');
      expect(client['userId']).to.deep.equal(1);
      expect(client['endpoint']).to.deep.equal('endpoint');
      assert.isDefined(client['jsonClient']);
    });
  });

  describe('initializeSharedBox function', () => {
  });

  describe('submitSharedbox function', () => {
    it('Should return exception if guid field is empty', () => {
      let sharedbox = new SharedBox.Helpers.Sharedbox();

      assert.throws(function () { client.submitSharedBox(sharedbox); }, SharedBoxException);
    });
  });


});
