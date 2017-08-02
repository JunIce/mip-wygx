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
        var input = document.createElement('input');
        input.type = 'file';
        $(input).css({
            'opacity'   : 0,
                    'position'  : 'absolute',
                    'right'     : '-3px',
                    'top'       : '-3px',
                    'z-index'   : 999 
        })
        element.appendChild(input)
        console.log(this)
    };
    return customElement;
});
