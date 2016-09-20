var assert = require('assert');
var expect = require('expect.js');

var holidays = require('../lib').holidays.se_sv;
var i18n = require('../lib').i18n.sv;
var SimpleDate = require('../lib').createSimpleDate(holidays, i18n); 

describe('SimpleDate', function() {
    
    var tmp;

    before(function(done) {    
        tmp = new SimpleDate(2013, 1, 1);    
        done()
    })

    it("Compare with date obj (equal)", function () {
        expect(tmp.eq(new Date(2013, 0, 1))).to.be(true);    
    });
    it("Compare with date obj (not equal)", function () {
        expect(tmp.eq(new Date(2013, 0, 2))).to.be(false);    
    });
    it("Compare with iso date string (equal)", function () {
        expect(tmp.eq("2013-01-01")).to.be(true);    
    });
    it("Compare with date string (equal)", function () {
        expect(tmp.eq("2013-1-1")).to.be(true);    
    });
    it("Compare with SimpleDate (equal)", function () {
        var tmp2 = new SimpleDate(2013,1,1);
        expect(tmp.eq(tmp2)).to.be(true);    
    });
    it("Compare with SimpleDate (not equal)", function () {
        var tmp2 = new SimpleDate(2013,1,2);
        expect(tmp.eq(tmp2)).to.be(false);    
    });
    it("Compare with SimpleDate (greater than other)", function () {
        var tmp1 = new SimpleDate(2013,12,20);
        var tmp2 = new SimpleDate(2012,12,20);
        expect(tmp1.gt(tmp2)).to.be(true);    
    });
    it("Compare with SimpleDate (less than other)", function () {
        var tmp1 = new SimpleDate(2013,12,20);
        var tmp2 = new SimpleDate(2014,12,20);
        expect(tmp1.lt(tmp2)).to.be(true);    
    });
    it("Check edge case (not greater than other)", function () {
        var tmp1 = new SimpleDate(2012,12,20);
        var tmp2 = new SimpleDate(2012,12,20);
        expect(tmp1.gt(tmp2)).to.be(false);    
    });
    it("Compare with SimpleDate (less than other)", function () {
        var tmp1 = new SimpleDate(2013,12,20);
        var tmp2 = new SimpleDate(2014,12,20);
        expect(tmp1.lt(tmp2)).to.be(true);    
    });
    it("Check edge case (not greater than other)", function () {
        var tmp1 = new SimpleDate(2012,12,20);
        var tmp2 = new SimpleDate(2012,12,20);
        expect(tmp1.lt(tmp2)).to.be(false);    
    });


    it("Clone SimpleDate and check equal", function () {
        var tmp2 = new SimpleDate(tmp);
        expect(tmp.eq(tmp2)).to.be(true);
    });
    it("Create Date and check equal", function () {
        var tmp = new Date();
        var tmp2 = new SimpleDate(tmp);
        expect(tmp2.eq(tmp)).to.be(true);
    });
    
    it("Increment one day", function () {
        var tmp2 = new SimpleDate(2013,2,28);
        tmp2.deltaDays(1);
        expect(tmp2.toString()).to.equal("2013-03-01");
    });
    
    it("Decrement one day", function () {
        var tmp2 = new SimpleDate(2013,1,1);
        tmp2.deltaDays(-1);
        expect(tmp2.toString()).to.equal("2012-12-31");
    });

    it("Tomorrow is one day from today", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(1);
        var deltaDays = tmp2.daysFromToday()
        expect(deltaDays).to.equal(1);
    });

    it("Yesterday is minus one day from today", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(-1);
        var deltaDays = tmp2.daysFromToday()
        expect(deltaDays).to.equal(-1);
    });
    
    it("Two weeks from now is fourteen days from today", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(14);
        var deltaDays = tmp2.daysFromToday()
        expect(deltaDays).to.equal(14);
    });

    it("Yesterday in text", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(-1);
        var text = tmp2.daysFromTodayAsText()
        expect(text).to.equal("Igår");
    });

    it("Today in text", function () {
        var tmp2 = new SimpleDate(new Date());
        var text = tmp2.daysFromTodayAsText()
        expect(text).to.equal("Idag");
    });

    it("Five days ago in text", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(-5);
        var text = tmp2.daysFromTodayAsText()
        expect(text).to.equal("För fem dagar sedan");
    });

    it("Two weeks ago in text", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(-14);
        var text = tmp2.daysFromTodayAsText()
        expect(text).to.equal("För 14 dagar sedan");
    });

    it("Twelve days in the future in text", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(12);
        var text = tmp2.daysFromTodayAsText()
        expect(text).to.equal("Om tolv dagar");
    });

    it("Two weeks in the future in text", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(14);
        var text = tmp2.daysFromTodayAsText()
        expect(text).to.equal("Om 14 dagar");
    });

    it("Twelve days in the future in text, long form", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(12);
        var text = tmp2.daysFromTodayAsText(true)
        expect(text).to.equal("Om tolv dagar");
    });

    it("Two weeks in the future in text, long form", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(14);
        var text = tmp2.daysFromTodayAsText(true)
        expect(text).to.equal("Om två veckor");
    });

    it("16 days in the future in text, long form", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(16);
        var text = tmp2.daysFromTodayAsText(true)
        expect(text).to.equal("Om två veckor och två dagar");
    });

    it("Twelve days ago in text, long form", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(-12);
        var text = tmp2.daysFromTodayAsText(true)
        expect(text).to.equal("För tolv dagar sedan");
    });

    it("Two weeks ago in text, long form", function () {
        var tmp2 = new SimpleDate(new Date());
        tmp2.deltaDays(-14);
        var text = tmp2.daysFromTodayAsText(true)
        expect(text).to.equal("För två veckor sedan");
    });
});