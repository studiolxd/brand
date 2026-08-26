import { f as e, g as t } from "./floating-ui.utils.dom.js";
import { c as n } from "./event.js";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/constants.js
var r = "data-base-ui-focusable", i = "active", a = "selected", o = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", s = "ArrowLeft", c = "ArrowRight", l = "ArrowUp", u = "ArrowDown";
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js
function d(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot?.activeElement != null;) t = t.shadowRoot.activeElement;
	return t;
}
function f(e, n) {
	if (!e || !n) return !1;
	let r = n.getRootNode?.();
	if (e.contains(n)) return !0;
	if (r && t(r)) {
		let t = n;
		for (; t;) {
			if (e === t) return !0;
			t = t.parentNode || t.host;
		}
	}
	return !1;
}
function p(e) {
	return "composedPath" in e ? e.composedPath()[0] : e.target;
}
function m(e, t) {
	if (t == null) return !1;
	if ("composedPath" in e) return e.composedPath().includes(t);
	let n = e;
	return n.target != null && t.contains(n.target);
}
function h(e) {
	return e.matches("html,body");
}
function g(e) {
	return e?.ownerDocument || document;
}
function _(t) {
	return e(t) && t.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function v(e) {
	return e ? e.getAttribute("role") === "combobox" && _(e) : !1;
}
function y(e) {
	if (!e || n) return !0;
	try {
		return e.matches(":focus-visible");
	} catch {
		return !0;
	}
}
function b(e) {
	return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null;
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var x = [
	"top",
	"right",
	"bottom",
	"left"
], S = Math.min, C = Math.max, w = Math.round, T = Math.floor, E = (e) => ({
	x: e,
	y: e
}), D = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function O(e, t, n) {
	return C(e, S(t, n));
}
function k(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function A(e) {
	return e.split("-")[0];
}
function j(e) {
	return e.split("-")[1];
}
function M(e) {
	return e === "x" ? "y" : "x";
}
function N(e) {
	return e === "y" ? "height" : "width";
}
function P(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function F(e) {
	return M(P(e));
}
function I(e, t, n) {
	n === void 0 && (n = !1);
	let r = j(e), i = F(e), a = N(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = G(o)), [o, G(o)];
}
function L(e) {
	let t = G(e);
	return [
		R(e),
		t,
		R(t)
	];
}
function R(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var z = ["left", "right"], B = ["right", "left"], V = ["top", "bottom"], H = ["bottom", "top"];
function U(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? B : z : t ? z : B;
		case "left":
		case "right": return t ? V : H;
		default: return [];
	}
}
function W(e, t, n, r) {
	let i = j(e), a = U(A(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(R)))), a;
}
function G(e) {
	let t = A(e);
	return D[t] + e.slice(t.length);
}
function K(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function q(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : K(e);
}
function J(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/owner.js
function Y(e) {
	return e?.ownerDocument || document;
}
//#endregion
export { _ as A, f as C, m as D, p as E, c as F, l as I, r as L, i as M, u as N, h as O, s as P, a as R, d as S, b as T, C as _, T as a, w as b, I as c, M as d, W as f, P as g, A as h, k as i, y as j, v as k, N as l, q as m, O as n, j as o, G as p, E as r, F as s, Y as t, L as u, S as v, g as w, x, J as y, o as z };
