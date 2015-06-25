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

  app.directive('ddTextCollapse', ['$compile', function($compile) {

      return {
          restrict: 'A',
          scope: true,
          link: function(scope, element, attrs) {

              // start collapsed
              scope.collapsed = false;

              // create the function to toggle the collapse
              scope.toggle = function() {
                  scope.collapsed = !scope.collapsed;
              };

              // wait for changes on the text
              attrs.$observe('ddTextCollapseText', function(text) {

                  // get the length from the attributes
                  var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);

                  if (text.length > maxLength) {
                      // split the text in two parts, the first always showing
                      var firstPart = String(text).substring(0, maxLength);
                      var secondPart = String(text).substring(maxLength, text.length);

                      // create some new html elements to hold the separate info
                      var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                      var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
                      var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
                      var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                      var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "less" : "more"}}</span>')(scope);

                      // remove the current contents of the element
                      // and add the new ones we created
                      element.empty();
                      element.append(firstSpan);
                      element.append(secondSpan);
                      element.append(moreIndicatorSpan);
                      element.append(lineBreak);
                      element.append(toggleButton);
                  }
                  else {
                      element.empty();
                      element.append(text);
                  }
              });
          }
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

    $scope.tabs = [{
                title: 'BKONF HALL',
                url: 'one.tpl.html'
            }, {
                title: 'FAZIL SAY HALL',
                url: 'two.tpl.html'
            }];

        $scope.currentTab = 'one.tpl.html';

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.url;
        }
        
        $scope.isActiveTab = function(tabUrl) {
            return tabUrl == $scope.currentTab;
        }

  }]);

}());

