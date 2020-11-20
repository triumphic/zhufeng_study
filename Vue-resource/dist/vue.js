(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var oldArrayProtoMethods = Array.prototypel; //不能直接改写数组原有方法  不可靠，因为只有被vue控制的数组才需要改写

  var arrayMethods = Object.create(Array.prototype);
  var methods = [//concat slice 都不能改变原数组
  'push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'];
  methods.forEach(function (method) {
    //AOP切片编程
    arrayMethods[method] = function () {
      var _oldArrayProtoMethods;

      //重写数组方法
      console.log("数组变化"); //有可能用户新增的数据是对象格式  也需要进行拦截

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = (_oldArrayProtoMethods = oldArrayProtoMethods[method]).call.apply(_oldArrayProtoMethods, [this].concat(args));

      var inserted;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          //splice(0, 1, xxx)
          inserted = args.slice(2);
      }

      if (inserted) this.__ob__.observeArray(inserted); //this指的是value

      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      //需要对value属性重新定义
      //value可能是对象， 可能是数组， 分类来处理
      // value.__ob__ = this;    //this指的是Observer     这种方式会引起循环引用，换成Object.defineProperty  __ob__enumerable设置为不可枚举
      Object.defineProperty(value, '__ob__', {
        value: this,
        enumerable: false,
        //不能被枚举表示  不能被循环
        configurable: false //补鞥呢删除此属性

      });

      if (Array.isArray(value)) {
        //数组不用defineProperty类进行代理  性能不好
        //push shift reverse sort pop unshift splice ...  重写数组的方法
        Object.setPrototypeOf(value, arrayMethods); //value.__proto__ = arrayMethods    vue的数组中，使用重写的方法，会先找改写后的（arrayMethods中的），若没有，在根据原型链查找Array上的

        this.observeArray(value); //处理原有数组中的对象
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        for (var i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    //vue2中数据嵌套不要过深， 过深浪费性能
    //value可能也是个对象
    if (_typeof(data) !== 'object' || data == null) {
      return;
    }

    observe(value); //对结果递归拦截

    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        observe(newValue); //如果用户设置的是一个对象  就继续讲用户设置的对象变成响应式的

        value = newValue;
      }
    });
  }
  function observe(data) {
    //只对对象类型进行观测，非对象类型无法观测
    if (_typeof(data) !== 'object' || data == null) {
      return;
    }

    if (data.__ob__) {
      //防止循环引用
      return;
    } //通过类实现对数据的观测  类可以方便扩展，会产生实例


    return new Observer(data);
  }

  function initState(vm) {
    //将所有数据都定义在vm属性上，并且后续更改  需要触发视图更新
    var opts = vm.$options; //获取用户属性

    if (opts.data) {
      //数据的初始化
      initData(vm);
    }
  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }

  function initData(vm) {
    //数据劫持  Object.defineProperty
    var data = vm.$options.data; //对data类型进行判断  如果是函数  获取函数返回值作为对象

    data = vm._data = typeof data === 'function' ? data.call(vm) : data; //通过vm._data 获取劫持后的数据，用户就可以拿到_data了
    //将_data中的数据全部放到vm上

    for (var key in data) {
      proxy(vm, '_data', key); //vm.name => vm._data.name
    } //观测这个数据


    observe(data);
  }

  function compileToFunctions(template) {
    console.log(template);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; //实例上有个属性$options  表示的是用户传入的所有属性
      //初始化状态

      initState(vm);

      if (vm.$options.el) {
        //数据可以挂载到页面上
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      el = document.querySelector(el);
      var vm = this;
      var options = vm.$options;

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        } //如何将模板编译成render函数


        var render = compileToFunctions(template);
        options.render = render;
      }
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
