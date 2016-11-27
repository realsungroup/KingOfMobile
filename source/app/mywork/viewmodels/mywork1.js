define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery'], 
    function (app,ko,router,dialog,jquery,editform) {
      
       var work=new myworkbase();
       work.activate=function(){
           work._activate();
           appConfig.app.subtitle(this.myrouter.title);
       };
       work.compositionComplete=function(){
           work._compositionComplete();
           appConfig.app.subtitle(this.myrouter.title);
       };
       work.binding= function () {
            
            return { cacheViews:false }; //cancels view caching for this module, allowing the triggering of the detached callback
        };
        work.bindingComplete= function () {
          
        };
       work.edit=function(row){
          // dialog.showMessage('edit',"新同事");
           router.navigate("#editform/"+row.REC_RESID+"/record/"+row.REC_ID+"/data/"+JSON.stringify(row)+"/action/edit");
       }
       work.del=function(){
          // dialog.showMessage('del',"新同事");
       }
       work.browse=function(){
         //  dialog.showMessage('browse',"新同事");
       }
       work.add=function(){
          // dialog.showMessage('add',"新同事");
  
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