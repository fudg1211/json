/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-1-17
 * Time: 下午3:46
 * 通用函数.
 */
define(function () {
	var toString = {}.toString,
		$ = window.$;


	return {

		local: {
			set: function (k, v) {
				localStorage.setItem(k, v);
			},
			get: function (k) {
				return localStorage.getItem(k);
			},
			remove: function (k) {
				return localStorage.removeItem(k);
			},
			removeAll: function (k) {
				var s = localStorage;
				for (k in s) {
					this.remove(k);
				}
			}
		},

		session: {
			set: function (k, v) {
				sessionStorage.setItem(k, v);
			},
			get: function (k) {
				return sessionStorage.getItem(k);
			},
			remove: function (k) {
				sessionStorage.removeItem(k);
			},
			removeAll: function (k) {
				var s = sessionStorage;
				for (k in s) {
					this.remove(k);
				}
			}
		},

		cookie: {
			/**
			 * 会话存储 关闭浏览器立即失效
			 * @param name
			 * @param value
			 */
			setSession: function (name, value, path) {
				var str = this._getCookieValue(name, value, path);
				document.cookie = str;
			},

			/**
			 * 本地永久保存
			 * @param name
			 * @param value
			 * @param path
			 */
			setLocal: function (name, value, path) {
				var str = this._getCookieValue(name, value, path) + this._getExpires(1000);//不要动这 “1000”
				document.cookie = str;
			},

			/**
			 * 设置最大存储时间
			 * @param name
			 * @param value
			 * @param seconds 单位秒
			 * @param path
			 */
			setLocalMaxSeconds:function(name, value, seconds, path){
				var a = new Date().getTime()+seconds*1000;
				this.pointTime(name.trim(), value, a, path);
			},

			/**
			 * 指定时间过期
			 * @param name
			 * @param value
			 * @param formartTime 如‘2012-3-03 13:03:1’ 或者 时间戳 或者 '2012/12/1'
			 * @param path
			 */
			pointTime: function (name, value, formartTime, path) {
				var a = new Date(formartTime),str;
				str = this._getCookieValue(name, value, path) + ';expires=' + a.toGMTString() + this._getPath(path);
				document.cookie = str;
			},

			/**
			 * 指定凌晨过期 默认第二天
			 * @param name
			 * @param value
			 * @param days 多少天后过期
			 * @param path
			 */
			pointMidNight:function(name,value,days,path){
				var a = new Date();
				days = parseInt(days) || 1;
				var formartTime = a.getFullYear()+'-'+ a.getMonth()+'-' + (a.getDate()+days);
				this.pointTime(name,value,formartTime,path);
			},

			/**
			 * 获取cookie
			 * @param name
			 * @returns {null}
			 */
			get: function (name) {
				var cookieValue = null;
				var search = name + "=";
				if (document.cookie.length > 0) {
					offset = document.cookie.indexOf(search);
					if (offset != -1) {
						offset += search.length;
						end = document.cookie.indexOf(";", offset);
						if (end == -1) end = document.cookie.length;
						cookieValue = unescape(document.cookie.substring(offset, end))
					}
				}
				return cookieValue;
			},

			/**
			 * 删除指定cookie
			 * @param name
			 */
			remove: function (name) {
				this.setSession(name, '', -1);
			},

			/**
			 * 删除所有cookie
			 */
			removeAll: function () {
				var str = document.cookie;
				var array = str.split(';'),arr;

				for(var i=0;i<array.length;i++){

					if(array[i]){
						arr = array[i].split('=');
						if(arr[0]){
							this.remove(arr[0].trim());
						}
					}
				}
			},

			/**
			 * 获取格式化后过期时间
			 * @param days
			 * @returns {string}
			 * @private
			 */
			_getExpires: function (days) {
				if (days) {
					var date = new Date();
					date.setDate(date.getDate() + days);

					return ';expires=' + date.toGMTString();
				} else {
					return undefind;
				}
			},

			/**
			 * 获取格式化后过期值
			 * @param name
			 * @param value
			 * @param path
			 * @returns {string}
			 * @private
			 */
			_getCookieValue: function (name, value, path) {
				return name.trim() + '=' + encodeURIComponent(value)+ this._getPath(path);
			},

			/**
			 * 获取path
			 * @param path
			 * @returns {string}
			 * @private
			 */
			_getPath: function (path) {
				if (path) {
					return ';path=' + path;
				} else {
					return '';
				}
			}
		}

	}

});
