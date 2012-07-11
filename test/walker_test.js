var mocha = require('mocha'),
    sinon = require('sinon'),
    assert = require("assert"),
    walker = require('../lib/walker.js');

describe('walker', function(){
  describe('#decodeLine()', function(){
    it('should return correct points for an encoded line', function(){
      var points = walker.decodeLine('utq~FfxdvOp@ioF~qCiC');
      assert.equal(points.length, 3);
      assert.equal(points[0][0], 41.87483);
      assert.equal(points[0][1], -87.68404000000001);
      assert.equal(points[1][0], 41.87458);
      assert.equal(points[1][1], -87.64559000000001);
      assert.equal(points[2][0], 41.851060000000004);
      assert.equal(points[2][1], -87.6449);
    })
  })
})
