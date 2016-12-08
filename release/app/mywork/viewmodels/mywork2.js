
define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','durandal/system','mobiscroll'], 
    function (app,ko,router,dialog,jquery,system,mobiscroll) {
      
       var work=new myworkbase();
       work.activate=function(action,resid,recid,e){
          
              work._activate(action,resid,recid,null,this,e);
             //appConfig.app.subtitle("");
       }
       return work ;
}); 