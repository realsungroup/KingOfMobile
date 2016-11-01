define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/mywork'], function (app,ko,router,dialog,mywork) {
   
      console.log(mywork);
       return  {
                activate:function () {
                        mywork.subtitle("mywork1");
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