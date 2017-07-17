angular.module("userApp",["appRoutes","authToken","authService","authInterceptor","ui-notification","bidCtrl","mainCtrl","userCtrl","userConfirmCtrl","userCreateCtrl","userEditCtrl","homeCtrl","auctionCtrl","auctionCreateCtrl","auctionEditCtrl","auctionList","auctionStatus","userFactory","auctionFactory","socketService"]).config(["$httpProvider","NotificationProvider",function(t,e){t.interceptors.push("AuthInterceptor"),e.setOptions({delay:4e3,startTop:70,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"right",positionY:"top",replaceMessage:!0})}]),angular.module("appRoutes",["ngRoute"]).config(["$routeProvider","$locationProvider",function(t,e){t.when("/",{templateUrl:"app/views/pages/home.html",controller:"HomeController",controllerAs:"home",access:{loginRequired:!0}}).when("/restricted",{templateUrl:"app/views/pages/restricted.html",controller:"HomeController",controllerAs:"home",access:{loginRequired:!1}}).when("/login",{templateUrl:"app/views/pages/login.html",controller:"MainController",controllerAs:"login",access:{loginRequired:!1}}).when("/bids/:auction_id",{templateUrl:"app/views/pages/bids/single.html",controller:"BidController",controllerAs:"auction",access:{loginRequired:!0}}).when("/auctions",{templateUrl:"app/views/pages/auctions/all.html",controller:"AuctionController",controllerAs:"auction",access:{loginRequired:!0}}).when("/auctions/create",{templateUrl:"app/views/pages/auctions/single.html",controller:"AuctionCreateController",controllerAs:"auction",access:{loginRequired:!0}}).when("/auctions/:auction_id",{templateUrl:"app/views/pages/auctions/single.html",controller:"AuctionEditController",controllerAs:"auction",access:{loginRequired:!0}}).when("/users",{templateUrl:"app/views/pages/users/all.html",controller:"UserController",controllerAs:"user",access:{loginRequired:!0}}).when("/register",{templateUrl:"/app/views/pages/users/register.html",controller:"UserCreateController",controllerAs:"user",access:{loginRequired:!1}}).when("/registered",{templateUrl:"/app/views/pages/users/registered.html",controller:"UserConfirmController",controllerAs:"user",access:{loginRequired:!1}}).when("/users/:user_id",{templateUrl:"app/views/pages/users/edit.html",controller:"UserEditController",controllerAs:"user",access:{loginRequired:!0}}),e.html5Mode(!0)}]),function(){function t(t,e){function n(){o.processing=!0,t.create(o.auctionData).success(function(t){o.processing=!1,o.auctionData={},e.success(t.message)})}var o=this;o.type="create",o.saveAuction=n}t.$inject=["Auction","Notification"],angular.module("auctionCreateCtrl",["auctionFactory"]).controller("AuctionCreateController",t)}(),function(){function t(t,e){t.main.user.admin||(window.location.href="/restricted");var n=this;n.processing=!0,e.all().success(function(t){n.processing=!1,n.auctions=t,n.count=t.length})}angular.module("auctionCtrl",["auctionFactory"]).controller("AuctionController",t),t.$inject=["$scope","Auction"]}(),function(){function t(t,e,n){function o(){e.get(t.auction_id,{blocked:!0}).success(function(t){a.auctionData=t,a.noBids=t.bids.length<=0,a.noAutobids=t.autobids.length<=0})}function r(t){a.currentTab=t}function i(){a.processing=!0,e.update(t.auction_id,a.auctionData).success(function(t){a.processing=!1,n.success(t.message),a.auctionData.resetbids&&(a.auctionData.bids=[]),a.auctionData.resetbids=!1})}var a=this;a.type="edit",a.currentTab="details",a.setTab=r,a.saveAuction=i,o()}angular.module("auctionEditCtrl",["auctionFactory"]).controller("AuctionEditController",t),t.$inject=["$routeParams","Auction","Notification"]}(),function(){function t(t,e,n,o,r,i,a,s,u){function c(t){v.processing=!0,i.bid(e.auction_id,t).success(function(e){return v.confirmBid=!1,v.confirmAutobid=!1,v.autobid="",v.processing=!1,e.message&&(e.result?u.success(e.message):u.error(e.message)),!!e.success&&(v.current_bid=e.auction.bid,t.autobid&&v.auctionData.autobids.push(t),a.emit("bid:send",e.auction),void d(!0))})}function l(){var t=v.auctionData.autobids.filter(function(t){return t.userid==v.user.userid}).sort(function(t,e){return e.value-t.value});if(t.length>0)return t[0].value}function d(e){v.mybid=parseInt(v.current_bid.value)+parseInt(v.bidIncrement),v.hasBids=void 0!==v.current_bid.userid,v.user.autobid=l(),v.hasBids?(v.highestBidValue=v.current_bid.value,v.currentBidder=v.current_bid.userid===v.user.userid,v.mybid?v.currentBidder?(v.buttonclass="btn-danger disabled",v.buttontext=r.trustAsHtml("You are currently the highest bidder"),e&&u.success("You are currently the highest bidder")):(v.buttonclass="btn-primary",v.buttontext=r.trustAsHtml("Place Bid<br />("+o("currency")(v.mybid,"£ ")+")<span>You can review before submitting</span>"),e&&u.error("You are not the highest bidder")):v.buttonclass="hide",m(),g(),h=t(g,1e3)):v.mybid?(v.buttonclass="btn-primary",v.buttontext=r.trustAsHtml("Place Bid<br />("+o("currency")(v.mybid,"£ ")+")<span>You can review before submitting</span>")):v.buttonclass="hide"}function f(e){var n=moment(new Date(v.current_bid.created_at)),o=n.add(v.auctionData.countdown,"minutes"),r=moment.duration(o.diff(e));r<=0?(v.expired=!0,t.cancel(h)):p(r)}function p(t){v.timer={days:t._data.days,hours:t._data.hours,minutes:t._data.minutes,seconds:t._data.seconds}}function g(){var t=moment(new Date),e=moment(new Date(v.auctionData.end_date)),o=moment.duration(e.diff(t));p(o),w++>=C&&n.location.reload(),o<=0&&f(t)}function m(){t.cancel(h)}var h,b,v=this,C=60,w=0;s.getUser().then(function(t){v.user=t.data}),v.processing=!0,v.current_bid=v.current_bid||{},i.get(e.auction_id).success(function(t){v.auctionData=t,v.processing=!1,t.bids.length?v.current_bid=t.bids[t.bids.length-1]:(v.starting_bid=t.start_amount,v.current_bid.value=t.start_amount),_.startCountdown(),d()}),v.checkBid=function(){v.confirmBid=!0},v.cancelBid=function(){v.confirmBid=!1},v.saveBid=function(){c({value:v.mybid,userid:v.user.userid,username:v.user.username})},v.checkAutobid=function(){v.autobid>0?v.confirmAutobid=!0:v.autobid.focus()},v.cancelAutobid=function(){v.confirmAutobid=!1},v.saveAutobid=function(){c({value:v.autobid,userid:v.user.userid,username:v.user.username,autobid:!0})},v.selectBidIncrement=function(){d()},a.on("bid:reset",function(){n.location.reload()}),a.on("bid:send",function(t){var n=t.auction_id===e.auction_id;n&&(w=0,v.confirmBid=!1,v.current_bid=t.bid,d(!0))});var _={startCountdown:function(){_.stopCounter(),_.updateCounter(),_.startCountdown=t(_.startCountdown,1e3)},stopCounter:function(){t.cancel(b)},updateCounter:function(){var e=moment(new Date),n=moment(new Date(v.auctionData.start_date)),o=moment.duration(n.diff(e));o<=0?(v.active=!0,t.cancel(b)):v.start={days:o._data.days,hours:o._data.hours,minutes:o._data.minutes,seconds:o._data.seconds}}}}angular.module("bidCtrl",["auctionFactory","socketService"]).controller("BidController",t),t.$inject=["$interval","$routeParams","$window","$filter","$sce","Auction","Socket","Auth","Notification"]}(),function(){function t(t){}t.$inject=["Auction"],angular.module("homeCtrl",["auctionFactory"]).controller("HomeController",t)}(),function(){function t(t,e,n,o){function r(t,e){u.loggedIn=o.isLoggedIn(t,e),o.getUser().then(function(t){u.user=t.data})}function i(){e.reload()}function a(){u.processing=!0,u.error="",o.login(u.loginData.username,u.loginData.password).success(function(t){u.processing=!1,t.success?n.path("/"):u.error=t.message})}function s(){o.logout(),u.user={},n.path("/login")}var u=this;u.loggedIn=o.isLoggedIn(),u.doLogin=a,u.doLogout=s,t.reloadRoute=i,t.$on("$routeChangeStart",r)}angular.module("mainCtrl",["ui.bootstrap.datetimepicker"]).controller("MainController",t),t.$inject=["$rootScope","$route","$location","Auth"]}(),function(){function t(){}angular.module("userConfirmCtrl",[]).controller("UserConfirmController",t)}(),function(){function t(t,e,n){var o=this;o.saveUser=function(){o.processing=!0,e.create(o.userData).success(function(e){o.processing=!1,n.success(e.message),e.success&&(o.userData={},t.path("/registered"))})}}angular.module("userCreateCtrl",["userFactory"]).controller("UserCreateController",t),t.$inject=["$location","User","Notification"]}(),function(){function t(t){var e=this;e.processing=!0,t.all().success(function(t){e.processing=!1,e.users=t,e.count=t.length}),e.deleteUser=function(n){e.processing=!0,t["delete"](n).success(function(n){t.all().success(function(t){e.processing=!1,e.users=t})})}}angular.module("userCtrl",["userFactory"]).controller("UserController",t),t.$inject=["User"]}(),function(){function t(t,e,n,o,r,i){function a(t){t&&(s.userImage=t)}var s=this;s.type="edit",n.get(t.user_id).success(function(t){s.userData=t,a(t.image)}),s.upload=function(t){if(s.progress=0,t&&t.length)for(var n=0;n<t.length;n++){var i=t[n];o.upload({url:"/api/users/"+s.userData._id+"/upload/",data:s.userData,method:"POST",file:i}).progress(function(t){var e=parseInt(100*t.loaded/t.total);s.progress=e,s.uploading=!0}).success(function(t,n,o,i){e(function(){r.success(t.message),a(t.filename),s.uploading=!1})})}},s.toggleBlock=function(e){s.processing=!0;var o={};o.blocked=e,o.pobox=s.userData.pobox,o.address=s.userData.address,o.city=s.userData.city,o.mobile=s.userData.mobile,n.update(t.user_id,o).success(function(t){s.processing=!1,o.blocked?(r.success("User has been blocked"),i.emit("bid:reset")):r.success("User has been Unblocked"),s.userData.blocked=o.blocked})},s.saveUser=function(){s.processing=!0,s.userData.removeImage&&(s.userData.image=""),n.update(t.user_id,s.userData).success(function(t){s.processing=!1,r.success(t.message)})}}angular.module("userEditCtrl",["userFactory","ngFileUpload"]).controller("UserEditController",t),t.$inject=["$routeParams","$timeout","User","Upload","Notification","Socket"]}(),function(){function t(t){function e(e,n,o){e.processing=!0,t.all().success(function(t){e.no_data=!t,e.auctions=t,e.processing=!1})}var n={restrict:"E",scope:{ngModel:"="},templateUrl:"/app/views/directives/auction-list.html",link:e};return n}angular.module("auctionList",[]).directive("auctionList",t),t.$inject=["Auction"]}(),function(){function t(){function t(t,n,o){t.status=e(t)}var n={restrict:"E",scope:{ngModel:"="},templateUrl:"/app/views/directives/auction-status.html",link:t};return n}function e(t){var e=t.ngModel,n=moment(new Date);if(startTime=moment(new Date(e.start_date)),hasStarted=moment.duration(n.diff(startTime))>=0,!hasStarted)return{notstarted:!0,start_date:e.start_date};var o=moment(new Date(e.end_date)),r=moment.duration(n.diff(o))>=0;if(r&&e.bids.length>0){e.bids.sort(function(t,e){return e.value-t.value});var i=e.bids[0],a=moment(new Date(i.created_at)),s=a.add(e.countdown,"minutes"),u=moment.duration(s.diff(n));return u>=0?{live:!0,start_date:e.start_date}:{expired:!0,date:i.created_at}}return{live:!0,start_date:e.start_date}}angular.module("auctionStatus",[]).directive("auctionStatus",t),t.$inject=[]}(),function(){function t(t){function e(e,n){return t.get("/api/auctions/"+e,{params:n})}function n(){return t.get("/api/auctions")}function o(e){return t.post("/api/auctions",e)}function r(e,n){return t.put("/api/auctions/"+e,n)}function i(e,n){return t.put("/api/auctions/"+e+"/bid",n)}function a(e){return t["delete"]("/api/auctions/"+e)}return{get:e,all:n,create:o,update:r,bid:i,"delete":a}}angular.module("auctionFactory",[]).factory("Auction",t),t.$inject=["$http"]}(),function(){function t(t,e){function n(t){var n=e.getToken();return n&&(t.headers["x-access-token"]=n),t}function o(n){return 403==n.status&&("Restricted access"===n.data.message&&(window.location.href="/restricted"),e.setToken(),window.location.href="/login"),t.reject(n)}return{request:n,responseError:o}}angular.module("authInterceptor",["authToken"]).factory("AuthInterceptor",t),t.$inject=["$q","AuthToken"]}(),function(){function t(t,e,n,o){function r(e,n){return t.post("/api/authenticate",{username:e,password:n}).success(function(t){return o.setToken(t.token),t})}function i(){o.setToken()}function a(t,e){if(e=e||{},void 0!==e.access&&e.access.loginRequired)return!!o.getToken()||(n.path("/login"),!1)}function s(){return o.getToken()?t.get("/api/me",{cache:!0}):e.reject({message:"User has no token."})}return{login:r,logout:i,isLoggedIn:a,getUser:s}}angular.module("authService",["authToken"]).factory("Auth",t),t.$inject=["$http","$q","$location","AuthToken"]}(),function(){function t(t){function e(){return t.localStorage.getItem("token")}function n(e){e?t.localStorage.setItem("token",e):t.localStorage.removeItem("token")}return{getToken:e,setToken:n}}angular.module("authToken",[]).factory("AuthToken",t),t.$inject=["$window"]}(),function(){function t(t){var e=io.connect();return{on:function(n,o){e.on(n,function(){var n=arguments;t.$apply(function(){o.apply(e,n)})})},emit:function(n,o,r){e.emit(n,o,function(){var n=arguments;t.$apply(function(){r&&r.apply(e,n)})})}}}angular.module("socketService",[]).factory("Socket",t),t.$inject=["$rootScope"]}(),function(){function t(t){function e(e){return t.get("/api/users/"+e)}function n(){return t.get("/api/users")}function o(e){return t.post("/api/users",e)}function r(e,n){return t.put("/api/users/"+e,n)}function i(e){return t["delete"]("/api/users/"+e)}return{get:e,all:n,create:o,update:r,"delete":i}}angular.module("userFactory",[]).factory("User",t),t.$inject=["$http"]}();