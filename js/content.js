(function () {
	var child, data;
	if (document.body) {
		child = document.body;
		data = child.innerHTML;
		var m = data.match(/^([^\(]+\(){0,1}(.*?)(\)*;*)$/);

		if (data && m && m[2]) {
			data=[data,window.location.href];

			chrome.runtime.sendMessage(data,function(result){
				if(result[0]){
					var jsonViewCss= chrome.extension.getURL("css/json.css");
					var el = document.createElement('link');
					el.rel='stylesheet';
					el.href=jsonViewCss;
					document.head.appendChild(el);
					document.body.innerHTML=result[0];

					el = document.createElement('script');
					el.type='text/javascript';
					el.src=chrome.extension.getURL('js/lib/zepto.min.js');
					document.head.appendChild(el);

					var aa = document.createElement('script');
					aa.type='text/javascript';
					aa.src=chrome.extension.getURL('js/app/content.js');
					document.head.appendChild(aa);
				}
			})
		}
	}
}());

