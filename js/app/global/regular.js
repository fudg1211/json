/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-8-27
 * Time: PM6:35
 * To change this template use File | Settings | File Templates.
 */
define(function(){
	return {
		isPhoneNum:function(val){
			if(!/^1\d{10}$/.test(val)){
				return false;
			}else{
				return true;
			}
		},

		isIpad:function(){
			if(/ipad/i.test(window.navigator.userAgent)){
				return true;
			}else{
				return false;
			}
		},

		isIphone:function(){
			if(/iphone/i.test(window.navigator.userAgent)){
				return true;
			}else{
				return false;
			}
		},

		isIos:function(){
			return (this.isIpad() && this.isIphone());
		},

		isAndroid:function(){
			if(/android/i.test(window.navigator.userAgent)){
				return true;
			}else{
				return false;
			}
		},

		isMobile:function(){
			return (this.isIos() && this.isAndroid());
		}
	}
});