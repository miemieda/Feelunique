"use strict";require(["../../static/conf/config.js"],function(){require(["jquery","sw","jquery.ui","myTemplate"],function(g,r){function e(r){var e=g("#canvas").width(),s=g("#canvas").height(),o=document.getElementById("canvas"),t=o.getContext("2d");o.width=e,o.height=s;for(var a="A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0".split(","),i=a.length,n=0;n<=3;n++){var c=Math.floor(Math.random()*i),l=30*Math.random()*Math.PI/180,p=a[c];r[n]=p.toLowerCase();var m=10+20*n,u=20+8*Math.random();t.font="bold 23px 微软雅黑",t.translate(m,u),t.rotate(l),t.fillStyle=d(),t.fillText(p,0,0),t.rotate(-l),t.translate(-m,-u)}for(n=0;n<=5;n++)t.strokeStyle=d(),t.beginPath(),t.moveTo(Math.random()*e,Math.random()*s),t.lineTo(Math.random()*e,Math.random()*s),t.stroke();for(n=0;n<=30;n++){t.strokeStyle=d(),t.beginPath();m=Math.random()*e,u=Math.random()*s;t.moveTo(m,u),t.lineTo(m+1,u+1),t.stroke()}}function d(){return"rgb("+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+")"}console.log("cccccccccccccccc"),console.log("dddddd"),g(".exchange").mouseover(function(){g(".erl_la_down_menu").css({display:"block"})}),g(".exchange").mouseout(function(){g(".erl_la_down_menu").css({display:"none"})}),g(".notic_down_solid").mouseover(function(){g(".tb_parities span").css({display:"block"})}),g(".notic_down_solid").mouseout(function(){g(".tb_parities span").css({display:"none"})}),g("#username").blur(function(r){if(r.preventDefault(),g.ajax({type:"get",url:"http://localhost:9999/json/users.json",success:function(r){for(var e=0;e<r.length;e++)if(g.trim(g("#username").val())==r[e].phone){g("._user ._true").remove(),g("#user_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>该账号已存在</p>")}}}),""==g.trim(this.value)||null==g.trim(this.value)){g("#user_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>请输入手机号</p>")}else{if(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(g.trim(this.value)))g("._user").append("<span class='_true'></span>");else{g("#user_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>请输入正确的手机号</p>")}}}),g("#username").focus(function(){g("#user_error img").remove(),g("#user_error .msg").remove(),g("._user ._true").remove()}),g("#password").blur(function(){if(""==g.trim(this.value)||null==g.trim(this.value)){g("#password_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>请输入密码</p>")}else{if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(g.trim(this.value)))g("._password").append("<span class='_true'></span>");else{g("#password_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>6-20个数字、字母或符号区分大小写</p>")}}}),g("#password").focus(function(r){g("#password_error img").remove(),g("#password_error .msg").remove(),g("._password ._true").remove()}),g("#r_password").blur(function(){if(""==g.trim(this.value)||null==g.trim(this.value)){g("#r_password_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>请输入确认密码</p>")}else if(g.trim(this.value)==g.trim(g("#password").val()))g("._r_password").append("<span class='_true'></span>");else{g("#r_password_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>两次密码输入不一致</p>")}}),g("#r_password").focus(function(){g("#r_password_error img").remove(),g("#r_password_error .msg").remove(),g("._r_password ._true").remove()}),g(function(){var r=[];e(r),g("#canvas").on("click",function(){e(r)}),g("#v_code").blur(function(){if(""==g.trim(this.value)){g("#v_code_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>请输入验证码</p>")}else{if(g.trim(this.value).toLowerCase()!=r.join("")){g("#v_code_error").append("<img src='../../../img/login-register/tip.png'/><p class='msg'>验证码错误</p>")}}}),g("#v_code").focus(function(){g("#v_code_error img").remove(),g("#v_code_error .msg").remove()})}),g(function(){g("#_agree").change(function(){g("#_agree").is(":checked")?(g("#user_register").css({background:"#000",color:"#fff"}),g("#user_register").removeAttr("disabled")):g("#user_register").css({background:"#CCC",color:"#000"}),g("#user_register").attr("disabled","disabled")})}),g("#user_register").click(function(){var r=g.trim(g("#username").val()),e=g.trim(g("#password").val());localStorage.setItem(r,e),alert("注册成功！")})})});