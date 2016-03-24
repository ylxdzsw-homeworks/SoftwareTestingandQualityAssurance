// 2016.3.23 ylxdzsw@gmail.com
'use strict'

module.exports = (m, d, y) => {
	let date = addOneDay(m, d, y)
    return format(date)
}

const isLeapYear = (y) => !(y % 4 ? 1 : y % 100 ? 0 : y % 400)

const getMonthLength = (m, y) => [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m-1]

const checkRange = (m, d, y) => {
    valid_y = 1900 <= y && y <= 2100
    valid_m = 1    <= m && m <= 12
    valid_d = 1    <= d && d <= getMonthLength(m, y)
    return valid_d && valid_m && valid_y
}

const addOneDay = (m, d, y) => d == getMonthLength(m, y) ? addOneMonth(m, 1, y) : [m, d+1, y]

const addOneMonth = (m, d, y) => m == 12 ? addOneYear(1, d, y) : [m+1, d, y]

const addOneYear = (m, d, y) => [m, d, y+1]

const format = (date, weekday, lunar) => {
    const m = date[0]
    const d = date[1]
    const y = date[2]

    return `${y}-${m}-${d}`
}
