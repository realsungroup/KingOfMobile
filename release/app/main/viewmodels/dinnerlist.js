define(['plugins/http', 'durandal/app', 'knockout','durandal/system','plugins/router','./scanner','plugins/dialog'], function (http, app, ko,system,router,scanner,dialog) {
  var oneorder = (function (_super) {
                __extends(oneorder, _super);
                function oneorder(id,action,orderAction,stationid) {
                        _super.call(this, id,action);
                        this.C3_512262253052=orderAction;
                        this.C3_530474055358=stationid;
                    }
                return oneorder;
         }(onerecord));
  var dinnerList=function(){
        this.haverows=ko.observable(false);
        this.rows= ko.observableArray([]);
        this.subrows=ko.observableArray([]);
        this.pageSize=0;
        this.pageIndex=0;
        this.total=0;
        this.barcode=ko.observable("");
        self=this;
        
        this.columns= [
            { headerText: "图例" },
            { headerText: "菜品名称" },
            { headerText: "描述" },
            { headerText: "单价" },
            { headerText: "数量" },
            { headerText: "小计" }
        ];
      ko.computed(function () { 
         system.log('barcodechange');
         if (self.barcode()!=="" && self.barcode()!==undefined){   
             fetchPage(self);
           }
      
         
    });
     
    finishOrder=function(){

       try {
             var record=new oneorder(self.rows()[0].REC_ID,"modified","Y",appConfig.app.winno);
             var records=[];
             records.push(record);
             var json=mini.encode(records);
      //       alert(json);
             
             appConfig.app.dbs.dbSavedataWithparm(appConfig.dinnerlist.resid,0,json,"0","1","0",fnsaved,fnnosave,fnsyserror);
             function fnsaved(data){ 
                  dialog.showMessage("谢谢下次光临",'领取完成',[],true).then(
                  function(response){
                       self.haverows(false);
                       self.rows.removeAll();
                       self.subrows.removeAll();
                       self.total=0;   
                       self.barcode("");
              
                  }); }
              function fnnosave(data){ 
                   dialog.showMessage(data.message,'领取失败，操作错误',[],true);
     
              }
              function fnsyserror(data){ 
                   dialog.showMessage(JSON.stringify(data),'领取失败,通信失败',[],true);
                   
              }
           
       } catch (error) {
             dialog.showMessage(JSON.stringify(error),'领取失败,系统错误',[],true);
           
       }
        
    };
     openScanner=function(){
          scanner.show().then(function(response) {
          system.log(response);
          self.barcode(response);
      });
    }
    fetchPage=function(self){

                
                fetchrows(system, self.barcode(),self.pageSize,self.pageIndex,function(result,data,subdata,count){
                   
                    if (result)
                    { 
                       self.haverows(false);
                       self.rows.removeAll();
                       self.subrows.removeAll();     
                       self.rows(data);
                       self.subrows(subdata);
                       self.total=count;
                       self.barcode("");
                       if (count > 0){ 
                           self.haverows(true);
                        } 
                          
            
                    }
                    else
                    {
                   
                       self.haverows(false);
                       self.rows.removeAll();
                       self.subrows.removeAll();
                      

                       self.total=0;   
                       self.barcode("");
                       

                    }
                    
                    }
                );
        }
    fetchrows= function (system,barcode,pageSize,pageIndex,callback) {
                var resid=appConfig.dinnerlist.resid;
                var subresid=appConfig.dinnerlist.subresid;
                var cmswhere="C3_512261452989="+barcode+" or (C3_529489922410="+barcode+" and C3_512140206161="+appConfig.kingofdinner.dinnerdates+" and C3_512140206692="+appConfig.kingofdinner.dinnerno+")";
                //alert(cmswhere);
                appConfig.app.dbs.dbGetdata(resid,subresid,cmswhere,dataGot,fnerror,fnhttperror,pageSize,pageIndex);
                function dataGot(data,subdata,total)
                {
                    system.log(data);
                    system.log("total="+total);
                    
                    callback(true,data,subdata,total);
                }
                function fnerror(data){   

                  
                    dialog.showMessage(JSON.stringify(data),"获取订单错误");
                    callback(false);

                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
            
                    system.log(jqXHR);
                    callback(false);
            
                }
    };
dinnerList.prototype.activate=function(){ 
             if ( appConfig.app.dbs==null)
             {
               // alert("请先登入系统");
                //router.navigate('#');
                 
             }
           
        };
dinnerList.prototype.attached=function(){
       
    if ( appConfig.app.dbs==null)
             {
                // dialog.showMessage('请先登入系统',"新同事");
                 router.navigate('#');
                 
             }
    

    };      
        };
  return  dinnerList;
});