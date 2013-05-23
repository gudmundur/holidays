var utils = require('./lib/utils');

var easterDay = utils.easterDay;
var offsetDays = utils.offsetDays;
var nextWeekday = utils.nextWeekday;

module.exports = function(year) {
    var easter = easterDay(year);
    var easterOffset = function(days) { return offsetDays(easter, days); }

    return [
        new Date(year, 0, 1),       // 1. janúar
        easterOffset(-3),           // Skírdagur
        easterOffset(-2),           // Föstudagurinn langi
        easter,                     // Páskadagur
        easterOffset(1),            // Annar i páskum
        nextWeekday(new Date(year, 3, 19), 4), // Sumardagurinn fyrsti
        new Date(year, 4 , 1),      // 1. maí
        easterOffset(39),           // Uppstigningardagur
        easterOffset(49),           // Hvítasunnudagur
        easterOffset(50),           // Annar í hvítasunnu
        new Date(year, 5, 17),      // 17. júni
        nextWeekday(new Date(year, 7, 1), 1), // Frídagur verslunarmanna
        new Date(year, 11, 24, 13), // Aðfangadagur
        new Date(year, 11, 25),     // Jóladagur
        new Date(year, 11, 26),     // Annar í jólum
        new Date(year, 11, 31, 13)  // Gamlársdagur
    ];
}
