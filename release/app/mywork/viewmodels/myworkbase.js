define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/mywork'], function (app,ko,router,dialog,mywork) {
   // Use the settings object to change the theme
       
       return  {
                activate:function () {
                       
                        var navCls=$("#example-navbar-collapse").attr("class");
                          if (navCls=="navbar-collapse collapse in")
                                {
                                        $(".navbar-toggle").trigger("click");
                                }
                         this.myrouter=mywork.getCurroute(this);
                         mywork.setSubtitle(this.myrouter.title);
                         
                },
                attached:function () {
                      
                       
                       

                },
                compositionComplete:function(){ 

                }

              
        };
}); 