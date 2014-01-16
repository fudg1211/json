define(['../app/global/common', '../app/global/data', '../app/index', '../app/qiandao', '../app/xunbao'], function (com, data, index, Qiandao, Xunbao) {

	window.qunitStartA = function () {
		var lvLogo = com.gather['indexController']['lvLogo'];

		asyncTest('测试账号签到5天', function () {
			expect(1);
			com.gather['module'].set('continuousSign', 5);
			setTimeout(function () {
				var result = com.gather['indexController']['daySelceted_rel']().text();
				result = result.trim();
				result = result.slice(0, 1);
				equal(5, result);
				start();
			}, 1000)
		});

		asyncTest('测试账号签到一周', function () {
			expect(1);
			com.gather['module'].set('continuousSign', 7);
			setTimeout(function () {
				var result = com.gather['indexController']['daySelceted_rel']().text();
				equal(7, 7);
				start();
			}, 2000)
		});
	};

	window.qunitStartB = function (day) {
		day = day || 5;

		asyncTest('测试连续签到' + day + '天', function () {
			expect(1);
			com.gather['module'].set('continuousSign', day);
			setTimeout(function () {
				var result = com.gather['indexController']['daySelceted_rel']().text();

				if (day % 7) {
					equal(day, result);
				} else {
					equal(null, result);
				}

				start();
			}, 2000)
		});
	};

	window.qunitStartC = function (day) {
		day = day || 5;
		asyncTest('测试下一次激励是第' + day + '天', function () {
			expect(1);
			com.gather['module'].set('signContinuumRemind', {days: day, placard: '再联系签到<span class="orange">2</span>天，<br/>可额外获得<span class="orange">20</span>个积分'});
			setTimeout(function () {
				equal(1, 1);
				start();
			}, 1000)
		});
	};


	window.qiandao = {

		setModule: function () {
			var result = {"result": [
				{"imgUrl": "http://10.1.15.123:9008/lss/sign/120602_20131206_102257_2257.png", "score": 30, "jftype": true, "xl": false, "name": "30个积分", "location": 0, "id": 4, "type": 1, "total": 9276, "link": ""},
				{"imgUrl": "http://10.1.15.123:9008/lss/sign/120603_20131206_102414_2414.png", "score": 1, "jftype": false, "xl": true, "name": "美白补水面膜", "location": 1, "id": 6, "type": 2, "total": 9268, "link": ""},
				{"imgUrl": "http://10.1.15.123:9008/lss/sign/120605_20131206_102658_2658.png", "score": 5, "jftype": true, "xl": true, "name": "5个积分", "location": 2, "id": 10, "type": 1, "total": 6325, "link": ""},
				{"imgUrl": "http://10.1.15.123:9008/lss/sign/120604_20131206_103452_3452.png", "score": 10, "jftype": true, "xl": true, "name": "10个积分", "location": 3, "id": 9, "type": 1, "total": 6291, "link": ""},
				{"imgUrl": "http://10.1.15.123:9008/lss/sign/120601_20131206_103154_3154.png", "score": 1, "jftype": false, "xl": true, "name": "卡通零钱包", "location": 4, "id": 2, "type": 2, "total": 6318, "link": ""},
				{"imgUrl": "http://10.1.15.123:9008/lss/sign/QQ20131203180950_20131203_181008_108.jpg", "score": 10, "jftype": false, "xl": true, "name": "谢谢参与", "location": 5, "id": 14, "type": 0, "total": 6278, "link": ""},
				{"imgUrl": "http://10.1.15.123:9008/lss/sign/120602_20131206_102257_2257.png", "score": 30, "jftype": true, "xl": true, "name": "30个积分", "location": 6, "id": 13, "type": 1, "total": 6273, "link": ""},
				{"imgUrl": "http://10.1.15.123:9008/lss/sign/120607_20131206_102819_2819.png", "score": 1, "jftype": false, "xl": true, "name": "iPhone 5S", "location": 7, "id": 12, "type": 2, "total": 0, "link": ""},
				{"imgUrl": "http://10.1.15.123:9008/lss/sign/120607_20131206_102819_2819.png", "score": 1, "jftype": false, "xl": true, "name": "iPhone 5S", "location": 8, "id": 11, "type": 2, "total": 0, "link": ""},
				{"imgUrl": "http://10.1.15.123:9008/lss/sign/120604_20131206_103452_3452.png", "score": 10, "jftype": true, "xl": true, "name": "10个积分", "location": 9, "id": 8, "type": 1, "total": 9975, "link": ""},
				{"imgUrl": "http://10.1.15.123:9008/lss/sign/120602_20131206_102257_2257.png", "score": 30, "jftype": true, "xl": true, "name": "30个积分", "location": 10, "id": 1, "type": 1, "total": 9260, "link": ""}
			], "status": {"description": "", "code": 0}, "token": null};

			com.gather['xunBaoModule'].set('jiangpin', result.result);
		},

		test1: function () {
			console.log('测试奖盘没有谢谢参与数据');
			var result = {"result": [
				{"name": "ipad mini", "location": 0, "id": 4, "type": 4, "total": 10, "imgUrl": "http://koudai.com/brand/images/home_head_icons.png", "score": 10000, "xl": true, "jftype": false, "link": "http://ww"},
				{"name": "谢谢参与s", "location": 1, "id": 6, "type": 0, "total": 447, "imgUrl": "http://www.jb51.net/images/logo.gif", "score": 15, "xl": true, "jftype": false, "link": ""},
				{"name": "3个积分", "location": 2, "id": 10, "type": 1, "total": 1, "imgUrl": "http://ww", "score": 3, "xl": false, "jftype": true, "link": ""},
				{"name": "健身卡", "location": 3, "id": 9, "type": 3, "total": 1, "imgUrl": "http://ww", "score": 4, "xl": false, "jftype": true, "link": ""},
				{"name": "5个积分", "location": 4, "id": 2, "type": 1, "total": 535, "imgUrl": "http://ww", "score": 5, "xl": false, "jftype": true, "link": ""},
				{"name": "6个积分", "location": 5, "id": 14, "type": 1, "total": 1, "imgUrl": "http://ww", "score": 6, "xl": false, "jftype": true, "link": ""},
				{"name": "7个积分", "location": 6, "id": 13, "type": 1, "total": 1, "imgUrl": "http://ww", "score": 7, "xl": false, "jftype": true, "link": ""},
				{"name": "u盘", "location": 7, "id": 12, "type": 2, "total": 50, "imgUrl": "http://ww", "score": 5000, "xl": true, "jftype": false, "link": ""},
				{"name": "9个积分", "location": 8, "id": 11, "type": 1, "total": 1, "imgUrl": "http://ww", "score": 9, "xl": true, "jftype": true, "link": ""},
				{"name": "路由器", "location": 9, "id": 8, "type": 2, "total": 30, "imgUrl": "http://ww", "score": 7000, "xl": true, "jftype": false, "link": ""},
				{"name": "谢谢参与s", "location": 10, "id": 1, "type": 0, "total": 443, "imgUrl": "http://www.jb51.net/images/logo.gif", "score": 15, "xl": true, "jftype": false, "link": ""}
			], "status": {"description": "", "code": 0}, "token": null};

			com.gather['xunBaoModule'].set('jiangpin', result.result);
		},

		test3: function () {
			console.log('测试奖盘数据长度不为11');
			var result = {"result": [
				{"name": "ipad mini", "location": 0, "id": 4, "type": 4, "total": 10, "imgUrl": "http://koudai.com/brand/images/home_head_icons.png", "score": 10000, "xl": true, "jftype": false, "link": "http://ww"},
				{"name": "谢谢参与s", "location": 1, "id": 6, "type": 0, "total": 447, "imgUrl": "http://www.jb51.net/images/logo.gif", "score": 15, "xl": true, "jftype": false, "link": ""},
				{"name": "3个积分", "location": 2, "id": 10, "type": 1, "total": 1, "imgUrl": "http://ww", "score": 3, "xl": false, "jftype": true, "link": ""},
				{"name": "4个积分", "location": 3, "id": 9, "type": 1, "total": 1, "imgUrl": "http://ww", "score": 4, "xl": false, "jftype": true, "link": ""},
				{"name": "谢谢参与s", "location": 10, "id": 1, "type": 0, "total": 443, "imgUrl": "http://www.jb51.net/images/logo.gif", "score": 15, "xl": true, "jftype": false, "link": ""}
			], "status": {"description": "", "code": 0}, "token": null};

			com.gather['xunBaoModule'].set('jiangpin', result.result);
		},

		/**
		 * 测试中奖id中没有数据
		 */
		test5: function () {
			console.log('测试中奖id奖盘没有对应数据')
			var result = {"result": {"address": "", "id": 30406, "userName": "", "award": {"name": "6个积分", "location": 5, "id": 14, "type": 1, "total": 1000, "imgUrl": "http://ww", "score": 6, "xl": false, "jftype": true, "link": ""}, "activityId": 0, "createTime": 1385629392767, "awardName": "6个积分", "phone": 18659245300, "jfbTotal": 6161, "num": 1, "alipayId": "", "sid": 681, "isCanGetAward": true, "isCanChangedJFB": null, "isEmptyAward": null, "productDetailsURL": "iShopping2://?type=0&id=null", "getAwardUid": 30406}, "status": {"description": "", "code": 0}, "token": null};
			result.result.award.id = 12232234234;
			com.gather['xunbao'].roundStepNum();
			com.gather['xunbao'].doXunbaoBack(result.result);
		},

		test7: function () {
			console.log('测试中奖数据格式错误');
			var result = {result: {}};
			com.gather['xunbao'].roundStepNum();
			com.gather['xunbao'].doXunbaoBack(result.result);
		},

		test9: function () {
			console.log('测试中奖数据type位0但名称不是谢谢参与');
			var result = {"result": {"address": "", "id": 30406, "userName": "", "award": {"name": "6个积分", "location": 5, "id": 14, "type": 0, "total": 1000, "imgUrl": "http://ww", "score": 6, "xl": false, "jftype": true, "link": ""}, "activityId": 0, "createTime": 1385629392767, "awardName": "6个积分", "phone": 18659245300, "jfbTotal": 6161, "num": 1, "alipayId": "", "sid": 681, "isCanGetAward": true, "isCanChangedJFB": null, "isEmptyAward": null, "productDetailsURL": "iShopping2://?type=0&id=null", "getAwardUid": 30406}, "status": {"description": "", "code": 0}, "token": null};
			com.gather['xunbao'].roundStepNum();
			com.gather['xunbao'].doXunbaoBack(result.result);
		},

		test11: function (type) {
			var typeName, id, name;
			if (type === 0) {
				typeName = '谢谢参与';
				id = 14;
				name = '谢谢参与';
			} else if (type === 1) {
				typeName = '积分';
				id = 4;
				name = '30个积分';
			} else if (type === 2) {
				typeName = '实物';
				name = '面膜';
				id = 6;
			} else if (type === 3) {
				typeName = '虚拟';
				name = '健身卡';
				id = 8;
			} else if (type === 4) {
				typeName = '神秘惊喜';
				id = 8;
				name = "神秘惊喜";
			}

			console.log('测试各种类型跳转：' + typeName);
			this.setModule();

			com.gather['xunbao'].roundStepNum();
			var result = {"result": {"address": "", "id": 30406, "userName": "", "award": {"name": name, "location": 5, "id": id, "type": type, "total": 1000, "imgUrl": "http://ww", "score": 6, "xl": false, "jftype": true, "link": ""}, "activityId": 0, "createTime": 1385629392767, "awardName": "6个积分", "phone": 18659245300, "jfbTotal": 6161, "num": 1, "alipayId": "", "sid": 681, "isCanGetAward": true, "isCanChangedJFB": null, "isEmptyAward": null, "productDetailsURL": "iShopping2://?type=0&id=null", "getAwardUid": 30406}, "status": {"description": "", "code": 0}, "token": null};
			com.gather['xunbao'].doXunbaoBack(result.result);

		},

		test12: function () {

			test("showDayTip", function () {
				var i = 0;
				for (; i <= 80; i++) {
					initData.continuousSign = i;
					com.gather['indexController'].setPersonLv(initData.continuousSign);
					var result = com.gather['indexController'].showGrowUpLvTip();

					if (i === 0) {
						equal(false, result);
					}

					if (i === 7) {
						equal(false,result);
					}
					if (i === 14) {
						equal(false, result);
					}
					if (i === 21) {
						equal(false, result);
					}
					if (i === 28) {
						equal(false, result);
					}

					if (i === 35) {
						equal(false, result);
					}

					if (i === 42) {
						equal(false, result);
					}

					if (i === 49) {
						equal(false, result);
					}


					if (i === 2) {
						equal(true, result);
					}

					if (i === 6) {
						equal(true, result);
					}


					if (i === 13) {
						equal(true, result);
					}

					if (i === 15) {
						equal(false, result);
					}

					if (i === 20) {
						equal(false, result);
					}

					if (i === 25) {
						equal(true, result);
					}

					if (i === 27) {
						equal(true, result);
					}

					if (i === 29) {
						equal(false, result);
					}

					if (i === 35) {
						equal(false, result);
					}

					if (i === 41) {
						equal(true, result);
					}

					if (i === 43) {
						equal(false, result);
					}

					if (i === 50) {
						equal(false, result);
					}

					if (i === 60) {
						equal(false, result);
					}

					if (i === 80) {
						equal(false, result);
					}

				}
			})
		}
	};


	window.testCom = {

		testSession: function () {
			test("cookieSession", function () {
				com.storage.cookie.setSession('test', 111);
				equal(111, com.storage.cookie.get('test'));
			});
		},

		testLocal: function () {
			asyncTest("cookieLocal", function () {
				com.storage.cookie.removeAll();
				expect(1)
				com.storage.cookie.setLocal('test', 111);
				setTimeout(function () {
					equal(111, com.storage.cookie.get('test'));
					start();
				}, 12 * 1000)
			});

		},

		testOther: function () {
			asyncTest("setLocalMaxSeconds && appointTime && remove", function () {
				expect(5);
				com.storage.cookie.setLocalMaxSeconds('testa', 111, 3);

				setTimeout(function () {
					equal(111, com.storage.cookie.get('testa'));
				}, 1000);

				setTimeout(function () {
					notEqual(111, com.storage.cookie.get('testa'));

				}, 5000);
				setTimeout(function () {
					com.storage.cookie.setSession('test', 111);
					com.storage.cookie.remove('test');
					ok(true, com.storage.cookie.get('test'));

				}, 6000)


				setTimeout(function () {
					com.storage.cookie.setSession('test', 111);
					com.storage.cookie.setLocal('test2', 1112);
					com.storage.cookie.removeAll();
					equal('', com.storage.cookie.get('test'));
					equal('', com.storage.cookie.get('test2'));
					start();
				}, 7000)

			});
		}
	};

	(function(){

		var a = [
			{a: 'a', b: ['a', 'b']},
			{b: 'b'},
			[
				{a: 'sdf'},
				['b', 'c',{a:'aa'}]
			]
		];
		var b = com.clon(a);

		test("com.clon", function () {
			equal(true, com.isArray(b));
			equal(true, com.isObject(b[0]));
			equal('a', b[0]['a']);
			equal(true, com.isArray(b[0]['b']));
			equal('a', b[0]['b'][0]);
			equal('b', b[0]['b'][1]);

			equal(true, com.isObject(b[1]));
			equal('b', b[1]['b']);

			equal(true, com.isArray(b[2]));
			equal(true, com.isObject(b[2][0]));
			equal('sdf', b[2][0]['a']);
			equal(true, com.isArray(b[2][1]));
			equal('b', b[2][1][0]);
			equal('c', b[2][1][1]);
			equal(true, com.isObject(b[2][1][2]));
			equal('aa', b[2][1][2]['a']);
		});

		var c = {a:'sdf'};
		var d = com.clon(c);
		test("com.clon", function () {
			equal(true, com.isObject(d));
			equal('sdf', d['a']);
			equal(false, c==d);
		});


	}());


});

