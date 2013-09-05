function init(){
	document.addEventListener("deviceready", deviceReady, true);
}
		
 function deviceReady() {
	var scanner = cordova.require("cordova/plugin/BarcodeScanner");
	
	scanner.scan(
	  function (result) {
		//Send to webservice
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var hours = currentTime.getHours()
		var minutes = currentTime.getMinutes()
		if (minutes < 10){
			minutes = "0" + minutes
		}
		
		var data = {
			wisaId: JSON.stringify(result.text),
			datetime: JSON.stringify(day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":00")
		};
		
		$.ajax({
			url: "http://llnmobile.vtir.be/services/LaatkomerService.asmx/AddTeLaatKomer",
			data: data,
			dataType: "jsonp",
			success: function (json) {
				alert("Leerling ingelezen: " + result.text);
				
				init();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.responseText);
			}
		});
		
		//alert(data);
	  
	  /*
		  alert("We got a barcode\n" +
				"Result: " + result.text + "\n" +
				"Format: " + result.format + "\n" +
				"Cancelled: " + result.cancelled);*/
	  }, 
	  function (error) {
		  alert("Scanning failed: " + error);
	  }
	);
}