define(['durandal/system','durandal/app','knockout','plugins/router','plugins/dialog','mywork/mywork'], function (system,app,ko,router,dialog,mywork) {
    
       return  {
                activate:function () {
                    
                        var navCls=$("#example-navbar-collapse").attr("class");
                          if (navCls=="navbar-collapse collapse in")
                                {
                                        $(".navbar-toggle").trigger("click");
                                }
                         
                       

                },
                attached:function () {
                       // console.log(mywork);
                        mywork.subtitle("mywork1");
                       
                       

                },
                compositionComplete:function(){
                       // console.log(mywork);

                }

              
        };
}); 