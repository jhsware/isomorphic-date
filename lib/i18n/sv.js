module.exports.monthNames = ["", "Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
module.exports.monthNamesAbbr = ["", "Jan", "Feb", "Mars", "Apr", "Maj", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dec"];
module.exports.weekDays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
module.exports.weekDaysAbbr = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];

var _numbersAsText = {
    1: "en", 2: "två", 3: "tre", 4: "fyra", 5: "fem", 6: "sex", 7: "sju", 8: "åtta", 9: "nio", 10: "tio", 11: "elva", 12: "tolv"
}

function asText(delta) {
    return _numbersAsText[delta] || delta
}


module.exports.relativeAsText = function (delta, longForm) {
    // Delta -- nr of days from Today
    // longForm -- returns text as weeks and days
    if (delta == -1) {
        // Yesterday
        return "Igår";
    } else if (delta == 0) {
        // Today
        return "Idag";
    } else if (delta == 1) {
        // Tomorrow
        return "Imorgon";
    } else if (delta < -1) {
        // More than one day ago
        var absDelta = Math.abs(delta);
        if (longForm && absDelta > 13) {
            if (absDelta > 13) {
                var days = absDelta % 7;
                var weeks = (absDelta - days) / 7;
                return "För " + asText(weeks) + " veckor" + (days > 0 ? " och " + asText(days) + " dagar" : "") + " sedan";
            }
        } else {
            return "För " + asText(absDelta) + " dagar sedan";
        }
    } else {
        if (longForm && delta > 13) {
            var days = delta % 7;
            var weeks = (delta - days) / 7;
            return "Om " + asText(weeks) + " veckor" + (days > 0 ? " och " + asText(days) + " dagar" : "");
        } else {
            return "Om " + asText(delta) + " dagar"
        }
    }
}
