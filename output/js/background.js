chrome.runtime.onMessage.addListener(function(){
	var msg = arguments[0];
	if(!msg){
		return false;
	}
});