# isomorphic-date #

When you only want to work with days and dates. Skipping the hassle of time and timezones.

###Examples:###

```
var holidays = require('isomorphic-date').holidays.se_sv
var i18n = require('isomorphic-date').i18n.sv

// Create date object with provided translation files and i18n data
var SimpleDate = require('isomorphic-date').createSimpleDate(holidays, i18n)

// Create a date by passing a js date obj
var today = new SimpleDate(new Date())
today.daysFromToday() == 0
today.daysFromTodayAsText() == "Idag" // "Today" in swedish as per i18n data

// Create a date by passing a string
var date = new SimpleDate("2016-01-01")
date.toString() == "2016-01-01"
date.year == 2016
date.month == 1
date.day == 1
date.isoWeekNr() == 1
date.isHoliday() == "Nyårsdagen" // Returns false || true (Sundays) || string (if it is a holiday according to the passed holiday data)

date.deltaDays(1)


// Create a date by passing params
var date = new SimpleDate(2016, 1, 5)
date.toString() == "2016-01-05"

// Create a date by passing another SimpleDate obj
var date2 = new SimpleDate(date)
date2.toString() == "2016-01-05"

// Compare simple dates
date2.eq(date) // true
date.lt(today) // true
date.gt(today) // false
```

### i18n and holidays ###

To internationalise you can copy and edit `lib/holidays/se_sv.js` and `lib/i18n/sv.js`. Pass your customised objects to the SimpleDate factory:

``` 
var holidays = require('./custom_holidays.js')
var i18n = require('./custom_i18n.js')

var SimpleDate = require('isomorphic-date')(holidays, i18n)
```

### Tests ###

To run the tests do an `npm install` and then `npm run test`.