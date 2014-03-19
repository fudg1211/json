(function(){
	var doCollapser = function(obj){
		obj = $(obj);
		var text = obj.text().trim(),textObj = obj.next().next();

		if(text==='-'){
			obj.text(' +');

			$('<span>...</span>').insertAfter(textObj);
			textObj.hide();
		}else{
			obj.text(' -');
			textObj.next().remove();
			textObj.show();
		}
	};

	var hover = function(){

		var obj =$('.J-hover'),timeout,timeoutA,collapser = $('.collapser');


		obj.mouseover(function(){
			clearTimeout(timeout);
			var self = this;
			timeout = setTimeout(function(){
				$(self).addClass('hover');
			},1);

			return false;
		});

		obj.mouseout(function(){
			var self = this;
			timeoutA = setTimeout(function(){
				$(self).removeClass('hover');
			},1);
		});

	};

	setTimeout(function(){
		$('.collapser').click(function(){
			doCollapser(this);
		});

		hover();
	},100);





	function getScrollTop()
	{
		var scrollTop=0;
		if(document.documentElement&&document.documentElement.scrollTop)
		{
			scrollTop=document.documentElement.scrollTop;
		}
		else if(document.body)
		{
			scrollTop=document.body.scrollTop;
		}
		return scrollTop;
	}


//元素坐标操作
	function obj_x_y(){
		var obj;

		this.scroll_height=function(){
			var scroll_height=getScrollTop();
			return scroll_height;
		};

		this.new_obj=function(new_obj){
			obj=$(new_obj);
		};

		this.x=function(event){
			var left=event.clientX;
			return left;
		};
		this.y=function(event){
			var top=event.clientY;
			return top;
		};
		this.offsetHeight=function(){
			return parseInt(obj.offset().height);
		};
		this.offsetWidth=function(){
			return parseInt(obj.offset().width);
		};
		this.offsetLeft=function(){
			return parseInt(obj.offset().left);
		};
		this.offsetTop=function(){
			return parseInt(obj.offset().top);
		};
		this.follow_event=function(event){
			var event_y=this.y(event);
			var follow_x=this.x(event);
			var follow_y=event_y+this.scroll_height();
			var offsetHeight=this.offsetHeight();

			if(follow_y+offsetHeight>=document.documentElement.clientHeight){
				follow_y=event_y-offsetHeight;
			}

			obj.css("top",follow_y);
			obj.css("left",follow_x);
			return true;

		};
	}

	var xy=new obj_x_y();


	function item_info_obj(){

		var clientWidth=0;
		var clientHeight=0;
		var user_defined_x=15;
		var user_defined_y=15;
		var scroll_height=0;
		var offsetWidth=0;
		var offsetHeight=0;

		var move_obj=null;
		var check_block=false;
		var move_check=true;

		this.move_tips=true;

		this.ready=function(obj){

			if(!this.move_tips){return;}

			obj=$(obj);

			clientWidth=document.body.offsetWidth;

			clientHeight=$(window).height();
			scroll_height=xy.scroll_height();

			var  titletext=obj.attr('href'),href = titletext;
			if(!titletext){move_check=false;return;}else{titletext='<img src="'+titletext+'"/>'}


			var html='<div id="json_show_item" class="json_show_item" style="position: absolute;">'+titletext+'</div>';

			$("body").append(html);

			move_check=true;
			check_block=false;
			move_obj=$("#json_show_item");

			xy.new_obj(move_obj);

			var imgEl = document.createElement('img');
			imgEl.onload = function(){
				offsetHeight=xy.offsetHeight();
				offsetWidth=xy.offsetWidth();
				$(document).unbind().bind('mousemove',function(event){
					item_info.show(event);
				});
			};
			imgEl.src=href;
		};

		this.show=function(event){

			if(!this.move_tips){return;}

			if(move_check && move_obj){

				event=event || window.event;

				var event_x=xy.x(event);
				var event_y=xy.y(event);

				if((user_defined_y+offsetHeight)<=(clientHeight-event_y)){

					var follow_y=event_y+user_defined_y+scroll_height;

				}else if((user_defined_y+offsetHeight)>(clientHeight-event_y) && (user_defined_y+offsetHeight)<=event_y){

					var follow_y=event_y-user_defined_y-offsetHeight+scroll_height;

				}else{

					var follow_y=clientHeight-offsetHeight+scroll_height;

				}

				if(offsetHeight>clientHeight){follow_y=0+scroll_height;}

				var follow_x=event_x+user_defined_x;

				if((event_x+user_defined_x+offsetWidth)>clientWidth){

					follow_x=event_x-user_defined_x-offsetWidth;
				}

				move_obj.css({top:follow_y,left:follow_x,display:'block'});
			}

		};

		this.hide=function(){

			if(!this.move_tips){return;}
			$(".json_show_item").remove();
		}

	}

	var item_info=new item_info_obj();

	setTimeout(function(){
		var imgUrlObj = $('.imgUrl');
		imgUrlObj.bind('mouseover',function(){
			item_info.ready(this);
		});

		imgUrlObj.bind('mouseout',function(){
			item_info.hide();
		});
	},200);

}());



