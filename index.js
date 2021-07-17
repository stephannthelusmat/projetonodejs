let express = require('express');
let app = express();
let materialescolar = require('./repos/materialescolar');

let router = express.Router();

app.use(express.json());

router.get('/all', function (req, res, next) {
    materialescolar.get(function (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Todas os materias escolares.",
        "data": data
      });
    }, function(err) {
      next(err);
    });
  });

  router.get('/search', function (req, res, next) {
    let searchObject = {
      "id": req.query.id,
      "nome": req.query.name
    };
  
    materialescolar.search(searchObject, function (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Todas os materias escolares.",
        "data": data
      });
    }, function (err) {
      next(err);
    });
  });

  router.delete('/:id', function (req, res, next) {
    materialescolar.getById(req.params.id, function (data) {
      if (data) {
        materialescolar.delete(req.params.id, function (data) {
          res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "o material '" + req.params.id + "' foi deletada.",
            "data": "material '" + req.params.id + "' deletada."
          });
        });
      }
      else {
        res.status(404).send({
          "status": 404,
          "statusText": "Not Found",
          "message": "A material '" + req.params.id + "' não pode ser encontrada.",
          "error": {
            "code": "NOT_FOUND",
            "message": "A material '" + req.params.id + "' não pode ser encontrada."
          }
        });
      }
    }, function(err) {
      next(err);
    });
  })

  app.use('/api/', router);
var server = app.listen(5000, function () {
  console.log('Node server is running on http://localhost:5000..');
});

 

