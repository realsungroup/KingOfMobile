define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','editbase','durandal/system','editform','durandal/binder'], 
    function (app,ko,router,dialog,jquery,editbase,system,editform,binder) {
      
       var work=new myworkbase();
    work.testresid1=function(){
        work.currentResidChanged("534275691867");
    }
     work.testresid2=function(){
        work.currentResidChanged("533143158334");
    }
    work.stateChanged=function(){
         work.currentResidChanged(mobiscroll.$('#selectstates').val());
       // alert('change');
    }
     //在列表窗口弹出申请状态选择窗口 
     work.selectStates=function(){
        
            $('#selectstates').mobiscroll('show');
            return false;
       }
    //在编辑窗口弹出假期类别选择窗口 
       work.selectItems=function(){
        
            $('#selectitems').mobiscroll('show');
            return false;
       }
    //向下滚动逐行取记录
       work.infinitefunction=function(callback){
           if (work.total()>work.rows().length)
           {  
                        work.fetchnextrow(work,function(){
                               work.nextrowindex++;
                               callback();
                        });
                     
              
           }
           else
           {  
               callback();
            }
           
        }
    //activate
        /**参数说明
         * @action "list/add/edit/browse"
         * @resid showMessage
         * @recid {string} message The message to display in the dialog.
         * @e {string} [title] The title message.
         */
       work.activate=function(action,resid,recid,e){
           if (e!==undefined)
           {
               if (e.scrolltop){this.currentPagescrolltop=e.scrolltop;}
               if (e.selectedrecid){this.selectedRecid=e.selectedrecid}
           }
           
           
           if (action==undefined){
               this.action='list';
               this.formresid=0;
               this.formrecid=0;
               
           }
           else{
               this.action=action;
               this.formresid=resid;
               this.formrecid=recid;
              
           }
           if (this.action=='list'){
               
                work._activate();
           }
           else{
              this.editform=editform;
              var that=this;
              var rows=that.rows();
              
              if (that.action=='add')
              {
                 var emptyrow={};
                  
                 emptyrow.C3_533143179815=(new Date()).format('yyyy-MM-dd hh:00');
                 emptyrow.C3_533143217561=(new Date()).format('yyyy-MM-dd hh:00');
                 emptyrow.C3_533398158705='病假';
                 that.editform.activate(that.formresid,that.formrecid,JSON.stringify(emptyrow),that.action);
                  
              }
              else
              {
                var o=$.grep(rows,function(row,i){return row["REC_ID"]==that.formrecid})[0];
                var json=JSON.stringify(o);
                that.editform.activate(that.formresid,that.formrecid,json,that.action,o);
              }
              
              
           }
           appConfig.app.subtitle(this.getTitle());
           appConfig.app.infinitefunction=this.infinitefunction;
       };
    //get view
       work.getView=function(){
             if (this.action=='list'){
                 return 'mywork/views/mywork1.html'
             }
             else{
                 return 'mywork/views/editform.html'
             }

       }
    //compositionComplete
       work.compositionComplete=function(view){

            if (this.action=='list')
           {  work.mainview=view;}
            if (this.action=='list'){
               
                    work._compositionComplete();
                    // ------------开始定位当前的记录
                    if  (this.currentPagescrolltop>0)
                    {
                       
                       
                        $('.page__content').animate({'scrollTop':this.currentPagescrolltop},1000);
                         
                    }

              }
           appConfig.app.subtitle(this.getTitle());

       };
    //binding
       work.binding= function (view) {
         
            
            return { cacheViews:false }; //cancels view caching for this module, allowing the triggering of the detached callback
        };
    //bindingComplete
        work.bindingComplete= function (view) {
             
          
          
        };
    //attached
        work.attached=function(){
            var self=this;
             if (this.action!=='list'){
               
                 this.editform.attached();
                 mobiscroll.$('#selectitems').val(this.editform.formdata().C3_533398158705).trigger('change');
              }
              else{
                
                  mobiscroll.$('#selectstates').change(function(){self.stateChanged()});
                  mobiscroll.$('#selectstates').val(work.getCurrentFilterResid()).trigger('change'); 
              }
             


        }
// -----------------------------form section 编辑或查阅窗口模式下的功能
    //保存记录
       work.saveform=function(){
         var that=this;
         var promise=system.defer(function(dfd){
                                    try {
                                        that.editform.formdata().C3_533398158705=mobiscroll.$('#selectitems').val();
                                        work.editform.saveform(dfd);
                                        
                                    
                                    } catch (error) {
                                        dfd.reject(error);
                                    
                                    }
                                }).promise();
            promise.then(function(e){
                if (that.action=='add')
                {
                    that.rows.unshift(e.data[0]);
                    work.selectedRecid=e.data[0].REC_ID;
                    that.total(that.total()+1);
                }
                else
                {
                    work.selectedRecid= that.editform.formdata().REC_ID;
                  // that.rows.sort(function (left, right) { return left.REC_EDTTIME == right.REC_EDTTIME ? 0 : (left.REC_EDTTIME < right.REC_EDTTIME ? 1 : -1) }) 
                }
                 
                router.navigate("#mywork/mywork1/list/resid/0/recid/0?scrolltop="+that.currentPagescrolltop+"&selectedrecid="+ work.selectedRecid);
          
               
               
            });
       };
    //返回列表
       work.back=function(){
                    
                router.navigate("#mywork/mywork1/list/resid/0/recid/0?scrolltop="+work.currentPagescrolltop+"&selectedrecid="+ work.selectedRecid);
           
       };
// ------------------------------list section-列表模式下的功能------------------------------------//
  //编辑记录  
       work.edit=function(row){
          work.currentPagescrolltop=work.getcurrentPagescrolltop();
          work.selectedRecid=row.REC_ID;
          router.navigate("#mywork/mywork1/edit/resid/"+row.REC_RESID+"/recid/"+row.REC_ID+"?scrolltop="+work.currentPagescrolltop+"&selectedrecid="+ work.selectedRecid);
       }
 //删除记录 
       work.del=function(row){
          work.currentPagescrolltop=0;
          work.selectedRecid=0
          var self=this;
          var selfwork=work;
          var myeditbase=new editbase(row.REC_RESID,row.REC_ID);
            dialog.showMessage('是否确认删除记录','',['确认','取消'],false).then(function(e){
                if (e=='确认')
                {
                    myeditbase.deletebyrecid().then(function(e){
                
                        if (e.error==0)
                        {
                            dialog.showMessage('删除成功','').then(function(){
                                 selfwork.rows.remove(function(row){return row["REC_ID"]==self.REC_ID;});
                                 selfwork.total(selfwork.total()-1);
                            });
                           
                        }
                        else
                        {
                            dialog.showMessage(e.message,'删除失败');
                        }
                    },function(error){
                        dialog.showMessage(error,'删除失败');

                    });
                }
                

            });
         
        
        
       }
 //查阅记录 
       work.browse=function(row){
          work.currentPagescrolltop=work.getcurrentPagescrolltop();
          work.selectedRecid=row.REC_ID;
          router.navigate("#mywork/mywork1/browse/resid/"+row.REC_RESID+"/recid/"+row.REC_ID+"?scrolltop="+work.currentPagescrolltop+"&selectedrecid="+ work.selectedRecid);
       }
 //添加记录 
       work.add=function(){
          work.currentPagescrolltop=0;
           work.selectedRecid=0
          router.navigate("#mywork/mywork1/add/resid/"+this.getViewresid()+"/recid/0"+"?scrolltop="+work.currentPagescrolltop+"&selectedrecid="+ work.selectedRecid);
       
     }
return work;
}); 
