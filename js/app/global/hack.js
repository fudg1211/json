/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-1-17
 * Time: 下午3:46
 * 通用函数.
 */
define(function () {
	var toString = {}.toString,
		UA = window.navigator.userAgent,
		href = window.location.href,
		$ = window.$,
		body = $('#body');

	//android 2.3 版本hack  在口袋2.9 和 3.0 客户端有问题
	if(/android\s*2\.3\.\d/i.test(UA)){
		if(!/android236/i.test(href)){
			href += '&android236';
			window.location.href=href;
		}
	}

	//ipad版本没有微信分享
	if(/ipad/i.test(UA)){
		$('.fenxiangPYQ').hide();
	}

});
