function Slider(classname){
	this.init(classname);
}

Slider.prototype = {
	init: function(classname){
		var _this = this;
		_this.wrap = $('.'+classname);
		_this.tab = _this.wrap.find('.loe-tab');
		_this.navcaret = _this.tab.find('.navcaret');
		_this.list = _this.wrap.find('.content-list');
		_this.item = _this.list.find('.loe-moveitem');
		_this.index = 0;
		_this.old_index = 0;
		_this.static_width = 724;
		_this.click_twice = false;

		//set index
		_this.item.each(function(index){
			this.itemindex = index;
		})
		_this.tab.find('a').each(function(index){
			this.tabindex = index;
		})


		_this.list.css({
			width: _this.item.eq(0).width()*_this.item.length
		})
		_this.tabchange(_this.tab);
		_this.tab.find('a:first').trigger("click");
		_this.navcaret.addClass("is-ready");

		_this.transform(_this.item);
	},
	transform: function(target){
		var _this = this;
		target.each(function(){
			if(this.itemindex !== 0){
				_this.translate($(this),(1-this.itemindex)*_this.static_width);
			}else{
				_this.translate($(this),0);
			}
		})
	},
	translate:function(target,distance){
		target.css({
			'transform':'translateX('+distance+'px)',
			'-webkit-transform':'translateX('+distance+'px)'
		})
	},
	caretchange: function(left,scale){
		this.navcaret.css({
			"transform": 'translateX('+left+'px) scaleX('+scale+')',
			"-webkit-transform": 'translateX('+left+'px) scaleX('+scale+')'
		})
	},
	itemchange:function(target,t,callback){
		var _this = this;

		_this.translate(target, t * _this.static_width);
		callback && callback();
	},
	tabchange:function(target){
		var _this = this;
		target.on('click','a',function(event){
			event.stopPropagation();

			var w = $(this).width();
			var currentoffset = $(this).offset();
			var targetoffset = target.offset();
			var left = currentoffset.left - targetoffset.left;
			var scale = w/100;
			var t = 0;

			_this.old_index = _this.index;
			_this.index = this.tabindex;

			if(_this.old_index > _this.index){
				_this.click_twice = false;
				t = 1-_this.old_index;
			}else if(_this.old_index < _this.index){
				_this.click_twice = false;
				t = -1-_this.old_index;
			}

			if(!_this.click_twice){
				var currentitem = _this.item.eq(_this.index);
				var olditem = _this.item.eq(_this.old_index);

				
				_this.itemchange(currentitem,-_this.index,function(){
					var classname;
					if(_this.old_index > _this.index){
						classname = 'is-before';
					}else{
						classname = 'is-after';
					}
					_this.li_status(currentitem,classname);
				});

				_this.itemchange(olditem, t);

				_this.caretchange(left,scale);

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
				var array = _this.range(0,li.length).reverse();
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

new Slider('loe-move')