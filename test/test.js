let expect = require('chai').expect
let Skoy = require('../lib/skoy')

describe('Skoy', function() {
  it('can convert to string', function() {
    expect(Skoy.convert('สวัสดี')).to.be.a('string')
  })

  it('can convert static words', function() {
    expect(Skoy.convert('พวก')).to.include('พ๊ก')
    expect(Skoy.convert('หนู')).to.include('หนุ๊')
  })
})

