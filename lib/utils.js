
var cloneDate = function(date) {
    return new Date(date.getTime());
}

var offsetDays = function(date, offset) {
        return new Date(cloneDate(date).setDate(date.getDate()+offset));
}

module.exports = {
    // Algorithm: http://www.smart.net/~mmontes/nature1876.html
    // Python implementation: http://code.activestate.com/recipes/576517-calculate-easter-western-given-a-year/
    easterDay: function(year) {
        a = year % 19;
        b = Math.floor(year / 100);
        c = year % 100;
        d = (19 * a + b - Math.floor(b / 4) - Math.floor((b - Math.floor((b + 8) / 25) + 1) / 3) + 15) % 30;
        e = (32 + 2 * (b % 4) + 2 * Math.floor(c / 4) - d - (c % 4)) % 7;
        f = d + e - 7 * Math.floor((a + 11 * d + 22 * e) / 451) + 114;
        month = Math.floor(f / 31) - 1;
        day = f % 31 + 1;
        return new Date(year, month, day);
    },

    cloneDate: cloneDate,
    offsetDays: offsetDays,

    nextWeekday: function(date, weekday) {
        var day = date.getDay();
        return offsetDays(date, (7 - day + weekday) % 7);
    }
}
