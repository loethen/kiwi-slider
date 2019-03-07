function KiwiSlider(classname,options){
	this.init.call(this,classname,options);
}

KiwiSlider.prototype = {
	init: function(){
		var _this = this;
		var kiwi,control,items;
		var options = this.options = {
			fluid: false,  //true or false 
			trigger: 'click', //click or mouseover
			direction: 'H'  //Horizontal or Vertical
		}

		var touch_support = !!(("ontouchstart" in window) || window.DocumentTouch && document instanceof window.DocumentTouch);

		$.extend(options,arguments[1]);

		kiwi = $('#'+arguments[0]);
		control = kiwi.find('.kiwi-control');
		items = kiwi.find('.kiwi-items');

		if(touch_support){
			$('html').addClass("touch");
			items.removeClass('hidden');
			return;
		}

		this.index = 0;
		this.old_index = 0;
		this.static_width = 724;
		this.static_height = 170;
		this.click_twice = false;
		this.bool_h = this.options.direction == "V";
		this.navcaret = control.find('.navcaret');
		this.item = items.find('.kiwi-item');
		//set items index and indicators index
		this.item.each(function(index){
			this.itemindex = index;
		})
		control.find('a').each(function(index){
			this.tabindex = index;
		})

		//initialize ul.kiwi-items width
		if(options.direction == 'V'){
			items.css({
				height: _this.item.eq(0).height()*_this.item.length
			})
		}else{
			items.css({
				width: _this.item.eq(0).width()*_this.item.length
			})
		}

		// bind control event
		this.bindMoveHandler(control);

		//actice first indicator
		control.find('a:first').trigger(options.trigger);

		//show items
		items.removeClass('hidden');
		
		//init navcatre
		this.navcaret.addClass("is-ready");

		// this.initItemTransform(this.item);
	},
	resetTransform: function(){
		var _this = this;
		var index = _this.index;

		_this.item.each(function(){
			if(this.itemindex < _this.index){
				_this.doTranslate($(this),(-1-this.itemindex) * (_this.bool_h ? _this.static_height : _this.static_width) );
			}

			if(this.itemindex > _this.index){
				_this.doTranslate($(this),(1-this.itemindex) * (_this.bool_h ? _this.static_height : _this.static_width) );
			}

		})
	},
	doTranslate:function(target,distance){
		if(this.options.direction == "V"){
			target.css({
				'transform':'translateY('+distance+'px)',
				'-webkit-transform':'translateY('+distance+'px)',
				'-moz-transform':'translateY('+distance+'px)',
			})
		}else{
			target.css({
				'transform':'translateX('+distance+'px)',
				'-webkit-transform':'translateX('+distance+'px)',
				'-moz-transform':'translateX('+distance+'px)',
			})
		}
	},
	caretMove: function(left,scale){
		this.navcaret.css({
			"transform": 'translateX('+left+'px) scaleX('+scale+')',
			"-webkit-transform": 'translateX('+left+'px) scaleX('+scale+')'
		})
	},
	itemMove:function(target,t,callback){
		var _this = this;

		_this.doTranslate(target, t * (_this.bool_h ? _this.static_height : _this.static_width));
		callback && callback();
	},
	bindMoveHandler:function(target){
		var _this = this;
		target.on(_this.options.trigger,'a',function(event){
			var w = $(this).width();
			var current_offset = $(this).offset();
			var control_offset = target.offset();
			var left = current_offset.left - control_offset.left;
			var scale = w/100;
			var d = 0; //index after move finished
			_this.old_index = _this.index;
			_this.index = this.tabindex;

			if(_this.old_index > _this.index){
				_this.click_twice = false;
				d = 1-_this.old_index;
			}else if(_this.old_index < _this.index){
				_this.click_twice = false;
				d = -1-_this.old_index;
			}

			if(!_this.click_twice){
				var currentitem = _this.item.eq(_this.index);
				var olditem = _this.item.eq(_this.old_index);

				_this.itemMove(currentitem,-_this.index,function(){
					var classname;

					if(_this.old_index > _this.index){
						classname = _this.bool_h ? 'is-before-v' : 'is-before';
					}else{
						classname = _this.bool_h ? 'is-after-v' : 'is-after';
					}
					_this.li_status(currentitem,classname);
					_this.resetTransform();

				});

				// _this.itemMove(olditem, d);

				_this.caretMove(left,scale);

				$(this).addClass("active")
					.siblings("a").removeClass("active");
					
				_this.click_twice = true;

			}

		})
	},
	li_status:function(target,value){
		var _this = this;
		var li = target.find('li');
		li.each(function(index){
			var that = $(this);
			$(this).addClass("is-transition");
			$(this).addClass(value);
			if(value == "is-after"){
				setTimeout(function(){
					that.removeClass(value)
				},index*60)
			}else{
				var array = _this.bool_h ? _this.range(0,li.length) : _this.range(0,li.length).reverse();
				setTimeout(function(){
					that.removeClass(value)
				},array[index]*60)
			}
		})
	},
	range:function(start, end){
	    var array = new Array();
	    for(var i = start; i < end; i++)
	    {
	        array.push(i);
		}
	    return array;
	}
}

