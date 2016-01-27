var home = function(req, res){
  var date = new Date();
  var month = date.getMonth()+1;
  var day = date.getDate();
  res.render("home", {"Christmas": month==12 && day==25 ? "YES" : "NO"});
};

module.exports.home = home;