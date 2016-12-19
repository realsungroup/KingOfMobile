
define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','durandal/system','mobiscroll','signature'], 
    function (app,ko,router,dialog,jquery,system,mobiscroll,signature) {
          var work=new myworkbase();
      work.clearCanvas=function() {
			$('#signature').html('<p><em>Your signature will appear here when you click "Save Signature"</em></p>');
			$('.js-signature').jqSignature('clearCanvas');
			$('#saveBtn').attr('disabled', true);
		}

		work.saveSignature=function(){
			$('#signature').empty();
			var dataUrl = $('.js-signature').jqSignature('getDataURL');
			var img = $('<img>').attr('src', dataUrl);
			$('#signature').append($('<p>').text("Here's your signature:"));
			$('#signature').append(img);
		}
     
       work.activate=function(action,resid,recid,e){
          
              work._activate(action,resid,recid,null,this,e);
             //appConfig.app.subtitle("");
       }
       work.attached=function(){
           
			if ($('.js-signature').length) {
				$('.js-signature').jqSignature();
			};
		 

		

		$('.js-signature').on('jq.signature.changed', function() {
			$('#saveBtn').attr('disabled', false);
		});

       }
      
       return work ;
}); 