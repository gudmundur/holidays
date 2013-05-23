var assert = require('assert');

var utils = require('./lib/utils');
var holidays = require('./');


var datePart = function(date) {
    return date.toISOString().substring(0, 10);
}

var assertDate = function(actual, expected) {
    assert.equal(datePart(actual), expected);
}

describe('utils', function() {
    describe('easter day', function() {
        it('is correct for 2012, 2013 and 2014', function() {
            assertDate(utils.easterDay(2012), '2012-04-08');
            assertDate(utils.easterDay(2013), '2013-03-31');
            assertDate(utils.easterDay(2014), '2014-04-20');
        });
    });

    describe('clone date', function() {
        it('creates a copy', function() {
            var d = new Date();
            var c = utils.cloneDate(d);

            assert.equal(d.toString(), c.toString());
            c.setYear(1900);
            assert.notEqual(d.toString(), c.toString());
        });
    })

    describe('offset days', function() {
        it('calculates next day', function() {
            var d = new Date(2013, 0, 1);
            var n = utils.offsetDays(d, 1);

            assert.ok(n.getFullYear() == 2013);
            assert.ok(n.getMonth() == 0);
            assert.ok(n.getDate() == 2);
        });

        it('calculates previous day', function() {
            var d = new Date(2013, 1, 1);
            var n = utils.offsetDays(d, -1);

            assert.ok(n.getFullYear() == 2013);
            assert.ok(n.getMonth() == 0);
            assert.ok(n.getDate() == 31);
        });

        it('calculates across years', function() {
            var d = new Date(2013, 11, 31);
            var n = utils.offsetDays(d, 1);

            assert.ok(n.getFullYear() == 2014);
            assert.ok(n.getMonth() == 0);
            assert.ok(n.getDate() == 1);
        });
    });

    describe('next weekday', function() {
        it('finds the next weekdays after 2013-01-01', function() {
            var day = new Date(2013, 0, 1);

            var tuesday = utils.nextWeekday(day, 2);
            var monday = utils.nextWeekday(day, 1);
            var sunday = utils.nextWeekday(day, 0);

            assertDate(tuesday, '2013-01-01');
            assertDate(monday,  '2013-01-07');
            assertDate(sunday,  '2013-01-06');
        });
    });
});

describe('holidays in Iceland in 2013', function() {
    it('are correct', function() {
        var days = holidays(2013);
        var dates = days.map(function(d) { return datePart(d); });

        var correctDates = [
            '2013-01-01',
            '2013-03-28',
            '2013-03-29',
            '2013-03-31',
            '2013-04-01',
            '2013-04-25',
            '2013-05-01',
            '2013-05-09',
            '2013-05-19',
            '2013-05-20',
            '2013-06-17',
            '2013-08-05',
            '2013-12-24',
            '2013-12-25',
            '2013-12-26',
            '2013-12-31'
        ];

        assert.deepEqual(dates, correctDates);
    });
});
