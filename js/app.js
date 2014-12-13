"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/
var reviewsUrl = 'https://api.parse.com/1/classes/reviews';
angular.module('ReviewApp', ['ui.bootstrap'])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'h3IOeWMrdU9K7kwRtYfBVAoqPUTrdP12TK5DffnP';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'mxKFiAkBO55Kc0qbXpsOfjCw8TxM2yTMWcJWlnTS';
    })

    .controller('ReviewsController', function($scope, $http) {
        $scope.refreshReviews = function() {
            $http.get(reviewsUrl + '?order=-votes')
                .success(function(data) {
                    $scope.reviews = Data.results;
                });
        };

     $scope.refreshReviews();
     $scope.newReview = {remove: false};
     $scope.successfulFeed = false;

	 $scope.addReview = function() {
        $scope.inserting = true;
        $http.post(reviewsUrl, $scope.newReview)
            .success(function(Data) {
                $scope.newReview.objectId = Data.objectId;
                $scope.reviews.push($scope.newReview);
                $scope.newReview = {remove: false};
                $scope.successfulFeed = true;
            })
            .finally(function() {
                $scope.inserting = false;
           });
      };
      $scope.deleteReview = function(review) {          
         $scope.updating = true;
         $http.delete(reviewsUrl + '/' + review.objectId)
         .success(function() {
             $scope.refreshReviews();
         })
         .error(function(err) {
             console.log(err);
         })
         .finally(function() {
                $scope.updating = false;
         })     
     };

        $scope.updateReview = function(review) {
            $scope.updating = true;
            $http.put(reviewsUrl + '/' + review.objectId, review)
                .success(function() {
                    console.log("success")
                })

                .error(function(err) {
                    console.log(err);
                })

                .finally(function() {
                    $scope.updating = false;
                });
        };










    });    