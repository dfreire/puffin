var validator = require('./text');

exports.testIsString = function(test){
    test.ok(validator.isString("this is a valid text"), "a valid text should be a string");
    test.ok(!validator.isString(123), "a number should not be a string");
    test.done();
};
