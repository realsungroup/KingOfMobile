define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/myworkbase','jquery','durandal/system'], function (app,ko,router,dialog,myworkbase,jquery,system) {
   // Use the settings object to change the theme
       var works3={
               id:122
       };
       works3=jquery.extend(works3,myworkbase);
         system.log("works3");
       system.log(works3);
       return works3;
}); 