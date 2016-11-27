define(function(require){
  var editbase = function(resid, recid){
    this.resid = resid;
    this.recid = recid;
  };
 
  editbase.prototype.getData = function(){
  
  };
  editbase.prototype.addData = function(row){
    //do some ajax and return a promise
  };
  editbase.prototype.modifyData = function(row){
    //do some ajax and return a promise
  };
  editbase.prototype.modifyDataField = function(hash){
    //do some ajax and return a promise
  };
   editbase.prototype.deletebyrecid = function(recid){
    //do some ajax and return a promise
  };
  return editbase;
});