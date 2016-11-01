define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/mywork'], function (app,ko,router,dialog,mywork) {
   
  
       return  {
                activate:function () {
                          mywork.subtitle("mywork3");
                          var navCls=$("#example-navbar-collapse").attr("class");
                          if (navCls=="navbar-collapse collapse in")
                                {
                                        $(".navbar-toggle").trigger("click");
                                }
                },
                 attached:function () {
                       
                        mywork.subtitle("mywork3");
                       
                       

                },
              
        };
}); 