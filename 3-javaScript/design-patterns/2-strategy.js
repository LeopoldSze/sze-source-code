/**
 * 案例1：计算奖金
 */
const strategies = {
  S: function (salary) {
    return salary * 4;
  },
  A: function (salary) {
    return salary * 3;
  },
  B: function (salary) {
    return salary * 2;
  }
};

const calculate = function (level, salary) {
  return strategies[level](salary);
};

console.log(calculate('S', 20000));
console.log(calculate('A', 10000));
console.log(calculate('B', 5000));

/**
 * 案例2：表单验证
 */
const strategiesForm = {
  isNonEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function (value, errorMsg) {
    if (!/^1[3|5|8]\d{9}$/.test(value)) {
      return errorMsg;
    }
  }
}

const Validator = function () {
  this.cache = []
}
Validator.prototype.add = function (dom, rules) {
  const self = this;
  
  for (let i = 0, rule= rules[i]; i < rules.length; i++) {
    (function (rule) {
      const strategyArray = rule.strategy.splice(':');
      const errorMsg = rule.errorMsg;
      
      self.cache.push(function () {
        const strategy = strategyArray.shift();
        strategyArray.unshift(dom.value);
        strategyArray.push(errorMsg);
        return strategies[strategy].apply(dom, strategyArray);
      });
    })(rule)
  }
}