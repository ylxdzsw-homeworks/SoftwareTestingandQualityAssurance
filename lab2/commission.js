const Table = require('cli-table')

const price = {
    lock:   45,
    stock:  30,
    barrel: 25
}

class Month {
    constructor() {
        this.lock = this.stock = this.barrel = 0
        this.isend = false
    }

    onTelegram(lock, stock, barrel) {
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
        return calcCommission(this.sales)
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
        console.log(table.toString())
        console.log(`Commission this month: ${this.commission}`)
    }
}

module.exports = Month
