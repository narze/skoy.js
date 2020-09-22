// Mock random
Math.random = () => 0.0

let expect = require('chai').expect
let Skoy = require('../lib/skoy')

describe('Skoy', () => {
  it('converts to string', () => {
    expect(Skoy.convert('สวัสดี')).to.be.a('string')
  })

  it('converts static words', () => {
    expect(Skoy.convert('พวก')).to.include('พ๊ห์ก')
    expect(Skoy.convert('หนู')).to.include('หนุ๊')
  })

  it('converts แ to double เ', () => {
    expect(Skoy.convert('แก')).to.include('เเก')
  })
})

