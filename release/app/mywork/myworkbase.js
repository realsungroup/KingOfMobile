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

                        console.log(self.rows(data));
                        console.log(result);
                        console.log(total);
                        
                        
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
                myrouter:null,
                activate:function () {
                       
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

                },
                attached:function () {  
                    
                     var self=this;
                      
                    if ( appConfig.app.dbs!==null)
                    {
                        self.pageIndexChanged(self.pageIndex);
                            $(function() {
                                var currYear = (new Date()).getFullYear();
                                var opt = {};
                                opt.date = { preset: 'date' };
                                opt.datetime = { preset: 'datetime' };
                                opt.time = { preset: 'time' };
                                opt.default = {
                                    theme: 'android-ics light', //皮肤样式
                                    display: 'modal', //显示方式
                                    mode: 'scroller', //日期选择模式
                                    dateFormat: 'yyyy-mm-dd',
                                    lang: 'zh',
                                    showNow: true,
                                    nowText: "今天",
                                    startYear: currYear - 100, //开始年份
                                    endYear: currYear + 5 //结束年份
                                };
                                $(".appDate").mobiscroll($.extend(opt['date'], opt['default']));
                            })
                    }  
                  if (self._attached!==undefined){
                      if (self._attached){
                        self._attached();}
                    }
                   
                },
                compositionComplete:function(){ 
                         
                 if (self._compositionComplete!==undefined){
                      if (self._compositionComplete){
                        self._compositionComplete();}
                    }
                },
                setModuleid:function(moduleid)
                {
                        var self=this;
                        self.__moduleId__='mywork/viewmodels/'+moduleid;
                },
                rows: ko.observableArray([]),
                pageSize:appConfig.app.defaultpagesize,
                key:ko.observable(""),
                cmswhere:ko.observable(""),
                lastError:ko.observable(""),
                total:ko.observable(0),
                maxPageIndex: function(){ return ko.pureComputed(function() {
                     var self=this;
                     return Math.ceil(ko.utils.unwrapObservable(self.total) / self.pageSize) - 1;
                }, self);},
                pageIndex:1,
                pageIndexChanged:function(index){   
                   var self=this;
                   self.pageIndex=index;
                   fetchPage(self);      
                },

              
        };
}); 