//main.js
angular
.module('app')
.controller('cardChartCtrl1', cardChartCtrl1)
.controller('cardChartCtrl2', cardChartCtrl2)
.controller('cardChartCtrl3', cardChartCtrl3)
.controller('cardChartCtrl4', cardChartCtrl4)
.controller('trafficDemoCtrl', trafficDemoCtrl)
.controller('socialBoxCtrl', socialBoxCtrl)
.controller('sparklineChartCtrl', sparklineChartCtrl)
.controller('barChartCtrl', barChartCtrl)
.controller('horizontalBarsCtrl', horizontalBarsCtrl)
.controller('horizontalBarsType2Ctrl', horizontalBarsType2Ctrl)
.controller('usersTableCtrl', usersTableCtrl)
.controller('allenamentiCtrl', allenamentiCtrl)
.controller('detailsProgramCtrl', detailsProgramCtrl)
.controller('drillCtrl', drillCtrl)
.controller('favouritesCtrl',favouritesCtrl)
.controller('drillDetailsCtrl', drillDetailsCtrl)

//convert Hex to RGBA
function convertHex(hex,opacity){
  hex = hex.replace('#','');
  r = parseInt(hex.substring(0,2), 16);
  g = parseInt(hex.substring(2,4), 16);
  b = parseInt(hex.substring(4,6), 16);

  result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
  return result;
}

cardChartCtrl1.$inject = ['$scope'];
function cardChartCtrl1($scope) {

  $scope.labels = ['January','February','March','April','May','June','July'];
  $scope.data = [
    [65, 59, 84, 84, 51, 55, 40]
  ];
  $scope.colors = [{
    backgroundColor: brandPrimary,
    borderColor: 'rgba(255,255,255,.55)',
  }];
  $scope.options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, $scope.data[0]) - 5,
          max: Math.max.apply(Math, $scope.data[0]) + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  }
}

cardChartCtrl2.$inject = ['$scope'];
function cardChartCtrl2($scope) {

  $scope.labels = ['January','February','March','April','May','June','July'];
  $scope.data = [
    [1, 18, 9, 17, 34, 22, 11]
  ];
  $scope.colors = [{
    backgroundColor: brandInfo,
    borderColor: 'rgba(255,255,255,.55)',
  }];
  $scope.options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, $scope.data[0]) - 5,
          max: Math.max.apply(Math, $scope.data[0]) + 5
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },

    },
  }
}

cardChartCtrl3.$inject = ['$scope'];
function cardChartCtrl3($scope) {

  $scope.labels = ['January','February','March','April','May','June','July'];
  $scope.data = [
    [78, 81, 80, 45, 34, 12, 40]
  ];
  $scope.data4 = [
    [35, 23, 56, 22, 97, 23, 64]
  ];
  $scope.colors = [{
    backgroundColor: 'rgba(255,255,255,.2)',
    borderColor: 'rgba(255,255,255,.55)',
  }];
  $scope.options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  }
}

function random(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

cardChartCtrl4.$inject = ['$scope'];
function cardChartCtrl4($scope) {

  var elements = 16;
  var labels = [];
  var data = [];
  //
  for (var i = 2000; i <= 2000 + elements; i++) {
    labels.push(i);
    data.push(random(40,100));
  }

  $scope.labels = labels;

  $scope.data = [data];

  $scope.colors = [{
    backgroundColor: 'rgba(255,255,255,.3)',
    borderWidth: 0
  }];
  $scope.options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display: false
      }]
    },
  }
}

trafficDemoCtrl.$inject = ['$scope'];
function trafficDemoCtrl($scope){

  function random(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  var elements = 27;
  var data1 = [];
  var data2 = [];
  var data3 = [];

  for (var i = 0; i <= elements; i++) {
    data1.push(random(50,200));
    data2.push(random(80,100));
    data3.push(65);
  }

  $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  $scope.series = ['Current', 'Previous', 'BEP'];
  $scope.data = [ data1, data2, data3];
  $scope.colors = [{
    backgroundColor: convertHex(brandInfo,10),
    borderColor: brandInfo,
    pointHoverBackgroundColor: '#fff'

  }, {
    backgroundColor: 'transparent',
    borderColor: brandSuccess,
    pointHoverBackgroundColor: '#fff'
  },{
    backgroundColor: 'transparent',
    borderColor: brandDanger,
    pointHoverBackgroundColor: '#fff',
    borderWidth: 1,
    borderDash: [8, 5]
  }];
  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  }
}

dateRangeCtrl.$inject = ['$scope'];
function dateRangeCtrl($scope) {
  $scope.date = {
    startDate: moment().subtract(5, 'days'),
    endDate: moment()
  };
  $scope.opts = {
    drops: 'down',
    opens: 'left',
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 days': [moment().subtract(7, 'days'), moment()],
      'Last 30 days': [moment().subtract(30, 'days'), moment()],
      'This month': [moment().startOf('month'), moment().endOf('month')]
    }
  };

  //Watch for date changes
  $scope.$watch('date', function(newDate) {
    ////console.log('New date set: ', newDate);
  }, false);

  function gd(year, month, day) {
    return new Date(year, month - 1, day).getTime();
  }
}

