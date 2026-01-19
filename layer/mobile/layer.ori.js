/*!
 @Name：layer mobile v2.0 Web Popup Component
 @Author：XIANXIN
 @License：LGPL
 */

;!function (win) {

  "use strict";

  // var cssUrl = '//i.mazey.net/lib/layer/mobile/need/layer.css?2.0';
  var doc = document, query = 'querySelectorAll', claname = 'getElementsByClassName', S = function (s) {
    return doc[query](s);
  };

  //默认配置
  var config = {
    type: 0
    , shade: true
    , shadeClose: true
    , fixed: true
    , anim: 'scale' //默认动画类型
  };

  var ready = {
    extend: function (obj) {
      var newobj = JSON.parse(JSON.stringify(config));
      for (var i in obj) {
        newobj[i] = obj[i];
      }
      return newobj;
    },
    timer: {}, end: {}
  };

  //点触事件
  ready.touch = function (elem, fn) {
    elem.addEventListener('click', function (e) {
      fn.call(this, e);
    }, false);
  };

  var index = 0, classs = ['layui-m-layer'], Layer = function (options) {
    var that = this;
    that.config = ready.extend(options);
    that.view();
  };

  Layer.prototype.view = function () {
    var that = this, config = that.config, layerbox = doc.createElement('div');

    that.id = layerbox.id = classs[0] + index;
    layerbox.setAttribute('class', classs[0] + ' ' + classs[0] + (config.type || 0));
    layerbox.setAttribute('index', index);

    //标题区域
    var title = (function () {
      var titype = typeof config.title === 'object';
      return config.title
        ? '<h3 style="' + (titype ? config.title[1] : '') + '">' + (titype ? config.title[0] : config.title) + '</h3>'
        : '';
    }());

    //按钮区域
    var button = (function () {
      typeof config.btn === 'string' && (config.btn = [config.btn]);
      var btns = (config.btn || []).length, btndom;
      if (btns === 0 || !config.btn) {
        return '';
      }
      btndom = '<span yes type="1">' + config.btn[0] + '</span>'
      if (btns === 2) {
        btndom = '<span no type="0">' + config.btn[1] + '</span>' + btndom;
      }
      return '<div class="layui-m-layerbtn">' + btndom + '</div>';
    }());

    if (!config.fixed) {
      config.top = config.hasOwnProperty('top') ? config.top : 100;
      config.style = config.style || '';
      config.style += ' top:' + (doc.body.scrollTop + config.top) + 'px';
    }

    if (config.type === 2) {
      config.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (config.content || '') + '</p>';
    }

    if (config.skin) config.anim = 'up';
    if (config.skin === 'msg') config.shade = false;

    layerbox.innerHTML = (config.shade ? '<div ' + (typeof config.shade === 'string' ? 'style="' + config.shade + '"' : '') + ' class="layui-m-layershade"></div>' : '')
      + '<div class="layui-m-layermain" ' + (!config.fixed ? 'style="position:static;"' : '') + '>'
      + '<div class="layui-m-layersection">'
      + '<div class="layui-m-layerchild ' + (config.skin ? 'layui-m-layer-' + config.skin + ' ' : '') + (config.className ? config.className : '') + ' ' + (config.anim ? 'layui-m-anim-' + config.anim : '') + '" ' + (config.style ? 'style="' + config.style + '"' : '') + '>'
      + title
      + '<div class="layui-m-layercont">' + config.content + '</div>'
      + button
      + '</div>'
      + '</div>'
      + '</div>';

    if (!config.type || config.type === 2) {
      var dialogs = doc[claname](classs[0] + config.type), dialen = dialogs.length;
      if (dialen >= 1) {
        layer.close(dialogs[0].getAttribute('index'))
      }
    }

    document.body.appendChild(layerbox);
    var elem = that.elem = S('#' + that.id)[0];
    config.success && config.success(elem);

    that.index = index++;
    that.action(config, elem);
  };

  Layer.prototype.action = function (config, elem) {
    var that = this;

    //自动关闭
    if (config.time) {
      ready.timer[that.index] = setTimeout(function () {
        layer.close(that.index);
      }, config.time * 1000);
    }

    //确认取消
    var btn = function () {
      var type = this.getAttribute('type');
      if (type == 0) {
        config.no && config.no();
        layer.close(that.index);
      } else {
        config.yes ? config.yes(that.index) : layer.close(that.index);
      }
    };
    if (config.btn) {
      var btns = elem[claname]('layui-m-layerbtn')[0].children, btnlen = btns.length;
      for (var ii = 0; ii < btnlen; ii++) {
        ready.touch(btns[ii], btn);
      }
    }

    //点遮罩关闭
    if (config.shade && config.shadeClose) {
      var shade = elem[claname]('layui-m-layershade')[0];
      ready.touch(shade, function () {
        layer.close(that.index, config.end);
      });
    }

    config.end && (ready.end[that.index] = config.end);
  };

  win.layer = {
    v: '2.0',
    index: index,

    //核心方法
    open: function (options) {
      var o = new Layer(options || {});
      return o.index;
    },

    close: function (index) {
      var ibox = S('#' + classs[0] + index)[0];
      if (!ibox) return;
      ibox.innerHTML = '';
      doc.body.removeChild(ibox);
      clearTimeout(ready.timer[index]);
      delete ready.timer[index];
      typeof ready.end[index] === 'function' && ready.end[index]();
      delete ready.end[index];
    },

    //关闭所有layer层
    closeAll: function () {
      var boxs = doc[claname](classs[0]);
      for (var i = 0, len = boxs.length; i < len; i++) {
        layer.close((boxs[0].getAttribute('index') | 0));
      }
    }
  };

  'function' == typeof define ? define(function () {
    return layer;
  }) : function () {

    var js = document.scripts, script = js[js.length - 1], jsPath = script.src;
    var path = jsPath.substring(0, jsPath.lastIndexOf("/") + 1);

    //如果合并方式，则需要单独引入layer.css
    if (script.getAttribute('merge')) return;

    // document.head.appendChild(function () {
    //   var link = doc.createElement('link');
    //   link['data-src'] = path + 'need/layer.css?2.0';
    //   // https://github.com/layui/layer/blob/2.x/src/mobile/need/layer.css
    //   link.href = cssUrl; // '//i.mazey.net/lib/layer/mobile/need/layer.css?2.0';
    //   link.type = 'text/css';
    //   link.rel = 'styleSheet'
    //   link.id = 'layermcss';
    //   return link;
    // }());
    // lib/issues/13
    var styleStr = ".layui-m-layer{position:relative;z-index:19891014}.layui-m-layer *{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.layui-m-layershade,.layui-m-layermain{position:fixed;left:0;top:0;width:100%;height:100%}.layui-m-layershade{background-color:rgba(0,0,0,.7);pointer-events:auto}.layui-m-layermain{display:table;font-family:Helvetica,arial,sans-serif;pointer-events:none}.layui-m-layermain .layui-m-layersection{display:table-cell;vertical-align:middle;text-align:center}.layui-m-layerchild{position:relative;display:inline-block;text-align:left;background-color:#fff;font-size:14px;border-radius:5px;box-shadow:0 0 8px rgba(0,0,0,0.1);pointer-events:auto;-webkit-overflow-scrolling:touch}.layui-m-layerchild{-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:.2s;animation-duration:.2s}@-webkit-keyframes layui-m-anim-scale{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes layui-m-anim-scale{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.layui-m-anim-scale{animation-name:layui-m-anim-scale;-webkit-animation-name:layui-m-anim-scale}@-webkit-keyframes layui-m-anim-up{0%{opacity:0;-webkit-transform:translateY(800px);transform:translateY(800px)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes layui-m-anim-up{0%{opacity:0;-webkit-transform:translateY(800px);transform:translateY(800px)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}.layui-m-anim-up{-webkit-animation-name:layui-m-anim-up;animation-name:layui-m-anim-up}.layui-m-layer0 .layui-m-layerchild{width:90%;max-width:640px}.layui-m-layer1 .layui-m-layerchild{border:0;border-radius:0}.layui-m-layer2 .layui-m-layerchild{width:auto;max-width:260px;min-width:40px;border:0;background:0;box-shadow:none;color:#fff}.layui-m-layerchild h3{padding:0 10px;height:60px;line-height:60px;font-size:16px;font-weight:400;border-radius:5px 5px 0 0;text-align:center}.layui-m-layerchild h3,.layui-m-layerbtn span{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.layui-m-layercont{padding:50px 30px;line-height:22px;text-align:center}.layui-m-layer1 .layui-m-layercont{padding:0;text-align:left}.layui-m-layer2 .layui-m-layercont{text-align:center;padding:0;line-height:0}.layui-m-layer2 .layui-m-layercont i{width:25px;height:25px;margin-left:8px;display:inline-block;background-color:#fff;border-radius:100%}.layui-m-layer2 .layui-m-layercont p{margin-top:20px}@-webkit-keyframes layui-m-anim-loading{0%,80%,100%{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}@keyframes layui-m-anim-loading{0%,80%,100%{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}.layui-m-layer2 .layui-m-layercont i{-webkit-animation:layui-m-anim-loading 1.4s infinite ease-in-out;animation:layui-m-anim-loading 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}.layui-m-layer2 .layui-m-layercont i:first-child{margin-left:0;-webkit-animation-delay:-.32s;animation-delay:-.32s}.layui-m-layer2 .layui-m-layercont i.layui-m-layerload{-webkit-animation-delay:-.16s;animation-delay:-.16s}.layui-m-layer2 .layui-m-layercont>div{line-height:22px;padding-top:7px;margin-bottom:20px;font-size:14px}.layui-m-layerbtn{display:box;display:-moz-box;display:-webkit-box;width:100%;position:relative;height:50px;line-height:50px;font-size:0;text-align:center;border-top:1px solid #d0d0d0;background-color:#f2f2f2;border-radius:0 0 5px 5px}.layui-m-layerbtn span{position:relative;display:block;-moz-box-flex:1;box-flex:1;-webkit-box-flex:1;text-align:center;font-size:14px;border-radius:0 0 5px 5px;cursor:pointer}.layui-m-layerbtn span[yes]{color:#40affe}.layui-m-layerbtn span[no]{border-right:1px solid #d0d0d0;border-radius:0 0 0 5px}.layui-m-layerbtn span:active{background-color:#f6f6f6}.layui-m-layerend{position:absolute;right:7px;top:10px;width:30px;height:30px;border:0;font-weight:400;background:transparent;cursor:pointer;-webkit-appearance:none;font-size:30px}.layui-m-layerend::before,.layui-m-layerend::after{position:absolute;left:5px;top:15px;content:'';width:18px;height:1px;background-color:#999;transform:rotate(45deg);-webkit-transform:rotate(45deg);border-radius:3px}.layui-m-layerend::after{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}body .layui-m-layer .layui-m-layer-footer{position:fixed;width:95%;max-width:100%;margin:0 auto;left:0;right:0;bottom:10px;background:0}.layui-m-layer-footer .layui-m-layercont{padding:20px;border-radius:5px 5px 0 0;background-color:rgba(255,255,255,.8)}.layui-m-layer-footer .layui-m-layerbtn{display:block;height:auto;background:0;border-top:0}.layui-m-layer-footer .layui-m-layerbtn span{background-color:rgba(255,255,255,.8)}.layui-m-layer-footer .layui-m-layerbtn span[no]{color:#fd482c;border-top:1px solid #c2c2c2;border-radius:0 0 5px 5px}.layui-m-layer-footer .layui-m-layerbtn span[yes]{margin-top:10px;border-radius:5px}body .layui-m-layer .layui-m-layer-msg{width:auto;max-width:90%;margin:0 auto;bottom:-150px;background-color:rgba(0,0,0,.7);color:#fff}.layui-m-layer-msg .layui-m-layercont{padding:10px 20px}";
    function addStyle(style, options) {
      if (options === void 0) {
        options = {
          id: ""
        };
      }
      if (!style) {
        return false;
      }
      // 创建 style 文档碎片
      var styleFrag = document.createDocumentFragment();
      var idDom = null;
      var domId = "";
      // Custom Style
      var customStyle = document.createElement("style");
      // 如果需要 ID
      if (options.id) {
        domId = "".concat(options.id);
        idDom = document.getElementById(domId);
        // 如果 Dom 不存在，插入 style
        if (!idDom) {
          customStyle.setAttribute("id", options.id);
          customStyle.innerHTML = style;
          styleFrag.appendChild(customStyle);
          document.head.appendChild(styleFrag);
        } else {
          // 如果 Dom 存在，直接更新
          idDom.innerHTML = style;
        }
      } else {
        // 不需要 ID，直接添加新标签
        customStyle.innerHTML = style;
        styleFrag.appendChild(customStyle);
        document.head.appendChild(styleFrag);
      }
      return true;
    }
    addStyle(styleStr, {id: 'layer-mobile-style'});
  }();

}(window);
