define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog,scanner,shell) {
   
  
       return  {
              activate:function () { 
                    appConfig.app.subtitle('setting');
              }
        };
}); 