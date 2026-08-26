import { c as e, f as t, h as n, l as r, m as i, o as a, t as o } from "./useRenderElement.js";
import { A as s, L as c, R as l, T as u, _ as d, a as f, b as p, c as m, d as h, f as g, h as _, i as v, j as y, l as b, m as x, n as S, o as C, p as w, r as T, s as E, t as D, u as O, v as k, x as A, y as ee } from "./floating-ui.utils.dom.js";
import { r as j, u as te } from "./useOpenChangeComplete.js";
import { r as ne, t as re, u as ie } from "./event.js";
import { C as ae, D as M, E as N, L as P, O as oe, S as se, _ as F, a as I, b as L, c as ce, d as le, f as R, g as z, h as B, i as V, l as H, m as ue, n as de, o as U, p as W, r as G, s as fe, u as pe, v as K, w as q, x as me, y as J } from "./owner.js";
import { t as he } from "./visuallyHidden.js";
import * as Y from "react";
import { useLayoutEffect as ge } from "react";
import { jsx as X, jsxs as _e } from "react/jsx-runtime";
import * as ve from "react-dom";
//#region \0rolldown/runtime.js
var Z = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), ye = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/nodes.js
function be(e, t, n = !0) {
	return e.filter((e) => e.parentId === t && (!n || e.context?.open)).flatMap((t) => [t, ...be(e, t.id, n)]);
}
function xe(e, t) {
	let n = [], r = e.find((e) => e.id === t)?.parentId;
	for (; r;) {
		let t = e.find((e) => e.id === r);
		r = t?.parentId, t && (n = n.concat(t));
	}
	return n;
}
var Se = /* @__PURE__ */ [
	"input:not([inert]):not([inert] *)",
	"select:not([inert]):not([inert] *)",
	"textarea:not([inert]):not([inert] *)",
	"a[href]:not([inert]):not([inert] *)",
	"area[href]:not([inert]):not([inert] *)",
	"button:not([inert]):not([inert] *)",
	"[tabindex]:not(slot):not([inert]):not([inert] *)",
	"audio[controls]:not([inert]):not([inert] *)",
	"video[controls]:not([inert]):not([inert] *)",
	"[contenteditable]:not([contenteditable=\"false\"]):not([inert]):not([inert] *)",
	"details>summary:first-of-type:not([inert]):not([inert] *)",
	"details:not([inert]):not([inert] *)"
].join(","), Ce = typeof Element > "u", Q = Ce ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, we = !Ce && Element.prototype.getRootNode ? function(e) {
	return e?.getRootNode?.call(e);
} : function(e) {
	return e?.ownerDocument;
}, Te = function(e, t) {
	t === void 0 && (t = !0);
	var n = e?.getAttribute?.call(e, "inert");
	return n === "" || n === "true" || t && e && (typeof e.closest == "function" ? e.closest("[inert]") : Te(e.parentNode));
}, Ee = function(e) {
	var t = e?.getAttribute?.call(e, "contenteditable");
	return t === "" || t === "true";
}, De = function(e, t, n) {
	if (Te(e)) return [];
	var r = Array.prototype.slice.apply(e.querySelectorAll(Se));
	return t && Q.call(e, Se) && r.unshift(e), r = r.filter(n), r;
}, Oe = function(e, t, n) {
	for (var r = [], i = Array.from(e); i.length;) {
		var a = i.shift();
		if (!Te(a, !1)) if (a.tagName === "SLOT") {
			var o = a.assignedElements(), s = Oe(o.length ? o : a.children, !0, n);
			n.flatten ? r.push.apply(r, s) : r.push({
				scopeParent: a,
				candidates: s
			});
		} else {
			Q.call(a, Se) && n.filter(a) && (t || !e.includes(a)) && r.push(a);
			var c = a.shadowRoot || typeof n.getShadowRoot == "function" && n.getShadowRoot(a), l = !Te(c, !1) && (!n.shadowRootFilter || n.shadowRootFilter(a));
			if (c && l) {
				var u = Oe(c === !0 ? a.children : c.children, !0, n);
				n.flatten ? r.push.apply(r, u) : r.push({
					scopeParent: a,
					candidates: u
				});
			} else i.unshift.apply(i, a.children);
		}
	}
	return r;
}, ke = function(e) {
	return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, Ae = function(e) {
	if (!e) throw Error("No node provided");
	return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || Ee(e)) && !ke(e) ? 0 : e.tabIndex;
}, je = function(e, t) {
	var n = Ae(e);
	return n < 0 && t && !ke(e) ? 0 : n;
}, Me = function(e, t) {
	return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, Ne = function(e) {
	return e.tagName === "INPUT";
}, Pe = function(e) {
	return Ne(e) && e.type === "hidden";
}, Fe = function(e) {
	return e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(e) {
		return e.tagName === "SUMMARY";
	});
}, Ie = function(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === t) return e[n];
}, Le = function(e) {
	if (!e.name) return !0;
	var t = e.form || we(e), n = function(e) {
		return t.querySelectorAll("input[type=\"radio\"][name=\"" + e + "\"]");
	}, r;
	if (typeof window < "u" && window.CSS !== void 0 && typeof window.CSS.escape == "function") r = n(window.CSS.escape(e.name));
	else try {
		r = n(e.name);
	} catch (e) {
		return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1;
	}
	var i = Ie(r, e.form);
	return !i || i === e;
}, Re = function(e) {
	return Ne(e) && e.type === "radio";
}, ze = function(e) {
	return Re(e) && !Le(e);
}, Be = function(e) {
	var t = e && we(e), n = t?.host, r = !1;
	if (t && t !== e) {
		var i, a, o;
		for (r = !!((i = n) != null && (a = i.ownerDocument) != null && a.contains(n) || e != null && (o = e.ownerDocument) != null && o.contains(e)); !r && n;) {
			var s, c;
			t = we(n), n = t?.host, r = !!((s = n) != null && (c = s.ownerDocument) != null && c.contains(n));
		}
	}
	return r;
}, Ve = function(e) {
	var t = e.getBoundingClientRect(), n = t.width, r = t.height;
	return n === 0 && r === 0;
}, He = function(e, t) {
	var n = t.displayCheck, r = t.getShadowRoot;
	if (n === "full-native" && "checkVisibility" in e) return !e.checkVisibility({
		checkOpacity: !1,
		opacityProperty: !1,
		contentVisibilityAuto: !0,
		visibilityProperty: !0,
		checkVisibilityCSS: !0
	});
	var i = getComputedStyle(e).visibility;
	if (i === "hidden" || i === "collapse") return !0;
	var a = Q.call(e, "details>summary:first-of-type") ? e.parentElement : e;
	if (Q.call(a, "details:not([open]) *")) return !0;
	if (!n || n === "full" || n === "full-native" || n === "legacy-full") {
		if (typeof r == "function") {
			for (var o = e; e;) {
				var s = e.parentElement, c = we(e);
				if (s && !s.shadowRoot && r(s) === !0) return Ve(e);
				e = e.assignedSlot ? e.assignedSlot : !s && c !== e.ownerDocument ? c.host : s;
			}
			e = o;
		}
		if (Be(e)) return !e.getClientRects().length;
		if (n !== "legacy-full") return !0;
	} else if (n === "non-zero-area") return Ve(e);
	return !1;
}, Ue = function(e) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName)) for (var t = e.parentElement; t;) {
		if (t.tagName === "FIELDSET" && t.disabled) {
			for (var n = 0; n < t.children.length; n++) {
				var r = t.children.item(n);
				if (r.tagName === "LEGEND") return Q.call(t, "fieldset[disabled] *") ? !0 : !r.contains(e);
			}
			return !0;
		}
		t = t.parentElement;
	}
	return !1;
}, We = function(e, t) {
	return !(t.disabled || Pe(t) || He(t, e) || Fe(t) || Ue(t));
}, Ge = function(e, t) {
	return !(ze(t) || Ae(t) < 0 || !We(e, t));
}, Ke = function(e) {
	var t = parseInt(e.getAttribute("tabindex"), 10);
	return !!(isNaN(t) || t >= 0);
}, qe = function(e) {
	var t = [], n = [];
	return e.forEach(function(e, r) {
		var i = !!e.scopeParent, a = i ? e.scopeParent : e, o = je(a, i), s = i ? qe(e.candidates) : a;
		o === 0 ? i ? t.push.apply(t, s) : t.push(a) : n.push({
			documentOrder: r,
			tabIndex: o,
			item: e,
			isScope: i,
			content: s
		});
	}), n.sort(Me).reduce(function(e, t) {
		return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e;
	}, []).concat(t);
}, Je = function(e, t) {
	return t ||= {}, qe(t.getShadowRoot ? Oe([e], t.includeContainer, {
		filter: Ge.bind(null, t),
		flatten: !1,
		getShadowRoot: t.getShadowRoot,
		shadowRootFilter: Ke
	}) : De(e, t.includeContainer, Ge.bind(null, t)));
}, Ye = function(e, t) {
	return t ||= {}, t.getShadowRoot ? Oe([e], t.includeContainer, {
		filter: We.bind(null, t),
		flatten: !0,
		getShadowRoot: t.getShadowRoot
	}) : De(e, t.includeContainer, We.bind(null, t));
}, Xe = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return Q.call(e, Se) === !1 ? !1 : Ge(t, e);
}, Ze = () => ({
	getShadowRoot: !0,
	displayCheck: typeof ResizeObserver == "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
});
function Qe(e, t) {
	let n = Je(e, Ze()), r = n.length;
	if (r === 0) return;
	let i = se(q(e)), a = n.indexOf(i);
	return n[a === -1 ? t === 1 ? 0 : r - 1 : a + t];
}
function $e(e) {
	return Qe(q(e).body, 1) || e;
}
function et(e) {
	return Qe(q(e).body, -1) || e;
}
function tt(e, t) {
	if (!e) return null;
	let n = Je(q(e).body, Ze()), r = n.length;
	if (r === 0) return null;
	let i = n.indexOf(e);
	return i === -1 ? null : n[(i + t + r) % r];
}
function nt(e) {
	return tt(e, 1);
}
function rt(e) {
	return tt(e, -1);
}
function it(e, t) {
	let n = t || e.currentTarget, r = e.relatedTarget;
	return !r || !ae(n, r);
}
function at(e) {
	Je(e, Ze()).forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	});
}
function ot(e) {
	e.querySelectorAll("[data-tabindex]").forEach((e) => {
		let t = e.dataset.tabindex;
		delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex");
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/useTimeout.js
var st = 0, ct = class e {
	static create() {
		return new e();
	}
	currentId = st;
	start(e, t) {
		this.clear(), this.currentId = setTimeout(() => {
			this.currentId = st, t();
		}, e);
	}
	isStarted() {
		return this.currentId !== st;
	}
	clear = () => {
		this.currentId !== st && (clearTimeout(this.currentId), this.currentId = st);
	};
	disposeEffect = () => this.clear;
};
function lt() {
	let e = n(ct.create).current;
	return te(e.disposeEffect), e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/createEventEmitter.js
function ut() {
	let e = /* @__PURE__ */ new Map();
	return {
		emit(t, n) {
			e.get(t)?.forEach((e) => e(n));
		},
		on(t, n) {
			e.has(t) || e.set(t, /* @__PURE__ */ new Set()), e.get(t).add(n);
		},
		off(t, n) {
			e.get(t)?.delete(n);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingTreeStore.js
var dt = class {
	nodesRef = { current: [] };
	events = ut();
	addNode(e) {
		this.nodesRef.current.push(e);
	}
	removeNode(e) {
		let t = this.nodesRef.current.findIndex((t) => t === e);
		t !== -1 && this.nodesRef.current.splice(t, 1);
	}
}, ft = /* @__PURE__ */ Y.createContext(null);
process.env.NODE_ENV !== "production" && (ft.displayName = "FloatingNodeContext");
var pt = /* @__PURE__ */ Y.createContext(null);
process.env.NODE_ENV !== "production" && (pt.displayName = "FloatingTreeContext");
var mt = () => Y.useContext(ft)?.id || null, ht = (e) => {
	let t = Y.useContext(pt);
	return e ?? t;
};
function gt(e) {
	let t = p(), n = ht(e), r = mt();
	return c(() => {
		if (!t) return;
		let e = {
			id: t,
			parentId: r
		};
		return n?.addNode(e), () => {
			n?.removeNode(e);
		};
	}, [
		n,
		t,
		r
	]), t;
}
function _t(e) {
	let { children: t, id: n } = e, r = mt();
	return /* @__PURE__ */ X(ft.Provider, {
		value: Y.useMemo(() => ({
			id: n,
			parentId: r
		}), [n, r]),
		children: t
	});
}
function vt(e) {
	let { children: t, externalTree: r } = e, i = n(() => r ?? new dt()).current;
	return /* @__PURE__ */ X(pt.Provider, {
		value: i,
		children: t
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/createAttribute.js
function yt(e) {
	return `data-base-ui-${e}`;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/FocusGuard.js
var bt = /* @__PURE__ */ Y.forwardRef(function(e, t) {
	let [n, r] = Y.useState();
	c(() => {
		ie && r("button");
	}, []);
	let i = {
		tabIndex: 0,
		role: n
	};
	return /* @__PURE__ */ X("span", {
		...e,
		ref: t,
		style: he,
		"aria-hidden": n ? void 0 : !0,
		...i,
		"data-base-ui-focus-guard": ""
	});
});
process.env.NODE_ENV !== "production" && (bt.displayName = "FocusGuard");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingPortal.js
var xt = /* @__PURE__ */ Y.createContext(null);
process.env.NODE_ENV !== "production" && (xt.displayName = "PortalContext");
var St = () => Y.useContext(xt), Ct = yt("portal");
function wt(t = {}) {
	let { ref: n, container: r, componentProps: i = e, elementProps: a, elementState: s } = t, l = p(), u = St()?.portalNode, [d, f] = Y.useState(null), [m, h] = Y.useState(null), g = Y.useRef(null);
	c(() => {
		if (r === null) {
			g.current && (g.current = null, h(null), f(null));
			return;
		}
		if (l == null) return;
		let e = (r && (x(r) ? r : r.current)) ?? u ?? document.body;
		if (e == null) {
			g.current && (g.current = null, h(null), f(null));
			return;
		}
		g.current !== e && (g.current = e, h(null), f(e));
	}, [
		r,
		u,
		l
	]);
	let _ = o("div", i, {
		ref: [n, h],
		state: s,
		props: [{
			id: l,
			[Ct]: ""
		}, a]
	});
	return {
		portalNode: m,
		portalSubtree: d && _ ? /* @__PURE__ */ ve.createPortal(_, d) : null
	};
}
var Tt = /* @__PURE__ */ Y.forwardRef(function(e, t) {
	let { children: n, container: r, className: i, render: o, renderGuards: s, ...c } = e, { portalNode: l, portalSubtree: u } = wt({
		container: r,
		ref: t,
		componentProps: e,
		elementProps: c
	}), d = Y.useRef(null), f = Y.useRef(null), p = Y.useRef(null), m = Y.useRef(null), [h, g] = Y.useState(null), _ = h?.modal, v = h?.open, y = typeof s == "boolean" ? s : !!h && !h.modal && h.open && !!l;
	Y.useEffect(() => {
		if (!l || _) return;
		function e(e) {
			l && it(e) && (e.type === "focusin" ? ot : at)(l);
		}
		return l.addEventListener("focusin", e, !0), l.addEventListener("focusout", e, !0), () => {
			l.removeEventListener("focusin", e, !0), l.removeEventListener("focusout", e, !0);
		};
	}, [l, _]), Y.useEffect(() => {
		!l || v || ot(l);
	}, [v, l]);
	let b = Y.useMemo(() => ({
		beforeOutsideRef: d,
		afterOutsideRef: f,
		beforeInsideRef: p,
		afterInsideRef: m,
		portalNode: l,
		setFocusManagerState: g
	}), [l]);
	return /* @__PURE__ */ _e(Y.Fragment, { children: [u, /* @__PURE__ */ _e(xt.Provider, {
		value: b,
		children: [
			y && l && /* @__PURE__ */ X(bt, {
				"data-type": "outside",
				ref: d,
				onFocus: (e) => {
					it(e, l) ? p.current?.focus() : et(h ? h.domReference : null)?.focus();
				}
			}),
			y && l && /* @__PURE__ */ X("span", {
				"aria-owns": l.id,
				style: a
			}),
			l && /* @__PURE__ */ ve.createPortal(n, l),
			y && l && /* @__PURE__ */ X(bt, {
				"data-type": "outside",
				ref: f,
				onFocus: (e) => {
					it(e, l) ? m.current?.focus() : ($e(h ? h.domReference : null)?.focus(), h?.closeOnFocusOut && h?.onOpenChange(!1, A("focus-out", e.nativeEvent)));
				}
			})
		]
	})] });
});
process.env.NODE_ENV !== "production" && (Tt.displayName = "FloatingPortal");
//#endregion
//#region node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Et(e, t, n) {
	let { reference: r, floating: i } = e, a = z(t), o = fe(t), s = H(o), c = B(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	switch (U(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function Dt(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = V(t, e), p = ue(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = J(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = J(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Ot = 50, kt = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Dt
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Et(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Ot && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Et(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, At = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = V(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = B(r), _ = z(o), v = B(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [W(o)] : pe(o)), x = p !== "none";
			!d && x && b.push(...R(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = ce(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== z(t)) || T.every((e) => z(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = z(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function jt(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Mt(e) {
	return me.some((t) => e[t] >= 0);
}
var Nt = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = V(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = jt(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Mt(e)
					} };
				}
				case "escaped": {
					let e = jt(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Mt(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Pt = /* @__PURE__ */ new Set(["left", "top"]);
async function Ft(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = B(n), s = U(n), c = z(n) === "y", l = Pt.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = V(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var It = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Ft(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Lt = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = V(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = z(B(i)), p = le(f), m = u[p], h = u[f];
			if (o) {
				let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = m + d[e], r = m - d[t];
				m = de(n, m, r);
			}
			if (s) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = h + d[e], r = h - d[t];
				h = de(n, h, r);
			}
			let g = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				...g,
				data: {
					x: g.x - n,
					y: g.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, Rt = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = V(e, t), u = {
				x: n,
				y: r
			}, d = z(i), f = le(d), p = u[f], m = u[d], h = V(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...h
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Pt.has(B(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, zt = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = V(e, t), u = await o.detectOverflow(t, l), d = B(i), f = U(i), p = z(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = K(h - u[g], v), x = K(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = F(u.left, 0), t = F(u.right, 0), n = F(u.top, 0), r = F(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : F(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : F(u.top, u.bottom));
			}
			await c({
				...t,
				availableWidth: w,
				availableHeight: C
			});
			let T = await o.getDimensions(s.floating);
			return m !== T.width || h !== T.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Bt(e) {
	let t = D(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = g(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = L(n) !== a || L(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Vt(e) {
	return h(e) ? e : e.contextElement;
}
function Ht(e) {
	let t = Vt(e);
	if (!g(t)) return G(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Bt(t), o = (a ? L(n.width) : n.width) / r, s = (a ? L(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Ut = /* @__PURE__ */ G(0);
function Wt(e) {
	let t = b(e);
	return !ee() || !t.visualViewport ? Ut : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Gt(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== b(e) ? !1 : t;
}
function $(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Vt(e), o = G(1);
	t && (r ? h(r) && (o = Ht(r)) : o = Ht(e));
	let s = Gt(a, n, r) ? Wt(a) : G(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = b(a), t = r && h(r) ? b(r) : r, n = e, i = v(n);
		for (; i && r && t !== n;) {
			let e = Ht(i), t = i.getBoundingClientRect(), r = D(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = b(i), i = v(n);
		}
	}
	return J({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Kt(e, t) {
	let n = C(e).scrollLeft;
	return t ? t.left + n : $(T(e)).left + n;
}
function qt(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Kt(e, n),
		y: n.top + t.scrollTop
	};
}
function Jt(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = T(r), s = t ? k(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = G(1), u = G(0), d = g(r);
	if ((d || !d && !a) && ((f(r) !== "body" || _(o)) && (c = C(r)), d)) {
		let e = $(r);
		l = Ht(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let p = o && !d && !a ? qt(o, c) : G(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + p.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + p.y
	};
}
function Yt(e) {
	return Array.from(e.getClientRects());
}
function Xt(e) {
	let t = T(e), n = C(e), r = e.ownerDocument.body, i = F(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = F(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + Kt(e), s = -n.scrollTop;
	return D(r).direction === "rtl" && (o += F(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
var Zt = 25;
function Qt(e, t) {
	let n = b(e), r = T(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = ee();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = Kt(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= Zt && (a -= o);
	} else l <= Zt && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function $t(e, t) {
	let n = $(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = g(e) ? Ht(e) : G(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function en(e, t, n) {
	let r;
	if (t === "viewport") r = Qt(e, n);
	else if (t === "document") r = Xt(T(e));
	else if (h(t)) r = $t(t, n);
	else {
		let n = Wt(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return J(r);
}
function tn(e, t) {
	let n = m(e);
	return n === t || !h(n) || w(n) ? !1 : D(n).position === "fixed" || tn(n, t);
}
function nn(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = E(e, [], !1).filter((e) => h(e) && f(e) !== "body"), i = null, a = D(e).position === "fixed", o = a ? m(e) : e;
	for (; h(o) && !w(o);) {
		let t = D(o), n = O(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || _(o) && !n && tn(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = m(o);
	}
	return t.set(e, r), r;
}
function rn(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? k(t) ? [] : nn(t, this._c) : [].concat(n), r], o = en(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = en(t, a[e], i);
		s = F(n.top, s), c = K(n.right, c), l = K(n.bottom, l), u = F(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function an(e) {
	let { width: t, height: n } = Bt(e);
	return {
		width: t,
		height: n
	};
}
function on(e, t, n) {
	let r = g(t), i = T(t), a = n === "fixed", o = $(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = G(0);
	function l() {
		c.x = Kt(i);
	}
	if (r || !r && !a) if ((f(t) !== "body" || _(i)) && (s = C(t)), r) {
		let e = $(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? qt(i, s) : G(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function sn(e) {
	return D(e).position === "static";
}
function cn(e, t) {
	if (!g(e) || D(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return T(e) === n && (n = n.ownerDocument.body), n;
}
function ln(e, t) {
	let n = b(e);
	if (k(e)) return n;
	if (!g(e)) {
		let t = m(e);
		for (; t && !w(t);) {
			if (h(t) && !sn(t)) return t;
			t = m(t);
		}
		return n;
	}
	let r = cn(e, t);
	for (; r && d(r) && sn(r);) r = cn(r, t);
	return r && w(r) && sn(r) && !O(r) ? n : r || S(e) || n;
}
var un = async function(e) {
	let t = this.getOffsetParent || ln, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: on(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function dn(e) {
	return D(e).direction === "rtl";
}
var fn = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Jt,
	getDocumentElement: T,
	getClippingRect: rn,
	getOffsetParent: ln,
	getElementRects: un,
	getClientRects: Yt,
	getDimensions: an,
	getScale: Ht,
	isElement: h,
	isRTL: dn
};
function pn(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function mn(e, t) {
	let n = null, r, i = T(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = I(d), h = I(i.clientWidth - (u + f)), g = I(i.clientHeight - (d + p)), _ = I(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: F(0, K(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !pn(l, e.getBoundingClientRect()) && o(), y = !1;
		}
		try {
			n = new IntersectionObserver(b, {
				...v,
				root: i.ownerDocument
			});
		} catch {
			n = new IntersectionObserver(b, v);
		}
		n.observe(e);
	}
	return o(!0), a;
}
function hn(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Vt(e), u = i || a ? [...l ? E(l) : [], ...t ? E(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? mn(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? $(e) : null;
	c && g();
	function g() {
		let t = $(e);
		h && !pn(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var gn = It, _n = Lt, vn = At, yn = zt, bn = Nt, xn = Rt, Sn = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: fn,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return kt(e, t, {
		...i,
		platform: a
	});
}, Cn = typeof document < "u" ? ge : function() {};
function wn(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!wn(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !wn(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Tn(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function En(e, t) {
	let n = Tn(e);
	return Math.round(t * n) / n;
}
function Dn(e) {
	let t = Y.useRef(e);
	return Cn(() => {
		t.current = e;
	}), t;
}
function On(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = Y.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = Y.useState(r);
	wn(f, r) || p(r);
	let [m, h] = Y.useState(null), [g, _] = Y.useState(null), v = Y.useCallback((e) => {
		e !== S.current && (S.current = e, h(e));
	}, []), y = Y.useCallback((e) => {
		e !== C.current && (C.current = e, _(e));
	}, []), b = a || m, x = o || g, S = Y.useRef(null), C = Y.useRef(null), w = Y.useRef(u), T = c != null, E = Dn(c), D = Dn(i), O = Dn(l), k = Y.useCallback(() => {
		if (!S.current || !C.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		D.current && (e.platform = D.current), Sn(S.current, C.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: O.current !== !1
			};
			A.current && !wn(w.current, t) && (w.current = t, ve.flushSync(() => {
				d(t);
			}));
		});
	}, [
		f,
		t,
		n,
		D,
		O
	]);
	Cn(() => {
		l === !1 && w.current.isPositioned && (w.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let A = Y.useRef(!1);
	Cn(() => (A.current = !0, () => {
		A.current = !1;
	}), []), Cn(() => {
		if (b && (S.current = b), x && (C.current = x), b && x) {
			if (E.current) return E.current(b, x, k);
			k();
		}
	}, [
		b,
		x,
		k,
		E,
		T
	]);
	let ee = Y.useMemo(() => ({
		reference: S,
		floating: C,
		setReference: v,
		setFloating: y
	}), [v, y]), j = Y.useMemo(() => ({
		reference: b,
		floating: x
	}), [b, x]), te = Y.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!j.floating) return e;
		let t = En(j.floating, u.x), r = En(j.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...Tn(j.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		j.floating,
		u.x,
		u.y
	]);
	return Y.useMemo(() => ({
		...u,
		update: k,
		refs: ee,
		elements: j,
		floatingStyles: te
	}), [
		u,
		k,
		ee,
		j,
		te
	]);
}
var kn = (e, t) => {
	let n = gn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, An = (e, t) => {
	let n = _n(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, jn = (e, t) => ({
	fn: xn(e).fn,
	options: [e, t]
}), Mn = (e, t) => {
	let n = vn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Nn = (e, t) => {
	let n = yn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Pn = (e, t) => {
	let n = bn(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Fn = {
	intentional: "onClick",
	sloppy: "onPointerDown"
};
function In(e) {
	return {
		escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
		outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
	};
}
function Ln(e, t = {}) {
	let n = "rootStore" in e ? e.rootStore : e, r = n.useState("open"), i = n.useState("floatingElement"), a = n.useState("referenceElement"), o = n.useState("domReferenceElement"), { onOpenChange: c, dataRef: d } = n.context, { enabled: f = !0, escapeKey: p = !0, outsidePress: _ = !0, outsidePressEvent: v = "sloppy", referencePress: b = !1, referencePressEvent: x = "sloppy", ancestorScroll: S = !1, bubbles: C, externalTree: T } = t, O = ht(T), k = l(typeof _ == "function" ? _ : () => !1), j = typeof _ == "function" ? k : _, te = Y.useRef(!1), { escapeKey: re, outsidePress: ie } = In(C), P = Y.useRef(null), se = lt(), F = lt(), I = l(() => {
		F.clear(), d.current.insideReactTree = !1;
	}), L = Y.useRef(!1), ce = Y.useRef(""), le = l((e) => {
		ce.current = e.pointerType;
	}), R = l(() => {
		let e = ce.current, t = e === "pen" || !e ? "mouse" : e, n = typeof v == "function" ? v() : v;
		return typeof n == "string" ? n : n[t];
	}), z = l((e) => {
		if (!r || !f || !p || e.key !== "Escape" || L.current) return;
		let t = d.current.floatingContext?.nodeId, i = O ? be(O.nodesRef.current, t) : [];
		if (!re && i.length > 0) {
			let e = !0;
			if (i.forEach((t) => {
				t.context?.open && !t.context.dataRef.current.__escapeKeyBubbles && (e = !1);
			}), !e) return;
		}
		let a = A(u, ne(e) ? e.nativeEvent : e);
		n.setOpen(!1, a), !re && !a.isPropagationAllowed && e.stopPropagation();
	}), B = l((e) => {
		let t = R();
		return t === "intentional" && e.type !== "click" || t === "sloppy" && e.type === "click";
	}), V = l(() => {
		d.current.insideReactTree = !0, F.start(0, I);
	}), H = l((e, t = !1) => {
		if (B(e)) {
			I();
			return;
		}
		if (d.current.insideReactTree) {
			I();
			return;
		}
		if (R() === "intentional" && t || typeof j == "function" && !j(e)) return;
		let r = N(e), i = `[${yt("inert")}]`, a = q(n.select("floatingElement")).querySelectorAll(i), o = n.context.triggerElements;
		if (r && (o.hasElement(r) || o.hasMatchingElement((e) => ae(e, r)))) return;
		let s = h(r) ? r : null;
		for (; s && !w(s);) {
			let e = m(s);
			if (w(e) || !h(e)) break;
			s = e;
		}
		if (a.length && h(r) && !oe(r) && !ae(r, n.select("floatingElement")) && Array.from(a).every((e) => !ae(s, e))) return;
		if (g(r) && !("touches" in e)) {
			let t = w(r), n = D(r), i = /auto|scroll/, a = t || i.test(n.overflowX), o = t || i.test(n.overflowY), s = a && r.clientWidth > 0 && r.scrollWidth > r.clientWidth, c = o && r.clientHeight > 0 && r.scrollHeight > r.clientHeight, l = n.direction === "rtl", u = c && (l ? e.offsetX <= r.offsetWidth - r.clientWidth : e.offsetX > r.clientWidth), d = s && e.offsetY > r.clientHeight;
			if (u || d) return;
		}
		let c = d.current.floatingContext?.nodeId, l = O && be(O.nodesRef.current, c).some((t) => M(e, t.context?.elements.floating));
		if (M(e, n.select("floatingElement")) || M(e, n.select("domReferenceElement")) || l) return;
		let u = O ? be(O.nodesRef.current, c) : [];
		if (u.length > 0) {
			let e = !0;
			if (u.forEach((t) => {
				t.context?.open && !t.context.dataRef.current.__outsidePressBubbles && (e = !1);
			}), !e) return;
		}
		n.setOpen(!1, A(y, e)), I();
	}), ue = l((e) => {
		R() !== "sloppy" || e.pointerType === "touch" || !n.select("open") || !f || M(e, n.select("floatingElement")) || M(e, n.select("domReferenceElement")) || H(e);
	}), de = l((e) => {
		if (R() !== "sloppy" || !n.select("open") || !f || M(e, n.select("floatingElement")) || M(e, n.select("domReferenceElement"))) return;
		let t = e.touches[0];
		t && (P.current = {
			startTime: Date.now(),
			startX: t.clientX,
			startY: t.clientY,
			dismissOnTouchEnd: !1,
			dismissOnMouseDown: !0
		}, se.start(1e3, () => {
			P.current && (P.current.dismissOnTouchEnd = !1, P.current.dismissOnMouseDown = !1);
		}));
	}), U = l((e) => {
		let t = N(e);
		function n() {
			de(e), t?.removeEventListener(e.type, n);
		}
		t?.addEventListener(e.type, n);
	}), W = l((e) => {
		let t = te.current;
		if (te.current = !1, se.clear(), e.type === "mousedown" && P.current && !P.current.dismissOnMouseDown) return;
		let n = N(e);
		function r() {
			e.type === "pointerdown" ? ue(e) : H(e, t), n?.removeEventListener(e.type, r);
		}
		n?.addEventListener(e.type, r);
	}), G = l((e) => {
		if (R() !== "sloppy" || !P.current || M(e, n.select("floatingElement")) || M(e, n.select("domReferenceElement"))) return;
		let t = e.touches[0];
		if (!t) return;
		let r = Math.abs(t.clientX - P.current.startX), i = Math.abs(t.clientY - P.current.startY), a = Math.sqrt(r * r + i * i);
		a > 5 && (P.current.dismissOnTouchEnd = !0), a > 10 && (H(e), se.clear(), P.current = null);
	}), fe = l((e) => {
		let t = N(e);
		function n() {
			G(e), t?.removeEventListener(e.type, n);
		}
		t?.addEventListener(e.type, n);
	}), pe = l((e) => {
		R() !== "sloppy" || !P.current || M(e, n.select("floatingElement")) || M(e, n.select("domReferenceElement")) || (P.current.dismissOnTouchEnd && H(e), se.clear(), P.current = null);
	}), K = l((e) => {
		let t = N(e);
		function n() {
			pe(e), t?.removeEventListener(e.type, n);
		}
		t?.addEventListener(e.type, n);
	});
	Y.useEffect(() => {
		if (!r || !f) return;
		d.current.__escapeKeyBubbles = re, d.current.__outsidePressBubbles = ie;
		let e = new ct();
		function t(e) {
			n.setOpen(!1, A(s, e));
		}
		function c() {
			e.clear(), L.current = !0;
		}
		function l() {
			e.start(ee() ? 5 : 0, () => {
				L.current = !1;
			});
		}
		let u = q(i);
		u.addEventListener("pointerdown", le, !0), p && (u.addEventListener("keydown", z), u.addEventListener("compositionstart", c), u.addEventListener("compositionend", l)), j && (u.addEventListener("click", W, !0), u.addEventListener("pointerdown", W, !0), u.addEventListener("touchstart", U, !0), u.addEventListener("touchmove", fe, !0), u.addEventListener("touchend", K, !0), u.addEventListener("mousedown", W, !0));
		let m = [];
		return S && (h(o) && (m = E(o)), h(i) && (m = m.concat(E(i))), !h(a) && a && a.contextElement && (m = m.concat(E(a.contextElement)))), m = m.filter((e) => e !== u.defaultView?.visualViewport), m.forEach((e) => {
			e.addEventListener("scroll", t, { passive: !0 });
		}), () => {
			u.removeEventListener("pointerdown", le, !0), p && (u.removeEventListener("keydown", z), u.removeEventListener("compositionstart", c), u.removeEventListener("compositionend", l)), j && (u.removeEventListener("click", W, !0), u.removeEventListener("pointerdown", W, !0), u.removeEventListener("touchstart", U, !0), u.removeEventListener("touchmove", fe, !0), u.removeEventListener("touchend", K, !0), u.removeEventListener("mousedown", W, !0)), m.forEach((e) => {
				e.removeEventListener("scroll", t);
			}), e.clear();
		};
	}, [
		d,
		i,
		a,
		o,
		p,
		j,
		r,
		c,
		S,
		f,
		re,
		ie,
		z,
		H,
		W,
		ue,
		U,
		fe,
		K,
		le,
		n
	]), Y.useEffect(I, [j, I]);
	let me = Y.useMemo(() => ({
		onKeyDown: z,
		...b && {
			[Fn[x]]: (e) => {
				n.setOpen(!1, A("trigger-press", e.nativeEvent));
			},
			...x !== "intentional" && { onClick(e) {
				n.setOpen(!1, A("trigger-press", e.nativeEvent));
			} }
		}
	}), [
		z,
		n,
		b,
		x
	]), J = l((e) => {
		let t = N(e.nativeEvent);
		!ae(n.select("floatingElement"), t) || e.button !== 0 || (te.current = !0);
	}), he = Y.useMemo(() => ({
		onKeyDown: z,
		onPointerDown: J,
		onMouseDown: J,
		onMouseUp: J,
		onClickCapture: V,
		onMouseDownCapture: V,
		onPointerDownCapture: V,
		onMouseUpCapture: V,
		onTouchEndCapture: V,
		onTouchMoveCapture: V
	}), [
		z,
		J,
		V
	]);
	return Y.useMemo(() => f ? {
		reference: me,
		floating: he,
		trigger: me
	} : {}, [
		f,
		me,
		he
	]);
}
//#endregion
//#region node_modules/.pnpm/reselect@5.3.0/node_modules/reselect/dist/reselect.mjs
var Rn = 1e3, zn = (e, t) => {
	let n;
	try {
		throw Error();
	} catch (e) {
		({stack: n} = e);
	}
	console.warn(`A function memoized with weakMapMemoize${t ? ` (\`${t}\`)` : ""} has seen over ${e} distinct values for the same primitive argument position.
Results keyed by primitive arguments are held strongly and are only released by \`clearCache()\`, so this cache will keep growing for as long as the function keeps seeing new values.
If it is called with ever-changing primitives (ids, offsets, timestamps), pass the \`maxSize\` option to bound the cache, switch to \`lruMemoize\`, or call \`.clearCache()\` at a suitable point.
See https://reselect.js.org/api/development-only-checks#cachesizecheck for details.`, { stack: n });
}, Bn = {
	inputStabilityCheck: "once",
	identityFunctionCheck: "once",
	cacheSizeCheck: "once"
}, Vn = class {
	constructor(e) {
		this.value = e;
	}
	deref() {
		return this.value;
	}
}, Hn = typeof WeakRef > "u" ? Vn : WeakRef, Un = 0, Wn = 1;
function Gn() {
	return {
		s: Un,
		v: void 0,
		o: null,
		p: null
	};
}
function Kn(e) {
	return e instanceof Hn ? e.deref() : e;
}
function qn(e, t = {}) {
	let n = Gn(), { resultEqualityCheck: r, maxSize: i } = t, a = i !== void 0;
	if (a && (!Number.isInteger(i) || i < 1)) throw TypeError(`maxSize must be a positive integer, received: ${i}`);
	let o = null, s = 0, c, l = 0, u = !1;
	function d() {
		s >= i && (o = n, n = Gn(), s = 0);
	}
	function f() {
		let t = n, { length: i } = arguments;
		for (let n = 0, r = i; n < r; n++) {
			let r = arguments[n];
			if (typeof r == "function" || typeof r == "object" && r) {
				let e = t.o;
				e === null && (t.o = e = /* @__PURE__ */ new WeakMap());
				let n = e.get(r);
				n === void 0 ? (t = Gn(), e.set(r, t)) : t = n;
			} else {
				let n = t.p;
				n === null && (t.p = n = /* @__PURE__ */ new Map());
				let i = n.get(r);
				if (i === void 0) {
					if (t = Gn(), n.set(r, t), s++, process.env.NODE_ENV !== "production" && n.size > Rn) {
						let { cacheSizeCheck: t } = Bn;
						(t === "always" || t === "once" && !u) && (u = !0, zn(n.size, e.name));
					}
				} else t = i;
			}
		}
		if (t.s === Wn) return t.v;
		if (o !== null) {
			let e = o;
			for (let t = 0, n = i; t < n; t++) {
				let n = arguments[t], r;
				if (typeof n == "function" || typeof n == "object" && n) {
					let t = e.o;
					r = t === null ? void 0 : t.get(n);
				} else {
					let t = e.p;
					r = t === null ? void 0 : t.get(n);
				}
				if (r === void 0) {
					e = null;
					break;
				}
				e = r;
			}
			if (e !== null && e.s === Wn) {
				let n = t;
				return n.s = Wn, n.v = e.v, d(), e.v;
			}
		}
		let f = t, p = e.apply(null, arguments);
		if (l++, r) {
			let e = Kn(c);
			e != null && r(e, p) && (p = e, l !== 0 && l--), c = typeof p == "object" && p || typeof p == "function" ? /* @__PURE__ */ new Hn(p) : p;
		}
		return f.s = Wn, f.v = p, a && d(), p;
	}
	return f.clearCache = () => {
		n = Gn(), o = null, s = 0, f.resetResultsCount(), process.env.NODE_ENV !== "production" && (u = !1);
	}, f.resultsCount = () => l, f.resetResultsCount = () => {
		l = 0;
	}, f;
}
var Jn = (e, t, n) => {
	if (t.length === 1 && t[0] === n) {
		let t = !1;
		try {
			let n = {};
			e(n) === n && (t = !0);
		} catch {}
		if (t) {
			let e;
			try {
				throw Error();
			} catch (t) {
				({stack: e} = t);
			}
			console.warn("The result function returned its own inputs without modification. e.g\n`createSelector([state => state.todos], todos => todos)`\nThis could lead to inefficient memoization and unnecessary re-renders.\nEnsure transformation logic is in the result function, and extraction logic is in the input selectors.", { stack: e });
		}
	}
}, Yn = (e) => {
	if (typeof e != "object" || !e || !("resultEqualityCheck" in e)) return e;
	let t = { ...e };
	return delete t.resultEqualityCheck, t;
}, Xn = (e, t, n) => {
	let { memoize: r, memoizeOptions: i } = t, { inputSelectorResults: a, inputSelectorResultsCopy: o } = e, s = [], { length: c } = i;
	for (let e = 0; e < c; e++) s.push(Yn(i[e]));
	let l = r(() => ({}), ...s);
	if (l.apply(null, a) !== l.apply(null, o)) {
		let e;
		try {
			throw Error();
		} catch (t) {
			({stack: e} = t);
		}
		console.warn("An input selector returned a different result when passed same arguments.\nThis means your output selector will likely run more frequently than intended.\nAvoid returning a new reference inside your input selector, e.g.\n`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)`", {
			arguments: n,
			firstInputs: a,
			secondInputs: o,
			stack: e
		});
	}
}, Zn = /* @__PURE__ */ Symbol("NOT_FOUND");
function Qn(e, t = `expected a function, instead received ${typeof e}`) {
	if (typeof e != "function") throw TypeError(t);
}
function $n(e, t = "expected all items to be functions, instead received the following types: ") {
	if (!e.every((e) => typeof e == "function")) {
		let n = e.map((e) => typeof e == "function" ? `function ${e.name || "unnamed"}()` : typeof e).join(", ");
		throw TypeError(`${t}[${n}]`);
	}
}
var er = (e) => Array.isArray(e) ? e : [e];
function tr(e) {
	let t = Array.isArray(e[0]) ? e[0] : e;
	return $n(t, "createSelector expects all input-selectors to be functions, but received the following types: "), t;
}
function nr(e, t) {
	let n = [], { length: r } = e;
	for (let i = 0; i < r; i++) n.push(e[i].apply(null, t));
	return n;
}
function rr(e, ...t) {
	let n = typeof e == "function" ? {
		memoize: e,
		memoizeOptions: t
	} : e, r = (...e) => {
		let t = 0, r = 0, i, a = {}, o = e.pop();
		typeof o == "object" && (a = o, o = e.pop()), Qn(o, `createSelector expects an output function after the inputs, but received: [${typeof o}]`);
		let s = {
			...n,
			...a
		}, { memoize: c, memoizeOptions: l = [], argsMemoize: u = qn, argsMemoizeOptions: d = [] } = s, f = er(l), p = er(d), m = tr(e), h = c(function() {
			return t++, o.apply(null, arguments);
		}, ...f), g = !0, _ = u(function() {
			r++;
			let { length: e } = m, t = Array(e);
			for (let n = 0; n < e; n++) t[n] = m[n].apply(null, arguments);
			if (i = h.apply(null, t), process.env.NODE_ENV !== "production") {
				let { devModeChecks: e } = s, n = e !== void 0 && Object.prototype.hasOwnProperty.call(e, "identityFunctionCheck") ? e.identityFunctionCheck : Bn.identityFunctionCheck, r = e !== void 0 && Object.prototype.hasOwnProperty.call(e, "inputStabilityCheck") ? e.inputStabilityCheck : Bn.inputStabilityCheck;
				(n === "always" || n === "once" && g) && Jn(o, t, i), (r === "always" || r === "once" && g) && Xn({
					inputSelectorResults: t,
					inputSelectorResultsCopy: nr(m, arguments)
				}, {
					memoize: c,
					memoizeOptions: f
				}, arguments), g &&= !1;
			}
			return i;
		}, ...p);
		return Object.assign(_, {
			resultFunc: o,
			memoizedResultFunc: h,
			dependencies: m,
			dependencyRecomputations: () => r,
			resetDependencyRecomputations: () => {
				r = 0;
			},
			lastResult: () => i,
			recomputations: () => t,
			resetRecomputations: () => {
				t = 0;
			},
			memoize: c,
			argsMemoize: u
		});
	};
	return Object.assign(r, { withTypes: () => r }), r;
}
function ir(e) {
	let t;
	return {
		get(n) {
			return t && e(t.key, n) ? t.value : Zn;
		},
		put(e, n) {
			t = {
				key: e,
				value: n
			};
		},
		findMatchingEntry(e, n) {
			let r = t;
			return r !== void 0 && n(r.value, e) ? r : void 0;
		},
		clear() {
			t = void 0;
		}
	};
}
function ar(e, t) {
	let n = [];
	function r(e) {
		let r = n.findIndex((n) => t(n.key, e));
		if (r > -1) {
			let e = n[r];
			return r > 0 && (n.splice(r, 1), n.unshift(e)), e.value;
		}
		return Zn;
	}
	function i(t, r) {
		n.unshift({
			key: t,
			value: r
		}), n.length > e && n.pop();
	}
	function a(e, t) {
		let r = n, { length: i } = r;
		for (let n = 0; n < i; n++) {
			let i = r[n];
			if (t(i.value, e)) return i;
		}
	}
	function o() {
		n = [];
	}
	return {
		get: r,
		put: i,
		findMatchingEntry: a,
		clear: o
	};
}
var or = (e, t) => e === t;
function sr(e) {
	return function(t, n) {
		if (t === null || n === null || t.length !== n.length) return !1;
		let { length: r } = t;
		for (let i = 0; i < r; i++) if (!e(t[i], n[i])) return !1;
		return !0;
	};
}
function cr(e, t) {
	let { equalityCheck: n = or, maxSize: r = 1, resultEqualityCheck: i } = typeof t == "object" ? t : { equalityCheck: t }, a = sr(n), o = 0, s = r <= 1 ? ir(a) : ar(r, a);
	function c() {
		let t = s.get(arguments);
		if (t === Zn) {
			if (t = e.apply(null, arguments), o++, i) {
				let e = s.findMatchingEntry(t, i);
				e && (t = e.value, o !== 0 && o--);
			}
			s.put(arguments, t);
		}
		return t;
	}
	return c.clearCache = () => {
		s.clear(), c.resetResultsCount();
	}, c.resultsCount = () => o, c.resetResultsCount = () => {
		o = 0;
	}, c;
}
rr({
	memoize: cr,
	memoizeOptions: {
		maxSize: 1,
		equalityCheck: Object.is
	}
});
var lr = (e, t, n, r, a, o, ...s) => {
	if (s.length > 0) throw Error(process.env.NODE_ENV === "production" ? i(1) : "Unsupported number of selectors");
	let c;
	if (e && t && n && r && a && o) c = (i, s, c, l) => o(e(i, s, c, l), t(i, s, c, l), n(i, s, c, l), r(i, s, c, l), a(i, s, c, l), s, c, l);
	else if (e && t && n && r && a) c = (i, o, s, c) => a(e(i, o, s, c), t(i, o, s, c), n(i, o, s, c), r(i, o, s, c), o, s, c);
	else if (e && t && n && r) c = (i, a, o, s) => r(e(i, a, o, s), t(i, a, o, s), n(i, a, o, s), a, o, s);
	else if (e && t && n) c = (r, i, a, o) => n(e(r, i, a, o), t(r, i, a, o), i, a, o);
	else if (e && t) c = (n, r, i, a) => t(e(n, r, i, a), r, i, a);
	else if (e) c = e;
	else throw Error("Missing arguments");
	return c;
}, ur = /* @__PURE__ */ Z(((e) => {
	var t = ye("react");
	function n(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var r = typeof Object.is == "function" ? Object.is : n, i = t.useState, a = t.useEffect, o = t.useLayoutEffect, s = t.useDebugValue;
	function c(e, t) {
		var n = t(), r = i({ inst: {
			value: n,
			getSnapshot: t
		} }), c = r[0].inst, u = r[1];
		return o(function() {
			c.value = n, c.getSnapshot = t, l(c) && u({ inst: c });
		}, [
			e,
			n,
			t
		]), a(function() {
			return l(c) && u({ inst: c }), e(function() {
				l(c) && u({ inst: c });
			});
		}, [e]), s(n), n;
	}
	function l(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !r(e, n);
		} catch {
			return !0;
		}
	}
	function u(e, t) {
		return t();
	}
	var d = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? u : c;
	e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? d : t.useSyncExternalStore;
})), dr = /* @__PURE__ */ Z(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function n(e, t) {
			d || a.startTransition === void 0 || (d = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
			var n = t();
			if (!f) {
				var i = t();
				o(n, i) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), f = !0);
			}
			i = s({ inst: {
				value: n,
				getSnapshot: t
			} });
			var p = i[0].inst, m = i[1];
			return l(function() {
				p.value = n, p.getSnapshot = t, r(p) && m({ inst: p });
			}, [
				e,
				n,
				t
			]), c(function() {
				return r(p) && m({ inst: p }), e(function() {
					r(p) && m({ inst: p });
				});
			}, [e]), u(n), n;
		}
		function r(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !o(e, n);
			} catch {
				return !0;
			}
		}
		function i(e, t) {
			return t();
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var a = ye("react"), o = typeof Object.is == "function" ? Object.is : t, s = a.useState, c = a.useEffect, l = a.useLayoutEffect, u = a.useDebugValue, d = !1, f = !1, p = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? i : n;
		e.useSyncExternalStore = a.useSyncExternalStore === void 0 ? p : a.useSyncExternalStore, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), fr = /* @__PURE__ */ Z(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = ur() : t.exports = dr();
})), pr = /* @__PURE__ */ Z(((e) => {
	var t = ye("react"), n = fr();
	function r(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var i = typeof Object.is == "function" ? Object.is : r, a = n.useSyncExternalStore, o = t.useRef, s = t.useEffect, c = t.useMemo, l = t.useDebugValue;
	e.useSyncExternalStoreWithSelector = function(e, t, n, r, u) {
		var d = o(null);
		if (d.current === null) {
			var f = {
				hasValue: !1,
				value: null
			};
			d.current = f;
		} else f = d.current;
		d = c(function() {
			function e(e) {
				if (!a) {
					if (a = !0, o = e, e = r(e), u !== void 0 && f.hasValue) {
						var t = f.value;
						if (u(t, e)) return s = t;
					}
					return s = e;
				}
				if (t = s, i(o, e)) return t;
				var n = r(e);
				return u !== void 0 && u(t, n) ? (o = e, t) : (o = e, s = n);
			}
			var a = !1, o, s, c = n === void 0 ? null : n;
			return [function() {
				return e(t());
			}, c === null ? void 0 : function() {
				return e(c());
			}];
		}, [
			t,
			n,
			r,
			u
		]);
		var p = a(e, d[0], d[1]);
		return s(function() {
			f.hasValue = !0, f.value = p;
		}, [p]), l(p), p;
	};
})), mr = /* @__PURE__ */ Z(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var n = ye("react"), r = fr(), i = typeof Object.is == "function" ? Object.is : t, a = r.useSyncExternalStore, o = n.useRef, s = n.useEffect, c = n.useMemo, l = n.useDebugValue;
		e.useSyncExternalStoreWithSelector = function(e, t, n, r, u) {
			var d = o(null);
			if (d.current === null) {
				var f = {
					hasValue: !1,
					value: null
				};
				d.current = f;
			} else f = d.current;
			d = c(function() {
				function e(e) {
					if (!a) {
						if (a = !0, o = e, e = r(e), u !== void 0 && f.hasValue) {
							var t = f.value;
							if (u(t, e)) return s = t;
						}
						return s = e;
					}
					if (t = s, i(o, e)) return t;
					var n = r(e);
					return u !== void 0 && u(t, n) ? (o = e, t) : (o = e, s = n);
				}
				var a = !1, o, s, c = n === void 0 ? null : n;
				return [function() {
					return e(t());
				}, c === null ? void 0 : function() {
					return e(c());
				}];
			}, [
				t,
				n,
				r,
				u
			]);
			var p = a(e, d[0], d[1]);
			return s(function() {
				f.hasValue = !0, f.value = p;
			}, [p]), l(p), p;
		}, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), hr = /* @__PURE__ */ Z(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = pr() : t.exports = mr();
})), gr = fr(), _r = hr(), vr = t(19) ? br : xr;
function yr(e, t, n, r, i) {
	return vr(e, t, n, r, i);
}
function br(e, t, n, r, i) {
	let a = Y.useCallback(() => t(e.getSnapshot(), n, r, i), [
		e,
		t,
		n,
		r,
		i
	]);
	return (0, gr.useSyncExternalStore)(e.subscribe, a, a);
}
function xr(e, t, n, r, i) {
	return (0, _r.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, (e) => t(e, n, r, i));
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/store/Store.js
var Sr = class e {
	constructor(e) {
		this.state = e, this.listeners = /* @__PURE__ */ new Set(), this.updateTick = 0;
	}
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	getSnapshot = () => this.state;
	setState(e) {
		if (this.state === e) return;
		this.state = e, this.updateTick += 1;
		let t = this.updateTick;
		for (let n of this.listeners) {
			if (t !== this.updateTick) return;
			n(e);
		}
	}
	update(t) {
		for (let n in t) if (!Object.is(this.state[n], t[n])) {
			e.prototype.setState.call(this, {
				...this.state,
				...t
			});
			return;
		}
	}
	set(t, n) {
		Object.is(this.state[t], n) || e.prototype.setState.call(this, {
			...this.state,
			[t]: n
		});
	}
	notifyAll() {
		let t = { ...this.state };
		e.prototype.setState.call(this, t);
	}
}, Cr = class extends Sr {
	constructor(e, t = {}, n) {
		super(e), this.context = t, this.selectors = n;
	}
	controlledValues = /* @__PURE__ */ new Map();
	useSyncedValue(e, t) {
		Y.useDebugValue(e), c(() => {
			this.state[e] !== t && this.set(e, t);
		}, [e, t]);
	}
	useSyncedValueWithCleanup(e, t) {
		c(() => (this.state[e] !== t && this.set(e, t), () => {
			this.set(e, void 0);
		}), [e, t]);
	}
	useSyncedValues(e) {
		if (process.env.NODE_ENV !== "production") {
			Y.useDebugValue(e, (e) => Object.keys(e));
			let t = Y.useRef(Object.keys(e)).current, n = Object.keys(e);
			(t.length !== n.length || t.some((e, t) => e !== n[t])) && console.error("ReactStore.useSyncedValues expects the same prop keys on every render. Keys should be stable.");
		}
		c(() => {
			this.update(e);
		}, Object.values(e));
	}
	useControlledProp(e, t, n) {
		Y.useDebugValue(e);
		let r = t !== void 0;
		if (process.env.NODE_ENV !== "production") {
			let t = this.controlledValues.get(e);
			t !== void 0 && t !== r && console.error(`A component is changing the ${r ? "" : "un"}controlled state of ${e.toString()} to be ${r ? "un" : ""}controlled. Elements should not switch from uncontrolled to controlled (or vice versa).`);
		}
		this.controlledValues.has(e) || (this.controlledValues.set(e, r), !r && !Object.is(this.state[e], n) && super.setState({
			...this.state,
			[e]: n
		})), c(() => {
			r && !Object.is(this.state[e], t) && super.setState({
				...this.state,
				[e]: t
			});
		}, [
			e,
			t,
			n,
			r
		]);
	}
	set(e, t) {
		this.controlledValues.get(e) !== !0 && super.set(e, t);
	}
	update(e) {
		let t = { ...e };
		for (let e in t) if (Object.hasOwn(t, e) && this.controlledValues.get(e) === !0) {
			delete t[e];
			continue;
		}
		super.update(t);
	}
	setState(e) {
		let t = { ...e };
		for (let e in t) if (Object.hasOwn(t, e) && this.controlledValues.get(e) === !0) {
			delete t[e];
			continue;
		}
		super.setState({
			...this.state,
			...t
		});
	}
	select = (e, t, n, r) => {
		let i = this.selectors[e];
		return i(this.state, t, n, r);
	};
	useState = (e, t, n, r) => {
		Y.useDebugValue(e);
		let i = this.selectors[e];
		return yr(this, i, t, n, r);
	};
	useContextCallback(e, t) {
		Y.useDebugValue(e);
		let n = l(t ?? r);
		this.context[e] = n;
	}
	useStateSetter(e) {
		let t = Y.useRef(void 0);
		return t.current === void 0 && (t.current = (t) => {
			this.set(e, t);
		}), t.current;
	}
	observe(e, t) {
		let n;
		n = typeof e == "function" ? e : this.selectors[e];
		let r = n(this.state);
		return t(r, r, this), this.subscribe((e) => {
			let i = n(e);
			if (!Object.is(r, i)) {
				let e = r;
				r = i, t(i, e, this);
			}
		});
	}
}, wr = {
	open: lr((e) => e.open),
	domReferenceElement: lr((e) => e.domReferenceElement),
	referenceElement: lr((e) => e.positionReference ?? e.referenceElement),
	floatingElement: lr((e) => e.floatingElement),
	floatingId: lr((e) => e.floatingId)
}, Tr = class extends Cr {
	constructor(e) {
		let { nested: t, noEmit: n, onOpenChange: r, triggerElements: i, ...a } = e;
		super({
			...a,
			positionReference: a.referenceElement,
			domReferenceElement: a.referenceElement
		}, {
			onOpenChange: r,
			dataRef: { current: {} },
			events: ut(),
			nested: t,
			noEmit: n,
			triggerElements: i
		}, wr);
	}
	setOpen = (e, t) => {
		if ((!e || !this.state.open || re(t.event)) && (this.context.dataRef.current.openEvent = e ? t.event : void 0), !this.context.noEmit) {
			let n = {
				open: e,
				reason: t.reason,
				nativeEvent: t.event,
				nested: this.context.nested,
				triggerElement: t.trigger
			};
			this.context.events.emit("openchange", n);
		}
		this.context.onOpenChange?.(e, t);
	};
}, Er = class {
	constructor() {
		this.elements = /* @__PURE__ */ new Set(), this.idMap = /* @__PURE__ */ new Map();
	}
	add(e, t) {
		let n = this.idMap.get(e);
		if (n !== t && (n !== void 0 && this.elements.delete(n), this.elements.add(t), this.idMap.set(e, t), process.env.NODE_ENV !== "production" && this.elements.size !== this.idMap.size)) throw Error(process.env.NODE_ENV === "production" ? i(87) : "Base UI: A trigger element cannot be registered under multiple IDs in PopupTriggerMap.");
	}
	delete(e) {
		let t = this.idMap.get(e);
		t && (this.elements.delete(t), this.idMap.delete(e));
	}
	hasElement(e) {
		return this.elements.has(e);
	}
	hasMatchingElement(e) {
		for (let t of this.elements) if (e(t)) return !0;
		return !1;
	}
	getById(e) {
		return this.idMap.get(e);
	}
	entries() {
		return this.idMap.entries();
	}
	get size() {
		return this.idMap.size;
	}
};
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useInteractions.js
function Dr(e = []) {
	let t = e.map((e) => e?.reference), n = e.map((e) => e?.floating), r = e.map((e) => e?.item), i = e.map((e) => e?.trigger), a = Y.useCallback((t) => Or(t, e, "reference"), t), o = Y.useCallback((t) => Or(t, e, "floating"), n), s = Y.useCallback((t) => Or(t, e, "item"), r), c = Y.useCallback((t) => Or(t, e, "trigger"), i);
	return Y.useMemo(() => ({
		getReferenceProps: a,
		getFloatingProps: o,
		getItemProps: s,
		getTriggerProps: c
	}), [
		a,
		o,
		s,
		c
	]);
}
function Or(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = n === "item", a = {};
	n === "floating" && (a.tabIndex = -1, a[P] = "");
	for (let t in e) i && e && (t === "active" || t === "selected") || (a[t] = e[t]);
	for (let o = 0; o < t.length; o += 1) {
		let s, c = t[o]?.[n];
		s = typeof c == "function" ? e ? c(e) : null : c, s && kr(a, s, i, r);
	}
	return kr(a, e, i, r), a;
}
function kr(e, t, n, r) {
	for (let i in t) {
		let a = t[i];
		n && (i === "active" || i === "selected") || (i.startsWith("on") ? (r.has(i) || r.set(i, []), typeof a == "function" && (r.get(i)?.push(a), e[i] = (...e) => r.get(i)?.map((t) => t(...e)).find((e) => e !== void 0))) : e[i] = a);
	}
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js
var Ar = function(e) {
	return e.open = "data-open", e.closed = "data-closed", e[e.startingStyle = j.startingStyle] = "startingStyle", e[e.endingStyle = j.endingStyle] = "endingStyle", e.anchorHidden = "data-anchor-hidden", e;
}({}), jr = /* @__PURE__ */ function(e) {
	return e.popupOpen = "data-popup-open", e.pressed = "data-pressed", e;
}({}), Mr = { [jr.popupOpen]: "" }, Nr = {
	[jr.popupOpen]: "",
	[jr.pressed]: ""
}, Pr = { [Ar.open]: "" }, Fr = { [Ar.closed]: "" }, Ir = { [Ar.anchorHidden]: "" }, Lr = { open(e) {
	return e ? Mr : null;
} }, Rr = { open(e) {
	return e ? Nr : null;
} }, zr = {
	open(e) {
		return e ? Pr : Fr;
	},
	anchorHidden(e) {
		return e ? Ir : null;
	}
};
//#endregion
export { ht as A, Ye as B, St as C, vt as D, _t as E, et as F, Je as H, nt as I, rt as L, ct as M, lt as N, gt as O, $e as P, Ze as R, wt as S, yt as T, xe as U, Xe as V, be as W, An as _, Dr as a, hn as b, Cr as c, lr as d, Ln as f, kn as g, jn as h, Lr as i, dt as j, mt as k, Sr as l, Pn as m, zr as n, Er as o, Mn as p, Rr as r, Tr as s, Ar as t, yr as u, Nn as v, bt as w, Tt as x, On as y, it as z };
