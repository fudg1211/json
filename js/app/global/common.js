/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-1-17
 * Time: 下午3:46
 * 通用函数.
 */
define(['./configs', './storage',  './hack', './regular'], function (configs, storage, hack,regular) {
	var toString = {}.toString,
		$ = window.$,
		UA = window.navigator.userAgent;


	window.com = common = {

		isFunction: function (it) {
			return toString.call(it) === "[object Function]";
		},

		isString: function (it) {
			return toString.call(it) === "[object String]";
		},

		isNumber:function(it){
			return toString.call(it) === "[object Number]";
		},

		isBoolean:function(it){
			return toString.call(it) === "[object Boolean]";
		},

		isNull:function(it){
			return (it === null);
		},

		isArray: function (it) {
			return toString.call(it) === "[object Array]";
		},

		isObject: function (it) {
			return toString.call(it) === "[object Object]";
		},

		isBaseType:function(it){
			return (!this.isArray(it) && !this.isObject(it));
		},

		isUrl:function(it){
			return (/^http:\/\//i.test(it));
		},

		isgImgUrl:function(it){
			it = it.trim();
			return /\.(jpeg|jpg|gif|png|bmp)(\?.*)*$/i.test(it);
		},

		/**
		 * 获取数据类型 小写
		 * @param it
		 * @returns {*}
		 */
		getType:function(it){
			var type = toString.call(it);
			var m = type.match(/\s(\w+)\]$/i);
			type = m[1].toLowerCase().trim();

			return type;
		},

		/**
		 * 获取对象长度
		 */
		getObjectLength:function(obj){
			var i=0;
			for(k in obj){
				i++;
			}

			return i;
		},

		storage: storage,
		configs: configs,
		regular: regular,


		render: function (source, data, dest) {
			dest = dest ? dest : source + "Dest";
			new EJS({element: source}).update(dest, {md: data});
		},

		getRender: function (source, data) {
			return new EJS({element: source}).render({md: data});
		},

		renderByUrl:function(url,data,dest){
			url = initData.resourcesDir+'/tpl/'+url+'.ejs?v=123';
			var html = new EJS({url: url}).render({md: data});

			dest ='#'+dest+'Dest';
			$(dest).html(html);
		},

		showLoading: function () {
			var config = {
				url: 'loading',
				className: 'loadingDialog'
			};

			dialog(config);
		},

		removeLoading: function () {
			$('.loadingDialog').remove();
		},

		ajax: function (configs) {
			var self = this;

			if (!configs.hideLoading) {
				this.showLoading();
			}

			var checkStatus = function (result) {
				if(configs.checkStatus){
					return true;
				}

				var status_code = 0 , status_desc;
				if (result.status && result.status.code) {
					status_code = result.status.code;
					status_desc = result.status.description;
				}

				if (status_code) {
					if (status_desc) {
						alert('网络超时');
						initData.onDataError = true;
					}
					return false;
				} else {
					initData.onDataError = false;
					return true;
				}
			};

			var a = {
				type: 'POST',
				dataType: 'json',
				url: self.configs.host,
				async:false,
				data: '',
				success: function (result) {
				},
				error: function () {
					self.alert('网络异常');
					initData.onDataError=true;
				},
				complete: function (result) {
					self.removeLoading();
				}
			};


			this.mix(a, configs);
			a.success = function (result) {
				if (checkStatus(result)) {
					configs.success(result);
				}
			};

			$.ajax(a);
		},


		/**
		 * 合并对象
		 * @param target
		 * @param source
		 */

		mix: function (target, source) {
			var k;
			for (k in target) {
				if (target.hasOwnProperty(k) && source.hasOwnProperty(k) && source[k]) {
					target[k] = source[k];
				}
			}
		},

		/**
		 * 克隆对象和数组
		 * @param obj
		 * @returns {{}}
		 */
		clon: function (obj) {
			var newObj = {}, self = this;

			if(self.isArray(obj)){
				newObj = [];
			}

			var cloneObject = (function (a, b) {
				if (self.isObject(a)) {
					for (k in a) {
						if (a.hasOwnProperty(k)) {
							if (self.isObject(a[k])) {
								b[k] = {};
								arguments.callee(a[k], b[k]);
							} else if (self.isArray(a[k])) {
								b[k] = [];
								arguments.callee(a[k], b[k]);
							} else {
								b[k] = a[k];
							}
						}
					}
				} else if (self.isArray(a)) {
					for (k in a) {
						if (self.isObject(a[k])) {
							b[k] = {};
							arguments.callee(a[k], b[k]);
						} else if (self.isArray(a[k])) {
							b[k] = [];
							arguments.callee(a[k], b[k]);
						} else {
							b[k] = a[k];
						}
					}
				}
			}(obj, newObj));

			return newObj;
		},


		/**
		 * 弹出警告
		 * @param config
		 */
		alert: function (text,config) {
			config = config || {};

				if (config.className) {
					config.className += ' alert'
				} else {
					config.className = 'alert';
				}

				if(!config.tpl){
					config.url='alert';
				}

			config.content=text;


			dialog(config);
		},

		gather: {},

		queryArray: [],
		query: function (name) {
			if (!name) {
				return false;
			}

			if (this.queryArray.length) {
				return this.queryArray[name];
			} else {
				var href = window.location.href;
				href = href.replace(/#[^&]*$/, '');//去除锚点

				var reg = /\?(.+)/,
					m = href.match(reg);

				if (m && m[1]) {
					var s = m[1].split('&');
					for (a in s) {
						var b = s[a].split('='),
							k = b[0],
							v = b[1];

						this.queryArray[k] = v;
					}

					return this.queryArray[name];

				} else {
					return '';
				}
			}
		}

	};

	init(common);

	return common;
});

function init(com) {
}



