import { c as e, h as t } from "./useRenderElement.js";
import * as n from "react";
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/useStableCallback.js
var r = n[`useInsertionEffect${Math.random().toFixed(1)}`.slice(0, -3)], i = r && r !== n.useLayoutEffect ? r : (e) => e();
function a(e) {
	let n = t(o).current;
	return n.next = e, i(n.effect), n.trampoline;
}
function o() {
	let e = {
		next: void 0,
		callback: s,
		trampoline: (...t) => e.callback?.(...t),
		effect: () => {
			e.callback = e.next;
		}
	};
	return e;
}
function s() {
	if (process.env.NODE_ENV !== "production") throw Error("Base UI: Cannot call an event handler while rendering.");
}
var c = typeof document < "u" ? n.useLayoutEffect : () => {}, l = "none", ee = "trigger-press", u = "trigger-hover", d = "trigger-focus", f = "outside-press", p = "item-press", m = "close-press", h = "focus-out", g = "escape-key", _ = "list-navigation", v = "cancel-open", y = "sibling-open", b = "disabled", x = "imperative-action", S = "window-resize";
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js
function C(t, n, r, i) {
	let a = !1, o = !1, s = i ?? e;
	return {
		reason: t,
		event: n ?? new Event("base-ui"),
		cancel() {
			a = !0;
		},
		allowPropagation() {
			o = !0;
		},
		get isCanceled() {
			return a;
		},
		get isPropagationAllowed() {
			return o;
		},
		trigger: r,
		...s
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/safeReact.js
var w = { ...n }, T = 0;
function E(e, t = "mui") {
	let [r, i] = n.useState(e), a = e || r;
	return n.useEffect(() => {
		r ?? (T += 1, i(`${t}-${T}`));
	}, [r, t]), a;
}
var D = w.useId;
function O(e, t) {
	if (D !== void 0) {
		let n = D();
		return e ?? (t ? `${t}-${n}` : n);
	}
	return E(e, t);
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function k() {
	return typeof window < "u";
}
function A(e) {
	return N(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function j(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function M(e) {
	return ((N(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function N(e) {
	return k() ? e instanceof Node || e instanceof j(e).Node : !1;
}
function P(e) {
	return k() ? e instanceof Element || e instanceof j(e).Element : !1;
}
function F(e) {
	return k() ? e instanceof HTMLElement || e instanceof j(e).HTMLElement : !1;
}
function I(e) {
	return !k() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof j(e).ShadowRoot;
}
function L(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = J(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function R(e) {
	return /^(table|td|th)$/.test(A(e));
}
function z(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var B = /transform|translate|scale|rotate|perspective|filter/, V = /paint|layout|strict|content/, H = (e) => !!e && e !== "none", U;
function W(e) {
	let t = P(e) ? J(e) : e;
	return H(t.transform) || H(t.translate) || H(t.scale) || H(t.rotate) || H(t.perspective) || !K() && (H(t.backdropFilter) || H(t.filter)) || B.test(t.willChange || "") || V.test(t.contain || "");
}
function G(e) {
	let t = X(e);
	for (; F(t) && !q(t);) {
		if (W(t)) return t;
		if (z(t)) return null;
		t = X(t);
	}
	return null;
}
function K() {
	return U ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), U;
}
function q(e) {
	return /^(html|body|#document)$/.test(A(e));
}
function J(e) {
	return j(e).getComputedStyle(e);
}
function Y(e) {
	return P(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function X(e) {
	if (A(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || I(e) && e.host || M(e);
	return I(t) ? t.host : t;
}
function Z(e) {
	let t = X(e);
	return q(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : F(t) && L(t) ? t : Z(t);
}
function Q(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Z(e), i = r === e.ownerDocument?.body, a = j(r);
	if (i) {
		let e = $(a);
		return t.concat(a, a.visualViewport || [], L(r) ? r : [], e && n ? Q(e) : []);
	} else return t.concat(r, Q(r, [], n));
}
function $(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
export { l as A, m as C, x as D, h as E, ee as F, S as I, c as L, y as M, d as N, p as O, u as P, a as R, v as S, g as T, R as _, A as a, O as b, X as c, P as d, F as f, I as g, L as h, $ as i, f as j, _ as k, j as l, N as m, G as n, Y as o, q as p, M as r, Q as s, J as t, W as u, z as v, b as w, C as x, K as y };
