var util = (function (){
    return {
        $: function (parentNode, selector){
            return [].slice.call(parentNode.querySelectorAll(selector));
        },
        html2node: function (str){
            var div = document.createElement('div');
            div.innerHTML = str;
            return div.children[0];
        },
        extend: function(o1, o2) {
            for(var i in o2){
                if(o1[i] == undefined){
                    o1[i] = o2[i];
                }
            }
        },
        addClass: function (node, className) {
            var current = node.className || "";
            if((" " + current + " ").indexOf(" " + className + " ") === -1){
                node.className = current ? (current + " " + className) : className;
            }
        },
        // new 关键字的实现 参数（构造函数，构造函数的参数）
        Mnew: function () {
          var constructor = Array.prototype.shift.call(arguments);
            var obj = Object.create(constructor.prototype);
            // obj.__proto__ = constructor.prototype;
            var result = constructor.call(obj, arguments);
            return typeof result ? result || obj : obj;
        },
        // bind源码实现 1保存this 2 传参 3 构造函数
        bind: function (context) {
              var self = this;
              var args = [].slice.call(arguments, 1);
              var bound = function () {
                var bindArgs = [].slice.call(arguments)
                self.apply(this instanceof self ? this : context , args.concat(bindArgs))
              }
              bound.prototype = self.prototype
              return bound
            }
        delClass: function (node, className) {
            var current = node.className || "";
            node.className = (" " + current + " ").replace(" " + className + " "," ").trim();
        },
        inherit: function (Target, Origin) {
            var Buffer = function (){};
            Buffer.prototype = Origin.prototype;
            Target.prototype = new Buffer();
            Target.prototype.constructor = Target;
            Target.prototype.super_class = Origin;
        },
        emitter:{
            on: function (event, fn) {
                var handles = this._handles || (this._handles = {}),
                  calls = handles[event] || (handles[event] = []);
                  calls.push(fn);
                  return this;
            },
            off: function (event, fn){
                if(!event || !this._handles) this._handles = {};
                if(!this._handles) return;

                var handles =this._handles, calls;

                if(calls = handles[event]) {
                    if(!fn){
                        handles[event] = [];
                        return this;
                    }
                    // 找到栈内对应listener 并移除
                    for(var i = 0, len = calls.length; i < len; i++){
                        if(fn === calls[i]){
                            calls.splice(i, 1);
                            return this;
                        }
                    }
                }
              return this;
            },
            emit: function (event) {
                var args = [].slice.call(arguments, 1),
                  handles = this._handles, calls;
                if(!handles || !(calls = handles[event])) return this;
                for(var i = 0, len = calls.length; i < len; i++){
                    calls[i].apply(this, args);
                }
                return this;
            }
        }
    }
})();