socialBoxCtrl.$inject = ['$scope'];
function socialBoxCtrl($scope) {

  $scope.labels = ['January','February','March','April','May','June','July'];
  $scope.data1 = [
    [65, 59, 84, 84, 51, 55, 40]
  ];
  $scope.data2 = [
    [1, 13, 9, 17, 34, 41, 38]
  ];
  $scope.data3 = [
    [78, 81, 80, 45, 34, 12, 40]
  ];
  $scope.data4 = [
    [35, 23, 56, 22, 97, 23, 64]
  ];
  $scope.colors = [{
    backgroundColor: 'rgba(255,255,255,.1)',
    borderColor: 'rgba(255,255,255,.55)',
    pointHoverBackgroundColor: '#fff'
  }];
  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  }
}

sparklineChartCtrl.$inject = ['$scope'];
function sparklineChartCtrl($scope) {
  $scope.labels = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  $scope.data1 = [
    [65, 59, 84, 84, 51, 55, 40]
  ];
  $scope.data2 = [
    [1, 13, 9, 17, 34, 41, 38]
  ];
  $scope.data3 = [
    [78, 81, 80, 45, 34, 12, 40]
  ];
  $scope.data4 = [
    [35, 23, 56, 22, 97, 23, 64]
  ];
  $scope.default = [{
    backgroundColor: 'transparent',
    borderColor: '#d1d4d7',
  }];
  $scope.primary = [{
    backgroundColor: 'transparent',
    borderColor: brandPrimary,
  }];
  $scope.info = [{
    backgroundColor: 'transparent',
    borderColor: brandInfo,
  }];
  $scope.danger = [{
    backgroundColor: 'transparent',
    borderColor: brandDanger,
  }];
  $scope.warning = [{
    backgroundColor: 'transparent',
    borderColor: brandWarning,
  }];
  $scope.success = [{
    backgroundColor: 'transparent',
    borderColor: brandSuccess,
  }];
  $scope.options = {
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
  }
}

horizontalBarsCtrl.$inject = ['$scope'];
function horizontalBarsCtrl($scope) {

  $scope.data = [
    {
      day: 'Monday',    new: 34, recurring: 78
    },
    {
      day: 'Tuesday',   new: 56, recurring: 94
    },
    {
      day: 'Wednesday', new: 12, recurring: 67
    },
    {
      day: 'Thursday',  new: 43, recurring: 91
    },
    {
      day: 'Friday',    new: 22, recurring: 73
    },
    {
      day: 'Saturday',  new: 53, recurring: 82
    },
    {
      day: 'Sunday',    new: 9,  recurring: 69
    }
  ];
}

horizontalBarsType2Ctrl.$inject = ['$scope'];
function horizontalBarsType2Ctrl($scope) {

  $scope.gender = [
    {
      title: 'Male',
      icon: 'icon-user',
      value: 43
    },
    {
      title: 'Female',
      icon: 'icon-user-female',
      value: 37
    },
  ];

  $scope.source = [
    {
      title: 'Organic Search',
      icon: 'icon-globe',
      value: 191235,
      percent: 56
    },
    {
      title: 'Facebook',
      icon: 'icon-social-facebook',
      value: 51223,
      percent: 15
    },
    {
      title: 'Twitter',
      icon: 'icon-social-twitter',
      value: 37564,
      percent: 11
    },
    {
      title: 'LinkedIn',
      icon: 'icon-social-linkedin',
      value: 27319,
      percent: 8
    }
  ];
}

usersTableCtrl.$inject = ['$scope', '$timeout'];
function usersTableCtrl($scope, $timeout) {

  $scope.users = [
    {
      avatar: '1.jpg',
      status: 'active',
      name: 'Yiorgos Avraamu',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'USA',
      flag: 'USA.png',
      usage: '50',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'mastercard',
      activity: '10 sec ago',
      satisfaction: '48'
    },
    {
      avatar: '2.jpg',
      status: 'busy',
      name: 'Avram Tarasios',
      new: false,
      registered: 'Jan 1, 2015',
      country: 'Brazil',
      flag: 'Brazil.png',
      usage: '10',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'visa',
      activity: '5 minutes ago',
      satisfaction: '61'
    },
    {
      avatar: '3.jpg',
      status: 'away',
      name: 'Quintin Ed',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'India',
      flag: 'India.png',
      usage: '74',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'stripe',
      activity: '1 hour ago',
      satisfaction: '33'
    },
    {
      avatar: '4.jpg',
      status: 'offline',
      name: 'Enéas Kwadwo',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'France',
      flag: 'France.png',
      usage: '98',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'paypal',
      activity: 'Last month',
      satisfaction: '23'
    },
    {
      avatar: '5.jpg',
      status: 'active',
      name: 'Agapetus Tadeáš',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'Spain',
      flag: 'Spain.png',
      usage: '22',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'google',
      activity: 'Last week',
      satisfaction: '78'
    },
    {
      avatar: '6.jpg',
      status: 'busy',
      name: 'Friderik Dávid',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'Poland',
      flag: 'Poland.png',
      usage: '43',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'amex',
      activity: 'Yesterday',
      satisfaction: '11'
    }
  ]
}

