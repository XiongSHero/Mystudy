(function (global, factor, plug) {
  factor.call(global, global.jQuery, plug)
})(window, function ($, plug) {
  var _DEFS_ = {
    _find_: 'input, select, list, textarea',
    _filter_: '[type=submit], [type=reset], [type=image], [type=button]'
  }
  /* 默认配置 */
  var _OPS_ = {
    raise: 'change'
  };
  /* 规则引擎配置 */
  var _RULES_ = {
    'required': function () {
      var val = this.val()
      return val !== null && val !== 'undefined' && val !== ''
    },
    'email': function () {
      return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.val())
    },
    'regex': function (config) {
      return new RegExp(config).test(this.value)
    },
    'interger': function () {
      return false
    },
    'number': function () {
      return false
    },
    'min': function () {
      return false
    },
    'max': function () {
      return false
    },

  }
  /* 闭包 */
  $.fn[plug] = function (options) {
    var $this = $(this);
    options = $.extend(_OPS_, options)
    var $flieds = $this.find(_DEFS_._find_).not(_DEFS_._filter_)
    $flieds.on(options.raise, function (e) {
      var $filed = $(this);
      var result = true;
      $.each(_RULES_, function (rule, valid) {
        $filed.next('.help-block').remove();
        if($filed.data(rule)){
          result = valid.call($filed,$filed.data(rule));
          $filed.parents('.form-group').addClass(result?'has-success':'has-error').removeClass(result?'has-error':'has-success')
          result ? $filed.next('.help-block').remove() : $filed.after('<span class="help-block">'+ $filed.data('error') + '</span>')
          return result
        }
      })
    })
  }
}, 'bootstrapValidateor');
