"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"===("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(u){var i;u.extend(u.fn,{validate:function(t){if(this.length){var s=u.data(this[0],"validator");return s||(this.attr("novalidate","novalidate"),s=new u.validator(t,this[0]),u.data(this[0],"validator",s),s.settings.onsubmit&&(this.on("click.validate",":submit",function(t){s.submitButton=t.currentTarget,u(this).hasClass("cancel")&&(s.cancelSubmit=!0),void 0!==u(this).attr("formnovalidate")&&(s.cancelSubmit=!0)}),this.on("submit.validate",function(i){function t(){var t,e;return s.submitButton&&(s.settings.submitHandler||s.formSubmitted)&&(t=u("<input type='hidden'/>").attr("name",s.submitButton.name).val(u(s.submitButton).val()).appendTo(s.currentForm)),!(s.settings.submitHandler&&!s.settings.debug)||(e=s.settings.submitHandler.call(s,s.currentForm,i),t&&t.remove(),void 0!==e&&e)}return s.settings.debug&&i.preventDefault(),s.cancelSubmit?(s.cancelSubmit=!1,t()):s.form()?s.pendingRequest?!(s.formSubmitted=!0):t():(s.focusInvalid(),!1)})),s)}t&&t.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.")},valid:function(){var t,e,i;return u(this[0]).is("form")?t=this.validate().form():(i=[],t=!0,e=u(this[0].form).validate(),this.each(function(){t=e.element(this)&&t,t||(i=i.concat(e.errorList))}),e.errorList=i),t},rules:function(t,e){var i,s,n,r,a,o,l=this[0],h=void 0!==this.attr("contenteditable")&&"false"!==this.attr("contenteditable");if(null!=l&&(!l.form&&h&&(l.form=this.closest("form")[0],l.name=this.attr("name")),null!=l.form)){if(t)switch(s=(i=u.data(l.form,"validator").settings).rules,n=u.validator.staticRules(l),t){case"add":u.extend(n,u.validator.normalizeRule(e)),delete n.messages,s[l.name]=n,e.messages&&(i.messages[l.name]=u.extend(i.messages[l.name],e.messages));break;case"remove":return e?(o={},u.each(e.split(/\s/),function(t,e){o[e]=n[e],delete n[e]}),o):(delete s[l.name],n)}return(r=u.validator.normalizeRules(u.extend({},u.validator.classRules(l),u.validator.attributeRules(l),u.validator.dataRules(l),u.validator.staticRules(l)),l)).required&&(a=r.required,delete r.required,r=u.extend({required:a},r)),r.remote&&(a=r.remote,delete r.remote,r=u.extend(r,{remote:a})),r}}}),u.extend(u.expr.pseudos||u.expr[":"],{blank:function(t){return!u.trim(""+u(t).val())},filled:function(t){var e=u(t).val();return null!==e&&!!u.trim(""+e)},unchecked:function(t){return!u(t).prop("checked")}}),u.validator=function(t,e){this.settings=u.extend(!0,{},u.validator.defaults,t),this.currentForm=e,this.init()},u.validator.format=function(i,t){return 1===arguments.length?function(){var t=u.makeArray(arguments);return t.unshift(i),u.validator.format.apply(this,t)}:(void 0===t||(2<arguments.length&&t.constructor!==Array&&(t=u.makeArray(arguments).slice(1)),t.constructor!==Array&&(t=[t]),u.each(t,function(t,e){i=i.replace(new RegExp("\\{"+t+"\\}","g"),function(){return e})})),i)},u.extend(u.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:u([]),errorLabelContainer:u([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(t)))},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(t,e){9===e.which&&""===this.elementValue(t)||-1!==u.inArray(e.keyCode,[16,17,18,20,35,36,37,38,39,40,45,144,225])||(t.name in this.submitted||t.name in this.invalid)&&this.element(t)},onclick:function(t){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(t,e,i){"radio"===t.type?this.findByName(t.name).addClass(e).removeClass(i):u(t).addClass(e).removeClass(i)},unhighlight:function(t,e,i){"radio"===t.type?this.findByName(t.name).removeClass(e).addClass(i):u(t).removeClass(e).addClass(i)}},setDefaults:function(t){u.extend(u.validator.defaults,t)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:u.validator.format("Please enter no more than {0} characters."),minlength:u.validator.format("Please enter at least {0} characters."),rangelength:u.validator.format("Please enter a value between {0} and {1} characters long."),range:u.validator.format("Please enter a value between {0} and {1}."),max:u.validator.format("Please enter a value less than or equal to {0}."),min:u.validator.format("Please enter a value greater than or equal to {0}."),step:u.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){this.labelContainer=u(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||u(this.currentForm),this.containers=u(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var i,r=this.currentForm,s=this.groups={};function t(t){var e=void 0!==u(this).attr("contenteditable")&&"false"!==u(this).attr("contenteditable");if(!this.form&&e&&(this.form=u(this).closest("form")[0],this.name=u(this).attr("name")),r===this.form){var i=u.data(this.form,"validator"),s="on"+t.type.replace(/^validate/,""),n=i.settings;n[s]&&!u(this).is(n.ignore)&&n[s].call(i,this,t)}}u.each(this.settings.groups,function(i,t){"string"==typeof t&&(t=t.split(/\s/)),u.each(t,function(t,e){s[e]=i})}),i=this.settings.rules,u.each(i,function(t,e){i[t]=u.validator.normalizeRule(e)}),u(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",t).on("click.validate","select, option, [type='radio'], [type='checkbox']",t),this.settings.invalidHandler&&u(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),u.extend(this.submitted,this.errorMap),this.invalid=u.extend({},this.errorMap),this.valid()||u(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(t){var e,i,s=this.clean(t),n=this.validationTargetFor(s),r=this,a=!0;return void 0===n?delete this.invalid[s.name]:(this.prepareElement(n),this.currentElements=u(n),(i=this.groups[n.name])&&u.each(this.groups,function(t,e){e===i&&t!==n.name&&(s=r.validationTargetFor(r.clean(r.findByName(t))))&&s.name in r.invalid&&(r.currentElements.push(s),a=r.check(s)&&a)}),e=!1!==this.check(n),a=a&&e,this.invalid[n.name]=!e,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),u(t).attr("aria-invalid",!e)),a},showErrors:function(e){if(e){var i=this;u.extend(this.errorMap,e),this.errorList=u.map(this.errorMap,function(t,e){return{message:t,element:i.findByName(e)[0]}}),this.successList=u.grep(this.successList,function(t){return!(t.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){u.fn.resetForm&&u(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var t=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(t)},resetElements:function(t){var e;if(this.settings.unhighlight)for(e=0;t[e];e++)this.settings.unhighlight.call(this,t[e],this.settings.errorClass,""),this.findByName(t[e].name).removeClass(this.settings.validClass);else t.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e,i=0;for(e in t)void 0!==t[e]&&null!==t[e]&&!1!==t[e]&&i++;return i},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(t){t.not(this.containers).text(""),this.addWrapper(t).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{u(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(t){}},findLastActive:function(){var e=this.lastActive;return e&&1===u.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var i=this,s={};return u(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var t=this.name||u(this).attr("name"),e=void 0!==u(this).attr("contenteditable")&&"false"!==u(this).attr("contenteditable");return!t&&i.settings.debug&&window.console&&console.error("%o has no name assigned",this),e&&(this.form=u(this).closest("form")[0],this.name=t),this.form===i.currentForm&&(!(t in s||!i.objectLength(u(this).rules()))&&(s[t]=!0))})},clean:function(t){return u(t)[0]},errors:function(){var t=this.settings.errorClass.split(" ").join(".");return u(this.settings.errorElement+"."+t,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=u([]),this.toHide=u([])},reset:function(){this.resetInternals(),this.currentElements=u([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(t){var e,i,s=u(t),n=t.type,r=void 0!==s.attr("contenteditable")&&"false"!==s.attr("contenteditable");return"radio"===n||"checkbox"===n?this.findByName(t.name).filter(":checked").val():"number"===n&&void 0!==t.validity?t.validity.badInput?"NaN":s.val():(e=r?s.text():s.val(),"file"===n?"C:\\fakepath\\"===e.substr(0,12)?e.substr(12):0<=(i=e.lastIndexOf("/"))?e.substr(i+1):0<=(i=e.lastIndexOf("\\"))?e.substr(i+1):e:"string"==typeof e?e.replace(/\r/g,""):e)},check:function(e){e=this.validationTargetFor(this.clean(e));var t,i,s,n,r=u(e).rules(),a=u.map(r,function(t,e){return e}).length,o=!1,l=this.elementValue(e);for(i in"function"==typeof r.normalizer?n=r.normalizer:"function"==typeof this.settings.normalizer&&(n=this.settings.normalizer),n&&(l=n.call(e,l),delete r.normalizer),r){s={method:i,parameters:r[i]};try{if("dependency-mismatch"===(t=u.validator.methods[i].call(this,l,e,s.parameters))&&1===a){o=!0;continue}if(o=!1,"pending"===t)return void(this.toHide=this.toHide.not(this.errorsFor(e)));if(!t)return this.formatAndAdd(e,s),!1}catch(t){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+s.method+"' method.",t),t instanceof TypeError&&(t.message+=".  Exception occurred when checking element "+e.id+", check the '"+s.method+"' method."),t}}if(!o)return this.objectLength(r)&&this.successList.push(e),!0},customDataMessage:function(t,e){return u(t).data("msg"+e.charAt(0).toUpperCase()+e.substring(1).toLowerCase())||u(t).data("msg")},customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor===String?i:i[e])},findDefined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},defaultMessage:function(t,e){"string"==typeof e&&(e={method:e});var i=this.findDefined(this.customMessage(t.name,e.method),this.customDataMessage(t,e.method),!this.settings.ignoreTitle&&t.title||void 0,u.validator.messages[e.method],"<strong>Warning: No message defined for "+t.name+"</strong>"),s=/\$?\{(\d+)\}/g;return"function"==typeof i?i=i.call(this,e.parameters,t):s.test(i)&&(i=u.validator.format(i.replace(s,"{$1}"),e.parameters)),i},formatAndAdd:function(t,e){var i=this.defaultMessage(t,e);this.errorList.push({message:i,element:t,method:e.method}),this.errorMap[t.name]=i,this.submitted[t.name]=i},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){var t,e,i;for(t=0;this.errorList[t];t++)i=this.errorList[t],this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return u(this.errorList).map(function(){return this.element})},showLabel:function(t,e){var i,s,n,r,a=this.errorsFor(t),o=this.idOrName(t),l=u(t).attr("aria-describedby");a.length?(a.removeClass(this.settings.validClass).addClass(this.settings.errorClass),a.html(e)):(i=a=u("<"+this.settings.errorElement+">").attr("id",o+"-error").addClass(this.settings.errorClass).html(e||""),this.settings.wrapper&&(i=a.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(i):this.settings.errorPlacement?this.settings.errorPlacement.call(this,i,u(t)):i.insertAfter(t),a.is("label")?a.attr("for",o):0===a.parents("label[for='"+this.escapeCssMeta(o)+"']").length&&(n=a.attr("id"),l?l.match(new RegExp("\\b"+this.escapeCssMeta(n)+"\\b"))||(l+=" "+n):l=n,u(t).attr("aria-describedby",l),(s=this.groups[t.name])&&(r=this,u.each(r.groups,function(t,e){e===s&&u("[name='"+r.escapeCssMeta(t)+"']",r.currentForm).attr("aria-describedby",a.attr("id"))})))),!e&&this.settings.success&&(a.text(""),"string"==typeof this.settings.success?a.addClass(this.settings.success):this.settings.success(a,t)),this.toShow=this.toShow.add(a)},errorsFor:function(t){var e=this.escapeCssMeta(this.idOrName(t)),i=u(t).attr("aria-describedby"),s="label[for='"+e+"'], label[for='"+e+"'] *";return i&&(s=s+", #"+this.escapeCssMeta(i).replace(/\s+/g,", #")),this.errors().filter(s)},escapeCssMeta:function(t){return t.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},validationTargetFor:function(t){return this.checkable(t)&&(t=this.findByName(t.name)),u(t).not(this.settings.ignore)[0]},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(t){return u(this.currentForm).find("[name='"+this.escapeCssMeta(t)+"']")},getLength:function(t,e){switch(e.nodeName.toLowerCase()){case"select":return u("option:selected",e).length;case"input":if(this.checkable(e))return this.findByName(e.name).filter(":checked").length}return t.length},depend:function(t,e){return!this.dependTypes[_typeof(t)]||this.dependTypes[_typeof(t)](t,e)},dependTypes:{boolean:function(t){return t},string:function(t,e){return!!u(t,e.form).length},function:function(t,e){return t(e)}},optional:function(t){var e=this.elementValue(t);return!u.validator.methods.required.call(this,e,t)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,u(t).addClass(this.settings.pendingClass),this.pending[t.name]=!0)},stopRequest:function(t,e){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[t.name],u(t).removeClass(this.settings.pendingClass),e&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(u(this.currentForm).submit(),this.submitButton&&u("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!e&&0===this.pendingRequest&&this.formSubmitted&&(u(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(t,e){return e="string"==typeof e&&e||"remote",u.data(t,"previousValue")||u.data(t,"previousValue",{old:null,valid:!0,message:this.defaultMessage(t,{method:e})})},destroy:function(){this.resetForm(),u(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(t,e){t.constructor===String?this.classRuleSettings[t]=e:u.extend(this.classRuleSettings,t)},classRules:function(t){var e={},i=u(t).attr("class");return i&&u.each(i.split(" "),function(){this in u.validator.classRuleSettings&&u.extend(e,u.validator.classRuleSettings[this])}),e},normalizeAttributeRule:function(t,e,i,s){/min|max|step/.test(i)&&(null===e||/number|range|text/.test(e))&&(s=Number(s),isNaN(s)&&(s=void 0)),s||0===s?t[i]=s:e===i&&"range"!==e&&(t[i]=!0)},attributeRules:function(t){var e,i,s={},n=u(t),r=t.getAttribute("type");for(e in u.validator.methods)i="required"===e?(""===(i=t.getAttribute(e))&&(i=!0),!!i):n.attr(e),this.normalizeAttributeRule(s,r,e,i);return s.maxlength&&/-1|2147483647|524288/.test(s.maxlength)&&delete s.maxlength,s},dataRules:function(t){var e,i,s={},n=u(t),r=t.getAttribute("type");for(e in u.validator.methods)""===(i=n.data("rule"+e.charAt(0).toUpperCase()+e.substring(1).toLowerCase()))&&(i=!0),this.normalizeAttributeRule(s,r,e,i);return s},staticRules:function(t){var e={},i=u.data(t.form,"validator");return i.settings.rules&&(e=u.validator.normalizeRule(i.settings.rules[t.name])||{}),e},normalizeRules:function(s,n){return u.each(s,function(t,e){if(!1!==e){if(e.param||e.depends){var i=!0;switch(_typeof(e.depends)){case"string":i=!!u(e.depends,n.form).length;break;case"function":i=e.depends.call(n,n)}i?s[t]=void 0===e.param||e.param:(u.data(n.form,"validator").resetElements(u(n)),delete s[t])}}else delete s[t]}),u.each(s,function(t,e){s[t]=u.isFunction(e)&&"normalizer"!==t?e(n):e}),u.each(["minlength","maxlength"],function(){s[this]&&(s[this]=Number(s[this]))}),u.each(["rangelength","range"],function(){var t;s[this]&&(u.isArray(s[this])?s[this]=[Number(s[this][0]),Number(s[this][1])]:"string"==typeof s[this]&&(t=s[this].replace(/[\[\]]/g,"").split(/[\s,]+/),s[this]=[Number(t[0]),Number(t[1])]))}),u.validator.autoCreateRanges&&(null!=s.min&&null!=s.max&&(s.range=[s.min,s.max],delete s.min,delete s.max),null!=s.minlength&&null!=s.maxlength&&(s.rangelength=[s.minlength,s.maxlength],delete s.minlength,delete s.maxlength)),s},normalizeRule:function(t){if("string"==typeof t){var e={};u.each(t.split(/\s/),function(){e[this]=!0}),t=e}return t},addMethod:function(t,e,i){u.validator.methods[t]=e,u.validator.messages[t]=void 0!==i?i:u.validator.messages[t],e.length<3&&u.validator.addClassRules(t,u.validator.normalizeRule(t))},methods:{required:function(t,e,i){if(!this.depend(i,e))return"dependency-mismatch";if("select"!==e.nodeName.toLowerCase())return this.checkable(e)?0<this.getLength(t,e):null!=t&&0<t.length;var s=u(e).val();return s&&0<s.length},email:function(t,e){return this.optional(e)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)},url:function(t,e){return this.optional(e)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(t)},date:(i=!1,function(t,e){return i||(i=!0,this.settings.debug&&window.console&&console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")),this.optional(e)||!/Invalid|NaN/.test(new Date(t).toString())}),dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)},number:function(t,e){return this.optional(e)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},minlength:function(t,e,i){var s=u.isArray(t)?t.length:this.getLength(t,e);return this.optional(e)||i<=s},maxlength:function(t,e,i){var s=u.isArray(t)?t.length:this.getLength(t,e);return this.optional(e)||s<=i},rangelength:function(t,e,i){var s=u.isArray(t)?t.length:this.getLength(t,e);return this.optional(e)||s>=i[0]&&s<=i[1]},min:function(t,e,i){return this.optional(e)||i<=t},max:function(t,e,i){return this.optional(e)||t<=i},range:function(t,e,i){return this.optional(e)||t>=i[0]&&t<=i[1]},step:function(t,e,i){function s(t){var e=(""+t).match(/(?:\.(\d+))?$/);return e&&e[1]?e[1].length:0}function n(t){return Math.round(t*Math.pow(10,r))}var r,a=u(e).attr("type"),o="Step attribute on input type "+a+" is not supported.",l=new RegExp("\\b"+a+"\\b"),h=!0;if(a&&!l.test(["text","number","range"].join()))throw new Error(o);return r=s(i),(s(t)>r||n(t)%n(i)!=0)&&(h=!1),this.optional(e)||h},equalTo:function(t,e,i){var s=u(i);return this.settings.onfocusout&&s.not(".validate-equalTo-blur").length&&s.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){u(e).valid()}),t===s.val()},remote:function(r,a,t,o){if(this.optional(a))return"dependency-mismatch";o="string"==typeof o&&o||"remote";var l,e,i,h=this.previousValue(a,o);return this.settings.messages[a.name]||(this.settings.messages[a.name]={}),h.originalMessage=h.originalMessage||this.settings.messages[a.name][o],this.settings.messages[a.name][o]=h.message,t="string"==typeof t&&{url:t}||t,i=u.param(u.extend({data:r},t.data)),h.old===i?h.valid:(h.old=i,(l=this).startRequest(a),(e={})[a.name]=r,u.ajax(u.extend(!0,{mode:"abort",port:"validate"+a.name,dataType:"json",data:e,context:l.currentForm,success:function(t){var e,i,s,n=!0===t||"true"===t;l.settings.messages[a.name][o]=h.originalMessage,n?(s=l.formSubmitted,l.resetInternals(),l.toHide=l.errorsFor(a),l.formSubmitted=s,l.successList.push(a),l.invalid[a.name]=!1,l.showErrors()):(e={},i=t||l.defaultMessage(a,{method:o,parameters:r}),e[a.name]=h.message=i,l.invalid[a.name]=!0,l.showErrors(e)),h.valid=n,l.stopRequest(a,n)}},t)),"pending")}}});var s,n={};return u.ajaxPrefilter?u.ajaxPrefilter(function(t,e,i){var s=t.port;"abort"===t.mode&&(n[s]&&n[s].abort(),n[s]=i)}):(s=u.ajax,u.ajax=function(t){var e=("mode"in t?t:u.ajaxSettings).mode,i=("port"in t?t:u.ajaxSettings).port;return"abort"===e?(n[i]&&n[i].abort(),n[i]=s.apply(this,arguments),n[i]):s.apply(this,arguments)}),u});