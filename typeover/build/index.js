module.exports=(()=>{"use strict";var e={352:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});var n,o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(297),a=(n=i)&&n.__esModule?n:{default:n},s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(648));function c(e){return function(){var t=e.apply(this,arguments);return new Promise((function(e,r){return function n(o,i){try{var a=t[o](i),s=a.value}catch(e){return void r(e)}if(!a.done)return Promise.resolve(s).then((function(e){n("next",e)}),(function(e){n("throw",e)}));e(s)}("next")}))}}r(654);var u={input:"",error:!1,complete:!1},l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.processProps=r.processProps.bind(r),r.handleKey=r.handleKey.bind(r),r.validate=r.validate.bind(r),r.checkComplete=r.checkComplete.bind(r),r.processProps(e),r.state=u,r}var r,n;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"processProps",value:function(e){if(!e.text||"string"!=typeof e.text)throw RangeError("Text must be provided as a string");this.text=e.text.trim(),this.holdOnError=void 0!==e.holdOnError&&e.holdOnError,this.hint=void 0===e.hint||e.hint,this.onError=e.onError?e.onError:function(){},this.onComplete=e.onComplete?e.onComplete:function(){},this.id=e.id?e.id:"typeover-wrapper",this.className=e.className?e.className+" ":"",this.styles=void 0!==e.styles?e.styles:{},this.leadSpaces=this.text.slice(0,s.countLeadSpaces(this.text))}},{key:"componentDidUpdate",value:function(e){if(this.props!==e)return this.processProps(this.props),void this.setState(u)}},{key:"handleKey",value:(n=c(regeneratorRuntime.mark((function e(t){var r,n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=this.state.input,n=t.key,t.preventDefault(),e.t0=s.type(t.keyCode),e.next="BACK"===e.t0?6:"SPACE"===e.t0?11:"PRINTABLE"===e.t0?14:16;break;case 6:return o=s.countTailSpaces(r),e.next=9,this.setState({input:r.slice(0,o>0?-o:-1)});case 9:return this.state.error&&this.validate(),e.abrupt("break",16);case 11:return this.holdOnError&&this.state.error||this.setState({input:r+n}),this.validate(!0),e.abrupt("break",16);case 14:return this.holdOnError&&this.state.error||this.setState({input:r+n}),e.abrupt("break",16);case 16:this.checkComplete();case 17:case"end":return e.stop()}}),e,this)}))),function(e){return n.apply(this,arguments)})},{key:"validate",value:(r=c(regeneratorRuntime.mark((function e(){var t,r,n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n?s.roundedString(this.state.input.length-1,this.text):this.text.slice(0,this.state.input.length),(r=s.fuzzyMatch(this.state.input,t))||this.onError(),!this.holdOnError){e.next=6;break}return e.next=6,this.setState({error:!r});case 6:!n||this.holdOnError&&!r||this.setState({input:t});case 7:case"end":return e.stop()}}),e,this)}))),function(){return r.apply(this,arguments)})},{key:"checkComplete",value:function(){!this.state.error&&this.state.input.length>=this.text.length&&this.text.length>0&&(this.setState({complete:!0}),this.onComplete())}},{key:"render",value:function(){var e=this.state.complete;return a.default.createElement("div",{id:this.id,tabIndex:"0",className:this.className+(e?"typeover-complete":""),onKeyDown:e?null:this.handleKey,style:this.styles},a.default.createElement("span",{id:"typeover-input",className:this.state.error?"typeover-error":"typeover-show"},this.leadSpaces,this.state.input),a.default.createElement("span",{id:"typeover-reference",className:this.hint?"typeover-hint":"typeover-hide"},this.text.slice(this.state.input.length)))}}]),t}(i.Component);t.default=l},648:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.type=function(e){return 32===e?"SPACE":8===e?"BACK":e>64&&e<91||e>185&&e<192||222===e?"PRINTABLE":void 0},t.roundedString=function(e,t){var n=t.slice(e).search(/\n|\s/),o=e+n;return-1===n?t:t.slice(0,o+r(t.slice(o)))};var r=t.countLeadSpaces=function(e){return e.search(/\S./)},n=(t.countTailSpaces=function(e){var t=e.split("").reverse().join("");return r(t)},t.fuzzyMatch=function(e,t){var r=e.replace(/[^\w\s]|_/g,"").trim().toUpperCase(),o=t.replace(/[^\w\s]|_/g,"").trim().toUpperCase();return n(r,o)},t.anagrams=function(e,t){return e.split("").sort().join("")===t.split("").sort().join("")})},426:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(645),o=r.n(n)()((function(e){return e[1]}));o.push([e.id,"#typeover-input, #typeover-reference {\r\n  white-space: pre-wrap;\r\n}\r\n\r\n/** text classes **/\r\n\r\n.typeover-show {\r\n  color: #000;\r\n}\r\n\r\n.typeover-hint {\r\n  color: #999;\r\n}\r\n\r\n.typeover-hide {\r\n  visibility: hidden;\r\n}\r\n\r\n.typeover-error {\r\n  color: red;\r\n}",""]);const i=o},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r=e(t);return t[2]?"@media ".concat(t[2]," {").concat(r,"}"):r})).join("")},t.i=function(e,r,n){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(n)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);n&&o[c[0]]||(r&&(c[2]?c[2]="".concat(r," and ").concat(c[2]):c[2]=r),t.push(c))}},t}},654:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});var n=r(379),o=r.n(n),i=r(426);o()(i.Z,{insert:"head",singleton:!1});const a=i.Z.locals||{}},379:(e,t,r)=>{var n,o=function(){var e={};return function(t){if(void 0===e[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}e[t]=r}return e[t]}}(),i=[];function a(e){for(var t=-1,r=0;r<i.length;r++)if(i[r].identifier===e){t=r;break}return t}function s(e,t){for(var r={},n=[],o=0;o<e.length;o++){var s=e[o],c=t.base?s[0]+t.base:s[0],u=r[c]||0,l="".concat(c," ").concat(u);r[c]=u+1;var p=a(l),h={css:s[1],media:s[2],sourceMap:s[3]};-1!==p?(i[p].references++,i[p].updater(h)):i.push({identifier:l,updater:v(h,t),references:1}),n.push(l)}return n}function c(e){var t=document.createElement("style"),n=e.attributes||{};if(void 0===n.nonce){var i=r.nc;i&&(n.nonce=i)}if(Object.keys(n).forEach((function(e){t.setAttribute(e,n[e])})),"function"==typeof e.insert)e.insert(t);else{var a=o(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var u,l=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function p(e,t,r,n){var o=r?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(e.styleSheet)e.styleSheet.cssText=l(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function h(e,t,r){var n=r.css,o=r.media,i=r.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var d=null,f=0;function v(e,t){var r,n,o;if(t.singleton){var i=f++;r=d||(d=c(t)),n=p.bind(null,r,i,!1),o=p.bind(null,r,i,!0)}else r=c(t),n=h.bind(null,r,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(r)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n));var r=s(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var n=0;n<r.length;n++){var o=a(r[n]);i[o].references--}for(var c=s(e,t),u=0;u<r.length;u++){var l=a(r[u]);0===i[l].references&&(i[l].updater(),i.splice(l,1))}r=c}}}},297:e=>{e.exports=require("react")}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={id:n,exports:{}};return e[n](o,o.exports,r),o.exports}return r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(352)})();