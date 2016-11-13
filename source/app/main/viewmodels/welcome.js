define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog,scanner) {
     var user = ko.observable(),
         upass = ko.observable();

  
       return  {
                 user:user,
                 upass:upass,
                 openid:'oZ8EXwjRjlwsZdv_HdyU5i_rkmGE',
                 activate:function(){
                     
                     if (localStorage.getItem('doWindowlogin')==undefined)
                     {
                         appConfig.appfunction.system.clearAppConfig();
                         return true;
                     }
                     try {
                          var vartemp=(JSON.parse(localStorage.getItem('doWindowlogin')));
                         
                     } catch (error) {

                          appConfig.appfunction.system.clearAppConfig();
                          return true;
                     }
                    
                     var self=this;
                     var text;
                     if (vartemp)
                     {
                         text=JSON.stringify(vartemp);
                     }
                    if (text){
                       if (text.length>0){
                                 appConfig.appfunction.system.doWindowlogin(text,fnSuccess,fnError);
                                 function fnSuccess(){
                                            self.user(appConfig.app.user);
                                            self.upass(appConfig.app.upass);
                                            self.dologin();
                                       }
                                 function fnError(error){
       
                                          
                                           appConfig.app.dbs=null;
                                           localStorage.setItem('doWindowlogin',"");
                                           self.user("");
                                           self.upass("");
                                           router.navigate('#');
                            
                                       }
                              
                           }
                          
                    }
                   
       
                },
                attached:function(){
                    var self=this;
                    
                    
                    if (appConfig.app.loginUrl==""){
                      
                                appConfig.appfunction.system.TryWindowlogin(self.openid,fnSuccess,fnError);
                                function fnSuccess(){
                                     self.user(appConfig.app.user);
                                     self.upass(appConfig.app.upass);
                                     self.dologin();
                                }
                                function fnError(error){

                                    dialog.showMessage(error,"新同事");
                                    appConfig.app.dbs=null;
                                    router.navigate('#');
                     
                                }
                

                    }
                    else{
                        
                    }
                   

                },
                dologin:function(){
               
                appConfig.appfunction.system.doLogin(this.user(),this.upass(),fnSuccess, fnError, fnSyserror);
                function fnSuccess(data){
                     var baseUrl=appConfig.app.localbaseUrl;
                     var dbs=new dbHelper(baseUrl,data.user,data.ucode);
                     appConfig.app.dbs=dbs;
                     router.navigate(appConfig.app.curRouterHash);
                    
                }
                function fnError(data){
                     dialog.showMessage(data.message,"新同事");
                     appConfig.appfunction.system.clearAppConfig();
                     router.navigate('#');
                     
                }
                function fnSyserror(jqXHR, textStatus, errorThrown){
                        alert("error");
                    }
         }
              
        };
}); 