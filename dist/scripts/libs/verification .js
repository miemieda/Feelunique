"use strict";function verification(t){var a=[];return o(a),t.on("click",function(){o(a)}),a.join("");function o(t){var a=$("#canvas").width(),o=$("#canvas").height(),r=document.getElementById("canvas"),n=r.getContext("2d");r.width=a,r.height=o;for(var e="A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0".split(","),h=e.length,i=0;i<=3;i++){var l=Math.floor(Math.random()*h),d=30*Math.random()*Math.PI/180,M=e[l];t[i]=M.toLowerCase();var m=10+20*i,f=20+8*Math.random();n.font="bold 23px 微软雅黑",n.translate(m,f),n.rotate(d),n.fillStyle=s(),n.fillText(M,0,0),n.rotate(-d),n.translate(-m,-f)}for(i=0;i<=5;i++)n.strokeStyle=s(),n.beginPath(),n.moveTo(Math.random()*a,Math.random()*o),n.lineTo(Math.random()*a,Math.random()*o),n.stroke();for(i=0;i<=30;i++){n.strokeStyle=s(),n.beginPath();m=Math.random()*a,f=Math.random()*o;n.moveTo(m,f),n.lineTo(m+1,f+1),n.stroke()}}function s(){return"rgb("+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+")"}}