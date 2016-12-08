define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','editbase','durandal/system','editform','durandal/binder'], 
    function (app,ko,router,dialog,jquery,editbase,system,editform,binder) {
      
    var work=new myworkbase();
//初始化空的记录行对象
    work.emptyrow.C3_533143179815=(new Date()).format('yyyy-MM-dd hh:00');
    work.emptyrow.C3_533143217561=(new Date()).format('yyyy-MM-dd hh:00');
    work.emptyrow.C3_533398158705='病假';
    work.registerBasepath("#mywork/mywork1");
    work.registerStateSelectControl('#selectstates');
//注册使用翻页函数
    work.infinitefunction=function(callback){
          work.registerInfinitefunction(work,callback);
      }
//在编辑窗口弹出假期类别选择窗口 
       work.selectItems=function(){
            $('#selectitems').mobiscroll('show');
            return false;
       }
//activate
       work.activate=function(action,resid,recid,e){
         
            work._activate(action,resid,recid,editform,this,e);
           
       };
//get view
       work.getView=function(){
             if (this.action=='list'){
                 return 'mywork/views/mywork1.html'
             }
             else{
                 return 'mywork/views/editform.html'
             }

       }
//compositionComplete
       work.compositionComplete=function(view){
           work._compositionComplete(view,work);
        //    $("ons-list-item").on('mouseenter',function(e){
        //        $(this).addClass("item-active");
        //    })
        //    $("ons-list-item").on('mouseleave',function(e){
        //        $(this).removeClass("item-active");
        //    })
        //    $('#'+work.selectedRecid).trigger('mouseenter');

       };
//binding
       work.binding= function (view) {
            return { cacheViews:false }; //cancels view caching for this module, allowing the triggering of the detached callback
        };
//bindingComplete
        work.bindingComplete= function (view) {
         
        };
//attached
        work.attached=function(){
            var self=this;
            this._attached();
             if (this.action!=='list'){
               
                
                 mobiscroll.$('#selectitems').val(this.editform.formdata().C3_533398158705).trigger('change');
                 this.editform.attached();
              }
              else
              {
                   // 
              }
              
        }
// -----------------------------form section 编辑或查阅窗口模式下的功能
    //保存记录
       work.saveform=function(){
         var that=this;
         that.editform.formdata().C3_533398158705=mobiscroll.$('#selectitems').val();
         this._saveform(work,system,router)
        
       };
       work.back=function(){
                    
                work._back(router);
           
       };
// ------------------------------list section-列表模式下的功能------------------------------------//
  //编辑记录  
       work.edit=function(row){
      
          work._edit(row,work,work.Basepath,router)
      }
 //删除记录 
       work.del=function(row){
           work._del(row,work,work.Basepath,router,editbase,dialog)
        
        
       }
 
 //添加记录 
       work.add=function(){
           
            work._add(work,work.Basepath,router)
     }
 
return work;
}); 
