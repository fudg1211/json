(function () {
	var child, data,check;
	if (document.body && (document.body.childNodes[0] && document.body.childNodes[0].tagName == "PRE" || document.body.children.length == 0)) {
		child = document.body.children.length ? document.body.childNodes[0] : document.body;
		data = child.innerText.trim();
		check=true;
	}else if(document.body){
		data = document.body.innerHTML;
		data = data.trim();
		if(/^\w+\(/.test(data) || /^[\{\[]/.test(data)){
			check=true;
		}
	}

	if (data && check) {
		chrome.runtime.sendMessage([data,window.location.href],function(result){
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

}());