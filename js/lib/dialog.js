/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-9-3
 * Time: PM4:20
 * To change this template use File | Settings | File Templates.
 */

function dialog(config) {

	var className = config.className,
		funs = config.funs,
		tplName = config.url || 'dialog',
		url = initData.resourcesDir+'/tpl/'+tplName+'.ejs?v=123';


	var content = config.loadingContent || new EJS({url: url}).render({md: config});

	var coverEl = document.createElement('div'),
		dialogEl = document.createElement('div'),
		contentEl = document.createElement('div'),
		tokenEl = document.createElement('div');

	coverEl.className = 'cover';
	dialogEl.className = 'dialog';
	tokenEl.className='clear';

	if (className) {
		$(coverEl).addClass(className);
	}

	contentEl.className = 'dialogContent';
	contentEl.innerHTML = content;

	dialogEl.appendChild(contentEl);
	coverEl.appendChild(dialogEl);

	document.body.appendChild(coverEl);
	document.body.appendChild(tokenEl);
	coverEl.style['visibility'] = 'hidden';


	var scrollTop = document.body.scrollTop;

	var h = dialogEl.offsetHeight;
	var t = scrollTop+ window.innerHeight / 2 - h / 2 - 10;
	var a = document.body.scrollHeight;

	if(t<20){
		t=20;
	}

	var getdialogElHeightTimes = 0;
	var getdialogElHeight=function(){
		getdialogElHeightTimes++;
		h = dialogEl.offsetHeight;
		if(!h && getdialogElHeightTimes<20){
			setTimeout(function(){
				getdialogElHeight();
			},100)
		}else{
			t = scrollTop+ window.innerHeight / 2 - h / 2 - 10;
			if(t<=scrollTop){
				t=scrollTop;
			}

			dialogEl.style['top'] = t.toString() + 'px';
			coverEl.style['visibility'] = 'visible';
		}
	};

	getdialogElHeight();



	var setCoverHeightTimes=0;
	var setCoverHeight=function(){
		var tokenTop = tokenEl.offsetTop;
		var coverHeight = tokenTop>a?tokenTop:a;
		coverEl.style['height'] = coverHeight.toString() + 'px';

		setCoverHeightTimes++;

		if(tokenTop<a && setCoverHeightTimes<20){
			setTimeout(setCoverHeight,100);
		}else{
			$(tokenEl).remove();
		}
	};
	setCoverHeight();

	var dialogButtons = $(dialogEl).find('.dialogButton');

	if (funs && funs.length) {
		dialogButtons.each(function (k, v) {
			if (funs[k]) {
				$(this).click(function () {
					funs[k]();
				})
			}
		});
	}

	$(dialogEl).find('.J-dialogClose').click(function () {
		$(coverEl).remove();
		$(tokenEl).remove();
		if(config.closeBack){
			config.closeBack();
		}
		return false;
	});


	return coverEl;
}