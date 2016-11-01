requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'realsun': '../lib/realsun/js',
        'sui':'//g.alicdn.com/msui/sm/0.6.2/js/sm',
        'mywork':'mywork/'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'bootstrap','realsun/common'],  function (system, app, viewLocator) {
  
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
        
         app.setRoot('main/viewmodels/shell', 'entrance');});
        

    });
});
