define(['plugins/router', 'durandal/app','knockout'], function (router, app,ko) {

    var router= router.map([
                { route: '', title:'首页', moduleId: 'main/viewmodels/welcome', nav: true,iconCls:'icon icon-home' ,type:'root'},
                { route: 'mywork*detail',title:'我的工作', moduleId: 'mywork/myworkshell', nav: true ,iconCls:'icon icon-me',type:'root'},
                { route: 'setting',title:'设置', moduleId: 'main/viewmodels/setting', nav: true ,iconCls:'icon icon-settings',type:'root'}
                
            ]).buildNavigationModel();
     
    return {
        router: router,
        search: function() {
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            return router.activate();
        },
        rootRouter: ko.computed(function() {
            return ko.utils.arrayFilter(router.navigationModel(), function(route) {
                return route.type == 'root';
            });
        })
       
    };
});
