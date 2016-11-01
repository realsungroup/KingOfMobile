define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/mywork'], function (app,ko,router,dialog,mywork) {
   
  
       return  {
                activate:function () {
                         
                          mywork.subtitle("mywork2");

                },
                 attached:function () {
                       // console.log(mywork);
                        mywork.subtitle("mywork2");
                       
                       

                },
              
        };
}); 