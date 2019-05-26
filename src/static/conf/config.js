requirejs.config({
	baseUrl : "http://localhost:9999/",
	paths : {
		"vali" : "scripts/libs/jquery.validate",
		"jquery" : "scripts/libs/jquery-2.0.3",
		"sw" : "scripts/libs/swiper",
		"jq.cookie" : "scripts/libs/jquery.cookie",
		"bootstrap" : "scripts/libs/bootstrap",
		"jquery.ui" : "static/scripts/jquery-ui.min",
		"css" : "scripts/libs/css",  //加载CSS文件的插件
		"myTemplate":"scripts/libs/myTemplate",
		"jq.validate":"static/scripts/jquery.validate.min",
		"verification":"scripts/libs/verification",
		"header":"pages/header/header",
		"footer":"pages/footer/footer"
	},
	shim : {
		"jq.cookie" : {
			deps : ["jquery"]
		},
		"sw" : {
			deps : ["css!styles/swiper.css"]
		},
		"bootstrap" : {
			deps : [
				"jquery",
				"css!styles/bootstrap.css"
			]
		}
	}
})