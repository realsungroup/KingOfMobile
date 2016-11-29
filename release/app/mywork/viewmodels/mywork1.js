define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','editbase','durandal/system'], 
    function (app,ko,router,dialog,jquery,editbase,system) {
      
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
         router.navigate("#editform/"+row.REC_RESID+"/record/"+row.REC_ID+"/data/"+JSON.stringify(row)+"/action/browse");
       }
       work.add=function(){
          // dialog.showMessage('add',"新同事");
            appConfig.app.showaddbutton(false);
           var promise=system.defer(function(dfd){
                    try {
                          work.emptyrow(dfd);
                    } catch (error) {
                        dfd.reject(error);
                    }
                }).promise();
           promise.then(function(emptyrow){
              // console.log(row);
               emptyrow.C3_533143179815=(new Date()).format('yyyy-MM-dd hh:00');
               emptyrow.C3_533143217561=(new Date()).format('yyyy-MM-dd hh:00');
               emptyrow.C3_533398158705='病假';
               
               router.navigate("#editform/"+emptyrow.REC_RESID+"/record/0/data/"+JSON.stringify(emptyrow)+"/action/add");
               // router.loadUrl("mywork/editform/"+emptyrow.REC_RESID+"/record/0/data/"+JSON.stringify(emptyrow)+"/action/add");
           },function(error){

           })
          // router.navigate("#editform/"+row.REC_RESID+"/record/0/data/"+JSON.stringify({})+"/action/add");
     }
    return work;
}); 
