"use strict";function template(id,data){var template=document.getElementById(id).innerHTML;template="print(`"+template+"`)",template=template.replace(/<%=(.+?)%>/g,"`) \n\tprint( $1 ) \n print(`"),template=template.replace(/<%(.+?)%>/g,"`) \n  $1 \n print(`");var codestr='\n\t\t\t\t(function(data) {\n\t\t\t\t\tvar htmlstr = "";\n\t\t\t\t\tfunction print(val){\n\t\t\t\t\t\thtmlstr += val;\n\t\t\t\t\t}\n\t\t\t\t\t'.concat(template,"\n\t\t\t\t\treturn htmlstr;\n\t\t\t\t})\n\t\t\t"),fun=eval(codestr);return fun(data)}