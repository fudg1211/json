/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-10-9
 * Time: AM10:48
 * To change this template use File | Settings | File Templates.
 */
define(['./global/common', './global/data'], function (com, data) {

	var IndexController = FishMvc.View.extend({
		init: function () {
			this.doStart();
//			$('body').append('<div class="showImg"> <img src="http://img2.geilicdn.com/taobao35020488581_0_0_400x400.jpg?tk=701610089"> </div>')
		},

		/**
		 * 元素预绑定
		 */
		elements: {
			'.collapser': 'collapser_rel',
			'.imgUrl': 'imgUrl_rel'
		},

		/**
		 * 事件订阅
		 */
		events: {
			'click collapser_rel': 'doCollapser',
			'hover imgUrl_rel': 'showImg'
		},

		doStart: function () {
			var self = this;
			chrome.runtime.onMessage.addListener(function () {
				var msg = arguments[0][0];
				var url = arguments[0][1];
				var response = arguments[2];

				self.doAjax = false;

				self.doStartCreate(msg, url, response);
			});
		},

		doStartCreate: function (msg, url, response) {
			var self = this;

			if (!msg) {
				return false;
			}

			if (!com.isString(msg)) {
				return false;
			}

			msg = msg.trim();

			var m = msg.match(/^([^\(]+\(){0,1}(.*?)(\)*;*)$/);


			if (!m || !m[2]) {
				return false;
			}


			if (m[1]) {
				m[1] = '<div>' + m[1] + '</div>';
			}

			self.startMsg = m[1] || '';
			self.endMsg = m[1] ? ')' : '';
			try {
				var newMsg = JSON.parse(m[2]);
				var html = self.forMart(newMsg);

				if (self.startMsg) {
					html = '<div>' + self.startMsg + html + self.endMsg + '</div>';
				} else {
					html = '<div class="distance">' + self.startMsg + html + self.endMsg + '</div>';
				}
				response([html]);
			} catch (e) {
				if (self.doAjax) {
					return false;
				}

				self.doAjax = true;

				com.ajax({
					url: url,
					hideLoading: true,
					dataType: 'text',
					async: false,
					success: function (result) {
						if (result && /\</i.test(result)) {
							self.doStartCreate(result, url, response);
						}
					}
				});

			}
		},

		/**
		 * 格式化数据
		 * @param msg
		 */
		forMart: function (msg) {
			var str = '';
			if (com.isBaseType(msg)) {
				str += this.getBaseTypeStr(msg);
			}

			if (com.isArray(msg)) {
				str += this.getArrayStr(msg);
			}

			if (com.isObject(msg)) {
				str += this.getObjectStr(msg);
			}

			return str;
		},

		/**
		 * 基础数据类型数据
		 */
		getBaseTypeStr: function (val) {
			var msg = '', type = com.getType(val);

			if (!com.isBaseType(val)) {
				return false;
			}

			if (com.isNull(val)) {
				msg = 'null';
			} else {
				msg = val.toString();
			}

			if (com.isUrl(val)) {
				var imgUrlClass = '';
				if (com.isgImgUrl(val)) {
					imgUrlClass = 'imgUrl';
				}

				msg = '"<a href="' + val + '" class="' + imgUrlClass + '">' + val + '</a>"';
			} else if (com.isString(val)) {
				msg = val.split("<").join("&lt;").split(">").join("&gt;");
				msg = '"' + msg + '"';
			}

			return ' <span class="F' + type + '">' + msg + '</span>';
		},

		/**
		 * 获取数值数据类型
		 * @param val
		 */
		getArrayStr: function (val) {
			if (!com.isArray(val)) {
				return false;
			}

			var i = 0, len = val.length, str = '', comma = ',';

			if (!len) {
				return '[]';
			}

			str += '<span class="collapser">-</span><span> [</span><div class="Farray">';

			for (; i < len; i++) {

				if (i === (len - 1)) {
					comma = '';
				}

				str += '<div class="distance J-hover">' + this.forMart(val[i]) + comma + '</div>';
			}

			str += '</div><span> ]</span>';

			return str;
		},


		/**
		 * 获取对象字符串
		 * @returns {boolean}
		 */
		getObjectStr: function (val) {
			if (!com.isObject(val)) {
				return false;
			}

			var i = 0, len = com.getObjectLength(val), str = '', comma = ',';

			if (!len) {
				return '{}';
			}


			str += '<span class="collapser"> -</span><span> {</span><div class="Fobject">';

			for (k in val) {
				i++;
				if (i === (len)) {
					comma = '';
				}
				str += '<div class="distance J-hover"> <span class="property">' + k + '</span>:' + this.forMart(val[k]) + comma + '</div>';
			}

			str += '</div><span> }</span>';


			return str;
		},

		doCollapser: function (obj) {
			obj = $(obj);
			var text = obj.text().trim(), textObj = obj.next().next();

			if (text === '-') {
				obj.text(' +');

				$('<span> ...</span>').insertAfter(textObj);
				textObj.hide();
			} else {
				obj.text(' -');
				textObj.next().remove();
				textObj.show();
			}
		},

		showImg: function (obj) {
			obj = $(obj);
			var src = obj.attr('src');
		}

	});


	var indexController = new IndexController({el: $('body')});
	com.gather['indexController'] = indexController;

	return indexController;
});
