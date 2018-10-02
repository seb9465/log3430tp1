import Sharedbox from '../src/sharedbox';
import * as chai from 'chai';
import * as Utils from '../src/Utils/platform.js';
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
    it('Should call the fetch method twice and return the updated SharedBox', () => {
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: true,
        text: () => { return 'endpoint/'; },
        status: 200,
        statusText: 'Everything\'s fine'
      });
      stub.onCall(1).resolves({
        status: 200,
        ok: true,
        json: () => { return new Promise((resolve) => { resolve({ guid: 'dc6f21e0f02c41123b795e4', uploadUrl: 'upload_url' }); }); },
        text: () => { return new Promise((resolve) => { resolve({ status: 501, statusText: 'An error as occuried' }); }); }
      });
      const sharedbox = new SharedBox.Helpers.Sharedbox({ userEmail: 'jonh.doe@me.com' });

      client.initializeSharedBox(sharedbox).then((result) => {
        expect(result.guid).to.deep.equal('dc6f21e0f02c41123b795e4');
        expect(result.uploadUrl).to.deep.equal('upload_url');
        assert(stub.calledTwice);
      }).catch(() => {
        assert(false);
      });
    });

    it('Should throw an error if the first fetch call respondes with a non-ok response', () => {
      // Arrange
      const sharedbox = new SharedBox.Helpers.Sharedbox({ userEmail: 'jonh.doe@me.com' });
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: false,
        status: 501,
        statusText: 'Internal server error',
      });
      stub.onCall(1).resolves({
        status: 200,
        ok: true,
        json: () => { return new Promise((resolve) => { resolve({ guid: 'dc6f21e0f02c41123b795e4', uploadUrl: 'upload_url' }); }); },
        text: () => { return new Promise((resolve) => { resolve({ status: 501, statusText: 'An error as occuried' }); }); }
      });

      // Act & Arrange
      expect(function() {client.initializeSharedBox(sharedbox); }, SharedBoxException);
    });

    it('Should throw an error if the second fetch call repondes with a non-ok response', () => {
      // Arrange
      const sharedbox = new SharedBox.Helpers.Sharedbox({ userEmail: 'jonh.doe@me.com' });
      let stub = sinon.stub(Utils, 'fetch').withArgs(sinon.match.string, sinon.match.object);
      stub.onCall(0).resolves({
        ok: true,
        text: () => { return 'endpoint/'; },
      });
      stub.onCall(1).resolves({
        status: 501,
        ok: false,
        text: () => {
          return new Promise((resolve) => {
            resolve({
              status: 501,
              statusText: 'Internal Server Error'
            });
          });
        },
        statusText: 'Internal Server Error',
      });

      // Act & Arrange
      expect(function() {client.initializeSharedBox(sharedbox); }, SharedBoxException);
    });
  });

  describe('submitSharedbox function', () => {
    it('Should return exception if guid field is empty', () => {
      let sharedbox = new SharedBox.Helpers.Sharedbox();

      assert.throws(function () { client.submitSharedBox(sharedbox); }, SharedBoxException);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
