define(['durandal/app','knockout','plugins/router','plugins/dialog','calendar/fullcalendar','durandal/viewEngine','jqueryprint'], function (app,ko,router,dialog,fullcalendar,viewEngine) {
     var onewindow = (function (_super) {
                __extends(onewindow, _super);
                function onewindow(id,action,date) {
                        _super.call(this, id,action);
                        this.C3_530553501045=date;
                        
                    }
                return onewindow;
         }(onerecord));
	fetchOrderList=function(aDate){
		 
		      
				try {
						 
                       var resid=appConfig.kingofdinner.v_dishlistofprepare;
                       var dates=aDate.format('yyyyMMdd');
					  // alert(dates);
                       var f3svc_sql="select * from v_dishlistofprepare where dates='"+dates+"' and canteenno='"+appConfig.app.canteenno+"'";
            
                        appConfig.app.dbs.dbGetLittleDataBysql(resid,f3svc_sql,dataGot,fnerror,fnhttperror);
						function dataGot(data){
							 
							 var aData=mini.decode(data);
						 
							 var html='<p data-bind="html: title"></p>';
							 var extendSettings={"dates":dates,"data":aData};
							 dialog.MessageBox.setViewUrl("orderrpt/views/fetchOrderList.html");
							 dialog.showMessage(html,'查询结果',['返回'],false,extendSettings);
							 delete dialog.MessageBox.prototype.viewUrl;
							  dialog.MessageBox.prototype.getView = function () {
       							 return viewEngine.processMarkup(dialog.MessageBox.defaultViewMarkup);
    						};

						
						}
						function fnerror(data){
							 
							 dialog.showMessage(data.message,'查询失败，操作错误',[],true);
						
						
						}
						function fnhttperror(data){
							 dialog.showMessage(JSON.stringify(data),'查询失败，通信错误',[],true);
						
						}

				} catch (error) {
                      dialog.showMessage(JSON.stringify(error),'查询失败,系统错误',[],true);
					
				}
			

	}
	return {
        winno: ko.observable(0),
		winname: ko.observable(""),
		 
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
                //var daycallback=dayClickCallback;
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
						fetchOrderList(date);
					}
				});
				$('.fc-header-right').empty();
				
			});
				
			}, 500);
			
		
        }
		
    }
	
})