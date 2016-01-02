var validator = require('./number');

exports.testIsInteger = function(test){
    test.ok(validator.isInteger(2), "a positive number should be an integer");
    test.ok(validator.isInteger(-2), "a negative number should be an integer");
    test.ok(!validator.isInteger(13.11), "a floating point number should not be an integer");
    test.done();
};