clientsTableCtrl.$inject = ['$scope', '$timeout'];
function clientsTableCtrl($scope, $timeout) {

  $scope.users = [
    {
      avatar: '1.jpg',
      status: 'active',
      name: 'Yiorgos Avraamu',
      registered: 'Jan 1, 2015',
      activity: '10 sec ago',
      transactions: 189,
      comments: 72
    },
    {
      avatar: '2.jpg',
      status: 'busy',
      name: 'Avram Tarasios',
      registered: 'Jan 1, 2015',
      activity: '5 minutes ago',
      transactions: 156,
      comments: 76
    },
    {
      avatar: '3.jpg',
      status: 'away',
      name: 'Quintin Ed',
      registered: 'Jan 1, 2015',
      activity: '1 hour ago',
      transactions: 189,
      comments: 72
    },
    {
      avatar: '4.jpg',
      status: 'offline',
      name: 'Enéas Kwadwo',
      registered: 'Jan 1, 2015',
      activity: 'Last month',
      transactions: 189,
      comments: 72
    },
    {
      avatar: '5.jpg',
      status: 'active',
      name: 'Agapetus Tadeáš',
      registered: 'Jan 1, 2015',
      activity: 'Last week',
      transactions: 189,
      comments: 72
    },
    {
      avatar: '6.jpg',
      status: 'busy',
      name: 'Friderik Dávid',
      registered: 'Jan 1, 2015',
      activity: 'Yesterday',
      transactions: 189,
      comments: 72
    }
  ]
}

