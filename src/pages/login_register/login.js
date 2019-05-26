require(["../../static/conf/config.js"], function() {
	require(["jquery", "sw", "jquery.ui", "myTemplate", "jq.validate"], function($, Swiper) {
		console.log("Aaaaaa");
		//GBP滑入
		$(".exchange").mouseover(function() {
			console.log("cccccccccccc");
			$(".erl_la_down_menu").css({
				display: "block"
			});
		});

		$(".exchange").mouseout(function() {
			$(".erl_la_down_menu").css({
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

		//账号检测
		$("#username").blur(function() {
			if($.trim(this.value) == "" || $.trim(this.value) == null) {
				let Msg = '请输入账号';
				$("#user_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>" + Msg + "</p>");
			} else {

				let checkEmail = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/.test($.trim(this.value));
				let checkTel = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test($.trim(this.value));
				console.log(checkEmail);
				console.log(checkTel);
				if(checkEmail || checkTel) {
					console.log(checkEmail || checkTel);
					$("._user").append("<span class='_true'></span>");
				} else {
					let Msg = '请输入正确的手机或者邮箱';
					$("#user_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>" + Msg + "</p>");
				}
			}
		})
		$("#username").focus(function() {
			$("#user_error img").remove();
			$("#user_error .msg").remove();
			$("._user ._true").remove();
		})

		//密码检测
		$("#password").blur(function() {
			if($.trim(this.value) == "" || $.trim(this.value) == null) {
				let Msg = '请输入密码';
				$("#password_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>" + Msg + "</p>");
			} else {
				let checkPass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test($.trim(this.value));
				if(checkPass) {
					$("._password").append("<span class='_true'></span>");
				} else {
					let Msg = '6-20个数字、字母或符号区分大小写';
					$("#password_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>" + Msg + "</p>");
				}
			}
		})
		$("#password").focus(function() {
			$("#password_error img").remove();
			$("#password_error .msg").remove();
			$("._password ._true").remove();
		})

		//验证码检测
		$(function() {
			var show_num = [];
			draw(show_num);

			$("#canvas").on('click', function() {
				draw(show_num);
			})
			$("#v_code").blur(function() {
				if($.trim(this.value) == "") {
					let Msg = '请输入验证码';
					$("#v_code_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>" + Msg + "</p>");
				} else {
					var val = $.trim(this.value).toLowerCase();
					var num = show_num.join("");
					if(val != num) {
						let Msg = '验证码错误';
						$("#v_code_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>" + Msg + "</p>");
					}
				}
			})
			$("#v_code").focus(function() {
				$("#v_code_error img").remove();
				$("#v_code_error .msg").remove();
			})
		})

		function draw(show_num) {
			var canvas_width = $('#canvas').width();
			var canvas_height = $('#canvas').height();
			var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
			var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
			canvas.width = canvas_width;
			canvas.height = canvas_height;
			var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
			var aCode = sCode.split(",");
			var aLength = aCode.length; //获取到数组的长度

			for(var i = 0; i <= 3; i++) {
				var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
				var deg = Math.random() * 30 * Math.PI / 180; //产生0~30之间的随机弧度
				var txt = aCode[j]; //得到随机的一个内容
				show_num[i] = txt.toLowerCase();
				var x = 10 + i * 20; //文字在canvas上的x坐标
				var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
				context.font = "bold 23px 微软雅黑";

				context.translate(x, y);
				context.rotate(deg);

				context.fillStyle = randomColor();
				context.fillText(txt, 0, 0);

				context.rotate(-deg);
				context.translate(-x, -y);
			}
			for(var i = 0; i <= 5; i++) { //验证码上显示线条
				context.strokeStyle = randomColor();
				context.beginPath();
				context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
				context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
				context.stroke();
			}
			for(var i = 0; i <= 30; i++) { //验证码上显示小点
				context.strokeStyle = randomColor();
				context.beginPath();
				var x = Math.random() * canvas_width;
				var y = Math.random() * canvas_height;
				context.moveTo(x, y);
				context.lineTo(x + 1, y + 1);
				context.stroke();
			}
		}

		function randomColor() { //得到随机的颜色值
			var r = Math.floor(Math.random() * 256);
			var g = Math.floor(Math.random() * 256);
			var b = Math.floor(Math.random() * 256);
			return "rgb(" + r + "," + g + "," + b + ")";
		}

		$("#user_submit").click(function() {
			$.ajax({
				type: "get",
				url: "http://localhost:9999/json/users.json",
				success: function(data) {

					let _username = $.trim($("#username").val());
					let _password = $.trim($("#password").val());

					for(let i = 0; i < data.length; i++) {
						if((_username == data[i].phone) && (_password == data[i].password)) {
							localStorage.setItem('username', _username);
							localStorage.setItem('password', _password);
							$(location).attr('href', 'http://localhost:9999/pages/index/index.html');
							break;
						}

					}

					$(location).attr('href', 'http://localhost:9999/pages/login_register/login.html');
					let Msg = '用户名或密码错误';
					$("#user_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>" + Msg + "</p>");

					for(let j = 0; j < localStorage.length; j++) {
						let _username2 = localStorage.key(j);
						let _password2 = localStorage.getItem(_username2);
						if(_username2 == _username && _password2 == _password) {
							$(location).attr('href', 'http://localhost:9999/pages/index/index.html');
						}
					}
				}
			})
		})

	})
})