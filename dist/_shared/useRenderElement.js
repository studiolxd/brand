import * as e from "react";
import { createElement as t } from "react";
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/useRefWithInit.js
var n = {};
function r(t, r) {
	let i = e.useRef(n);
	return i.current === n && (i.current = t(r)), i;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/formatErrorMessage.js
function i(e, ...t) {
	let n = new URL(`https://base-ui.com/production-error/${e}`);
	return t.forEach((e) => n.searchParams.append("args[]", e)), `Base UI error #${e}; visit ${n} for the full message.`;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/useMergedRefs.js
function a(e, t, n, i) {
	let a = r(s).current;
	return c(a, e, t, n, i) && u(a, [
		e,
		t,
		n,
		i
	]), a.callback;
}
function o(e) {
	let t = r(s).current;
	return l(t, e) && u(t, e), t.callback;
}
function s() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function c(e, t, n, r, i) {
	return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== i;
}
function l(e, t) {
	return e.refs.length !== t.length || e.refs.some((e, n) => e !== t[n]);
}
function u(e, t) {
	if (e.refs = t, t.every((e) => e == null)) {
		e.callback = null;
		return;
	}
	e.callback = (n) => {
		if (e.cleanup &&= (e.cleanup(), null), n != null) {
			let r = Array(t.length).fill(null);
			for (let e = 0; e < t.length; e += 1) {
				let i = t[e];
				if (i != null) switch (typeof i) {
					case "function": {
						let t = i(n);
						typeof t == "function" && (r[e] = t);
						break;
					}
					case "object":
						i.current = n;
						break;
					default:
				}
			}
			e.cleanup = () => {
				for (let e = 0; e < t.length; e += 1) {
					let n = t[e];
					if (n != null) switch (typeof n) {
						case "function": {
							let t = r[e];
							typeof t == "function" ? t() : n(null);
							break;
						}
						case "object":
							n.current = null;
							break;
						default:
					}
				}
			};
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/reactVersion.js
var d = parseInt(e.version, 10);
function f(e) {
	return d >= e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/getReactElementRef.js
function p(t) {
	if (!/* @__PURE__ */ e.isValidElement(t)) return null;
	let n = t, r = n.props;
	return (f(19) ? r?.ref : n.ref) ?? null;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/mergeObjects.js
function m(e, t) {
	if (e && !t) return e;
	if (!e && t) return t;
	if (e || t) return {
		...e,
		...t
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/getStateAttributesProps.js
function h(e, t) {
	let n = {};
	for (let r in e) {
		let i = e[r];
		if (t?.hasOwnProperty(r)) {
			let e = t[r](i);
			e != null && Object.assign(n, e);
			continue;
		}
		i === !0 ? n[`data-${r.toLowerCase()}`] = "" : i && (n[`data-${r.toLowerCase()}`] = i.toString());
	}
	return n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/resolveClassName.js
function g(e, t) {
	return typeof e == "function" ? e(t) : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/resolveStyle.js
function _(e, t) {
	return typeof e == "function" ? e(t) : e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/merge-props/mergeProps.js
var v = {};
function y(e, t, n, r, i) {
	let a = { ...T(e, v) };
	return t && (a = x(a, t)), n && (a = x(a, n)), r && (a = x(a, r)), i && (a = x(a, i)), a;
}
function b(e) {
	if (e.length === 0) return v;
	if (e.length === 1) return T(e[0], v);
	let t = { ...T(e[0], v) };
	for (let n = 1; n < e.length; n += 1) t = x(t, e[n]);
	return t;
}
function x(e, t) {
	return w(t) ? t(e) : S(e, t);
}
function S(e, t) {
	if (!t) return e;
	for (let n in t) {
		let r = t[n];
		switch (n) {
			case "style":
				e[n] = m(e.style, r);
				break;
			case "className":
				e[n] = O(e.className, r);
				break;
			default: C(n, r) ? e[n] = E(e[n], r) : e[n] = r;
		}
	}
	return e;
}
function C(e, t) {
	let n = e.charCodeAt(0), r = e.charCodeAt(1), i = e.charCodeAt(2);
	return n === 111 && r === 110 && i >= 65 && i <= 90 && (typeof t == "function" || t === void 0);
}
function w(e) {
	return typeof e == "function";
}
function T(e, t) {
	return w(e) ? e(t) : e ?? v;
}
function E(e, t) {
	return t ? e ? (n) => {
		if (k(n)) {
			let r = n;
			D(r);
			let i = t(r);
			return r.baseUIHandlerPrevented || e?.(r), i;
		}
		let r = t(n);
		return e?.(n), r;
	} : t : e;
}
function D(e) {
	return e.preventBaseUIHandler = () => {
		e.baseUIHandlerPrevented = !0;
	}, e;
}
function O(e, t) {
	return t ? e ? t + " " + e : t : e;
}
function k(e) {
	return typeof e == "object" && !!e && "nativeEvent" in e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/empty.js
function A() {}
var j = Object.freeze([]), M = Object.freeze({}), N = { style: { transition: "none" } }, P = "data-base-ui-click-trigger", F = { fallbackAxisSide: "none" }, I = { fallbackAxisSide: "end" }, L = {
	clipPath: "inset(50%)",
	position: "fixed",
	top: 0,
	left: 0
};
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js
function R(e, t, n = {}) {
	let r = t.render, i = z(t, n);
	return n.enabled === !1 ? null : B(e, r, i, n.state ?? M);
}
function z(e, t = {}) {
	let { className: n, style: r, render: i } = e, { state: s = M, ref: c, props: l, stateAttributesMapping: u, enabled: d = !0 } = t, f = d ? g(n, s) : void 0, v = d ? _(r, s) : void 0, y = d ? h(s, u) : M, x = d ? m(y, Array.isArray(l) ? b(l) : l) ?? M : M;
	return typeof document < "u" && (d ? Array.isArray(c) ? x.ref = o([
		x.ref,
		p(i),
		...c
	]) : x.ref = a(x.ref, p(i), c) : a(null, null)), d ? (f !== void 0 && (x.className = O(x.className, f)), v !== void 0 && (x.style = m(x.style, v)), x) : M;
}
function B(t, n, r, a) {
	if (n) {
		if (typeof n == "function") return n(r, a);
		let t = y(r, n.props);
		return t.ref = r.ref, /* @__PURE__ */ e.cloneElement(n, t);
	}
	if (t && typeof t == "string") return V(t, r);
	throw Error(process.env.NODE_ENV === "production" ? i(8) : "Base UI: Render element or function are not defined.");
}
function V(n, r) {
	return n === "button" ? /* @__PURE__ */ t("button", {
		type: "button",
		...r,
		key: r.key
	}) : n === "img" ? /* @__PURE__ */ t("img", {
		alt: "",
		...r,
		key: r.key
	}) : /* @__PURE__ */ e.createElement(n, r);
}
//#endregion
export { I as a, M as c, y as d, f, r as h, F as i, A as l, i as m, P as n, L as o, a as p, N as r, j as s, R as t, D as u };
