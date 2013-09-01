//general functions
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

// Request
Request = {};
Request.httpRequest = function(service, jsonData, successCallback, errorCallback) {
	var successHandler, errorHandler;

	if(successCallback == undefined)
		successHandler = Request.defaultSuccessHandler;
	else
		successHandler = function(response){
			successCallback(response);
			Request.defaultSuccessHandler(response);
		}

	if(errorCallback == undefined)
		errorHandler = Request.defaultErrorHandler;
	else
		errorHandler = function(response){
			errorCallback(response);
			Request.defaultErrorHandler(response);
		}

	$.ajax({
  		type: "POST",
  		url: service,
                dataType: 'json',
  		data: jsonData,
  		success: successHandler,
  		error: errorHandler
	});
};

Request.defaultSuccessHandler = function(response) {
    if(response.message) alert(response.message);
}

Request.defaultErrorHandler = function(response) {
    alert(response.responseText);
}