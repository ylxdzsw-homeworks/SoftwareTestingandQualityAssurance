'use strict'

const should = require("should")
const Month = require("./commission.js")

Month.noprint()

describe("fuck", () => {
    it("you", () => {
        const m = new Month
        m.onTelegram(2,2,2).should.be.exactly('ok')
        m.sales.should.be.exactly(200)
        m.commission.should.be.exactly(20)
    })
    it("you again", () => {
        const m = new Month
        m.onTelegram(70,0,0).should.be.exactly('ok')
        m.onTelegram(0,80,0).should.be.exactly('ok')
        m.onTelegram(1,0,0).should.startWith('Error')
        m.onTelegram(-1).should.be.exactly('ok')
        m.onTelegram(0,0,1).should.startWith('Error')
    })
    it("fuck", () => {
        const m = new Month
        m.onTelegram(0,10,10).should.be.exactly('ok')
        m.commission.should.be.exactly(0)
    })
})
