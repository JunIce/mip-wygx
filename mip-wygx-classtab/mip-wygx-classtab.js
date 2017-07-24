/**
 * @file mip-wygx-classtab 组件
 * @author
 */

define(function (require) {
	var $ = require('zepto');
    var customElement = require('customElement').create();
    var parent = $('mip-wygx-classtab');
    var children = parent.children();

    var btnContainer = [];
    var elContainer = [];
    for(var i = 0; i < children.length; i ++) {
        var obj = {
            nodeName : children[i].nodeName,
            innerText : children[i].innerText,
            addClass : $(children[i]).attr('add-class'),
            bindElement : $(children[i]).attr('to-el'),
        }
        btnContainer.push(obj);
    }

    btnContainer.map(function(i){
        var el = document.querySelector('#' + i.bindElement);
        if($('#' + i.bindElement).length == 1) {

            elContainer.push({
                el : el,
                classStatus : el.classList
            })
        }else{
            console.error('Bind Element not exists!');
        }
    })

    console.log(elContainer)
    function checkElExist(el){
        if($("#" + el).length > 0) console.info(el);
        else console.error('Bind Element not exists!');
    }


    
   
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
