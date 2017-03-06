//  This will check wheather student is registered or not !!!
app.directive('registered', function($http) {
    return {
           restrict: 'A',
           require: 'ngModel',
           link: function (scope, element, attrs, ngModel) {
                element.bind('blur', function (e) {
                     ngModel.$setValidity('taken', true);
                     var d = {};
                     d["student_id"] = element.val();
                     $http.get("/api/student",d).success(function(data) {
                     	console.log(data);
                          if (!data) {
                              ngModel.$setValidity('taken', false);
                          }
                     });
                });
            }
    };
});

// app.directive('isActiveNav', [ '$location', function($location) {
// return {
//  restrict: 'A',
//  link: function(scope, element) {
//    scope.location = $location;
//    scope.$watch('location.path()', function(currentPath) {
//      if('/#' + currentPath === element[0].attributes['href'].nodeValue) {
//        element.parent().addClass('active');
//      } else {
//        element.parent().removeClass('active');
//      }
//    });
//  }
//  };
// }]);

app.directive('isActiveNav', function ($location) {
    return {
      link: function postLink(scope, element, attrs) {
        scope.$on("$routeChangeSuccess", function (event, current, previous) {
            /*  
                Designed for full re-usability at any path, any level, by using 
                data from attrs. Declare like this: 
                <li class="nav_tab">
                  <a href="#/home" detect-active-tab="1">HOME</a>
                </li> 
            */

            // This var grabs the tab-level off the attribute, or defaults to 1
            var pathLevel = attrs.detectActiveTab || 1,
            // This var finds what the path is at the level specified
                pathToCheck = $location.path().split('/')[pathLevel] || 
                  "current $location.path doesn't reach this level",
            // This var finds grabs the same level of the href attribute
                tabLink = attrs.href.split('/')[pathLevel] || 
                  "href doesn't include this level";
            // Above, we use the logical 'or' operator to provide a default value
            // in cases where 'undefined' would otherwise be returned.
            // This prevents cases where undefined===undefined, 
            // possibly causing multiple tabs to be 'active'.

            // now compare the two:
            if (pathToCheck === tabLink) {
              element.addClass("active");
            }
            else {
              element.removeClass("active");
            }
        });
      }
    };
  });