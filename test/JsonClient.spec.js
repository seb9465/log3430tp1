import SharedBox from '../src/sharedbox';
import * as chai from 'chai';

let expect = chai.expect;
let assert = chai.assert;

export default describe('JsonClient', () => {
  let jsonClient;

  beforeEach(() => {
    jsonClient = new SharedBox.JsonClient('api', 1, 'endpoint');
  });

  it('Should do nothing', () => {
    expect(true).to.be.true;
  });

  it('Should be defined', () => {
    assert(jsonClient);
  });
});
