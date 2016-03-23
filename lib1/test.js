// 2016.3.23 ylxdzsw@gmail.com

const should = require("should")
const nextDate = require("./nextDate.js")

describe("nextDate", () => {
	it("should report error when year > 2100", () => {
		nextDate(2,2,2).should.be.exactly("fuck anyway!")
	})
})
