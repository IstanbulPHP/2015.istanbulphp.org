/*!
 * IstanbulPHP
 * Emir Karşıyakalı
 * Version 0.0.1
 */
(function(){

  'use strict';

  var app = angular.module('PHPKonfApp', [
    'pascalprecht.translate',
    'ngDialog',
    'ngSanitize'
  ])

  app.config(function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
  });

  app.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
  }]);

  app.controller('MainController', ['$http', '$scope', '$translate', 'ngDialog', '$rootScope', function ($http, $scope, $translate, ngDialog, $rootScope) {

    changeSpeakersLang($translate.preferredLanguage());

    function changeSpeakersLang(lang) {
      $http.get("languages/speakers_" + lang + ".json")
        .success (function (data) {
          $rootScope.speakers = data.speakers;
      });
    }

    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      changeSpeakersLang(langKey);
    };

    $scope.clickToOpen = function (speaker) {
      var speakerDialog = ngDialog.open({
        template  : 'modal.html',
        appendTo  : '#speakers',
        controller : function ($scope) {
          $scope.speaker = $rootScope.speakers[speaker];
        },
        showClose : false
      });
    };

  }]);

}());

