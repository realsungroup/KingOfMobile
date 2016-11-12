define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/myworkshell'], function (app,ko,router,dialog,myworkshell) {
   // Use the settings object to change the theme
       fetchPage=function(self)
        {

                
                fetchrows(system,self,self.pageSize,self.pageIndex,function(result,data,total){
                    if (result)
                    { 
                            
                        self.rows(data);
                        self.total(total);   
                        
                        
                        
                        }
                    
                    }
                );
        }
        fetchrows= function (system,self,pageSize,pageIndex,callback) {
                // baseUrl=appConfig.app.baseUrl;
                // getMethod=appConfig.app.getMethod;
                // saveMethod=appConfig.app.saveMethod;
                // var dbs=new dbHelper(baseUrl,self.user,self.ucode);
                // appConfig.app.dbs=dbs;
                // var resid=appConfig.internationalfilght.guojiResid;
                // var cmswhere="";
            
                // dbs.dbGetdata(resid,"",cmswhere,dataGot,fnerror,fnhttperror,pageSize,pageIndex);
                // function dataGot(data,subdata,total)
                // {
            
                
                //     callback(true,data,total);
                // }
                // function fnerror(data){   

          
                //     callback(false);

                // }
                // function fnhttperror(jqXHR, textStatus, errorThrown){
            
             
                //     callback(false);
            
                // }
        
        };
       return  {

                activate:function () {
                       
                        var navCls=$("#example-navbar-collapse").attr("class");
                          if (navCls=="navbar-collapse collapse in")
                                {
                                        $(".navbar-toggle").trigger("click");
                                }
                         this.myrouter=myworkshell.getCurroute(this);
                         myworkshell.setSubtitle(this.myrouter.title);
                         
                },
                attached:function () {    
                        if ( appConfig.app.dbs==null)
                        {
                           // dialog.showMessage('请先登入系统',"新同事");
                            router.navigate('#');
                            
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
                total:ko.observable(0),
                maxPageIndex: function(){ return ko.pureComputed(function() {
                     return Math.ceil(ko.utils.unwrapObservable(this.total) / this.pageSize) - 1;
                }, this);},
                pageIndex:0,
                pageIndexChanged:function(index){   
                   this.pageIndex=index;
                   fetchPage(this);      
                },

              
        };
}); 