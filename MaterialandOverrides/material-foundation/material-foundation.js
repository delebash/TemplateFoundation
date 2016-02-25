!function(root, factory) {
    "function" == typeof define && define.amd ? define([], function() {
        return factory();
    }) : "object" == typeof exports ? module.exports = factory() : root.whatInput = factory();
}(this, function() {
    "use strict";
    function bufferInput(event) {
        clearTimeout(timer), setInput(event), buffer = !0, timer = setTimeout(function() {
            buffer = !1;
        }, 1e3);
    }
    function immediateInput(event) {
        buffer || setInput(event);
    }
    function setInput(event) {
        var eventKey = key(event), eventTarget = target(event), value = inputMap[event.type];
        "pointer" === value && (value = pointerType(event)), currentInput !== value && (!formTyping && currentInput && "keyboard" === value && "tab" !== keyMap[eventKey] && formInputs.indexOf(eventTarget.nodeName.toLowerCase()) >= 0 || (currentInput = value, 
        body.setAttribute("data-whatinput", currentInput), -1 === inputTypes.indexOf(currentInput) && inputTypes.push(currentInput))), 
        "keyboard" === value && logKeys(eventKey);
    }
    function key(event) {
        return event.keyCode ? event.keyCode : event.which;
    }
    function target(event) {
        return event.target || event.srcElement;
    }
    function pointerType(event) {
        return "number" == typeof event.pointerType ? pointerMap[event.pointerType] : event.pointerType;
    }
    function logKeys(eventKey) {
        -1 === activeKeys.indexOf(keyMap[eventKey]) && keyMap[eventKey] && activeKeys.push(keyMap[eventKey]);
    }
    function unLogKeys(event) {
        var eventKey = key(event), arrayPos = activeKeys.indexOf(keyMap[eventKey]);
        -1 !== arrayPos && activeKeys.splice(arrayPos, 1);
    }
    var timer, activeKeys = [], body = document.body, buffer = !1, currentInput = null, formInputs = [ "input", "select", "textarea" ], formTyping = body.hasAttribute("data-whatinput-formtyping"), inputMap = {
        keydown: "keyboard",
        mousedown: "mouse",
        mouseenter: "mouse",
        touchstart: "touch",
        pointerdown: "pointer",
        MSPointerDown: "pointer"
    }, inputTypes = [], keyMap = {
        9: "tab",
        13: "enter",
        16: "shift",
        27: "esc",
        32: "space",
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    }, pointerMap = {
        2: "touch",
        3: "touch",
        4: "mouse"
    };
    return function() {
        var mouseEvent = "mousedown";
        window.PointerEvent ? mouseEvent = "pointerdown" : window.MSPointerEvent && (mouseEvent = "MSPointerDown"), 
        body.addEventListener(mouseEvent, immediateInput), body.addEventListener("mouseenter", immediateInput), 
        "ontouchstart" in document.documentElement && body.addEventListener("touchstart", bufferInput), 
        body.addEventListener("keydown", immediateInput), body.addEventListener("keyup", unLogKeys);
    }(), {
        ask: function() {
            return currentInput;
        },
        keys: function() {
            return activeKeys;
        },
        types: function() {
            return inputTypes;
        },
        set: setInput
    };
}), function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w);
    } : factory(global);
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) >= 0 !== not;
        });
    }
    function sibling(cur, dir) {
        for (;(cur = cur[dir]) && 1 !== cur.nodeType; ) ;
        return cur;
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), 
        jQuery.ready();
    }
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        }), this.expando = jQuery.expando + Data.uid++;
    }
    function dataAttr(elem, key, data) {
        var name;
        if (void 0 === data && 1 === elem.nodeType) if (name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase(), 
        data = elem.getAttribute(name), "string" == typeof data) {
            try {
                data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
            } catch (e) {}
            data_user.set(elem, key, data);
        } else data = void 0;
        return data;
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function setGlobalEval(elems, refElements) {
        for (var i = 0, l = elems.length; l > i; i++) data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (1 === dest.nodeType) {
            if (data_priv.hasData(src) && (pdataOld = data_priv.access(src), pdataCur = data_priv.set(dest, pdataOld), 
            events = pdataOld.events)) {
                delete pdataCur.handle, pdataCur.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            data_user.hasData(src) && (udataOld = data_user.access(src), udataCur = jQuery.extend({}, udataOld), 
            data_user.set(dest, udataCur));
        }
    }
    function getAll(context, tag) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue);
    }
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        return elem.detach(), display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), 
        doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), 
        iframe.detach()), elemdisplay[nodeName] = display), display;
    }
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name]), 
        computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
        maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        void 0 !== ret ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in style) return name;
        return origName;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
        elem.style && (values[index] = data_priv.get(elem, "olddisplay"), display = elem.style.display, 
        show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), 
        "none" === display && hidden || data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = void 0;
        }), fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
        display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, 
        "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                hidden = !0;
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        } else display = void 0;
        if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display); else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = data_priv.access(elem, "fxshow", {}), 
            toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide();
            }), anim.done(function() {
                var prop;
                data_priv.remove(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), 
            prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, 
            tween.start = "width" === prop || "height" === prop ? 1 : 0));
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType]) : void 0;
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView;
    }
    var arr = [], slice = arr.slice, concat = arr.concat, push = arr.push, indexOf = arr.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, support = {}, document = window.document, version = "2.1.4", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return null != obj && obj === obj.window;
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
        },
        isPlainObject: function(obj) {
            return "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj) ? !1 : obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ? !1 : !0;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code), code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"), 
            script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code));
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (;length > i && (value = callback.apply(obj[i], args), value !== !1); i++) ; else for (i in obj) if (value = callback.apply(obj[i], args), 
                value === !1) break;
            } else if (isArray) for (;length > i && (value = callback.call(obj[i], i, obj[i]), 
            value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
            value === !1) break;
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            return null == arr ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; len > j; j++) first[i++] = second[j];
            return first.length = i, first;
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), 
            callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && ret.push(value);
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
            jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0;
        },
        now: Date.now,
        support: support
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, results = results || [], nodeType = context.nodeType, 
            "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
            if (!seed && documentIsHTML) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando, newContext = context, newSelector = 1 !== nodeType && selector, 
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), 
                        nid = "[id='" + nid + "'] ", i = groups.length; i--; ) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context, 
                        newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        old || context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return !1;
            } finally {
                div.parentNode && div.parentNode.removeChild(div), div = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function testContext(context) {
            return context && "undefined" != typeof context.getElementsByTagName && context;
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) {
                    if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                    if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++) (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), 
            mapped && map.push(i));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                return checkContext = null, ret;
            } ]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; ) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0), 0;
        }, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            for (var i = 0, len = list.length; len > i; i++) if (list[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        }, unloadHandler = function() {
            setDocument();
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1;
        }, setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = doc.documentElement, parent = doc.defaultView, parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)), 
            documentIsHTML = !isXML(doc), support.attributes = assert(function(div) {
                return div.className = "i", !div.getAttribute("className");
            }), support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName), support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length;
            }), support.getById ? (Expr.find.ID = function(id, context) {
                if ("undefined" != typeof context.getElementById && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [ m ] : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                return documentIsHTML ? context.getElementsByClassName(className) : void 0;
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\f]' msallowcapture=''><option selected=''></option></select>", 
                div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), 
                div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]");
            }), assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), 
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), 
                div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = hasCompare ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, doc) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return sortInput = null, results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i++]; ) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], 
                                nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1]; else for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return text = text.replace(runescape, funescape), function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 > argument ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }, compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)), i = match.length; i--; ) cached = matcherFromTokens(match[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), 
                cached.selector = selector;
            }
            return cached;
        }, select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [], 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                    !context) return results;
                    compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), 
            results;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"));
        }), assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue;
        }), assert(function(div) {
            return null == div.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }), Sizzle;
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, 
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, len = this.length, ret = [], self = this;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, 
            ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector) return this;
        if ("string" == typeof selector) {
            if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
            !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this;
            }
            return elem = document.getElementById(match[2]), elem && elem.parentNode && (this.length = 1, 
            this[0] = elem), this.context = document, this.selector = selector, this;
        }
        return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, 
        this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, 
        this.context = selector.context), jQuery.makeArray(selector, this));
    };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            for (var matched = [], truncate = void 0 !== until; (elem = elem[dir]) && 9 !== elem.nodeType; ) if (1 === elem.nodeType) {
                if (truncate && jQuery(elem).is(until)) break;
                matched.push(elem);
            }
            return matched;
        },
        sibling: function(n, elem) {
            for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
            return matched;
        }
    }), jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
                for (var i = 0; l > i; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), 
            this.length > 1 && (guaranteedUnique[name] || jQuery.unique(matched), rparentsprev.test(name) && matched.reverse()), 
            this.pushStack(matched);
        };
    });
    var rnotwhite = /\S+/g, optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
            firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break;
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg);
                        });
                    }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, 
                    fire(memory));
                }
                return this;
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
            },
            empty: function() {
                return list = [], firingLength = 0, this;
            },
            disable: function() {
                return list = stack = memory = void 0, this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return stack = void 0, memory || self.disable(), this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                return !list || fired && !stack || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                firing ? stack.push(args) : fire(args)), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
            resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
            jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))));
        }
    }), jQuery.ready.promise = function(obj) {
        return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), 
        window.addEventListener("load", completed, !1))), readyList.promise(obj);
    }, jQuery.ready.promise();
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = null == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw);
        } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
        bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
        })), fn)) for (;len > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
    };
    jQuery.acceptData = function(owner) {
        return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType;
    }, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
        key: function(owner) {
            if (!Data.accepts(owner)) return 0;
            var descriptor = {}, unlock = owner[this.expando];
            if (!unlock) {
                unlock = Data.uid++;
                try {
                    descriptor[this.expando] = {
                        value: unlock
                    }, Object.defineProperties(owner, descriptor);
                } catch (e) {
                    descriptor[this.expando] = unlock, jQuery.extend(owner, descriptor);
                }
            }
            return this.cache[unlock] || (this.cache[unlock] = {}), unlock;
        },
        set: function(owner, data, value) {
            var prop, unlock = this.key(owner), cache = this.cache[unlock];
            if ("string" == typeof data) cache[data] = value; else if (jQuery.isEmptyObject(cache)) jQuery.extend(this.cache[unlock], data); else for (prop in data) cache[prop] = data[prop];
            return cache;
        },
        get: function(owner, key) {
            var cache = this.cache[this.key(owner)];
            return void 0 === key ? cache : cache[key];
        },
        access: function(owner, key, value) {
            var stored;
            return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key), 
            void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value), 
            void 0 !== value ? value : key);
        },
        remove: function(owner, key) {
            var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
            if (void 0 === key) this.cache[unlock] = {}; else {
                jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key), 
                key in cache ? name = [ key, camel ] : (name = camel, name = name in cache ? [ name ] : name.match(rnotwhite) || [])), 
                i = name.length;
                for (;i--; ) delete cache[name[i]];
            }
        },
        hasData: function(owner) {
            return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
        },
        discard: function(owner) {
            owner[this.expando] && delete this.cache[owner[this.expando]];
        }
    };
    var data_priv = new Data(), data_user = new Data(), rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        hasData: function(elem) {
            return data_user.hasData(elem) || data_priv.hasData(elem);
        },
        data: function(elem, name, data) {
            return data_user.access(elem, name, data);
        },
        removeData: function(elem, name) {
            data_user.remove(elem, name);
        },
        _data: function(elem, name, data) {
            return data_priv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
            data_priv.remove(elem, name);
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = data_user.get(elem), 1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs"))) {
                    for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name])));
                    data_priv.set(elem, "hasDataAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                data_user.set(this, key);
            }) : access(this, function(value) {
                var data, camelKey = jQuery.camelCase(key);
                if (elem && void 0 === value) {
                    if (data = data_user.get(elem, key), void 0 !== data) return data;
                    if (data = data_user.get(elem, camelKey), void 0 !== data) return data;
                    if (data = dataAttr(elem, camelKey, void 0), void 0 !== data) return data;
                } else this.each(function() {
                    var data = data_user.get(this, camelKey);
                    data_user.set(this, camelKey, value), -1 !== key.indexOf("-") && void 0 !== data && data_user.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, !0);
        },
        removeData: function(key) {
            return this.each(function() {
                data_user.remove(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = data_priv.get(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = data_priv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || []) : void 0;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return data_priv.get(elem, key) || data_priv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(elem, [ type + "queue", key ]);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = data_priv.get(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHidden = function(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }, rcheckableType = /^(?:checkbox|radio)$/i;
    !function() {
        var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
        input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), 
        div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue;
    }();
    var strundefined = "undefined";
    support.focusinBubbles = "onfocusin" in window;
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
            if (elemData) for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, 
            selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), 
            (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
            }), types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
            type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
            type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
            handleObj = jQuery.extend({
                type: type,
                origType: origType,
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
            }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
            special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle, !1)), 
            special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
            selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
            jQuery.event.global[type] = !0);
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, data_priv.remove(elem, "events"));
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), 
                event.result === !1 && event.preventDefault());
                return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !jQuery.acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], 
                tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, 
                tmp && (elem[ontype] = tmp)), event.result;
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (data_priv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (;cur !== this; cur = cur.parentNode || this) if (cur.disabled !== !0 || "click" !== event.type) {
                for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", 
                void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length), 
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), 
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), 
            i = copy.length; i--; ) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== safeActiveElement() && this.focus ? (this.focus(), !1) : void 0;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), 
            e.isDefaultPrevented() && event.preventDefault();
        }
    }, jQuery.removeEvent = function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1);
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault();
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), data_priv.access(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
                var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix) - 1;
                attaches ? data_priv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                data_priv.remove(doc, fix));
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = void 0);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
            data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse; else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0;
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td, jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(!0), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0, l = srcElements.length; l > i; i++) fixInput(srcElements[i], destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0, l = srcElements.length; l > i; i++) cloneCopyEvent(srcElements[i], destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; l > i; i++) if (elem = elems[i], 
            elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
                wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], 
                j = wrap[0]; j--; ) tmp = tmp.lastChild;
                jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "";
            } else nodes.push(context.createTextNode(elem));
            for (fragment.textContent = "", i = 0; elem = nodes[i++]; ) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), 
            tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
            scripts)) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
            return fragment;
        },
        cleanData: function(elems) {
            for (var data, elem, type, key, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) {
                if (jQuery.acceptData(elem) && (key = elem[data_priv.expando], key && (data = data_priv.cache[key]))) {
                    if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    data_priv.cache[key] && delete data_priv.cache[key];
                }
                delete data_user.cache[elem[data_user.expando]];
            }
        }
    }), jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = value);
                });
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), 
            elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), 
            elem.parentNode.removeChild(elem));
            return this;
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
            elem.textContent = "");
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            return this.domManip(arguments, function(elem) {
                arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this);
            }), arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, !0);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback);
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), 
            first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
            first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, 
                i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
                callback.call(this[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
                i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")));
            }
            return this;
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; last >= i; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {}, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), getStyles = function(elem) {
        return elem.ownerDocument.defaultView.opener ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : window.getComputedStyle(elem, null);
    };
    !function() {
        function computePixelPositionAndBoxSizingReliable() {
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            div.innerHTML = "", docElem.appendChild(container);
            var divStyle = window.getComputedStyle(div, null);
            pixelPositionVal = "1%" !== divStyle.top, boxSizingReliableVal = "4px" === divStyle.width, 
            docElem.removeChild(container);
        }
        var pixelPositionVal, boxSizingReliableVal, docElem = document.documentElement, container = document.createElement("div"), div = document.createElement("div");
        div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", 
        container.appendChild(div), window.getComputedStyle && jQuery.extend(support, {
            pixelPosition: function() {
                return computePixelPositionAndBoxSizingReliable(), pixelPositionVal;
            },
            boxSizingReliable: function() {
                return null == boxSizingReliableVal && computePixelPositionAndBoxSizingReliable(), 
                boxSizingReliableVal;
            },
            reliableMarginRight: function() {
                var ret, marginDiv = div.appendChild(document.createElement("div"));
                return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
                marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", 
                docElem.appendChild(container), ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight), 
                docElem.removeChild(container), div.removeChild(marginDiv), ret;
            }
        }));
    }(), jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options) elem.style[name] = old[name];
        return ret;
    };
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, 
                "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
                type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), 
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = value)), 
                void 0);
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val;
        }
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra) : void 0;
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0);
            }
        };
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        return computed ? jQuery.swap(elem, {
            display: "inline-block"
        }, curCSS, [ elem, "marginRight" ]) : void 0;
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
            this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop];
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3], parts = parts || [], start = +target || 1;
                do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
            }
            return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, 
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
        } ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
            tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || data_priv.get(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = data_priv.get(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = data_priv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = void 0;
    }, jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
        this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    }, function() {
        var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, 
        select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), 
        input.value = "t", input.type = "radio", support.radioValue = "t" === input.value;
    }();
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), 
            hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), 
            void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
            value) : void jQuery.removeAttr(elem, name));
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) propName = jQuery.propFix[name] || name, 
            jQuery.expr.match.bool.test(name) && (elem[propName] = !1), elem.removeAttribute(name);
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, 
            attrHandle[name] = handle), ret;
        };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), 
            void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
                }
            }
        }
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.parentNode && parent.parentNode.selectedIndex, null;
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = 0 === arguments.length || "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") >= 0; ) cur = cur.replace(" " + clazz + " ", " ");
                finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            }) : this.each(function() {
                if ("string" === type) for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else (type === strundefined || "boolean" === type) && (this.className && data_priv.set(this, "__className__", this.className), 
                this.className = this.className || value === !1 ? "" : data_priv.get(this, "__className__") || "");
            });
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++) if (option = options[i], 
                    (option.selected || i === index) && (support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) option = options[i], 
                    (option.selected = jQuery.inArray(option.value, values) >= 0) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1), values;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0;
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now(), rquery = /\?/;
    jQuery.parseJSON = function(data) {
        return JSON.parse(data + "");
    }, jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data) return null;
        try {
            tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml");
        } catch (e) {
            xml = void 0;
        }
        return (!xml || xml.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + data), 
        xml;
    };
    var rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), ajaxLocation = window.location.href, ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, 
                responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, 
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), 
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), 
                jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", 
                isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (2 > state) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, 
            jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ], 
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), 
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, 
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), 
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && wrap.insertBefore(this[0]), 
            wrap.map(function() {
                for (var elem = this; elem.firstElementChild; ) elem = elem.firstElementChild;
                return elem;
            }).append(this)), this);
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    }), jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var xhrId = 0, xhrCallbacks = {}, xhrSuccessStatus = {
        0: 200,
        1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    window.attachEvent && window.attachEvent("onunload", function() {
        for (var key in xhrCallbacks) xhrCallbacks[key]();
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, 
    jQuery.ajaxTransport(function(options) {
        var callback;
        return support.cors || xhrSupported && !options.crossDomain ? {
            send: function(headers, complete) {
                var i, xhr = options.xhr(), id = ++xhrId;
                if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                for (i in headers) xhr.setRequestHeader(i, headers[i]);
                callback = function(type) {
                    return function() {
                        callback && (delete xhrCallbacks[id], callback = xhr.onload = xhr.onerror = null, 
                        "abort" === type ? xhr.abort() : "error" === type ? complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" == typeof xhr.responseText ? {
                            text: xhr.responseText
                        } : void 0, xhr.getAllResponseHeaders()));
                    };
                }, xhr.onload = callback(), xhr.onerror = callback("error"), callback = xhrCallbacks[id] = callback("abort");
                try {
                    xhr.send(options.hasContent && options.data || null);
                } catch (e) {
                    if (callback) throw e;
                }
            },
            abort: function() {
                callback && callback();
            }
        } : void 0;
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET");
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        async: !0,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type);
                    }), document.head.appendChild(script[0]);
                },
                abort: function() {
                    callback && callback();
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, 
            oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = void 0;
        }), "script") : void 0;
    }), jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data) return null;
        "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        return parsed ? [ context.createElement(parsed[1]) ] : (parsed = jQuery.buildFragment([ data ], context, scripts), 
        scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = jQuery.trim(url.slice(off)), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
        }), this;
    }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
            curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, 
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
            null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
            var docElem, win, elem = this[0], box = {
                top: 0,
                left: 0
            }, doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), 
            win = getWindow(doc), {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            }) : box;
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, elem = this[0], parentOffset = {
                    top: 0,
                    left: 0
                };
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), 
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? win[prop] : elem[method] : void (win ? win.scrollTo(top ? window.pageXOffset : val, top ? val : window.pageYOffset) : elem[method] = val);
            }, method, val, arguments.length, null);
        };
    }), jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : void 0, chainable, null);
            };
        });
    }), jQuery.fn.size = function() {
        return this.length;
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var _jQuery = window.jQuery, _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
        jQuery;
    }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery;
}), !function($) {
    "use strict";
    function functionName(fn) {
        if (void 0 === Function.prototype.name) {
            var funcNameRegex = /function\s([^(]{1,})\(/, results = funcNameRegex.exec(fn.toString());
            return results && results.length > 1 ? results[1].trim() : "";
        }
        return void 0 === fn.prototype ? fn.constructor.name : fn.prototype.constructor.name;
    }
    function hyphenate(str) {
        return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    }
    var FOUNDATION_VERSION = "6.0.3", Foundation = {
        version: FOUNDATION_VERSION,
        _plugins: {},
        _uuids: [],
        _activePlugins: {},
        rtl: function() {
            return "rtl" === $("html").attr("dir");
        },
        plugin: function(plugin, name) {
            var className = name || functionName(plugin), attrName = hyphenate(className);
            this._plugins[attrName] = this[className] = plugin;
        },
        registerPlugin: function(plugin) {
            var pluginName = functionName(plugin.constructor).toLowerCase();
            plugin.uuid = this.GetYoDigits(6, pluginName), plugin.$element.attr("data-" + pluginName, plugin.uuid).trigger("init.zf." + pluginName), 
            this._activePlugins[plugin.uuid] = plugin;
        },
        unregisterPlugin: function(plugin) {
            var pluginName = functionName(plugin.constructor).toLowerCase();
            delete this._activePlugins[plugin.uuid], plugin.$element.removeAttr("data-" + pluginName).trigger("destroyed.zf." + pluginName);
        },
        _reflow: function(plugins) {
            var actvPlugins = Object.keys(this._activePlugins), _this = this;
            if (plugins) {
                if ("string" == typeof plugins) {
                    var namespace = plugins.split("-")[1];
                    namespace ? this._activePlugins[plugins]._init() : (namespace = new RegExp(plugins, "i"), 
                    actvPlugins.filter(function(p) {
                        return namespace.test(p);
                    }).forEach(function(p) {
                        _this._activePlugins[p]._init();
                    }));
                }
            } else actvPlugins.forEach(function(p) {
                _this._activePlugins[p]._init();
            });
        },
        GetYoDigits: function(length, namespace) {
            return length = length || 6, Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? "-" + namespace : "");
        },
        reflow: function(elem, plugins) {
            "undefined" == typeof plugins ? plugins = Object.keys(this._plugins) : "string" == typeof plugins && (plugins = [ plugins ]);
            var _this = this;
            $.each(plugins, function(i, name) {
                var plugin = _this._plugins[name], $elem = $(elem).find("[data-" + name + "]").addBack("*");
                $elem.each(function() {
                    return $(this).attr("zf-plugin") ? void console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.") : void $(this).data("zf-plugin", new plugin($(this)));
                });
            });
        },
        getFnName: functionName,
        transitionend: function($elem) {
            var end, transitions = {
                transition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend"
            }, elem = document.createElement("div");
            for (var t in transitions) "undefined" != typeof elem.style[t] && (end = transitions[t]);
            return end ? end : (end = setTimeout(function() {
                $elem.triggerHandler("transitionend", [ $elem ]);
            }, 1), "transitionend");
        }
    };
    Foundation.util = {
        throttle: function(func, delay) {
            var timer = null;
            return function() {
                var context = this, args = arguments;
                null === timer && (timer = setTimeout(function() {
                    func.apply(context, args), timer = null;
                }, delay));
            };
        }
    };
    var foundation = function(method) {
        var type = typeof method, $meta = $("meta.foundation-mq"), $noJS = $(".no-js");
        if ($meta.length || $('<meta class="foundation-mq">').appendTo(document.head), $noJS.length && $noJS.removeClass("no-js"), 
        "undefined" === type) Foundation.MediaQuery._init(), Foundation.reflow(this); else {
            if ("string" !== type) throw new TypeError("We're sorry, '" + type + "' is not a valid parameter. You must use a string representing the method you wish to invoke.");
            var args = Array.prototype.slice.call(arguments, 1), plugClass = this.data("zfPlugin");
            if (void 0 === plugClass || void 0 === plugClass[method]) throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : "this element") + ".");
            1 === this.length ? plugClass[method].apply(plugClass, args) : this.each(function(i, el) {
                plugClass[method].apply($(el).data("zfPlugin"), args);
            });
        }
        return this;
    };
    window.Foundation = Foundation, $.fn.foundation = foundation, function() {
        Date.now && window.Date.now || (window.Date.now = Date.now = function() {
            return new Date().getTime();
        });
        for (var vendors = [ "webkit", "moz" ], i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            var vp = vendors[i];
            window.requestAnimationFrame = window[vp + "RequestAnimationFrame"], window.cancelAnimationFrame = window[vp + "CancelAnimationFrame"] || window[vp + "CancelRequestAnimationFrame"];
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var lastTime = 0;
            window.requestAnimationFrame = function(callback) {
                var now = Date.now(), nextTime = Math.max(lastTime + 16, now);
                return setTimeout(function() {
                    callback(lastTime = nextTime);
                }, nextTime - now);
            }, window.cancelAnimationFrame = clearTimeout;
        }
        window.performance && window.performance.now || (window.performance = {
            start: Date.now(),
            now: function() {
                return Date.now() - this.start;
            }
        });
    }(), Function.prototype.bind || (Function.prototype.bind = function(oThis) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function() {}, fBound = function() {
            return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        return this.prototype && (fNOP.prototype = this.prototype), fBound.prototype = new fNOP(), 
        fBound;
    });
}(jQuery), !function(Foundation, window) {
    var ImNotTouchingYou = function(element, parent, lrOnly, tbOnly) {
        var top, bottom, left, right, eleDims = GetDimensions(element);
        if (parent) {
            var parDims = GetDimensions(parent);
            bottom = eleDims.offset.top + eleDims.height <= parDims.height + parDims.offset.top, 
            top = eleDims.offset.top >= parDims.offset.top, left = eleDims.offset.left >= parDims.offset.left, 
            right = eleDims.offset.left + eleDims.width <= parDims.width;
        } else bottom = eleDims.offset.top + eleDims.height <= eleDims.windowDims.height + eleDims.windowDims.offset.top, 
        top = eleDims.offset.top >= eleDims.windowDims.offset.top, left = eleDims.offset.left >= eleDims.windowDims.offset.left, 
        right = eleDims.offset.left + eleDims.width <= eleDims.windowDims.width;
        var allDirs = [ bottom, top, left, right ];
        return lrOnly ? left === right == !0 : tbOnly ? top === bottom == !0 : -1 === allDirs.indexOf(!1);
    }, GetDimensions = function(elem, test) {
        if (elem = elem.length ? elem[0] : elem, elem === window || elem === document) throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
        var rect = elem.getBoundingClientRect(), parRect = elem.parentNode.getBoundingClientRect(), winRect = document.body.getBoundingClientRect(), winY = window.pageYOffset, winX = window.pageXOffset;
        return {
            width: rect.width,
            height: rect.height,
            offset: {
                top: rect.top + winY,
                left: rect.left + winX
            },
            parentDims: {
                width: parRect.width,
                height: parRect.height,
                offset: {
                    top: parRect.top + winY,
                    left: parRect.left + winX
                }
            },
            windowDims: {
                width: winRect.width,
                height: winRect.height,
                offset: {
                    top: winY,
                    left: winX
                }
            }
        };
    }, GetOffsets = function(element, anchor, position, vOffset, hOffset, isOverflow) {
        var $eleDims = GetDimensions(element), $anchorDims = anchor ? GetDimensions(anchor) : null;
        switch (position) {
          case "top":
            return {
                left: $anchorDims.offset.left,
                top: $anchorDims.offset.top - ($eleDims.height + vOffset)
            };

          case "left":
            return {
                left: $anchorDims.offset.left - ($eleDims.width + hOffset),
                top: $anchorDims.offset.top
            };

          case "right":
            return {
                left: $anchorDims.offset.left + $anchorDims.width + hOffset,
                top: $anchorDims.offset.top
            };

          case "center top":
            return {
                left: $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
                top: $anchorDims.offset.top - ($eleDims.height + vOffset)
            };

          case "center bottom":
            return {
                left: isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
                top: $anchorDims.offset.top + $anchorDims.height + vOffset
            };

          case "center left":
            return {
                left: $anchorDims.offset.left - ($eleDims.width + hOffset),
                top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
            };

          case "center right":
            return {
                left: $anchorDims.offset.left + $anchorDims.width + hOffset + 1,
                top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
            };

          case "center":
            return {
                left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2,
                top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - $eleDims.height / 2
            };

          case "reveal":
            return {
                left: ($eleDims.windowDims.width - $eleDims.width) / 2,
                top: $eleDims.windowDims.offset.top + vOffset
            };

          case "reveal full":
            return {
                left: $eleDims.windowDims.offset.left,
                top: $eleDims.windowDims.offset.top
            };

          default:
            return {
                left: $anchorDims.offset.left,
                top: $anchorDims.offset.top + $anchorDims.height + vOffset
            };
        }
    };
    Foundation.Box = {
        ImNotTouchingYou: ImNotTouchingYou,
        GetDimensions: GetDimensions,
        GetOffsets: GetOffsets
    };
}(window.Foundation, window), !function($, Foundation) {
    "use strict";
    Foundation.Keyboard = {};
    var keyCodes = {
        9: "TAB",
        13: "ENTER",
        27: "ESCAPE",
        32: "SPACE",
        37: "ARROW_LEFT",
        38: "ARROW_UP",
        39: "ARROW_RIGHT",
        40: "ARROW_DOWN"
    }, keys = function(kcs) {
        var k = {};
        for (var kc in kcs) k[kcs[kc]] = kcs[kc];
        return k;
    }(keyCodes);
    Foundation.Keyboard.keys = keys;
    var parseKey = function(event) {
        var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();
        return event.shiftKey && (key = "SHIFT_" + key), event.ctrlKey && (key = "CTRL_" + key), 
        event.altKey && (key = "ALT_" + key), key;
    };
    Foundation.Keyboard.parseKey = parseKey;
    var commands = {}, handleKey = function(event, component, functions) {
        var cmds, command, fn, commandList = commands[Foundation.getFnName(component)], keyCode = parseKey(event);
        return commandList ? (cmds = "undefined" == typeof commandList.ltr ? commandList : Foundation.rtl() ? $.extend({}, commandList.ltr, commandList.rtl) : $.extend({}, commandList.rtl, commandList.ltr), 
        command = cmds[keyCode], fn = functions[command], void (fn && "function" == typeof fn ? (fn.apply(component), 
        (functions.handled || "function" == typeof functions.handled) && functions.handled.apply(component)) : (functions.unhandled || "function" == typeof functions.unhandled) && functions.unhandled.apply(component))) : console.warn("Component not defined!");
    };
    Foundation.Keyboard.handleKey = handleKey;
    var findFocusable = function($element) {
        return $element.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function() {
            return !$(this).is(":visible") || $(this).attr("tabindex") < 0 ? !1 : !0;
        });
    };
    Foundation.Keyboard.findFocusable = findFocusable;
    var register = function(componentName, cmds) {
        commands[componentName] = cmds;
    };
    Foundation.Keyboard.register = register;
}(jQuery, window.Foundation), !function($, Foundation) {
    function parseStyleToObject(str) {
        var styleObject = {};
        return "string" != typeof str ? styleObject : (str = str.trim().slice(1, -1)) ? styleObject = str.split("&").reduce(function(ret, param) {
            var parts = param.replace(/\+/g, " ").split("="), key = parts[0], val = parts[1];
            return key = decodeURIComponent(key), val = void 0 === val ? null : decodeURIComponent(val), 
            ret.hasOwnProperty(key) ? Array.isArray(ret[key]) ? ret[key].push(val) : ret[key] = [ ret[key], val ] : ret[key] = val, 
            ret;
        }, {}) : styleObject;
    }
    var MediaQuery = {
        queries: [],
        current: "",
        atLeast: function(size) {
            var query = this.get(size);
            return query ? window.matchMedia(query).matches : !1;
        },
        get: function(size) {
            for (var i in this.queries) {
                var query = this.queries[i];
                if (size === query.name) return query.value;
            }
            return null;
        },
        _init: function() {
            var namedQueries, self = this, extractedStyles = $(".foundation-mq").css("font-family");
            namedQueries = parseStyleToObject(extractedStyles);
            for (var key in namedQueries) self.queries.push({
                name: key,
                value: "only screen and (min-width: " + namedQueries[key] + ")"
            });
            this.current = this._getCurrentSize(), this._watcher();
        },
        _getCurrentSize: function() {
            var matched;
            for (var i in this.queries) {
                var query = this.queries[i];
                window.matchMedia(query.value).matches && (matched = query);
            }
            return "object" == typeof matched ? matched.name : matched;
        },
        _watcher: function() {
            var _this = this;
            $(window).on("resize.zf.mediaquery", function() {
                var newSize = _this._getCurrentSize();
                newSize !== _this.current && ($(window).trigger("changed.zf.mediaquery", [ newSize, _this.current ]), 
                _this.current = newSize);
            });
        }
    };
    Foundation.MediaQuery = MediaQuery, window.matchMedia || (window.matchMedia = function() {
        "use strict";
        var styleMedia = window.styleMedia || window.media;
        if (!styleMedia) {
            var style = document.createElement("style"), script = document.getElementsByTagName("script")[0], info = null;
            style.type = "text/css", style.id = "matchmediajs-test", script.parentNode.insertBefore(style, script), 
            info = "getComputedStyle" in window && window.getComputedStyle(style, null) || style.currentStyle, 
            styleMedia = {
                matchMedium: function(media) {
                    var text = "@media " + media + "{ #matchmediajs-test { width: 1px; } }";
                    return style.styleSheet ? style.styleSheet.cssText = text : style.textContent = text, 
                    "1px" === info.width;
                }
            };
        }
        return function(media) {
            return {
                matches: styleMedia.matchMedium(media || "all"),
                media: media || "all"
            };
        };
    }());
}(jQuery, Foundation), !function($, Foundation) {
    function animate(isIn, element, animation, cb) {
        function finish() {
            isIn || element.hide(), reset(), cb && cb.apply(element);
        }
        function reset() {
            element[0].style.transitionDuration = 0, element.removeClass(initClass + " " + activeClass + " " + animation);
        }
        if (element = $(element).eq(0), element.length) {
            var initClass = isIn ? initClasses[0] : initClasses[1], activeClass = isIn ? activeClasses[0] : activeClasses[1];
            reset(), element.addClass(animation).css("transition", "none"), requestAnimationFrame(function() {
                element.addClass(initClass), isIn && element.show();
            }), requestAnimationFrame(function() {
                element[0].offsetWidth, element.css("transition", ""), element.addClass(activeClass);
            }), element.one(Foundation.transitionend(element), finish);
        }
    }
    var initClasses = [ "mui-enter", "mui-leave" ], activeClasses = [ "mui-enter-active", "mui-leave-active" ], Motion = {
        animateIn: function(element, animation, cb) {
            animate(!0, element, animation, cb);
        },
        animateOut: function(element, animation, cb) {
            animate(!1, element, animation, cb);
        }
    }, Move = function(duration, elem, fn) {
        function move(ts) {
            start || (start = window.performance.now()), prog = ts - start, fn.apply(elem), 
            duration > prog ? anim = window.requestAnimationFrame(move, elem) : (window.cancelAnimationFrame(anim), 
            elem.trigger("finished.zf.animate", [ elem ]).triggerHandler("finished.zf.animate", [ elem ]));
        }
        var anim, prog, start = null;
        anim = window.requestAnimationFrame(move);
    };
    Foundation.Move = Move, Foundation.Motion = Motion;
}(jQuery, Foundation), !function($, Foundation) {
    "use strict";
    Foundation.Nest = {
        Feather: function(menu, type) {
            menu.attr("role", "menubar"), type = type || "zf";
            var items = menu.find("li").attr({
                role: "menuitem"
            }), subMenuClass = "is-" + type + "-submenu", subItemClass = subMenuClass + "-item", hasSubClass = "is-" + type + "-submenu-parent";
            items.each(function() {
                var $item = $(this), $sub = $item.children("ul");
                $sub.length && ($item.addClass("has-submenu " + hasSubClass), $sub.addClass("submenu " + subMenuClass).attr("data-submenu", "")), 
                $item.parent("[data-submenu]").length && $item.addClass("is-submenu-item " + subItemClass);
            });
        },
        Burn: function(menu, type) {
            var subMenuClass = (menu.find("li").removeAttr("tabindex"), "is-" + type + "-submenu"), subItemClass = subMenuClass + "-item", hasSubClass = "is-" + type + "-submenu-parent";
            menu.find("*").removeClass(subMenuClass + " " + subItemClass + " " + hasSubClass + " has-submenu is-submenu-item submenu is-active").removeAttr("data-submenu").css("display", "");
        }
    };
}(jQuery, window.Foundation), !function($, Foundation) {
    "use strict";
    var Timer = function(elem, options, cb) {
        var start, timer, _this = this, duration = options.duration, nameSpace = Object.keys(elem.data())[0] || "timer", remain = -1;
        this.restart = function() {
            remain = -1, clearTimeout(timer), this.start();
        }, this.start = function() {
            clearTimeout(timer), remain = 0 >= remain ? duration : remain, elem.data("paused", !1), 
            start = Date.now(), timer = setTimeout(function() {
                options.infinite && _this.restart(), cb();
            }, remain), elem.trigger("timerstart.zf." + nameSpace);
        }, this.pause = function() {
            clearTimeout(timer), elem.data("paused", !0);
            var end = Date.now();
            remain -= end - start, elem.trigger("timerpaused.zf." + nameSpace);
        };
    }, onImagesLoaded = function(images, callback) {
        var unloaded = images.length;
        0 === unloaded && callback();
        var singleImageLoaded = function() {
            unloaded--, 0 === unloaded && callback();
        };
        images.each(function() {
            this.complete ? singleImageLoaded() : "undefined" != typeof this.naturalWidth && this.naturalWidth > 0 ? singleImageLoaded() : $(this).one("load", function() {
                singleImageLoaded();
            });
        });
    };
    Foundation.Timer = Timer, Foundation.onImagesLoaded = onImagesLoaded;
}(jQuery, window.Foundation), function($) {
    function onTouchEnd() {
        this.removeEventListener("touchmove", onTouchMove), this.removeEventListener("touchend", onTouchEnd), 
        isMoving = !1;
    }
    function onTouchMove(e) {
        if ($.spotSwipe.preventDefault && e.preventDefault(), isMoving) {
            var dir, x = e.touches[0].pageX, y = e.touches[0].pageY, dx = startPosX - x, dy = startPosY - y;
            elapsedTime = new Date().getTime() - startTime, Math.abs(dx) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold ? dir = dx > 0 ? "left" : "right" : Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold && (dir = dy > 0 ? "down" : "up"), 
            dir && (onTouchEnd.call(this), $(this).trigger("swipe", dir).trigger("swipe" + dir));
        }
    }
    function onTouchStart(e) {
        1 == e.touches.length && (startPosX = e.touches[0].pageX, startPosY = e.touches[0].pageY, 
        isMoving = !0, startTime = new Date().getTime(), this.addEventListener("touchmove", onTouchMove, !1), 
        this.addEventListener("touchend", onTouchEnd, !1));
    }
    function init() {
        this.addEventListener && this.addEventListener("touchstart", onTouchStart, !1);
    }
    $.spotSwipe = {
        version: "1.0.0",
        enabled: "ontouchstart" in document.documentElement,
        preventDefault: !0,
        moveThreshold: 75,
        timeThreshold: 200
    };
    var startPosX, startPosY, startTime, elapsedTime, isMoving = !1;
    $.event.special.swipe = {
        setup: init
    }, $.each([ "left", "up", "down", "right" ], function() {
        $.event.special["swipe" + this] = {
            setup: function() {
                $(this).on("swipe", $.noop);
            }
        };
    });
}(jQuery), !function($) {
    $.fn.addTouch = function() {
        this.each(function(i, el) {
            $(el).bind("touchstart touchmove touchend touchcancel", function() {
                handleTouch(event);
            });
        });
        var handleTouch = function(event) {
            var touches = event.changedTouches, first = touches[0], eventTypes = {
                touchstart: "mousedown",
                touchmove: "mousemove",
                touchend: "mouseup"
            }, type = eventTypes[event.type], simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, !0, !0, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, !1, !1, !1, !1, 0, null), 
            first.target.dispatchEvent(simulatedEvent);
        };
    };
}(jQuery), !function(Foundation, $) {
    "use strict";
    $(document).on("click.zf.trigger", "[data-open]", function() {
        var id = $(this).data("open");
        $("#" + id).triggerHandler("open.zf.trigger", [ $(this) ]);
    }), $(document).on("click.zf.trigger", "[data-close]", function() {
        var id = $(this).data("close");
        id ? $("#" + id).triggerHandler("close.zf.trigger", [ $(this) ]) : $(this).trigger("close.zf.trigger");
    }), $(document).on("click.zf.trigger", "[data-toggle]", function() {
        var id = $(this).data("toggle");
        $("#" + id).triggerHandler("toggle.zf.trigger", [ $(this) ]);
    }), $(document).on("close.zf.trigger", "[data-closable]", function() {
        var animation = $(this).data("closable") || "fade-out";
        Foundation.Motion ? Foundation.Motion.animateOut($(this), animation, function() {
            $(this).trigger("closed.zf");
        }) : $(this).fadeOut().trigger("closed.zf");
    });
    var MutationObserver = function() {
        for (var prefixes = [ "WebKit", "Moz", "O", "Ms", "" ], i = 0; i < prefixes.length; i++) if (prefixes[i] + "MutationObserver" in window) return window[prefixes[i] + "MutationObserver"];
        return !1;
    }(), checkListeners = function() {
        eventsListener(), resizeListener(), scrollListener(), closemeListener();
    };
    $(window).load(function() {
        checkListeners();
    });
    var closemeListener = function(pluginName) {
        var yetiBoxes = $("[data-yeti-box]"), plugNames = [ "dropdown", "tooltip", "reveal" ];
        if (pluginName && ("string" == typeof pluginName ? plugNames.push(pluginName) : "object" == typeof pluginName && "string" == typeof pluginName[0] ? plugNames.concat(pluginName) : console.error("Plugin names must be strings")), 
        yetiBoxes.length) {
            var listeners = plugNames.map(function(name) {
                return "closeme.zf." + name;
            }).join(" ");
            $(window).off(listeners).on(listeners, function(e, pluginId) {
                var plugin = e.namespace.split(".")[0], plugins = $("[data-" + plugin + "]").not('[data-yeti-box="' + pluginId + '"]');
                plugins.each(function() {
                    var _this = $(this);
                    _this.triggerHandler("close.zf.trigger", [ _this ]);
                });
            });
        }
    }, resizeListener = function(debounce) {
        var timer, $nodes = $("[data-resize]");
        $nodes.length && $(window).off("resize.zf.trigger").on("resize.zf.trigger", function(e) {
            timer && clearTimeout(timer), timer = setTimeout(function() {
                MutationObserver || $nodes.each(function() {
                    $(this).triggerHandler("resizeme.zf.trigger");
                }), $nodes.attr("data-events", "resize");
            }, debounce || 10);
        });
    }, scrollListener = function(debounce) {
        var timer, $nodes = $("[data-scroll]");
        $nodes.length && $(window).off("scroll.zf.trigger").on("scroll.zf.trigger", function(e) {
            timer && clearTimeout(timer), timer = setTimeout(function() {
                MutationObserver || $nodes.each(function() {
                    $(this).triggerHandler("scrollme.zf.trigger");
                }), $nodes.attr("data-events", "scroll");
            }, debounce || 10);
        });
    }, eventsListener = function() {
        if (!MutationObserver) return !1;
        var nodes = document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]"), listeningElementsMutation = function(mutationRecordsList) {
            var $target = $(mutationRecordsList[0].target);
            switch ($target.attr("data-events")) {
              case "resize":
                $target.triggerHandler("resizeme.zf.trigger", [ $target ]);
                break;

              case "scroll":
                $target.triggerHandler("scrollme.zf.trigger", [ $target, window.pageYOffset ]);
                break;

              default:
                return !1;
            }
        };
        if (nodes.length) for (var i = 0; i <= nodes.length - 1; i++) {
            var elementObserver = new MutationObserver(listeningElementsMutation);
            elementObserver.observe(nodes[i], {
                attributes: !0,
                childList: !1,
                characterData: !1,
                subtree: !1,
                attributeFilter: [ "data-events" ]
            });
        }
    };
    Foundation.IHearYou = checkListeners;
}(window.Foundation, window.jQuery), !function(Foundation, $) {
    "use strict";
    function Abide(element, options) {
        this.$element = element, this.options = $.extend({}, Abide.defaults, this.$element.data(), options), 
        this.$window = $(window), this.name = "Abide", this.attr = "data-abide", this._init(), 
        this._events(), Foundation.registerPlugin(this);
    }
    Abide.defaults = {
        validateOn: "fieldChange",
        labelErrorClass: "is-invalid-label",
        inputErrorClass: "is-invalid-input",
        formErrorSelector: ".form-error",
        formErrorClass: "is-visible",
        patterns: {
            alpha: /^[a-zA-Z]+$/,
            alpha_numeric: /^[a-zA-Z0-9]+$/,
            integer: /^[-+]?\d+$/,
            number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
            card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            cvv: /^([0-9]){3,4}$/,
            email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
            url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
            domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
            datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
            date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
            time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
            dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
            month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
            day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
            color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
        },
        validators: {
            equalTo: function(el, required, parent) {
                var from = document.getElementById(el.getAttribute(this.add_namespace("data-equalto"))).value, to = el.value, valid = from === to;
                return valid;
            }
        }
    }, Abide.prototype._init = function() {}, Abide.prototype._events = function() {
        var self = this;
        this.$element.off(".abide").on("reset.fndtn.abide", function(e) {
            self.resetForm($(this));
        }).on("submit.fndtn.abide", function(e) {
            e.preventDefault(), self.validateForm(self.$element);
        }).find("input, textarea, select").off(".abide").on("blur.fndtn.abide change.fndtn.abide", function(e) {
            "fieldChange" === self.options.validateOn && self.validateInput($(e.target), self.$element);
        }).on("keydown.fndtn.abide", function(e) {});
    }, Abide.prototype._reflow = function() {
    }, Abide.prototype.requiredCheck = function($el) {
        switch ($el[0].type) {
          case "text":
            return $el.attr("required") && !$el.val() ? !1 : !0;

          case "checkbox":
            return $el.attr("required") && !$el.is(":checked") ? !1 : !0;

          case "radio":
            return $el.attr("required") && !$el.is(":checked") ? !1 : !0;

          default:
            return !$el.attr("required") || $el.val() && $el.val().length && !$el.is(":empty") ? !0 : !1;
        }
    }, Abide.prototype.findLabel = function($el) {
        return $el.next("label").length ? $el.next("label") : $el.closest("label");
    }, Abide.prototype.addErrorClasses = function($el) {
        var self = this, $label = self.findLabel($el), $formError = $el.next(self.options.formErrorSelector) || $el.find(self.options.formErrorSelector);
        $label && $label.addClass(self.options.labelErrorClass), $formError && $formError.addClass(self.options.formErrorClass), 
        $el.addClass(self.options.inputErrorClass);
    }, Abide.prototype.removeErrorClasses = function($el) {
        var self = this, $label = self.findLabel($el), $formError = $el.next(self.options.formErrorSelector) || $el.find(self.options.formErrorSelector);
        $label && $label.hasClass(self.options.labelErrorClass) && $label.removeClass(self.options.labelErrorClass), 
        $formError && $formError.hasClass(self.options.formErrorClass) && $formError.removeClass(self.options.formErrorClass), 
        $el.hasClass(self.options.inputErrorClass) && $el.removeClass(self.options.inputErrorClass);
    }, Abide.prototype.validateInput = function($el, $form) {
        var label, radioGroupName, self = this;
        $form.find('input[type="text"]'), $form.find('input[type="checkbox"]');
        "text" === $el[0].type ? self.requiredCheck($el) && self.validateText($el) ? (self.removeErrorClasses($el), 
        $el.trigger("valid.fndtn.abide", $el[0])) : (self.addErrorClasses($el), $el.trigger("invalid.fndtn.abide", $el[0])) : "radio" === $el[0].type ? (radioGroupName = $el.attr("name"), 
        label = $el.siblings("label"), self.validateRadio(radioGroupName) ? ($(label).each(function() {
            $(this).hasClass(self.options.labelErrorClass) && $(this).removeClass(self.options.labelErrorClass);
        }), $el.trigger("valid.fndtn.abide", $el[0])) : ($(label).each(function() {
            $(this).addClass(self.options.labelErrorClass);
        }), $el.trigger("invalid.fndtn.abide", $el[0]))) : "checkbox" === $el[0].type ? self.requiredCheck($el) ? (self.removeErrorClasses($el), 
        $el.trigger("valid.fndtn.abide", $el[0])) : (self.addErrorClasses($el), $el.trigger("invalid.fndtn.abide", $el[0])) : self.requiredCheck($el) && self.validateText($el) ? (self.removeErrorClasses($el), 
        $el.trigger("valid.fndtn.abide", $el[0])) : (self.addErrorClasses($el), $el.trigger("invalid.fndtn.abide", $el[0]));
    }, Abide.prototype.validateForm = function($form) {
        for (var self = this, inputs = $form.find("input"), inputCount = $form.find("input").length, counter = 0; inputCount > counter; ) self.validateInput($(inputs[counter]), $form), 
        counter++;
        $form.find(".form-error.is-visible").length || $form.find(".is-invalid-label").length ? $form.find("[data-abide-error]").css("display", "block") : $form.find("[data-abide-error]").css("display", "none");
    }, Abide.prototype.validateText = function($el) {
        var patternLib = this.options.patterns, inputText = $($el).val(), pattern = $($el).attr("pattern");
        return 0 === inputText.length ? !0 : inputText.match(patternLib[pattern]) ? !0 : !1;
    }, Abide.prototype.validateRadio = function(group) {
        var self = this, counter = ($(':radio[name="' + group + '"]').siblings("label"), 
        0);
        return $(':radio[name="' + group + '"]').each(function() {
            self.requiredCheck($(this)) || counter++, $(this).is(":checked") && (counter = 0);
        }), counter > 0 ? !1 : !0;
    }, Abide.prototype.matchValidation = function(val, validation) {}, Abide.prototype.resetForm = function($form) {
        var self = this, invalidAttr = "data-invalid";
        $("[" + self.invalidAttr + "]", $form).removeAttr(invalidAttr), $("." + self.options.labelErrorClass, $form).not("small").removeClass(self.options.labelErrorClass), 
        $("." + self.options.inputErrorClass, $form).not("small").removeClass(self.options.inputErrorClass), 
        $(".form-error.is-visible").removeClass("is-visible"), $form.find("[data-abide-error]").css("display", "none"), 
        $(":input", $form).not(":button, :submit, :reset, :hidden, [data-abide-ignore]").val("").removeAttr(invalidAttr);
    }, Abide.prototype.destroy = function() {}, Foundation.plugin(Abide, "Abide"), "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = Abide), 
    "function" == typeof define && define([ "foundation" ], function() {
        return Abide;
    });
}(Foundation, jQuery), !function($, Foundation) {
    "use strict";
    function Accordion(element, options) {
        this.$element = element, this.options = $.extend({}, Accordion.defaults, this.$element.data(), options), 
        this._init(), Foundation.registerPlugin(this), Foundation.Keyboard.register("Accordion", {
            ENTER: "toggle",
            SPACE: "toggle",
            ARROW_DOWN: "next",
            ARROW_UP: "previous"
        });
    }
    Accordion.defaults = {
        slideSpeed: 250,
        multiExpand: !1,
        allowAllClosed: !1
    }, Accordion.prototype._init = function() {
        this.$element.attr("role", "tablist"), this.$tabs = this.$element.children("li"), 
        this.$tabs.each(function(idx, el) {
            var $el = $(el), $content = $el.find("[data-tab-content]"), id = $content[0].id || Foundation.GetYoDigits(6, "accordion"), linkId = el.id || id + "-label";
            $el.find("a:first").attr({
                "aria-controls": id,
                role: "tab",
                id: linkId,
                "aria-expanded": !1,
                "aria-selected": !1
            }), $content.attr({
                role: "tabpanel",
                "aria-labelledby": linkId,
                "aria-hidden": !0,
                id: id
            });
        });
        var $initActive = this.$element.find(".is-active").children("[data-tab-content]");
        $initActive.length && this.down($initActive, !0), this._events();
    }, Accordion.prototype._events = function() {
        var _this = this;
        this.$tabs.each(function() {
            var $elem = $(this), $tabContent = $elem.children("[data-tab-content]");
            $tabContent.length && $elem.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion", function(e) {
                e.preventDefault(), $elem.hasClass("is-active") ? (_this.options.allowAllClosed || $elem.siblings().hasClass("is-active")) && _this.up($tabContent) : _this.down($tabContent);
            }).on("keydown.zf.accordion", function(e) {
                Foundation.Keyboard.handleKey(e, _this, {
                    toggle: function() {
                        _this.toggle($tabContent);
                    },
                    next: function() {
                        $elem.next().find("a").focus().trigger("click.zf.accordion");
                    },
                    previous: function() {
                        $elem.prev().find("a").focus().trigger("click.zf.accordion");
                    },
                    handled: function() {
                        e.preventDefault(), e.stopPropagation();
                    }
                });
            });
        });
    }, Accordion.prototype.toggle = function($target) {
        if ($target.parent().hasClass("is-active")) {
            if (!this.options.allowAllClosed && !$target.parent().siblings().hasClass("is-active")) return;
            this.up($target);
        } else this.down($target);
    }, Accordion.prototype.down = function($target, firstTime) {
        var _this = this;
        if (!this.options.multiExpand && !firstTime) {
            var $currentActive = this.$element.find(".is-active").children("[data-tab-content]");
            $currentActive.length && this.up($currentActive);
        }
        $target.attr("aria-hidden", !1).parent("[data-tab-content]").addBack().parent().addClass("is-active"), 
        Foundation.Move(_this.options.slideSpeed, $target, function() {
            $target.slideDown(_this.options.slideSpeed);
        }), firstTime || Foundation._reflow(this.$element.attr("data-accordion")), $("#" + $target.attr("aria-labelledby")).attr({
            "aria-expanded": !0,
            "aria-selected": !0
        }), this.$element.trigger("down.zf.accordion", [ $target ]);
    }, Accordion.prototype.up = function($target) {
        var $aunts = $target.parent().siblings(), _this = this, canClose = this.options.multiExpand ? $aunts.hasClass("is-active") : $target.parent().hasClass("is-active");
        (this.options.allowAllClosed || canClose) && (Foundation.Move(this.options.slideSpeed, $target, function() {
            $target.slideUp(_this.options.slideSpeed);
        }), $target.attr("aria-hidden", !0).parent().removeClass("is-active"), $("#" + $target.attr("aria-labelledby")).attr({
            "aria-expanded": !1,
            "aria-selected": !1
        }), this.$element.trigger("up.zf.accordion", [ $target ]));
    }, Accordion.prototype.destroy = function() {
        this.$element.find("[data-tab-content]").slideUp(0).css("display", ""), this.$element.find("a").off(".zf.accordion"), 
        Foundation.unregisterPlugin(this);
    }, Foundation.plugin(Accordion, "Accordion");
}(jQuery, window.Foundation), !function($) {
    "use strict";
    function AccordionMenu(element, options) {
        this.$element = element, this.options = $.extend({}, AccordionMenu.defaults, this.$element.data(), options), 
        Foundation.Nest.Feather(this.$element, "accordion"), this._init(), Foundation.registerPlugin(this), 
        Foundation.Keyboard.register("AccordionMenu", {
            ENTER: "toggle",
            SPACE: "toggle",
            ARROW_RIGHT: "open",
            ARROW_UP: "up",
            ARROW_DOWN: "down",
            ARROW_LEFT: "close",
            ESCAPE: "closeAll",
            TAB: "down",
            SHIFT_TAB: "up"
        });
    }
    AccordionMenu.defaults = {
        slideSpeed: 250,
        multiOpen: !0
    }, AccordionMenu.prototype._init = function() {
        this.$element.find("[data-submenu]").not(".is-active").slideUp(0), this.$element.attr({
            role: "tablist",
            "aria-multiselectable": this.options.multiOpen
        }), this.$menuLinks = this.$element.find(".has-submenu"), this.$menuLinks.each(function() {
            var linkId = this.id || Foundation.GetYoDigits(6, "acc-menu-link"), $elem = $(this), $sub = $elem.children("[data-submenu]"), subId = $sub[0].id || Foundation.GetYoDigits(6, "acc-menu"), isActive = $sub.hasClass("is-active");
            $elem.attr({
                "aria-controls": subId,
                "aria-expanded": isActive,
                "aria-selected": !1,
                role: "tab",
                id: linkId
            }), $sub.attr({
                "aria-labelledby": linkId,
                "aria-hidden": !isActive,
                role: "tabpanel",
                id: subId
            });
        });
        var initPanes = this.$element.find(".is-active");
        if (initPanes.length) {
            var _this = this;
            initPanes.each(function() {
                _this.down($(this));
            });
        }
        this._events();
    }, AccordionMenu.prototype._events = function() {
        var _this = this;
        this.$element.find("li").each(function() {
            var $submenu = $(this).children("[data-submenu]");
            $submenu.length && $(this).children("a").off("click.zf.accordionmenu").on("click.zf.accordionmenu", function(e) {
                e.preventDefault(), _this.toggle($submenu);
            });
        }).on("keydown.zf.accordionmenu", function(e) {
            var $prevElement, $nextElement, $element = $(this), $elements = $element.parent("ul").children("li"), $target = $element.children("[data-submenu]");
            $elements.each(function(i) {
                return $(this).is($element) ? ($prevElement = $elements.eq(Math.max(0, i - 1)), 
                $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1)), $(this).children("[data-submenu]:visible").length && ($nextElement = $element.find("li:first-child")), 
                $(this).is(":first-child") ? $prevElement = $element.parents("li").first() : $prevElement.children("[data-submenu]:visible").length && ($prevElement = $prevElement.find("li:last-child")), 
                void ($(this).is(":last-child") && ($nextElement = $element.parents("li").first().next("li")))) : void 0;
            }), Foundation.Keyboard.handleKey(e, _this, {
                open: function() {
                    $target.is(":hidden") && (_this.down($target), $target.find("li").first().focus());
                },
                close: function() {
                    $target.length && !$target.is(":hidden") ? _this.up($target) : $element.parent("[data-submenu]").length && (_this.up($element.parent("[data-submenu]")), 
                    $element.parents("li").first().focus());
                },
                up: function() {
                    $prevElement.focus();
                },
                down: function() {
                    $nextElement.focus();
                },
                toggle: function() {
                    $element.children("[data-submenu]").length && _this.toggle($element.children("[data-submenu]"));
                },
                closeAll: function() {
                    _this.hideAll();
                },
                handled: function() {
                    e.preventDefault(), e.stopImmediatePropagation();
                }
            });
        });
    }, AccordionMenu.prototype.hideAll = function() {
        this.$element.find("[data-submenu]").slideUp(this.options.slideSpeed);
    }, AccordionMenu.prototype.toggle = function($target) {
        $target.is(":hidden") ? this.down($target) : this.up($target);
    }, AccordionMenu.prototype.down = function($target) {
        var _this = this;
        console.log($target), this.options.multiOpen || this.up(this.$element.find(".is-active").not($target.parentsUntil(this.$element))), 
        $target.addClass("is-active").attr({
            "aria-hidden": !1
        }).parent(".has-submenu").attr({
            "aria-expanded": !0,
            "aria-selected": !0
        }), Foundation.Move(this.options.slideSpeed, $target, function() {
            $target.slideDown(_this.options.slideSpeed);
        }), this.$element.trigger("down.zf.accordionMenu", [ $target ]);
    }, AccordionMenu.prototype.up = function($target) {
        var _this = this;
        Foundation.Move(this.options.slideSpeed, $target, function() {
            $target.slideUp(_this.options.slideSpeed);
        }), $target.attr("aria-hidden", !0).find("[data-submenu]").slideUp(0).attr("aria-hidden", !0).end().parent(".has-submenu").attr({
            "aria-expanded": !1,
            "aria-selected": !1
        }), this.$element.trigger("up.zf.accordionMenu", [ $target ]);
    }, AccordionMenu.prototype.destroy = function() {
        this.$element.find("[data-submenu]").slideDown(0).css("display", ""), this.$element.find("a").off("click.zf.accordionMenu"), 
        Foundation.Nest.Burn(this.$element, "accordion"), Foundation.unregisterPlugin(this);
    }, Foundation.plugin(AccordionMenu, "AccordionMenu");
}(jQuery, window.Foundation), !function($, Foundation) {
    "use strict";
    function Drilldown(element, options) {
        this.$element = element, this.options = $.extend({}, Drilldown.defaults, this.$element.data(), options), 
        Foundation.Nest.Feather(this.$element, "drilldown"), this._init(), Foundation.registerPlugin(this), 
        Foundation.Keyboard.register("Drilldown", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "up",
            ARROW_DOWN: "down",
            ARROW_LEFT: "previous",
            ESCAPE: "close",
            TAB: "down",
            SHIFT_TAB: "up"
        });
    }
    Drilldown.defaults = {
        backButton: '<li class="js-drilldown-back" tabindex="0"><a>Back</a></li>',
        wrapper: "<div></div>",
        closeOnClick: !1
    }, Drilldown.prototype._init = function() {
        this.$submenuAnchors = this.$element.find("li.has-submenu"), this.$submenus = this.$submenuAnchors.children("[data-submenu]").addClass("is-drilldown-sub"), 
        this.$menuItems = this.$element.find("li").not(".js-drilldown-back").attr("role", "menuitem"), 
        this._prepareMenu(), this._keyboardEvents();
    }, Drilldown.prototype._prepareMenu = function() {
        var _this = this;
        this.$submenuAnchors.each(function() {
            var $sub = $(this);
            $sub.find("a")[0].removeAttribute("href"), $sub.children("[data-submenu]").attr({
                "aria-hidden": !0,
                tabindex: 0,
                role: "menu"
            }), _this._events($sub);
        }), this.$submenus.each(function() {
            var $menu = $(this), $back = $menu.find(".js-drilldown-back");
            $back.length || ($menu.prepend(_this.options.backButton), _this._back($menu));
        }), this.$element.parent().hasClass("is-drilldown") || (this.$wrapper = $(this.options.wrapper).addClass("is-drilldown").css(this._getMaxDims()), 
        this.$element.wrap(this.$wrapper));
    }, Drilldown.prototype._events = function($elem) {
        var _this = this;
        $elem.off("click.zf.drilldown").on("click.zf.drilldown", function(e) {
            if (e.stopImmediatePropagation(), e.preventDefault(), e.target !== e.currentTarget.firstElementChild) return !1;
            if (_this._show($elem), _this.options.closeOnClick) {
                var $body = $("body").not(_this.$wrapper);
                $body.off(".zf.drilldown").on("click.zf.drilldown", function(e) {
                    e.preventDefault(), _this._hideAll(), $body.off(".zf.drilldown");
                });
            }
        });
    }, Drilldown.prototype._keyboardEvents = function() {
        var _this = this;
        this.$menuItems.add(this.$element.find(".js-drilldown-back")).on("keydown.zf.drilldown", function(e) {
            var $prevElement, $nextElement, $element = $(this), $elements = $element.parent("ul").children("li");
            $elements.each(function(i) {
                return $(this).is($element) ? ($prevElement = $elements.eq(Math.max(0, i - 1)), 
                void ($nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1)))) : void 0;
            }), Foundation.Keyboard.handleKey(e, _this, {
                next: function() {
                    $element.is(_this.$submenuAnchors) && (_this._show($element), $element.on(Foundation.transitionend($element), function() {
                        $element.find("ul li").filter(_this.$menuItems).first().focus();
                    }));
                },
                previous: function() {
                    _this._hide($element.parent("ul")), $element.parent("ul").on(Foundation.transitionend($element), function() {
                        setTimeout(function() {
                            $element.parent("ul").parent("li").focus();
                        }, 1);
                    });
                },
                up: function() {
                    $prevElement.focus();
                },
                down: function() {
                    $nextElement.focus();
                },
                close: function() {
                    _this._back();
                },
                open: function() {
                    $element.is(_this.$menuItems) ? $element.is(_this.$submenuAnchors) && (_this._show($element), 
                    setTimeout(function() {
                        $element.find("ul li").filter(_this.$menuItems).first().focus();
                    }, 1)) : (_this._hide($element.parent("ul")), setTimeout(function() {
                        $element.parent("ul").parent("li").focus();
                    }, 1));
                },
                handled: function() {
                    e.preventDefault(), e.stopImmediatePropagation();
                }
            });
        });
    }, Drilldown.prototype._hideAll = function() {
        var $elem = this.$element.find(".is-drilldown-sub.is-active").addClass("is-closing");
        $elem.one(Foundation.transitionend($elem), function(e) {
            $elem.removeClass("is-active is-closing");
        }), this.$element.trigger("closed.zf.drilldown");
    }, Drilldown.prototype._back = function($elem) {
        var _this = this;
        $elem.off("click.zf.drilldown"), $elem.children(".js-drilldown-back").on("click.zf.drilldown", function(e) {
            e.stopImmediatePropagation(), _this._hide($elem);
        });
    }, Drilldown.prototype._menuLinkEvents = function() {
        var _this = this;
        this.$menuItems.not(".has-submenu").off("click.zf.drilldown").on("click.zf.drilldown", function(e) {
            setTimeout(function() {
                _this._hideAll();
            }, 0);
        });
    }, Drilldown.prototype._show = function($elem) {
        $elem.children("[data-submenu]").addClass("is-active"), this.$element.trigger("open.zf.drilldown", [ $elem ]);
    }, Drilldown.prototype._hide = function($elem) {
        $elem.addClass("is-closing").one(Foundation.transitionend($elem), function() {
            $elem.removeClass("is-active is-closing");
        }), $elem.trigger("hide.zf.drilldown", [ $elem ]);
    }, Drilldown.prototype._getMaxDims = function() {
        var max = 0, result = {};
        return this.$submenus.add(this.$element).each(function() {
            var numOfElems = $(this).children("li").length;
            max = numOfElems > max ? numOfElems : max;
        }), result.height = max * this.$menuItems[0].getBoundingClientRect().height + "px", 
        result.width = this.$element[0].getBoundingClientRect().width + "px", result;
    }, Drilldown.prototype.destroy = function() {
        this._hideAll(), Foundation.Nest.Burn(this.$element, "drilldown"), this.$element.unwrap().find(".js-drilldown-back").remove().end().find(".is-active, .is-closing, .is-drilldown-sub").removeClass("is-active is-closing is-drilldown-sub").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role").off(".zf.drilldown").end().off("zf.drilldown"), 
        Foundation.unregisterPlugin(this);
    }, Foundation.plugin(Drilldown, "Drilldown");
}(jQuery, window.Foundation), !function($, Foundation) {
    "use strict";
    function Dropdown(element, options) {
        this.$element = element, this.options = $.extend({}, Dropdown.defaults, this.$element.data(), options), 
        this._init(), Foundation.registerPlugin(this), Foundation.Keyboard.register("Dropdown", {
            ENTER: "open",
            SPACE: "open",
            ESCAPE: "close",
            TAB: "tab_forward",
            SHIFT_TAB: "tab_backward"
        });
    }
    Dropdown.defaults = {
        hoverDelay: 250,
        hover: !1,
        vOffset: 1,
        hOffset: 1,
        positionClass: "",
        trapFocus: !1
    }, Dropdown.prototype._init = function() {
        var $id = this.$element.attr("id");
        this.$anchor = $('[data-toggle="' + $id + '"]') || $('[data-open="' + $id + '"]'), 
        this.$anchor.attr({
            "aria-controls": $id,
            "data-is-focus": !1,
            "data-yeti-box": $id,
            "aria-haspopup": !0,
            "aria-expanded": !1
        }), this.options.positionClass = this.getPositionClass(), this.counter = 4, this.usedPositions = [], 
        this.$element.attr({
            "aria-hidden": "true",
            "data-yeti-box": $id,
            "data-resize": $id,
            "aria-labelledby": this.$anchor[0].id || Foundation.GetYoDigits(6, "dd-anchor")
        }), this._events();
    }, Dropdown.prototype.getPositionClass = function() {
        var position = this.$element[0].className.match(/(top|left|right)/g);
        return position = position ? position[0] : "";
    }, Dropdown.prototype._reposition = function(position) {
        this.usedPositions.push(position ? position : "bottom"), !position && this.usedPositions.indexOf("top") < 0 ? this.$element.addClass("top") : "top" === position && this.usedPositions.indexOf("bottom") < 0 ? this.$element.removeClass(position) : "left" === position && this.usedPositions.indexOf("right") < 0 ? this.$element.removeClass(position).addClass("right") : "right" === position && this.usedPositions.indexOf("left") < 0 ? this.$element.removeClass(position).addClass("left") : !position && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0 ? this.$element.addClass("left") : "top" === position && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0 ? this.$element.removeClass(position).addClass("left") : "left" === position && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.$element.removeClass(position) : "right" === position && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.$element.removeClass(position) : this.$element.removeClass(position), 
        this.classChanged = !0, this.counter--;
    }, Dropdown.prototype._setPosition = function() {
        if ("false" === this.$anchor.attr("aria-expanded")) return !1;
        var position = this.getPositionClass(), $eleDims = Foundation.Box.GetDimensions(this.$element), direction = (Foundation.Box.GetDimensions(this.$anchor), 
        "left" === position ? "left" : "right" === position ? "left" : "top"), param = "top" === direction ? "height" : "width";
        "height" === param ? this.options.vOffset : this.options.hOffset;
        if ($eleDims.width >= $eleDims.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.$element)) return this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, "center bottom", this.options.vOffset, this.options.hOffset, !0)).css({
            width: $eleDims.windowDims.width - 2 * this.options.hOffset,
            height: "auto"
        }), this.classChanged = !0, !1;
        for (this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, position, this.options.vOffset, this.options.hOffset)); !Foundation.Box.ImNotTouchingYou(this.$element) && this.counter; ) this._reposition(position), 
        this._setPosition();
    }, Dropdown.prototype._events = function() {
        var _this = this;
        this.$element.on({
            "open.zf.trigger": this.open.bind(this),
            "close.zf.trigger": this.close.bind(this),
            "toggle.zf.trigger": this.toggle.bind(this),
            "resizeme.zf.trigger": this._setPosition.bind(this)
        }), this.options.hover && this.$anchor.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function() {
            console.log("hover"), clearTimeout(_this.timeout), _this.timeOut = setTimeout(function() {
                _this.open(), _this.$anchor.data("hover", !0);
            }, _this.options.hoverDelay);
        }).on("mouseleave.zf.dropdown", function() {
            clearTimeout(_this.timeout), _this.timeOut = setTimeout(function() {
                _this.close(), _this.$anchor.data("hover", !1);
            }, _this.options.hoverDelay);
        }), this.$anchor.add(this.$element).on("keydown.zf.dropdown", function(e) {
            var visibleFocusableElements = Foundation.Keyboard.findFocusable(_this.$element);
            Foundation.Keyboard.handleKey(e, _this, {
                tab_forward: function() {
                    this.$element.find(":focus").is(visibleFocusableElements.eq(-1)) && (this.options.trapFocus ? (visibleFocusableElements.eq(0).focus(), 
                    e.preventDefault()) : this.close());
                },
                tab_backward: function() {
                    (this.$element.find(":focus").is(visibleFocusableElements.eq(0)) || this.$element.is(":focus")) && (this.options.trapFocus ? (visibleFocusableElements.eq(-1).focus(), 
                    e.preventDefault()) : this.close());
                },
                open: function() {
                    _this.open(), _this.$element.attr("tabindex", -1).focus();
                },
                close: function() {
                    _this.close(), _this.$anchor.focus();
                }
            });
        });
    }, Dropdown.prototype.open = function() {
        this.$element.trigger("closeme.zf.dropdown", this.$element.attr("id")), this.$anchor.addClass("hover").attr({
            "aria-expanded": !0
        }), this._setPosition(), this.$element.addClass("is-open").attr({
            "aria-hidden": !1
        }), this.$element.trigger("show.zf.dropdown", [ this.$element ]);
    }, Dropdown.prototype.close = function() {
        if (!this.$element.hasClass("is-open")) return !1;
        if (this.$element.removeClass("is-open").attr({
            "aria-hidden": !0
        }), this.$anchor.removeClass("hover").attr("aria-expanded", !1), this.classChanged) {
            var curPositionClass = this.getPositionClass();
            curPositionClass && this.$element.removeClass(curPositionClass), this.$element.addClass(this.options.positionClass).css({
                height: "",
                width: ""
            }), this.classChanged = !1, this.counter = 4, this.usedPositions.length = 0;
        }
        this.$element.trigger("hide.zf.dropdown", [ this.$element ]);
    }, Dropdown.prototype.toggle = function() {
        if (this.$element.hasClass("is-open")) {
            if (this.$anchor.data("hover")) return;
            this.close();
        } else this.open();
    }, Dropdown.prototype.destroy = function() {
        this.$element.off(".zf.trigger").hide(), this.$anchor.off(".zf.dropdown"), Foundation.unregisterPlugin(this);
    }, Foundation.plugin(Dropdown, "Dropdown");
}(jQuery, window.Foundation), !function(Foundation, $) {
    "use strict";
    function DropdownMenu(element, options) {
        this.$element = element, this.options = $.extend({}, DropdownMenu.defaults, this.$element.data(), options), 
        Foundation.Nest.Feather(this.$element, "dropdown"), this._init(), Foundation.registerPlugin(this), 
        Foundation.Keyboard.register("DropdownMenu", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "up",
            ARROW_DOWN: "down",
            ARROW_LEFT: "previous",
            ESCAPE: "close"
        });
    }
    DropdownMenu.defaults = {
        clickOpen: !0,
        closeOnClick: !1,
        disableHover: !1,
        autoclose: !0,
        hoverDelay: 150,
        closingTime: 500,
        alignment: "left",
        verticalClass: "vertical",
        rightClass: "align-right"
    }, DropdownMenu.prototype._init = function() {
        this.$element.hasClass(this.options.verticalClass) && (this.vertical = !0), this._prepareMenu();
    }, DropdownMenu.prototype._prepareMenu = function() {
        var _this = this;
        this.$tabs = this.$element.children("li.has-submenu"), this.$tabs.children("[data-submenu]").addClass("first-sub"), 
        this.$submenus = this.$element.find("li.has-submenu"), this.$menuItems = this.$element.find("li").attr({
            role: "menuitem",
            tabindex: 0
        }), this.$menuItems.children("a").attr("tabindex", -1), this.$element.hasClass(this.options.rightClass) ? (this.options.alignment = "right", 
        this.$submenus.addClass("is-left-arrow opens-left")) : this.$submenus.addClass("is-right-arrow opens-right"), 
        this.vertical || this.$tabs.removeClass("is-right-arrow is-left-arrow opens-left opens-right").addClass("is-down-arrow"), 
        this.$tabs.each(function() {
            var $tab = $(this);
            $tab.attr({
                role: "menuitem",
                tabindex: 0,
                "aria-label": $tab.children("a:first-child").text()
            }).children("a").attr("tabindex", -1), $tab.children("[data-submenu]") && $tab.attr("aria-haspopup", !0);
        }), this.$submenus.each(function() {
            var $sub = $(this);
            $sub.children("[data-submenu]").attr({
                "aria-hidden": !0,
                tabindex: -1,
                role: "menu"
            }).addClass("vertical"), _this._events($sub);
        });
    }, DropdownMenu.prototype._events = function($elem) {
        var _this = this, isTouch = void 0 !== window.ontouchstart;
        (this.options.clickOpen || isTouch) && $elem.off("click.zf.dropdownmenu").on("click.zf.dropdownmenu", function(e) {
            if ($(this).hasClass("is-dropdown-submenu-parent")) {
                var hasClicked = $elem.data("isClick");
                isTouch && hasClicked || (e.preventDefault(), e.stopPropagation(), hasClicked ? _this._hide($elem) : (_this._hideOthers($elem), 
                _this._show($elem), $elem.data("isClick", !0).parentsUntil("[data-dropdown-menu]", ".is-dropdown-submenu-parent").data("isClick", !0), 
                _this.options.closeOnClick && _this._addBodyHandler()));
            }
        }), this.options.disableHover || (this.$menuItems.on("mouseenter.zf.dropdownmenu", function(e) {
            var $el = $(this);
            $el.hasClass("is-active") || _this._hideOthers($el);
        }), $elem.off("mouseenter.zf.dropdownmenu").on("mouseenter.zf.dropdownmenu", function(e) {
            clearTimeout($elem.closeTimer), $elem.hasClass("is-active") || ($elem.openTimer = setTimeout(function() {
                _this._show($elem);
            }, _this.options.hoverDelay));
        }).on("mouseleave.zf.dropdownmenu", function(e) {
            !$elem.data("isClick") && _this.options.autoclose && (clearTimeout($elem.openTimer), 
            $elem.closeTimer = setTimeout(function() {
                _this._hide($elem);
            }, _this.options.closingTime));
        })), this.$menuItems.on("keydown.zf.dropdownmenu", function(e) {
            var $prevElement, $nextElement, $element = $(this), $tabs = _this.$element.children("li"), isTab = $element.is($tabs), $elements = isTab ? $tabs : $element.parents("li").first().add($element.parent("ul").children("li"));
            $elements.each(function(i) {
                return $(this).is($element) ? ($prevElement = $elements.eq(i - 1), void ($nextElement = $elements.eq(i + 1))) : void 0;
            });
            var nextSibling = function() {
                $element.is(":last-child") || $nextElement.focus();
            }, prevSibling = function() {
                $prevElement.focus();
            }, openSub = function() {
                $element.has("ul").length && (_this._show($element), $element.find("li").first().focus());
            }, closeSub = function() {
                $element.parents("li").first().focus(), _this._hide($element.parents("li").first());
            }, functions = {
                open: openSub,
                close: function() {
                    _this._hideAll(), _this.$menuItems.first().focus();
                },
                handled: function() {
                    e.preventDefault(), e.stopImmediatePropagation();
                }
            };
            isTab ? _this.vertical ? "left" === _this.options.alignment ? $.extend(functions, {
                down: nextSibling,
                up: prevSibling,
                next: openSub,
                previous: closeSub
            }) : $.extend(functions, {
                down: nextSibling,
                up: prevSibling,
                next: closeSub,
                previous: openSub
            }) : $.extend(functions, {
                next: nextSibling,
                previous: prevSibling,
                down: openSub,
                up: closeSub
            }) : "left" === _this.options.alignment ? $.extend(functions, {
                next: openSub,
                previous: closeSub,
                down: nextSibling,
                up: prevSibling
            }) : $.extend(functions, {
                next: closeSub,
                previous: openSub,
                down: nextSibling,
                up: prevSibling
            }), Foundation.Keyboard.handleKey(e, _this, functions);
        });
    }, DropdownMenu.prototype._toggle = function($elem) {
        $elem.hasClass("is-active") ? this._hide($elem) : this._show($elem);
    }, DropdownMenu.prototype._addBodyHandler = function() {
        var $body = $("body"), _this = this;
        $body.not(_this.$element).on("click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu", function(e) {
            _this._hideAll(), $body.off("click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu");
        });
    }, DropdownMenu.prototype._show = function($elem) {
        this._hideOthers($elem), $elem.focus();
        var $sub = $elem.children("[data-submenu]:first-of-type");
        $elem.addClass("is-active"), $sub.css("visibility", "hidden").addClass("js-dropdown-active").attr("aria-hidden", !1);
        var clear = Foundation.Box.ImNotTouchingYou($sub, null, !0);
        clear || ("left" === this.options.alignment ? $elem.removeClass("opens-left").addClass("opens-right") : $elem.removeClass("opens-right").addClass("opens-left"), 
        this.changed = !0, clear = Foundation.Box.ImNotTouchingYou($sub, null, !0), clear || ($elem.removeClass("opens-left opens-right").addClass("opens-inner"), 
        this.changed = !0)), $sub.css("visibility", ""), this.$element.trigger("show.zf.dropdownmenu", [ $elem ]);
    }, DropdownMenu.prototype._hide = function($elem) {
        this._hideSome($elem);
    }, DropdownMenu.prototype._hideSome = function($elems) {
        $elems.length && ($elems.removeClass("is-active opens-inner").data("isClick", !1).find(".is-active").removeClass("is-active").data("isClick", !1).end().find(".js-dropdown-active").removeClass("js-dropdown-active").attr("aria-hidden", !0), 
        $elems.parent(".has-submenu").removeClass("is-active"), this.changed && ("left" === this.options.alignment ? $elems.find(".opens-left").removeClass("opens-left").addClass("opens-right") : $elems.find(".opens-right").removeClass("opens-right").addClass("opens-left")), 
        this.$element.trigger("hide.zf.dropdownmenu"));
    }, DropdownMenu.prototype._hideOthers = function($elem) {
        this._hideSome($elem.siblings(".has-submenu.is-active"));
    }, DropdownMenu.prototype._hideAll = function() {
        this._hideSome(this.$element);
    }, DropdownMenu.prototype.destroy = function() {
        this._hideAll(), this.$element.removeData("zf-plugin").find("li").removeClass("js-dropdown-nohover is-right-arrow is-left-arrow opens-left opens-inner opens-right").add("a").off(".zf.dropdownmenu").end().find("ul").removeClass("first-sub"), 
        Foundation.Nest.Burn(this.$element, "dropdown"), Foundation.unregisterPlugin(this);
    }, Foundation.plugin(DropdownMenu, "DropdownMenu");
}(Foundation, jQuery), !function(Foundation, $) {
    "use strict";
    function Equalizer(element, options) {
        this.$element = element, this.options = $.extend({}, Equalizer.defaults, this.$element.data(), options), 
        this.$window = $(window), this.name = "equalizer", this.attr = "data-equalizer", 
        this._init(), this._events(), Foundation.registerPlugin(this);
    }
    Equalizer.defaults = {
        equalizeOnStack: !0,
        throttleInterval: 50
    }, Equalizer.prototype._init = function() {
        this._reflow();
    }, Equalizer.prototype._events = function() {
        var self = this;
        this.$window.off(".equalizer").on("resize.fndtn.equalizer", Foundation.util.throttle(function() {
            self._reflow();
        }, self.options.throttleInterval));
    }, Equalizer.prototype._killswitch = function() {}, Equalizer.prototype._reflow = function() {
        var self = this;
        $("[" + this.attr + "]").each(function() {
            var $eqParent = $(this), adjustedHeights = [], $images = $eqParent.find("img");
            $images.length ? Foundation.onImagesLoaded($images, function() {
                adjustedHeights = self.getHeights($eqParent), self.applyHeight($eqParent, adjustedHeights);
            }) : (adjustedHeights = self.getHeights($eqParent), self.applyHeight($eqParent, adjustedHeights));
        });
    }, Equalizer.prototype.getHeights = function($eqParent) {
        var heights, eqGroupName = $eqParent.data("equalizer"), eqGroup = eqGroupName ? $eqParent.find("[" + this.attr + '-watch="' + eqGroupName + '"]:visible') : $eqParent.find("[" + this.attr + "-watch]:visible");
        return eqGroup.height("inherit"), heights = eqGroup.map(function() {
            return $(this).outerHeight(!1);
        }).get(), console.log(heights), heights;
    }, Equalizer.prototype.applyHeight = function($eqParent, heights) {
        var eqGroupName = $eqParent.data("equalizer"), eqGroup = eqGroupName ? $eqParent.find("[" + this.attr + '-watch="' + eqGroupName + '"]:visible') : $eqParent.find("[" + this.attr + "-watch]:visible"), max = Math.max.apply(null, heights);
        $eqParent.trigger("preEqualized.zf.Equalizer");
        for (var i = 0; i < eqGroup.length; i++) $(eqGroup[i]).css("height", max);
        $eqParent.trigger("postEqualized.zf.Equalizer");
    }, Equalizer.prototype.destroy = function() {}, Foundation.plugin(Equalizer, "Equalizer"), 
    "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = Equalizer), 
    "function" == typeof define && define([ "foundation" ], function() {
        return Equalizer;
    });
}(Foundation, jQuery), !function(Foundation, $) {
    "use strict";
    function Interchange(element, options) {
        this.$element = element, this.options = $.extend({}, Interchange.defaults, options), 
        this.rules = [], this.currentPath = "", this._init(), this._events(), Foundation.registerPlugin(this);
    }
    Interchange.defaults = {
        rules: null
    }, Interchange.SPECIAL_QUERIES = {
        landscape: "screen and (orientation: landscape)",
        portrait: "screen and (orientation: portrait)",
        retina: "only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)"
    }, Interchange.prototype._init = function() {
        this._addBreakpoints(), this._generateRules(), this._reflow();
    }, Interchange.prototype._events = function() {
        $(window).on("resize.fndtn.interchange", Foundation.util.throttle(this._reflow.bind(this), 50));
    }, Interchange.prototype._reflow = function() {
        var match;
        for (var i in this.rules) {
            var rule = this.rules[i];
            window.matchMedia(rule.query).matches && (match = rule);
        }
        match && this.replace(match.path);
    }, Interchange.prototype._addBreakpoints = function() {
        for (var i in Foundation.MediaQuery.queries) {
            var query = Foundation.MediaQuery.queries[i];
            Interchange.SPECIAL_QUERIES[query.name] = query.value;
        }
    }, Interchange.prototype._generateRules = function() {
        var rules, rulesList = [];
        rules = this.options.rules ? this.options.rules : this.$element.data("interchange").match(/\[.*?\]/g);
        for (var i in rules) {
            var rule = rules[i].slice(1, -1).split(", "), path = rule.slice(0, -1).join(""), query = rule[rule.length - 1];
            Interchange.SPECIAL_QUERIES[query] && (query = Interchange.SPECIAL_QUERIES[query]), 
            rulesList.push({
                path: path,
                query: query
            });
        }
        this.rules = rulesList;
    }, Interchange.prototype.replace = function(path) {
        if (this.currentPath !== path) {
            var _this = this;
            "IMG" === this.$element[0].nodeName ? this.$element.attr("src", path).load(function() {
                _this.$element.trigger("replaced.zf.interchange"), _this.currentPath = path;
            }) : path.match(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i) ? this.$element.css({
                "background-image": "url(" + path + ")"
            }) : $.get(path, function(response) {
                _this.$element.html(response), _this.$element.trigger("replaced.zf.interchange"), 
                _this.currentPath = path;
            });
        }
    }, Interchange.prototype.destroy = function() {}, Foundation.plugin(Interchange, "Interchange"), 
    "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = Interchange), 
    "function" == typeof define && define([ "foundation" ], function() {
        return Interchange;
    });
}(Foundation, jQuery), !function(Foundation, $) {
    "use strict";
    function Magellan(element, options) {
        this.$element = element, this.options = $.extend({}, Magellan.defaults, options), 
        this._init(), Foundation.registerPlugin(this);
    }
    Magellan.defaults = {
        animationDuration: 500,
        animationEasing: "linear",
        threshold: 50,
        activeClass: "active",
        deepLinking: !1
    }, Magellan.prototype._init = function() {
        var id = this.$element[0].id || Foundation.GetYoDigits(6, "magellan");
        this.$targets = $("[data-magellan-target]"), this.$links = this.$element.find("a"), 
        this.$element.attr({
            "data-resize": id,
            "data-scroll": id,
            id: id
        }), this.$active = $(), this.scrollPos = parseInt(window.pageYOffset, 10), this._events();
    }, Magellan.prototype.calcPoints = function() {
        var _this = this, body = document.body, html = document.documentElement;
        this.points = [], this.winHeight = Math.round(Math.max(window.innerHeight, document.body.clientHeight)), 
        this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)), 
        this.$targets.each(function() {
            var $tar = $(this), pt = Math.round($tar.offset().top - _this.options.threshold);
            $tar.targetPoint = pt, _this.points.push(pt);
        });
    }, Magellan.prototype._events = function() {
        var _this = this, $body = $("html, body"), opts = {
            duration: _this.options.animationDuration,
            easing: _this.options.animationEasing
        };
        $(window).one("load", function() {
            _this.calcPoints(), _this._updateActive();
        }), this.$element.on({
            "resizeme.zf.trigger": this.reflow.bind(this),
            "scrollme.zf.trigger": this._updateActive.bind(this)
        }).on("click.zf.magellan", 'a[href^="#"]', function(e) {
            e.preventDefault();
            var arrival = this.getAttribute("href"), scrollPos = $(arrival).offset().top - _this.options.threshold / 2;
            $body.stop(!0).animate({
                scrollTop: scrollPos
            }, opts);
        });
    }, Magellan.prototype.reflow = function() {
        this.calcPoints(), this._updateActive();
    }, Magellan.prototype._updateActive = function() {
        var curIdx, winPos = parseInt(window.pageYOffset, 10);
        if (winPos + this.winHeight === this.docHeight) curIdx = this.points.length - 1; else if (winPos < this.points[0]) curIdx = 0; else {
            var isDown = this.scrollPos < winPos, _this = this, curVisible = this.points.filter(function(p, i) {
                return isDown ? winPos >= p : p - _this.options.threshold <= winPos;
            });
            curIdx = curVisible.length ? curVisible.length - 1 : 0;
        }
        if (this.$active.removeClass(this.options.activeClass), this.$active = this.$links.eq(curIdx).addClass(this.options.activeClass), 
        this.options.deepLinking) {
            var hash = this.$active[0].getAttribute("href");
            window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
        }
        this.scrollPos = winPos, this.$element.trigger("update.zf.magellan", [ this.$active ]);
    }, Magellan.prototype.destroy = function() {
        this.$element.off(".zf.trigger .zf.magellan").find("." + this.options.activeClass).removeClass(this.options.activeClass);
        var hash = this.$active[0].getAttribute("href");
        window.location.hash.replace(hash, ""), Foundation.unregisterPlugin(this);
    }, Foundation.plugin(Magellan, "Magellan"), "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = Magellan), 
    "function" == typeof define && define([ "foundation" ], function() {
        return Magellan;
    });
}(Foundation, jQuery), !function($, Foundation) {
    "use strict";
    function OffCanvas(element, options) {
        this.$element = element, this.options = $.extend({}, OffCanvas.defaults, this.$element.data(), options), 
        this.$lastTrigger = $(), this._init(), this._events(), Foundation.registerPlugin(this);
    }
    OffCanvas.defaults = {
        closeOnClick: !0,
        transitionTime: 0,
        position: "left",
        forceTop: !0,
        isRevealed: !1,
        revealOn: null,
        autoFocus: !0,
        revealClass: "reveal-for-"
    }, OffCanvas.prototype._init = function() {
        var id = this.$element.attr("id");
        if (this.$element.attr("aria-hidden", "true"), $(document).find('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr("aria-expanded", "false").attr("aria-controls", id), 
        this.options.closeOnClick) if ($(".js-off-canvas-exit").length) this.$exiter = $(".js-off-canvas-exit"); else {
            var exiter = document.createElement("div");
            exiter.setAttribute("class", "js-off-canvas-exit"), $("[data-off-canvas-content]").append(exiter), 
            this.$exiter = $(exiter);
        }
        this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, "g").test(this.$element[0].className), 
        this.options.isRevealed && (this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split("-")[2], 
        this._setMQChecker()), this.options.transitionTime || (this.options.transitionTime = 1e3 * parseFloat(window.getComputedStyle($("[data-off-canvas-wrapper]")[0]).transitionDuration));
    }, OffCanvas.prototype._events = function() {
        if (this.$element.on({
            "open.zf.trigger": this.open.bind(this),
            "close.zf.trigger": this.close.bind(this),
            "toggle.zf.trigger": this.toggle.bind(this),
            "keydown.zf.offcanvas": this._handleKeyboard.bind(this)
        }), this.$exiter.length) {
            this.$exiter.on({
                "click.zf.offcanvas": this.close.bind(this)
            });
        }
    }, OffCanvas.prototype._setMQChecker = function() {
        var _this = this;
        $(window).on("changed.zf.mediaquery", function() {
            Foundation.MediaQuery.atLeast(_this.options.revealOn) ? _this.reveal(!0) : _this.reveal(!1);
        }).one("load.zf.offcanvas", function() {
            Foundation.MediaQuery.atLeast(_this.options.revealOn) && _this.reveal(!0);
        });
    }, OffCanvas.prototype.reveal = function(isRevealed) {
        var $closer = this.$element.find("[data-close]");
        isRevealed ? $closer.length && $closer.hide() : $closer.length && $closer.show();
    }, OffCanvas.prototype.open = function(event, trigger) {
        if (!this.$element.hasClass("is-open")) {
            var _this = this;
            $(document.body);
            $("body").scrollTop(0), Foundation.Move(this.options.transitionTime, this.$element, function() {
                $("[data-off-canvas-wrapper]").addClass("is-off-canvas-open is-open-" + _this.options.position), 
                _this.$element.addClass("is-open").attr("aria-hidden", "false").trigger("opened.zf.offcanvas");
            }), trigger && (this.$lastTrigger = trigger.attr("aria-expanded", "true")), this.options.autoFocus && this.$element.one("finished.zf.animate", function() {
                _this.$element.find("a, button").eq(0).focus();
            });
        }
    }, OffCanvas.prototype.close = function() {
        if (this.$element.hasClass("is-open")) {
            var _this = this;
            Foundation.Move(this.options.transitionTime, this.$element, function() {
                $("[data-off-canvas-wrapper]").removeClass("is-off-canvas-open is-open-" + _this.options.position), 
                _this.$element.removeClass("is-open");
            }), this.$element.attr("aria-hidden", "true").trigger("closed.zf.offcanvas"), this.$lastTrigger.attr("aria-expanded", "false");
        }
    }, OffCanvas.prototype.toggle = function(event, trigger) {
        this.$element.hasClass("is-open") ? this.close(event, trigger) : this.open(event, trigger);
    }, OffCanvas.prototype._handleKeyboard = function(event) {
        27 === event.which && (event.stopPropagation(), event.preventDefault(), this.close(), 
        this.$lastTrigger.focus());
    }, OffCanvas.prototype.destroy = function() {}, Foundation.plugin(OffCanvas, "OffCanvas");
}(jQuery, Foundation), !function($, Foundation) {
    "use strict";
    function Orbit(element, options) {
        this.$element = element, this.options = $.extend({}, Orbit.defaults, this.$element.data(), options), 
        this._init(), Foundation.registerPlugin(this), Foundation.Keyboard.register("Orbit", {
            ltr: {
                ARROW_RIGHT: "next",
                ARROW_LEFT: "previous"
            },
            rtl: {
                ARROW_LEFT: "next",
                ARROW_RIGHT: "previous"
            }
        });
    }
    Orbit.defaults = {
        bullets: !0,
        navButtons: !0,
        animInFromRight: "slide-in-right",
        animOutToRight: "slide-out-right",
        animInFromLeft: "slide-in-left",
        animOutToLeft: "slide-out-left",
        autoPlay: !0,
        timerDelay: 5e3,
        infiniteWrap: !0,
        swipe: !0,
        pauseOnHover: !0,
        accessible: !0,
        containerClass: "orbit-container",
        slideClass: "orbit-slide",
        boxOfBullets: "orbit-bullets",
        nextClass: "orbit-next",
        prevClass: "orbit-previous"
    }, Orbit.prototype._init = function() {
        this.$wrapper = this.$element.find("." + this.options.containerClass), this.$slides = this.$element.find("." + this.options.slideClass);
        var $images = this.$element.find("img"), initActive = this.$slides.filter(".is-active");
        initActive.length || this.$slides.eq(0).addClass("is-active"), $images.length ? Foundation.onImagesLoaded($images, this._prepareForOrbit.bind(this)) : this._prepareForOrbit(), 
        this.options.bullets && this._loadBullets(), this._events(), this.options.autoPlay && this.geoSync(), 
        this.options.accessible && this.$wrapper.attr("tabindex", 0);
    }, Orbit.prototype._loadBullets = function() {
        this.$bullets = this.$element.find("." + this.options.boxOfBullets).find("button");
    }, Orbit.prototype.geoSync = function() {
        var _this = this;
        this.timer = new Foundation.Timer(this.$element, {
            duration: this.options.timerDelay,
            infinite: !1
        }, function() {
            _this.changeSlide(!0);
        }), this.timer.start();
    }, Orbit.prototype._prepareForOrbit = function() {
        var _this = this;
        this._setWrapperHeight(function(max) {
            _this._setSlideHeight(max);
        });
    }, Orbit.prototype._setWrapperHeight = function(cb) {
        var temp, max = 0, counter = 0;
        this.$slides.each(function() {
            temp = this.getBoundingClientRect().height, $(this).attr("data-slide", counter), 
            counter && $(this).css({
                position: "relative",
                display: "none"
            }), max = temp > max ? temp : max, counter++;
        }), counter === this.$slides.length && (this.$wrapper.css({
            height: max
        }), cb(max));
    }, Orbit.prototype._setSlideHeight = function(height) {
        this.$slides.each(function() {
            $(this).css("max-height", height);
        });
    }, Orbit.prototype._events = function() {
        var _this = this;
        if (this.options.swipe && this.$slides.off("swipeleft.zf.orbit swiperight.zf.orbit").on("swipeleft.zf.orbit", function(e) {
            e.preventDefault(), _this.changeSlide(!0);
        }).on("swiperight.zf.orbit", function(e) {
            e.preventDefault(), _this.changeSlide(!1);
        }), this.options.autoPlay && (this.$slides.on("click.zf.orbit", function() {
            _this.$element.data("clickedOn", _this.$element.data("clickedOn") ? !1 : !0), _this.timer[_this.$element.data("clickedOn") ? "pause" : "start"]();
        }), this.options.pauseOnHover && this.$element.on("mouseenter.zf.orbit", function() {
            _this.timer.pause();
        }).on("mouseleave.zf.orbit", function() {
            _this.$element.data("clickedOn") || _this.timer.start();
        })), this.options.navButtons) {
            var $controls = this.$element.find("." + this.options.nextClass + ", ." + this.options.prevClass);
            $controls.attr("tabindex", 0).on("click.zf.orbit touchend.zf.orbit", function() {
                _this.changeSlide($(this).hasClass(_this.options.nextClass));
            });
        }
        this.options.bullets && this.$bullets.on("click.zf.orbit touchend.zf.orbit", function() {
            if (/is-active/g.test(this.className)) return !1;
            var idx = $(this).data("slide"), ltr = idx > _this.$slides.filter(".is-active").data("slide"), $slide = _this.$slides.eq(idx);
            _this.changeSlide(ltr, $slide, idx);
        }), this.$wrapper.add(this.$bullets).on("keydown.zf.orbit", function(e) {
            Foundation.Keyboard.handleKey(e, _this, {
                next: function() {
                    _this.changeSlide(!0);
                },
                previous: function() {
                    _this.changeSlide(!1);
                },
                handled: function() {
                    $(e.target).is(_this.$bullets) && _this.$bullets.filter(".is-active").focus();
                }
            });
        });
    }, Orbit.prototype.changeSlide = function(isLTR, chosenSlide, idx) {
        var $curSlide = this.$slides.filter(".is-active").eq(0);
        if (/mui/g.test($curSlide[0].className)) return !1;
        var $newSlide, $firstSlide = this.$slides.first(), $lastSlide = this.$slides.last(), dirIn = isLTR ? "Right" : "Left", dirOut = isLTR ? "Left" : "Right", _this = this;
        $newSlide = chosenSlide ? chosenSlide : isLTR ? this.options.infiniteWrap ? $curSlide.next("." + this.options.slideClass).length ? $curSlide.next("." + this.options.slideClass) : $firstSlide : $curSlide.next("." + this.options.slideClass) : this.options.infiniteWrap ? $curSlide.prev("." + this.options.slideClass).length ? $curSlide.prev("." + this.options.slideClass) : $lastSlide : $curSlide.prev("." + this.options.slideClass), 
        $newSlide.length && (this.options.bullets && (idx = idx || this.$slides.index($newSlide), 
        this._updateBullets(idx)), Foundation.Motion.animateIn($newSlide.addClass("is-active").css({
            position: "absolute",
            top: 0
        }), this.options["animInFrom" + dirIn], function() {
            $newSlide.css({
                position: "relative",
                display: "block"
            }).attr("aria-live", "polite");
        }), Foundation.Motion.animateOut($curSlide.removeClass("is-active"), this.options["animOutTo" + dirOut], function() {
            $curSlide.removeAttr("aria-live"), _this.options.autoPlay && _this.timer.restart(), 
            _this.$element.trigger("slidechange.zf.orbit", [ $newSlide ]);
        }));
    }, Orbit.prototype._updateBullets = function(idx) {
        var $oldBullet = this.$element.find("." + this.options.boxOfBullets).find(".is-active").removeClass("is-active").blur(), span = $oldBullet.find("span:last").detach();
        this.$bullets.eq(idx).addClass("is-active").append(span);
    }, Orbit.prototype.destroy = function() {
        delete this.timer, this.$element.off(".zf.orbit").find("*").off(".zf.orbit").end().hide(), 
        Foundation.unregisterPlugin(this);
    }, Foundation.plugin(Orbit, "Orbit");
}(jQuery, window.Foundation), !function(Foundation, $) {
    "use strict";
    function ResponsiveMenu(element) {
        this.$element = $(element), this.rules = this.$element.data("responsive-menu"), 
        this.currentMq = null, this.currentPlugin = null, this._init(), this._events(), 
        Foundation.registerPlugin(this);
    }
    var MenuPlugins = {
        dropdown: {
            cssClass: "dropdown",
            plugin: Foundation._plugins["dropdown-menu"] || null
        },
        drilldown: {
            cssClass: "drilldown",
            plugin: Foundation._plugins.drilldown || null
        },
        accordion: {
            cssClass: "accordion-menu",
            plugin: Foundation._plugins["accordion-menu"] || null
        }
    };
    ResponsiveMenu.defaults = {}, ResponsiveMenu.prototype._init = function() {
        for (var rulesTree = {}, rules = this.rules.split(" "), i = 0; i < rules.length; i++) {
            var rule = rules[i].split("-"), ruleSize = rule.length > 1 ? rule[0] : "small", rulePlugin = rule.length > 1 ? rule[1] : rule[0];
            null !== MenuPlugins[rulePlugin] && (rulesTree[ruleSize] = MenuPlugins[rulePlugin]);
        }
        this.rules = rulesTree, $.isEmptyObject(rulesTree) || this._checkMediaQueries();
    }, ResponsiveMenu.prototype._events = function() {
        var _this = this;
        $(window).on("changed.zf.mediaquery", function() {
            _this._checkMediaQueries();
        });
    }, ResponsiveMenu.prototype._checkMediaQueries = function() {
        var matchedMq, _this = this;
        $.each(this.rules, function(key) {
            Foundation.MediaQuery.atLeast(key) && (matchedMq = key);
        }), matchedMq && (this.currentPlugin instanceof this.rules[matchedMq].plugin || ($.each(MenuPlugins, function(key, value) {
            _this.$element.removeClass(value.cssClass);
        }), this.$element.addClass(this.rules[matchedMq].cssClass), this.currentPlugin && this.currentPlugin.destroy(), 
        this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {})));
    }, ResponsiveMenu.prototype.destroy = function() {
        this.currentPlugin.destroy(), $(window).off(".zf.ResponsiveMenu"), Foundation.unregisterPlugin(this);
    }, Foundation.plugin(ResponsiveMenu, "ResponsiveMenu");
}(Foundation, jQuery), !function($, Foundation) {
    "use strict";
    function ResponsiveToggle(element, options) {
        this.$element = $(element), this.options = $.extend({}, ResponsiveToggle.defaults, this.$element.data(), options), 
        this._init(), this._events(), Foundation.registerPlugin(this);
    }
    ResponsiveToggle.defaults = {
        hideFor: "medium"
    }, ResponsiveToggle.prototype._init = function() {
        var targetID = this.$element.data("responsive-toggle");
        targetID || console.error("Your tab bar needs an ID of a Menu as the value of data-tab-bar."), 
        this.$targetMenu = $("#" + targetID), this.$toggler = this.$element.find("[data-toggle]"), 
        this._update();
    }, ResponsiveToggle.prototype._events = function() {
        $(window).on("changed.zf.mediaquery", this._update.bind(this)), this.$toggler.on("click.zf.responsiveToggle", this.toggleMenu.bind(this));
    }, ResponsiveToggle.prototype._update = function() {
        Foundation.MediaQuery.atLeast(this.options.hideFor) ? (this.$element.hide(), this.$targetMenu.show()) : (this.$element.show(), 
        this.$targetMenu.hide());
    }, ResponsiveToggle.prototype.toggleMenu = function() {
        Foundation.MediaQuery.atLeast(this.options.hideFor) || (this.$targetMenu.toggle(0), 
        this.$element.trigger("toggled.zf.responsiveToggle"));
    }, ResponsiveToggle.prototype.destroy = function() {}, Foundation.plugin(ResponsiveToggle, "ResponsiveToggle");
}(jQuery, Foundation), !function(Foundation, $) {
    "use strict";
    function Reveal(element, options) {
        this.$element = element, this.options = $.extend({}, Reveal.defaults, this.$element.data(), options), 
        this._init(), Foundation.registerPlugin(this), Foundation.Keyboard.register("Reveal", {
            ENTER: "open",
            SPACE: "open",
            ESCAPE: "close",
            TAB: "tab_forward",
            SHIFT_TAB: "tab_backward"
        });
    }
    Reveal.defaults = {
        animationIn: "",
        animationOut: "",
        showDelay: 0,
        hideDelay: 0,
        closeOnClick: !0,
        closeOnEsc: !0,
        multipleOpened: !1,
        vOffset: 100,
        hOffset: 0,
        fullScreen: !1,
        btmOffsetPct: 10,
        overlay: !0,
        resetOnClose: !1
    }, Reveal.prototype._init = function() {
        if (this.id = this.$element.attr("id"), this.isActive = !1, this.$anchor = $($('[data-open="' + this.id + '"]').length ? '[data-open="' + this.id + '"]' : '[data-toggle="' + this.id + '"]'), 
        this.$anchor.length) {
            var anchorId = this.$anchor[0].id || Foundation.GetYoDigits(6, "reveal");
            this.$anchor.attr({
                "aria-controls": this.id,
                id: anchorId,
                "aria-haspopup": !0,
                tabindex: 0
            }), this.$element.attr({
                "aria-labelledby": anchorId
            });
        }
        (this.options.fullScreen || this.$element.hasClass("full")) && (this.options.fullScreen = !0, 
        this.options.overlay = !1), this.options.overlay && (this.$overlay = this._makeOverlay(this.id)), 
        this.$element.attr({
            role: "dialog",
            "aria-hidden": !0,
            "data-yeti-box": this.id,
            "data-resize": this.id
        }), this._events();
    }, Reveal.prototype._makeOverlay = function(id) {
        var $overlay = $("<div></div>").addClass("reveal-overlay").attr({
            tabindex: -1,
            "aria-hidden": !0
        }).appendTo("body");
        return this.options.closeOnClick && $overlay.attr({
            "data-close": id
        }), $overlay;
    }, Reveal.prototype._events = function() {
        var _this = this;
        this.$element.on({
            "open.zf.trigger": this.open.bind(this),
            "close.zf.trigger": this.close.bind(this),
            "toggle.zf.trigger": this.toggle.bind(this),
            "resizeme.zf.trigger": function() {
                _this.$element.is(":visible") && _this._setPosition(function() {});
            }
        }), this.$anchor.length && this.$anchor.on("keydown.zf.reveal", function(e) {
            (13 === e.which || 32 === e.which) && (e.stopPropagation(), e.preventDefault(), 
            _this.open());
        }), this.options.closeOnClick && this.options.overlay && this.$overlay.off(".zf.reveal").on("click.zf.reveal", this.close.bind(this));
    }, Reveal.prototype._setPosition = function(cb) {
        var eleDims = Foundation.Box.GetDimensions(this.$element), elePos = this.options.fullScreen ? "reveal full" : eleDims.height >= .5 * eleDims.windowDims.height ? "reveal" : "center";
        "reveal full" === elePos ? (console.log("full"), this.$element.offset(Foundation.Box.GetOffsets(this.$element, null, elePos, this.options.vOffset)).css({
            height: eleDims.windowDims.height,
            width: eleDims.windowDims.width
        })) : Foundation.MediaQuery.atLeast("medium") && Foundation.Box.ImNotTouchingYou(this.$element, null, !0, !1) ? this.$element.css({
            "max-height": eleDims.windowDims.height - this.options.vOffset * (this.options.btmOffsetPct / 100 + 1),
            width: ""
        }).offset(Foundation.Box.GetOffsets(this.$element, null, elePos, this.options.vOffset)) : (this.$element.css({
            width: eleDims.windowDims.width - 2 * this.options.hOffset
        }).offset(Foundation.Box.GetOffsets(this.$element, null, "center", this.options.vOffset, this.options.hOffset)), 
        this.changedSize = !0), cb();
    }, Reveal.prototype.open = function() {
        var _this = this;
        this.isActive = !0, this.$element.css({
            visibility: "hidden"
        }).show().scrollTop(0), this._setPosition(function() {
            _this.$element.hide().css({
                visibility: ""
            }), _this.options.multipleOpened || _this.$element.trigger("closeme.zf.reveal", _this.id), 
            _this.options.animationIn ? _this.options.overlay ? Foundation.Motion.animateIn(_this.$overlay, "fade-in", function() {
                Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function() {});
            }) : Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function() {}) : _this.options.overlay ? _this.$overlay.show(0, function() {
                _this.$element.show(_this.options.showDelay, function() {});
            }) : _this.$element.show(_this.options.showDelay, function() {});
        }), this.$element.attr({
            "aria-hidden": !1
        }).attr("tabindex", -1).focus().trigger("open.zf.reveal"), $("body").addClass("is-reveal-open").attr({
            "aria-hidden": this.options.overlay || this.options.fullScreen ? !0 : !1
        }), setTimeout(function() {
            _this._extraHandlers();
        }, 0);
    }, Reveal.prototype._extraHandlers = function() {
        var _this = this, visibleFocusableElements = this.$element.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function() {
            return !$(this).is(":visible") || $(this).attr("tabindex") < 0 ? !1 : !0;
        });
        this.options.overlay || !this.options.closeOnClick || this.options.fullScreen || $("body").on("click.zf.reveal", function(e) {
            _this.close();
        }), this.options.closeOnEsc && $(window).on("keydown.zf.reveal", function(e) {
            0 === visibleFocusableElements.length && e.preventDefault(), Foundation.Keyboard.handleKey(e, _this, {
                close: function() {
                    this.options.closeOnEsc && this.close();
                }
            });
        }), this.$element.on("keydown.zf.reveal", function(e) {
            var $target = $(this);
            Foundation.Keyboard.handleKey(e, _this, {
                tab_forward: function() {
                    this.$element.find(":focus").is(visibleFocusableElements.eq(-1)) && (visibleFocusableElements.eq(0).focus(), 
                    e.preventDefault());
                },
                tab_backward: function() {
                    (this.$element.find(":focus").is(visibleFocusableElements.eq(0)) || this.$element.is(":focus")) && (visibleFocusableElements.eq(-1).focus(), 
                    e.preventDefault());
                },
                open: function() {
                    $target.is(visibleFocusableElements) && this.open();
                },
                close: function() {
                    this.options.closeOnEsc && this.close();
                }
            }), 0 === visibleFocusableElements.length && e.preventDefault();
        });
    }, Reveal.prototype.close = function() {
        if (!this.isActive || !this.$element.is(":visible")) return !1;
        var _this = this;
        this.options.animationOut ? Foundation.Motion.animateOut(this.$element, this.options.animationOut, function() {
            _this.options.overlay && Foundation.Motion.animateOut(_this.$overlay, "fade-out", function() {});
        }) : this.$element.hide(_this.options.hideDelay, function() {
            _this.options.overlay && _this.$overlay.hide(0, function() {});
        }), this.options.closeOnEsc && $(window).off("keydown.zf.reveal"), !this.options.overlay && this.options.closeOnClick && $("body").off("click.zf.reveal"), 
        this.$element.off("keydown.zf.reveal"), this.changedSize && this.$element.css({
            height: "",
            width: ""
        }), $("body").removeClass("is-reveal-open").attr({
            "aria-hidden": !1,
            tabindex: ""
        }), this.options.resetOnClose && this.$element.html(this.$element.html()), this.isActive = !1, 
        this.$element.attr({
            "aria-hidden": !0
        }).trigger("closed.zf.reveal");
    }, Reveal.prototype.toggle = function() {
        this.isActive ? this.close() : this.open();
    }, Reveal.prototype.destroy = function() {
        this.options.overlay && this.$overlay.hide().off().remove(), this.$element.hide(), 
        this.$anchor.off(), Foundation.unregisterPlugin(this);
    }, Foundation.plugin(Reveal, "Reveal"), "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = Reveal), 
    "function" == typeof define && define([ "foundation" ], function() {
        return Reveal;
    });
}(Foundation, jQuery), !function($, Foundation) {
    "use strict";
    function Slider(element, options) {
        this.$element = element, this.options = $.extend({}, Slider.defaults, this.$element.data(), options), 
        this._init(), Foundation.registerPlugin(this), Foundation.Keyboard.register("Slider", {
            ltr: {
                ARROW_RIGHT: "increase",
                ARROW_UP: "increase",
                ARROW_DOWN: "decrease",
                ARROW_LEFT: "decrease",
                SHIFT_ARROW_RIGHT: "increase_fast",
                SHIFT_ARROW_UP: "increase_fast",
                SHIFT_ARROW_DOWN: "decrease_fast",
                SHIFT_ARROW_LEFT: "decrease_fast"
            },
            rtl: {
                ARROW_LEFT: "increase",
                ARROW_RIGHT: "decrease",
                SHIFT_ARROW_LEFT: "increase_fast",
                SHIFT_ARROW_RIGHT: "decrease_fast"
            }
        });
    }
    function percent(frac, num) {
        return frac / num;
    }
    function absPosition($handle, dir, clickPos, param) {
        return Math.abs($handle.position()[dir] + $handle[param]() / 2 - clickPos);
    }
    Slider.defaults = {
        start: 0,
        end: 100,
        step: 1,
        initialStart: 0,
        initialEnd: 100,
        binding: !1,
        clickSelect: !0,
        vertical: !1,
        draggable: !0,
        disabled: !1,
        doubleSided: !1,
        decimal: 2,
        moveTime: 200,
        disabledClass: "disabled"
    }, Slider.prototype._init = function() {
        this.inputs = this.$element.find("input"), this.handles = this.$element.find("[data-slider-handle]"), 
        this.$handle = this.handles.eq(0), this.$input = this.inputs.length ? this.inputs.eq(0) : $("#" + this.$handle.attr("aria-controls")), 
        this.$fill = this.$element.find("[data-slider-fill]").css(this.options.vertical ? "height" : "width", 0);
        var isDbl = !1, _this = this;
        (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) && (this.options.disabled = !0, 
        this.$element.addClass(this.options.disabledClass)), this.inputs.length || (this.inputs = $().add(this.$input), 
        this.options.binding = !0), this._setInitAttr(0), this._events(this.$handle), this.handles[1] && (this.options.doubleSided = !0, 
        this.$handle2 = this.handles.eq(1), this.$input2 = this.inputs.length ? this.inputs.eq(1) : $("#" + this.$handle2.attr("aria-controls")), 
        this.inputs[1] || (this.inputs = this.inputs.add(this.$input2)), isDbl = !0, this._setHandlePos(this.$handle, this.options.initialStart, !0, function() {
            _this._setHandlePos(_this.$handle2, _this.options.initialEnd);
        }), this._setInitAttr(1), this._events(this.$handle2)), isDbl || this._setHandlePos(this.$handle, this.options.initialStart, !0);
    }, Slider.prototype._setHandlePos = function($hndl, location, noInvert, cb) {
        location = parseFloat(location), location < this.options.start ? location = this.options.start : location > this.options.end && (location = this.options.end);
        var isDbl = this.options.doubleSided;
        if (isDbl) if (0 === this.handles.index($hndl)) {
            var h2Val = parseFloat(this.$handle2.attr("aria-valuenow"));
            location = location >= h2Val ? h2Val - this.options.step : location;
        } else {
            var h1Val = parseFloat(this.$handle.attr("aria-valuenow"));
            location = h1Val >= location ? h1Val + this.options.step : location;
        }
        this.options.vertical && !noInvert && (location = this.options.end - location);
        var _this = this, vert = this.options.vertical, hOrW = vert ? "height" : "width", lOrT = vert ? "top" : "left", halfOfHandle = $hndl[0].getBoundingClientRect()[hOrW] / 2, elemDim = this.$element[0].getBoundingClientRect()[hOrW], pctOfBar = percent(location, this.options.end).toFixed(this.options.decimal), pxToMove = (elemDim - halfOfHandle) * pctOfBar, movement = (100 * percent(pxToMove, elemDim)).toFixed(this.options.decimal), location = location > 0 ? parseFloat(location.toFixed(this.options.decimal)) : 0, css = {};
        if (this._setValues($hndl, location), this.options.doubleSided) {
            var dim, isLeftHndl = 0 === this.handles.index($hndl);
            this.handles.index($hndl);
            isLeftHndl ? (css[lOrT] = (pctOfBar > 0 ? 100 * pctOfBar : 0) + "%", dim = (100 * (percent(this.$handle2.position()[lOrT] + halfOfHandle, elemDim) - parseFloat(pctOfBar))).toFixed(this.options.decimal) + "%", 
            css["min-" + hOrW] = dim, cb && "function" == typeof cb && cb()) : (location = (100 > location ? location : 100) - (parseFloat(this.$handle[0].style.left) || this.options.end - location), 
            css["min-" + hOrW] = location + "%");
        }
        this.$element.one("finished.zf.animate", function() {
            _this.animComplete = !0, _this.$element.trigger("moved.zf.slider", [ $hndl ]);
        });
        var moveTime = _this.$element.data("dragging") ? 1e3 / 60 : _this.options.moveTime;
        Foundation.Move(moveTime, $hndl, function() {
            $hndl.css(lOrT, movement + "%"), _this.options.doubleSided ? _this.$fill.css(css) : _this.$fill.css(hOrW, 100 * pctOfBar + "%");
        });
    }, Slider.prototype._setInitAttr = function(idx) {
        var id = this.inputs.eq(idx).attr("id") || Foundation.GetYoDigits(6, "slider");
        this.inputs.eq(idx).attr({
            id: id,
            max: this.options.end,
            min: this.options.start
        }), this.handles.eq(idx).attr({
            role: "slider",
            "aria-controls": id,
            "aria-valuemax": this.options.end,
            "aria-valuemin": this.options.start,
            "aria-valuenow": 0 === idx ? this.options.initialStart : this.options.initialEnd,
            "aria-orientation": this.options.vertical ? "vertical" : "horizontal",
            tabindex: 0
        });
    }, Slider.prototype._setValues = function($handle, val) {
        var idx = this.options.doubleSided ? this.handles.index($handle) : 0;
        this.inputs.eq(idx).val(val), $handle.attr("aria-valuenow", val);
    }, Slider.prototype._handleEvent = function(e, $handle, val) {
        var value, hasVal;
        if (val) value = val, hasVal = !0; else {
            e.preventDefault();
            var vertical = this.options.vertical, param = vertical ? "height" : "width", direction = vertical ? "top" : "left", pageXY = vertical ? e.pageY : e.pageX, halfOfHandle = this.$handle[0].getBoundingClientRect()[param] / 2, barDim = this.$element[0].getBoundingClientRect()[param], barOffset = this.$element.offset()[direction] - pageXY, barXY = barOffset > 0 ? -halfOfHandle : -barDim > barOffset - halfOfHandle ? barDim : Math.abs(barOffset), offsetPct = percent(barXY, barDim);
            if (value = (this.options.end - this.options.start) * offsetPct, hasVal = !1, !$handle) {
                var firstHndlPos = absPosition(this.$handle, direction, barXY, param), secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
                $handle = secndHndlPos >= firstHndlPos ? this.$handle : this.$handle2;
            }
        }
        this._setHandlePos($handle, value, hasVal);
    }, Slider.prototype._events = function($handle) {
        if (this.options.disabled) return !1;
        var curHandle, _this = this;
        if (this.inputs.off("change.zf.slider").on("change.zf.slider", function(e) {
            var idx = _this.inputs.index($(this));
            _this._handleEvent(e, _this.handles.eq(idx), $(this).val());
        }), this.options.clickSelect && this.$element.off("click.zf.slider").on("click.zf.slider", function(e) {
            return _this.$element.data("dragging") ? !1 : (_this.animComplete = !1, void (_this.options.doubleSided ? _this._handleEvent(e) : _this._handleEvent(e, _this.$handle)));
        }), this.options.draggable) {
            this.handles.addTouch();
            var $body = $("body");
            $handle.off("mousedown.zf.slider").on("mousedown.zf.slider", function(e) {
                $handle.addClass("is-dragging"), _this.$fill.addClass("is-dragging"), _this.$element.data("dragging", !0), 
                _this.animComplete = !1, curHandle = $(e.currentTarget), $body.on("mousemove.zf.slider", function(e) {
                    e.preventDefault(), _this._handleEvent(e, curHandle);
                }).on("mouseup.zf.slider", function(e) {
                    _this.animComplete = !0, _this._handleEvent(e, curHandle), $handle.removeClass("is-dragging"), 
                    _this.$fill.removeClass("is-dragging"), _this.$element.data("dragging", !1), $body.off("mousemove.zf.slider mouseup.zf.slider");
                });
            });
        }
        $handle.off("keydown.zf.slider").on("keydown.zf.slider", function(e) {
            var newValue, idx = _this.options.doubleSided ? _this.handles.index($(this)) : 0, oldValue = parseFloat(_this.inputs.eq(idx).val()), _$handle = $(this);
            Foundation.Keyboard.handleKey(e, _this, {
                decrease: function() {
                    newValue = oldValue - _this.options.step;
                },
                increase: function() {
                    newValue = oldValue + _this.options.step;
                },
                decrease_fast: function() {
                    newValue = oldValue - 10 * _this.options.step;
                },
                increase_fast: function() {
                    newValue = oldValue + 10 * _this.options.step;
                },
                handled: function() {
                    e.preventDefault(), _this._setHandlePos(_$handle, newValue, !0);
                }
            });
        });
    }, Slider.prototype.destroy = function() {
        this.handles.off(".zf.slider"), this.inputs.off(".zf.slider"), this.$element.off(".zf.slider"), 
        Foundation.unregisterPlugin(this);
    }, Foundation.plugin(Slider, "Slider");
}(jQuery, window.Foundation), !function($, Foundation) {
    "use strict";
    function Sticky(element, options) {
        this.$element = element, this.options = $.extend({}, Sticky.defaults, this.$element.data(), options), 
        this._init(), Foundation.registerPlugin(this);
    }
    function emCalc(em) {
        return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;
    }
    Sticky.defaults = {
        container: "<div data-sticky-container></div>",
        stickTo: "top",
        anchor: "",
        topAnchor: "",
        btmAnchor: "",
        marginTop: 1,
        marginBottom: 1,
        stickyOn: "medium",
        stickyClass: "sticky",
        containerClass: "sticky-container",
        checkEvery: -1
    }, Sticky.prototype._init = function() {
        var $parent = this.$element.parent("[data-sticky-container]"), id = this.$element[0].id || Foundation.GetYoDigits(6, "sticky"), _this = this;
        $parent.length || (this.wasWrapped = !0), this.$container = $parent.length ? $parent : $(this.options.container).wrapInner(this.$element), 
        this.$container.addClass(this.options.containerClass), this.$element.addClass(this.options.stickyClass).attr({
            "data-resize": id
        }), this.scrollCount = this.options.checkEvery, this.isStuck = !1, "" !== this.options.topAnchor ? this._parsePoints() : this.$anchor = $(this.options.anchor ? "#" + this.options.anchor : document.body), 
        this._setSizes(function() {
            _this._calc(!1);
        }), this._events(id.split("-").reverse().join("-"));
    }, Sticky.prototype._parsePoints = function() {
        for (var top = this.options.topAnchor, btm = this.options.btmAnchor, pts = [ top, btm ], breaks = {}, i = 0, len = pts.length; len > i && pts[i]; i++) {
            var pt;
            if ("number" == typeof pts[i]) pt = pts[i]; else {
                var place = pts[i].split(":"), anchor = $("#" + place[0]);
                pt = anchor.offset().top, place[1] && "bottom" === place[1].toLowerCase() && (pt += anchor[0].getBoundingClientRect().height);
            }
            breaks[i] = pt;
        }
        this.points = breaks;
    }, Sticky.prototype._events = function(id) {
        var _this = this, scrollListener = "scroll.zf." + id;
        this.isOn || (this.canStick && (this.isOn = !0, $(window).off(scrollListener).on(scrollListener, function(e) {
            0 === _this.scrollCount ? (_this.scrollCount = _this.options.checkEvery, _this._setSizes(function() {
                _this._calc(!1, window.pageYOffset);
            })) : (_this.scrollCount--, _this._calc(!1, window.pageYOffset));
        })), this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", function(e, el) {
            _this._setSizes(function() {
                _this._calc(!1), _this.canStick ? _this.isOn || _this._events(id) : _this.isOn && _this._pauseListeners(scrollListener);
            });
        }));
    }, Sticky.prototype._pauseListeners = function(scrollListener) {
        this.isOn = !1, $(window).off(scrollListener), this.$element.trigger("pause.zf.sticky");
    }, Sticky.prototype._calc = function(checkSizes, scroll) {
        return checkSizes && this._setSizes(), this.canStick ? (scroll || (scroll = window.pageYOffset), 
        void (scroll >= this.topPoint ? scroll <= this.bottomPoint ? this.isStuck || this._setSticky() : this.isStuck && this._removeSticky(!1) : this.isStuck && this._removeSticky(!0))) : (this.isStuck && this._removeSticky(!0), 
        !1);
    }, Sticky.prototype._setSticky = function() {
        var stickTo = this.options.stickTo, mrgn = "top" === stickTo ? "marginTop" : "marginBottom", notStuckTo = "top" === stickTo ? "bottom" : "top", css = {};
        css[mrgn] = this.options[mrgn] + "em", css[stickTo] = 0, css[notStuckTo] = "auto", 
        css.left = this.$container.offset().left + parseInt(window.getComputedStyle(this.$container[0])["padding-left"], 10), 
        this.isStuck = !0, this.$element.removeClass("is-anchored is-at-" + notStuckTo).addClass("is-stuck is-at-" + stickTo).css(css).trigger("sticky.zf.stuckto:" + stickTo);
    }, Sticky.prototype._removeSticky = function(isTop) {
        var mrgn, notStuckTo, stickTo = this.options.stickTo, stickToTop = "top" === stickTo, css = {}, anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight;
        mrgn = stickToTop ? "marginTop" : "marginBottom", notStuckTo = stickToTop ? "bottom" : "top", 
        css[mrgn] = 0, isTop && !stickToTop || stickToTop && !isTop ? (css[stickTo] = anchorPt, 
        css[notStuckTo] = 0) : (css[stickTo] = 0, css[notStuckTo] = anchorPt), css.left = "", 
        this.isStuck = !1, this.$element.removeClass("is-stuck is-at-" + stickTo).addClass("is-anchored is-at-" + (isTop ? "top" : "bottom")).css(css).trigger("top");
    }, Sticky.prototype._setSizes = function(cb) {
        this.canStick = Foundation.MediaQuery.atLeast(this.options.stickyOn), this.canStick || cb();
        var newElemWidth = this.$container[0].getBoundingClientRect().width, comp = window.getComputedStyle(this.$container[0]), pdng = parseInt(comp["padding-right"], 10);
        this.$anchor && this.$anchor.length ? this.anchorHeight = this.$anchor[0].getBoundingClientRect().height : this._parsePoints(), 
        this.$element.css({
            "max-width": newElemWidth - pdng + "px"
        });
        var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;
        this.containerHeight = newContainerHeight, this.$container.css({
            height: newContainerHeight
        }), this.elemHeight = newContainerHeight, this.isStuck && this.$element.css({
            left: this.$container.offset().left + parseInt(comp["padding-left"], 10)
        }), this._setBreakPoints(newContainerHeight, function() {
            cb && cb();
        });
    }, Sticky.prototype._setBreakPoints = function(elemHeight, cb) {
        if (!this.canStick) {
            if (!cb) return !1;
            cb();
        }
        var mTop = emCalc(this.options.marginTop), mBtm = emCalc(this.options.marginBottom), topPoint = this.points ? this.points[0] : this.$anchor.offset().top, bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight, winHeight = window.innerHeight;
        "top" === this.options.stickTo ? (topPoint -= mTop, bottomPoint -= elemHeight + mTop) : "bottom" === this.options.stickTo && (topPoint -= winHeight - (elemHeight + mBtm), 
        bottomPoint -= winHeight - mBtm), this.topPoint = topPoint, this.bottomPoint = bottomPoint, 
        cb && cb();
    }, Sticky.prototype.destroy = function() {
        this._removeSticky(!0), this.$element.removeClass(this.options.stickyClass + " is-anchored is-at-top").css({
            height: "",
            top: "",
            bottom: "",
            "max-width": ""
        }).off("resizeme.zf.trigger"), this.$anchor.off("change.zf.sticky"), $(window).off("scroll.zf.sticky"), 
        this.wasWrapped ? this.$element.unwrap() : this.$container.removeClass(this.options.containerClass).css({
            height: ""
        }), Foundation.unregisterPlugin(this);
    }, Foundation.plugin(Sticky, "Sticky");
}(jQuery, window.Foundation), !function($, Foundation) {
    "use strict";
    function Tabs(element, options) {
        this.$element = element, this.options = $.extend({}, Tabs.defaults, this.$element.data(), options), 
        this._init(), Foundation.registerPlugin(this), Foundation.Keyboard.register("Tabs", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "previous",
            ARROW_DOWN: "next",
            ARROW_LEFT: "previous"
        });
    }
    Tabs.defaults = {
        autoFocus: !1,
        wrapOnKeys: !0,
        matchHeight: !1,
        linkClass: "tabs-title",
        panelClass: "tabs-panel"
    }, Tabs.prototype._init = function() {
        var _this = this;
        if (this.$tabTitles = this.$element.find("." + this.options.linkClass), this.$tabContent = $('[data-tabs-content="' + this.$element[0].id + '"]'), 
        this.$tabTitles.each(function() {
            var $elem = $(this), $link = $elem.find("a"), isActive = $elem.hasClass("is-active"), hash = $link.attr("href").slice(1), linkId = hash + "-label", $tabContent = $(hash);
            $elem.attr({
                role: "presentation"
            }), $link.attr({
                role: "tab",
                "aria-controls": hash,
                "aria-selected": isActive,
                id: linkId
            }), $tabContent.attr({
                role: "tabpanel",
                "aria-hidden": !isActive,
                "aria-labelledby": linkId
            }), isActive && _this.options.autoFocus && $link.focus();
        }), this.options.matchHeight) {
            var $images = this.$tabContent.find("img");
            $images.length ? Foundation.onImagesLoaded($images, this._setHeight.bind(this)) : this._setHeight();
        }
        this._events();
    }, Tabs.prototype._events = function() {
        this._addKeyHandler(), this._addClickHandler(), this.options.matchHeight && $(window).on("changed.zf.mediaquery", this._setHeight.bind(this));
    }, Tabs.prototype._addClickHandler = function() {
        var _this = this;
        this.$tabTitles.off("click.zf.tabs").on("click.zf.tabs", function(e) {
            e.preventDefault(), e.stopPropagation(), $(this).hasClass("is-active") || _this._handleTabChange($(this));
        });
    }, Tabs.prototype._addKeyHandler = function() {
        var _this = this;
        _this.$element.find("li:first-of-type"), _this.$element.find("li:last-of-type");
        this.$tabTitles.off("keydown.zf.tabs").on("keydown.zf.tabs", function(e) {
            e.stopPropagation(), e.preventDefault();
            var $prevElement, $nextElement, $element = $(this), $elements = $element.parent("ul").children("li");
            $elements.each(function(i) {
                return $(this).is($element) ? void (_this.options.wrapOnKeys ? ($prevElement = 0 === i ? $elements.last() : $elements.eq(i - 1), 
                $nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1)) : ($prevElement = $elements.eq(Math.max(0, i - 1)), 
                $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1)))) : void 0;
            }), Foundation.Keyboard.handleKey(e, _this, {
                open: function() {
                    $element.find('[role="tab"]').focus(), _this._handleTabChange($element);
                },
                previous: function() {
                    $prevElement.find('[role="tab"]').focus(), _this._handleTabChange($prevElement);
                },
                next: function() {
                    $nextElement.find('[role="tab"]').focus(), _this._handleTabChange($nextElement);
                }
            });
        });
    }, Tabs.prototype._handleTabChange = function($target) {
        var $tabLink = $target.find('[role="tab"]'), hash = $tabLink.attr("href"), $targetContent = $(hash), $oldTab = this.$element.find("." + this.options.linkClass + ".is-active").removeClass("is-active").find('[role="tab"]').attr({
            "aria-selected": "false"
        }).attr("href");
        $($oldTab).removeClass("is-active").attr({
            "aria-hidden": "true"
        }), $target.addClass("is-active"), $tabLink.attr({
            "aria-selected": "true"
        }), $targetContent.addClass("is-active").attr({
            "aria-hidden": "false"
        }), this.$element.trigger("change.zf.tabs", [ $target ]);
    }, Tabs.prototype.selectTab = function(elem) {
        var idStr;
        idStr = "object" == typeof elem ? elem[0].id : elem, idStr.indexOf("#") < 0 && (idStr = "#" + idStr);
        var $target = this.$tabTitles.find('[href="' + idStr + '"]').parent("." + this.options.linkClass);
        this._handleTabChange($target);
    }, Tabs.prototype._setHeight = function() {
        var max = 0;
        this.$tabContent.find("." + this.options.panelClass).css("height", "").each(function() {
            var panel = $(this), isActive = panel.hasClass("is-active");
            isActive || panel.css({
                visibility: "hidden",
                display: "block"
            });
            var temp = this.getBoundingClientRect().height;
            isActive || panel.css({
                visibility: "",
                display: ""
            }), max = temp > max ? temp : max;
        }).css("height", max + "px");
    }, Tabs.prototype.destroy = function() {
        this.$element.find("." + this.options.linkClass).off(".zf.tabs").hide().end().find("." + this.options.panelClass).hide(), 
        this.options.matchHeight && $(window).off("changed.zf.mediaquery"), Foundation.unregisterPlugin(this);
    }, Foundation.plugin(Tabs, "Tabs");
}(jQuery, window.Foundation), !function(Foundation, $) {
    "use strict";
    function Toggler(element, options) {
        this.$element = element, this.options = $.extend({}, Toggler.defaults, element.data(), options), 
        this.className = "", this._init(), this._events(), Foundation.registerPlugin(this);
    }
    Toggler.defaults = {
        animate: !1
    }, Toggler.prototype._init = function() {
        var input;
        this.options.animate ? (input = this.options.animate.split(" "), this.animationIn = input[0], 
        this.animationOut = input[1] || null) : (input = this.$element.data("toggler"), 
        "." === input[0] ? this.className = input.slice(1) : this.className = input);
        var id = this.$element[0].id;
        $('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr("aria-controls", id), 
        this.$element.is(":hidden") && this.$element.attr("aria-expanded", "false");
    }, Toggler.prototype._events = function() {
        var _this = this;
        this.$element.on("toggle.zf.trigger", function() {
            return _this.toggle(), !1;
        });
    }, Toggler.prototype.toggle = function() {
        this.options.animate ? this._toggleAnimate() : this._toggleClass();
    }, Toggler.prototype._toggleClass = function() {
        var _this = this;
        this.$element.toggleClass(this.className), this.$element.hasClass(this.className) ? this.$element.trigger("on.zf.toggler") : this.$element.trigger("off.zf.toggler"), 
        _this._updateARIA();
    }, Toggler.prototype._toggleAnimate = function() {
        var _this = this;
        this.$element.is(":hidden") ? Foundation.Motion.animateIn(this.$element, this.animationIn, function() {
            this.trigger("on.zf.toggler"), _this._updateARIA();
        }) : Foundation.Motion.animateOut(this.$element, this.animationOut, function() {
            this.trigger("off.zf.toggler"), _this._updateARIA();
        });
    }, Toggler.prototype._updateARIA = function() {
        this.$element.is(":hidden") ? this.$element.attr("aria-expanded", "false") : this.$element.attr("aria-expanded", "true");
    }, Toggler.prototype.destroy = function() {
        this.$element.off(".zf.toggler"), Foundation.unregisterPlugin(this);
    }, Foundation.plugin(Toggler, "Toggler"), "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = Toggler), 
    "function" == typeof define && define([ "foundation" ], function() {
        return Toggler;
    });
}(Foundation, jQuery), !function($, document, Foundation) {
    "use strict";
    function Tooltip(element, options) {
        this.$element = element, this.options = $.extend({}, Tooltip.defaults, this.$element.data(), options), 
        this.isActive = !1, this.isClick = !1, this._init(), Foundation.registerPlugin(this);
    }
    Tooltip.defaults = {
        disableForTouch: !1,
        hoverDelay: 200,
        fadeInDuration: 150,
        fadeOutDuration: 150,
        disableHover: !1,
        templateClasses: "",
        tooltipClass: "tooltip",
        triggerClass: "has-tip",
        showOn: "small",
        template: "",
        tipText: "",
        touchCloseText: "Tap to close.",
        clickOpen: !0,
        positionClass: "",
        vOffset: 10,
        hOffset: 12
    }, Tooltip.prototype._init = function() {
        var elemId = this.$element.attr("aria-describedby") || Foundation.GetYoDigits(6, "tooltip");
        this.options.positionClass = this._getPositionClass(this.$element), this.options.tipText = this.options.tipText || this.$element.attr("title"), 
        this.template = this.options.template ? $(this.options.template) : this._buildTemplate(elemId), 
        this.template.appendTo(document.body).text(this.options.tipText).hide(), this.$element.attr({
            title: "",
            "aria-describedby": elemId,
            "data-yeti-box": elemId,
            "data-toggle": elemId,
            "data-resize": elemId
        }).addClass(this.triggerClass), this.usedPositions = [], this.counter = 4, this.classChanged = !1, 
        this._events();
    }, Tooltip.prototype._getPositionClass = function(element) {
        if (!element) return "";
        var position = element[0].className.match(/(top|left|right)/g);
        return position = position ? position[0] : "";
    }, Tooltip.prototype._buildTemplate = function(id) {
        var templateClasses = (this.options.tooltipClass + " " + this.options.positionClass).trim(), $template = $("<div></div>").addClass(templateClasses).attr({
            role: "tooltip",
            "aria-hidden": !0,
            "data-is-active": !1,
            "data-is-focus": !1,
            id: id
        });
        return $template;
    }, Tooltip.prototype._reposition = function(position) {
        this.usedPositions.push(position ? position : "bottom"), !position && this.usedPositions.indexOf("top") < 0 ? this.template.addClass("top") : "top" === position && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(position) : "left" === position && this.usedPositions.indexOf("right") < 0 ? this.template.removeClass(position).addClass("right") : "right" === position && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(position).addClass("left") : !position && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0 ? this.template.addClass("left") : "top" === position && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(position).addClass("left") : "left" === position && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(position) : "right" === position && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(position) : this.template.removeClass(position), 
        this.classChanged = !0, this.counter--;
    }, Tooltip.prototype._setPosition = function() {
        var position = this._getPositionClass(this.template), $tipDims = Foundation.Box.GetDimensions(this.template), $anchorDims = Foundation.Box.GetDimensions(this.$element), direction = "left" === position ? "left" : "right" === position ? "left" : "top", param = "top" === direction ? "height" : "width";
        "height" === param ? this.options.vOffset : this.options.hOffset;
        if ($tipDims.width >= $tipDims.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.template)) return this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center bottom", this.options.vOffset, this.options.hOffset, !0)).css({
            width: $anchorDims.windowDims.width - 2 * this.options.hOffset,
            height: "auto"
        }), !1;
        for (this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center " + (position || "bottom"), this.options.vOffset, this.options.hOffset)); !Foundation.Box.ImNotTouchingYou(this.template) && this.counter; ) this._reposition(position), 
        this._setPosition();
    }, Tooltip.prototype.show = function() {
        if ("all" !== this.options.showOn && !Foundation.MediaQuery.atLeast(this.options.showOn)) return !1;
        var _this = this;
        this.template.css("visibility", "hidden").show(), this._setPosition(), this.$element.trigger("closeme.zf.tooltip", this.template.attr("id")), 
        this.template.attr({
            "data-is-active": !0,
            "aria-hidden": !1
        }), _this.isActive = !0, this.template.stop().hide().css("visibility", "").fadeIn(this.options.fadeInDuration, function() {}), 
        this.$element.trigger("show.zf.tooltip");
    }, Tooltip.prototype.hide = function() {
        var _this = this;
        this.template.stop().attr({
            "aria-hidden": !0,
            "data-is-active": !1
        }).fadeOut(this.options.fadeOutDuration, function() {
            _this.isActive = !1, _this.isClick = !1, _this.classChanged && (_this.template.removeClass(_this._getPositionClass(_this.template)).addClass(_this.options.positionClass), 
            _this.usedPositions = [], _this.counter = 4, _this.classChanged = !1);
        }), this.$element.trigger("hide.zf.tooltip");
    }, Tooltip.prototype._events = function() {
        var _this = this, isFocus = (this.template, !1);
        this.options.disableHover || this.$element.on("mouseenter.zf.tooltip", function(e) {
            _this.isActive || (_this.timeout = setTimeout(function() {
                _this.show();
            }, _this.options.hoverDelay));
        }).on("mouseleave.zf.tooltip", function(e) {
            clearTimeout(_this.timeout), (!isFocus || !_this.isClick && _this.options.clickOpen) && _this.hide();
        }), this.options.clickOpen && this.$element.on("mousedown.zf.tooltip", function(e) {
            e.stopImmediatePropagation(), _this.isClick ? _this.hide() : (_this.isClick = !0, 
            !_this.options.disableHover && _this.$element.attr("tabindex") || _this.isActive || _this.show());
        }), this.options.disableForTouch || this.$element.on("tap.zf.tooltip touchend.zf.tooltip", function(e) {
            _this.isActive ? _this.hide() : _this.show();
        }), this.$element.on({
            "close.zf.trigger": this.hide.bind(this)
        }), this.$element.on("focus.zf.tooltip", function(e) {
            return isFocus = !0, console.log(_this.isClick), _this.isClick ? !1 : void _this.show();
        }).on("focusout.zf.tooltip", function(e) {
            isFocus = !1, _this.isClick = !1, _this.hide();
        }).on("resizeme.zf.trigger", function() {
            _this.isActive && _this._setPosition();
        });
    }, Tooltip.prototype.toggle = function() {
        this.isActive ? this.hide() : this.show();
    }, Tooltip.prototype.destroy = function() {
        this.$element.attr("title", this.template.text()).off(".zf.trigger .zf.tootip").removeAttr("aria-describedby").removeAttr("data-yeti-box").removeAttr("data-toggle").removeAttr("data-resize"), 
        this.template.remove(), Foundation.unregisterPlugin(this);
    }, Foundation.plugin(Tooltip, "Tooltip");
}(jQuery, window.document, window.Foundation);

var addRippleEffect = function(e) {
    var target = e.target;
    if (-1 === target.className.indexOf("ink")) return !1;
    var rect = target.getBoundingClientRect(), ripple = target.querySelector(".ripple");
    ripple || (ripple = document.createElement("span"), -1 !== target.className.indexOf("ink-color") ? ripple.className = "ripple-color" : ripple.className = "ripple", 
    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + "px", 
    target.appendChild(ripple)), ripple.classList.remove("show");
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop, left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    return ripple.style.top = top + "px", ripple.style.left = left + "px", ripple.classList.add("show"), 
    !1;
};

document.addEventListener("click", addRippleEffect, !1), $.fn._toggleInput = function() {
    $(this).click(function() {
        $(this).toggleClass("checked");
    });
}, $("label.radio, label.checkbox")._toggleInput(), $(document).foundation();