define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','durandal/system','mobiscroll','editbase'],function (app,ko,router,dialog,jquery,system,mobiscroll,editbase){
      
       var editform={
           formdata:ko.observable({}),
           originaldata:{},
           editservice:null,
           savebutton:false,
           action:'',
           saveform:function(){
             if (this.action=='edit')
             { this.editservice.saveData(this.formdata()).then(function(e){
                   if (e.error==0)
                   {
                       dialog.showMessage(e.message,'');
                   }
                   else
                   {
                       dialog.showMessage(e.message,'');
                   }
              },function(error){
                       dialog.showMessage(error,'');
              }) ;}
              if (this.action=='add'){
                  this.editservice.addData(this.formdata()).then(function(e){
                    if (e.error==0)
                    {
                        dialog.showMessage(e.message,'').then(function(){
                           router.navigateBack();
                        });
                        
                    }
                    else
                    {
                        dialog.showMessage(e.message,'');
                    }
                 },function(error){
                                dialog.showMessage(error,'');
                 }) ;

              }
            
           },
           cancelform:function(){
                this.formdata(this.originaldata);
                
           },
           activate:function(resid,recid,json,action)
           {
             
             this.action=action;
             switch (action) {
                 case 'edit':
                     this.editservice=new editbase(resid,recid);
                     this.originaldata=$.extend({},JSON.parse(json));
                     this.formdata(JSON.parse(json));
                     this.savebutton=true;
                     break;
                  case 'add':
                      this.editservice=new editbase(resid,0);
                      this.originaldata=$.extend({},JSON.parse(json));
                     this.formdata(JSON.parse(json));
                      this.savebutton=true;
                     break;
                 
                  case 'browse':
                     this.editservice=new editbase(resid,recid);
                     this.originaldata=$.extend({},JSON.parse(json));
                     this.formdata(JSON.parse(json));
                     this.savebutton=false;
                     break;
                 default:
                     break;
             }
              
               appConfig.app.showback(true);
               
           },
          attached:function (){
              if (this.editservice==null)
              {
                  
              }
              $(function() {
                            var currYear = (new Date()).getFullYear();
                            var opt = {};
                           // opt.date = { preset: 'date' };
                            //opt.datetime = { preset: 'datetime' };
                            // opt.time = { preset: 'time' };
                            opt.default = {
                                theme: 'sense-ui', //皮肤样式
                                display: 'bottom', //显示方式
                                mode: 'scroller', //日期选择模式
                                dateFormat: 'yy-mm-dd',
                                timeFormat:'HH:ii',
                                preset: 'datetime',
                                lang: 'zh',
                                showNow: true,
                                nowText: "今天",
                                startYear: currYear, //开始年份
                                endYear: currYear + 2, //结束年份
                            };
                            $(".appDate").mobiscroll($.extend(opt['date'], opt['default']));
                        });
          },
          detached: function (view) {
              appConfig.app.showback(false);
              
           }

       };
      
       return editform ;
}); 