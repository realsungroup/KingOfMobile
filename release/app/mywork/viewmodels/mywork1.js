define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/myworkbase','jquery','durandal/system'], function (app,ko,router,dialog,myworkbase,jquery,system) {
   // Use the settings object to change the theme
       var works1={
               id:122
       };
       works1=jquery.extend(works1,myworkbase);
        system.log("works1");
       system.log(works1);
       return works1;
}); 