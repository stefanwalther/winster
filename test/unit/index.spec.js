/*global describe, it, beforeEach*/
import winster from './../../src/index';

describe( 'test', () => {

  let logger;
  beforeEach( () => {
    logger = new winster();
  } );

  it( 'should ideally succeed', () => {
    expect( true ).to.be.true;
    logger.silly( 'hurray' );
  } );

} );
