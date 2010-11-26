/*
 * Validator.js   v.pre
 * by aef (aef@catch-colt.com) 
 *
 * Copyright (C) 2010 Adrian Fraiha
 * Licensed under GPLv3 (http://gnu.org/licenses/gpl.html)
 */ 

function Validator(rules) {
  this._rules = rules;
}

Validator.prototype.validate = function() {
  var rule,ele,errNode,range,regex;
  var validates = true;
  for(rule in this._rules) {
    ele = document.getElementById(rule);

    if(this._rules[rule].hasOwnProperty('required') && this._rules[rule].required) {
      if(!this.is_present(ele)) {
        errNode = this.errorNode(this.messages.required);
        this.appendError(ele,errNode);
        validates = false;
      }
    }
    if(this._rules[rule].hasOwnProperty('custom')) {
      regex = new RegExp(this._rules[rule].custom.regex);
      if(!regex.test(ele.value)) {
        errNode = this.errorNode(this._rules[rule].custom.message);
        this.appendError(ele,errNode);
        validates = false;
      }
    }
    if(this._rules[rule].hasOwnProperty('contains')) {
      if(!this._rules[rule].contains.data.has(ele.value)) {
        errNode = this.errorNode(this._rules[rule].contains.message);
        this.appendError(ele,errNode); 
        validates = false;
      }
    }
  }
  return validates;
}

Validator.prototype.appendError = function(ele,errNode) {
  range = document.createRange();
  range.setStartAfter(ele);
  range.insertNode(errNode);
}

Validator.prototype.errorNode = function(msg) {
  var ele = document.createElement('span');
  ele.setAttribute('class', 'error-message');
  ele.innerHTML = msg;
  return ele; 
}

Validator.prototype.removeErrors = function() {
  var errs = document.getElementsByClassName('error-message');
  var len = errs.length;
  for(var i=len-1; i>=0;i--) 
    errs[i].parentNode.removeChild(errs[i]);
}

Validator.prototype.is_present = function(ele) {
  return (ele.value.length == 0 || ele.value.trim == '') ? false : true;
}

Validator.prototype.messages = {
  required : "This field is required."
}

/* Utility Functions */
String.prototype.trim = function() { //adapted from stevenlevithan.com
  var str = this.replace(/^\s\s*/, ''),
      ws = /\s/,
      i = str.length;
  while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
}
Array.prototype.has = function(value) {
  value = value.toLowerCase();
  for(var i=0, len=this.length; i < len; i++) {
    if(this[i].toLowerCase() == value)
      return true;
  }
  return false;
}
