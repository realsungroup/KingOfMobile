define(['durandal/app','knockout','plugins/router','plugins/dialog','calendar/fullcalendar'], function (app,ko,router,dialog,fullcalendar) {
     var onewindow = (function (_super) {
                __extends(onewindow, _super);
                function onewindow(id,action,date) {
                        _super.call(this, id,action);
                        this.C3_530553501045=date;
                        
                    }
                return onewindow;
         }(onerecord));
	fetchWinData=function(aDate){
		//alert(aDate.toString());
		        var vartemp=JSON.parse(localStorage.getItem('doWindowlogin'));
                
				var localWinData=vartemp.data[0];
                var record=new onewindow(localWinData.REC_ID,"modified",aDate);
                var records=[];
                records.push(record);
                var json=mini.encode(records);
				//alert(json);
				try {
						appConfig.app.dbs.dbSavedataWithparm(appConfig.app.hostwebpos,0,json,"","1","0",fnsaved,fnnosave,fnsyserror);
						function fnsaved(data){
							 //alert(JSON.stringify(data));
							 var aData=mini.decode(data);
							 var amount=aData.data[0].C3_530553501701;
							 var dates=aData.data[0].C3_530553501967;
							// dialog.showMessage(JSON.stringify(data),'',[],true);
							 var html='<table class="cx"><tr><td>所选日期:</td><td>'+dates+'</td></tr><tr><td>领取数量:</td><td>'+amount+'</td></tr></table>';
							 dialog.showMessage(html,'查询结果',['返回'],false); 

						
						}
						function fnnosave(data){
							 
							 dialog.showMessage(data.message,'查询失败，操作错误',[],true);
						
						
						}
						function fnsyserror(data){
							 dialog.showMessage(JSON.stringify(data),'查询失败，通信错误',[],true);
						
						}

				} catch (error) {
                      dialog.showMessage(JSON.stringify(error),'查询失败,系统错误',[],true);
					
				}
			

	}
	return {
        winno: ko.observable(0),
		winname: ko.observable(""),
		activate:function(){},
    	attached:function(){
			
			if ( appConfig.app.dbs==null)
             {
                
                 router.navigate('#');
				 return ;
                 
             }
			this.winno(appConfig.app.winno);
            this.winname(appConfig.app.winname);
			setTimeout(function() {
			 
        
			    jQuery(document).ready(function() {
	
				var date = new Date();
				var d = date.getDate();
				var m = date.getMonth();
				var y = date.getFullYear();
               // var daycallback=dayClickCallback;
				var calendar = jQuery('#calendar').fullCalendar({
					header: {
						left: 'prev,next today',
						center: 'title',
						right: 'month,agendaWeek,agendaDay'
					},
					height:400,
					monthNames:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '11月', '12月'],
					dayNamesShort:[ '星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
					buttonText: {
						prev: '上个月',
						next: '下个月',
						prevYear: '&nbsp;&lt;&lt;&nbsp;',
						nextYear: '&nbsp;&gt;&gt;&nbsp;',
						today: '回到今天',
						month: 'month',
						week: 'week',
						day: 'day'
					},
					 
					selectable:true,
					dayClick: function(date) {
						var newDate=date.toString();
						var yyyy=date.getFullYear();
						var mm=date.getMonth();
						var dd=date.getDate();
						$('#calendar').fullCalendar( 'gotoDate', yyyy,mm,dd );
						fetchWinData(date);
					}
				});
				$('.fc-header-right').empty();
				
			});
				
			}, 500);
        }
		
    }
	
})