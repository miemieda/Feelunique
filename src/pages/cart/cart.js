require(["../../static/conf/config.js"], function() {
	require(["jquery", "sw", "jquery.ui", "myTemplate"], function($, Swiper) {
		console.log("cccccccccccccccc");
		refresh();

		//减少
		$("._sub").on("click", function() {
			let _pID = $(this).parent().parent().children("._pID").val();
			let list = JSON.parse(localStorage.getItem("plist"));
			let index = list.findIndex(function(item) {
				return item.pId == _pID;
			});
			if(list[index].count > 1) {
				if(--list[index].count == 1) {
					$(this).parent().children(".num_change").val(1);
				} else {
					$(this).parent().children(".num_change").val(list[index].count);
				}
			}

			localStorage.setItem("plist", JSON.stringify(list));
		})

		//添加
		$(".plus").on("click", function() {
			let _pID = $(this).parent().parent().children("._pID").val();
			let list = JSON.parse(localStorage.getItem("plist"));
			let index = list.findIndex(function(item) {
				return item.pId == _pID;
			});
			++list[index].count;
			$(this).parent().children(".num_change").val(list[index].count);
			localStorage.setItem("plist", JSON.stringify(list));
		})

		//删除
		$("._delete").on("click", function(e) {
			e.preventDefault();
			let _pID = $(this).parent().parent().children("._pID").val();
			let list = JSON.parse(localStorage.getItem("plist"));
			let index = list.findIndex(function(item) {
				return item.pId == _pID;
			});
			$(this).parent().parent().remove();
			list.splice(index, 1);
			localStorage.setItem("plist", JSON.stringify(list));
		})

		//全选
		let $_all_delete = $("._all_delete").children("input");
		let $others = $("._select").children();
		$_all_delete.click(function() {
			$others.prop("checked", $(this).prop("checked"));
		});
		$others.click(function() {
			if($(this).prop("checked")) {
				if($("input:checked").length >= $others.length) {
					$_all_delete.prop("checked", true);
				}
			} else {
				$_all_delete.prop("checked", false);
			}
		})

		//删除全部
		$("._all_delete a").on("click", function() {
			localStorage.clear();
			$("#all_show_").remove();
		})

		//					$("#all_show_").on("click", function(eve) {
		//			let e = eve || event;
		//			let target = e.target || e.srcElement;
		//			console.log(target);
		//			if(target.className.indexOf("_sub") != -1) {
		//				let _pID = target.children().children("._pID").val();
		//				let list = JSON.parse(localStorage.getItem("plist"));
		//				let index = list.findIndex(function(item) {
		//					return item.pId == _pID;
		//				});
		//
		//				if(--list[index].count == 0) {
		//					list.splice(index, 1);
		//				}
		//				localStorage.setItem("plist", JSON.stringify(list));
		//
		//				refresh();
		//			}
		//			
		//			if(target.className.indexOf("_plus")!=-1){
		//				console.log("BBB")
		//				let _pID = $(this).children().children("._pID").val();
		//				console.log(_pID);
		//				let list = JSON.parse(localStorage.getItem("plist"));
		//				let index = list.findIndex(function(item) {
		//					return item.pId == _pID;
		//				});
		//				++list[index].count;
		//				target.parent().children(".num_change").val(list[index].count);
		//				localStorage.setItem("plist", JSON.stringify(list));
		//				refresh();
		//			}
		//		})

		function refresh() {
			let data = JSON.parse(localStorage.getItem("plist"));
			let htmlstr = template("cart_show", data);
			$("#all_show_").html(htmlstr);
			console.log(data[0].pId);
		}
	})
})