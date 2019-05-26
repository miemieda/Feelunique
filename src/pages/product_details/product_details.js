require(["../../static/conf/config.js"], function() {
	require(["jquery", "sw", "jquery.ui", "myTemplate", "footer"], function($, Swiper) {
		//				//放大镜
		let $smallImg = $("#smallImg");
		let $smallGlass = $("#smallCursor");
		let $bigImg = $("#bigImg");
		let $bigGlass = $("#bigCursor");

		//已知大图片、小图片和大放大镜的宽、高，求小放大镜的宽、高
		//smallImg.width()/smallGlass.width()==bigImg.width()/bigGlass.width()
		$smallGlass.width($smallImg.width() * $bigGlass.width() / $bigImg.width());
		$smallGlass.height($smallImg.height() * $bigGlass.height() / $bigImg.height());

		$smallImg.hover(function() {
				$smallGlass.show();
				$bigGlass.show();
				$bigImg.show();
			},
			function() {
				$smallGlass.hide();
				$bigGlass.hide();
				$bigImg.hide();
			})

		$smallImg.mousemove(function(e) {
			e = e || event;
			//小放大镜随着鼠标移动
			//位置：左：鼠标相对可视区域位置-小图片的位置-小图片宽的一半
			let _left = e.clientX - $smallImg.offset().left - $smallGlass.width() / 2;
			let _top = e.clientY - $smallImg.offset().top + $smallGlass.height() / 2;

			//给小放大镜设置移动范围，只能在小图片中移动
			_left = Math.min(Math.max(_left, 0), $smallImg.width() - $smallGlass.width());
			_top = Math.min(Math.max(_top, 0), $smallImg.width() - $smallGlass.width());

			//设置小放大镜的位置，随着鼠标移动
			$smallGlass.css({
				left: _left,
				top: _top
			});

			//大图片是小图片的sc倍
			let sc = $bigImg.width() / $smallImg.width();

			//大放大镜不动，移动的是大图片，小放大镜移动方向与大图片移动方向相反，设置大图片的位置
			$bigImg.css({
				left: -sc * _left,
				top: -sc * _top
			})
		})
		//
		//商品推荐
		$.ajax({
			type: "get",
			url: "https://cn.feelunique.com/queryapi/fetch?sku=90781-44335,91466-44535,93897-45612,95883-46840,96474-47129,98847-48109,98552-0,101221-49684,101751-50133,101752-50152,63670-0,102206-0,102815-50748,103138-50859,50219-18729,90641-0,93887-0,20889-0,48394-0,56946-0&appID=12&stock=1&callback=products",
			async: true,
			dataType: "jsonp",
			jsonpCallback: "products",
			success: function(data) {
				let htmlstr = template("recommend_1", data);
				$("#recommend_list").html(htmlstr);
			}
		});
		//
		//				//滑动
						let currentIndex = 1;
						$(".recommend_show .rightBtn").click(function() {
								currentIndex = currentIndex === 4 ? 1 : ++currentIndex;
								$("#recommend_list").animate({
										left: -1190 * currentIndex + "px"
									});
						})

							$(".recommend_show .leftBtn").click(function() {
								currentIndex = currentIndex === 1 ? 4 : --currentIndex;
								$("#recommend_list").animate({
									left: -1190 * currentIndex + "px"
								});
							})
		//
		//热销排行榜
		$.ajax({
			type: "get",
			url: "https://cn.feelunique.com/queryapi/fetch?sku=101223-0,86789-0,53479-21720,79987-37050,55877-26047,96495-47230&appID=12&stock=1&callback=products2",
			async: true,
			dataType: "jsonp",
			jsonpCallback: "products2",
			success: function(data) {
				let htmlstr = template("hot_1", data);
				$("#hot_list").html(htmlstr);
			}
		});
		//商品详情选项页切换
		$(function() {
			$(".three_title li").click(function(e) {
				e.preventDefault();
				$(this).addClass("active").siblings().removeClass("active");
				$(".box:eq(" + $(this).index() + ")").show().siblings().hide();
				console.log($(".box:eq(" + $(this).index() + ")"));
				$(".three_title").show();

			})
		})
		//
		//评论
		$.ajax({
			type: "get",
			url: "http://localhost:8989/comment",
			async: true,
			dataType: "json",
			success: function(data) {
				let htmlstr = template("comment_1", data);
				$(".comment_all").html(htmlstr);
			}
		});
		//
		//看了又看
		$.ajax({
			type: "get",
			url: "https://cn.feelunique.com/queryapi/fetch?sku=67221-29858,97851-0,94151-45712,61176-0,25022-0,66334-29370,57255-0,59798-24268,2445-41,20873-6082,37187-13456,61145-25297,63604-27541,65181-0,61659-26017,75357-34518,78156-0,81282-0,82532-38443,85062-39851&appID=12&stock=1&callback=product3",
			async: true,
			dataType: "jsonp",
			jsonpCallback: "product3",
			success: function(data) {
				let htmlstr = template("watch_1", data);
				$("#watch_list").html(htmlstr);
			}
		});
		//
		//猜你喜欢
		$.ajax({
			type: "get",
			url: "https://cn.feelunique.com/queryapi/fetch?sku=26972-0,86402-0,80349-0,48378-0,59505-0,79027-0,86274-0,60292-0,96498-47249,76833-0,90880-0,68603-0,95748-0,75414-0,75415-0,66312-0,76159-0,95753-0,46168-0,79034-0&appID=12&stock=1&callback=product4",
			async: true,
			dataType: "jsonp",
			jsonpCallback: "product4",
			success: function(data) {
				let htmlstr = template("think_like_1", data);
				$("#think_like_list").html(htmlstr);
			}
		});

		$("._cart").on("click", function() {
			console.log("aaaaaaaaaaa");
			alert("成功加入购物车");
			var pId = "1333937";
			var pName = "L'Oréal Paris 欧莱雅 伊甸园眼部彩妆两件套装";
			var pPrice = "£13.60";
			var pImg = "https://source-feelunique.azoyacdn.com/media/catalog/product/l/_/L__039_Oreal_Paris_Pastel_Paradise_Eye_Kit_1530275347.png?imageMogr2/thumbnail/62x62/extent/62x62/background/d2hpdGU=";
			console.log(pId);
			var goods = {
				pId,
				pName,
				pPrice,
				pImg,
				"count": 1
			}
			var str = localStorage.getItem("plist");
			if(!str) {
				var arr = [];
			} else {
				var arr = JSON.parse(str);
			}

			var _goods = arr.find(function(item) {
				return item.pId == goods.pId;
			})
			if(_goods) {
				_goods.count++;
			} else {
				arr.push(goods);
			}
			localStorage.setItem("plist", JSON.stringify(arr));
		})
		//
		//						console.log("adfdffege");
	})
})