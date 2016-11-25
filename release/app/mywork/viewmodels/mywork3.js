define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/myworkshell','jquery','durandal/system','mobiscroll'], 
    function (app,ko,router,dialog,myworkshell,jquery,system,mobiscroll) {
   // Use the settings object to change the theme
       var works3=  {};
        works3.rows=ko.observableArray([]);
        works3.key=ko.observable("");
        works3.cmswhere=ko.observable("");
        works3.lastError=ko.observable("");
        works3.total=ko.observable(0);
        works3.maxPageIndex=function(){ return ko.pureComputed(function() {
               var self=this;
               return Math.ceil(ko.utils.unwrapObservable(self.total) / self.pageSize) - 3;
          }, self);};
       var myworkbase=new workbase();
        works3=jquery.extend(true,works3,myworkbase);
        works3._activate=function(){
             var self=this;
             self.myrouter=myworkshell.getCurroute(self);
             appConfig.app.curRouterHash=self.myrouter.hash;
             myworkshell.setSubtitle(self.myrouter.title);
            
        }
        works3._attached=function(){
            
        };
        works3._compositionComplete=function(){
            //绑定编辑按钮
           
        }
       
       return  works3 ;
}); 