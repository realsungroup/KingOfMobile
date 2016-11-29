define(['plugins/router', 'durandal/app','knockout',,'realsun/workbase'], function (router, app,ko) {

    var router= router.map(appConfig.app.mainRouter).buildNavigationModel();
     
    return {
      
        router: router,
        search: function() {
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
          
            return router.activate();
        },
        attached:function(){  
           
            //router.activeInstruction().config.title\
               
        },
        compositionComplete:function(){
              

        },
        rootRouter: ko.computed(function() {
            return ko.utils.arrayFilter(router.navigationModel(), function(route) {
                return route.type == 'root';
            });
        })
       
    };
});
