define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/myworkshell','durandal/system'], function (app,ko,router,dialog,myworkshell,system) {
   // Use the settings object to change the theme
        fetchPage=function(self){

                
                fetchrows(system,self,self.pageSize,self.pageIndex,function(result,data,total){
                    if (result)
                    { 
                            
                        self.rows(data);
                        self.total(total);
                        self.lastError("");
                        if (self.data!==undefined){
                            self.data(self);
                         }
                        
                        
                        }
                    else
                      {
                          self.rows([]);
                          self.total(0);   
                          self.lastError(data.message);
                           if (self.data!==undefined){
                            self.data(self);
                         }
                          
                      }
                      
                    }
                   
                );
          }
        fetchrows= function (system,self,pageSize,pageIndex,callback) {
                
                var resid=self.myrouter.resid;
                
                
                 appConfig.app.dbs.dbGetdata(resid,"",self.key(),self.cmswhere(),dataGot,fnerror,fnhttperror,pageSize,pageIndex);
                function dataGot(data,subdata,total)
                {
            
                
                    callback(true,data,total);
                }
                function fnerror(data){   

          
                    callback(false,data,0);

                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
            
             
                    callback(false,null,0);
            
                }
        
        };
        var workbase= function(){};
        
           workbase.prototype.myrouter=null;
           workbase.prototype.activate=function () {
                       
                         var self=this;
                         var openid="";
                         self.myrouter=myworkshell.getCurroute(self);
                         appConfig.app.curRouterHash=self.myrouter.hash;
                         myworkshell.setSubtitle(self.myrouter.title);
                         if (appConfig.app.runmode=="weixin"){
                            openid=appConfig.appfunction.system.getWeixinOpenid();
                            //weixin 登入  
                            if (openid==""||openid==null)
                                {
                                    
                                    router.navigate(appConfig.app.weixinOAuthUrl+"?hash="+appConfig.app.curRouterHash.replace("#",""));
                                    return ;
                                }
                                else
                                {
                                   

                                }

                         }
                        if ( appConfig.app.dbs!==null)
                        {
                        
                            self.pageIndexChanged(self.pageIndex);
                            
                        }
                        else{
                            //跳转首页登入
                         router.navigate('/#')}
                        
                        if (self._activate!==undefined){
                            if (self._activate){
                                self._activate();}
                            }

                };
           workbase.prototype.attached=function () {  
                
                 var self=this;
                  
                
              if (self._attached!==undefined){
                  if (self._attached){
                    self._attached();}
                }
               
            };
           workbase.prototype.compositionComplete=function(){ 
              var self=this;
                if ( appConfig.app.dbs!==null)
                  {
                      self.pageIndexChanged(self.pageIndex);
                      
                  }         
               if (self._compositionComplete!==undefined){
                    if (self._compositionComplete){
                      self._compositionComplete();}
                  }
              };
              workbase.prototype.setModuleid=function(moduleid)
              {
                      var self=this;
                      self.__moduleId__='mywork/viewmodels/'+moduleid;
              };
           workbase.prototype.rows=ko.observableArray([]);
           workbase.prototype.pageSize=appConfig.app.defaultpagesize;
           workbase.prototype.key=ko.observable("");
           workbase.prototype.cmswhere=ko.observable("");
           workbase.prototype.lastError=ko.observable("");
           workbase.prototype.total=ko.observable(0);
           workbase.prototype.maxPageIndex=function(){ return ko.pureComputed(function() {
               var self=this;
               return Math.ceil(ko.utils.unwrapObservable(self.total) / self.pageSize) - 1;
          }, self);};
          workbase.prototype.pageIndex=0;
          workbase.prototype.pageIndexChanged=function(index){   
             var self=this;
             self.pageIndex=index;
             fetchPage(self);      
          }  
  
       return   new workbase();
}); 