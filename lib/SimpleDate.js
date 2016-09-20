/*
 * Simple Date object to allow us to handle dates without time part and timezone/DST issues.
 *
 */

module.exports = function (holidays, i18n) {
    var _holidays = holidays;

    var _monthNames = i18n.monthNames;
    var _monthNamesAbbr = i18n.monthNamesAbbr;
    var _weekDays = i18n.weekDays;
    var _weekDaysAbbr = i18n.weekDaysAbbr;
    var _relativeAsText = i18n.relativeAsText;

    function SimpleDate(year, month, day) {
        if (year instanceof Date) {
            this.year = year.getFullYear();
            this.month = year.getMonth() + 1;
            this.day = year.getDate();
        } else if (year instanceof SimpleDate) {
            this.year = year.year;
            this.month = year.month;
            this.day = year.day;
        } else if (typeof(year) === 'string') {
            this.fromString(year);
        } else {
            this.year = year;
            this.month = month;
            this.day = day;
        };
    };

    SimpleDate.prototype._toValue = function () {
        return this.day + this.month * 32 + this.year * 32 * 13;
    };

    SimpleDate.prototype._toDate = function () {
        return new Date(this.year, this.month - 1, this.day, 12);
    };

    SimpleDate.prototype.fromString = function (dateString) {
        var dateLst = dateString.split("-");
        this.year = parseInt(dateLst[0], 10);
        this.month = parseInt(dateLst[1], 10);
        this.day = parseInt(dateLst[2], 10);
    };

    SimpleDate.prototype.toString = function () {
        var year = this.year;
        
        return year + "-" + this._toMonthDayString();
    };

    SimpleDate.prototype._toMonthDayString = function () {
        var monthStr = "0" + this.month;
        monthStr = monthStr.substring(monthStr.length - 2, monthStr.length);
        
        var dayStr = "0" + this.day;
        dayStr = dayStr.substring(dayStr.length - 2, dayStr.length);
        
        return monthStr + "-" + dayStr;
    };

    SimpleDate.prototype.prettyPrint = function (formatStr) {
        var tmp = formatStr.replace("%B", _monthNames[this.month])
                            .replace("%b", _monthNamesAbbr[this.month])
                            .replace("%d", this.day)
                            .replace("%m", this.month)
                            .replace("%Y", this.year)
                            .replace("%A", _weekDays[this.weekDayIndex()])
                            .replace("%a", _weekDaysAbbr[this.weekDayIndex()]);
        return tmp;
    };

    SimpleDate.prototype.isoWeekNr = function () {
        // From: http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
        var target = this._toDate();  
        
        // ISO week date weeks start on monday  
        // so correct the day number  
        var dayNr = (this._toDate().getDay() + 6) % 7;  
        
        // ISO 8601 states that week 1 is the week  
        // with the first thursday of that year.  
        // Set the target date to the thursday in the target week  
        target.setDate(target.getDate() - dayNr + 3);  
        
        // Store the millisecond value of the target date  
        var firstThursday = target.valueOf();  
        
        // Set the target to the first thursday of the year  
        // First set the target to january first  
        target.setMonth(0, 1);  
        // Not a thursday? Correct the date to the next thursday  
        if (target.getDay() != 4) {  
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);  
        }  
        
        // The weeknumber is the number of weeks between the   
        // first thursday of the year and the thursday in the target week  
        return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000  
    };


    SimpleDate.prototype.weekDayIndex = function () {
        var tmp = this._toDate();
        return (tmp.getDay() + 6) % 7;
    };

    SimpleDate.prototype.deltaDays = function (val) {
        var tmp = this._toDate();
        tmp.setDate(tmp.getDate() + val);
        this.year = tmp.getFullYear();
        this.month = tmp.getMonth() + 1;
        this.day = tmp.getDate();
    };
        
    SimpleDate.prototype.eq = function (dateObj) {
        if (dateObj instanceof SimpleDate) {
            return this.year === dateObj.year && this.month === dateObj.month && this.day === dateObj.day;
        } else if (dateObj instanceof Date) {
            return this.year == dateObj.getFullYear() && this.month == dateObj.getMonth() + 1 && this.day == dateObj.getDate();
        } else if (typeof(dateObj) === 'string') {
            var dateLst = dateObj.split("-");
            return this.year === parseInt(dateLst[0]) && this.month === parseInt(dateLst[1]) && this.day === parseInt(dateLst[2]);
        } else {
            return false;
        };
    };

    SimpleDate.prototype.gt = function (dateObj) {
        if (dateObj instanceof SimpleDate) {
            return this._toValue() > dateObj._toValue();
        };
        return undefined;
    };

    SimpleDate.prototype.lt = function (dateObj) {
        if (dateObj instanceof SimpleDate) {
            return this._toValue() < dateObj._toValue();
        };
        return undefined;
    };

    SimpleDate.prototype.isHoliday = function () {
        return this.weekDayIndex() == 6 || this._toMonthDayString() in _holidays || this.toString() in _holidays;
    };

    SimpleDate.prototype.daysFromToday = function () {
        var today = new Date();
        var delta = this._toDate() - today;
        var days = Math.round(delta / (24 * 3600 * 1000));
        return days;
    }

    SimpleDate.prototype.daysFromTodayInText = function (longForm) {
        var days = this.daysFromToday();
        return _relativeAsText(days, longForm);
    }

    return SimpleDate;
}