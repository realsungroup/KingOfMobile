define(['plugins/router', 'knockout'], function(router, ko) {
    var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId:'orderrpt',
            fromParent:true
        }).map([
           
           { route: '',      moduleId: 'viewmodels/index',     title: '统计说明',         type: 'orderrpt',   nav: true },
            { route: 'orderlist',      moduleId: 'viewmodels/orderlist',     title: '备餐统计',         type: 'orderrpt',   nav: true },
            { route: 'count',               moduleId: 'viewmodels/count',     title: '领餐统计',         type: 'orderrpt',   nav: true }
        ]).buildNavigationModel();

    return {
        router: childRouter,
        introSamples: ko.computed(function() {
            return ko.utils.arrayFilter(childRouter.navigationModel(), function(route) {
                return route.type == 'intro';
            });
        }),
        detailedSamples: ko.computed(function() {
            return ko.utils.arrayFilter(childRouter.navigationModel(), function(route) {
                return route.type == 'detailed';
            });
        }),
        orderrpt: ko.computed(function() {
            return ko.utils.arrayFilter(childRouter.navigationModel(), function(route) {
                return route.type == 'orderrpt';
            });
        })

    };
});