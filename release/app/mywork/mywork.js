define(['durandal/app','knockout','plugins/router','plugins/dialog','sui'], function (app,ko,router,dialog,scanner) {
   
  var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId:'mywork',
            fromParent:true
        }).map([
                    { route: '',title:'mywork1', moduleId: 'viewmodels/mywork1', nav: true ,iconCls:'icon icon-settings',type:'mywork'},
                    { route: 'mywork1',title:'mywork1', moduleId: 'viewmodels/mywork1', nav: true ,iconCls:'icon icon-settings',type:'myworkpage'},
                    { route: 'mywork2',title:'mywork2', moduleId: 'viewmodels/mywork2', nav: true ,iconCls:'icon icon-settings',type:'myworkpage'},
                    { route: 'mywork3',title:'mywork3', moduleId: 'viewmodels/mywork3', nav: true ,iconCls:'icon icon-settings',type:'myworkpage'}
        ]).buildNavigationModel();
       return  {
                router: childRouter,
               
                attached:function(){
                   
                  
                },
                myworkRouter: ko.computed(function() {
                        return ko.utils.arrayFilter(childRouter.navigationModel(), function(route) {
                         return route.type == 'myworkpage';
                    });
        })
              
        };
}); 