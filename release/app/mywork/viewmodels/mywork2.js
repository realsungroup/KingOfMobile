
define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','durandal/system','mobiscroll'], 
    function (app,ko,router,dialog,jquery,system,mobiscroll) {
      
       var work=new myworkbase();
       work.activate=function(){
          
           work._activate();
       }
       return work ;
}); 