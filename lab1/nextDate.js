// 2016.3.23 ylxdzsw@gmail.com
'use strict'

module.exports = (m, d, y) => {
    if(!checkType(m, d, y) || !checkRange(m, d, y)){
        return "Error: input should be a valid date between 1990.1.1 ~ 2100.12.31"
    }

	const date = addOneDay(m, d, y)
    const weekday = nextWeekDay(m, d, y)
    return format(date, weekday)
}

const isLeapYear = (y) => !(y % 4 ? 1 : y % 100 ? 0 : y % 400)

const getYearLength = (y) => isLeapYear(y) ? 366 : 365

const getMonthLength = (m, y) => [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m-1]

const checkType = (m, d, y) => {
    const valid_y = typeof(y) == 'number'
    const valid_m = typeof(m) == 'number'
    const valid_d = typeof(d) == 'number'
    return valid_d && valid_m && valid_y
}

const checkRange = (m, d, y) => {
    const valid_y = 1900 <= y && y <= 2100
    const valid_m = 1    <= m && m <= 12
    const valid_d = 1    <= d && d <= getMonthLength(m, y)
    return valid_d && valid_m && valid_y
}

const addOneDay = (m, d, y) => d == getMonthLength(m, y) ? addOneMonth(m, 1, y) : [m, d+1, y]

const addOneMonth = (m, d, y) => m == 12 ? addOneYear(1, d, y) : [m+1, d, y]

const addOneYear = (m, d, y) => [m, d, y+1]

const nextWeekDay = (m, d, y) => {
    const catchYear  = now => now < y ? catchYear(now+1)+getYearLength(now) : 0
    const catchMonth = now => now < m ? catchMonth(now+1)+getMonthLength(now,y) : 0
    const catchDay   = now => d - now

    const interval   = catchYear(1990) + catchMonth(1) + catchDay(1)
    return (interval+1) % 7 // note that 1900.1.1 is Monday
}

const format = (date, weekday, lunar) => {
    const m = date[0]
    const d = date[1]
    const y = date[2]
    const w = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][weekday]

    return `${y}-${m}-${d} ${w}`
}

// exports some tool functions for white-box test
module.exports.isLeapYear     = isLeapYear
module.exports.getYearLength  = getYearLength
module.exports.getMonthLength = getMonthLength
module.exports.checkType      = checkType
module.exports.checkRange     = checkRange
module.exports.addOneDay      = addOneDay
module.exports.addOneMonth    = addOneMonth
module.exports.addOneYear     = addOneYear
module.exports.nextWeekDay    = nextWeekDay
module.exports.format         = format