function random(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

barChartCtrl.$inject = ['$scope'];
function barChartCtrl($scope) {

  var elements = 16;
  var labels = [];
  var data = [];
  var data1 = [];
  var data2 = [];

  for (var i = 0; i <= elements; i++) {
    labels.push('1');
    data.push(random(40,100));
    data1.push(random(20,100));
    data2.push(random(60,100));
  }

  $scope.labels = labels;

  $scope.data = [data];
  $scope.data1 = [data1];
  $scope.data2 = [data2];

  $scope.options = {
    showScale: false,
    scaleFontSize: 0,
    scaleShowGridLines: false,
    barStrokeWidth : 0,
    barBackground: 'rgba(221, 224, 229, 1)',

    // pointDot :false,
    // scaleLineColor: 'transparent',
  };

  $scope.colors = [{
    backgroundColor : brandInfo,
    borderColor : 'rgba(0,0,0,1)',
    highlightFill: '#818a91',
    pointborderColor: '#000'
  }];
}

allenamentiCtrl.$inject =  ['$scope','$http','$state','auth','$q','$location', '$rootScope'];
function allenamentiCtrl($scope, $http, $state, auth, $q, $location, $rootScope) {
	//console.log("portalURL: "+config.portalURL);
	$scope.portalURL = config.portalURL;
	$scope.branches = [];
	$scope.programs = {};
	$scope.promises = [];
	$rootScope.menuList = [];
	$scope.programs_inclusions = [];

	$scope.colors = ["#ffccff","#4dbd74","#63c2de","#f8cb00","#f86c6b"];

  $scope.config = {
      headers: {
        "Content-Type":"application/json"
      }
  }

  // Lista dei branches
  $http({
	  method: 'GET',
	  url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/taxonomy_term/branch?fields[taxonomy_term--branch]=name,uuid,field_label'
  }).then(function successCallback(response) {
	  //console.log("Lista dei branches:" +JSON.stringify(response.data.data));
	  $scope.branches = response.data.data;

	  // Per ogni branch ne prelevo i programs e costruisco un array di promises relative alle get.
	  for (branch in $scope.branches){
		   uuid = $scope.branches[branch].attributes.uuid;
		   menuVoice = {
				   'name': $scope.branches[branch].attributes.field_label,
				   'callBack' :  $scope.selectBranch,
				   'elementID' : 'collapse-'+branch
		   }
		   $rootScope.menuList.push(menuVoice);
		   p = $http({
					  method: 'GET',
					  ignoreLoadingBar: true,
					  url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/node/program?fields[node--program]=title,body,changed,field_image,field_branch&include=field_image&fields[file--file]=url&filter[program][condition][path]=field_branch.uuid&filter[program][condition][value]='+uuid
				  });
		  $scope.promises.push(p);
	  }
	  // Processo l'array di promises attendendo che tutte siano risolte e costruisco l'array dei programs raggruppati per branch
	  $q.all($scope.promises)
	  		.then(function(values){
	  			for (value in values){
	  				//console.log("Value è "+JSON.stringify(values[value]));
	  				lista_programs = values[value].data.data;
	  				branch_id = lista_programs[0].relationships.field_branch.data.id;
	  				//console.log("Branch id: "+branch_id);
	  				$scope.programs[branch_id] = lista_programs;

	  				// Aggiungo le info aggiuntive sui programs in questo array
	  				$scope.programs_inclusions[branch_id] = values[value].data.included;
	  			}

	  			//console.log("Ecco la lista di tutti i programs: "+JSON.stringify($scope.programs));
	  		})

  }, function errorCallback(response) {
	  //console.log("Errore nel recupero dei branches"+ JSON.stringify(response.data));
  });

  $scope.goToDetails = function (programID){
	  $location.url("/details-program/"+programID);
  }
  
  $scope.selectBranch = function(elementId, event){
	  current = angular.element(event.target);
	  current.parent().find('.upper-menu-voice').removeClass("voice-highlighted");
	  current.addClass('voice-highlighted');
	  console.log("selecting branch ...");
	  angular.element('.gym-branch-card').hide();
	  angular.element('#'+elementId).parent().show();
	  angular.element('#'+elementId).show();
  }
  
  $rootScope.selectBranch = $scope.selectBranch;

}

detailsProgramCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'auth', '$q', '$rootScope','$timeout'];
function detailsProgramCtrl($scope, $http, $state, $stateParams,auth, $q, $rootScope, $timeout) {
	
  programID = $scope.idProgram = $stateParams.idProgram;
  $scope.prova = 'test';
  $scope.callExecuted = false;
  $scope.config = config;
  $scope.apparatus = [];
  $scope.apparatus_inclusions = {};
  $scope.difficulties = [];
  $scope.groups = [];
  $scope.skills = {};
  $scope.promises = [];
  $scope.navigation = {};
  $rootScope.menuList = [];
  $scope.skills_inclusions = {};
  $scope.skill_difficulties = [];
  
  //Slick Carousel Config
  $scope.number3 = [{label: 1}, {label: 2}, {label: 3}, {label: 4}, {label: 5}, {label: 6}, {label: 7}, {label: 8}];
  $scope.slickConfig3Loaded = false;
  $scope.slickConfig3 = {
	enabled: true,
    method: {},
    dots: true,
    infinite: false,
    autoplay:false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    event: {
    	edge: function (event, slick, direction) {
            console.log(direction);
          }
    },
    responsive: [
     {
         breakpoint: 1366,
         settings: {
           slidesToShow: 4,
           slidesToScroll: 4,
           dots: false
         }
       },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 544,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  callApparatus = $http({
	  	method: 'GET',
	  	url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/taxonomy_term/apparatus?filter[program][condition][path]=field_program.uuid&filter[program][condition][value]='+programID+'&fields[taxonomy_term--apparatus]=name,field_icon&include=field_icon&fields[file--file]=url'
  })

  callDifficulties = $http({
	  	method: 'GET',
	  	ignoreLoadingBar: true,
	  	url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/taxonomy_term/difficulty?filter[program][condition][path]=field_program.uuid&filter[program][condition][value]='+programID+'&fields[taxonomy_term--difficulty]=name'
  }).then(function success(response){
	  $scope.difficulties = response.data.data;
  },function error(response){

  })

  $scope.getGroupsAndSkills = function(apparatusID){
	  $scope.callExecuted = false;
	  $scope.allSkillsLoaded = false;
	  $scope.slickConfig3Loaded=false;
	  //console.log("Costruisco la lista di groups and skill per l'apparato "+apparatusID);
	  getGroups = $http({
		  	method: 'GET',
		  	ignoreLoadingBar: true,
		  	url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/taxonomy_term/element_group?filter[program][condition][path]=field_program.uuid&filter[program][condition][value]='+programID+'&fields[taxonomy_term--element_group]=name&filter[apparatus][condition][path]=field_apparatus.uuid&filter[apparatus][condition][value]='+apparatusID
	  }).then(function success(response){
		  $scope.groups = response.data.data;
		  $scope.callExecuted = true;
		  for (group in $scope.groups){
			  groupID = $scope.groups[group].id;
			  p = $http({
				  method: 'GET',
				  ignoreLoadingBar: true,
				  url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/node/skill?filter[program][condition][path]=field_program.uuid&filter[program][condition][value]='+programID+'&include=field_image,field_difficulty&fields[node--skill]=body,field_code,field_value,field_difficulty,field_element_group,field_image&fields[file--file]=url&field[apparatus][condition][path]=field_apparatus.uuid&field[apparatus][condition][value]='+apparatusID+'&field[group][condition][path]=field_element_group.uuid&field[group][condition][value]='+groupID+'&fields[taxonomy_term--difficulty]=name&page[limit]=200&page[offset]=0'
			  });
			  $scope.promises.push(p);
		  }
		  $q.all($scope.promises)
		  		.then (function success(responses){
		  			for (response in responses){
		  				////console.log(JSON.stringify(responses[response].data.data));
		  				lista_skills = responses[response].data.data;
		  				group_id = lista_skills[0].relationships.field_element_group.data.id;
		  				$scope.skills[group_id] = lista_skills;
		  			
		  				$scope.navigation[group_id] = {};
		  				if (responses[response].data.links.next !=null)
		  					$scope.navigation[group_id]["next"] = responses[response].data.links.next;
		  				else $scope.navigation[group_id]["next"] = 0;
		  				$scope.navigation[group_id]["prev"] = 0;
		  				// Aggiungo le info aggiuntive sui skills in questo array
		  				skills_inclusions_with_index = {};
		  				included = responses[response].data.included;
		  				for (inclusion in included){
		  					skills_inclusions_with_index[included[inclusion].id] = included[inclusion];
		  				}
		  				
		  				$scope.skills_inclusions[group_id] = skills_inclusions_with_index;

		  			}
		  			console.log("Gli skills di questo gruppo: "+JSON.stringify($scope.skills['fd039fef-d8e2-4240-aae0-0dee62a6613c']));
		  			$scope.allSkillsLoaded =true; 
		  			$scope.slickConfig3Loaded=true;
		  			//console.log("Ecco la lista di tutti gli skills: "+JSON.stringify($scope.skills));
		  			//console.log("Ecco le inclusioni: "+ JSON.stringify($scope.skills_inclusions));
		  		},function error(response){
		  			//console.log("Errore nel recupero degli skills");
		  		})
	  },function error(){
		  //console.log("Errore nel recupero di tutti i gruppi");
	  })
  }

  callApparatus.then(function success(response){
	  list_apparatus = response.data.data;
	  console.log("Lista degli apparatus: "+JSON.stringify(list_apparatus));
	  $scope.apparatus = list_apparatus;
	  $scope.apparatus_inclusions = response.data.included;

		apparatus_inclusions_with_index = {};
		included = response.data.included;
		for (inclusion in included){
			apparatus_inclusions_with_index[included[inclusion].id] = included[inclusion];
		}

		$scope.apparatus_inclusions = apparatus_inclusions_with_index;
	    $scope.getGroupsAndSkills(list_apparatus[0].id)
  },function error(response){
	  //console.log("Impossibile reperire la lista di apparatus per il program "+programID);
      //console.log("Error - "+response.data);
  });

  $scope.navigate = function(group, direction) {
	  navigateNextOrPrev = $http({
		  	method: 'GET',
		  	url: config.proxyURL+'/'+$scope.navigation[group][direction]
	  }).then (function success(response){
		    lista_skills = response.data.data;
			group_id = group;
			$scope.skills[group_id] = lista_skills;
			if (response.data.links.next !=null)
				$scope.navigation[group_id]["next"] = response.data.links.next;
			else $scope.navigation[group_id]["next"] = 0;
			if (response.data.links.prev !=null)
				$scope.navigation[group_id]["prev"] = response.data.links.prev;
			else $scope.navigation[group_id]["prev"] = 0;
			// Aggiungo le info aggiuntive sui skills in questo array
			included = response.data.included;
			for (inclusion in included){
				$scope.skills_inclusions[group_id][included[inclusion].id] = included[inclusion];
			}

	  },function error(){

	  })
  }

  $scope.select = function(index){
	  console.log("index is "+index);
	  for (app in $scope.apparatus){
		  $scope.apparatus[app]['selected'] = false;
	  }
	  $scope.apparatus[index]['selected']=true;
  }

  $scope.toggleDifficulty = function (name){
	  $timeout(function () {
		  $scope.allSkillsLoaded = true;
		  $scope.slickConfig3Loaded = true;
		   
	      },300);
	  $scope.allSkillsLoaded = false;
	  $scope.slickConfig3Loaded = false;
	 
	  i = $scope.skill_difficulties.indexOf(name);
	  if(i==-1)
		  $scope.skill_difficulties.push(name)
	  else $scope.skill_difficulties.splice(i, 1);
	 
	  $timeout(function () {
		  $scope.slickConfig3Loaded = true;
		   
	      },300);
	 
  }

}
favouritesCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'auth', '$q', '$window', '$rootScope', '$location', '$timeout'];
function favouritesCtrl($scope, $http, $state, $stateParams,auth, $q, $window, $rootScope, $location,$timeout) {
	$scope.userPin;
	$scope.favourites = [];
	$scope.userID = JSON.parse(auth.getUserSession()).uid;
	console.log("User ID: "+$scope.userID);
	$scope.favourites_include = {};
	console.log($state.href('app.favourites').split('/')[1]);
	$scope.goToPage = function (location, event) {
		 if (location.url!=''){
			 $location.url("/"+location);
		 }		 
	}
	$timeout(function () {
		angular.element('.voice-highlighted').removeClass('voice-highlighted');  
		  angular.element('.'+$state.href('app.favourites').split('/')[1]).addClass('voice-highlighted');
		   
	      },300);
	 
	
	$rootScope.goToPage = $scope.goToPage;
	
	$rootScope.menuList = [
	                       {
	                    	  'name' : 'Search',
	                    		  'callBack' :  $rootScope.goToPage,
	                    		   'elementID' : 'drill'
	                       },
	                       {
	                    		  'name' : 'My Favourites',
	                    			  'callBack' :  $rootScope.goToPage,
	                    			   'elementID' : 'favourites'
	                       },
	                       {
	                    		  'name' : 'Collections',
	                    		  'callBack' :  $rootScope.goToPage,
	                    		   'elementID' : ''
	                       }
	                      ];
	
	$scope.getIframeSrc = function(id, source) {
	  console.log(config[source] + id);
      return config[source] + id+'?rel=0&amp;showinfo=0';
	};
	
	callPins = $http({
	  	method: 'GET',
	  	url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/node/drill_pin?filter[uid][condition][path]=uid&filter[uid][condition][value]='+$scope.userID+'&fields[node--drill_pin]=uuid,title,body,comment.comment_count,nid,field_drill&include=field_drill&fields[node--drill]=title,body,field_video_id,field_video_source'
	}).then(function success(response){
		$scope.favourites = response.data.data;
		console.log('Favourites: '+JSON.stringify(response.data.data));
		$scope.favourites_include = response.data.included;
		console.log('Favourites include: '+JSON.stringify(response.data.included));
	},function error(response){
		console.log("errore nel recupero dei favourites")
	})
	
	
	$scope.goToDrillDetail = function(id){
		  $location.url("/drill-details/"+id);
	  }
}

drillCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'auth', '$q', '$window', '$rootScope', '$location'];
function drillCtrl($scope, $http, $state, $stateParams,auth, $q, $window, $rootScope,$location) {
  programID = $scope.idProgram = $stateParams.idProgram;
  $scope.config = config;
  $scope.drills = [];
  $scope.drills_next = {};
  $scope.apparatus_inclusions = {};
  $scope.difficulties = [];
  $scope.groups = [];
  $scope.skills = {};
  $scope.promises = [];
  $scope.navigation = {};
  $scope.skills_inclusions = {};
  $scope.skill_difficulties = [];
  console.log($state.href('app.drill').split('/')[1]);
  angular.element('.voice-highlighted').removeClass('voice-highlighted');  
  angular.element('.'+$state.href('app.drill').split('/')[1]).addClass('voice-highlighted');
  
  $scope.goToPage = function (location, event) {
		 current = angular.element(event.target);
		 current.parent().find('.upper-menu-voice').removeClass("voice-highlighted");
		 current.addClass('voice-highlighted');
		 if (location.url!=''){
			 $location.url("/"+location);
		 }		 
	}
	
	$rootScope.goToPage = $scope.goToPage;
	
  $rootScope.menuList = [ 
	                       {
	                    	  'name' : 'Search',
	                    		  'callBack' :  $rootScope.goToPage,
	                    		   'elementID' : 'drill'
	                       },
	                       {
	                    		  'name' : 'My Favourites',
	                    			  'callBack' :  $rootScope.goToPage,
	                    			   'elementID' : 'favourites'
	                       },
	                       {
	                    		  'name' : 'Collections',
	                    		  'callBack' :  $rootScope.goToPage,
	                    		   'elementID' : ''
	                       }
	                      ];
  
  callDrills = $http({
	  	method: 'GET',
	  	url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/node/drill?fields[node--drill]=title,created,field_branch,field_apparatus,field_drill_type,field_video_id,field_video_source,field_vide_url&page[limit]=30'
  })


  $scope.getIframeSrc = function(id, source) {
    console.log(config[source] + id);
      return config[source] + id+'?rel=0&amp;showinfo=0';
    };

  callDrills.then(function success(response){
	  list_drills = response.data.data;
	  console.log("Lista degli apparatus: "+JSON.stringify(list_drills));
	  $scope.drills = list_drills;
    if(response.data.links.next){
      $scope.drills_next = response.data.links.next;
    } else {
      $scope.drills_next = null;
    }
  },function error(response){
	  //console.log("Impossibile reperire la lista di apparatus per il program "+programID);
      //console.log("Error - "+response.data);
  });
  angular.element($window).bind("scroll", function() {
               if ($(window).scrollTop() + $(window).height() == $(document).height() && $scope.drills_next ) {
                 callDrillsNext = $http({
               	  	method: 'GET',
               	  	url: config.proxyURL+'/'+  $scope.drills_next
                 }).then(function success(response){
               	  $scope.drills =  $scope.drills.concat(response.data.data);
                  if(response.data.links.next){
                    $scope.drills_next = response.data.links.next;
                  } else {
                    $scope.drills_next = null;
                    angular.element($window).unbind("scroll");
                  }
               },function error(response){
             	  //console.log("Impossibile reperire la lista di apparatus per il program "+programID);
                   //console.log("Error - "+response.data);
               });
             }
            });
  $scope.goToDrillDetail = function(id){
	  $location.url("/drill-details/"+id);
  }
}

drillDetailsCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'auth', '$q', '$window', '$rootScope','$location'];
function drillDetailsCtrl($scope, $http, $state, $stateParams,auth, $q, $window, $rootScope,$location) {
  drillID = $scope.idProgram = $stateParams.idDrill;
  $scope.userID = JSON.parse(auth.getUserSession()).uid;
  $scope.config = config;
  $scope.pin = '';
  $scope.showDelete = null;
  $scope.drill = null;
  $scope.drills = [];
  $scope.drills_next = {};
  $scope.apparatus_inclusions = {};
  $scope.comments = [];
  $scope.nameUserComment = "";
  $scope.groups = [];
  $scope.skills = {};
  $scope.promises = [];
  $scope.navigation = {};
  $scope.skills_inclusions = {};
  $scope.skill_difficulties = [];
  angular.element('.voice-highlighted').removeClass('voice-highlighted');  
  angular.element('.'+$state.href('app.drill').split('/')[1]).addClass('voice-highlighted');
  console.log("stato attuale"+$state.href());
  callPins = $http({
	  	method: 'GET',
	  	url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/node/drill_pin?filter[uid][condition][path]=uid&filter[uid][condition][value]='+$scope.userID+'&fields[node--drill_pin]=uuid,title,body,comment.comment_count,field_drill&include=field_drill&fields[node--drill]=title,body,field_video_id,field_video_source'
	}).then(function success(response){
		$scope.favourites = response.data.data;
		stringResult = JSON.stringify($scope.favourites);
		if (stringResult.indexOf(drillID)!=-1){
			$scope.showDelete = true;
		}
		else $scope.showDelete = false;
		
	},function error(response){
		console.log("errore nel recupero dei favourites")
	})
  $scope.config = {
		  headers: {
			  "Content-Type":"application/vnd.api+json"
		  }
  }
  $scope.pinToSave = {
		    "data": {
				"attributes": {
			    "status": true,
			    "title": "novalue",
			    "body": {
			      "value": "novalue",
			      "summary": "novalue"
			    }
			  },
			  "relationships": {
			    "uid": {
			      "data": {
			        "type": "user--user",
			        "id": ""
			      }
			    },
			    "field_drill": {
			      "data": {
			        "type": "node--drill",
			        "id": drillID
			      }
			    }
			  },
			  "type": "node--drill_pin"
			}
	}
  getUser = $http({
	  	method: 'GET',
	  	url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/user/user?filter[uid][value]='+JSON.parse(auth.getUserSession()).uid
	  	
  }).then(function success(response){
		$scope.currentUser = response.data.data[0];
		console.log("Utente attuale "+JSON.stringify($scope.currentUser));
		$scope.pinToSave.data.relationships.uid.data.id = $scope.currentUser.id;
  },function error(response){
	  
  })
  $scope.saveInFavourites = function (){
	  $http({
		  method: 'POST',
		  url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/node/drill_pin',
		  headers: {'Content-Type': 'application/vnd.api+json'},
		  data: $scope.pinToSave,
		  config : $scope.config.headers
		}).then(function successCallback(response) {
		    console.log("Esito del salvataggio del pin "+ response.data);
		    $scope.showDelete = true;
		  }, function errorCallback(response) {
			  
		  });
  }
  $scope.goToPage = function (location, event) {
		 
		 if (location.url!=''){
			 $location.url("/"+location);
		 }		 
	}
	
	$rootScope.goToPage = $scope.goToPage;
	
  $rootScope.menuList = [
	                       {
	                    	  'name' : 'Search',
	                    		  'callBack' :  $rootScope.goToPage,
	                    		   'elementID' : 'drill'
	                       },
	                       {
	                    		  'name' : 'My Favourites',
	                    			  'callBack' :  $rootScope.goToPage,
	                    			   'elementID' : 'favourites'
	                       },
	                       {
	                    		  'name' : 'Collections',
	                    		  'callBack' :  $rootScope.goToPage,
	                    		   'elementID' : ''
	                       }
	                      ];

  $scope.config = {
      headers: {
        "Content-Type":"application/json"
      }
  }

  $scope.commentJson = {
     "data":{
       "type": "comment--comment",
       "attributes": {
         "langcode": "en",
         "status": true,
         "subject": "prova",
         "name": JSON.parse(auth.getUserSession()).name,
         "homepage": null,
         "entity_type": "node",
         "field_name": "comment",
         "default_langcode": true,
         "comment_body": {
           "value": ""
         }
       },
       "relationships": {
         "pid": {
           "data": {
             "type": "comment--comment",
             "id": ""
           }
         },
         "entity_id": {
           "data": {
             "type": "node--drill",
             "id": drillID
           }
         },
         "uid": {
           "data": {
             "type": "user--user",
             "id": "1c9d49dc-c3e0-4630-9c59-2c85e7cf4713"
           }
         }
       }
     }
   };

  callDrill = $http({
	  	method: 'GET',
	  	url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/node/drill/'+drillID+'?fields[node--drill]=title,created,uid,field_branch,field_apparatus,field_drill_type,field_drill_pin,field_video_id,field_video_source,field_vide_url'
  })
  callDrills = $http({
      method: 'GET',
      url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/node/drill?fields[node--drill]=title,created,field_branch,field_apparatus,field_drill_type,field_video_id,field_video_source,field_vide_url&page[limit]=5&filter[escludi_drill][condition][path]=uuid&filter[escludi_drill][condition][operator]=NOT%20IN&filter[escludi_drill][condition][value]='+drillID
  })

  callComments = $http({
      method: 'GET',
      url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/comment/comment?fields[comment--comment]=uuid,subject,name,created,comment_body,pid,uid,thread&filter[drill][condition][path]=entity_id.uuid&filter[drill][condition][value]='+drillID
  })

  $scope.getIframeSrc = function(id, source) {
    console.log(config[source] + id);
      return config[source] + id+'?rel=0&amp;showinfo=0';
    };

  callDrill.then(function success(response){
    console.log("Drill-->: "+JSON.stringify(response.data.data));
	  $scope.drill =response.data.data;

  },function error(response){
	  //console.log("Impossibile reperire la lista di apparatus per il program "+programID);
      //console.log("Error - "+response.data);
  });
  callDrills.then(function success(response){
    list_drills = response.data.data;
    console.log("Lista degli Drills: "+JSON.stringify(list_drills));
    $scope.drills = list_drills;
    if(response.data.links.next){
      $scope.drills_next = response.data.links.next;
    } else {
      $scope.drills_next = null;
    }
  },function error(response){
    //console.log("Impossibile reperire la lista di apparatus per il program "+programID);
      //console.log("Error - "+response.data);
  });
  callComments.then(function success(response){
    list_comments = response.data.data;
    console.log("Lista degli Comments: "+JSON.stringify(list_comments));
    $scope.comments = list_comments;
  },function error(response){
    //console.log("Impossibile reperire la lista di apparatus per il program "+programID);
      //console.log("Error - "+response.data);
  });
  callFav = $http({
	  	method: 'GET',
	  	url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/node/drill_pin?filter[field_drill.uuid][value]='+drillID+'&fields[node--drill_pin]=uuid'
	}).then(function success(response){
		$scope.pin = response.data.data[0].attributes.uuid;
		console.log('Pin necessario: '+JSON.stringify(response.data.data[0]));
		
	},function error(response){
		console.log("errore nel recupero dei favourites")
	})
  $scope.deletePin = function(){
	  $http({
		  	method: 'DELETE',
		  	url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/node/drill_pin/'+$scope.pin,
		  	header:{'Content-Type': 'application/vnd.api+json'}
		}).then(function success(response){
			$scope.showDelete = false;
		},function error(response){
			console.log("errore nella cancellazione")
		})
		
  }
  callPins = $http({
	  	method: 'GET',
	  	url: config.proxyURL+'/'+config.portalURL+'/'+config.apiURL+'/node/drill_pin?filter[uid][condition][path]=uid&filter[uid][condition][value]='+$scope.userID+'&fields[node--drill_pin]=uuid,title,body,comment.comment_count,field_drill&include=field_drill&fields[node--drill]=title,body,field_video_id,field_video_source'
	}).then(function success(response){
		$scope.favourites = response.data.data;
		console.log('Favourites: '+JSON.stringify(response.data.data));
		$scope.favourites_include = response.data.included;
		console.log('Favourites include: '+JSON.stringify(response.data.included));
	},function error(response){
		console.log("errore nel recupero dei favourites")
	})
	
	angular.element($window).bind("scroll", function() {
        if ($(window).scrollTop() + $(window).height() == $(document).height() && $scope.drills_next ) {
          callDrillsNext = $http({
        	  	method: 'GET',
        	  	url: config.proxyURL+'/'+  $scope.drills_next
          }).then(function success(response){
        	  $scope.drills =  $scope.drills.concat(response.data.data);
        	  console.log("lista drills next scaricata")
           if(response.data.links.next){
             $scope.drills_next = response.data.links.next;
           } else {
             $scope.drills_next = null;
             angular.element($window).unbind("scroll");
           }
        },function error(response){
      	  //console.log("Impossibile reperire la lista di apparatus per il program "+programID);
            //console.log("Error - "+response.data);
        });
      }
     });
}