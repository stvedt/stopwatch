module('App Tests');

test("App definition and instantiation", function() {
  notEqual(App, undefined, "App is NOT undefined.");
  equal(typeof App, "function", "App is a constructor function");

  var x = new App();
  equal(x.toString(), "[object App]", "Instance has proper toString override");
});