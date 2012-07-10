var mocha = require('mocha'),
    sinon = require('sinon'),
    assert = require("assert"),
    walker = require('../lib/walker.js');

describe('walker', function(){
  describe('#amble()', function(){
    it('should call the function to stuff the correct number of times given the step number', function(){
      var dostuff = sinon.stub()
      walker.amble({lng : 0, lat : 20}, {lng : 10, lat : 30}, 10, dostuff);
      assert.equal(dostuff.callCount, 11);
      assert.equal(dostuff.getCall(0).calledWith(null, {lng : 0, lat : 20}), true);
      assert.equal(dostuff.getCall(1).calledWith(null, {lng : 1, lat : 21}), true);
      assert.equal(dostuff.getCall(2).calledWith(null, {lng : 2, lat : 22}), true);
      assert.equal(dostuff.getCall(3).calledWith(null, {lng : 3, lat : 23}), true);
      assert.equal(dostuff.getCall(4).calledWith(null, {lng : 4, lat : 24}), true);
      assert.equal(dostuff.getCall(5).calledWith(null, {lng : 5, lat : 25}), true);
      assert.equal(dostuff.getCall(6).calledWith(null, {lng : 6, lat : 26}), true);
      assert.equal(dostuff.getCall(7).calledWith(null, {lng : 7, lat : 27}), true);
      assert.equal(dostuff.getCall(8).calledWith(null, {lng : 8, lat : 28}), true);
      assert.equal(dostuff.getCall(9).calledWith(null, {lng : 9, lat : 29}), true);
      assert.equal(dostuff.getCall(10).calledWith(null, {lng : 10, lat : 30}), true);
    })
  })
})
