/**
 * @file mip-wygx-classtab 组件.
 * @author east_qiu@gmail.com.
 * @version 1.0.2
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    var xhr = new XMLHttpRequest();

    if(typeof FormData === 'function' || typeof FormData === 'object') {

        var formData = new FormData(); // 创建formdata-object


    }



    customElement.prototype.build = function () {
        var element = this.element;

        var defaultCss = {
            width : '100%',
            height : '30px',
            backgroundColor : '#eeeeee',
            
        }
        var input = document.createElement('input');
        input.type = 'file';
        $(input).css({
            'opacity'   : 0,
            'position'  : 'absolute',
            'right'     : '0',
            'top'       : '0',
            'width'     : '100%',
            'z-index'   : 999 
        })
        element.appendChild(input)

        var div = document.createElement('div');
        div.innerText = '上传'
        $(div).css({
            'height':'28px',
            'lineHeight':'28px',
            'text-align':'center',
            'background-color' : '#eee',
            'border-radius' : '5px'
        })

        element.appendChild(div)
        console.log(this)
    };
    return customElement;
});
