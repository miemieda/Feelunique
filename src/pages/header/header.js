require(["../../static/conf/config.js"], function() {
	require(["jquery", "sw", "jquery.ui", "myTemplate"], function($, Swiper) {
		//包税通知百叶窗
		$(".down").click(function() {
			$(".terms-and-conditions").toggle("blind");
		});

		//GBP滑入
		$(".exchange").mouseover(function() {
			$(".erl_la_down_menu").css({
				display: "block"
			});
		});

		$(".exchange").mouseout(function() {
			$(".erl_la_down_menu").css({
				display: "none"
			});
		});

		//登录滑入
		$(".user").mouseover(function() {
			$(".login-menu").css({
				display: "block"
			});
		});
		$(".user").mouseout(function() {
			$(".login-menu").css({
				display: "none"
			});
		});

		//GBP警告滑入
		$(".notic_down_solid").mouseover(function() {
			$(".tb_parities span").css({
				display: "block"
			});
		});
		$(".notic_down_solid").mouseout(function() {
			$(".tb_parities span").css({
				display: "none"
			});
		});

		//搜索--鼠标聚焦
		$(".search_input").focus(function() {
			$(".search-wrap").addClass("search-focus");
		});
		//搜索--鼠标失焦
		$(".search_input").blur(function() {
			$(".search-wrap").removeClass("search-focus");
		})

		//品牌点击滑动
		$(".left_arrows").click(function() {
			$(".brand_animate").animate({
				left: "0px"
			})
		})

		$(".right_arrows").click(function() {
			$(".brand_animate").animate({
				left: "-1127px"
			})
		})

		//导航
		$("#nav_show li").mouseover(function(e) {
			$("#nav_show_detail ul").css({
				display: "none"
			})
			let _index = $(this).index() + 1;
			$("#p" + _index + "_show").css({
				display: "block"
			})
			$("#nav_show li:not(:first)").css({
				backgroundColor: "#fff"
			})

			if(_index == 3 || _index == 4 || _index == 5 || _index == 6) {
				$("#p" + _index).css({
					backgroundColor: "rgb(215, 34, 69)"
				})
				$(".nav-row2").css({
					backgroundColor: "rgb(215, 34, 69)"
				})
				$("#p" + _index + " a").css({
					color: "#fff"
				}).parent().siblings().children().css({
					color: "red"
				})
				$("#p1 a").css({
					color: "#000"
				})
				$("#p2 a").css({
					color: "#000"
				})
			}

			if(_index == 2 || _index == 1) {
				$("#p2").css({
					backgroundColor: "rgb(242, 242, 242)"
				})
				$(".nav-row2").css({
					backgroundColor: "rgb(242, 242, 242)"
				})
				$("#p3").css({
					color: "red"
				})
			}

		})
		
		$("#p1_show li").mouseover(function(){
			$(this).children(".mega-menu").show();
		})
		$("#p1_show li").mouseout(function(){
			$(this).children(".mega-menu").hide();
		})
		
		$("#p2_show li").mouseover(function(){
			$(this).children(".mega-menu").show();
		})
		$("#p2_show li").mouseout(function(){
			$(this).children(".mega-menu").hide();
		})
		
		
		
		
		
		
		
		
		
		
		
		
		
		

	})
})