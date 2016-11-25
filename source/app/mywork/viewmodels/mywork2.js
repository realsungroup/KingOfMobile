define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/myworkshell','jquery','durandal/system','mobiscroll'], 
    function (app,ko,router,dialog,myworkshell,jquery,system,mobiscroll) {
       var works2=  {};
       var workfields=new workbaseFields();
       var workprocess=new workbase();
       works2=jquery.extend(works2,workfields);
       works2=jquery.extend(true,works2,workprocess);
        works2._activate=function(){
            
            
        }
        works2._attached=function(){
            
        };
        works2._compositionComplete=function(){
            //绑定编辑按钮
           
        }
       
       return  works2 ;
}); 