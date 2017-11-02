angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
  $stateProvider
  .state('app.icons', {
    url: "/icons",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Icons'
    }
  })
  .state('app.icons.fontawesome', {
    url: '/font-awesome',
    templateUrl: 'views/icons/font-awesome.html',
    ncyBreadcrumb: {
      label: 'Font Awesome'
    }
  })
  .state('app.icons.simplelineicons', {
    url: '/simple-line-icons',
    templateUrl: 'views/icons/simple-line-icons.html',
    ncyBreadcrumb: {
      label: 'Simple Line Icons'
    }
  })
  .state('app.components', {
    url: "/components",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Components'
    }
  })
  .state('app.components.buttons', {
    url: '/buttons',
    templateUrl: 'views/components/buttons.html',
    ncyBreadcrumb: {
      label: 'Buttons'
    }
  })
  .state('app.components.social-buttons', {
    url: '/social-buttons',
    templateUrl: 'views/components/social-buttons.html',
    ncyBreadcrumb: {
      label: 'Social Buttons'
    }
  })
  .state('app.components.cards', {
    url: '/cards',
    templateUrl: 'views/components/cards.html',
    ncyBreadcrumb: {
      label: 'Cards'
    }
  })
  .state('app.components.forms', {
    url: '/forms',
    templateUrl: 'views/components/forms.html',
    ncyBreadcrumb: {
      label: 'Forms'
    }
  })
  .state('app.components.switches', {
    url: '/switches',
    templateUrl: 'views/components/switches.html',
    ncyBreadcrumb: {
      label: 'Switches'
    }
  })
  .state('app.components.tables', {
    url: '/tables',
    templateUrl: 'views/components/tables.html',
    ncyBreadcrumb: {
      label: 'Tables'
    }
  })
  .state('app.forms', {
    url: '/forms',
    templateUrl: 'views/forms.html',
    ncyBreadcrumb: {
      label: 'Forms'
    },
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load([
          {
            serie: true,
            files: ['js/libs/moment.min.js']
          },
          {
            serie: true,
            files: ['js/libs/daterangepicker.min.js', 'js/libs/angular-daterangepicker.min.js']
          },
          {
            files: ['js/libs/mask.min.js']
          },
          {
            files: ['js/libs/select.min.js']
          }
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load({
          files: ['js/controllers/forms.js']
        });
      }]
    }
  })
  .state('app.widgets', {
    url: '/widgets',
    templateUrl: 'views/widgets.html',
    ncyBreadcrumb: {
      label: 'Widgets'
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/widgets.js']
        });
      }]
    }
  })
  .state('app.charts', {
    url: '/charts',
    templateUrl: 'views/charts.html',
    ncyBreadcrumb: {
      label: 'Charts'
    },
    resolve: {
      // Plugins loaded before
      // loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
      //     return $ocLazyLoad.load([
      //         {
      //             serial: true,
      //             files: ['js/libs/Chart.min.js', 'js/libs/angular-chart.min.js']
      //         }
      //     ]);
      // }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load({
          files: ['js/controllers/charts.js']
        });
      }]
    }
  })
  .state('app.programs', {
	  url: '/programs',
	  templateUrl: 'views/components/programs.html',
	  ncyBreadcrumb: {
		label: "Technical Programs"
	  },
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
          // you can lazy load controllers
          return $ocLazyLoad.load({
            files: ['js/controllers/main.js']
          });
        }]
      }
  })
  .state('app.details-program', {
    url: '/details-program/:idProgram',
    templateUrl: 'views/components/details-program.html',
    ncyBreadcrumb: {
    	parent: 'app.programs',
    label: "Program Details"
    },
    resolve: {
    	loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load CSS files
            return $ocLazyLoad.load([{
              serie: true,
              name: 'UI Carousel',
              files: ['bower_components/angular-slick-carousel/examples/css/app.css']
            }]);
          }],
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
          // you can lazy load controllers
          return $ocLazyLoad.load({
            files: ['js/controllers/main.js']
          });
        }]
      }
  })
  .state('app.drill', {
    url: '/drill',
    templateUrl: 'views/components/drill.html',
    ncyBreadcrumb: {
    label: "Drill"
    },
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
          // you can lazy load controllers
          return $ocLazyLoad.load({
            files: ['js/controllers/main.js','js/tester.js']
          });
        }]
      }
  })
  .state('app.drill-details', {
    url: '/drill-details/:idDrill',
    templateUrl: 'views/components/drill_details.html',
    ncyBreadcrumb: {
      parent: 'app.drill',
      label: "Drill Details"
    },
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
          // you can lazy load controllers
          return $ocLazyLoad.load({
            files: ['js/controllers/main.js']
          });
        }]
      }
  })
   .state('app.favourites', {
    url: '/favourites',
    templateUrl: 'views/components/favourites.html',
    ncyBreadcrumb: {
    label: "Favourites"
    },
    resolve: {
    	loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([{
              files: ['js/auth.js']
            }]);
          }],
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
          // you can lazy load controllers
          return $ocLazyLoad.load({
            files: ['js/controllers/main.js']
          });
        }]
      }
  })
  
     .state('app.test', {
    url: '/test',
    templateUrl: 'views/test.html',
    ncyBreadcrumb: {
    label: "TEST PAGE"
    },
    resolve: {
    	loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([{
              files: ['js/auth.js']
            }]);
          }],
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
          // you can lazy load controllers
          return $ocLazyLoad.load({
            files: ['js/tester.js']
          });
        }]
      }
  })
}]);
