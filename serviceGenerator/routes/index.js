var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Generador de servicios' });
});

router.get('/index', function(req, res, next) {
  res.render('index.html', { title: 'Sample Node Express + Nunjucks app' });
});

router.get('/java', function(req, res, next) {
  res.render('javaServices.html', { title: 'Generador de servicios' });
});
router.get('/factory', function(req, res, next) {
  res.render('angularServices.html', { title: 'Generador de servicios' });
});
router.get('/controller', function(req, res, next) {
  res.render('angularController.html', { title: 'Generador de servicios' });
});

// /* GET contact-us page. */
// router.get('/contact', function(req, res, next) {
//   res.render('contact-us.html', { title: 'Contact form' });
// });

module.exports = router;
