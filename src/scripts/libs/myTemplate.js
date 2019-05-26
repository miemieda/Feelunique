function template(id, data) {
			let template = document.getElementById(id).innerHTML;
						
			template = 'print(`' + template + '`)';	//开头和结尾
			template = template.replace( /<%=(.+?)%>/g, '`) \n	print( $1 ) \n print(`' );
			template = template.replace( /<%(.+?)%>/g , '`) \n  $1 \n print(`');
			
			var codestr = `
				(function(data) {
					var htmlstr = "";
					function print(val){
						htmlstr += val;
					}
					${template}
					return htmlstr;
				})
			`;
			let fun = eval( codestr );
			
			return fun(data);
		}