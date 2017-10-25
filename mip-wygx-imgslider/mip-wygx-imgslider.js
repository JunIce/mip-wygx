/**
 * @file mip-wygx-imgslider 组件.
 * @author east_qiu@gmail.com.
 * @version 1.0.0
 */

define(function (require) {

    var customElement = require('customElement').create();

    var $ = require('zepto');
    var Util = require('util');
    var naboo = require('naboo');
    var templates = require('templates');
    var elements = [];
    var Gesture = Util.Gesture;

    // 获取设备尺寸
    var device = (function () {
        var width;
        var height;
        if ('onorientationchange' in window) {
            var winWidth = window.innerWidth ? window.innerWidth : $(window).width();
            var winHeight = window.innerHeight ? window.innerHeight : $(window).height();
            window.addEventListener('orientationchange', function () {
                if (window.orientation === 0) {
                    width = winWidth;
                    height = winHeight;
                }
                else if (window.orientation === 90 || window.orientation === -90) {
                    width = winHeight;
                    height = winWidth;
                }
            }, false);

        }
        else {
            width = window.innerWidth ? window.innerWidth : $(window).width();
            height = window.innerHeight ? window.innerHeight : $(window).height();
        }
        return {
            width: width,
            height: height
        };
    })();


    var ui = {
        defaultSetting: {
            app: 'false',
            apphref: 'http://m.woyaogexing.com/app/wygxw.apk',
            nexturl: ''
        },
        slider: '',
        index: '',
        eLen: 0,
        html: '<div id="swipebox-overlay">'
                + '<div id="mask"></div>'
                + '<div id="swipebox-container">'
                  + '<div id="swipebox-slider">'
                  + '</div>'
                  + '<a id="swipebox-close"></a>'
                  + '<a id="swipebox-download">保存图片</a>'
                + '</div>'
              + '</div>',
        init: function (index) {
            this.index = index;
            this.eLen = this.defaultSetting.app === 'true' ? elements.length + 1 : elements.length;

            this.build(index);
            this.setSlide(index);
            this.close();
        },
        build: function (index) {

            var self = this;

            $('body').append(self.html);
            self.slider = document.getElementById('swipebox-slider');
            $('#swipebox-slider').css({
                width: self.eLen * device.width + 'px'
            });

            $.each(elements, function (index, element) {
                var img = $('<img />');
                img.attr('src', element.src);
                img.css({
                    position: 'absolute',
                    width: '100%',
                    left: 0,
                    top: (device.height - img[0].height * device.width / img[0].width) / 2 + 'px'
                });

                var slide = $('<div class="slide"'
                + 'style="width:' + device.width + 'px;height:' + device.height + 'px;float:left;">');
                slide.append(img);
                $('#swipebox-slider').append(slide);
            });

            this.defaultSetting.app === 'true' ? self.appdownload() : false;
            self.setDim(index);
            self.actions();

        },
        actions: function () {

            var self = this;
            var gesture = new Gesture(self.slider, {
                    preventY: true
                });

            gesture.on('swipe', function (e, data) {
                var currentIndex;

                switch (data.swipeDirection) {
                    case 'left':
                        currentIndex = self.index >= self.eLen - 1 ? self.eLen - 1 : ++self.index;
                        break;
                    case 'right':
                        currentIndex = self.index <= 0 ? 0 : --self.index;
                        break;
                }

                self.setSlide(currentIndex);
                self.picdownload(currentIndex);
            });
        },
        setSlide: function (index) {
            var self = this;
            var currentX = index * device.width;
            // 实例化动画

            naboo.animate(self.slider,
            {
                'transform': 'translateX(-' + currentX + 'px)'
            }, {
                duration: '0.6s',
                ease: 'ease-out',
                delay: 0,
                mode: 'transition'
            }).start();
        },
        setDim: function (index) {
            var sliderCss = {};
            sliderCss = {
                width: device.width,
                height: device.height
            };
            // 设置container 尺寸
            $('#swipebox-overlay').css(sliderCss);

            var downloadLay = $('#swipebox-download').offset();

            $('#swipebox-download').css({
                left: (device.width - downloadLay.width) / 2
            });
            this.picdownload(index);
        },
        picdownload: function (index) {
            var download = $('#swipebox-download');
            if (index === this.eLen - 1) {
                download.html('下一组');
                download.attr('href', this.defaultSetting.nexturl);
                download.removeAttr('download');
            }
            else {
                download.html('保存图片');
                download.attr('href', elements[index].src);
                download.attr('download', true);
            }
        },
        appdownload: function () {
            var appdownload = $('<a href="' + this.defaultSetting.appurl + '" class="downloadApp" download>'
            + '<span id="app-image"></span><p>下载我要个性APP</p><p>获取更多高清头像</p></a>');

            var slide = $('<div class="slide" style="width:' + device.width + 'px;'
            + 'height:' + device.height + 'px;float:left;">');
            slide.append(appdownload);
            $('#swipebox-slider').append(slide);

            appdownload.css({
                display: 'block',
                color: '#fff',
                marginTop: (device.height - $('.downloadApp').height()) / 2 + 'px'
            });
        },
        close: function () {
            $('#swipebox-close').on('click', function () {
                $('#swipebox-overlay').remove();
            });
        }
    };

    customElement.prototype.build = function () {
        var element = this.element;
        var script = element.querySelector('script[type="application/json"]');
        var data = script ? JSON.parse(script.textContent.toString()) : null;
        elements = data.items;
        // 对象合并
        Object.assign(ui.defaultSetting, {
            app: element.getAttribute('data-app'),
            appurl: element.getAttribute('data-appurl'),
            nexturl: element.getAttribute('data-nexturl')
        }, ui.defaultSetting);
        templates.render(element, data).then(function (html) {
            element.innerHTML = html;
        });

        element.addEventListener('click', function (e) {
            if (e.target.nodeName === 'IMG') {
                var index = e.target.parentNode.getAttribute('data-index');
                ui.init(index);
            }
        });
    };

    return customElement;
});
