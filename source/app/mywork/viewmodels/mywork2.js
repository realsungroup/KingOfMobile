define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/mywork'], function (app,ko,router,dialog,mywork) {
   
  
       return  {
                activate:function () {
                         
                          mywork.subtitle("mywork2");
                          var navCls=$("#example-navbar-collapse").attr("class");
                          if (navCls=="navbar-collapse collapse in")
                                {
                                        $(".navbar-toggle").trigger("click");
                                }

                },
                 attached:function () {
                       // console.log(mywork);
                        mywork.subtitle("mywork2");
                       
                       

                },
              
        };
}); 