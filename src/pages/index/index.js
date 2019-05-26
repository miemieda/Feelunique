require(["../../static/conf/config.js"], function() {
	require(["jquery", "sw", "jquery.ui", "myTemplate", "header", "footer"], function($, Swiper) {
		//推荐-----商品接口
		$.ajax({
			type: "get",
			url: "https://cn.feelunique.com/queryapi/fetch?sku=87112-0,94707-46048,86410-0,32639-0,96760-0,56948-0,66012-0,75400-0,56776-0,95747-0,32327-0,79027-0,75349-0,77778-0,54201-0,76163-0,71496-0,72529-0,86515-0,79022-0&appID=12&stock=1&callback=goods1",
			async: true,
			dataType: "jsonp",
			jsonpCallback: "goods1",
			success: function(data) {
				let htmlstr = template("_product_recomm1", data);
				$(".product_recomm_show1").html(htmlstr);
				show_buy();
				BUY_change();
				add_cart();
			}
		});

		//		//选项页切换
		$(function() {
			$(".product_nav li").click(function(e) {
				e.preventDefault();
				$(this).children().addClass("p_active").parent().siblings().children().removeClass("p_active");
				$(".box:eq(" + $(this).index() + ")").show().siblings().hide();
				console.log($(".box:eq(" + $(this).index() + ")"));
				$(".product_nav").show();

				//:eq(index)  获取下标为index的元素
				//siblings() 获取所有兄弟元素
				console.log($(this).index());
				$.ajax({
					type: "get",
					url: "https://cn.feelunique.com/queryapi/fetch?sku=87112-0,94707-46048,86410-0,32639-0,96760-0,56948-0,66012-0,75400-0,56776-0,95747-0,32327-0,79027-0,75349-0,77778-0,54201-0,76163-0,71496-0,72529-0,86515-0,79022-0&appID=12&stock=1&callback=goods2",
					async: true,
					dataType: "jsonp",
					jsonpCallback: "goods2",
					success: function(data) {
						let htmlstr = template("_product_recomm2", data);
						$(".product_recomm_show").html(htmlstr);
						show_buy();
						BUY_change();
						add_cart();
					}
				});
			})
		})

		//猜你喜欢接口
		$.ajax({
			type: "get",
			url: "https://cn.feelunique.com/queryapi/fetch?sku=87112-0,94707-46048,86410-0,32639-0,96760-0,56948-0,66012-0,75400-0,56776-0,95747-0,32327-0,79027-0,75349-0,77778-0,54201-0,76163-0,71496-0,72529-0,86515-0,79022-0&appID=12&stock=1&callback=think1",
			async: true,
			dataType: "jsonp",
			jsonpCallback: "think1",
			success: function(data) {
				let htmlstr = template("_think_like1", data);
				$("#think_like1_list").html(htmlstr);
			}
		});

		$.ajax({
			type: "get",
			url: "https://cn.feelunique.com/queryapi/fetch?sku=87112-0,94707-46048,86410-0,32639-0,96760-0,56948-0,66012-0,75400-0,56776-0,95747-0,32327-0,79027-0,75349-0,77778-0,54201-0,76163-0,71496-0,72529-0,86515-0,79022-0&appID=12&stock=1&callback=think2",
			async: true,
			dataType: "jsonp",
			jsonpCallback: "think2",
			success: function(data) {
				let htmlstr = template("_think_like2", data);
				$("#think_like2_list").html(htmlstr);
			}
		});

		$.ajax({
			type: "get",
			url: "https://cn.feelunique.com/queryapi/fetch?sku=87112-0,94707-46048,86410-0,32639-0,96760-0,56948-0,66012-0,75400-0,56776-0,95747-0,32327-0,79027-0,75349-0,77778-0,54201-0,76163-0,71496-0,72529-0,86515-0,79022-0&appID=12&stock=1&callback=think3",
			async: true,
			dataType: "jsonp",
			jsonpCallback: "think3",
			success: function(data) {
				let htmlstr = template("_think_like3", data);
				$("#think_like3_list").html(htmlstr);
			}
		});
		//轮播图接口
		$.ajax({
			type: "get",
			url: "http://localhost:8989/home",
			async: true,
			dataType: "json",
			success: function(data) {
				let htmlstr = template("_banner", data);
				$("#banner_list").html(htmlstr);
			}
		});

		var imgs = $("#banner_list"); //放有img的ul标签
		var navs = $(".nav").children(); //导航按钮
		var currentIndex = 1; //当前index值
		var t = setInterval(function() { //两秒钟调用一次
			tabImg();
			tabNav();
		}, 3000);

		imgs.mouseover(function() { //滑入图片，清空定时器，图片不动，导航按钮不变
			clearInterval(t)
		})

		imgs.mouseout(function() { //滑出图片，设定定时器，图片继续移动，导航按钮继续到下一个
			t = setInterval(function() {
				tabImg();
				tabNav();
			}, 3000);
		})

		navs.each(function(index) {
			$(this).click(function() {
				currentIndex = index;
				tabImg();
				tabNav();
			})
		})

		$("#banner_show .rightBtn").click(function() {
			tabImg();
			tabNav();
		})

		$("#banner_show .leftBtn").click(function() {
			console.log("bbbaaabbb");
			tabImg2();
			tabNav();
		})

		function tabImg() {
			/*运动到下一张图*/
			imgs.css({
				left: -1349 * currentIndex + "px"
			});
			if(currentIndex == 8) {
				imgs.css({
					left: 0
				})
				currentIndex = 0;
			}
			currentIndex++;
		}

		function tabImg2() {
			/*运动到下一张图*/
			console.log("ccc");
			console.log(currentIndex);
			if(currentIndex == 1) {
				imgs.css({
					left: "-9443px"
				})
				currentIndex = 9;
			}
			imgs.css({
				left: -1349 * currentIndex + "px"
			});
			currentIndex--;
		}

		function tabNav() {
			navs.each(function(index) {
				if(index == currentIndex - 1 % 8) {
					$(this).addClass("active").siblings().removeClass("active");
				}
			})
		}

		//四大图滑入图片变大
		$(".four-featured li a img").mouseover(function() {
			console.log("aaaa");
			$(this).animate({
				width: "280px"
			})
		})

		$(".four-featured li a img").mouseout(function() {
			$(this).animate({
				width: "270px"
			})
		})

		//猜你喜欢

		var likes = $(".like_list"); //放有img的ul标签
		var currentIndex_like = 1; //当前index值

		$("#like_roll .rightBtn").click(function() {
			$(".like_list").animate({
				left: -1190 * currentIndex_like + "px"
			}, function() {
				if(currentIndex_like == 3) {
					likes.css({
						left: 0
					})
					currentIndex_like = 0;
				}
				currentIndex_like++;
			});

		})

//		$("#like_roll .leftBtn").click(function() {
//			$(".like_list").animate({
//				left: 1190 * currentIndex_like + "px"
//			}, function() {
//				if(currentIndex_like == 1) {
//					likes.css({
//						left: "-1190px"
//					})
//					currentIndex_like = 2;
//				}
//				currentIndex_like--;
//			});
//		})

//		let currentIndex = 1;
//		$("#like_roll .rightBtn").click(function() {
//			currentIndex = currentIndex === 2 ? 1 : ++currentIndex;
//			$(".like_list").animate({
//				left: -1170 * currentIndex + "px"
//			});
//		})
//		$("#like_roll .leftBtn").click(function() {
//			currentIndex = currentIndex === 1 ? 2 : --currentIndex;
//			$(".like_list").animate({
//				left: -1170 * currentIndex + "px"
//			});
//		})
		
		
		

		//显示BUY
		function show_buy() {
			$("._product_one").mouseover(function() {
				$(this).children(".options").css({
					display: "block"
				})
			})
			$("._product_one").mouseout(function() {
				$(this).children(".options").css({
					display: "none"
				})
			})
		}

		//BUY改变颜色
		function BUY_change() {
			$(".options").mouseover(function() {
				$(this).css({
					background: "#ececec"
				})
			})
			$(".options").mouseout(function() {
				$(this).css({
					background: "#000"
				})
			})
		}

		//加入购物车
		function add_cart() {
			$(".btn_btn").click(function() {
				console.log("hahhahaha");
				alert("成功加入购物车！");
				var pId = $(this).attr("dataProductId");
				var pName = $(this).attr("dataProductName");
				var pPrice = $(this).attr("dataProductPrice");
				var pImg = $(this).attr("dataProductImg");
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
		}
	})
})