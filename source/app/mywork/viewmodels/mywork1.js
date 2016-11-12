define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/mywork','mobiscrolljs'], function (app,ko,router,dialog,mywork,mobiscrolljs) {
   // Use the settings object to change the theme
  
       return  {
                activate:function () {
                       
                       
                        this.myrouter=mywork.getCurroute(this);
                        console.log(this.myrouter);

                        var navCls=$("#example-navbar-collapse").attr("class");
                          if (navCls=="navbar-collapse collapse in")
                                {
                                        $(".navbar-toggle").trigger("click");
                                }
                         
                },
                attached:function () {
                      
                       
                       

                },
                compositionComplete:function(){ 

                }

              
        };
}); 