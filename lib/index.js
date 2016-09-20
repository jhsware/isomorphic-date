module.exports.createSimpleDate = require('./SimpleDate')

var se_sv = require('./holidays/se_sv')
module.exports.holidays = {
    "se_sv": se_sv
}

var sv = require('./i18n/sv')
module.exports.i18n = {
    sv: sv
}