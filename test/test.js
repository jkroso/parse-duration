
var should = require("should");

var parse = require("../index.js");

describe('parse-duration tests', function() {

    it('Should parse nanoseconds', function() {
        parse("1 nanosecond").should.equal(0.000001);
        parse("1 ns").should.equal(0.000001);
    });

    it('Should parse microseconds', function() {
        parse("1 μs").should.equal(0.001);
        parse("1 microsecond").should.equal(0.001);
    });

    it('Should parse milliseconds', function() {
        parse("1 millisecond").should.equal(1);
        parse("1 ms").should.equal(1);
    });

    it('Should parse seconds', function() {
        parse("1 second").should.equal(1000);
        parse("1 sec").should.equal(1000);
        parse("1 s").should.equal(1000);
    });

    it('Should parse minutes', function() {
        parse("1 minute").should.equal(60000);
        parse("1 min").should.equal(60000);
        parse("1 m").should.equal(60000);
    });

    it('Should parse hours', function() {
        parse("1 hour").should.equal(3600000);
        parse("1 hr").should.equal(3600000);
        parse("1 h").should.equal(3600000);
    });

    it('Should parse days', function() {
        parse("1 day").should.equal(86400000);
        parse("1 d").should.equal(86400000);
    });

    it('Should parse weeks', function() {
        parse("1 week").should.equal(604800000);
        parse("1 wk").should.equal(604800000);
        parse("1 w").should.equal(604800000);
    });

    it('Should parse months', function() {
        parse("1 month").should.equal(2629800000);
    });

    it('Should parse years', function() {
        parse("1 year").should.equal(31557600000);
        parse("1 yr").should.equal(31557600000);
        parse("1 y").should.equal(31557600000);
    });

    describe('Edge cases', function() {
        
        it('Should parse plural duration', function() {
            parse("1 ys").should.equal(31557600000);
        });
        
        it('Should parse duration with no numbers', function() {
            parse("ms").should.equal(1);
            parse("month").should.equal(2629800000);
            parse("year").should.equal(31557600000);
        });        
        
    })

});