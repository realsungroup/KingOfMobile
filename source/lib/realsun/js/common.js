var appfunctions = appfunctions || {};
var appConfig;
var online=null;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
 
appfunctions.system=new function(){ 
    this.setFullCalendar=function(dayClickCallback){
        
			    jQuery(document).ready(function() {
	           
				var date = new Date();
				var d = date.getDate();
				var m = date.getMonth();
				var y = date.getFullYear();
                var daycallback=dayClickCallback;
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
						daycallback(date);
					}
				});
				$('.fc-header-right').empty();
				
			});
				
		 

    }
     this.setUserConfig=function(adata)
    {
        appConfig.app.userConfig=adata;
       
    }
    this.setUserprofile=function(adata)
    {
        appConfig.app.userProfile=adata;
       
    }
    this.setWeixinOpenid=function(openid)
    {
        appConfig.app.openid=openid;
    }
     this.getWeixinOpenid=function()
    {
        if (appConfig.app.weixindebug)
           {
              return appConfig.app.debugopenid;
           }
           return appConfig.app.openid;
    }
     
    this.clearAppConfig=function(){
         appConfig.app.dbs=null;
         appConfig.app.userConfig=null;
         appConfig.app.userProfile=null;
         localStorage.clear();
    }
    this.setAppConfig=function(adata){
         appConfig.app.userConfig=adata;
         appConfig.app.userProfile=adata;
    }
    this.doWindowlogin=function(text,fnSuccess,fnError){
                   
                    var data;
                    var self =this;   
                    if (typeof(text)=="string")
                    {
                       data=JSON.parse(text);
                    }
                    else
                    {
                       data=text;
                    }
                    if (data.error==undefined)
                    {
                        if (fnError != null) {
                            fnError("登入失败!");
                            return;
                        }
                    }
                   
                     if (data.data==undefined)
                    {
                        if (fnError != null) {
                            fnError("登入失败!");
                            return;
                        }
                    }  
                      if (data.data==null||data.data==undefined)
                    {
                        if (fnError != null) {
                            fnError("登入失败!");
                            return;
                        }
                    }
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data.message);
                            return ;
                        }
                    }
                    var adata = [];
                    var subdata = [];
                    var total=0;
                   
                  
                   
                   adata = data.data;
                 
                     
                   
                    if (fnSuccess != null) {
                        self.setAppConfig(adata);
                        var dbh=new dbHelper(appConfig.app.baseUrl,appConfig.app.userConfig.LoginID,appConfig.app.userConfig.PassEncrypted);
                        var aRecord=new onerecord(adata.REC_ID,"modified");
                        var records=[];
                        var aUser={"EMP_NAME":""};
                        aUser.EMP_NAME=appConfig.app.userConfig.Name;
                        $.extend(aUser,aRecord);
                        records.push(aUser);
                        var json=JSON.stringify(records);
                        dbh.dbSavedata(appConfig.app.hostwebpos,0,json,fnsaved,fnnosave,fnsyserror);
                        function fnsaved(returnText)
                        {
                            try {
                                  if (typeof(returnText)=='object')
                                  {
                                     self.setUserprofile(returnText.data[0]);
                                  }
                                   if (typeof(returnText)=='string')
                                  {
                                     self.setUserprofile(JSON.parse(returnText).data[0]);
                                  }
                                  
                                  localStorage.setItem('doWindowlogin',JSON.stringify(appConfig.app.userConfig));
                                  fnSuccess("登入成功!");
                                  return;
                                
                            } catch (error) {
                                  
                                    
                               
                                fnError(JSON.stringify(error));
                                self.clearAppConfig();
                                return ;
                            }
                             
                        }
                        function fnnosave(error)
                        {
                             self.clearAppConfig();
                             fnError(error.message);
                             return ;
                        }
                        function fnsyserror(error)
                        {
                             self.clearAppConfig();
                             fnError("系统错误");
                            return ;
                        }
                    }
    }
    this.TryWindowlogin=function(openid,fnSuccess,fnError,fnSyserror)
    {
        var url;
        var cmswhere="C3_511297475786='"+openid+"'";               
        var self=this;
        url = appConfig.app.baseUrl + "&method=" + appConfig.app.getMethod + "&user=" + appConfig.app.hostuser + "&ucode=" + appConfig.app.hostucode + "&resid=" + appConfig.app.hostwebpos + "&cmswhere=" + cmswhere;
          $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                   self.doWindowlogin(text,fnSuccess,fnError);
                }
                else
                {
                    fnError("数据为空");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnError("doWindowlogin:系统错误");
                }
            } });
    }
    this.doLoginbyopenid=function(openid,fnSuccess, fnError, fnSyserror) {
         var url;
         var self=this;
           url = appConfig.app.loginUrl +"&apitoken=KingOfDinner123456789&clienttype=mobile&openid="+openid;
           $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                    
                    var data;
                    if (typeof(text)=='object')
                    {
                        data =text;
                    }
                    else
                    {
                        data = JSON.parse(text);
                    }
                    
                    if (data.error !== 0) {
                        if (fnError != null) {
                            fnError(data);
                        }
                    }
                    else{  
                        if (fnSuccess != null) {
                          
                            //fnSuccess(data);
                             self.doWindowlogin(text,fnSuccess,fnError);
                          }
                        }
                   }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            } });

     
    }
    this.doLogin=function(user,upass,fnSuccess, fnError, fnSyserror) {

           var url;
           url = appConfig.app.loginUrl +"&apitoken=KingOfDinner123456789&clienttype=mobile&user="+user+"&upass="+upass;
           $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                    
                    var data;
                    if (typeof(text)=='object')
                    {
                        data =text;
                    }
                    else
                    {
                        data = JSON.parse(text);
                    }
                   
                    if (data.error !== 0) {
                        if (fnError != null) {
                            fnError(data);
                        }
                    }
                    else{  
                        if (fnSuccess != null) {
                          
                            fnSuccess(data);
                          }
                        }
                   }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            } });

     };
}
appfunctions.uploadFile = new function () {
    var uploadFile = this;
    this.swfFileUpload = function (aappConfig, fileupload) {
        fileupload.setUploadUrl(aappConfig.app.uploadFileUrl + "?savepath=e:\\web\\rispweb\\upfiles&httppath=" + aappConfig.app.httppath);
        fileupload.startUpload();
    };
this.ajaxFileUpload = function (aappConfig, inputFile) {
        mini.parse();
        scriptLoaded();
        function scriptLoaded() {
            alert('scriptLoaded');
            $.ajaxFileUpload({
                url: aappConfig.app.uploadFileUrl,
                fileElementId: inputFile,
                data: { savepath: "e:\\web\\rispweb\\upfiles" },
                dataType: 'json',
                success: function (data, status) {
                    if (data) {
                        alert("上传成功: " + data);
                    }
                    else {
                        alert("上传成功,无返回信息 ");
                    }
                },
                error: function (data, status, e) {
                    alert(e);
                },
                complete: function () {
                    var jq = $("#file1 > input:file");
                    jq.before(inputFile);
                    jq.remove();
                }
            });
        }
    };


};
var onerecord=(function()
{
    function onerecord(id,action)
    {
        this._id=1;
        this._state=action;
        this.REC_ID=id;
    }
    return onerecord;
}());
var dbHelper = (function () {
    function dbHelper(baseurl, user, ucode) {
        this.saveMethod = appConfig.app.saveMethod;
        this.getMethod = appConfig.app.getMethod;
        this.getBysqlMethod=appConfig.app.getBysqlMethod;
        this.GetCmsColumnsMethod=appConfig.app.GetCmsColumnsMethod;
        this.baseUrl = baseurl;
        this.user = user;
        this.ucode = ucode;
    }
        dbHelper.prototype.dbGetLittleDataBysql = function (resid, f3svc_sql, fnSuccess, fnError, fnSyserror)
    {
        var url;
        url = this.baseUrl + "&method=" + this.getBysqlMethod + "&user=" + this.user + "&ucode=" + this.ucode + "&resid=" + resid  + "&f3svc_sql=" + f3svc_sql;
        $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                    var data;
                    if (typeof(text)=='object')
                    {
                        data =text;
                    }
                    else
                    {
                        data = JSON.parse(text);
                    }
                   
                   
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data);
                        }
                    }
                    var adata = [];
                   
                    var total=0;
                    adata = data.data;
                    if (data.total)
                    {  total = data.total;}
                  
                    if (fnSuccess != null) {

                        fnSuccess(adata,total);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            } });

    }
    dbHelper.prototype.dbGetCmsColumns = function (resid, fnSuccess, fnError, fnSyserror,dfd)
    {
        var url;
        url = this.baseUrl + "&method=" +this.GetCmsColumnsMethod + "&user=" + this.user + "&ucode=" + this.ucode + "&resid=" + resid;
        $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                    var data;
                    if (typeof(text)=='object')
                    {
                        data =text;
                    }
                    else
                    {
                        data = JSON.parse(text);
                    }
                   
                   
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data,dfd);
                        }
                    }
                    var adata = [];
                   
                    var total=0;
                    adata = data.data;
                    if (data.total)
                    {  total = data.total;}
                  
                    if (fnSuccess != null) {

                        fnSuccess(adata,total,dfd);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown,dfd);
                }
            } });

    }
    dbHelper.prototype.dbGetdata = function (resid, subresid, key,cmswhere, fnSuccess, fnError, fnSyserror,pageSize,pageIndex) {
        var url;
        url = this.baseUrl + "&method=" + this.getMethod + "&user=" + this.user + "&ucode=" + this.ucode + "&resid=" + resid + "&subresid=" + subresid + "&cmswhere=" + cmswhere+"&key=" +key;
        if ((pageSize >0))
        {
             url=url+"&pageIndex="+pageIndex+"&pageSize="+pageSize;
        }
        
        $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                    var data;
                    if (typeof(text)=='object')
                    {
                        data =text;
                    }
                    else
                    {
                        data = JSON.parse(text);
                    }
                   
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data);
                            return;
                        }
                    }
                    var adata = [];
                    var subdata = [];
                    var total=0;
                    adata = data.data;
                    if (data.total)
                    {  total = data.total;}
                 
                    if (data.subdata != null) {
                        subdata = data.subdata.data;
                    }
                    if (fnSuccess != null) {

                        fnSuccess(adata, subdata,total);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            } });
    };
    dbHelper.prototype.doDbSavedata = function (resid, subresid, json, url,fnSuccess, fnError, fnSyserror,dfd) {
         $.ajax({
            url: url,
            async: false,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            type: 'post',
            data: { data: json, resid: resid },
            cache: false,
            success: function (text) {
                if (text.error == "0") {
                    if (fnSuccess != null) {
                        fnSuccess(text,dfd);
                    }
                }
                else {
                    if (fnError != null) {
                        fnError(text,dfd);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown,dfd);
                }
            }
        });

    }
    dbHelper.prototype.dbSavedata = function (resid, subresid, json, fnSuccess, fnError, fnSyserror,dfd) {
        var url;
        url = this.baseUrl + "&method=" + this.saveMethod + "&user=" + this.user + "&ucode=" + this.ucode;
        dbHelper.prototype.doDbSavedata(resid, subresid, json, url,fnSuccess, fnError, fnSyserror,dfd);
    };
    dbHelper.prototype.dbSavedataWithparm = function (resid, subresid, json,withoutdata,formulalayer,synchronizedat, fnSuccess, fnError, fnSyserror,dfd) {
        var url;
        url = this.baseUrl + "&method=" + this.saveMethod + "&user=" + this.user + "&ucode=" + this.ucode+"&withoutdata="+withoutdata+"&formulalayer="+formulalayer+"&synchronizedat="+synchronizedat;
        dbHelper.prototype.doDbSavedata(resid, subresid, json, url,fnSuccess, fnError, fnSyserror,dfd);
    };
    return dbHelper;
}());
var miniPanel = (function () {
    function miniPanel(element) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toLocaleTimeString();
    }
    miniPanel.prototype.start = function () {
        var _this = this;
        var jsonString = '{"messge": "ok","error":"-1"}';
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toLocaleTimeString(); }, 500);
    };
    miniPanel.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    miniPanel.prototype.appendPanel = function (parentelement, panelid, mini, classname, title, url, fnload, expanded, iconCls) {
        this.mini_control = document.createElement('div');
        this.mini_control.id = panelid;
        this.mini_control.className = classname;
        this.mini_control.title = title;
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aPanel = mini.get(panelid);
        aPanel.set({ "width": "auto", "height": "800", "iconCls": iconCls, "expanded": expanded, "onbuttonclick": "onbuttonclick" });
        aPanel.load(url, function () {
            var iFrame = aPanel.getIFrameEl();
            fnload(iFrame);
        }, null);
    };
    return miniPanel;
}());
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var str=(window.location.href);
    str=str.substr(str.indexOf("?"));
    var r = str.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
