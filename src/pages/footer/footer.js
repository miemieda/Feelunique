require(["../../static/conf/config.js"], function() {
	require(["jquery", "sw", "jquery.ui", "myTemplate"], function($, Swiper) {
		$(".weixin a").mouseover(function() {
			$(".img_code").css({
				display: "block"
			})
		})
		$(".weixin a").mouseout(function() {
			$(".img_code").css({
				display: "none"
				
			})
		})
	})
})