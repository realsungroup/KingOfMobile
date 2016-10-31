define(['durandal/app','knockout','plugins/router','plugins/dialog','sui'], function (app,ko,router,dialog,scanner) {
   
  var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId:'mywork',
            fromParent:true
        }).map([
                    { route: '',title:'index', moduleId: 'index', nav: true ,iconCls:'icon icon-settings',type:'mywork'},
                    { route: 'mywork1',title:'mywork1', moduleId: 'mywork/viewmodels/mywork1', nav: true ,iconCls:'icon icon-settings',type:'mywork'},
                    { route: 'mywork2',title:'mywork2', moduleId: 'mywork/viewmodels/mywork2', nav: true ,iconCls:'icon icon-settings',type:'mywork'},
                    { route: 'mywork3',title:'mywork3', moduleId: 'mywork/viewmodels/mywork3', nav: true ,iconCls:'icon icon-settings',type:'mywork'}
        ]).buildNavigationModel();
       return  {
                router:childRouter,
                attached:function(){
                       
                }
              
        };
}); 