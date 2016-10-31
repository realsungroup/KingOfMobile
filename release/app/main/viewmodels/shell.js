define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:'首页', moduleId: 'main/viewmodels/welcome', nav: true,iconCls:'icon icon-home' },
                { route: 'mywork',title:'我的工作', moduleId: 'main/viewmodels/mywork', nav: true ,iconCls:'icon icon-me'},
                { route: 'setting',title:'设置', moduleId: 'main/viewmodels/setting', nav: true ,iconCls:'icon icon-settings'}
            ]).buildNavigationModel();
           
            return router.activate();
        }
    };
});