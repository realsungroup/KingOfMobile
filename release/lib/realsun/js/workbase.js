 
  workbase=(function(){
            function workbase()
            {
                this.emptyrow={};
                this.mobiselectControlid="";

// mobiscroll 状态选择
                this.stateChanged=function(){
                                this.currentResidChanged(mobiscroll.$(this.mobiselectControlid).val());
                            }
                 //在列表窗口弹出申请状态选择窗口 
                this.selectStates=function(){
                    
                        $(this.mobiselectControlid).mobiscroll('show');
                        return false;
                }

                this.Basepath="";
//注册自己的路由
                this.registerStateSelectControl=function(id){
                   this.mobiselectControlid=id;
                }
                 this.registerBasepath=function(path){
                    this.Basepath=path;
                }
//向下滚动逐行取记录
                this.registerInfinitefunction=function(that,callback){
                    
                    if (that.total()>that.rows().length)
                    {  
                                    that.fetchnextrow(that,function(){
                                        that.nextrowindex++;
                                        callback();
                                    });
                                
                        
                    }
                    else
                    {  
                        callback();
                        }
                    
                    }
//    -----------------------------            
                this.rows=appConfig.app.ko.observableArray([]);
                this.key=appConfig.app.ko.observable("");
                this.cmswhere=appConfig.app.ko.observable("");
                this.lastError=appConfig.app.ko.observable("");
                this.total=appConfig.app.ko.observable(0);
                this.currentPagescrolltop=0;
                this.getFilterresids=function(){
                           return  this.myrouter.filterresids;
                    };
                this.currentFilterResid=appConfig.app.ko.observable("");

                this.currentResidChanged=function(resid){
                    var self=this;
                   if (resid!=self.getCurrentFilterResid()){ 
                       self.currentFilterResid(resid);
                       fetchPage(self)
                    }
                   

                }
                this.getCurrentFilterResid=function(){
                    if (this.currentFilterResid()==""){
                       return this.myrouter.resid;
                    }
                    else
                    { return this.currentFilterResid()}

                   
                }
                this.selectedRecid=0;
                this.getcurrentPagescrolltop=function(){
                        return $('.page__content').scrollTop();
                    }
                this.setPagesize=function(size){
                    this.myrouter.pagesize=size;
                };
                this.getPagesize=function(){
                    if (this.myrouter.pagesize==undefined){
                        return this.pageSize;
                    }
                    else{
                        return this.myrouter.pagesize;
                    }
                    

                };
                this.maxPageIndex=function(){ 
                     var self=this;
                    return appConfig.app.ko.pureComputed(function() {
                   
                    return Math.ceil(appConfig.app.ko.utils.unwrapObservable(self.total) / self.getPagesize()) - 1;
                }, self);};
                this.myrouter=null;
                this.getViewresid=function(){
                    var that=this;
                    if (that.currentFilterResid()==0)
                    { return that.myrouter.resid;}
                    else
                    {
                        return that.currentFilterResid()
                    }
                   

                }
                this.getTitle=function(){
                    return this.myrouter.title;
                }
                this.getDbEmptyrow=function(dfd){
                    var that=this;
                    appConfig.app.dbs.dbGetCmsColumns(that.getViewresid(), fnSuccess, fnError, fnSyserror,dfd);
                    function fnSuccess(data,total,dfd)
                    {
                        var row={}
                        for (x in data)
                        {eval('row.'+data[x].id+'=null');}
                        row.REC_RESID=that.getViewresid();
                        dfd.resolve(row);

                    }
                    function fnError(errordata,dfd)
                    {
                         dfd.reject(errordata);

                    }
                    function fnSyserror(jqXHR, textStatus, errorThrown,dfd)
                    {
                        var errordata={"error":-2,"message":textStatus};
                         dfd.reject(errordata);
                    }
                }
    //activate
        /**参数说明
         * @action "list/add/edit/browse"
         * @resid showMessage
         * @recid {string} message The message to display in the dialog.
         * @e {string} [title] The title message.
         */
                this._activate=function (action,resid,recid,editform,e,work) {
                        if (e!==undefined){
                            if (e.scrolltop){this.currentPagescrolltop=e.scrolltop;}
                            if (e.selectedrecid){this.selectedRecid=e.selectedrecid}
                         }
                          if (action==undefined){
                                this.action='list';
                               
                                
                            }
                            else{
                                this.action=action;
                             
                                
                            }
                        
                        if (this.action=='list'){
                            
                           
                        }
                        else{
                            this.editform=editform;
                            var that=this;
                            var rows=that.rows();
                            
                            if (that.action=='add')
                            {
                               
                                
                             
                                that.editform.activate(resid,recid,JSON.stringify(that.emptyrow),that.action);
                                
                            }
                            else
                            {
                                var o=$.grep(rows,function(row,i){return row["REC_ID"]==recid})[0];
                                var json=JSON.stringify(o);
                                that.editform.activate(resid,recid,json,that.action,o);
                            }
                            
                            
                        }
                         
    //    --------------------------------                  
                         var self=this;
                         var openid="";
                         var self=this;
                         var myworkshell=appConfig.app.myworkshell;
                         self.myrouter=myworkshell.getCurroute(self);
                         appConfig.app.curRouterHash=self.myrouter.hash;
                         myworkshell.setSubtitle(self.myrouter.title);
                         if (self.myrouter.pagesize<Math.floor(document.body.clientHeight*0.015))
                         {
                              self.myrouter.pagesize=Math.floor(document.body.clientHeight*0.015)
                         }
                        
                         this.nextrowindex=this.getPagesize();
                         if (appConfig.app.runmode=="weixin"){
                            openid=appConfig.appfunction.system.getWeixinOpenid();
                            //weixin 登入  
                            if (openid==""||openid==null)
                                {
                                    window.location=appConfig.app.weixinOAuthUrl+"?hash="+appConfig.app.curRouterHash.replace("#","");
                                   // router.navigate(appConfig.app.weixinOAuthUrl+"?hash="+appConfig.app.curRouterHash.replace("#",""));
                                    return ;
                                }
                                else
                                {
                                   

                                }

                         }
                        if ( appConfig.app.dbs!==null)
                        {
                           if (self.rows().length==0){ self.pageIndexChanged(self.pageIndex);}
                           
                            
                        }
                        else{
                            //跳转首页登入
                          window.location='/#'}
                        
                      appConfig.app.subtitle(work.getTitle());
                      appConfig.app.infinitefunction=work.infinitefunction;

                };
           this._attached=function () {  
                
              var self=this;
                  
              if (self.action=='list'){
               
                  mobiscroll.$(self.mobiselectControlid).change(function(){self.stateChanged()});
                  mobiscroll.$(self.mobiselectControlid).val(self.getCurrentFilterResid()).trigger('change'); 
                
              }
              
               
            };
           this._compositionComplete=function(view,work){
//  ------------------------
                if (this.action=='list'){
               
                   
                    // ------------开始定位当前的记录
                    if  (this.currentPagescrolltop>0)
                    {
                       
                       
                        $('.page__content').animate({'scrollTop':this.currentPagescrolltop},1000);
                        
                    }
                 
              }
              
              var self=this;
                if ( appConfig.app.dbs!==null)
                  {
                       if (self.rows().length==0){ self.pageIndexChanged(self.pageIndex);}
                   try {
//-----------------mobiscroll 初始化
                 $(function() {
                            var currYear = (new Date()).getFullYear();
                            var opt = {};
                           // opt.date = { preset: 'date' };
                            //opt.datetime = { preset: 'datetime' };
                            // opt.time = { preset: 'time' };
                            opt.default = {
                                theme: 'bootstrap', //皮肤样式
                                display: 'center', //显示方式
                                mode: 'scroller', //日期选择模式
                                dateFormat: 'yy-mm-dd',
                                timeFormat:'HH:ii',
                                preset: 'datetime',
                                lang: 'zh',
                                showNow: true,
                                steps: { 
                                            minute: 15,
                                            second: 5,
                                            zeroBased: true
                                        },
                                nowText: "今天",
                                startYear: currYear, //开始年份
                                endYear: currYear + 2, //结束年份
                            };
                            $(".appDate").mobiscroll($.extend(opt['date'], opt['default']));
                            $('.appSelect').mobiscroll().select({
                                            theme: 'ios',      // Specify theme like: theme: 'ios' or omit setting to use default
                                            lang: 'zh',   // Specify language like: lang: 'pl' or omit setting to use default
                                            display: 'center',  // Specify display mode like: display: 'bottom' or omit setting to use default
                                            mode: 'scroller',        // More info about mode: https://docs.mobiscroll.com/3-0-0_beta2/select#!opt-mode
                                            minWidth: 100                  // More info about minWidth: https://docs.mobiscroll.com/3-0-0_beta2/select#!opt-minWidth
                                        });
                        });       
                        
//    -----------下拉刷新
                 
                   
                           var pullHook = document.getElementById('pull-hook');
                      
                            pullHook.addEventListener('changestate', function(event) {
                            var message = '';

                            switch (event.state) {
                            case 'initial':
                               // message = '下拉刷新';
                                break;
                            case 'preaction':
                              //  message = '';
                                break;
                            case 'action':
                              //  message = '正在加载...';
                                break;
                            }
                        //pullHook.innerHTML = message;
                    });

                        pullHook.onAction = function(done) {
                           
                            self.currentPagescrolltop=0;
                            self.selectedRecid=0;
                            fetchPage(self);    
                            setTimeout(done, 100);
                        };
                        
                    } catch (error) {
                        
                    }
                 
// --------------------------------------------------------------------
                      
                  }      
                    appConfig.app.subtitle(work.getTitle());   
               
              };
              this.setModuleid=function(moduleid)
              {
                      var self=this;
                      self.__moduleId__='mywork/viewmodels/'+moduleid;
              };
        
         this.fetchnextrow=function(self,callback){
             fetchrows(self,1,self.nextrowindex,function(result,data,total){
                    if (result){ 
                        if (data.length>0)
                        {
                             self.rows.push(data[0]);

                        }
                          
                     }
                    callback();
               }
             );
         }
          this.pageSize=appConfig.app.defaultpagesize;
          this.pageIndex=0;
          this.nextrowindex=this.pageSize*(this.pageIndex+1);
          this.pageIndexChanged=function(index){   
             var self=this;
             self.pageIndex=index;
             fetchPage(self);      
          };
// -----------------------// -----------------------------form section 编辑或查阅窗口模式下的功能
  this._saveform=function(work,system,router){
         var that=work;
         
         
         var promise=system.defer(function(dfd){
                                    try {
                                      
                                        that.editform.saveform(dfd);
                                        
                                    
                                    } catch (error) {
                                        dfd.reject(error);
                                    
                                    }
                                }).promise();
            promise.then(function(e){
                if (that.action=='add')
                {
                    that.rows.unshift(e.data[0]);
                    that.selectedRecid=e.data[0].REC_ID;
                    that.total(that.total()+1);
                }
                else
                {
                    that.selectedRecid= that.editform.formdata().REC_ID;
                  // that.rows.sort(function (left, right) { return left.REC_EDTTIME == right.REC_EDTTIME ? 0 : (left.REC_EDTTIME < right.REC_EDTTIME ? 1 : -1) }) 
                }
                 
                router.navigate(that.Basepath+"/list/resid/0/recid/0?scrolltop="+that.currentPagescrolltop+"&selectedrecid="+ that.selectedRecid);
               
            });
       };
 //返回列表
       this._back=function(router){
                    
                router.navigate(this.Basepath+"/list/resid/0/recid/0?scrolltop="+this.currentPagescrolltop+"&selectedrecid="+ this.selectedRecid);
           
       };
// ------------------------------list section-列表模式下的功能------------------------------------//
  //编辑记录  
       this._edit=function(row,work,path,router){
          work.currentPagescrolltop=work.getcurrentPagescrolltop();
          work.selectedRecid=row.REC_ID;
          router.navigate(path+"/edit/resid/"+row.REC_RESID+"/recid/"+row.REC_ID+"?scrolltop="+work.currentPagescrolltop+"&selectedrecid="+ work.selectedRecid);
       }
 //删除记录 
       this._del=function(row,work,path,router,editbase,dialog){
          work.currentPagescrolltop=0;
          work.selectedRecid=0
           
          var selfwork=work;
          var myeditbase=new editbase(row.REC_RESID,row.REC_ID);
            dialog.showMessage('是否确认删除记录','',['确认','取消'],false).then(function(e){
                if (e=='确认')
                {
                    myeditbase.deletebyrecid().then(function(e){
                
                        if (e.error==0)
                        {
                            dialog.showMessage('删除成功','').then(function(){
                                 selfwork.rows.remove(function(onerow){return onerow["REC_ID"]==row.REC_ID;});
                                 selfwork.total(selfwork.total()-1);
                            });
                           
                        }
                        else
                        {
                            dialog.showMessage(e.message,'删除失败');
                        }
                    },function(error){
                        dialog.showMessage(error,'删除失败');

                    });
                }
                

            });
         
        
        
       }
 //查阅记录 
       this._browse=function(row,work,path,router){
          work.currentPagescrolltop=work.getcurrentPagescrolltop();
          work.selectedRecid=row.REC_ID;
          router.navigate(path+"/browse/resid/"+row.REC_RESID+"/recid/"+row.REC_ID+"?scrolltop="+work.currentPagescrolltop+"&selectedrecid="+ work.selectedRecid);
       }
 //添加记录 
       this._add=function(work,path,router){
            work.currentPagescrolltop=0;
            work.selectedRecid=0
            router.navigate(path+"/add/resid/"+work.getViewresid()+"/recid/0"+"?scrolltop="+work.currentPagescrolltop+"&selectedrecid="+ work.selectedRecid);
     }
  
             
            }
            return   workbase;
        }());
         
  fetchPage=function(self){

                self.nextrowindex=self.getPagesize();
                fetchrows(self,self.getPagesize(),self.pageIndex,function(result,data,total){
                    if (result)
                    { 
                            
                        self.rows(data);
                        self.total(total);
                        self.lastError("");
                        if (self.data!==undefined){
                            self.data(self);
                         }
                        
                        
                        }
                    else
                      {
                          self.rows([]);
                          self.total(0);   
                          self.lastError(data.message);
                           if (self.data!==undefined){
                            self.data(self);
                         }
                          
                      }
                      
                    }
                   
                );
          }
        fetchrows= function (self,pageSize,pageIndex,callback) {
                
                var resid=self.getViewresid();
                
                
                 appConfig.app.dbs.dbGetdata(resid,"",self.key(),self.cmswhere(),dataGot,fnerror,fnhttperror,pageSize,pageIndex);
                function dataGot(data,subdata,total)
                {
            
                
                    callback(true,data,total);
                }
                function fnerror(data){   

          
                    callback(false,data,0);

                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
            
             
                    callback(false,null,0);
            
                }
        
        };
 var myworkbase=(function (_super) {
            __extends(myworkbase, _super);
            function myworkbase() {
                _super.apply(this, arguments);
            }
                return myworkbase;
            }(workbase));
       
 
           
         