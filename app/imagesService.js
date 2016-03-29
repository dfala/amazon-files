angular.module('myApp')

.factory('imagesService', function ($http) {
  var service = {};

  service.storeImage = function (imageData, fileName) {
    var imageExtension = imageData.split(';')[0].split('/');
    imageExtension = imageExtension[imageExtension.length - 1];

    var newImage = {
      imageName: fileName,
      imageBody: imageData,
      imageExtension: imageExtension,
      userEmail: 'obama@usa.gov'
    }

    return $http.post('/api/newimage', newImage)
  }

  return service;
});