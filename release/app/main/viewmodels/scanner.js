define(['plugins/dialog', 'knockout'], function (dialog, ko) {
    var scanner = function() {
     
    };
    
    scanner.prototype.cancel = function() {
           
        dialog.close(this);              
    };
    scanner.prototype.ok = function() {
    
        var that=this;
        var barcode=$("#barcode").val();
        dialog.close(that,barcode);
        
    };
    scanner.prototype.attached=function(){
       
         $("#barcode").focus(function(){
                 $("#barcode").css("background-color","#FFFFCC");
                     });
         $(document).keydown(function(event){ 
            if(event.keyCode==13){ 
                $("#confirm").click(); 
            } 
            }); 


    };
       
     scanner.prototype.compositionComplete=function(view){
        setTimeout(function(){
           
            
              $("#barcode").focus();

        },500);
        
       // alert('focus');

     }
    scanner.prototype.canDeactivate = function () {
        return true;
        
    };

    scanner.show = function(){
       
        return dialog.show(new scanner());
    };
    
  
           
       
    return scanner;
});