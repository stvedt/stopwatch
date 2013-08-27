module('Lib Tests');

test("jQuery", function() {
  ok(jQuery, "jQuery variable is defined.");
  equal(jQuery, $, "Both jQuery and $ are referencing same object.");
  notEqual(jQuery, undefined, "jQuery is NOT undefined.");
});