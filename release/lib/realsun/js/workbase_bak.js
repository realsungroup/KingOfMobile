  var workbaseFields=(function(){
            function workbaseFields()
            {
                this.rows=appConfig.app.ko.observableArray([]);
                this.key=appConfig.app.ko.observable("");
                this.cmswhere=appConfig.app.ko.observable("");
                this.lastError=appConfig.app.ko.observable("");
                this.total=appConfig.app.ko.observable(0);
                this.maxPageIndex=function(){ return appConfig.app.ko.pureComputed(function() {
                    var self=this;
                    return Math.ceil(appConfig.app.ko.utils.unwrapObservable(self.total) / self.pageSize) - 2;
                }, self);};
             
            }
            return   workbaseFields;
        }());
 fetchPage=function(self){

                
                fetchrows(self,self.pageSize,self.pageIndex,function(result,data,total){
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
        fetchrows= function (self,pageSize,pageIndex,callback) {
                
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
       
        var workbase= workbase || function(){};
           
           workbase.prototype.myrouter=null;
           workbase.prototype.activate=function () {
                       
                         var self=this;
                         var openid="";
                         var self=this;
                         var myworkshell=appConfig.app.myworkshell;
                         self.myrouter=myworkshell.getCurroute(self);
                         appConfig.app.curRouterHash=self.myrouter.hash;
                         myworkshell.setSubtitle(self.myrouter.title);
                          if (self._activate!==undefined){
                            if (self._activate){
                                self._activate();}
                            }
                         if (appConfig.app.runmode=="weixin"){
                            openid=appConfig.appfunction.system.getWeixinOpenid();
                            //weixin 登入  
                            if (openid==""||openid==null)
                                {
                                    window.location=appConfig.app.weixinOAuthUrl+"?hash="+appConfig.app.curRouterHash.replace("#","");
                                   // router.navigate(appConfig.app.weixinOAuthUrl+"?hash="+appConfig.app.curRouterHash.replace("#",""));
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
                          window.location='/#'}
                        
                      

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
         
           workbase.prototype.pageSize=appConfig.app.defaultpagesize;
           
          workbase.prototype.pageIndex=0;
          workbase.prototype.pageIndexChanged=function(index){   
             var self=this;
             self.pageIndex=index;
             fetchPage(self);      
          }  
  