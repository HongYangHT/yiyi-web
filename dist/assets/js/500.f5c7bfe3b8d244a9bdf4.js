(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"9N3L":function(t,e,n){},TPMt:function(t,e,n){"use strict";var c=n("xHqa"),i=n.n(c),s=(n("f3/d"),n("GVEf"),n("RQ3N"),n("7t/g")),o=n.n(s),a={name:"ExceptionFrame",components:i()({},o.a.name,o.a),props:{type:{type:String,default:"404"}},data:function(){return{config:{403:{title:"403",desc:"抱歉，你无权访问该页面"},404:{title:"404",desc:"抱歉，你访问的页面不存在或仍在开发中"},500:{title:"500",desc:"抱歉，服务器出错了"}},prefix:"exception"}},methods:{$_handleToHome:function(){this.$router.push("/")}}},r=(n("geC7"),n("KHd+")),l=Object(r.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.prefix},[n("div",{class:t.prefix+"__content"},[n("h1",[t._v(t._s(t.config[t.type].title))]),t._v(" "),n("div",{class:t.prefix+"__content__desc"},[t._v("\n      "+t._s(t.config[t.type].desc)+"\n    ")]),t._v(" "),n("div",{class:t.prefix+"__action"},[n("el-button",{attrs:{type:"primary"},on:{click:t.$_handleToHome}},[t._v("\n        返回首页\n      ")])],1)])])}),[],!1,null,null,null);e.a=l.exports},geC7:function(t,e,n){"use strict";var c=n("9N3L");n.n(c).a},kVru:function(t,e,n){"use strict";n.r(e);var c={components:{ExceptionFrame:n("TPMt").a}},i=n("KHd+"),s=Object(i.a)(c,(function(){var t=this.$createElement;return(this._self._c||t)("exception-frame",{attrs:{type:"500"}})}),[],!1,null,null,null);e.default=s.exports}}]);