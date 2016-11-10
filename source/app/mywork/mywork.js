define(['durandal/app','knockout','plugins/router','plugins/dialog','sui'], function (app,ko,router,dialog,scanner) {
   
  var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId:'mywork',
            fromParent:true
        }).map(appConfig.app.myworkRouter).buildNavigationModel();
 
       return  {
               activate:function () {
                   
               },
                router: childRouter,  
                attached:function(){
                },
                getCurroute:function(that){
                    var strmoduleid=that.__moduleId__;
                    var curRoute=this.router.routes.filter(function(route){return route.moduleId==strmoduleid})[0];
                    this.subtitle(curRoute.title);       
                    return curRoute;
                    
                },
                subtitle:ko.observable(""),
               
                myworkRouter: ko.computed(function() {
                        return ko.utils.arrayFilter(childRouter.navigationModel(), function(route) {
                         return route.type == 'myworkpage';
                    });
        })
              
        };
}); 