angular.module('myApp', [])

.directive('fileread', function (imagesService) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind("change", function (changeEvent) {
        var reader = new FileReader();

        reader.onloadend = function (loadEvent) {
          debugger;
          var fileread = loadEvent.target.result;
          console.warn(fileread);

          var tempArray = elem['context'].value.split('\\');
          var fileName = tempArray[tempArray.length - 1];

          imagesService.storeImage(fileread, fileName)
          .then(function (result) {
            scope.images.unshift(result.data);
          })
          .catch(function (err) {
            console.error(err);
          });
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
})

.controller('MainController', function ($scope) {
  $scope.images = [];
});
