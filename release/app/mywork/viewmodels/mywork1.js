define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','durandal/system','mobiscroll'], 
    function (app,ko,router,dialog,jquery,system,mobiscroll) {
      
       var work=new myworkbase();
       work.activate=function(){
           work._activate();
       }
       work.compositionComplete=function(){
           work._compositionComplete
       }
       work.edit=function(){
           dialog.showMessage('edit',"新同事");
       }
       work.del=function(){
           dialog.showMessage('del',"新同事");
       }
       work.browse=function(){
           dialog.showMessage('browse',"新同事");
       }
       work.add=function(){
           dialog.showMessage('add',"新同事");
       }
       return work;
}); 
// $(function() {
                        //     var currYear = (new Date()).getFullYear();
                        //     var opt = {};
                        //     // opt.date = { preset: 'date' };
                        //     opt.datetime = { preset: 'datetime' };
                        //     // opt.time = { preset: 'time' };
                        //     opt.default = {
                        //         theme: 'sense-ui', //皮肤样式
                        //         display: 'bottom', //显示方式
                        //         mode: 'scroller', //日期选择模式
                        //         dateFormat: 'yyyy-mm-dd',
                        //         preset: 'datetime',
                        //         lang: 'zh',
                        //         showNow: true,
                        //         nowText: "今天",
                        //         startYear: currYear, //开始年份
                        //         endYear: currYear + 2, //结束年份
                        //     };
                        //     $(".appDate").mobiscroll($.extend(opt['date'], opt['default']));
                        // });