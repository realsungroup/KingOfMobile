define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','editbase','durandal/system','editform'], 
    function (app,ko,router,dialog,jquery,editbase,system,editform) {
      
       var work=new myworkbase();
       
       work.activate=function(action,resid,recid){
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
                        // console.log(row);
                 emptyrow.C3_533143179815=(new Date()).format('yyyy-MM-dd hh:00');
                 emptyrow.C3_533143217561=(new Date()).format('yyyy-MM-dd hh:00');
                 emptyrow.C3_533398158705='病假';
                 that.editform.activate(that.formresid,that.formrecid,JSON.stringify(emptyrow),that.action);
                  
              }
              else
              {
                var o=$.grep(rows,function(row,i){return row["REC_ID"]==that.formrecid})[0];
                var json=JSON.stringify(o);
                that.editform.activate(that.formresid,that.formrecid,json,that.action);
              }
              
              
           }
           appConfig.app.subtitle(this.myrouter.title);
       };
       work.getView=function(){
             if (this.action=='list'){
                 return 'mywork/views/mywork1.html'
             }
             else{
                 return 'mywork/views/editform.html'
             }

       }
       work.compositionComplete=function(){
       
         
            if (this.action=='list'){
               
                 work._compositionComplete();
              }
           appConfig.app.subtitle(this.myrouter.title);
       };
     
       work.binding= function () {
            
            return { cacheViews:false }; //cancels view caching for this module, allowing the triggering of the detached callback
        };
        work.bindingComplete= function () {
          
        };
        work.attached=function(){
             if (this.action!=='list'){
               
                 this.editform.attached();
              }
             


        }
// -----------------------------form section
       work.saveform=function(){
           
         var promise=system.defer(function(dfd){
                                    try {
                                        work.editform.saveform(dfd);
                                    
                                    } catch (error) {
                                        dfd.reject(error);
                                    
                                    }
                                }).promise();
            promise.then(function(){
                router.navigate("#mywork/mywork1/list/resid/0/recid/0");
            });
       };
       work.back=function(){
            router.navigate("#mywork/mywork1/list/resid/0/recid/0");
       };
// ------------------------------list section----------------------------------------------//
       work.edit=function(row){
          // dialog.showMessage('edit',"新同事");
          // router.navigate("#editform/"+row.REC_RESID+"/record/"+row.REC_ID+"/data/"+JSON.stringify(row)+"/action/edit");
          router.navigate("#mywork/mywork1/edit/resid/"+row.REC_RESID+"/recid/"+row.REC_ID);
       }
       work.del=function(row){
          // dialog.showMessage('del',"新同事");
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
       work.browse=function(row){
         //  dialog.showMessage('browse',"新同事");
          router.navigate("#mywork/mywork1/browse/resid/"+row.REC_RESID+"/recid/"+row.REC_ID);
        // router.navigate("#editform/"+row.REC_RESID+"/record/"+row.REC_ID+"/data/"+JSON.stringify(row)+"/action/browse");
       }
       work.add=function(){
           router.navigate("#mywork/mywork1/add/resid/"+this.myrouter.resid+"/recid/0");
          // dialog.showMessage('add',"新同事");
           // appConfig.app.showaddbutton(false);
         
          // router.navigate("#editform/"+row.REC_RESID+"/record/0/data/"+JSON.stringify({})+"/action/add");
     }
return work;
}); 
