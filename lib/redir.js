module.exports = function redir(target) {
  return function (req, res, next) {
    res.redirect(301, target);    
  }
}