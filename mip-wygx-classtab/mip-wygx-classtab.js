/**
 * @file mip-wygx-classtab 组件
 * @author
 */

define(function (require) {
	var $ = require('zepto');
    var customElement = require('customElement').create();
    var parent = $('mip-wygx-classtab');
    var children = parent.children();

    var obj = Object.assign({},children);
    console.log(obj)
   
    function elementClick(){
    	parent.on('click',function(e){
    		console.log(e.target)
    	})
    }

    customElement.prototype.build = function () {
		elementClick();
    };

    return customElement;
});
