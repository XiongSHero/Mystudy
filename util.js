var util = (function() {
  return {
    /* 获取元素数组 */
    $: function(parentNode, selector) {
      return [].slice.call(parentNode.querySelectorAll(selector));
    },
    /* 把html装换为节点 */
    html2node: function(str) {
      var div = document.createElement("div");
      div.innerHTML = str;
      return div.children[0];
    },
    /* 防抖（频繁触发事件时，控制频率） */
    throttle: function (func, wait, option) {
      var context,args,lastTime = 0, now = Date.now(), remaining, timeout = null, result;
      if(!option) option = {};
      var later = function () {
          lastTime = option.training === false ? 0 : Date.now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) context = args = null
      }
      return function () {
        if(!lastTime && option.leading === false) {
          lastTime = now;
        }
        remaining = wait - (now - lastTime);
        context = this;
        args = arguments;
        if(remaining <= 0){
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          lastTime = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        } else if(!timeout && option.leading !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      }
  },
    /* jQuery 复制
     *参数 （可选） Boolean true 深复制； false 浅复制
     * 参数 复制对象 数组或者对象
     * 参数 被复制对象 数组或者对象
     */
    extend: function() {
      var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

      // Handle a deep copy situation
      if (typeof target === "boolean") {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
      }
      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== "object" && !isFunction(target)) {
        target = {};
      }


      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
          // Extend the base object
          for (name in options) {
            copy = options[name];

            // Prevent Object.prototype pollution
            // Prevent never-ending loop
            if (name === "__proto__" || target === copy) {
              continue;
            }

            // Recurse if we're merging plain objects or arrays
            if (
              deep &&
              copy &&
              ({}.toString.call(copy) === '[object Object]' ||
                (copyIsArray = Array.isArray(copy)))
            ) {
              src = target[name];

              // Ensure proper type for the source value
              if (copyIsArray && !Array.isArray(src)) {
                clone = [];
              } else if (!copyIsArray && !{}.toString.call(src) === '[object Object]') {
                clone = {};
              } else {
                clone = src;
              }
              copyIsArray = false;

              // Never move original objects, clone them
              target[name] = this.extend(deep, clone, copy);

              // Don't bring in undefined values
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }

      // Return the modified object
      return target;
    },
    /* 添加元素类名 */
    addClass: function(node, className) {
      var current = node.className || "";
      if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
        node.className = current ? current + " " + className : className;
      }
    },
    /* 获取样式*/
    getStyle: function getStyle(obj, attr) {
      return obj.currentStyle
        ? obj.currentStyle[attr]
        : getComputedStyle(obj)[attr];
    },
    /*基础移动*/
    doMove: function(obj, attr, speed, target, endfn) {
      clearInterval(obj.timer);
      obj.timer = setInterval(function() {
        var pos = parseFloat(this.getStyle(obj, attr)) + speed;
        if (pos < target && speed < 0) {
          pos = target;
        }
        if (pos > target && speed > 0) {
          pos = target;
        }
        obj.style[attr] = pos + "px";
        if (pos == target || speed == 0) {
          clearInterval(obj.timer);
          endfn && endfn();
        }
      }, 30);
    },
    /*完美运动，多个值，缓冲运动*/
    startMove: function(obj, json, fnEnd) {
      var speed = 0;
      clearInterval(obj.timer);
      obj.timer = setInterval(function() {
        var bStop = true; // 假设所有的值都到达目标点
        for (var attr in json) {
          var pos = 0;
          pos =
            attr == "opacity"
              ? Math.round(parseFloat(this.getStyle(obj, attr)) * 100)
              : parseInt(this.getStyle(obj, attr));
          var speed = (json[attr] - pos) / 20;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          if (pos != json[attr]) {
            bStop = false;
          }
          if (attr == "opacity") {
            obj.style.opacity = (pos + speed) / 100;
            obj.style.filter = 'alpha(opacity:"+( pos + speed )+")';
          } else {
            obj.style[attr] = pos + speed + "px";
          }
        }
        if (bStop) {
          clearInterval(obj.timer);
          if (fnEnd) {
            fnEnd();
          }
        }
      }, 30);
    },
    // new 关键字的实现 参数（构造函数，构造函数的参数）
    Mnew: function() {
      var constructor = Array.prototype.shift.call(arguments);
      var obj = Object.create(constructor.prototype);
      // obj.__proto__ = constructor.prototype;
      var result = constructor.call(obj, arguments);
      return typeof result ? result || obj : obj;
    },
    // bind源码实现 1保存this 2 传参 3 构造函数
    bind: function(context) {
      var self = this;
      var args = [].slice.call(arguments, 1);
      var bound = function() {
        var bindArgs = [].slice.call(arguments);
        self.apply(
          this instanceof self ? this : context,
          args.concat(bindArgs)
        );
      };
      bound.prototype = self.prototype;
      return bound;
    },
    /* 删除元素类名 */
    delClass: function(node, className) {
      var current = node.className || "";
      node.className = (" " + current + " ")
        .replace(" " + className + " ", " ")
        .trim();
    },
    inherit: function(Target, Origin) {
      var Buffer = function() {};
      Buffer.prototype = Origin.prototype;
      Target.prototype = new Buffer();
      Target.prototype.constructor = Target;
      Target.prototype.super_class = Origin;
    },
    /* 事件发射器 */
    emitter: {
      on: function(event, fn) {
        var handles = this._handles || (this._handles = {}),
          calls = handles[event] || (handles[event] = []);
        calls.push(fn);
        return this;
      },
      off: function(event, fn) {
        if (!event || !this._handles) this._handles = {};
        if (!this._handles) return;

        var handles = this._handles,
          calls;

        if ((calls = handles[event])) {
          if (!fn) {
            handles[event] = [];
            return this;
          }
          // 找到栈内对应listener 并移除
          for (var i = 0, len = calls.length; i < len; i++) {
            if (fn === calls[i]) {
              calls.splice(i, 1);
              return this;
            }
          }
        }
        return this;
      },
      emit: function(event) {
        var args = [].slice.call(arguments, 1),
          handles = this._handles,
          calls;
        if (!handles || !(calls = handles[event])) return this;
        for (var i = 0, len = calls.length; i < len; i++) {
          calls[i].apply(this, args);
        }
        return this;
      }
    }
  };
})();
