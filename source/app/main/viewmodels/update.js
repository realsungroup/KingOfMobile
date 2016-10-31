define(['plugins/router', 'durandal/app'], function (router, app) { 
     return {
     activate: function () {
         try {
             //window.applicationCache.update();
             //onloadFn();
             setTimeout(function() {window.location="/";}, 1000);

         } catch (e) {
             
         }
     }
     }
    
})