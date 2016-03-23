// 2016.3.23 ylxdzsw@gmail.com
'use strict'

module.exports = (month, date, year) => {
	return `fuck anyway`
}

const isLeapYear = (y) => !(y % 4 ? 1 : y % 100 ? 0 : y % 400)

const getMonthLength = (m,y) => [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m-1]

const checkRange = (m,d,y) => {
    valid_y = 1900 <= y && y <= 2100
    valid_m = 1    <= m && m <= 12
    valid_d = 1    <= d && d <= getMonthLength(m,y)
    return valid_d && valid_m && valid_y
}
