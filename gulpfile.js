const gulp = require("gulp");
const webserver = require("gulp-webserver");
const express = require("express");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const https = require("https");
const http = require("http");

gulp.task("compileJS", ()=>{
	gulp.src("src/scripts/**/*.js")
		.pipe( babel({
			presets : ["@babel/env"]
		}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dist/scripts") )
	gulp.src("src/pages/**/*.js")
		.pipe( babel({
			presets : ["@babel/env"]
		}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dist/pages") )
	gulp.src("src/static/**/*").pipe( gulp.dest("dist/static") );
})
gulp.task("compileCSS", ()=>{
	gulp.src("src/styles/**/*.scss")
		.pipe( sass() )
		.pipe( autoprefixer() )
		.pipe( csso() )
		.pipe( gulp.dest("dist/styles") )
})
gulp.task("compileHTML", ()=>{
	gulp.src("src/pages/**/*.html")
		.pipe( gulp.dest("dist/pages") )
})


gulp.task("server", function(){
	//静态资源服务器 : 9999
	gulp.src("dist")
		.pipe( webserver({
			livereload : true,
			port : 9999
		}) )
	gulp.watch("src/pages/**/*.js", ["compileJS"]);
	gulp.watch("src/scripts/**/*.js", ["compileJS"]);
	gulp.watch("src/styles/**/*.scss", ["compileCSS"]);
	gulp.watch("src/pages/**/*.html", ["compileHTML"])
	
	//接口代理服务器
	let app = express();
	app.get("/", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		res.end("welcom");
	})
	
	app.get("/home", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "cn.feelunique.com",
			path: "/cmsapi/home/banners?website_id=12&client=0",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	app.get("/comment", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "cn.feelunique.com",
			path: "/o_comment/review/getComment?productId=141578&type=1&currentPage=1&limit=5&order=1",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	app.get("/products", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "cn.feelunique.com",
			path: "/queryapi/lists?page=1&cid=3759&brand=3533&sort=top",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	app.get("/city2", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = http.request({
			hostname: "hotel.elong.com",
			path: "/ajax/search/hotsuggest/?cityId=0101&_=1557992324355",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	app.listen(8989);
})

gulp.task("build", ["compileJS","compileCSS","compileHTML"])