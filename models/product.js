class Product {
    constructor(
        title = randomString(1).toUpperCase() + randomString(9).toLowerCase() + ' ' + randomInt(100),
        price = randomInt(999999) / 9,
        currency = randomString(3).toUpperCase(),
        storage = randomInt(999),
        manufacturer = randomString(1).toUpperCase() + randomString(randomInt(15)).toLowerCase() + ' ' + randomString(1).toUpperCase() + randomString(randomInt(15)).toLowerCase(),
        in_stock = true
    ) {
        this.id = null
        this.title = title
        this.price = price
        this.currency = currency
        this.storage = storage
        this.manufacturer = manufacturer
        this.in_stock = in_stock
        this.last_update = new Date()
    }
}

function randomInt(rightBound) {
    return Math.floor(Math.random() * rightBound);
}

function randomString(size) {
    var alphaChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var generatedString = '';
    for (var i = 0; i < size; i++) {
        generatedString += alphaChars[randomInt(alphaChars.length)];
    }

    return generatedString;
}

module.exports = Product