function onbuttonclick(e) {
    if (e.name = "collapse") {
        setTimeout(function () {
            if (e.sender.expanded == true) {
                e.sender.set({ "height": "400px" });
            }
        }, 500);
    }
}
function fullScreen(el) {  
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,  
        wscript;  
   
    if(typeof rfs != "undefined" && rfs) {  
        rfs.call(el);  
        return;  
    }  
   
    if(typeof window.ActiveXObject != "undefined") {  
        wscript = new ActiveXObject("WScript.Shell");  
        if(wscript) {  
            wscript.SendKeys("{F11}");  
        }  
    }  
}  
  
function exitFullScreen(el) {  
    var el= document,  
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,  
        wscript;  
   
    if (typeof cfs != "undefined" && cfs) {  
      cfs.call(el);  
      return;  
    }  
   
    if (typeof window.ActiveXObject != "undefined") {  
        wscript = new ActiveXObject("WScript.Shell");  
        if (wscript != null) {  
            wscript.SendKeys("{F11}");  
        }  
  }  
}
Date.prototype.format = function(format)
 {
  var o = {
  "M+" : this.getMonth()+1, //month
  "d+" : this.getDate(),    //day
  "h+" : this.getHours(),   //hour
  "m+" : this.getMinutes(), //minute
  "s+" : this.getSeconds(), //second
  "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
  "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
  (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
  format = format.replace(RegExp.$1,
  RegExp.$1.length==1 ? o[k] :
  ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
 }