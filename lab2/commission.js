'use strict'

const Table = require('cli-table')

const price = {
    lock:   45,
    stock:  30,
    barrel: 25
}

const limit = {
    lock:   70,
    stock:  80,
    barrel: 90
}

const checkTelegram = (l, s, b) => {
    const isNatural = (x) => x == Math.floor(x) && x >= 0
    const valid_l = typeof(l) == 'number' && isNatural(l)
    const valid_s = typeof(s) == 'number' && isNatural(s)
    const valid_b = typeof(b) == 'number' && isNatural(b)
    return valid_b && valid_s && valid_l
}

const checkLimits = (l, s, b) =>
    l <= limit.lock && s <= limit.stock && b <= limit.barrel

let print = console.log.bind(console)

class Month {
    constructor() {
        this.lock = this.stock = this.barrel = 0
        this.isend = false
    }

    onTelegram(lock, stock, barrel) {
        if (this.isend) return "Error: this month is end"
        if (lock == -1) return this.isend = this.summary
        if (!checkTelegram(lock, stock, barrel)) return "Error: inputs should be natural numbers"
        if (!checkLimits(this.lock + lock, this.stock + stock, this.barrel + barrel)) return "Error: products sold this month has exceeded limits"
        this.lock   += lock
        this.stock  += stock
        this.barrel += barrel
        return "ok"
    }

    get sales() {
        return +
        this.lock   * price.lock  +
        this.stock  * price.stock +
        this.barrel * price.barrel
    }

    get commission() {
        const calcCommission = (sales) => {
            if (sales > 1800) return (sales - 1800) * 0.2  + calcCommission(1800)
            if (sales > 1000) return (sales - 1000) * 0.15 + calcCommission(1000)
            return sales * 0.1
        }
        return this.lock * this.stock * this.barrel ? calcCommission(this.sales) : 0
    }

    get summary() {
        const table = new Table({
            head: ['product', 'number', 'price', 'sales']
        })
        table.push(
            [ 'lock',   this.lock,   price.lock,   this.lock   * price.lock   ],
            [ 'stock',  this.stock,  price.stock,  this.stock  * price.stock  ],
            [ 'barrel', this.barrel, price.barrel, this.barrel * price.barrel ],
            [ 'Total', '/', '/', this.sales ]
        )
        print(table.toString())
        print(`Commission this month: ${this.commission || "0 (because no one whole rifle sold this month)"}`)
        return 'ok'
    }
}

Month.noprint = () => print = () => {}

module.exports = Month
