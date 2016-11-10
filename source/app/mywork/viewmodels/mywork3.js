define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/mywork'], function (app,ko,router,dialog,mywork) {
   
      
       return  {
                activate:function () {
                       
                       
                        var myrouter=mywork.getCurroute(this);
                        console.log(myrouter);

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