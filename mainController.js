var AWS = require('aws-sdk');
var Keys = require('./keys.js');

// Hard amazon aws config
AWS.config.update({
    accessKeyId: Keys.amazonAccess
  , secretAccessKey: Keys.amazonSecret
  , region: Keys.amazonRegion
});

var s3 = new AWS.S3();

var exports = module.exports = {};


exports.saveImage = function (req, res) {
  buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // bucketName var below crates a "folder" for each user
  var bucketName = 'mailpants/' + req.body.userEmail;
  var params = {
      Bucket: bucketName
    , Key: req.body.imageName
    , Body: buf
    , ContentType: 'image/' + req.body.imageExtension
    , ACL: 'public-read'
  };

  s3.upload(params, function (err, data) {
    console.log(err, data);
    if (err) return res.status(500).send(err);

    // TODO: save data to mongo
    res.json(data);
  });
}