define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/myworkbase','jquery','durandal/system'], function (app,ko,router,dialog,myworkbase,jquery,system) {
   // Use the settings object to change the theme
       var works2={
               id:122
       };
       works2=jquery.extend(works2,myworkbase);
         system.log("works2");
        system.log(works2);
       return works2;
}); 