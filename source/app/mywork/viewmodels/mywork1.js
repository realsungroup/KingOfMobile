define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/myworkbase','jquery','durandal/system'], function (app,ko,router,dialog,myworkbase,jquery,system) {
   // Use the settings object to change the theme
       var works1={
               id:122,
               clicktest:function (){alert("ddd");}
              
   };
        works1=jquery.extend(works1,myworkbase);
       
        
        works1._attached=function(){$(function() {
                            var currYear = (new Date()).getFullYear();
                            var opt = {};
                            // opt.date = { preset: 'date' };
                            opt.datetime = { preset: 'datetime' };
                            // opt.time = { preset: 'time' };
                            opt.default = {
                                theme: 'sense-ui', //皮肤样式
                                display: 'bottom', //显示方式
                                mode: 'scroller', //日期选择模式
                                dateFormat: 'yyyy-mm-dd',
                                preset: 'datetime',
                                lang: 'zh',
                                showNow: true,
                                nowText: "今天",
                                startYear: currYear, //开始年份
                                endYear: currYear + 2, //结束年份
                            };
                            $(".appDate").mobiscroll($.extend(opt['date'], opt['default']));
                        });
                    }
        
       
       return works1; 
}); 
