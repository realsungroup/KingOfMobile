 
  var workbase=(function(){
            function workbase()
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
                this.myrouter=null;
                this.getViewresid=function(){
                    var that=this;
                    return that.myrouter.resid;

                }
                this.getTitle=function(){
                    return this.myrouter.title;
                }
                this.emptyrow=function(dfd){
                    var that=this;
                    appConfig.app.dbs.dbGetCmsColumns(that.getViewresid(), fnSuccess, fnError, fnSyserror,dfd);
                    function fnSuccess(data,total,dfd)
                    {
                        var row={}
                        for (x in data)
                        {eval('row.'+data[x].id+'=null');}
                        row.REC_RESID=that.myrouter.resid
                        dfd.resolve(row);

                    }
                    function fnError(errordata,dfd)
                    {
                         dfd.reject(errordata);

                    }
                    function fnSyserror(jqXHR, textStatus, errorThrown,dfd)
                    {
                        var errordata={"error":-2,"message":textStatus};
                         dfd.reject(errordata);
                    }
                }
                this._activate=function () {
                       
                         var self=this;
                         var openid="";
                         var self=this;
                         var myworkshell=appConfig.app.myworkshell;
                         self.myrouter=myworkshell.getCurroute(self);
                         appConfig.app.curRouterHash=self.myrouter.hash;
                         myworkshell.setSubtitle(self.myrouter.title);
                      
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
           this._attached=function () {  
                
                 var self=this;
                  
                
          
               
            };
           this._compositionComplete=function(){ 
              var self=this;
                if ( appConfig.app.dbs!==null)
                  {
                      self.pageIndexChanged(self.pageIndex);
                      
                  }         
               
              };
              this.setModuleid=function(moduleid)
              {
                      var self=this;
                      self.__moduleId__='mywork/viewmodels/'+moduleid;
              };
         
           this.pageSize=appConfig.app.defaultpagesize;
           
          this.pageIndex=0;
          this.pageIndexChanged=function(index){   
             var self=this;
             self.pageIndex=index;
             fetchPage(self);      
          }  
  
             
            }
            return   workbase;
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
                
                var resid=self.getViewresid();
                
                
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
 var myworkbase=(function (_super) {
            __extends(myworkbase, _super);
            function myworkbase() {
                _super.apply(this, arguments);
            }
                return myworkbase;
            }(workbase));
       
 
           
         