define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/myworkshell','durandal/system'], function (app,ko,router,dialog,myworkshell,system) {
   // Use the settings object to change the theme
       fetchPage=function(self)
        {

                
                fetchrows(system,self,self.pageSize,self.pageIndex,function(result,data,total){
                    if (result)
                    { 
                            
                        self.rows(data);
                        self.total(total);   
                        self.lastError("");
                        
                        
                        }
                    else
                      {
                          self.rows([]);
                          self.total(0);   
                          self.lastError(data.message);
                        
                          
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
       return  {
                openid:"oZ8EXwjRjlwsZdv_HdyU5i_rkmGE",
                activate:function () {
                       
                         var self=this;
                         this.myrouter=myworkshell.getCurroute(this);
                         appConfig.app.curRouterHash=this.myrouter.hash;
                         myworkshell.setSubtitle(this.myrouter.title);
                         if (appConfig.app.runmode=="weixin"){
                            if (appConfig.app.debug){
                               appConfig.app.openid =this.openid
                            }
                            //weixin 登入  
                            if (appConfig.app.openid==""||appConfig.app.openid==null)
                                {
                                    
                                    router.navigate(appConfig.app.weixinOAuthUrl+"?hash="+appConfig.app.curRouterHash.replace("#",""));
                                }
                                else
                                {
                                    var stateObject = {};
                                    var title = "";
                                    var newUrl ="/"+appConfig.app.curRouterHash;
                                    history.pushState(stateObject,title,newUrl);

                                }

                                if ( appConfig.app.dbs==null)
                                {
                                    
                                    appConfig.appfunction.system.doLoginbyopenid(appConfig.app.openid,fnSuccess,fnError);
                                    function fnSuccess(){
                                            var baseUrl=appConfig.app.userProfile.EMP_LOGIN_URL;
                                            var dbs=new dbHelper(baseUrl,appConfig.app.userProfile.EMP_ID,appConfig.app.userProfile.EMP_PASS);
                                            appConfig.app.dbs=dbs;
                                            self.pageIndexChanged(self.pageIndex);
                                        }
                                    function fnError(error){

                                            dialog.showMessage(error,"新同事");
                                            appConfig.app.dbs=null;
                                            router.navigate('#');
                            
                                        }
                                }
                                else
                                {
                                    self.pageIndexChanged(self.pageIndex);
                                }
                         }
                },
                attached:function () {    
                        if ( appConfig.app.dbs==null)
                        {
                        
                           // router.navigate('#');
                            
                        }
                        else
                        {
                            this.pageIndexChanged(this.pageIndex);
                        }

                },
                compositionComplete:function(){ 
                         
                          
                },
                setModuleid:function(moduleid)
                {
                        this.__moduleId__='mywork/viewmodels/'+moduleid;
                },
                rows: ko.observableArray([]),
                pageSize:appConfig.app.defaultpagesize,
                key:ko.observable(""),
                cmswhere:ko.observable(""),
                lastError:ko.observable(""),
                total:ko.observable(0),
                maxPageIndex: function(){ return ko.pureComputed(function() {
                     return Math.ceil(ko.utils.unwrapObservable(this.total) / this.pageSize) - 1;
                }, this);},
                pageIndex:1,
                pageIndexChanged:function(index){   
                   this.pageIndex=index;
                   fetchPage(this);      
                },

              
        };
}); 