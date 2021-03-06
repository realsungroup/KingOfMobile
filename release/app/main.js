requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
      
        'signature':'../lib/signature/js/jq-signature',
        'realsun': '../lib/realsun/js',
        'myworkshell':'mywork/',
        'myworkbase':'mywork/',
        'mobiscroll':'../lib/mobiscorll/mobiscroll.custom-3.0.0-beta2.min',
        'editbase':'host/editbase',
        'editform':'host/editform'
        
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       }
    }
});

define(['durandal/system', 'knockout','durandal/app', 'durandal/viewLocator', 'bootstrap','realsun/common'],  function (system,ko, app, viewLocator) {
  
    app.title = '新同事';
    app.configurePlugins({
        router:true,
        dialog: true
    });
    app.start().then(function() {
        viewLocator.useConvention();
         $.getJSON("app.config.json",function(data,textStatus,hr){
         appConfig=data;
         appConfig.appfunction=appfunctions; 
         system.debug(appConfig.app.debug);
         system.log(appConfig);
         appConfig.app.ko=ko;
         appConfig.app.subtitle=ko.observable("");
         appConfig.app.showback=ko.observable(false);
         appConfig.app.showaddbutton=ko.observable(false);
       
          $.get("app/mywork/views/mywork1.html",function(data){
                 appConfig.app.mywork1html=data;
                  app.setRoot('main/viewmodels/shell', 'entrance');
              });
        });
    });
});
