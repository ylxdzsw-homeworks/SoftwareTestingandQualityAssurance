// 2016.3.23 ylxdzsw@gmail.com
'use strict'

const should = require("should")
const nextDate = require("./nextDate.js")

describe("black-box", () => {
    it("should get the right answer for some trival cases", () => {
        nextDate(3,24,2016).should.be.exactly("2016-3-25 Friday")
    })
	it("should report error when inputs are not valid", () => {
        nextDate('q','a','q').should.startWith("Error")
        nextDate().should.startWith("Error")
        nextDate(3.3,true,-14).should.startWith("Error")
	})
    it("should report error when inputs are out of range", () => {
        nextDate(1,1,1800).should.startWith("Error")
        nextDate(1,1,2101).should.startWith("Error")
        nextDate(1,32,1997).should.startWith("Error")
        nextDate(2,29,1997).should.startWith("Error")
        nextDate(13,30,1997).should.startWith("Error")
    })
    it("should recognize leap years", () => {
        nextDate(2,28,2000).should.startWith("2000-2-29")
        nextDate(2,28,1900).should.startWith("1900-3-1")
    })
})

describe("white-box", () => {
    describe("isLeapYear", () => {
        it("mutiple of 4 but not 100 is a leap year", () => {
            nextDate.isLeapYear(1904).should.be.true()
            nextDate.isLeapYear(1996).should.be.true()
        })
        it("mutiple of 100 but not 400 is not a leap year", () => {
            nextDate.isLeapYear(1900).should.be.false()
        })
        it("mutiple of 400 is a leap year", () => {
            nextDate.isLeapYear(2000).should.be.true()
        })
    })
    describe("getYearLength", () => {

    })
    describe("getMonthLength", () => {

    })
    describe("checkType", () => {
        it("Integers are valid", () => {
            nextDate.checkType(2,2,2).should.be.ok()
        })
        it("NULLs are not numbers", () => {
            nextDate.checkType().should.not.be.ok()
            nextDate.checkType(null, null, null).should.not.be.ok()
        })
        it("Strings are not numbers", () => {
            nextDate.checkType('1st','Jan','1996').should.not.be.ok()
        })
    })
    describe("checkRange", () => {

    })
    describe("addOneDay", () => {

    })
    describe("addOneMonth", () => {

    })
    describe("addOneYear", () => {

    })
    describe("nextWeekDay", () => {

    })
    describe("format", () => {

    })
})
