function KiwiSlider(a,b){this.init.call(this,a,b)}KiwiSlider.prototype={init:function(){var a,b,c,d=this,e=this.options={fluid:!1,trigger:"click",direction:"H"},f=!!("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch);return f?void $("html").addClass("touch"):($.extend(e,arguments[1]),a=$("."+arguments[0]),b=a.find(".kiwi-control"),c=a.find(".kiwi-items"),this.index=0,this.old_index=0,this.static_width=724,this.static_height=170,this.click_twice=!1,this.bool_h="V"==this.options.direction,this.navcaret=b.find(".navcaret"),this.item=c.find(".kiwi-item"),this.item.each(function(a){this.itemindex=a}),b.find("a").each(function(a){this.tabindex=a}),c.css("V"==e.direction?{height:d.item.eq(0).height()*d.item.length}:{width:d.item.eq(0).width()*d.item.length}),this.bindMoveHandler(b),b.find("a:first").trigger(e.trigger),this.navcaret.addClass("is-ready"),void this.initItemTransform(this.item))},initItemTransform:function(a){var b=this;a.each(function(){0!==this.itemindex?b.doTranslate($(this),(1-this.itemindex)*(b.bool_h?b.static_height:b.static_width)):b.doTranslate($(this),0)})},doTranslate:function(a,b){a.css("V"==this.options.direction?{transform:"translateY("+b+"px)","-webkit-transform":"translateY("+b+"px)"}:{transform:"translateX("+b+"px)","-webkit-transform":"translateX("+b+"px)"})},caretMove:function(a,b){this.navcaret.css({transform:"translateX("+a+"px) scaleX("+b+")","-webkit-transform":"translateX("+a+"px) scaleX("+b+")"})},itemMove:function(a,b,c){var d=this;d.doTranslate(a,b*(d.bool_h?d.static_height:d.static_width)),c&&c()},bindMoveHandler:function(a){var b=this;a.on(b.options.trigger,"a",function(){var c=$(this).width(),d=$(this).offset(),e=a.offset(),f=d.left-e.left,g=c/100,h=0;if(b.old_index=b.index,b.index=this.tabindex,b.old_index>b.index?(b.click_twice=!1,h=1-b.old_index):b.old_index<b.index&&(b.click_twice=!1,h=-1-b.old_index),!b.click_twice){var i=b.item.eq(b.index),j=b.item.eq(b.old_index);b.itemMove(i,-b.index,function(){var a;a=b.old_index>b.index?b.bool_h?"is-before-v":"is-before":b.bool_h?"is-after-v":"is-after",b.li_status(i,a)}),b.itemMove(j,h),b.caretMove(f,g),$(this).addClass("active").siblings("a").removeClass("active"),b.click_twice=!0}})},li_status:function(a,b){var c=this,d=a.find("li");d.each(function(a){var e=$(this);if($(this).addClass("is-transition"),$(this).addClass(b),"is-after"==b)setTimeout(function(){e.removeClass(b)},60*a);else{var f=c.bool_h?c.range(0,d.length):c.range(0,d.length).reverse();setTimeout(function(){e.removeClass(b)},60*f[a])}})},range:function(a,b){for(var c=new Array,d=a;b>d;d++)c.push(d);return c}},new KiwiSlider("kiwi-slider",{direction:"H"});