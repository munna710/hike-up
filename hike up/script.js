
        !function()
        {
            "use strict";
            var w,n,y,E;
            function u(t)
            {
                this.time=t.time,
                this.target=t.target,
                this.rootBounds=c(t.rootBounds),
                this.boundingClientRect=c(t.boundingClientRect),
                this.intersectionRect=c(t.intersectionRect||r()),
                this.isIntersecting=!!t.intersectionRect;
                var e=this.boundingClientRect,
                n=e.width*e.height,
                o=this.intersectionRect,
                i=o.width*o.height;
                this.intersectionRatio=n?
                Number((i/n).toFixed(4)):
                this.isIntersecting?1:0
            }
            function t(t,e)
            {
                var n,o,i,r=e||{};
                if("function"!=typeof t)throw new Error("callback must be a function");
                if(r.root&&1!=r.root.nodeType)throw new Error("root must be an Element");
                this._checkForIntersections=(n=this._checkForIntersections.bind(this),
                o=this.THROTTLE_TIMEOUT,
                i=null,function()
                {i=i||setTimeout(function(){n(),
                    i=null},o)
                }
                ),
                    this._callback=t,
                    this._observationTargets=[],
                    this._queuedEntries=[],
                    this._rootMarginValues=this._parseRootMargin(r.rootMargin),
                    this.thresholds=this._initThresholds(r.threshold),
                    this.root=r.root||null,
                    this.rootMargin=this._rootMarginValues.map(function(t)
                    {
                        return t.value+t.unit
                    }).join(" "),
                    this._monitoringDocuments=[],
                    this._monitoringUnsubscribes=[]
                }
                function s(t,e,n,o)
                {
                    "function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):
                    "function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)
                }
                function a(t,e,n,o)
                {
                    "function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):
                    "function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)
                }
                function I(t)
                {
                    var e;
                    try{e=t.getBoundingClientRect()
                }
                catch(t){}
                return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):r()}
                function r(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}
                function c(t)
                {
                    return!t||"x"in t?t:{top:t.top,y:t.top,bottom:t.bottom,left:t.left,x:t.left,right:t.right,width:t.width,height:t.height}
                }
                function R(t,e)
                {
                    var n=e.top-t.top,o=e.left-t.left;
                    return{top:n,left:o,height:e.height,width:e.width,bottom:n+e.height,right:o+e.width}
                }
                function e(t,e)
                {
                    for(var n=e;n;)
                    {
                        if(n==t)
                        return!0;
                        n=T(n)
                    }return!1
                }function T(t)
                {
                    var e=t.parentNode;
                    return 9==t.nodeType&&t!=w?l(t):e&&11==e.nodeType&&e.host?e.host:e&&e.assignedSlot?e.assignedSlot.parentNode:e
                }
                function l(t)
                {
                    try
                    {
                        return t.defaultView&&t.defaultView.frameElement||null}catch(t){return null
                        }
                }"object"==typeof window&&("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype?"isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,
                    "isIntersecting",
                    {
                        get:function()
                        {
                            return 0<this.intersectionRatio}
                        }):
                        (w=window.document,n=[],E=y=null,t.prototype.THROTTLE_TIMEOUT=100,t.prototype.POLL_INTERVAL=null,t.prototype.USE_MUTATION_OBSERVER=!0,t._setupCrossOriginUpdater=function()
                        {
                            return y=y||function(t,e)
                            {
                                E=t&&e?R(t,e):r(),n.forEach(function(t)
                            {
                                t._checkForIntersections()
                            })}
                        },
                        t._resetCrossOriginUpdater=function()
                        {
                            E=y=null},
                            t.prototype.observe=function(e)
                            {
                                if(!this._observationTargets.some(function(t){return t.element==e}))
                                {
                                    if(!e||1!=e.nodeType)throw new Error("target must be an Element");
                                    this._registerInstance(),
                                    this._observationTargets.push({element:e,entry:null}),
                                    this._monitorIntersections(e.ownerDocument),
                                    this._checkForIntersections()
                                }
                            },
                            t.prototype.unobserve=function(e)
                            {
                                this._observationTargets=this._observationTargets.filter(function(t)
                                {
                                    return t.element!=e
                                }),
                                this._unmonitorIntersections(e.ownerDocument),
                                0==this._observationTargets.length&&this._unregisterInstance()
                            },
                            t.prototype.disconnect=function()
                            {
                                this._observationTargets=[],
                                this._unmonitorAllIntersections(),
                                this._unregisterInstance()
                            },
                            t.prototype.takeRecords=function()
                            {
                                var t=this._queuedEntries.slice();
                                return this._queuedEntries=[],
                                t
                            },
                            t.prototype._initThresholds=function(t)
                            {
                                var e=t||[0];
                                return Array.isArray(e)||(e=[e]),
                                e.sort().filter(function(t,e,n)
                                {
                                    if("number"!=typeof t||isNaN(t)||t<0||1<t)
                                    throw new Error("threshold must be a number between 0 and 1 inclusively");
                                    return t!==n[e-1]
                                })
                            },
                            t.prototype._parseRootMargin=function(t)
                            {
                                var e=(t||"0px").split(/\s+/).map(function(t)
                                {
                                    var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);
                                    if(!e)throw new Error("rootMargin must be specified in pixels or percent");
                                    return{value:parseFloat(e[1]),unit:e[2]}});
                                    return e[1]=e[1]||e[0],e[2]=e[2]||e[0],
                                    e[3]=e[3]||e[1],e
                                },
                                t.prototype._monitorIntersections=function(e)
                                {
                                    var n,o,i,t,r=e.defaultView;
                                    r&&-1==this._monitoringDocuments.indexOf(e)&&(n=this._checkForIntersections,
                                        i=o=null,
                                        this.POLL_INTERVAL?o=r.setInterval(n,this.POLL_INTERVAL):(s(r,"resize",n,!0),
                                        s(e,"scroll",n,!0),
                                        this.USE_MUTATION_OBSERVER&&"MutationObserver"in r&&(i=new r.MutationObserver(n)).observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0
                                        })),
                                        this._monitoringDocuments.push(e),
                                        this._monitoringUnsubscribes.push(function()
                                        {
                                            var t=e.defaultView;
                                            t&&(o&&t.clearInterval(o),
                                            a(t,"resize",n,!0)),
                                            a(e,"scroll",n,!0),
                                            i&&i.disconnect()}),
                                            e==(this.root&&this.root.ownerDocument||w)||(t=l(e))&&this._monitorIntersections(t.ownerDocument))},
                                            t.prototype._unmonitorIntersections=function(o)
                                            {
                                                var i,t,e,n=this._monitoringDocuments.indexOf(o);
                                                -1!=n&&(i=this.root&&this.root.ownerDocument||w,
                                                    this._observationTargets.some(function(t)
                                                    {
                                                        if((e=t.element.ownerDocument)==o)
                                                        return!0;
                                                        for(;e&&e!=i;)
                                                        {
                                                            var e,n=l(e);
                                                            if((e=n&&n.ownerDocument)==o)
                                                            return!0
                                                        }return!1
                                                    })||
                                                    (t=this._monitoringUnsubscribes[n],
                                                        this._monitoringDocuments.splice(n,1),
                                                        this._monitoringUnsubscribes.splice(n,1),
                                                        t(),
                                                        o==i||(e=l(o))&&this._unmonitorIntersections(e.ownerDocument)))},
                                                        t.prototype._unmonitorAllIntersections=function()
                                                        {
                                                            var t=this._monitoringUnsubscribes.slice(0);
                                                            this._monitoringDocuments.length=0;
                                                            for(var e=this._monitoringUnsubscribes.length=0;e<t.length;e++)
                                                            t[e]()},
                                                            t.prototype._checkForIntersections=function()
                                                            {
                                                                var a,c;
                                                                !this.root&&y&&!E||(a=this._rootIsInDom(),c=a?this._getRootRect():r(),
                                                                this._observationTargets.forEach(function(t)
                                                                {
                                                                    var e=t.element,
                                                                    n=I(e),
                                                                    o=this._rootContainsTarget(e),
                                                                    i=t.entry,
                                                                    r=a&&o&&this._computeTargetAndRootIntersection(e,n,c),
                                                                    s=t.entry=new u({time:window.performance&&performance.now&&performance.now(),
                                                                        target:e,
                                                                        boundingClientRect:n,
                                                                        rootBounds:y&&!this.root?null:c,
                                                                        intersectionRect:r});
                                                                        i?a&&o?this._hasCrossedThreshold(i,s)&&this._queuedEntries.push(s):i&&i.isIntersecting&&this._queuedEntries.push(s):this._queuedEntries.push(s)
                                                                    },
                                                                    this),
                                                                    this._queuedEntries.length&&this._callback(this.takeRecords(),this))
                                                                },
                                                                t.prototype._computeTargetAndRootIntersection=function(t,e,n)
                                                                {
                                                                    if("none"!=window.getComputedStyle(t).display)
                                                                    {
                                                                        for(var o,i,r,s,a,c,u,l,h=e,d=T(t),f=!1;!f&&d;)
                                                                        {
                                                                            var p,g,_,m,v=null,b=1==d.nodeType?window.getComputedStyle(d):{};
                                                                            if("none"==b.display)return null;
                                                                            if(d==this.root||9==d.nodeType?(f=!0,d==this.root||d==w?y&&!this.root?!E||0==E.width&&0==E.height?h=v=d=null:v=E:v=n:(g=(p=T(d))&&I(p),
                                                                            _=p&&this._computeTargetAndRootIntersection(p,g,n),g&&_?(d=p,v=R(g,_)):h=d=null)):d!=(m=d.ownerDocument).body&&d!=m.documentElement&&"visible"!=b.overflow&&(v=I(d)),
                                                                            v&&(o=v,i=h,0,r=Math.max(o.top,i.top),
                                                                            s=Math.min(o.bottom,i.bottom),
                                                                            a=Math.max(o.left,i.left),
                                                                            c=Math.min(o.right,i.right),
                                                                            l=s-r,h=0<=(u=c-a)&&0<=l?{top:r,bottom:s,left:a,right:c,width:u,height:l}:null),!h)
                                                                            break;
                                                                            d=d&&T(d)}return h}},
                                                                            t.prototype._getRootRect=function()
                                                                            {
                                                                                var t,e,n;
                                                                                return n=this.root?I(this.root):(t=w.documentElement,e=w.body,
                                                                                    {
                                                                                        top:0,left:0,
                                                                                        right:t.clientWidth||e.clientWidth,
                                                                                        width:t.clientWidth||e.clientWidth,
                                                                                        bottom:t.clientHeight||e.clientHeight,height:t.clientHeight||e.clientHeight}),
                                                                                        this._expandRectByRootMargin(n)},
                                                                                        t.prototype._expandRectByRootMargin=function(n)
                                                                                        {
                                                                                            var t=this._rootMarginValues.map(function(t,e)
                                                                                            {
                                                                                                return"px"==t.unit?t.value:t.value*(e%2?n.width:n.height)/100}),
                                                                                                e={
                                                                                                    top:n.top-t[0],right:n.right+t[1],bottom:n.bottom+t[2],
                                                                                                    left:n.left-t[3]};
                                                                                                    return e.width=e.right-e.left,
                                                                                                    e.height=e.bottom-e.top,
                                                                                                    e
                                                                                                },
                                                                                                    t.prototype._hasCrossedThreshold=function(t,e)
                                                                                                    {
                                                                                                        var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,o=e.isIntersecting?e.intersectionRatio||0:-1;
                                                                                                        if(n!==o)
                                                                                                        for(var i=0;i<this.thresholds.length;i++)
                                                                                                        {
                                                                                                            var r=this.thresholds[i];
                                                                                                            if(r==n||r==o||r<n!=r<o)return!0}},
                                                                                                            t.prototype._rootIsInDom=function()
                                                                                                            {
                                                                                                                return!this.root||e(w,this.root)},
                                                                                                                t.prototype._rootContainsTarget=function(t)
                                                                                                                {
                                                                                                                    return e(this.root||w,t)&&(!this.root||this.root.ownerDocument==t.ownerDocument)},
                                                                                                                    t.prototype._registerInstance=function()
                                                                                                                    {
                                                                                                                        n.indexOf(this)<0&&n.push(this)},
                                                                                                                        t.prototype._unregisterInstance=function()
                                                                                                                        {
                                                                                                                            var t=n.indexOf(this);
                                                                                                                            -1!=t&&n.splice(t,1)},
                                                                                                                            window.IntersectionObserver=t,
                                                                                                                            window.IntersectionObserverEntry=u))
                                                                                                                        }(),
                                                                                                                        function(t,e)
                                                                                                                        {
                                                                                                                            "object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).LazyLoad=e()
                                                                                                                        }(this,function()
                                                                                                                        {
                                                                                                                            "use strict";function e(){return(e=Object.assign||function(t)
                                                                                                                                {
                                                                                                                                    for(var e=1;e<arguments.length;e++)
                                                                                                                                    {
                                                                                                                                        var n=arguments[e];
                                                                                                                                        for(var o in n)
                                                                                                                                        Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])
                                                                                                                                    }
                                                                                                                                    return t
                                                                                                                                })
                                                                                                                                .apply(this,arguments)
                                                                                                                            }
                                                                                                                            function r(t){
                                                                                                                                return e({},tt,t)
                                                                                                                            }
                                                                                                                            function i(t,e)
                                                                                                                            {
                                                                                                                                var n,o="LazyLoad::Initialized",
                                                                                                                                i=new t(e);
                                                                                                                                try
                                                                                                                                {
                                                                                                                                    n=new CustomEvent(o,{detail:{instance:i}})
                                                                                                                                }catch(t)
                                                                                                                                {
                                                                                                                                    (n=document.createEvent("CustomEvent")).initCustomEvent(o,!1,!1,{instance:i
                                                                                                                                    })
                                                                                                                                }
                                                                                                                                window.dispatchEvent(n)
                                                                                                                            }
                                                                                                                            function g(t,e){return t.getAttribute("data-"+e)
                                                                                                                        }
                                                                                                                        function s(t,e,n)
                                                                                                                        {
                                                                                                                            var o="data-"+e;null!==n?t.setAttribute(o,n):t.removeAttribute(o)
                                                                                                                        }
                                                                                                                        function a(t)
                                                                                                                        {
                                                                                                                            return g(t,nt)
                                                                                                                        }function c(t,e)
                                                                                                                        {return s(t,nt,e)}function u(t){return c(t,null),
                                                                                                                                0
                                                                                                                        }
                                                                                                                        function l(t){return null===a(t)
                                                                                                                        }
                                                                                                                        function h(t){return"native"===a(t)
                                                                                                                    }
                                                                                                                    function d(t,e,n,o)
                                                                                                                    {
                                                                                                                        t&&(void 0===o?void 0===n?t(e):t(e,n):t(e,n,o))
                                                                                                                    }
                                                                                                                    function f(t,e){Y?t.classList.add(e):t.className+=(t.className?" ":"")+e}function p(t,e)
                                                                                                                    {
                                                                                                                        Y?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")
                                                                                                                    }
                                                                                                                    function _(t)
                                                                                                                    {
                                                                                                                        return t.llTempImage
                                                                                                                    }
                                                                                                                    function m(t,e)
                                                                                                                    {
                                                                                                                        var n;!e||(n=e._observer)&&n.unobserve(t)
                                                                                                                    }
                                                                                                                    function v(t,e)
                                                                                                                    {
                                                                                                                        t&&(t.loadingCount+=e)
                                                                                                                    }
                                                                                                                    function b(t,e)
                                                                                                                    {
                                                                                                                        t&&(t.toLoadCount=e)
                                                                                                                    }
                                                                                                                    function o(t)
                                                                                                                    {
                                                                                                                        for(var e,n=[],o=0;e=t.children[o];o+=1)
                                                                                                                        "SOURCE"===e.tagName&&n.push(e);
                                                                                                                        return n
                                                                                                                    }
                                                                                                                    function n(t,e,n)
                                                                                                                    {
                                                                                                                        n&&t.setAttribute(e,n)
                                                                                                                    }
                                                                                                                    function w(t,e)
                                                                                                                    {
                                                                                                                        t.removeAttribute(e)
                                                                                                                    }
                                                                                                                    function y(t)
                                                                                                                    {
                                                                                                                        return!!t.llOriginalAttrs
                                                                                                                    }
                                                                                                                    function E(t)
                                                                                                                    {
                                                                                                                        var e;
                                                                                                                        y(t)||((e={}).src=t.getAttribute("src"),
                                                                                                                        e.srcset=t.getAttribute("srcset"),
                                                                                                                        e.sizes=t.getAttribute("sizes"),
                                                                                                                        t.llOriginalAttrs=e)
                                                                                                                    }
                                                                                                                    function I(t)
                                                                                                                    {
                                                                                                                        var e;
                                                                                                                        y(t)&&(e=t.llOriginalAttrs,
                                                                                                                            n(t,"src",e.src),
                                                                                                                            n(t,"srcset",e.srcset),
                                                                                                                            n(t,"sizes",e.sizes))
                                                                                                                        }
                                                                                                                        function R(t,e)
                                                                                                                        {
                                                                                                                            n(t,"sizes",g(t,e.data_sizes)),
                                                                                                                            n(t,"srcset",g(t,e.data_srcset)),
                                                                                                                            n(t,"src",g(t,e.data_src))
                                                                                                                        }function T(t)
                                                                                                                        {
                                                                                                                            w(t,"src"),
                                                                                                                            w(t,"srcset"),
                                                                                                                            w(t,"sizes")
                                                                                                                        }
                                                                                                                        function O(t,e)
                                                                                                                        {
                                                                                                                            var n=t.parentNode;
                                                                                                                            n&&"PICTURE"===n.tagName&&o(n).forEach(e)
                                                                                                                        }function L(t,e)
                                                                                                                        {
                                                                                                                            o(t).forEach(e)
                                                                                                                        }
                                                                                                                        function A(t,e)
                                                                                                                        {
                                                                                                                            var n=ot[t.tagName];
                                                                                                                            n&&n(t,e)
                                                                                                                        }
                                                                                                                        function M(t,e)
                                                                                                                        {
                                                                                                                            var n,o,i=st[t.tagName];
                                                                                                                            i?i(t,e):(s(n=t,(o=e).data_bg,null),s(n,o.data_bg_hidpi,null))
                                                                                                                        }
                                                                                                                        function k(t,e)
                                                                                                                        {
                                                                                                                            !e||0<e.loadingCount||0<e.toLoadCount||d(t.callback_finish,e)
                                                                                                                        }
                                                                                                                        function x(t,e,n)
                                                                                                                        {
                                                                                                                            t.addEventListener(e,n),t.llEvLisnrs[e]=n
                                                                                                                        }
                                                                                                                        function C(t)
                                                                                                                        {
                                                                                                                            return!!t.llEvLisnrs}function D(t)
                                                                                                                            {
                                                                                                                                if(C(t))
                                                                                                                                {
                                                                                                                                    var e,n,o=t.llEvLisnrs;
                                                                                                                                    for(var i in o)
                                                                                                                                    {
                                                                                                                                        var r=o[i];
                                                                                                                                        e=i,
                                                                                                                                        n=r,
                                                                                                                                        t.removeEventListener(e,n)}delete t.llEvLisnrs}
                                                                                                                                    
                                                                                                                                    }
                                                                                                                                    function N(t,e,n)
                                                                                                                                    {
                                                                                                                                        var o;
                                                                                                                                        delete t.llTempImage,
                                                                                                                                        v(n,-1),
                                                                                                                                        (o=n)&&--o.toLoadCount,p(t,e.class_loading),
                                                                                                                                        e.unobserve_completed&&m(t,n)
                                                                                                                                    }
                                                                                                                                    function
                                                                                                                                     z(i,r,s)
                                                                                                                                     {
                                                                                                                                        var a=_(i)||i;C(a)||function(t,e,n)
                                                                                                                                        {
                                                                                                                                            C(t)||(t.llEvLisnrs={});
                                                                                                                                            var o="VIDEO"===t.tagName?"loadeddata":"load";
                                                                                                                                            x(t,o,e),
                                                                                                                                            x(t,"error",n)
                                                                                                                                        }
                                                                                                                                        (a,function()
                                                                                                                                        {
                                                                                                                                            var t,e,n,o;e=r,n=s,
                                                                                                                                            o=h(t=i),
                                                                                                                                            N(t,e,n),
                                                                                                                                            f(t,e.class_loaded),
                                                                                                                                            c(t,"loaded"),
                                                                                                                                            M(t,e),
                                                                                                                                            d(e.callback_loaded,t,n),
                                                                                                                                            o||k(e,n),
                                                                                                                                            D(a)},function()
                                                                                                                                            {
                                                                                                                                                var t,e,n,o;
                                                                                                                                                e=r,n=s,o=h(t=i),
                                                                                                                                                N(t,e,n),
                                                                                                                                                f(t,e.class_error),
                                                                                                                                                c(t,"error"),
                                                                                                                                                d(e.callback_error,t,n),
                                                                                                                                                o||k(e,n),D(a)
                                                                                                                                            })
                                                                                                                                        }
                                                                                                                                        function U(t,e,n)
                                                                                                                                        {
                                                                                                                                            var o,i,r,s,a,c,u,l,h,d,f,p;
                                                                                                                                            t.llTempImage=document.createElement("IMG"),
                                                                                                                                            z(t,e,n),
                                                                                                                                            r=n,s=g(o=t,
                                                                                                                                                (i=e).data_bg),
                                                                                                                                                a=g(o,i.data_bg_hidpi),
                                                                                                                                                (c=Z&&a?a:s)&&(o.style.backgroundImage='url("'.concat(c,'")'),_(o).setAttribute("src",c),rt(o,i,r)),
                                                                                                                                                h=n,d=g(u=t,(l=e).data_bg_multi),
                                                                                                                                                f=g(u,l.data_bg_multi_hidpi),
                                                                                                                                                (p=Z&&f?f:d)&&(u.style.backgroundImage=p,
                                                                                                                                                    it(u,l,h))}function V(t,e,n)
                                                                                                                                                    {
                                                                                                                                                        var o,i,r,s;
                                                                                                                                                        s=t,
                                                                                                                                                        -1<ct.indexOf(s.tagName)?(z(o=t,i=e,r=n),
                                                                                                                                                        A(o,i),rt(o,i,r)):U(t,e,n)
                                                                                                                                                    }
                                                                                                                                                    function F(t,e,n,o)
                                                                                                                                                    {
                                                                                                                                                        var i,r;
                                                                                                                                                        n.cancel_on_exit&&(a(t)!==et||"IMG"===t.tagName&&(D(t),
                                                                                                                                                        O(i=t,function(t)
                                                                                                                                                        {
                                                                                                                                                            T(t)
                                                                                                                                                        }),
                                                                                                                                                        T(i),O(r=t,function(t){I(t)}),
                                                                                                                                                        I(r),
                                                                                                                                                        p(t,n.class_loading),
                                                                                                                                                        v(o,-1),
                                                                                                                                                        u(t),
                                                                                                                                                        d(n.callback_cancel,t,e,o)))
                                                                                                                                                    }
                                                                                                                                                    function S(t,e,n,o)
                                                                                                                                                    {
                                                                                                                                                        var i,r;
                                                                                                                                                        d(n.callback_enter,t,e,o),
                                                                                                                                                        i=t,r=o,
                                                                                                                                                        n.unobserve_entered&&m(i,r),l(t)&&V(t,n,o)}function H(t)
                                                                                                                                                        {
                                                                                                                                                            return t.use_native&&"loading"in HTMLImageElement.prototype
                                                                                                                                                        }
                                                                                                                                                        function q(t,o,i)
                                                                                                                                                        {
                                                                                                                                                            t.forEach(function(t)
                                                                                                                                                            {
                                                                                                                                                                var e,n;
                                                                                                                                                                -1!==ut.indexOf(t.tagName)&&(t.setAttribute("loading","lazy"),
                                                                                                                                                                z(e=t,n=o,i),
                                                                                                                                                                A(e,n),
                                                                                                                                                                M(e,n),
                                                                                                                                                                c(e,"native"))
                                                                                                                                                            })
                                                                                                                                                            ,b(i,0)
                                                                                                                                                        }
                                                                                                                                                        function B(t,s,a)
                                                                                                                                                        {
                                                                                                                                                            t.forEach(function(t)
                                                                                                                                                            {
                                                                                                                                                                return(r=t).isIntersecting||0<r.intersectionRatio?S(t.target,t,s,a):(e=t.target,n=t,o=s,i=a,void(l(e)||(F(e,n,o,i),
                                                                                                                                                                d(o.callback_exit,e,n,i))));var e,n,o,i,r
                                                                                                                                                            })
                                                                                                                                                        }
                                                                                                                                                        function j(e,n)
                                                                                                                                                        {
                                                                                                                                                            var t;
                                                                                                                                                            X&&!H(e)&&(n._observer=new IntersectionObserver(function(t)
                                                                                                                                                            {
                                                                                                                                                                B(t,e,n)
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                root:(t=e).container===document?null:t.container,rootMargin:t.thresholds||t.threshold+"px"
                                                                                                                                                            }))
                                                                                                                                                        }
                                                                                                                                                        function G(t)
                                                                                                                                                        {
                                                                                                                                                            return Array.prototype.slice.call(t)
                                                                                                                                                        }
                                                                                                                                                        function P(t)
                                                                                                                                                        {
                                                                                                                                                            return t.container.querySelectorAll(t.elements_selector)
                                                                                                                                                        }
                                                                                                                                                        function $(t)
                                                                                                                                                        {
                                                                                                                                                            return"error"===a(t)
                                                                                                                                                        }
                                                                                                                                                        function W(t,e)
                                                                                                                                                        {
                                                                                                                                                            return n=t||P(e),G(n).filter(l);
                                                                                                                                                            var n
                                                                                                                                                        }
                                                                                                                                                        function Q(e,t)
                                                                                                                                                        {
                                                                                                                                                            var n;
                                                                                                                                                            (n=P(e),G(n).filter($)).forEach(function(t)
                                                                                                                                                            {
                                                                                                                                                                p(t,e.class_error),u(t)
                                                                                                                                                            }),
                                                                                                                                                            t.update()
                                                                                                                                                        }
                                                                                                                                                        function t(t,e)
                                                                                                                                                        {
                                                                                                                                                            var n,o,i=r(t);
                                                                                                                                                            this._settings=i,
                                                                                                                                                            this.loadingCount=0,
                                                                                                                                                            j(i,this),
                                                                                                                                                            n=i,
                                                                                                                                                            o=this,
                                                                                                                                                            J&&window.addEventListener("online",function()
                                                                                                                                                            {
                                                                                                                                                                Q(n,o)}),this.update(e)
                                                                                                                                                            }
                                                                                                                                                            var J="undefined"!=typeof window,
                                                                                                                                                            K=J&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
                                                                                                                                                            X=J&&"IntersectionObserver"in window,
                                                                                                                                                            Y=J&&"classList"in document.createElement("p"),
                                                                                                                                                            Z=J&&1<window.devicePixelRatio,
                                                                                                                                                            tt=
                                                                                                                                                            {
                                                                                                                                                                elements_selector:"IMG",container:K||J?document:null,
                                                                                                                                                                threshold:300,
                                                                                                                                                                thresholds:null,
                                                                                                                                                                data_src:"src",
                                                                                                                                                                data_srcset:"srcset",
                                                                                                                                                                data_sizes:"sizes",
                                                                                                                                                                data_bg:"bg",
                                                                                                                                                                data_bg_hidpi:"bg-hidpi",
                                                                                                                                                                data_bg_multi:"bg-multi",
                                                                                                                                                                data_bg_multi_hidpi:"bg-multi-hidpi",
                                                                                                                                                                data_poster:"poster",class_applied:"applied",
                                                                                                                                                                class_loading:"loading",class_loaded:"loaded",c
                                                                                                                                                                lass_error:"error",unobserve_completed:!0,
                                                                                                                                                                unobserve_entered:!1,
                                                                                                                                                                cancel_on_exit:!1,
                                                                                                                                                                callback_enter:null,
                                                                                                                                                                callback_exit:null,
                                                                                                                                                                callback_applied:null,
                                                                                                                                                                callback_loading:null,
                                                                                                                                                                callback_loaded:null,
                                                                                                                                                                callback_error:null,
                                                                                                                                                                callback_finish:null,
                                                                                                                                                                callback_cancel:null,
                                                                                                                                                                use_native:!1
                                                                                                                                                            },
                                                                                                                                                            et="loading",
                                                                                                                                                            nt="ll-status",
                                                                                                                                                            ot={IMG:function(t,e)
                                                                                                                                                                {
                                                                                                                                                                    O(t,function(t)
                                                                                                                                                                    {
                                                                                                                                                                        E(t),R(t,e)
                                                                                                                                                                    }),
                                                                                                                                                                    E(t),R(t,e)
                                                                                                                                                                },
                                                                                                                                                                IFRAME:function(t,e)
                                                                                                                                                                {
                                                                                                                                                                    n(t,"src",g(t,e.data_src))
                                                                                                                                                                },
                                                                                                                                                                VIDEO:function(t,e)
                                                                                                                                                                {L(t,function(t)
                                                                                                                                                                    {
                                                                                                                                                                        n(t,"src",g(t,e.data_src))
                                                                                                                                                                    }),
                                                                                                                                                                    n(t,"poster",g(t,e.data_poster)),n(t,"src",g(t,e.data_src)),t.load()}
                                                                                                                                                                },it=function(t,e,n)
                                                                                                                                                                    {
                                                                                                                                                                        f(t,e.class_applied),
                                                                                                                                                                        c(t,"applied"),
                                                                                                                                                                        at(t,e),
                                                                                                                                                                        e.unobserve_completed&&m(t,e),
                                                                                                                                                                        d(e.callback_applied,t,n)
                                                                                                                                                                    },
                                                                                                                                                                    rt=function(t,e,n){v(n,1),
                                                                                                                                                                        f(t,e.class_loading),
                                                                                                                                                                        c(t,et),
                                                                                                                                                                        d(e.callback_loading,t,n)
                                                                                                                                                                    },
                                                                                                                                                                    st={IMG:function(t,e)
                                                                                                                                                                        {
                                                                                                                                                                            s(t,e.data_src,null),
                                                                                                                                                                            s(t,e.data_srcset,null),
                                                                                                                                                                            s(t,e.data_sizes,null),
                                                                                                                                                                            O(t,function(t)
                                                                                                                                                                            {s(t,e.data_srcset,null),
                                                                                                                                                                                s(t,e.data_sizes,null)
                                                                                                                                                                            })
                                                                                                                                                                        },
                                                                                                                                                                        IFRAME:function(t,e)
                                                                                                                                                                        {
                                                                                                                                                                            s(t,e.data_src,null)
                                                                                                                                                                        },
                                                                                                                                                                        VIDEO:function(t,e)
                                                                                                                                                                        {
                                                                                                                                                                            s(t,e.data_src,null),
                                                                                                                                                                            s(t,e.data_poster,null),
                                                                                                                                                                            L(t,function(t){s(t,e.data_src,null)
                                                                                                                                                                            })}
                                                                                                                                                                        }
                                                                                                                                                                        ,at=function(t,e)
                                                                                                                                                                        {
                                                                                                                                                                            s(t,e.data_bg_multi,null),
                                                                                                                                                                            s(t,e.data_bg_multi_hidpi,null)
                                                                                                                                                                        }
                                                                                                                                                                        ,ct=["IMG","IFRAME","VIDEO"],
                                                                                                                                                                        ut=["IMG","IFRAME"];
                                                                                                                                                                        return t.prototype={update:function(t)
                                                                                                                                                                            {
                                                                                                                                                                                var e,n,o,i=this._settings,r=W(t,i);
                                                                                                                                                                                b(this,r.length),
                                                                                                                                                                                !K&&X?H(i)?q(r,i,this):
                                                                                                                                                                                (e=this._observer,n=r,e.disconnect(),o=e,n.forEach(function(t)
                                                                                                                                                                                {
                                                                                                                                                                                    o.observe(t)})):
                                                                                                                                                                                    this.loadAll(r)
                                                                                                                                                                                },
                                                                                                                                                                                destroy:function()
                                                                                                                                                                                {
                                                                                                                                                                                    this._observer&&this._observer.disconnect(),
                                                                                                                                                                                    P(this._settings).forEach(function(t)
                                                                                                                                                                                    {
                                                                                                                                                                                        delete t.llOriginalAttrs
                                                                                                                                                                                    }),
                                                                                                                                                                                    delete this._observer,delete this._settings,
                                                                                                                                                                                    delete this.loadingCount,
                                                                                                                                                                                    delete this.toLoadCount
                                                                                                                                                                                },
                                                                                                                                                                                loadAll:function(t)
                                                                                                                                                                                {
                                                                                                                                                                                    var e=this,n=this._settings;
                                                                                                                                                                                    W(t,n).forEach(function(t){V(t,n,e)})
                                                                                                                                                                                }
                                                                                                                                                                            },t.load=function(t,e)
                                                                                                                                                                            {
                                                                                                                                                                                var n=r(e);
                                                                                                                                                                                V(t,n)
                                                                                                                                                                            },
                                                                                                                                                                            t.resetStatus=function(t)
                                                                                                                                                                            {
                                                                                                                                                                                u(t)
                                                                                                                                                                            },
                                                                                                                                                                            J&&function(t,e){
                                                                                                                                                                                if(e)if(e.length)
                                                                                                                                                                                for(var n,o=0;n=e[o];o+=1)
                                                                                                                                                                                i(t,n);
                                                                                                                                                                                else i(t,e)
                                                                                                                                                                            }
                                                                                                                                                                            (t,window.lazyLoadOptions),
                                                                                                                                                                            t
                                                                                                                                                                        }),
                                                                                                                                                                        new LazyLoad({elements_selector:".lazy",callback_loaded:function(t)
                                                                                                                                                                        {window.jQuery&&$.fn.matchHeight&&$(t).parents("[data-mh]").length&&$.fn.matchHeight._update()}
                                                                                                                                                                    });

