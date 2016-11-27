define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','durandal/system','mobiscroll','editbase'], 
   function (app,ko,router,dialog,jquery,system,mobiscroll,editbase) {
      
       var editform={
           formdata:ko.ko.observable({}),
           editservice:null,
           activate:function(resid,recid,json,action)
           {
            
             switch (action) {
                 case 'edit':
                     this.editservice=new editbase(resid,recid);
                     this.formdata=(JSON.parse(json));
                     break;
                  case 'add':
                     
                     break;
                  case 'delete':
                     
                     break;
                  case 'browse':
                     this.editservice=new editbase(resid,recid);
                     this.formdata=(JSON.parse(json));
                     break;
                 default:
                     break;
             }
              
               appConfig.app.showback(true);
               
           },
          detached: function (view) {
             appConfig.app.showback(false);
           }

       };
      
       return editform ;
}); 