define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','durandal/system','mobiscroll','editbase'],function (app,ko,router,dialog,jquery,system,mobiscroll,editbase){
      
       var editform={
           formdata:ko.observable({}),
           originaldata:{},
           editservice:null,
           savebutton:false,
           action:'',
           back:function(){router.navigateBack()},
           saveform:function(dfd){
               var self=this;
             if (this.action=='edit')
             { this.editservice.saveData(this.formdata()).then(function(e){
                   if (e.error==0)
                   {
                       dialog.showMessage(e.message,'').then(function(){ 
                           self.formdata(e.data[0]);
                           dfd.resolve('');
                        });
                       
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
                           dfd.resolve(e);
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
           activate:function(resid,recid,json,action,row)
           {
             
             this.action=action;
             switch (action) {
                 case 'edit':
                     this.editservice=new editbase(resid,recid);
                     this.originaldata=$.extend({},JSON.parse(json));
                    //  this.formdata(JSON.parse(json));
                       this.formdata(row);
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
              
           
               
           },
          attached:function (){
              if (this.editservice==null)
              {
                  
              }
              if  (this.action!=='browse'){
                   $(function() {
                            var currYear = (new Date()).getFullYear();
                            var opt = {};
                           // opt.date = { preset: 'date' };
                            //opt.datetime = { preset: 'datetime' };
                            // opt.time = { preset: 'time' };
                            opt.default = {
                                theme: 'bootstrap', //皮肤样式
                                display: 'center', //显示方式
                                mode: 'scroller', //日期选择模式
                                dateFormat: 'yy-mm-dd',
                                timeFormat:'HH:ii',
                                preset: 'datetime',
                                lang: 'zh',
                                showNow: true,
                                steps: { 
                                            minute: 15,
                                            second: 5,
                                            zeroBased: true
                                        },
                                nowText: "今天",
                                startYear: currYear, //开始年份
                                endYear: currYear + 2, //结束年份
                            };
                            $(".appDate").mobiscroll($.extend(opt['date'], opt['default']));
                            $('.appSelect').mobiscroll().select({
                                            theme: 'ios',      // Specify theme like: theme: 'ios' or omit setting to use default
                                            lang: 'zh',   // Specify language like: lang: 'pl' or omit setting to use default
                                            display: 'center',  // Specify display mode like: display: 'bottom' or omit setting to use default
                                            mode: 'scroller',        // More info about mode: https://docs.mobiscroll.com/3-0-0_beta2/select#!opt-mode
                                            minWidth: 100                  // More info about minWidth: https://docs.mobiscroll.com/3-0-0_beta2/select#!opt-minWidth
                                        });
                        });
                    }
             
          }

       };
      
       return editform ;
}); 