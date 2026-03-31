import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "react";
import i, { useCallback as a, useEffect as o, useLayoutEffect as s, useMemo as c, useRef as l, useState as u } from "react";
import * as d from "react-dom";
import f from "react-dom";
//#region \0rolldown/runtime.js
var p = Object.create, m = Object.defineProperty, h = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, _ = Object.getPrototypeOf, v = Object.prototype.hasOwnProperty, y = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), b = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = g(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !v.call(e, s) && s !== n && m(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = h(t, s)) || r.enumerable
	});
	return e;
}, x = (e, t, n) => (n = e == null ? {} : p(_(e)), b(t || !e || !e.__esModule ? m(n, "default", {
	value: e,
	enumerable: !0
}) : n, e));
//#endregion
//#region src/stories/atoms/Arrow/Arrow.tsx
function S({ size: e = "md", className: n }) {
	return /* @__PURE__ */ t("svg", {
		className: [
			"arrow",
			e ? `arrow--${e}` : "",
			n ?? ""
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "-0.5 5.5 27 13",
		fill: "none",
		stroke: "currentColor",
		children: /* @__PURE__ */ t("path", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			d: "M0 12 H26 M20 6 L26 12 L20 18"
		})
	});
}
//#endregion
//#region src/stories/atoms/Avatar/Avatar.tsx
function C({ src: e, alt: n, size: r = "md", className: i }) {
	return /* @__PURE__ */ t("img", {
		src: e,
		alt: n,
		className: [
			"avatar",
			`avatar--${r}`,
			i
		].filter(Boolean).join(" ")
	});
}
//#endregion
//#region src/stories/atoms/Button/Button.tsx
function w({ variant: e = "primary", size: n = "md", block: r = !1, children: i, type: a = "button", disabled: o, onClick: s, href: c, external: l = !1 }) {
	let u = [
		"button",
		`button--${e}`,
		n === "md" ? "" : `button--${n}`,
		r ? "button--block" : ""
	].filter(Boolean).join(" ");
	return c === void 0 ? /* @__PURE__ */ t("button", {
		className: u,
		type: a,
		disabled: o,
		onClick: s,
		children: i
	}) : /* @__PURE__ */ t("a", {
		className: u,
		href: o ? void 0 : c,
		"aria-disabled": o ? !0 : void 0,
		onClick: s,
		...l ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: i
	});
}
//#endregion
//#region node_modules/embla-carousel-reactive-utils/esm/embla-carousel-reactive-utils.esm.js
function T(e) {
	return Object.prototype.toString.call(e) === "[object Object]";
}
function E(e) {
	return T(e) || Array.isArray(e);
}
function D() {
	return !!(typeof window < "u" && window.document && window.document.createElement);
}
function O(e, t) {
	let n = Object.keys(e), r = Object.keys(t);
	return n.length !== r.length || JSON.stringify(Object.keys(e.breakpoints || {})) !== JSON.stringify(Object.keys(t.breakpoints || {})) ? !1 : n.every((n) => {
		let r = e[n], i = t[n];
		return typeof r == "function" ? `${r}` == `${i}` : !E(r) || !E(i) ? r === i : O(r, i);
	});
}
function k(e) {
	return e.concat().sort((e, t) => e.name > t.name ? 1 : -1).map((e) => e.options);
}
function A(e, t) {
	if (e.length !== t.length) return !1;
	let n = k(e), r = k(t);
	return n.every((e, t) => {
		let n = r[t];
		return O(e, n);
	});
}
//#endregion
//#region node_modules/embla-carousel/esm/embla-carousel.esm.js
function j(e) {
	return typeof e == "number";
}
function M(e) {
	return typeof e == "string";
}
function N(e) {
	return typeof e == "boolean";
}
function P(e) {
	return Object.prototype.toString.call(e) === "[object Object]";
}
function F(e) {
	return Math.abs(e);
}
function I(e) {
	return Math.sign(e);
}
function L(e, t) {
	return F(e - t);
}
function R(e, t) {
	return e === 0 || t === 0 || F(e) <= F(t) ? 0 : F(L(F(e), F(t)) / e);
}
function ee(e) {
	return Math.round(e * 100) / 100;
}
function z(e) {
	return H(e).map(Number);
}
function B(e) {
	return e[te(e)];
}
function te(e) {
	return Math.max(0, e.length - 1);
}
function ne(e, t) {
	return t === te(e);
}
function V(e, t = 0) {
	return Array.from(Array(e), (e, n) => t + n);
}
function H(e) {
	return Object.keys(e);
}
function re(e, t) {
	return [e, t].reduce((e, t) => (H(t).forEach((n) => {
		let r = e[n], i = t[n];
		e[n] = P(r) && P(i) ? re(r, i) : i;
	}), e), {});
}
function U(e, t) {
	return t.MouseEvent !== void 0 && e instanceof t.MouseEvent;
}
function ie(e, t) {
	let n = {
		start: r,
		center: i,
		end: a
	};
	function r() {
		return 0;
	}
	function i(e) {
		return a(e) / 2;
	}
	function a(e) {
		return t - e;
	}
	function o(r, i) {
		return M(e) ? n[e](r) : e(t, r, i);
	}
	return { measure: o };
}
function ae() {
	let e = [];
	function t(t, n, i, a = { passive: !0 }) {
		let o;
		if ("addEventListener" in t) t.addEventListener(n, i, a), o = () => t.removeEventListener(n, i, a);
		else {
			let e = t;
			e.addListener(i), o = () => e.removeListener(i);
		}
		return e.push(o), r;
	}
	function n() {
		e = e.filter((e) => e());
	}
	let r = {
		add: t,
		clear: n
	};
	return r;
}
function oe(e, t, n, r) {
	let i = ae(), a = 1e3 / 60, o = null, s = 0, c = 0;
	function l() {
		i.add(e, "visibilitychange", () => {
			e.hidden && m();
		});
	}
	function u() {
		p(), i.clear();
	}
	function d(e) {
		if (!c) return;
		o || (o = e, n(), n());
		let i = e - o;
		for (o = e, s += i; s >= a;) n(), s -= a;
		r(s / a), c &&= t.requestAnimationFrame(d);
	}
	function f() {
		c ||= t.requestAnimationFrame(d);
	}
	function p() {
		t.cancelAnimationFrame(c), o = null, s = 0, c = 0;
	}
	function m() {
		o = null, s = 0;
	}
	return {
		init: l,
		destroy: u,
		start: f,
		stop: p,
		update: n,
		render: r
	};
}
function se(e, t) {
	let n = t === "rtl", r = e === "y", i = r ? "y" : "x", a = r ? "x" : "y", o = !r && n ? -1 : 1, s = u(), c = d();
	function l(e) {
		let { height: t, width: n } = e;
		return r ? t : n;
	}
	function u() {
		return r ? "top" : n ? "right" : "left";
	}
	function d() {
		return r ? "bottom" : n ? "left" : "right";
	}
	function f(e) {
		return e * o;
	}
	return {
		scroll: i,
		cross: a,
		startEdge: s,
		endEdge: c,
		measureSize: l,
		direction: f
	};
}
function ce(e = 0, t = 0) {
	let n = F(e - t);
	function r(t) {
		return t < e;
	}
	function i(e) {
		return e > t;
	}
	function a(e) {
		return r(e) || i(e);
	}
	function o(n) {
		return a(n) ? r(n) ? e : t : n;
	}
	function s(e) {
		return n ? e - n * Math.ceil((e - t) / n) : e;
	}
	return {
		length: n,
		max: t,
		min: e,
		constrain: o,
		reachedAny: a,
		reachedMax: i,
		reachedMin: r,
		removeOffset: s
	};
}
function le(e, t, n) {
	let { constrain: r } = ce(0, e), i = e + 1, a = o(t);
	function o(e) {
		return n ? F((i + e) % i) : r(e);
	}
	function s() {
		return a;
	}
	function c(e) {
		return a = o(e), d;
	}
	function l(e) {
		return u().set(s() + e);
	}
	function u() {
		return le(e, s(), n);
	}
	let d = {
		get: s,
		set: c,
		add: l,
		clone: u
	};
	return d;
}
function ue(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v) {
	let { cross: y, direction: b } = e, x = [
		"INPUT",
		"SELECT",
		"TEXTAREA"
	], S = { passive: !1 }, C = ae(), w = ae(), T = ce(50, 225).constrain(p.measure(20)), E = {
		mouse: 300,
		touch: 400
	}, D = {
		mouse: 500,
		touch: 600
	}, O = m ? 43 : 25, k = !1, A = 0, j = 0, M = !1, P = !1, ee = !1, z = !1;
	function B(e) {
		if (!v) return;
		function n(t) {
			(N(v) || v(e, t)) && ie(t);
		}
		let r = t;
		C.add(r, "dragstart", (e) => e.preventDefault(), S).add(r, "touchmove", () => void 0, S).add(r, "touchend", () => void 0).add(r, "touchstart", n).add(r, "mousedown", n).add(r, "touchcancel", se).add(r, "contextmenu", se).add(r, "click", le, !0);
	}
	function te() {
		C.clear(), w.clear();
	}
	function ne() {
		let e = z ? n : t;
		w.add(e, "touchmove", oe, S).add(e, "touchend", se).add(e, "mousemove", oe, S).add(e, "mouseup", se);
	}
	function V(e) {
		let t = e.nodeName || "";
		return x.includes(t);
	}
	function H() {
		return (m ? D : E)[z ? "mouse" : "touch"];
	}
	function re(e, t) {
		let n = d.add(I(e) * -1), r = u.byDistance(e, !m).distance;
		return m || F(e) < T ? r : g && t ? r * .5 : u.byIndex(n.get(), 0).distance;
	}
	function ie(e) {
		let t = U(e, r);
		z = t, ee = m && t && !e.buttons && k, k = L(i.get(), o.get()) >= 2, !(t && e.button !== 0) && (V(e.target) || (M = !0, a.pointerDown(e), l.useFriction(0).useDuration(0), i.set(o), ne(), A = a.readPoint(e), j = a.readPoint(e, y), f.emit("pointerDown")));
	}
	function oe(e) {
		if (!U(e, r) && e.touches.length >= 2) return se(e);
		let t = a.readPoint(e), n = a.readPoint(e, y), o = L(t, A), c = L(n, j);
		if (!P && !z && (!e.cancelable || (P = o > c, !P))) return se(e);
		let u = a.pointerMove(e);
		o > h && (ee = !0), l.useFriction(.3).useDuration(.75), s.start(), i.add(b(u)), e.preventDefault();
	}
	function se(e) {
		let t = u.byDistance(0, !1).index !== d.get(), n = a.pointerUp(e) * H(), r = re(b(n), t), i = R(n, r), o = O - 10 * i, s = _ + i / 50;
		P = !1, M = !1, w.clear(), l.useDuration(o).useFriction(s), c.distance(r, !m), z = !1, f.emit("pointerUp");
	}
	function le(e) {
		ee &&= (e.stopPropagation(), e.preventDefault(), !1);
	}
	function ue() {
		return M;
	}
	return {
		init: B,
		destroy: te,
		pointerDown: ue
	};
}
function de(e, t) {
	let n, r;
	function i(e) {
		return e.timeStamp;
	}
	function a(n, r) {
		let i = `client${(r || e.scroll) === "x" ? "X" : "Y"}`;
		return (U(n, t) ? n : n.touches[0])[i];
	}
	function o(e) {
		return n = e, r = e, a(e);
	}
	function s(e) {
		let t = a(e) - a(r), o = i(e) - i(n) > 170;
		return r = e, o && (n = e), t;
	}
	function c(e) {
		if (!n || !r) return 0;
		let t = a(r) - a(n), o = i(e) - i(n), s = i(e) - i(r) > 170, c = t / o;
		return o && !s && F(c) > .1 ? c : 0;
	}
	return {
		pointerDown: o,
		pointerMove: s,
		pointerUp: c,
		readPoint: a
	};
}
function fe() {
	function e(e) {
		let { offsetTop: t, offsetLeft: n, offsetWidth: r, offsetHeight: i } = e;
		return {
			top: t,
			right: n + r,
			bottom: t + i,
			left: n,
			width: r,
			height: i
		};
	}
	return { measure: e };
}
function pe(e) {
	function t(t) {
		return t / 100 * e;
	}
	return { measure: t };
}
function me(e, t, n, r, i, a, o) {
	let s = [e].concat(r), c, l, u = [], d = !1;
	function f(e) {
		return i.measureSize(o.measure(e));
	}
	function p(i) {
		if (!a) return;
		l = f(e), u = r.map(f);
		function o(n) {
			for (let a of n) {
				if (d) return;
				let n = a.target === e, o = r.indexOf(a.target), s = n ? l : u[o];
				if (F(f(n ? e : r[o]) - s) >= .5) {
					i.reInit(), t.emit("resize");
					break;
				}
			}
		}
		c = new ResizeObserver((e) => {
			(N(a) || a(i, e)) && o(e);
		}), n.requestAnimationFrame(() => {
			s.forEach((e) => c.observe(e));
		});
	}
	function m() {
		d = !0, c && c.disconnect();
	}
	return {
		init: p,
		destroy: m
	};
}
function he(e, t, n, r, i, a) {
	let o = 0, s = 0, c = i, l = a, u = e.get(), d = 0;
	function f() {
		let t = r.get() - e.get(), i = !c, a = 0;
		return i ? (o = 0, n.set(r), e.set(r), a = t) : (n.set(e), o += t / c, o *= l, u += o, e.add(o), a = u - d), s = I(a), d = u, x;
	}
	function p() {
		return F(r.get() - t.get()) < .001;
	}
	function m() {
		return c;
	}
	function h() {
		return s;
	}
	function g() {
		return o;
	}
	function _() {
		return y(i);
	}
	function v() {
		return b(a);
	}
	function y(e) {
		return c = e, x;
	}
	function b(e) {
		return l = e, x;
	}
	let x = {
		direction: h,
		duration: m,
		velocity: g,
		seek: f,
		settled: p,
		useBaseFriction: v,
		useBaseDuration: _,
		useFriction: b,
		useDuration: y
	};
	return x;
}
function ge(e, t, n, r, i) {
	let a = i.measure(10), o = i.measure(50), s = ce(.1, .99), c = !1;
	function l() {
		return !(c || !e.reachedAny(n.get()) || !e.reachedAny(t.get()));
	}
	function u(i) {
		if (!l()) return;
		let c = F(e[e.reachedMin(t.get()) ? "min" : "max"] - t.get()), u = n.get() - t.get(), d = s.constrain(c / o);
		n.subtract(u * d), !i && F(u) < a && (n.set(e.constrain(n.get())), r.useDuration(25).useBaseFriction());
	}
	function d(e) {
		c = !e;
	}
	return {
		shouldConstrain: l,
		constrain: u,
		toggleActive: d
	};
}
function _e(e, t, n, r, i) {
	let a = ce(-t + e, 0), o = d(), s = u(), c = f();
	function l(e, t) {
		return L(e, t) <= 1;
	}
	function u() {
		let e = o[0], t = B(o);
		return ce(o.lastIndexOf(e), o.indexOf(t) + 1);
	}
	function d() {
		return n.map((e, t) => {
			let { min: r, max: i } = a, o = a.constrain(e), s = !t, c = ne(n, t);
			return s ? i : c || l(r, o) ? r : l(i, o) ? i : o;
		}).map((e) => parseFloat(e.toFixed(3)));
	}
	function f() {
		if (t <= e + i) return [a.max];
		if (r === "keepSnaps") return o;
		let { min: n, max: c } = s;
		return o.slice(n, c);
	}
	return {
		snapsContained: c,
		scrollContainLimit: s
	};
}
function ve(e, t, n) {
	let r = t[0];
	return { limit: ce(n ? r - e : B(t), r) };
}
function ye(e, t, n, r) {
	let i = .1, { reachedMin: a, reachedMax: o } = ce(t.min + i, t.max + i);
	function s(e) {
		return e === 1 ? o(n.get()) : e === -1 ? a(n.get()) : !1;
	}
	function c(t) {
		if (!s(t)) return;
		let n = t * -1 * e;
		r.forEach((e) => e.add(n));
	}
	return { loop: c };
}
function be(e) {
	let { max: t, length: n } = e;
	function r(e) {
		let r = e - t;
		return n ? r / -n : 0;
	}
	return { get: r };
}
function xe(e, t, n, r, i) {
	let { startEdge: a, endEdge: o } = e, { groupSlides: s } = i, c = d().map(t.measure), l = f(), u = p();
	function d() {
		return s(r).map((e) => B(e)[o] - e[0][a]).map(F);
	}
	function f() {
		return r.map((e) => n[a] - e[a]).map((e) => -F(e));
	}
	function p() {
		return s(l).map((e) => e[0]).map((e, t) => e + c[t]);
	}
	return {
		snaps: l,
		snapsAligned: u
	};
}
function Se(e, t, n, r, i, a) {
	let { groupSlides: o } = i, { min: s, max: c } = r, l = u();
	function u() {
		let r = o(a), i = !e || t === "keepSnaps";
		return n.length === 1 ? [a] : i ? r : r.slice(s, c).map((e, t, n) => {
			let r = !t, i = ne(n, t);
			return r ? V(B(n[0]) + 1) : i ? V(te(a) - B(n)[0] + 1, B(n)[0]) : e;
		});
	}
	return { slideRegistry: l };
}
function Ce(e, t, n, r, i) {
	let { reachedAny: a, removeOffset: o, constrain: s } = r;
	function c(e) {
		return e.concat().sort((e, t) => F(e) - F(t))[0];
	}
	function l(n) {
		let r = e ? o(n) : s(n), { index: i } = t.map((e, t) => ({
			diff: u(e - r, 0),
			index: t
		})).sort((e, t) => F(e.diff) - F(t.diff))[0];
		return {
			index: i,
			distance: r
		};
	}
	function u(t, r) {
		let i = [
			t,
			t + n,
			t - n
		];
		if (!e) return t;
		if (!r) return c(i);
		let a = i.filter((e) => I(e) === r);
		return a.length ? c(a) : B(i) - n;
	}
	function d(e, n) {
		return {
			index: e,
			distance: u(t[e] - i.get(), n)
		};
	}
	function f(n, r) {
		let o = i.get() + n, { index: s, distance: c } = l(o), d = !e && a(o);
		return !r || d ? {
			index: s,
			distance: n
		} : {
			index: s,
			distance: n + u(t[s] - c, 0)
		};
	}
	return {
		byDistance: f,
		byIndex: d,
		shortcut: u
	};
}
function we(e, t, n, r, i, a, o) {
	function s(i) {
		let s = i.distance, c = i.index !== t.get();
		a.add(s), s && (r.duration() ? e.start() : (e.update(), e.render(1), e.update())), c && (n.set(t.get()), t.set(i.index), o.emit("select"));
	}
	function c(e, t) {
		s(i.byDistance(e, t));
	}
	function l(e, n) {
		let r = t.clone().set(e);
		s(i.byIndex(r.get(), n));
	}
	return {
		distance: c,
		index: l
	};
}
function Te(e, t, n, r, i, a, o, s) {
	let c = {
		passive: !0,
		capture: !0
	}, l = 0;
	function u(u) {
		if (!s) return;
		function f(t) {
			if ((/* @__PURE__ */ new Date()).getTime() - l > 10) return;
			o.emit("slideFocusStart"), e.scrollLeft = 0;
			let a = n.findIndex((e) => e.includes(t));
			j(a) && (i.useDuration(0), r.index(a, 0), o.emit("slideFocus"));
		}
		a.add(document, "keydown", d, !1), t.forEach((e, t) => {
			a.add(e, "focus", (e) => {
				(N(s) || s(u, e)) && f(t);
			}, c);
		});
	}
	function d(e) {
		e.code === "Tab" && (l = (/* @__PURE__ */ new Date()).getTime());
	}
	return { init: u };
}
function Ee(e) {
	let t = e;
	function n() {
		return t;
	}
	function r(e) {
		t = o(e);
	}
	function i(e) {
		t += o(e);
	}
	function a(e) {
		t -= o(e);
	}
	function o(e) {
		return j(e) ? e : e.get();
	}
	return {
		get: n,
		set: r,
		add: i,
		subtract: a
	};
}
function De(e, t) {
	let n = e.scroll === "x" ? o : s, r = t.style, i = null, a = !1;
	function o(e) {
		return `translate3d(${e}px,0px,0px)`;
	}
	function s(e) {
		return `translate3d(0px,${e}px,0px)`;
	}
	function c(t) {
		if (a) return;
		let o = ee(e.direction(t));
		o !== i && (r.transform = n(o), i = o);
	}
	function l(e) {
		a = !e;
	}
	function u() {
		a || (r.transform = "", t.getAttribute("style") || t.removeAttribute("style"));
	}
	return {
		clear: u,
		to: c,
		toggleActive: l
	};
}
function Oe(e, t, n, r, i, a, o, s, c) {
	let l = .5, u = z(i), d = z(i).reverse(), f = _().concat(v());
	function p(e, t) {
		return e.reduce((e, t) => e - i[t], t);
	}
	function m(e, t) {
		return e.reduce((e, n) => p(e, t) > 0 ? e.concat([n]) : e, []);
	}
	function h(e) {
		return a.map((n, i) => ({
			start: n - r[i] + l + e,
			end: n + t - l + e
		}));
	}
	function g(t, r, i) {
		let a = h(r);
		return t.map((t) => {
			let r = i ? 0 : -n, o = i ? n : 0, l = i ? "end" : "start", u = a[t][l];
			return {
				index: t,
				loopPoint: u,
				slideLocation: Ee(-1),
				translate: De(e, c[t]),
				target: () => s.get() > u ? r : o
			};
		});
	}
	function _() {
		let e = o[0];
		return g(m(d, e), n, !1);
	}
	function v() {
		return g(m(u, t - o[0] - 1), -n, !0);
	}
	function y() {
		return f.every(({ index: e }) => p(u.filter((t) => t !== e), t) <= .1);
	}
	function b() {
		f.forEach((e) => {
			let { target: t, translate: n, slideLocation: r } = e, i = t();
			i !== r.get() && (n.to(i), r.set(i));
		});
	}
	function x() {
		f.forEach((e) => e.translate.clear());
	}
	return {
		canLoop: y,
		clear: x,
		loop: b,
		loopPoints: f
	};
}
function ke(e, t, n) {
	let r, i = !1;
	function a(a) {
		if (!n) return;
		function o(e) {
			for (let n of e) if (n.type === "childList") {
				a.reInit(), t.emit("slidesChanged");
				break;
			}
		}
		r = new MutationObserver((e) => {
			i || (N(n) || n(a, e)) && o(e);
		}), r.observe(e, { childList: !0 });
	}
	function o() {
		r && r.disconnect(), i = !0;
	}
	return {
		init: a,
		destroy: o
	};
}
function Ae(e, t, n, r) {
	let i = {}, a = null, o = null, s, c = !1;
	function l() {
		s = new IntersectionObserver((e) => {
			c || (e.forEach((e) => {
				let n = t.indexOf(e.target);
				i[n] = e;
			}), a = null, o = null, n.emit("slidesInView"));
		}, {
			root: e.parentElement,
			threshold: r
		}), t.forEach((e) => s.observe(e));
	}
	function u() {
		s && s.disconnect(), c = !0;
	}
	function d(e) {
		return H(i).reduce((t, n) => {
			let r = parseInt(n), { isIntersecting: a } = i[r];
			return (e && a || !e && !a) && t.push(r), t;
		}, []);
	}
	function f(e = !0) {
		if (e && a) return a;
		if (!e && o) return o;
		let t = d(e);
		return e && (a = t), e || (o = t), t;
	}
	return {
		init: l,
		destroy: u,
		get: f
	};
}
function je(e, t, n, r, i, a) {
	let { measureSize: o, startEdge: s, endEdge: c } = e, l = n[0] && i, u = m(), d = h(), f = n.map(o), p = g();
	function m() {
		if (!l) return 0;
		let e = n[0];
		return F(t[s] - e[s]);
	}
	function h() {
		if (!l) return 0;
		let e = a.getComputedStyle(B(r));
		return parseFloat(e.getPropertyValue(`margin-${c}`));
	}
	function g() {
		return n.map((e, t, n) => {
			let r = !t, i = ne(n, t);
			return r ? f[t] + u : i ? f[t] + d : n[t + 1][s] - e[s];
		}).map(F);
	}
	return {
		slideSizes: f,
		slideSizesWithGaps: p,
		startGap: u,
		endGap: d
	};
}
function Me(e, t, n, r, i, a, o, s, c) {
	let { startEdge: l, endEdge: u, direction: d } = e, f = j(n);
	function p(e, t) {
		return z(e).filter((e) => e % t === 0).map((n) => e.slice(n, n + t));
	}
	function m(e) {
		return e.length ? z(e).reduce((n, f, p) => {
			let m = B(n) || 0, h = m === 0, g = f === te(e), _ = i[l] - a[m][l], v = i[l] - a[f][u], y = !r && h ? d(o) : 0, b = F(v - (!r && g ? d(s) : 0) - (_ + y));
			return p && b > t + c && n.push(f), g && n.push(e.length), n;
		}, []).map((t, n, r) => {
			let i = Math.max(r[n - 1] || 0);
			return e.slice(i, t);
		}) : [];
	}
	function h(e) {
		return f ? p(e, n) : m(e);
	}
	return { groupSlides: h };
}
function Ne(e, t, n, r, i, a, o) {
	let { align: s, axis: c, direction: l, startIndex: u, loop: d, duration: f, dragFree: p, dragThreshold: m, inViewThreshold: h, slidesToScroll: g, skipSnaps: _, containScroll: v, watchResize: y, watchSlides: b, watchDrag: x, watchFocus: S } = a, C = fe(), w = C.measure(t), T = n.map(C.measure), E = se(c, l), D = E.measureSize(w), O = pe(D), k = ie(s, D), A = !d && !!v, { slideSizes: j, slideSizesWithGaps: M, startGap: N, endGap: P } = je(E, w, T, n, d || !!v, i), F = Me(E, D, g, d, w, T, N, P, 2), { snaps: I, snapsAligned: L } = xe(E, k, w, T, F), R = -B(I) + B(M), { snapsContained: ee, scrollContainLimit: ne } = _e(D, R, L, v, 2), V = A ? ee : L, { limit: H } = ve(R, V, d), re = le(te(V), u, d), U = re.clone(), ce = z(n), Ne = ({ dragHandler: e, scrollBody: t, scrollBounds: n, options: { loop: r } }) => {
		r || n.constrain(e.pointerDown()), t.seek();
	}, Pe = ({ scrollBody: e, translate: t, location: n, offsetLocation: r, previousLocation: i, scrollLooper: a, slideLooper: o, dragHandler: s, animation: c, eventHandler: l, scrollBounds: u, options: { loop: d } }, f) => {
		let p = e.settled(), m = !u.shouldConstrain(), h = d ? p : p && m, g = h && !s.pointerDown();
		g && c.stop();
		let _ = n.get() * f + i.get() * (1 - f);
		r.set(_), d && (a.loop(e.direction()), o.loop()), t.to(r.get()), g && l.emit("settle"), h || l.emit("scroll");
	}, Fe = oe(r, i, () => Ne(qe), (e) => Pe(qe, e)), Ie = .68, Le = V[re.get()], Re = Ee(Le), ze = Ee(Le), Be = Ee(Le), Ve = Ee(Le), He = he(Re, Be, ze, Ve, f, Ie), Ue = Ce(d, V, R, H, Ve), We = we(Fe, re, U, He, Ue, Ve, o), W = be(H), Ge = ae(), Ke = Ae(t, n, o, h), { slideRegistry: G } = Se(A, v, V, ne, F, ce), K = Te(e, n, G, We, He, Ge, o, S), qe = {
		ownerDocument: r,
		ownerWindow: i,
		eventHandler: o,
		containerRect: w,
		slideRects: T,
		animation: Fe,
		axis: E,
		dragHandler: ue(E, e, r, i, Ve, de(E, i), Re, Fe, We, He, Ue, re, o, O, p, m, _, Ie, x),
		eventStore: Ge,
		percentOfView: O,
		index: re,
		indexPrevious: U,
		limit: H,
		location: Re,
		offsetLocation: Be,
		previousLocation: ze,
		options: a,
		resizeHandler: me(t, o, i, n, E, y, C),
		scrollBody: He,
		scrollBounds: ge(H, Be, Ve, He, O),
		scrollLooper: ye(R, H, Be, [
			Re,
			Be,
			ze,
			Ve
		]),
		scrollProgress: W,
		scrollSnapList: V.map(W.get),
		scrollSnaps: V,
		scrollTarget: Ue,
		scrollTo: We,
		slideLooper: Oe(E, D, R, j, M, I, V, Be, n),
		slideFocus: K,
		slidesHandler: ke(t, o, b),
		slidesInView: Ke,
		slideIndexes: ce,
		slideRegistry: G,
		slidesToScroll: F,
		target: Ve,
		translate: De(E, t)
	};
	return qe;
}
function Pe() {
	let e = {}, t;
	function n(e) {
		t = e;
	}
	function r(t) {
		return e[t] || [];
	}
	function i(e) {
		return r(e).forEach((n) => n(t, e)), c;
	}
	function a(t, n) {
		return e[t] = r(t).concat([n]), c;
	}
	function o(t, n) {
		return e[t] = r(t).filter((e) => e !== n), c;
	}
	function s() {
		e = {};
	}
	let c = {
		init: n,
		emit: i,
		off: o,
		on: a,
		clear: s
	};
	return c;
}
var Fe = {
	align: "center",
	axis: "x",
	container: null,
	slides: null,
	containScroll: "trimSnaps",
	direction: "ltr",
	slidesToScroll: 1,
	inViewThreshold: 0,
	breakpoints: {},
	dragFree: !1,
	dragThreshold: 10,
	loop: !1,
	skipSnaps: !1,
	duration: 25,
	startIndex: 0,
	active: !0,
	watchDrag: !0,
	watchResize: !0,
	watchSlides: !0,
	watchFocus: !0
};
function Ie(e) {
	function t(e, t) {
		return re(e, t || {});
	}
	function n(n) {
		let r = n.breakpoints || {};
		return t(n, H(r).filter((t) => e.matchMedia(t).matches).map((e) => r[e]).reduce((e, n) => t(e, n), {}));
	}
	function r(t) {
		return t.map((e) => H(e.breakpoints || {})).reduce((e, t) => e.concat(t), []).map(e.matchMedia);
	}
	return {
		mergeOptions: t,
		optionsAtMedia: n,
		optionsMediaQueries: r
	};
}
function Le(e) {
	let t = [];
	function n(n, r) {
		return t = r.filter(({ options: t }) => e.optionsAtMedia(t).active !== !1), t.forEach((t) => t.init(n, e)), r.reduce((e, t) => Object.assign(e, { [t.name]: t }), {});
	}
	function r() {
		t = t.filter((e) => e.destroy());
	}
	return {
		init: n,
		destroy: r
	};
}
function Re(e, t, n) {
	let r = e.ownerDocument, i = r.defaultView, a = Ie(i), o = Le(a), s = ae(), c = Pe(), { mergeOptions: l, optionsAtMedia: u, optionsMediaQueries: d } = a, { on: f, off: p, emit: m } = c, h = D, g = !1, _, v = l(Fe, Re.globalOptions), y = l(v), b = [], x, S, C;
	function w() {
		let { container: t, slides: n } = y;
		S = (M(t) ? e.querySelector(t) : t) || e.children[0];
		let r = M(n) ? S.querySelectorAll(n) : n;
		C = [].slice.call(r || S.children);
	}
	function T(t) {
		let n = Ne(e, S, C, r, i, t, c);
		return t.loop && !n.slideLooper.canLoop() ? T(Object.assign({}, t, { loop: !1 })) : n;
	}
	function E(e, t) {
		g || (v = l(v, e), y = u(v), b = t || b, w(), _ = T(y), d([v, ...b.map(({ options: e }) => e)]).forEach((e) => s.add(e, "change", D)), y.active && (_.translate.to(_.location.get()), _.animation.init(), _.slidesInView.init(), _.slideFocus.init(U), _.eventHandler.init(U), _.resizeHandler.init(U), _.slidesHandler.init(U), _.options.loop && _.slideLooper.loop(), S.offsetParent && C.length && _.dragHandler.init(U), x = o.init(U, b)));
	}
	function D(e, t) {
		let n = R();
		O(), E(l({ startIndex: n }, e), t), c.emit("reInit");
	}
	function O() {
		_.dragHandler.destroy(), _.eventStore.clear(), _.translate.clear(), _.slideLooper.clear(), _.resizeHandler.destroy(), _.slidesHandler.destroy(), _.slidesInView.destroy(), _.animation.destroy(), o.destroy(), s.clear();
	}
	function k() {
		g || (g = !0, s.clear(), O(), c.emit("destroy"), c.clear());
	}
	function A(e, t, n) {
		!y.active || g || (_.scrollBody.useBaseFriction().useDuration(t === !0 ? 0 : y.duration), _.scrollTo.index(e, n || 0));
	}
	function j(e) {
		A(_.index.add(1).get(), e, -1);
	}
	function N(e) {
		A(_.index.add(-1).get(), e, 1);
	}
	function P() {
		return _.index.add(1).get() !== R();
	}
	function F() {
		return _.index.add(-1).get() !== R();
	}
	function I() {
		return _.scrollSnapList;
	}
	function L() {
		return _.scrollProgress.get(_.offsetLocation.get());
	}
	function R() {
		return _.index.get();
	}
	function ee() {
		return _.indexPrevious.get();
	}
	function z() {
		return _.slidesInView.get();
	}
	function B() {
		return _.slidesInView.get(!1);
	}
	function te() {
		return x;
	}
	function ne() {
		return _;
	}
	function V() {
		return e;
	}
	function H() {
		return S;
	}
	function re() {
		return C;
	}
	let U = {
		canScrollNext: P,
		canScrollPrev: F,
		containerNode: H,
		internalEngine: ne,
		destroy: k,
		off: p,
		on: f,
		emit: m,
		plugins: te,
		previousScrollSnap: ee,
		reInit: h,
		rootNode: V,
		scrollNext: j,
		scrollPrev: N,
		scrollProgress: L,
		scrollSnapList: I,
		scrollTo: A,
		selectedScrollSnap: R,
		slideNodes: re,
		slidesInView: z,
		slidesNotInView: B
	};
	return E(t, n), setTimeout(() => c.emit("init"), 0), U;
}
Re.globalOptions = void 0;
//#endregion
//#region node_modules/embla-carousel-react/esm/embla-carousel-react.esm.js
function ze(e = {}, t = []) {
	let n = l(e), r = l(t), [i, s] = u(), [c, d] = u(), f = a(() => {
		i && i.reInit(n.current, r.current);
	}, [i]);
	return o(() => {
		O(n.current, e) || (n.current = e, f());
	}, [e, f]), o(() => {
		A(r.current, t) || (r.current = t, f());
	}, [t, f]), o(() => {
		if (D() && c) {
			Re.globalOptions = ze.globalOptions;
			let e = Re(c, n.current, r.current);
			return s(e), () => e.destroy();
		} else s(void 0);
	}, [c, s]), [d, i];
}
ze.globalOptions = void 0;
//#endregion
//#region src/stories/atoms/Chevron/Chevron.tsx
function Be({ size: e, className: n }) {
	return /* @__PURE__ */ t("svg", {
		className: [
			"chevron",
			e ? `chevron--${e}` : "",
			n ?? ""
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 4 12 16",
		fill: "none",
		stroke: "currentColor",
		children: /* @__PURE__ */ t("path", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			d: "M2 6 L8 12 L2 18"
		})
	});
}
//#endregion
//#region src/stories/atoms/Carousel/Carousel.tsx
function Ve({ children: e, options: r, plugins: i, hideButtons: a, className: o, slideSize: s, gradientColor: c }) {
	let [l, u] = ze({
		loop: !0,
		...r
	}, i), d = {
		...s ? { "--carousel-slide-size": s } : {},
		...c ? { "--carousel-gradient-color": c } : {}
	};
	return /* @__PURE__ */ n("div", {
		className: ["carousel", o].filter(Boolean).join(" "),
		style: d,
		children: [
			!a && /* @__PURE__ */ t("button", {
				className: "carousel__btn carousel__btn--prev",
				onClick: () => u?.scrollPrev(),
				"aria-label": "Anterior",
				type: "button",
				children: /* @__PURE__ */ t(Be, {
					className: "carousel__chevron carousel__chevron--prev",
					size: "lg"
				})
			}),
			/* @__PURE__ */ t("div", {
				className: "carousel__viewport",
				ref: l,
				children: /* @__PURE__ */ t("div", {
					className: "carousel__track",
					children: e
				})
			}),
			!a && /* @__PURE__ */ t("button", {
				className: "carousel__btn carousel__btn--next",
				onClick: () => u?.scrollNext(),
				"aria-label": "Siguiente",
				type: "button",
				children: /* @__PURE__ */ t(Be, {
					className: "carousel__chevron",
					size: "lg"
				})
			})
		]
	});
}
function He({ children: e, className: n }) {
	return /* @__PURE__ */ t("div", {
		className: ["carousel__slide", n].filter(Boolean).join(" "),
		children: e
	});
}
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function Ue(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function We(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Ue(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Ue(e[t], null);
			}
		};
	};
}
function W(...e) {
	return r.useCallback(We(...e), e);
}
//#endregion
//#region node_modules/@radix-ui/react-context/dist/index.mjs
function Ge(e, n = []) {
	let i = [];
	function a(n, a) {
		let o = r.createContext(a), s = i.length;
		i = [...i, a];
		let c = (n) => {
			let { scope: i, children: a, ...c } = n, l = i?.[e]?.[s] || o, u = r.useMemo(() => c, Object.values(c));
			return /* @__PURE__ */ t(l.Provider, {
				value: u,
				children: a
			});
		};
		c.displayName = n + "Provider";
		function l(t, i) {
			let c = i?.[e]?.[s] || o, l = r.useContext(c);
			if (l) return l;
			if (a !== void 0) return a;
			throw Error(`\`${t}\` must be used within \`${n}\``);
		}
		return [c, l];
	}
	let o = () => {
		let t = i.map((e) => r.createContext(e));
		return function(n) {
			let i = n?.[e] || t;
			return r.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: i
			} }), [n, i]);
		};
	};
	return o.scopeName = e, [a, Ke(o, ...n)];
}
function Ke(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = () => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let i = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return r.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
		};
	};
	return n.scopeName = t.scopeName, n;
}
typeof window < "u" && window.document && window.document.createElement;
function G(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var K = globalThis?.document ? r.useLayoutEffect : () => {}, qe = r.useInsertionEffect || K;
function Je({ prop: e, defaultProp: t, onChange: n = () => {}, caller: i }) {
	let [a, o, s] = Ye({
		defaultProp: t,
		onChange: n
	}), c = e !== void 0, l = c ? e : a;
	{
		let t = r.useRef(e !== void 0);
		r.useEffect(() => {
			let e = t.current;
			e !== c && console.warn(`${i} is changing from ${e ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), t.current = c;
		}, [c, i]);
	}
	return [l, r.useCallback((t) => {
		if (c) {
			let n = Xe(t) ? t(e) : t;
			n !== e && s.current?.(n);
		} else o(t);
	}, [
		c,
		e,
		o,
		s
	])];
}
function Ye({ defaultProp: e, onChange: t }) {
	let [n, i] = r.useState(e), a = r.useRef(n), o = r.useRef(t);
	return qe(() => {
		o.current = t;
	}, [t]), r.useEffect(() => {
		a.current !== n && (o.current?.(n), a.current = n);
	}, [n, a]), [
		n,
		i,
		o
	];
}
function Xe(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/@radix-ui/react-use-previous/dist/index.mjs
function Ze(e) {
	let t = r.useRef({
		value: e,
		previous: e
	});
	return r.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
function Qe(e) {
	let [t, n] = r.useState(void 0);
	return K(() => {
		if (e) {
			n({
				width: e.offsetWidth,
				height: e.offsetHeight
			});
			let t = new ResizeObserver((t) => {
				if (!Array.isArray(t) || !t.length) return;
				let r = t[0], i, a;
				if ("borderBoxSize" in r) {
					let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = e.offsetWidth, a = e.offsetHeight;
				n({
					width: i,
					height: a
				});
			});
			return t.observe(e, { box: "border-box" }), () => t.unobserve(e);
		} else n(void 0);
	}, [e]), t;
}
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
function $e(e, t) {
	return r.useReducer((e, n) => t[e][n] ?? e, e);
}
var et = (e) => {
	let { present: t, children: n } = e, i = tt(t), a = typeof n == "function" ? n({ present: i.isPresent }) : r.Children.only(n), o = W(i.ref, rt(a));
	return typeof n == "function" || i.isPresent ? r.cloneElement(a, { ref: o }) : null;
};
et.displayName = "Presence";
function tt(e) {
	let [t, n] = r.useState(), i = r.useRef(null), a = r.useRef(e), o = r.useRef("none"), [s, c] = $e(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return r.useEffect(() => {
		let e = nt(i.current);
		o.current = s === "mounted" ? e : "none";
	}, [s]), K(() => {
		let t = i.current, n = a.current;
		if (n !== e) {
			let r = o.current, i = nt(t);
			e ? c("MOUNT") : i === "none" || t?.display === "none" ? c("UNMOUNT") : c(n && r !== i ? "ANIMATION_OUT" : "UNMOUNT"), a.current = e;
		}
	}, [e, c]), K(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, r = (r) => {
				let o = nt(i.current).includes(CSS.escape(r.animationName));
				if (r.target === t && o && (c("ANIMATION_END"), !a.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, s = (e) => {
				e.target === t && (o.current = nt(i.current));
			};
			return t.addEventListener("animationstart", s), t.addEventListener("animationcancel", r), t.addEventListener("animationend", r), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", s), t.removeEventListener("animationcancel", r), t.removeEventListener("animationend", r);
			};
		} else c("ANIMATION_END");
	}, [t, c]), {
		isPresent: ["mounted", "unmountSuspended"].includes(s),
		ref: r.useCallback((e) => {
			i.current = e ? getComputedStyle(e) : null, n(e);
		}, [])
	};
}
function nt(e) {
	return e?.animationName || "none";
}
function rt(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function it(e) {
	let n = /* @__PURE__ */ at(e), i = r.forwardRef((e, i) => {
		let { children: a, ...o } = e, s = r.Children.toArray(a), c = s.find(st);
		if (c) {
			let e = c.props.children, a = s.map((t) => t === c ? r.Children.count(e) > 1 ? r.Children.only(null) : r.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ t(n, {
				...o,
				ref: i,
				children: r.isValidElement(e) ? r.cloneElement(e, void 0, a) : null
			});
		}
		return /* @__PURE__ */ t(n, {
			...o,
			ref: i,
			children: a
		});
	});
	return i.displayName = `${e}.Slot`, i;
}
/* @__NO_SIDE_EFFECTS__ */
function at(e) {
	let t = r.forwardRef((e, t) => {
		let { children: n, ...i } = e;
		if (r.isValidElement(n)) {
			let e = lt(n), a = ct(i, n.props);
			return n.type !== r.Fragment && (a.ref = t ? We(t, e) : e), r.cloneElement(n, a);
		}
		return r.Children.count(n) > 1 ? r.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var ot = Symbol("radix.slottable");
function st(e) {
	return r.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ot;
}
function ct(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function lt(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-primitive/dist/index.mjs
var q = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, n) => {
	let i = /* @__PURE__ */ it(`Primitive.${n}`), a = r.forwardRef((e, r) => {
		let { asChild: a, ...o } = e, s = a ? i : n;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ t(s, {
			...o,
			ref: r
		});
	});
	return a.displayName = `Primitive.${n}`, {
		...e,
		[n]: a
	};
}, {});
function ut(e, t) {
	e && d.flushSync(() => e.dispatchEvent(t));
}
//#endregion
//#region node_modules/@radix-ui/react-checkbox/dist/index.mjs
var dt = "Checkbox", [ft, pt] = Ge(dt), [mt, ht] = ft(dt);
function gt(e) {
	let { __scopeCheckbox: n, checked: i, children: a, defaultChecked: o, disabled: s, form: c, name: l, onCheckedChange: u, required: d, value: f = "on", internal_do_not_use_render: p } = e, [m, h] = Je({
		prop: i,
		defaultProp: o ?? !1,
		onChange: u,
		caller: dt
	}), [g, _] = r.useState(null), [v, y] = r.useState(null), b = r.useRef(!1), x = g ? !!c || !!g.closest("form") : !0, S = {
		checked: m,
		disabled: s,
		setChecked: h,
		control: g,
		setControl: _,
		name: l,
		form: c,
		value: f,
		hasConsumerStoppedPropagationRef: b,
		required: d,
		defaultChecked: Tt(o) ? !1 : o,
		isFormControl: x,
		bubbleInput: v,
		setBubbleInput: y
	};
	return /* @__PURE__ */ t(mt, {
		scope: n,
		...S,
		children: wt(p) ? p(S) : a
	});
}
var _t = "CheckboxTrigger", vt = r.forwardRef(({ __scopeCheckbox: e, onKeyDown: n, onClick: i, ...a }, o) => {
	let { control: s, value: c, disabled: l, checked: u, required: d, setControl: f, setChecked: p, hasConsumerStoppedPropagationRef: m, isFormControl: h, bubbleInput: g } = ht(_t, e), _ = W(o, f), v = r.useRef(u);
	return r.useEffect(() => {
		let e = s?.form;
		if (e) {
			let t = () => p(v.current);
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [s, p]), /* @__PURE__ */ t(q.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": Tt(u) ? "mixed" : u,
		"aria-required": d,
		"data-state": Et(u),
		"data-disabled": l ? "" : void 0,
		disabled: l,
		value: c,
		...a,
		ref: _,
		onKeyDown: G(n, (e) => {
			e.key === "Enter" && e.preventDefault();
		}),
		onClick: G(i, (e) => {
			p((e) => Tt(e) ? !0 : !e), g && h && (m.current = e.isPropagationStopped(), m.current || e.stopPropagation());
		})
	});
});
vt.displayName = _t;
var yt = r.forwardRef((r, i) => {
	let { __scopeCheckbox: a, name: o, checked: s, defaultChecked: c, required: l, disabled: u, value: d, onCheckedChange: f, form: p, ...m } = r;
	return /* @__PURE__ */ t(gt, {
		__scopeCheckbox: a,
		checked: s,
		defaultChecked: c,
		disabled: u,
		required: l,
		onCheckedChange: f,
		name: o,
		form: p,
		value: d,
		internal_do_not_use_render: ({ isFormControl: r }) => /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t(vt, {
			...m,
			ref: i,
			__scopeCheckbox: a
		}), r && /* @__PURE__ */ t(Ct, { __scopeCheckbox: a })] })
	});
});
yt.displayName = dt;
var bt = "CheckboxIndicator", xt = r.forwardRef((e, n) => {
	let { __scopeCheckbox: r, forceMount: i, ...a } = e, o = ht(bt, r);
	return /* @__PURE__ */ t(et, {
		present: i || Tt(o.checked) || o.checked === !0,
		children: /* @__PURE__ */ t(q.span, {
			"data-state": Et(o.checked),
			"data-disabled": o.disabled ? "" : void 0,
			...a,
			ref: n,
			style: {
				pointerEvents: "none",
				...e.style
			}
		})
	});
});
xt.displayName = bt;
var St = "CheckboxBubbleInput", Ct = r.forwardRef(({ __scopeCheckbox: e, ...n }, i) => {
	let { control: a, hasConsumerStoppedPropagationRef: o, checked: s, defaultChecked: c, required: l, disabled: u, name: d, value: f, form: p, bubbleInput: m, setBubbleInput: h } = ht(St, e), g = W(i, h), _ = Ze(s), v = Qe(a);
	r.useEffect(() => {
		let e = m;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set, r = !o.current;
		if (_ !== s && n) {
			let t = new Event("click", { bubbles: r });
			e.indeterminate = Tt(s), n.call(e, Tt(s) ? !1 : s), e.dispatchEvent(t);
		}
	}, [
		m,
		_,
		s,
		o
	]);
	let y = r.useRef(Tt(s) ? !1 : s);
	return /* @__PURE__ */ t(q.input, {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: c ?? y.current,
		required: l,
		disabled: u,
		name: d,
		value: f,
		form: p,
		...n,
		tabIndex: -1,
		ref: g,
		style: {
			...n.style,
			...v,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
});
Ct.displayName = St;
function wt(e) {
	return typeof e == "function";
}
function Tt(e) {
	return e === "indeterminate";
}
function Et(e) {
	return Tt(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region src/stories/atoms/Checkbox/Checkbox.tsx
function Dt({ checked: e, defaultChecked: n, disabled: r, id: i, name: a, value: o, required: s, "aria-label": c, "aria-labelledby": l, onCheckedChange: u }) {
	return /* @__PURE__ */ t(yt, {
		className: "checkbox",
		checked: e,
		defaultChecked: n,
		disabled: r,
		id: i,
		name: a,
		value: o,
		required: s,
		"aria-label": c,
		"aria-labelledby": l,
		onCheckedChange: u,
		children: /* @__PURE__ */ t(xt, { className: "checkbox__indicator" })
	});
}
//#endregion
//#region src/stories/atoms/Hamburger/Hamburger.tsx
function Ot({ isOpen: e = !1, onClick: r, label: i = "Menu" }) {
	return /* @__PURE__ */ n("button", {
		type: "button",
		className: "hamburger",
		"aria-label": i,
		"aria-expanded": e,
		onClick: r,
		children: [
			/* @__PURE__ */ t("span", {
				className: "hamburger__bar",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ t("span", {
				className: "hamburger__bar",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ t("span", {
				className: "hamburger__bar",
				"aria-hidden": "true"
			})
		]
	});
}
//#endregion
//#region src/stories/atoms/Heading/Heading.tsx
function J({ level: e = 2, weight: n, size: r, className: i, children: a }) {
	return /* @__PURE__ */ t(`h${e}`, {
		className: [
			"heading",
			`heading--${e}`,
			n && `heading--${n}`,
			r && `heading--size-${r}`,
			i
		].filter(Boolean).join(" "),
		children: a
	});
}
//#endregion
//#region src/stories/atoms/Input/Input.tsx
function kt({ type: e = "text", placeholder: n, value: r, defaultValue: i, disabled: a, readOnly: o, size: s = "md", error: c = !1, id: l, name: u, describedBy: d, onChange: f, onBlur: p, onFocus: m }) {
	return /* @__PURE__ */ t("input", {
		className: [
			"input",
			s === "md" ? "" : `input--${s}`,
			c ? "input--error" : ""
		].filter(Boolean).join(" "),
		type: e,
		placeholder: n,
		value: r,
		defaultValue: i,
		disabled: a,
		readOnly: o,
		id: l,
		name: u,
		"aria-invalid": c || void 0,
		"aria-describedby": d,
		onChange: f,
		onBlur: p,
		onFocus: m
	});
}
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
function At(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region node_modules/@radix-ui/react-collection/dist/index.mjs
function jt(e) {
	let n = e + "CollectionProvider", [r, a] = Ge(n), [o, s] = r(n, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), c = (e) => {
		let { scope: n, children: r } = e, a = i.useRef(null), s = i.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ t(o, {
			scope: n,
			itemMap: s,
			collectionRef: a,
			children: r
		});
	};
	c.displayName = n;
	let l = e + "CollectionSlot", u = /* @__PURE__ */ it(l), d = i.forwardRef((e, n) => {
		let { scope: r, children: i } = e;
		return /* @__PURE__ */ t(u, {
			ref: W(n, s(l, r).collectionRef),
			children: i
		});
	});
	d.displayName = l;
	let f = e + "CollectionItemSlot", p = "data-radix-collection-item", m = /* @__PURE__ */ it(f), h = i.forwardRef((e, n) => {
		let { scope: r, children: a, ...o } = e, c = i.useRef(null), l = W(n, c), u = s(f, r);
		return i.useEffect(() => (u.itemMap.set(c, {
			ref: c,
			...o
		}), () => void u.itemMap.delete(c))), /* @__PURE__ */ t(m, {
			[p]: "",
			ref: l,
			children: a
		});
	});
	h.displayName = f;
	function g(t) {
		let n = s(e + "CollectionConsumer", t);
		return i.useCallback(() => {
			let e = n.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${p}]`));
			return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [n.collectionRef, n.itemMap]);
	}
	return [
		{
			Provider: c,
			Slot: d,
			ItemSlot: h
		},
		g,
		a
	];
}
//#endregion
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var Mt = r.createContext(void 0);
function Nt(e) {
	let t = r.useContext(Mt);
	return e || t || "ltr";
}
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function Pt(e) {
	let t = r.useRef(e);
	return r.useEffect(() => {
		t.current = e;
	}), r.useMemo(() => (...e) => t.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function Ft(e, t = globalThis?.document) {
	let n = Pt(e);
	r.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && n(e);
		};
		return t.addEventListener("keydown", e, { capture: !0 }), () => t.removeEventListener("keydown", e, { capture: !0 });
	}, [n, t]);
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var It = "DismissableLayer", Lt = "dismissableLayer.update", Rt = "dismissableLayer.pointerDownOutside", zt = "dismissableLayer.focusOutside", Bt, Vt = r.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
}), Ht = r.forwardRef((e, n) => {
	let { disableOutsidePointerEvents: i = !1, onEscapeKeyDown: a, onPointerDownOutside: o, onFocusOutside: s, onInteractOutside: c, onDismiss: l, ...u } = e, d = r.useContext(Vt), [f, p] = r.useState(null), m = f?.ownerDocument ?? globalThis?.document, [, h] = r.useState({}), g = W(n, (e) => p(e)), _ = Array.from(d.layers), [v] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), y = _.indexOf(v), b = f ? _.indexOf(f) : -1, x = d.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= y, C = Gt((e) => {
		let t = e.target, n = [...d.branches].some((e) => e.contains(t));
		!S || n || (o?.(e), c?.(e), e.defaultPrevented || l?.());
	}, m), w = Kt((e) => {
		let t = e.target;
		[...d.branches].some((e) => e.contains(t)) || (s?.(e), c?.(e), e.defaultPrevented || l?.());
	}, m);
	return Ft((e) => {
		b === d.layers.size - 1 && (a?.(e), !e.defaultPrevented && l && (e.preventDefault(), l()));
	}, m), r.useEffect(() => {
		if (f) return i && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (Bt = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), qt(), () => {
			i && d.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = Bt);
		};
	}, [
		f,
		m,
		i,
		d
	]), r.useEffect(() => () => {
		f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), qt());
	}, [f, d]), r.useEffect(() => {
		let e = () => h({});
		return document.addEventListener(Lt, e), () => document.removeEventListener(Lt, e);
	}, []), /* @__PURE__ */ t(q.div, {
		...u,
		ref: g,
		style: {
			pointerEvents: x ? S ? "auto" : "none" : void 0,
			...e.style
		},
		onFocusCapture: G(e.onFocusCapture, w.onFocusCapture),
		onBlurCapture: G(e.onBlurCapture, w.onBlurCapture),
		onPointerDownCapture: G(e.onPointerDownCapture, C.onPointerDownCapture)
	});
});
Ht.displayName = It;
var Ut = "DismissableLayerBranch", Wt = r.forwardRef((e, n) => {
	let i = r.useContext(Vt), a = r.useRef(null), o = W(n, a);
	return r.useEffect(() => {
		let e = a.current;
		if (e) return i.branches.add(e), () => {
			i.branches.delete(e);
		};
	}, [i.branches]), /* @__PURE__ */ t(q.div, {
		...e,
		ref: o
	});
});
Wt.displayName = Ut;
function Gt(e, t = globalThis?.document) {
	let n = Pt(e), i = r.useRef(!1), a = r.useRef(() => {});
	return r.useEffect(() => {
		let e = (e) => {
			if (e.target && !i.current) {
				let r = function() {
					Jt(Rt, n, i, { discrete: !0 });
				}, i = { originalEvent: e };
				e.pointerType === "touch" ? (t.removeEventListener("click", a.current), a.current = r, t.addEventListener("click", a.current, { once: !0 })) : r();
			} else t.removeEventListener("click", a.current);
			i.current = !1;
		}, r = window.setTimeout(() => {
			t.addEventListener("pointerdown", e);
		}, 0);
		return () => {
			window.clearTimeout(r), t.removeEventListener("pointerdown", e), t.removeEventListener("click", a.current);
		};
	}, [t, n]), { onPointerDownCapture: () => i.current = !0 };
}
function Kt(e, t = globalThis?.document) {
	let n = Pt(e), i = r.useRef(!1);
	return r.useEffect(() => {
		let e = (e) => {
			e.target && !i.current && Jt(zt, n, { originalEvent: e }, { discrete: !1 });
		};
		return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e);
	}, [t, n]), {
		onFocusCapture: () => i.current = !0,
		onBlurCapture: () => i.current = !1
	};
}
function qt() {
	let e = new CustomEvent(Lt);
	document.dispatchEvent(e);
}
function Jt(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? ut(i, a) : i.dispatchEvent(a);
}
//#endregion
//#region node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var Yt = 0;
function Xt() {
	r.useEffect(() => {
		let e = document.querySelectorAll("[data-radix-focus-guard]");
		return document.body.insertAdjacentElement("afterbegin", e[0] ?? Zt()), document.body.insertAdjacentElement("beforeend", e[1] ?? Zt()), Yt++, () => {
			Yt === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), Yt--;
		};
	}, []);
}
function Zt() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var Qt = "focusScope.autoFocusOnMount", $t = "focusScope.autoFocusOnUnmount", en = {
	bubbles: !1,
	cancelable: !0
}, tn = "FocusScope", nn = r.forwardRef((e, n) => {
	let { loop: i = !1, trapped: a = !1, onMountAutoFocus: o, onUnmountAutoFocus: s, ...c } = e, [l, u] = r.useState(null), d = Pt(o), f = Pt(s), p = r.useRef(null), m = W(n, (e) => u(e)), h = r.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	r.useEffect(() => {
		if (a) {
			let e = function(e) {
				if (h.paused || !l) return;
				let t = e.target;
				l.contains(t) ? p.current = t : un(p.current, { select: !0 });
			}, t = function(e) {
				if (h.paused || !l) return;
				let t = e.relatedTarget;
				t !== null && (l.contains(t) || un(p.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && un(l);
			};
			document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return l && r.observe(l, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		a,
		l,
		h.paused
	]), r.useEffect(() => {
		if (l) {
			dn.add(h);
			let e = document.activeElement;
			if (!l.contains(e)) {
				let t = new CustomEvent(Qt, en);
				l.addEventListener(Qt, d), l.dispatchEvent(t), t.defaultPrevented || (rn(mn(on(l)), { select: !0 }), document.activeElement === e && un(l));
			}
			return () => {
				l.removeEventListener(Qt, d), setTimeout(() => {
					let t = new CustomEvent($t, en);
					l.addEventListener($t, f), l.dispatchEvent(t), t.defaultPrevented || un(e ?? document.body, { select: !0 }), l.removeEventListener($t, f), dn.remove(h);
				}, 0);
			};
		}
	}, [
		l,
		d,
		f,
		h
	]);
	let g = r.useCallback((e) => {
		if (!i && !a || h.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = document.activeElement;
		if (t && n) {
			let t = e.currentTarget, [r, a] = an(t);
			r && a ? !e.shiftKey && n === a ? (e.preventDefault(), i && un(r, { select: !0 })) : e.shiftKey && n === r && (e.preventDefault(), i && un(a, { select: !0 })) : n === t && e.preventDefault();
		}
	}, [
		i,
		a,
		h.paused
	]);
	return /* @__PURE__ */ t(q.div, {
		tabIndex: -1,
		...c,
		ref: m,
		onKeyDown: g
	});
});
nn.displayName = tn;
function rn(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (un(r, { select: t }), document.activeElement !== n) return;
}
function an(e) {
	let t = on(e);
	return [sn(t, e), sn(t.reverse(), e)];
}
function on(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function sn(e, t) {
	for (let n of e) if (!cn(n, { upTo: t })) return n;
}
function cn(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function ln(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function un(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && ln(e) && t && e.select();
	}
}
var dn = fn();
function fn() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = pn(e, t), e.unshift(t);
		},
		remove(t) {
			e = pn(e, t), e[0]?.resume();
		}
	};
}
function pn(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function mn(e) {
	return e.filter((e) => e.tagName !== "A");
}
//#endregion
//#region node_modules/@radix-ui/react-id/dist/index.mjs
var hn = r.useId || (() => void 0), gn = 0;
function _n(e) {
	let [t, n] = r.useState(hn());
	return K(() => {
		e || n((e) => e ?? String(gn++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var vn = [
	"top",
	"right",
	"bottom",
	"left"
], yn = Math.min, Y = Math.max, bn = Math.round, xn = Math.floor, Sn = (e) => ({
	x: e,
	y: e
}), Cn = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function wn(e, t, n) {
	return Y(e, yn(t, n));
}
function Tn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function En(e) {
	return e.split("-")[0];
}
function Dn(e) {
	return e.split("-")[1];
}
function On(e) {
	return e === "x" ? "y" : "x";
}
function kn(e) {
	return e === "y" ? "height" : "width";
}
function An(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function jn(e) {
	return On(An(e));
}
function Mn(e, t, n) {
	n === void 0 && (n = !1);
	let r = Dn(e), i = jn(e), a = kn(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Vn(o)), [o, Vn(o)];
}
function Nn(e) {
	let t = Vn(e);
	return [
		Pn(e),
		t,
		Pn(t)
	];
}
function Pn(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Fn = ["left", "right"], In = ["right", "left"], Ln = ["top", "bottom"], Rn = ["bottom", "top"];
function zn(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? In : Fn : t ? Fn : In;
		case "left":
		case "right": return t ? Ln : Rn;
		default: return [];
	}
}
function Bn(e, t, n, r) {
	let i = Dn(e), a = zn(En(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Pn)))), a;
}
function Vn(e) {
	let t = En(e);
	return Cn[t] + e.slice(t.length);
}
function Hn(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function Un(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Hn(e);
}
function Wn(e) {
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
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Gn(e, t, n) {
	let { reference: r, floating: i } = e, a = An(t), o = jn(t), s = kn(o), c = En(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	switch (Dn(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function Kn(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Tn(t, e), p = Un(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Wn(await i.getClippingRect({
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
	}, y = Wn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var qn = 50, Jn = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Kn
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Gn(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < qn && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Gn(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Yn = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Tn(e, t) || {};
		if (l == null) return {};
		let d = Un(u), f = {
			x: n,
			y: r
		}, p = jn(i), m = kn(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = yn(d[_], T), D = yn(d[v], T), O = E, k = C - h[m] - D, A = C / 2 - h[m] / 2 + w, j = wn(O, A, k), M = !c.arrow && Dn(i) != null && A !== j && a.reference[m] / 2 - (A < O ? E : D) - h[m] / 2 < 0, N = M ? A < O ? A - O : A - k : 0;
		return {
			[p]: f[p] + N,
			data: {
				[p]: j,
				centerOffset: A - j - N,
				...M && { alignmentOffset: N }
			},
			reset: M
		};
	}
}), Xn = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Tn(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = En(r), _ = An(o), v = En(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Vn(o)] : Nn(o)), x = p !== "none";
			!d && x && b.push(...Bn(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Mn(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== An(t)) || T.every((e) => An(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
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
								let t = An(e.placement);
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
function Zn(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Qn(e) {
	return vn.some((t) => e[t] >= 0);
}
var $n = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Tn(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Zn(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Qn(e)
					} };
				}
				case "escaped": {
					let e = Zn(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Qn(e)
					} };
				}
				default: return {};
			}
		}
	};
}, er = /* @__PURE__ */ new Set(["left", "top"]);
async function tr(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = En(n), s = Dn(n), c = An(n) === "y", l = er.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Tn(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var nr = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await tr(t, e);
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
}, rr = function(e) {
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
			} }, ...l } = Tn(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = An(En(i)), p = On(f), m = u[p], h = u[f];
			if (o) {
				let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = m + d[e], r = m - d[t];
				m = wn(n, m, r);
			}
			if (s) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = h + d[e], r = h - d[t];
				h = wn(n, h, r);
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
}, ir = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Tn(e, t), u = {
				x: n,
				y: r
			}, d = An(i), f = On(d), p = u[f], m = u[d], h = Tn(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = er.has(En(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, ar = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = Tn(e, t), u = await o.detectOverflow(t, l), d = En(i), f = Dn(i), p = An(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = yn(h - u[g], v), x = yn(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = Y(u.left, 0), t = Y(u.right, 0), n = Y(u.top, 0), r = Y(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : Y(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : Y(u.top, u.bottom));
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
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function or() {
	return typeof window < "u";
}
function sr(e) {
	return lr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function X(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function cr(e) {
	return ((lr(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function lr(e) {
	return or() ? e instanceof Node || e instanceof X(e).Node : !1;
}
function ur(e) {
	return or() ? e instanceof Element || e instanceof X(e).Element : !1;
}
function dr(e) {
	return or() ? e instanceof HTMLElement || e instanceof X(e).HTMLElement : !1;
}
function fr(e) {
	return !or() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof X(e).ShadowRoot;
}
function pr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = wr(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function mr(e) {
	return /^(table|td|th)$/.test(sr(e));
}
function hr(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var gr = /transform|translate|scale|rotate|perspective|filter/, _r = /paint|layout|strict|content/, vr = (e) => !!e && e !== "none", yr;
function br(e) {
	let t = ur(e) ? wr(e) : e;
	return vr(t.transform) || vr(t.translate) || vr(t.scale) || vr(t.rotate) || vr(t.perspective) || !Sr() && (vr(t.backdropFilter) || vr(t.filter)) || gr.test(t.willChange || "") || _r.test(t.contain || "");
}
function xr(e) {
	let t = Er(e);
	for (; dr(t) && !Cr(t);) {
		if (br(t)) return t;
		if (hr(t)) return null;
		t = Er(t);
	}
	return null;
}
function Sr() {
	return yr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), yr;
}
function Cr(e) {
	return /^(html|body|#document)$/.test(sr(e));
}
function wr(e) {
	return X(e).getComputedStyle(e);
}
function Tr(e) {
	return ur(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Er(e) {
	if (sr(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || fr(e) && e.host || cr(e);
	return fr(t) ? t.host : t;
}
function Dr(e) {
	let t = Er(e);
	return Cr(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : dr(t) && pr(t) ? t : Dr(t);
}
function Or(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Dr(e), i = r === e.ownerDocument?.body, a = X(r);
	if (i) {
		let e = kr(a);
		return t.concat(a, a.visualViewport || [], pr(r) ? r : [], e && n ? Or(e) : []);
	} else return t.concat(r, Or(r, [], n));
}
function kr(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Ar(e) {
	let t = wr(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = dr(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = bn(n) !== a || bn(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function jr(e) {
	return ur(e) ? e : e.contextElement;
}
function Mr(e) {
	let t = jr(e);
	if (!dr(t)) return Sn(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Ar(t), o = (a ? bn(n.width) : n.width) / r, s = (a ? bn(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Nr = /* @__PURE__ */ Sn(0);
function Pr(e) {
	let t = X(e);
	return !Sr() || !t.visualViewport ? Nr : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Fr(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== X(e) ? !1 : t;
}
function Ir(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = jr(e), o = Sn(1);
	t && (r ? ur(r) && (o = Mr(r)) : o = Mr(e));
	let s = Fr(a, n, r) ? Pr(a) : Sn(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = X(a), t = r && ur(r) ? X(r) : r, n = e, i = kr(n);
		for (; i && r && t !== n;) {
			let e = Mr(i), t = i.getBoundingClientRect(), r = wr(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = X(i), i = kr(n);
		}
	}
	return Wn({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Lr(e, t) {
	let n = Tr(e).scrollLeft;
	return t ? t.left + n : Ir(cr(e)).left + n;
}
function Rr(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Lr(e, n),
		y: n.top + t.scrollTop
	};
}
function zr(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = cr(r), s = t ? hr(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Sn(1), u = Sn(0), d = dr(r);
	if ((d || !d && !a) && ((sr(r) !== "body" || pr(o)) && (c = Tr(r)), d)) {
		let e = Ir(r);
		l = Mr(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Rr(o, c) : Sn(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Br(e) {
	return Array.from(e.getClientRects());
}
function Vr(e) {
	let t = cr(e), n = Tr(e), r = e.ownerDocument.body, i = Y(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Y(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + Lr(e), s = -n.scrollTop;
	return wr(r).direction === "rtl" && (o += Y(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
var Hr = 25;
function Ur(e, t) {
	let n = X(e), r = cr(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = Sr();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = Lr(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= Hr && (a -= o);
	} else l <= Hr && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function Wr(e, t) {
	let n = Ir(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = dr(e) ? Mr(e) : Sn(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Gr(e, t, n) {
	let r;
	if (t === "viewport") r = Ur(e, n);
	else if (t === "document") r = Vr(cr(e));
	else if (ur(t)) r = Wr(t, n);
	else {
		let n = Pr(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Wn(r);
}
function Kr(e, t) {
	let n = Er(e);
	return n === t || !ur(n) || Cr(n) ? !1 : wr(n).position === "fixed" || Kr(n, t);
}
function qr(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Or(e, [], !1).filter((e) => ur(e) && sr(e) !== "body"), i = null, a = wr(e).position === "fixed", o = a ? Er(e) : e;
	for (; ur(o) && !Cr(o);) {
		let t = wr(o), n = br(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || pr(o) && !n && Kr(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = Er(o);
	}
	return t.set(e, r), r;
}
function Jr(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? hr(t) ? [] : qr(t, this._c) : [].concat(n), r], o = Gr(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Gr(t, a[e], i);
		s = Y(n.top, s), c = yn(n.right, c), l = yn(n.bottom, l), u = Y(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Yr(e) {
	let { width: t, height: n } = Ar(e);
	return {
		width: t,
		height: n
	};
}
function Xr(e, t, n) {
	let r = dr(t), i = cr(t), a = n === "fixed", o = Ir(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Sn(0);
	function l() {
		c.x = Lr(i);
	}
	if (r || !r && !a) if ((sr(t) !== "body" || pr(i)) && (s = Tr(t)), r) {
		let e = Ir(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? Rr(i, s) : Sn(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function Zr(e) {
	return wr(e).position === "static";
}
function Qr(e, t) {
	if (!dr(e) || wr(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return cr(e) === n && (n = n.ownerDocument.body), n;
}
function $r(e, t) {
	let n = X(e);
	if (hr(e)) return n;
	if (!dr(e)) {
		let t = Er(e);
		for (; t && !Cr(t);) {
			if (ur(t) && !Zr(t)) return t;
			t = Er(t);
		}
		return n;
	}
	let r = Qr(e, t);
	for (; r && mr(r) && Zr(r);) r = Qr(r, t);
	return r && Cr(r) && Zr(r) && !br(r) ? n : r || xr(e) || n;
}
var ei = async function(e) {
	let t = this.getOffsetParent || $r, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Xr(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function ti(e) {
	return wr(e).direction === "rtl";
}
var ni = {
	convertOffsetParentRelativeRectToViewportRelativeRect: zr,
	getDocumentElement: cr,
	getClippingRect: Jr,
	getOffsetParent: $r,
	getElementRects: ei,
	getClientRects: Br,
	getDimensions: Yr,
	getScale: Mr,
	isElement: ur,
	isRTL: ti
};
function ri(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function ii(e, t) {
	let n = null, r, i = cr(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = xn(d), h = xn(i.clientWidth - (u + f)), g = xn(i.clientHeight - (d + p)), _ = xn(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Y(0, yn(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !ri(l, e.getBoundingClientRect()) && o(), y = !1;
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
function ai(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = jr(e), u = i || a ? [...l ? Or(l) : [], ...t ? Or(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? ii(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Ir(e) : null;
	c && g();
	function g() {
		let t = Ir(e);
		h && !ri(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var oi = nr, si = rr, ci = Xn, li = ar, ui = $n, di = Yn, fi = ir, pi = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: ni,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return Jn(e, t, {
		...i,
		platform: a
	});
}, mi = typeof document < "u" ? s : function() {};
function hi(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!hi(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !hi(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function gi(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function _i(e, t) {
	let n = gi(e);
	return Math.round(t * n) / n;
}
function vi(e) {
	let t = r.useRef(e);
	return mi(() => {
		t.current = e;
	}), t;
}
function yi(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: i = [], platform: a, elements: { reference: o, floating: s } = {}, transform: c = !0, whileElementsMounted: l, open: u } = e, [f, p] = r.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [m, h] = r.useState(i);
	hi(m, i) || h(i);
	let [g, _] = r.useState(null), [v, y] = r.useState(null), b = r.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = r.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = o || g, C = s || v, w = r.useRef(null), T = r.useRef(null), E = r.useRef(f), D = l != null, O = vi(l), k = vi(a), A = vi(u), j = r.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: m
		};
		k.current && (e.platform = k.current), pi(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !hi(E.current, t) && (E.current = t, d.flushSync(() => {
				p(t);
			}));
		});
	}, [
		m,
		t,
		n,
		k,
		A
	]);
	mi(() => {
		u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, p((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [u]);
	let M = r.useRef(!1);
	mi(() => (M.current = !0, () => {
		M.current = !1;
	}), []), mi(() => {
		if (S && (w.current = S), C && (T.current = C), S && C) {
			if (O.current) return O.current(S, C, j);
			j();
		}
	}, [
		S,
		C,
		j,
		O,
		D
	]);
	let N = r.useMemo(() => ({
		reference: w,
		floating: T,
		setReference: b,
		setFloating: x
	}), [b, x]), P = r.useMemo(() => ({
		reference: S,
		floating: C
	}), [S, C]), F = r.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!P.floating) return e;
		let t = _i(P.floating, f.x), r = _i(P.floating, f.y);
		return c ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...gi(P.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		c,
		P.floating,
		f.x,
		f.y
	]);
	return r.useMemo(() => ({
		...f,
		update: j,
		refs: N,
		elements: P,
		floatingStyles: F
	}), [
		f,
		j,
		N,
		P,
		F
	]);
}
var bi = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : di({
				element: r.current,
				padding: i
			}).fn(n) : r ? di({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, xi = (e, t) => {
	let n = oi(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Si = (e, t) => {
	let n = si(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ci = (e, t) => ({
	fn: fi(e).fn,
	options: [e, t]
}), wi = (e, t) => {
	let n = ci(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ti = (e, t) => {
	let n = li(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Ei = (e, t) => {
	let n = ui(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Di = (e, t) => {
	let n = bi(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Oi = "Arrow", ki = r.forwardRef((e, n) => {
	let { children: r, width: i = 10, height: a = 5, ...o } = e;
	return /* @__PURE__ */ t(q.svg, {
		...o,
		ref: n,
		width: i,
		height: a,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? r : /* @__PURE__ */ t("polygon", { points: "0,0 30,0 15,10" })
	});
});
ki.displayName = Oi;
var Ai = ki, ji = "Popper", [Mi, Ni] = Ge(ji), [Pi, Fi] = Mi(ji), Ii = (e) => {
	let { __scopePopper: n, children: i } = e, [a, o] = r.useState(null);
	return /* @__PURE__ */ t(Pi, {
		scope: n,
		anchor: a,
		onAnchorChange: o,
		children: i
	});
};
Ii.displayName = ji;
var Li = "PopperAnchor", Ri = r.forwardRef((e, n) => {
	let { __scopePopper: i, virtualRef: a, ...o } = e, s = Fi(Li, i), c = r.useRef(null), l = W(n, c), u = r.useRef(null);
	return r.useEffect(() => {
		let e = u.current;
		u.current = a?.current || c.current, e !== u.current && s.onAnchorChange(u.current);
	}), a ? null : /* @__PURE__ */ t(q.div, {
		...o,
		ref: l
	});
});
Ri.displayName = Li;
var zi = "PopperContent", [Bi, Vi] = Mi(zi), Hi = r.forwardRef((e, n) => {
	let { __scopePopper: i, side: a = "bottom", sideOffset: o = 0, align: s = "center", alignOffset: c = 0, arrowPadding: l = 0, avoidCollisions: u = !0, collisionBoundary: d = [], collisionPadding: f = 0, sticky: p = "partial", hideWhenDetached: m = !1, updatePositionStrategy: h = "optimized", onPlaced: g, ..._ } = e, v = Fi(zi, i), [y, b] = r.useState(null), x = W(n, (e) => b(e)), [S, C] = r.useState(null), w = Qe(S), T = w?.width ?? 0, E = w?.height ?? 0, D = a + (s === "center" ? "" : "-" + s), O = typeof f == "number" ? f : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...f
	}, k = Array.isArray(d) ? d : [d], A = k.length > 0, j = {
		padding: O,
		boundary: k.filter(Ki),
		altBoundary: A
	}, { refs: M, floatingStyles: N, placement: P, isPositioned: F, middlewareData: I } = yi({
		strategy: "fixed",
		placement: D,
		whileElementsMounted: (...e) => ai(...e, { animationFrame: h === "always" }),
		elements: { reference: v.anchor },
		middleware: [
			xi({
				mainAxis: o + E,
				alignmentAxis: c
			}),
			u && Si({
				mainAxis: !0,
				crossAxis: !1,
				limiter: p === "partial" ? Ci() : void 0,
				...j
			}),
			u && wi({ ...j }),
			Ti({
				...j,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}
			}),
			S && Di({
				element: S,
				padding: l
			}),
			qi({
				arrowWidth: T,
				arrowHeight: E
			}),
			m && Ei({
				strategy: "referenceHidden",
				...j
			})
		]
	}), [L, R] = Ji(P), ee = Pt(g);
	K(() => {
		F && ee?.();
	}, [F, ee]);
	let z = I.arrow?.x, B = I.arrow?.y, te = I.arrow?.centerOffset !== 0, [ne, V] = r.useState();
	return K(() => {
		y && V(window.getComputedStyle(y).zIndex);
	}, [y]), /* @__PURE__ */ t("div", {
		ref: M.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...N,
			transform: F ? N.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: ne,
			"--radix-popper-transform-origin": [I.transformOrigin?.x, I.transformOrigin?.y].join(" "),
			...I.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: e.dir,
		children: /* @__PURE__ */ t(Bi, {
			scope: i,
			placedSide: L,
			onArrowChange: C,
			arrowX: z,
			arrowY: B,
			shouldHideArrow: te,
			children: /* @__PURE__ */ t(q.div, {
				"data-side": L,
				"data-align": R,
				..._,
				ref: x,
				style: {
					..._.style,
					animation: F ? void 0 : "none"
				}
			})
		})
	});
});
Hi.displayName = zi;
var Ui = "PopperArrow", Wi = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Gi = r.forwardRef(function(e, n) {
	let { __scopePopper: r, ...i } = e, a = Vi(Ui, r), o = Wi[a.placedSide];
	return /* @__PURE__ */ t("span", {
		ref: a.onArrowChange,
		style: {
			position: "absolute",
			left: a.arrowX,
			top: a.arrowY,
			[o]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[a.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: "rotate(180deg)",
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[a.placedSide],
			visibility: a.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ t(Ai, {
			...i,
			ref: n,
			style: {
				...i.style,
				display: "block"
			}
		})
	});
});
Gi.displayName = Ui;
function Ki(e) {
	return e !== null;
}
var qi = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Ji(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
});
function Ji(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var Yi = Ii, Xi = Ri, Zi = Hi, Qi = Gi, $i = "Portal", ea = r.forwardRef((e, n) => {
	let { container: i, ...a } = e, [o, s] = r.useState(!1);
	K(() => s(!0), []);
	let c = i || o && globalThis?.document?.body;
	return c ? f.createPortal(/* @__PURE__ */ t(q.div, {
		...a,
		ref: n
	}), c) : null;
});
ea.displayName = $i;
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var ta = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
}), na = "VisuallyHidden", ra = r.forwardRef((e, n) => /* @__PURE__ */ t(q.span, {
	...e,
	ref: n,
	style: {
		...ta,
		...e.style
	}
}));
ra.displayName = na;
//#endregion
//#region node_modules/aria-hidden/dist/es2015/index.js
var ia = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, aa = /* @__PURE__ */ new WeakMap(), oa = /* @__PURE__ */ new WeakMap(), sa = {}, ca = 0, la = function(e) {
	return e && (e.host || la(e.parentNode));
}, ua = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = la(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, da = function(e, t, n, r) {
	var i = ua(t, Array.isArray(e) ? e : [e]);
	sa[n] || (sa[n] = /* @__PURE__ */ new WeakMap());
	var a = sa[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (aa.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				aa.set(e, c), a.set(e, l), o.push(e), c === 1 && i && oa.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), ca++, function() {
		o.forEach(function(e) {
			var t = aa.get(e) - 1, i = a.get(e) - 1;
			aa.set(e, t), a.set(e, i), t || (oa.has(e) || e.removeAttribute(r), oa.delete(e)), i || e.removeAttribute(n);
		}), ca--, ca || (aa = /* @__PURE__ */ new WeakMap(), aa = /* @__PURE__ */ new WeakMap(), oa = /* @__PURE__ */ new WeakMap(), sa = {});
	};
}, fa = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || ia(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), da(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, pa = function() {
	return pa = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, pa.apply(this, arguments);
};
function ma(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function ha(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var ga = "right-scroll-bar-position", _a = "width-before-scroll-bar", va = "with-scroll-bars-hidden", ya = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function ba(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function xa(e, t) {
	var n = u(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var Sa = typeof window < "u" ? r.useLayoutEffect : r.useEffect, Ca = /* @__PURE__ */ new WeakMap();
function wa(e, t) {
	var n = xa(t || null, function(t) {
		return e.forEach(function(e) {
			return ba(e, t);
		});
	});
	return Sa(function() {
		var t = Ca.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || ba(e, null);
			}), i.forEach(function(e) {
				r.has(e) || ba(e, a);
			});
		}
		Ca.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function Ta(e) {
	return e;
}
function Ea(e, t) {
	t === void 0 && (t = Ta);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function Da(e) {
	e === void 0 && (e = {});
	var t = Ea(null);
	return t.options = pa({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var Oa = function(e) {
	var t = e.sideCar, n = ma(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var i = t.read();
	if (!i) throw Error("Sidecar medium not found");
	return r.createElement(i, pa({}, n));
};
Oa.isSideCarExport = !0;
function ka(e, t) {
	return e.useMedium(t), Oa;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var Aa = Da(), ja = function() {}, Ma = r.forwardRef(function(e, t) {
	var n = r.useRef(null), i = r.useState({
		onScrollCapture: ja,
		onWheelCapture: ja,
		onTouchMoveCapture: ja
	}), a = i[0], o = i[1], s = e.forwardProps, c = e.children, l = e.className, u = e.removeScrollBar, d = e.enabled, f = e.shards, p = e.sideCar, m = e.noRelative, h = e.noIsolation, g = e.inert, _ = e.allowPinchZoom, v = e.as, y = v === void 0 ? "div" : v, b = e.gapMode, x = ma(e, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), S = p, C = wa([n, t]), w = pa(pa({}, x), a);
	return r.createElement(r.Fragment, null, d && r.createElement(S, {
		sideCar: Aa,
		removeScrollBar: u,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: o,
		allowPinchZoom: !!_,
		lockRef: n,
		gapMode: b
	}), s ? r.cloneElement(r.Children.only(c), pa(pa({}, w), { ref: C })) : r.createElement(y, pa({}, w, {
		className: l,
		ref: C
	}), c));
});
Ma.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, Ma.classNames = {
	fullWidth: _a,
	zeroRight: ga
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var Na, Pa = function() {
	if (Na) return Na;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function Fa() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = Pa();
	return t && e.setAttribute("nonce", t), e;
}
function Ia(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function La(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Ra = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = Fa()) && (Ia(t, n), La(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, za = function() {
	var e = Ra();
	return function(t, n) {
		r.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, Ba = function() {
	var e = za();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Va = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, Ha = function(e) {
	return parseInt(e || "", 10) || 0;
}, Ua = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		Ha(n),
		Ha(r),
		Ha(i)
	];
}, Wa = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Va;
	var t = Ua(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, Ga = Ba(), Ka = "data-scroll-locked", qa = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${va} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Ka}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${ga} {
    right: ${s}px ${r};
  }
  
  .${_a} {
    margin-right: ${s}px ${r};
  }
  
  .${ga} .${ga} {
    right: 0 ${r};
  }
  
  .${_a} .${_a} {
    margin-right: 0 ${r};
  }
  
  body[${Ka}] {
    ${ya}: ${s}px;
  }
`;
}, Ja = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, Ya = function() {
	r.useEffect(function() {
		return document.body.setAttribute(Ka, (Ja() + 1).toString()), function() {
			var e = Ja() - 1;
			e <= 0 ? document.body.removeAttribute(Ka) : document.body.setAttribute(Ka, e.toString());
		};
	}, []);
}, Xa = function(e) {
	var t = e.noRelative, n = e.noImportant, i = e.gapMode, a = i === void 0 ? "margin" : i;
	Ya();
	var o = r.useMemo(function() {
		return Wa(a);
	}, [a]);
	return r.createElement(Ga, { styles: qa(o, !t, a, n ? "" : "!important") });
}, Za = !1;
if (typeof window < "u") try {
	var Qa = Object.defineProperty({}, "passive", { get: function() {
		return Za = !0, !0;
	} });
	window.addEventListener("test", Qa, Qa), window.removeEventListener("test", Qa, Qa);
} catch {
	Za = !1;
}
var $a = Za ? { passive: !1 } : !1, eo = function(e) {
	return e.tagName === "TEXTAREA";
}, to = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !eo(e) && n[t] === "visible");
}, no = function(e) {
	return to(e, "overflowY");
}, ro = function(e) {
	return to(e, "overflowX");
}, io = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), so(e, r)) {
			var i = co(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, ao = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, oo = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, so = function(e, t) {
	return e === "v" ? no(t) : ro(t);
}, co = function(e, t) {
	return e === "v" ? ao(t) : oo(t);
}, lo = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, uo = function(e, t, n, r, i) {
	var a = lo(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = co(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && so(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, fo = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, po = function(e) {
	return [e.deltaX, e.deltaY];
}, mo = function(e) {
	return e && "current" in e ? e.current : e;
}, ho = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, go = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, _o = 0, vo = [];
function yo(e) {
	var t = r.useRef([]), n = r.useRef([0, 0]), i = r.useRef(), a = r.useState(_o++)[0], o = r.useState(Ba)[0], s = r.useRef(e);
	r.useEffect(function() {
		s.current = e;
	}, [e]), r.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${a}`);
			var t = ha([e.lockRef.current], (e.shards || []).map(mo), !0).filter(Boolean);
			return t.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${a}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${a}`), t.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${a}`);
				});
			};
		}
	}, [
		e.inert,
		e.lockRef.current,
		e.shards
	]);
	var c = r.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !s.current.allowPinchZoom;
		var r = fo(e), a = n.current, o = "deltaX" in e ? e.deltaX : a[0] - r[0], c = "deltaY" in e ? e.deltaY : a[1] - r[1], l, u = e.target, d = Math.abs(o) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = io(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = io(d, u)), !m) return !1;
		if (!i.current && "changedTouches" in e && (o || c) && (i.current = l), !l) return !0;
		var h = i.current || l;
		return uo(h, t, e, h === "h" ? o : c, !0);
	}, []), l = r.useCallback(function(e) {
		var n = e;
		if (!(!vo.length || vo[vo.length - 1] !== o)) {
			var r = "deltaY" in n ? po(n) : fo(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && ho(e.delta, r);
			})[0];
			if (i && i.should) {
				n.cancelable && n.preventDefault();
				return;
			}
			if (!i) {
				var a = (s.current.shards || []).map(mo).filter(Boolean).filter(function(e) {
					return e.contains(n.target);
				});
				(a.length > 0 ? c(n, a[0]) : !s.current.noIsolation) && n.cancelable && n.preventDefault();
			}
		}
	}, []), u = r.useCallback(function(e, n, r, i) {
		var a = {
			name: e,
			delta: n,
			target: r,
			should: i,
			shadowParent: bo(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = r.useCallback(function(e) {
		n.current = fo(e), i.current = void 0;
	}, []), f = r.useCallback(function(t) {
		u(t.type, po(t), t.target, c(t, e.lockRef.current));
	}, []), p = r.useCallback(function(t) {
		u(t.type, fo(t), t.target, c(t, e.lockRef.current));
	}, []);
	r.useEffect(function() {
		return vo.push(o), e.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", l, $a), document.addEventListener("touchmove", l, $a), document.addEventListener("touchstart", d, $a), function() {
			vo = vo.filter(function(e) {
				return e !== o;
			}), document.removeEventListener("wheel", l, $a), document.removeEventListener("touchmove", l, $a), document.removeEventListener("touchstart", d, $a);
		};
	}, []);
	var m = e.removeScrollBar, h = e.inert;
	return r.createElement(r.Fragment, null, h ? r.createElement(o, { styles: go(a) }) : null, m ? r.createElement(Xa, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function bo(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var xo = ka(Aa, yo), So = r.forwardRef(function(e, t) {
	return r.createElement(Ma, pa({}, e, {
		ref: t,
		sideCar: xo
	}));
});
So.classNames = Ma.classNames;
//#endregion
//#region node_modules/@radix-ui/react-select/dist/index.mjs
var Co = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], wo = [" ", "Enter"], To = "Select", [Eo, Do, Oo] = jt(To), [ko, Ao] = Ge(To, [Oo, Ni]), jo = Ni(), [Mo, No] = ko(To), [Po, Fo] = ko(To), Io = (e) => {
	let { __scopeSelect: i, children: a, open: o, defaultOpen: s, onOpenChange: c, value: l, defaultValue: u, onValueChange: d, dir: f, name: p, autoComplete: m, disabled: h, required: g, form: _ } = e, v = jo(i), [y, b] = r.useState(null), [x, S] = r.useState(null), [C, w] = r.useState(!1), T = Nt(f), [E, D] = Je({
		prop: o,
		defaultProp: s ?? !1,
		onChange: c,
		caller: To
	}), [O, k] = Je({
		prop: l,
		defaultProp: u,
		onChange: d,
		caller: To
	}), A = r.useRef(null), j = y ? _ || !!y.closest("form") : !0, [M, N] = r.useState(/* @__PURE__ */ new Set()), P = Array.from(M).map((e) => e.props.value).join(";");
	return /* @__PURE__ */ t(Yi, {
		...v,
		children: /* @__PURE__ */ n(Mo, {
			required: g,
			scope: i,
			trigger: y,
			onTriggerChange: b,
			valueNode: x,
			onValueNodeChange: S,
			valueNodeHasChildren: C,
			onValueNodeHasChildrenChange: w,
			contentId: _n(),
			value: O,
			onValueChange: k,
			open: E,
			onOpenChange: D,
			dir: T,
			triggerPointerDownPosRef: A,
			disabled: h,
			children: [/* @__PURE__ */ t(Eo.Provider, {
				scope: i,
				children: /* @__PURE__ */ t(Po, {
					scope: e.__scopeSelect,
					onNativeOptionAdd: r.useCallback((e) => {
						N((t) => new Set(t).add(e));
					}, []),
					onNativeOptionRemove: r.useCallback((e) => {
						N((t) => {
							let n = new Set(t);
							return n.delete(e), n;
						});
					}, []),
					children: a
				})
			}), j ? /* @__PURE__ */ n(js, {
				"aria-hidden": !0,
				required: g,
				tabIndex: -1,
				name: p,
				autoComplete: m,
				value: O,
				onChange: (e) => k(e.target.value),
				disabled: h,
				form: _,
				children: [O === void 0 ? /* @__PURE__ */ t("option", { value: "" }) : null, Array.from(M)]
			}, P) : null]
		})
	});
};
Io.displayName = To;
var Lo = "SelectTrigger", Ro = r.forwardRef((e, n) => {
	let { __scopeSelect: i, disabled: a = !1, ...o } = e, s = jo(i), c = No(Lo, i), l = c.disabled || a, u = W(n, c.onTriggerChange), d = Do(i), f = r.useRef("touch"), [p, m, h] = Ns((e) => {
		let t = d().filter((e) => !e.disabled), n = Ps(t, e, t.find((e) => e.value === c.value));
		n !== void 0 && c.onValueChange(n.value);
	}), g = (e) => {
		l || (c.onOpenChange(!0), h()), e && (c.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	};
	return /* @__PURE__ */ t(Xi, {
		asChild: !0,
		...s,
		children: /* @__PURE__ */ t(q.button, {
			type: "button",
			role: "combobox",
			"aria-controls": c.contentId,
			"aria-expanded": c.open,
			"aria-required": c.required,
			"aria-autocomplete": "none",
			dir: c.dir,
			"data-state": c.open ? "open" : "closed",
			disabled: l,
			"data-disabled": l ? "" : void 0,
			"data-placeholder": Ms(c.value) ? "" : void 0,
			...o,
			ref: u,
			onClick: G(o.onClick, (e) => {
				e.currentTarget.focus(), f.current !== "mouse" && g(e);
			}),
			onPointerDown: G(o.onPointerDown, (e) => {
				f.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (g(e), e.preventDefault());
			}),
			onKeyDown: G(o.onKeyDown, (e) => {
				let t = p.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && m(e.key), !(t && e.key === " ") && Co.includes(e.key) && (g(), e.preventDefault());
			})
		})
	});
});
Ro.displayName = Lo;
var zo = "SelectValue", Bo = r.forwardRef((n, r) => {
	let { __scopeSelect: i, className: a, style: o, children: s, placeholder: c = "", ...l } = n, u = No(zo, i), { onValueNodeHasChildrenChange: d } = u, f = s !== void 0, p = W(r, u.onValueNodeChange);
	return K(() => {
		d(f);
	}, [d, f]), /* @__PURE__ */ t(q.span, {
		...l,
		ref: p,
		style: { pointerEvents: "none" },
		children: Ms(u.value) ? /* @__PURE__ */ t(e, { children: c }) : s
	});
});
Bo.displayName = zo;
var Vo = "SelectIcon", Ho = r.forwardRef((e, n) => {
	let { __scopeSelect: r, children: i, ...a } = e;
	return /* @__PURE__ */ t(q.span, {
		"aria-hidden": !0,
		...a,
		ref: n,
		children: i || "▼"
	});
});
Ho.displayName = Vo;
var Uo = "SelectPortal", Wo = (e) => /* @__PURE__ */ t(ea, {
	asChild: !0,
	...e
});
Wo.displayName = Uo;
var Go = "SelectContent", Ko = r.forwardRef((e, n) => {
	let i = No(Go, e.__scopeSelect), [a, o] = r.useState();
	if (K(() => {
		o(new DocumentFragment());
	}, []), !i.open) {
		let n = a;
		return n ? d.createPortal(/* @__PURE__ */ t(Jo, {
			scope: e.__scopeSelect,
			children: /* @__PURE__ */ t(Eo.Slot, {
				scope: e.__scopeSelect,
				children: /* @__PURE__ */ t("div", { children: e.children })
			})
		}), n) : null;
	}
	return /* @__PURE__ */ t(Qo, {
		...e,
		ref: n
	});
});
Ko.displayName = Go;
var qo = 10, [Jo, Yo] = ko(Go), Xo = "SelectContentImpl", Zo = /* @__PURE__ */ it("SelectContent.RemoveScroll"), Qo = r.forwardRef((e, n) => {
	let { __scopeSelect: i, position: a = "item-aligned", onCloseAutoFocus: o, onEscapeKeyDown: s, onPointerDownOutside: c, side: l, sideOffset: u, align: d, alignOffset: f, arrowPadding: p, collisionBoundary: m, collisionPadding: h, sticky: g, hideWhenDetached: _, avoidCollisions: v, ...y } = e, b = No(Go, i), [x, S] = r.useState(null), [C, w] = r.useState(null), T = W(n, (e) => S(e)), [E, D] = r.useState(null), [O, k] = r.useState(null), A = Do(i), [j, M] = r.useState(!1), N = r.useRef(!1);
	r.useEffect(() => {
		if (x) return fa(x);
	}, [x]), Xt();
	let P = r.useCallback((e) => {
		let [t, ...n] = A().map((e) => e.ref.current), [r] = n.slice(-1), i = document.activeElement;
		for (let n of e) if (n === i || (n?.scrollIntoView({ block: "nearest" }), n === t && C && (C.scrollTop = 0), n === r && C && (C.scrollTop = C.scrollHeight), n?.focus(), document.activeElement !== i)) return;
	}, [A, C]), F = r.useCallback(() => P([E, x]), [
		P,
		E,
		x
	]);
	r.useEffect(() => {
		j && F();
	}, [j, F]);
	let { onOpenChange: I, triggerPointerDownPosRef: L } = b;
	r.useEffect(() => {
		if (x) {
			let e = {
				x: 0,
				y: 0
			}, t = (t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (L.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (L.current?.y ?? 0))
				};
			}, n = (n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : x.contains(n.target) || I(!1), document.removeEventListener("pointermove", t), L.current = null;
			};
			return L.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		x,
		I,
		L
	]), r.useEffect(() => {
		let e = () => I(!1);
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [I]);
	let [R, ee] = Ns((e) => {
		let t = A().filter((e) => !e.disabled), n = Ps(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current.focus());
	}), z = r.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && (D(e), r && (N.current = !0));
	}, [b.value]), B = r.useCallback(() => x?.focus(), [x]), te = r.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && k(e);
	}, [b.value]), ne = a === "popper" ? ns : es, V = ne === ns ? {
		side: l,
		sideOffset: u,
		align: d,
		alignOffset: f,
		arrowPadding: p,
		collisionBoundary: m,
		collisionPadding: h,
		sticky: g,
		hideWhenDetached: _,
		avoidCollisions: v
	} : {};
	return /* @__PURE__ */ t(Jo, {
		scope: i,
		content: x,
		viewport: C,
		onViewportChange: w,
		itemRefCallback: z,
		selectedItem: E,
		onItemLeave: B,
		itemTextRefCallback: te,
		focusSelectedItem: F,
		selectedItemText: O,
		position: a,
		isPositioned: j,
		searchRef: R,
		children: /* @__PURE__ */ t(So, {
			as: Zo,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ t(nn, {
				asChild: !0,
				trapped: b.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: G(o, (e) => {
					b.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ t(Ht, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: s,
					onPointerDownOutside: c,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => b.onOpenChange(!1),
					children: /* @__PURE__ */ t(ne, {
						role: "listbox",
						id: b.contentId,
						"data-state": b.open ? "open" : "closed",
						dir: b.dir,
						onContextMenu: (e) => e.preventDefault(),
						...y,
						...V,
						onPlaced: () => M(!0),
						ref: T,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...y.style
						},
						onKeyDown: G(y.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && ee(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let t = A().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let n = e.target, r = t.indexOf(n);
									t = t.slice(r + 1);
								}
								setTimeout(() => P(t)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
});
Qo.displayName = Xo;
var $o = "SelectItemAlignedPosition", es = r.forwardRef((e, n) => {
	let { __scopeSelect: i, onPlaced: a, ...o } = e, s = No(Go, i), c = Yo(Go, i), [l, u] = r.useState(null), [d, f] = r.useState(null), p = W(n, (e) => f(e)), m = Do(i), h = r.useRef(!1), g = r.useRef(!0), { viewport: _, selectedItem: v, selectedItemText: y, focusSelectedItem: b } = c, x = r.useCallback(() => {
		if (s.trigger && s.valueNode && l && d && _ && v && y) {
			let e = s.trigger.getBoundingClientRect(), t = d.getBoundingClientRect(), n = s.valueNode.getBoundingClientRect(), r = y.getBoundingClientRect();
			if (s.dir !== "rtl") {
				let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, c = Math.max(s, t.width), u = window.innerWidth - qo, d = At(a, [qo, Math.max(qo, u - c)]);
				l.style.minWidth = s + "px", l.style.left = d + "px";
			} else {
				let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, c = Math.max(s, t.width), u = window.innerWidth - qo, d = At(a, [qo, Math.max(qo, u - c)]);
				l.style.minWidth = s + "px", l.style.right = d + "px";
			}
			let i = m(), o = window.innerHeight - qo * 2, c = _.scrollHeight, u = window.getComputedStyle(d), f = parseInt(u.borderTopWidth, 10), p = parseInt(u.paddingTop, 10), g = parseInt(u.borderBottomWidth, 10), b = parseInt(u.paddingBottom, 10), x = f + p + c + b + g, S = Math.min(v.offsetHeight * 5, x), C = window.getComputedStyle(_), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - qo, D = o - E, O = v.offsetHeight / 2, k = v.offsetTop + O, A = f + p + k, j = x - A;
			if (A <= E) {
				let e = i.length > 0 && v === i[i.length - 1].ref.current;
				l.style.bottom = "0px";
				let t = d.clientHeight - _.offsetTop - _.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + g);
				l.style.height = n + "px";
			} else {
				let e = i.length > 0 && v === i[0].ref.current;
				l.style.top = "0px";
				let t = Math.max(E, f + _.offsetTop + (e ? w : 0) + O) + j;
				l.style.height = t + "px", _.scrollTop = A - E + _.offsetTop;
			}
			l.style.margin = `${qo}px 0`, l.style.minHeight = S + "px", l.style.maxHeight = o + "px", a?.(), requestAnimationFrame(() => h.current = !0);
		}
	}, [
		m,
		s.trigger,
		s.valueNode,
		l,
		d,
		_,
		v,
		y,
		s.dir,
		a
	]);
	K(() => x(), [x]);
	let [S, C] = r.useState();
	return K(() => {
		d && C(window.getComputedStyle(d).zIndex);
	}, [d]), /* @__PURE__ */ t(rs, {
		scope: i,
		contentWrapper: l,
		shouldExpandOnScrollRef: h,
		onScrollButtonChange: r.useCallback((e) => {
			e && g.current === !0 && (x(), b?.(), g.current = !1);
		}, [x, b]),
		children: /* @__PURE__ */ t("div", {
			ref: u,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: S
			},
			children: /* @__PURE__ */ t(q.div, {
				...o,
				ref: p,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...o.style
				}
			})
		})
	});
});
es.displayName = $o;
var ts = "SelectPopperPosition", ns = r.forwardRef((e, n) => {
	let { __scopeSelect: r, align: i = "start", collisionPadding: a = qo, ...o } = e;
	return /* @__PURE__ */ t(Zi, {
		...jo(r),
		...o,
		ref: n,
		align: i,
		collisionPadding: a,
		style: {
			boxSizing: "border-box",
			...o.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
ns.displayName = ts;
var [rs, is] = ko(Go, {}), as = "SelectViewport", os = r.forwardRef((i, a) => {
	let { __scopeSelect: o, nonce: s, ...c } = i, l = Yo(as, o), u = is(as, o), d = W(a, l.onViewportChange), f = r.useRef(0);
	return /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: s
	}), /* @__PURE__ */ t(Eo.Slot, {
		scope: o,
		children: /* @__PURE__ */ t(q.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...c,
			ref: d,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...c.style
			},
			onScroll: G(c.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = u;
				if (r?.current && n) {
					let e = Math.abs(f.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - qo * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
						if (o < r) {
							let i = o + e, a = Math.min(r, i), s = i - a;
							n.style.height = a + "px", n.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, n.style.justifyContent = "flex-end");
						}
					}
				}
				f.current = t.scrollTop;
			})
		})
	})] });
});
os.displayName = as;
var ss = "SelectGroup", [cs, ls] = ko(ss), us = r.forwardRef((e, n) => {
	let { __scopeSelect: r, ...i } = e, a = _n();
	return /* @__PURE__ */ t(cs, {
		scope: r,
		id: a,
		children: /* @__PURE__ */ t(q.div, {
			role: "group",
			"aria-labelledby": a,
			...i,
			ref: n
		})
	});
});
us.displayName = ss;
var ds = "SelectLabel", fs = r.forwardRef((e, n) => {
	let { __scopeSelect: r, ...i } = e, a = ls(ds, r);
	return /* @__PURE__ */ t(q.div, {
		id: a.id,
		...i,
		ref: n
	});
});
fs.displayName = ds;
var ps = "SelectItem", [ms, hs] = ko(ps), gs = r.forwardRef((e, n) => {
	let { __scopeSelect: i, value: a, disabled: o = !1, textValue: s, ...c } = e, l = No(ps, i), u = Yo(ps, i), d = l.value === a, [f, p] = r.useState(s ?? ""), [m, h] = r.useState(!1), g = W(n, (e) => u.itemRefCallback?.(e, a, o)), _ = _n(), v = r.useRef("touch"), y = () => {
		o || (l.onValueChange(a), l.onOpenChange(!1));
	};
	if (a === "") throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ t(ms, {
		scope: i,
		value: a,
		disabled: o,
		textId: _,
		isSelected: d,
		onItemTextChange: r.useCallback((e) => {
			p((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ t(Eo.ItemSlot, {
			scope: i,
			value: a,
			disabled: o,
			textValue: f,
			children: /* @__PURE__ */ t(q.div, {
				role: "option",
				"aria-labelledby": _,
				"data-highlighted": m ? "" : void 0,
				"aria-selected": d && m,
				"data-state": d ? "checked" : "unchecked",
				"aria-disabled": o || void 0,
				"data-disabled": o ? "" : void 0,
				tabIndex: o ? void 0 : -1,
				...c,
				ref: g,
				onFocus: G(c.onFocus, () => h(!0)),
				onBlur: G(c.onBlur, () => h(!1)),
				onClick: G(c.onClick, () => {
					v.current !== "mouse" && y();
				}),
				onPointerUp: G(c.onPointerUp, () => {
					v.current === "mouse" && y();
				}),
				onPointerDown: G(c.onPointerDown, (e) => {
					v.current = e.pointerType;
				}),
				onPointerMove: G(c.onPointerMove, (e) => {
					v.current = e.pointerType, o ? u.onItemLeave?.() : v.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: G(c.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && u.onItemLeave?.();
				}),
				onKeyDown: G(c.onKeyDown, (e) => {
					u.searchRef?.current !== "" && e.key === " " || (wo.includes(e.key) && y(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
});
gs.displayName = ps;
var _s = "SelectItemText", vs = r.forwardRef((i, a) => {
	let { __scopeSelect: o, className: s, style: c, ...l } = i, u = No(_s, o), f = Yo(_s, o), p = hs(_s, o), m = Fo(_s, o), [h, g] = r.useState(null), _ = W(a, (e) => g(e), p.onItemTextChange, (e) => f.itemTextRefCallback?.(e, p.value, p.disabled)), v = h?.textContent, y = r.useMemo(() => /* @__PURE__ */ t("option", {
		value: p.value,
		disabled: p.disabled,
		children: v
	}, p.value), [
		p.disabled,
		p.value,
		v
	]), { onNativeOptionAdd: b, onNativeOptionRemove: x } = m;
	return K(() => (b(y), () => x(y)), [
		b,
		x,
		y
	]), /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t(q.span, {
		id: p.textId,
		...l,
		ref: _
	}), p.isSelected && u.valueNode && !u.valueNodeHasChildren ? d.createPortal(l.children, u.valueNode) : null] });
});
vs.displayName = _s;
var ys = "SelectItemIndicator", bs = r.forwardRef((e, n) => {
	let { __scopeSelect: r, ...i } = e;
	return hs(ys, r).isSelected ? /* @__PURE__ */ t(q.span, {
		"aria-hidden": !0,
		...i,
		ref: n
	}) : null;
});
bs.displayName = ys;
var xs = "SelectScrollUpButton", Ss = r.forwardRef((e, n) => {
	let i = Yo(xs, e.__scopeSelect), a = is(xs, e.__scopeSelect), [o, s] = r.useState(!1), c = W(n, a.onScrollButtonChange);
	return K(() => {
		if (i.viewport && i.isPositioned) {
			let e = function() {
				s(t.scrollTop > 0);
			}, t = i.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [i.viewport, i.isPositioned]), o ? /* @__PURE__ */ t(Ts, {
		...e,
		ref: c,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = i;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
});
Ss.displayName = xs;
var Cs = "SelectScrollDownButton", ws = r.forwardRef((e, n) => {
	let i = Yo(Cs, e.__scopeSelect), a = is(Cs, e.__scopeSelect), [o, s] = r.useState(!1), c = W(n, a.onScrollButtonChange);
	return K(() => {
		if (i.viewport && i.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				s(Math.ceil(t.scrollTop) < e);
			}, t = i.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [i.viewport, i.isPositioned]), o ? /* @__PURE__ */ t(Ts, {
		...e,
		ref: c,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = i;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
});
ws.displayName = Cs;
var Ts = r.forwardRef((e, n) => {
	let { __scopeSelect: i, onAutoScroll: a, ...o } = e, s = Yo("SelectScrollButton", i), c = r.useRef(null), l = Do(i), u = r.useCallback(() => {
		c.current !== null && (window.clearInterval(c.current), c.current = null);
	}, []);
	return r.useEffect(() => () => u(), [u]), K(() => {
		l().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [l]), /* @__PURE__ */ t(q.div, {
		"aria-hidden": !0,
		...o,
		ref: n,
		style: {
			flexShrink: 0,
			...o.style
		},
		onPointerDown: G(o.onPointerDown, () => {
			c.current === null && (c.current = window.setInterval(a, 50));
		}),
		onPointerMove: G(o.onPointerMove, () => {
			s.onItemLeave?.(), c.current === null && (c.current = window.setInterval(a, 50));
		}),
		onPointerLeave: G(o.onPointerLeave, () => {
			u();
		})
	});
}), Es = "SelectSeparator", Ds = r.forwardRef((e, n) => {
	let { __scopeSelect: r, ...i } = e;
	return /* @__PURE__ */ t(q.div, {
		"aria-hidden": !0,
		...i,
		ref: n
	});
});
Ds.displayName = Es;
var Os = "SelectArrow", ks = r.forwardRef((e, n) => {
	let { __scopeSelect: r, ...i } = e, a = jo(r), o = No(Os, r), s = Yo(Os, r);
	return o.open && s.position === "popper" ? /* @__PURE__ */ t(Qi, {
		...a,
		...i,
		ref: n
	}) : null;
});
ks.displayName = Os;
var As = "SelectBubbleInput", js = r.forwardRef(({ __scopeSelect: e, value: n, ...i }, a) => {
	let o = r.useRef(null), s = W(a, o), c = Ze(n);
	return r.useEffect(() => {
		let e = o.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (c !== n && r) {
			let t = new Event("change", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [c, n]), /* @__PURE__ */ t(q.select, {
		...i,
		style: {
			...ta,
			...i.style
		},
		ref: s,
		defaultValue: n
	});
});
js.displayName = As;
function Ms(e) {
	return e === "" || e === void 0;
}
function Ns(e) {
	let t = Pt(e), n = r.useRef(""), i = r.useRef(0), a = r.useCallback((e) => {
		let r = n.current + e;
		t(r), (function e(t) {
			n.current = t, window.clearTimeout(i.current), t !== "" && (i.current = window.setTimeout(() => e(""), 1e3));
		})(r);
	}, [t]), o = r.useCallback(() => {
		n.current = "", window.clearTimeout(i.current);
	}, []);
	return r.useEffect(() => () => window.clearTimeout(i.current), []), [
		n,
		a,
		o
	];
}
function Ps(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Fs(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function Fs(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var Is = Io, Ls = Ro, Rs = Bo, zs = Ho, Bs = Wo, Vs = Ko, Hs = os, Us = gs, Ws = vs, Gs = {
	version: 4,
	country_calling_codes: {
		1: [
			"US",
			"AG",
			"AI",
			"AS",
			"BB",
			"BM",
			"BS",
			"CA",
			"DM",
			"DO",
			"GD",
			"GU",
			"JM",
			"KN",
			"KY",
			"LC",
			"MP",
			"MS",
			"PR",
			"SX",
			"TC",
			"TT",
			"VC",
			"VG",
			"VI"
		],
		7: ["RU", "KZ"],
		20: ["EG"],
		27: ["ZA"],
		30: ["GR"],
		31: ["NL"],
		32: ["BE"],
		33: ["FR"],
		34: ["ES"],
		36: ["HU"],
		39: ["IT", "VA"],
		40: ["RO"],
		41: ["CH"],
		43: ["AT"],
		44: [
			"GB",
			"GG",
			"IM",
			"JE"
		],
		45: ["DK"],
		46: ["SE"],
		47: ["NO", "SJ"],
		48: ["PL"],
		49: ["DE"],
		51: ["PE"],
		52: ["MX"],
		53: ["CU"],
		54: ["AR"],
		55: ["BR"],
		56: ["CL"],
		57: ["CO"],
		58: ["VE"],
		60: ["MY"],
		61: [
			"AU",
			"CC",
			"CX"
		],
		62: ["ID"],
		63: ["PH"],
		64: ["NZ"],
		65: ["SG"],
		66: ["TH"],
		81: ["JP"],
		82: ["KR"],
		84: ["VN"],
		86: ["CN"],
		90: ["TR"],
		91: ["IN"],
		92: ["PK"],
		93: ["AF"],
		94: ["LK"],
		95: ["MM"],
		98: ["IR"],
		211: ["SS"],
		212: ["MA", "EH"],
		213: ["DZ"],
		216: ["TN"],
		218: ["LY"],
		220: ["GM"],
		221: ["SN"],
		222: ["MR"],
		223: ["ML"],
		224: ["GN"],
		225: ["CI"],
		226: ["BF"],
		227: ["NE"],
		228: ["TG"],
		229: ["BJ"],
		230: ["MU"],
		231: ["LR"],
		232: ["SL"],
		233: ["GH"],
		234: ["NG"],
		235: ["TD"],
		236: ["CF"],
		237: ["CM"],
		238: ["CV"],
		239: ["ST"],
		240: ["GQ"],
		241: ["GA"],
		242: ["CG"],
		243: ["CD"],
		244: ["AO"],
		245: ["GW"],
		246: ["IO"],
		247: ["AC"],
		248: ["SC"],
		249: ["SD"],
		250: ["RW"],
		251: ["ET"],
		252: ["SO"],
		253: ["DJ"],
		254: ["KE"],
		255: ["TZ"],
		256: ["UG"],
		257: ["BI"],
		258: ["MZ"],
		260: ["ZM"],
		261: ["MG"],
		262: ["RE", "YT"],
		263: ["ZW"],
		264: ["NA"],
		265: ["MW"],
		266: ["LS"],
		267: ["BW"],
		268: ["SZ"],
		269: ["KM"],
		290: ["SH", "TA"],
		291: ["ER"],
		297: ["AW"],
		298: ["FO"],
		299: ["GL"],
		350: ["GI"],
		351: ["PT"],
		352: ["LU"],
		353: ["IE"],
		354: ["IS"],
		355: ["AL"],
		356: ["MT"],
		357: ["CY"],
		358: ["FI", "AX"],
		359: ["BG"],
		370: ["LT"],
		371: ["LV"],
		372: ["EE"],
		373: ["MD"],
		374: ["AM"],
		375: ["BY"],
		376: ["AD"],
		377: ["MC"],
		378: ["SM"],
		380: ["UA"],
		381: ["RS"],
		382: ["ME"],
		383: ["XK"],
		385: ["HR"],
		386: ["SI"],
		387: ["BA"],
		389: ["MK"],
		420: ["CZ"],
		421: ["SK"],
		423: ["LI"],
		500: ["FK"],
		501: ["BZ"],
		502: ["GT"],
		503: ["SV"],
		504: ["HN"],
		505: ["NI"],
		506: ["CR"],
		507: ["PA"],
		508: ["PM"],
		509: ["HT"],
		590: [
			"GP",
			"BL",
			"MF"
		],
		591: ["BO"],
		592: ["GY"],
		593: ["EC"],
		594: ["GF"],
		595: ["PY"],
		596: ["MQ"],
		597: ["SR"],
		598: ["UY"],
		599: ["CW", "BQ"],
		670: ["TL"],
		672: ["NF"],
		673: ["BN"],
		674: ["NR"],
		675: ["PG"],
		676: ["TO"],
		677: ["SB"],
		678: ["VU"],
		679: ["FJ"],
		680: ["PW"],
		681: ["WF"],
		682: ["CK"],
		683: ["NU"],
		685: ["WS"],
		686: ["KI"],
		687: ["NC"],
		688: ["TV"],
		689: ["PF"],
		690: ["TK"],
		691: ["FM"],
		692: ["MH"],
		850: ["KP"],
		852: ["HK"],
		853: ["MO"],
		855: ["KH"],
		856: ["LA"],
		880: ["BD"],
		886: ["TW"],
		960: ["MV"],
		961: ["LB"],
		962: ["JO"],
		963: ["SY"],
		964: ["IQ"],
		965: ["KW"],
		966: ["SA"],
		967: ["YE"],
		968: ["OM"],
		970: ["PS"],
		971: ["AE"],
		972: ["IL"],
		973: ["BH"],
		974: ["QA"],
		975: ["BT"],
		976: ["MN"],
		977: ["NP"],
		992: ["TJ"],
		993: ["TM"],
		994: ["AZ"],
		995: ["GE"],
		996: ["KG"],
		998: ["UZ"]
	},
	countries: {
		AC: [
			"247",
			"00",
			"(?:[01589]\\d|[46])\\d{4}",
			[5, 6]
		],
		AD: [
			"376",
			"00",
			"(?:1|6\\d)\\d{7}|[135-9]\\d{5}",
			[
				6,
				8,
				9
			],
			[
				[
					"(\\d{3})(\\d{3})",
					"$1 $2",
					["[135-9]"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["1"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["6"]
				]
			]
		],
		AE: [
			"971",
			"00",
			"(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",
			[
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{3})(\\d{2,9})",
					"$1 $2",
					["60|8"]
				],
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[236]|[479][2-8]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d)(\\d{5})",
					"$1 $2 $3",
					["[479]"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["5"],
					"0$1"
				]
			],
			"0"
		],
		AF: [
			"93",
			"00",
			"[2-7]\\d{8}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[2-7]"],
				"0$1"
			]],
			"0"
		],
		AG: [
			"1",
			"011",
			"(?:268|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([457]\\d{6})$|1",
			"268$1",
			0,
			"268"
		],
		AI: [
			"1",
			"011",
			"(?:264|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2457]\\d{6})$|1",
			"264$1",
			0,
			"264"
		],
		AL: [
			"355",
			"00",
			"(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}",
			[
				6,
				7,
				8,
				9
			],
			[
				[
					"(\\d{3})(\\d{3,4})",
					"$1 $2",
					["80|9"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["4[2-6]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[2358][2-5]|4"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["[23578]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["6"],
					"0$1"
				]
			],
			"0"
		],
		AM: [
			"374",
			"00",
			"(?:[1-489]\\d|55|60|77)\\d{6}",
			[8],
			[
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["[89]0"],
					"0 $1"
				],
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["2|3[12]"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["1|47"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["[3-9]"],
					"0$1"
				]
			],
			"0"
		],
		AO: [
			"244",
			"00",
			"[29]\\d{8}",
			[9],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[29]"]
			]]
		],
		AR: [
			"54",
			"00",
			"(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}",
			[10, 11],
			[
				[
					"(\\d{4})(\\d{2})(\\d{4})",
					"$1 $2-$3",
					[
						"2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])",
						"2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)",
						"2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
						"2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"
					],
					"0$1",
					1
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2-$3",
					["1"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["[68]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2-$3",
					["[23]"],
					"0$1",
					1
				],
				[
					"(\\d)(\\d{4})(\\d{2})(\\d{4})",
					"$2 15-$3-$4",
					[
						"9(?:2[2-469]|3[3-578])",
						"9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))",
						"9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)",
						"9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
						"9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"
					],
					"0$1",
					0,
					"$1 $2 $3-$4"
				],
				[
					"(\\d)(\\d{2})(\\d{4})(\\d{4})",
					"$2 15-$3-$4",
					["91"],
					"0$1",
					0,
					"$1 $2 $3-$4"
				],
				[
					"(\\d{3})(\\d{3})(\\d{5})",
					"$1-$2-$3",
					["8"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{3})(\\d{4})",
					"$2 15-$3-$4",
					["9"],
					"0$1",
					0,
					"$1 $2 $3-$4"
				]
			],
			"0",
			0,
			"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?",
			"9$1"
		],
		AS: [
			"1",
			"011",
			"(?:[58]\\d\\d|684|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([267]\\d{6})$|1",
			"684$1",
			0,
			"684"
		],
		AT: [
			"43",
			"00",
			"1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}",
			[
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				13
			],
			[
				[
					"(\\d)(\\d{3,12})",
					"$1 $2",
					["1(?:11|[2-9])"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})",
					"$1 $2",
					["517"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3,5})",
					"$1 $2",
					["5[079]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3,10})",
					"$1 $2",
					["(?:31|4)6|51|6(?:48|5[0-3579]|[6-9])|7(?:20|32|8)|[89]", "(?:31|4)6|51|6(?:485|5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3,9})",
					"$1 $2",
					["[2-467]|5[2-6]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["5"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4,7})",
					"$1 $2 $3",
					["5"],
					"0$1"
				]
			],
			"0"
		],
		AU: [
			"61",
			"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
			"1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}",
			[
				5,
				6,
				7,
				8,
				9,
				10,
				12
			],
			[
				[
					"(\\d{2})(\\d{3,4})",
					"$1 $2",
					["16"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2,4})",
					"$1 $2 $3",
					["16"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["14|4"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[2378]"],
					"(0$1)"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1(?:30|[89])"]
				]
			],
			"0",
			0,
			"(183[12])|0",
			0,
			0,
			0,
			[
				["(?:(?:241|349)0\\d\\d|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4])|[34]\\d\\d)|91(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79]))))\\d{3}|(?:2(?:[0-26-9]\\d|3[0-8]|4[02-9]|5[0135-9])|3(?:[0-3589]\\d|4[0-578]|6[1-9]|7[0-35-9])|7(?:[013-57-9]\\d|2[0-8])|8(?:55|6[0-8]|[78]\\d|9[02-9]))\\d{6}", [9]],
				["4(?:79[01]|83[0-36-9]|95[0-3])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-47-9])\\d{6}", [9]],
				["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
				["190[0-26]\\d{6}", [10]],
				0,
				0,
				0,
				["163\\d{2,6}", [
					5,
					6,
					7,
					8,
					9
				]],
				["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
				["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [
					6,
					8,
					10,
					12
				]]
			],
			"0011"
		],
		AW: [
			"297",
			"00",
			"(?:[25-79]\\d\\d|800)\\d{4}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[25-9]"]
			]]
		],
		AX: [
			"358",
			"00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))",
			"2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}",
			[
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			0,
			"0",
			0,
			0,
			0,
			0,
			"18",
			0,
			"00"
		],
		AZ: [
			"994",
			"00",
			"365\\d{6}|(?:[124579]\\d|60|88)\\d{7}",
			[9],
			[
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["90"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					[
						"1[28]|2|365|46",
						"1[28]|2|365[45]|46",
						"1[28]|2|365(?:4|5[02])|46"
					],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[13-9]"],
					"0$1"
				]
			],
			"0"
		],
		BA: [
			"387",
			"00",
			"6\\d{8}|(?:[35689]\\d|49|70)\\d{6}",
			[8, 9],
			[
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["6[1-3]|[7-9]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2-$3",
					["[3-5]|6[56]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3 $4",
					["6"],
					"0$1"
				]
			],
			"0"
		],
		BB: [
			"1",
			"011",
			"(?:246|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"246$1",
			0,
			"246"
		],
		BD: [
			"880",
			"00",
			"[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}",
			[
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{4,6})",
					"$1-$2",
					["31[5-8]|[459]1"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3,7})",
					"$1-$2",
					["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:[15]|28|4[14])|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3,6})",
					"$1-$2",
					["[13-9]|2[23]"],
					"0$1"
				],
				[
					"(\\d)(\\d{7,8})",
					"$1-$2",
					["2"],
					"0$1"
				]
			],
			"0"
		],
		BE: [
			"32",
			"00",
			"4\\d{8}|[1-9]\\d{7}",
			[8, 9],
			[
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["(?:80|9)0"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[239]|4[23]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[15-8]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["4"],
					"0$1"
				]
			],
			"0"
		],
		BF: [
			"226",
			"00",
			"[024-7]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[024-7]"]
			]]
		],
		BG: [
			"359",
			"00",
			"00800\\d{7}|[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",
			[
				6,
				7,
				8,
				9,
				12
			],
			[
				[
					"(\\d)(\\d)(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["2"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["43[1-6]|70[1-9]"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2,3})",
					"$1 $2 $3",
					["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["(?:70|8)0"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{2})",
					"$1 $2 $3",
					["43[1-7]|7"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[48]|9[08]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["9"],
					"0$1"
				]
			],
			"0"
		],
		BH: [
			"973",
			"00",
			"[136-9]\\d{7}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[13679]|8[02-4679]"]
			]]
		],
		BI: [
			"257",
			"00",
			"(?:[267]\\d|31)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[2367]"]
			]]
		],
		BJ: [
			"229",
			"00",
			"(?:01\\d|8)\\d{7}",
			[8, 10],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"]
			], [
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4 $5",
				["0"]
			]]
		],
		BL: [
			"590",
			"00",
			"7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}",
			[9],
			0,
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["(?:59(?:0(?:2[7-9]|3[3-7]|5[12]|87)|87\\d)|80[6-9]\\d\\d)\\d{4}"],
				["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"],
				["80[0-5]\\d{6}"],
				["8[129]\\d{7}"],
				0,
				0,
				0,
				0,
				["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]
			]
		],
		BM: [
			"1",
			"011",
			"(?:441|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"441$1",
			0,
			"441"
		],
		BN: [
			"673",
			"00",
			"[2-578]\\d{6}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[2-578]"]
			]]
		],
		BO: [
			"591",
			"00(?:1\\d)?",
			"8001\\d{5}|(?:[2-467]\\d|50)\\d{6}",
			[8, 9],
			[
				[
					"(\\d)(\\d{7})",
					"$1 $2",
					["[235]|4[46]"]
				],
				[
					"(\\d{8})",
					"$1",
					["[67]"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["8"]
				]
			],
			"0",
			0,
			"0(1\\d)?"
		],
		BQ: [
			"599",
			"00",
			"(?:[34]1|7\\d)\\d{5}",
			[7],
			0,
			0,
			0,
			0,
			0,
			0,
			"[347]"
		],
		BR: [
			"55",
			"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)",
			"[1-467]\\d{9,10}|55[0-46-9]\\d{8}|[34]\\d{7}|55\\d{7,8}|(?:5[0-46-9]|[89]\\d)\\d{7,9}",
			[
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{4})(\\d{4})",
					"$1-$2",
					["300|4(?:0[02]|37|86)", "300|4(?:0(?:0|20)|370|864)"]
				],
				[
					"(\\d{3})(\\d{2,3})(\\d{4})",
					"$1 $2 $3",
					["(?:[358]|90)0"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2-$3",
					["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],
					"($1)"
				],
				[
					"(\\d{2})(\\d{5})(\\d{4})",
					"$1 $2-$3",
					["[16][1-9]|[2-57-9]"],
					"($1)"
				]
			],
			"0",
			0,
			"(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?",
			"$2"
		],
		BS: [
			"1",
			"011",
			"(?:242|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([3-8]\\d{6})$|1",
			"242$1",
			0,
			"242"
		],
		BT: [
			"975",
			"00",
			"[178]\\d{7}|[2-8]\\d{6}",
			[7, 8],
			[[
				"(\\d)(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[2-6]|7[246]|8[2-4]"]
			], [
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["1[67]|[78]"]
			]]
		],
		BW: [
			"267",
			"00",
			"(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}",
			[
				7,
				8,
				10
			],
			[
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["90"]
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[24-6]|3[15-9]"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[37]"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["0"]
				],
				[
					"(\\d{3})(\\d{4})(\\d{3})",
					"$1 $2 $3",
					["8"]
				]
			]
		],
		BY: [
			"375",
			"810",
			"(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",
			[
				6,
				7,
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{3})(\\d{3})",
					"$1 $2",
					["800"],
					"8 $1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2,4})",
					"$1 $2 $3",
					["800"],
					"8 $1"
				],
				[
					"(\\d{4})(\\d{2})(\\d{3})",
					"$1 $2-$3",
					["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],
					"8 0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2-$3-$4",
					["1(?:[56]|7[467])|2[1-3]"],
					"8 0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2-$3-$4",
					["[1-4]"],
					"8 0$1"
				],
				[
					"(\\d{3})(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["[89]"],
					"8 $1"
				]
			],
			"8",
			0,
			"0|80?",
			0,
			0,
			0,
			0,
			"8~10"
		],
		BZ: [
			"501",
			"00",
			"(?:0800\\d|[2-8])\\d{6}",
			[7, 11],
			[[
				"(\\d{3})(\\d{4})",
				"$1-$2",
				["[2-8]"]
			], [
				"(\\d)(\\d{3})(\\d{4})(\\d{3})",
				"$1-$2-$3-$4",
				["0"]
			]]
		],
		CA: [
			"1",
			"011",
			"[2-9]\\d{9}|3\\d{6}",
			[7, 10],
			0,
			"1",
			0,
			0,
			0,
			0,
			0,
			[
				["(?:2(?:04|[23]6|[48]9|5[07]|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|7[39])|9(?:0[25]|42))[2-9]\\d{6}", [10]],
				["", [10]],
				["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", [10]],
				["900[2-9]\\d{6}", [10]],
				["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:2[125-9]|3[23]|44|66|77|88)|6(?:22|33))[2-9]\\d{6}", [10]],
				0,
				["310\\d{4}", [7]],
				0,
				["600[2-9]\\d{6}", [10]]
			]
		],
		CC: [
			"61",
			"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
			"1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}",
			[
				6,
				7,
				8,
				9,
				10,
				12
			],
			0,
			"0",
			0,
			"([59]\\d{7})$|0",
			"8$1",
			0,
			0,
			[
				["8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}", [9]],
				["4(?:79[01]|83[0-36-9]|95[0-3])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-47-9])\\d{6}", [9]],
				["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
				["190[0-26]\\d{6}", [10]],
				0,
				0,
				0,
				0,
				["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
				["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [
					6,
					8,
					10,
					12
				]]
			],
			"0011"
		],
		CD: [
			"243",
			"00",
			"(?:(?:[189]|5\\d)\\d|2)\\d{7}|[1-68]\\d{6}",
			[
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["88"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["[1-6]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["5"],
					"0$1"
				]
			],
			"0"
		],
		CF: [
			"236",
			"00",
			"8776\\d{4}|(?:[27]\\d|61)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[26-8]"]
			]]
		],
		CG: [
			"242",
			"00",
			"222\\d{6}|(?:0\\d|80)\\d{7}",
			[9],
			[[
				"(\\d)(\\d{4})(\\d{4})",
				"$1 $2 $3",
				["8"]
			], [
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[02]"]
			]]
		],
		CH: [
			"41",
			"00",
			"8\\d{11}|[2-9]\\d{8}",
			[9, 12],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8[047]|90"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[2-79]|81"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4 $5",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		CI: [
			"225",
			"00",
			"[02]\\d{9}",
			[10],
			[[
				"(\\d{2})(\\d{2})(\\d)(\\d{5})",
				"$1 $2 $3 $4",
				["2"]
			], [
				"(\\d{2})(\\d{2})(\\d{2})(\\d{4})",
				"$1 $2 $3 $4",
				["0"]
			]]
		],
		CK: [
			"682",
			"00",
			"[2-578]\\d{4}",
			[5],
			[[
				"(\\d{2})(\\d{3})",
				"$1 $2",
				["[2-578]"]
			]]
		],
		CL: [
			"56",
			"(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0",
			"12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}",
			[
				9,
				10,
				11
			],
			[
				[
					"(\\d{5})(\\d{4})",
					"$1 $2",
					["219", "2196"],
					"($1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["60|809"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["44"]
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["2[1-36]"],
					"($1)"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["9(?:10|[2-9])"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-8]|[1-9])"],
					"($1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["60|8"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3 $4",
					["60"]
				]
			]
		],
		CM: [
			"237",
			"00",
			"[26]\\d{8}|88\\d{6,7}",
			[8, 9],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["88"]
			], [
				"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4 $5",
				["[26]|88"]
			]]
		],
		CN: [
			"86",
			"00|1(?:[12]\\d|79)\\d\\d00",
			"(?:(?:1[03-689]|2\\d)\\d\\d|6)\\d{8}|1\\d{10}|[126]\\d{6}(?:\\d(?:\\d{2})?)?|86\\d{5,6}|(?:[3-579]\\d|8[0-57-9])\\d{5,9}",
			[
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{2})(\\d{5,6})",
					"$1 $2",
					[
						"(?:10|2[0-57-9])[19]|3(?:[157]|35|49|9[1-68])|4(?:1[124-9]|2[179]|6[47-9]|7|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:07|1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3|4[13]|5[1-5]|7[0-79]|9[0-35-9])|(?:4[35]|59|85)[1-9]",
						"(?:10|2[0-57-9])(?:1[02]|9[56])|8078|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))1",
						"10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|80781|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))12",
						"10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|807812|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123",
						"10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5,6})",
					"$1 $2",
					[
						"3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]",
						"(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]",
						"85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])",
						"85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["(?:4|80)0"]
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					[
						"10|2(?:[02-57-9]|1[1-9])",
						"10|2(?:[02-57-9]|1[1-9])",
						"10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"
					],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{7,8})",
					"$1 $2",
					["9"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["80"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[3-578]"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["1[3-9]"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3 $4",
					["[12]"],
					"0$1",
					1
				]
			],
			"0",
			0,
			"(1(?:[12]\\d|79)\\d\\d)|0",
			0,
			0,
			0,
			0,
			"00"
		],
		CO: [
			"57",
			"00(?:4(?:[14]4|56)|[579])",
			"(?:46|60\\d\\d)\\d{6}|(?:1\\d|[39])\\d{9}",
			[
				8,
				10,
				11
			],
			[
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["46"]
				],
				[
					"(\\d{3})(\\d{7})",
					"$1 $2",
					["6|90"],
					"($1)"
				],
				[
					"(\\d{3})(\\d{7})",
					"$1 $2",
					["3[0-357]|9[14]"]
				],
				[
					"(\\d)(\\d{3})(\\d{7})",
					"$1-$2-$3",
					["1"],
					"0$1",
					0,
					"$1 $2 $3"
				]
			],
			"0",
			0,
			"0([3579]|4(?:[14]4|56))?"
		],
		CR: [
			"506",
			"00",
			"(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}",
			[8, 10],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[2-7]|8[3-9]"]
			], [
				"(\\d{3})(\\d{3})(\\d{4})",
				"$1-$2-$3",
				["[89]"]
			]],
			0,
			0,
			"(19(?:0[0-2468]|1[09]|20|66|77|99))"
		],
		CU: [
			"53",
			"119",
			"(?:[2-7]|8\\d\\d)\\d{7}|[2-47]\\d{6}|[34]\\d{5}",
			[
				6,
				7,
				8,
				10
			],
			[
				[
					"(\\d{2})(\\d{4,6})",
					"$1 $2",
					["2[1-4]|[34]"],
					"(0$1)"
				],
				[
					"(\\d)(\\d{6,7})",
					"$1 $2",
					["7"],
					"(0$1)"
				],
				[
					"(\\d)(\\d{7})",
					"$1 $2",
					["[56]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{7})",
					"$1 $2",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		CV: [
			"238",
			"0",
			"(?:[2-59]\\d\\d|800)\\d{4}",
			[7],
			[[
				"(\\d{3})(\\d{2})(\\d{2})",
				"$1 $2 $3",
				["[2-589]"]
			]]
		],
		CW: [
			"599",
			"00",
			"(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",
			[7, 8],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[3467]"]
			], [
				"(\\d)(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["9[4-8]"]
			]],
			0,
			0,
			0,
			0,
			0,
			"[69]"
		],
		CX: [
			"61",
			"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
			"1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}",
			[
				6,
				7,
				8,
				9,
				10,
				12
			],
			0,
			"0",
			0,
			"([59]\\d{7})$|0",
			"8$1",
			0,
			0,
			[
				["8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}", [9]],
				["4(?:79[01]|83[0-36-9]|95[0-3])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-47-9])\\d{6}", [9]],
				["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
				["190[0-26]\\d{6}", [10]],
				0,
				0,
				0,
				0,
				["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
				["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [
					6,
					8,
					10,
					12
				]]
			],
			"0011"
		],
		CY: [
			"357",
			"00",
			"(?:[279]\\d|[58]0)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{6})",
				"$1 $2",
				["[257-9]"]
			]]
		],
		CZ: [
			"420",
			"00",
			"(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}",
			[
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[2-8]|9[015-7]"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})(\\d{2})",
					"$1 $2 $3 $4",
					["96"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["9"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["9"]
				]
			]
		],
		DE: [
			"49",
			"00",
			"[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}",
			[
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				13,
				14,
				15
			],
			[
				[
					"(\\d{2})(\\d{3,13})",
					"$1 $2",
					["3[02]|40|[68]9"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3,12})",
					"$1 $2",
					["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1", "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{2,11})",
					"$1 $2",
					["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["138"],
					"0$1"
				],
				[
					"(\\d{5})(\\d{2,10})",
					"$1 $2",
					["3"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5,11})",
					"$1 $2",
					["181"],
					"0$1"
				],
				[
					"(\\d{3})(\\d)(\\d{4,10})",
					"$1 $2 $3",
					["1(?:3|80)|9"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{7,8})",
					"$1 $2",
					["1[67]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{7,12})",
					"$1 $2",
					["8"],
					"0$1"
				],
				[
					"(\\d{5})(\\d{6})",
					"$1 $2",
					[
						"185",
						"1850",
						"18500"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["7"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{7})",
					"$1 $2",
					["18[68]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{7})",
					"$1 $2",
					["15[1279]"],
					"0$1"
				],
				[
					"(\\d{5})(\\d{6})",
					"$1 $2",
					["15[03568]", "15(?:[0568]|3[13])"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{8})",
					"$1 $2",
					["18"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{7,8})",
					"$1 $2 $3",
					["1(?:6[023]|7)"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{2})(\\d{7})",
					"$1 $2 $3",
					["15[279]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{8})",
					"$1 $2 $3",
					["15"],
					"0$1"
				]
			],
			"0"
		],
		DJ: [
			"253",
			"00",
			"(?:2\\d|77)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[27]"]
			]]
		],
		DK: [
			"45",
			"00",
			"[2-9]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[2-9]"]
			]]
		],
		DM: [
			"1",
			"011",
			"(?:[58]\\d\\d|767|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-7]\\d{6})$|1",
			"767$1",
			0,
			"767"
		],
		DO: [
			"1",
			"011",
			"(?:[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			0,
			0,
			0,
			"8001|8[024]9"
		],
		DZ: [
			"213",
			"00",
			"(?:[1-4]|[5-79]\\d|80)\\d{7}",
			[8, 9],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[1-4]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["9"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[5-8]"],
					"0$1"
				]
			],
			"0"
		],
		EC: [
			"593",
			"00",
			"1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}",
			[
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2-$3",
					["[2-7]"],
					"(0$1)",
					0,
					"$1-$2-$3"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["9"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["1"]
				]
			],
			"0"
		],
		EE: [
			"372",
			"00",
			"8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}",
			[
				7,
				8,
				10
			],
			[
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]
				],
				[
					"(\\d{4})(\\d{3,4})",
					"$1 $2",
					["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["7"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8"]
				]
			]
		],
		EG: [
			"20",
			"00",
			"[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d)(\\d{7,8})",
					"$1 $2",
					["[23]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{6,7})",
					"$1 $2",
					["1[35]|[4-6]|8[2468]|9[235-7]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{8})",
					"$1 $2",
					["1"],
					"0$1"
				]
			],
			"0"
		],
		EH: [
			"212",
			"00",
			"[5-8]\\d{8}",
			[9],
			0,
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["528[89]\\d{5}"],
				["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[016-8]\\d|2[0-8]|5[0-5]))\\d{6}"],
				["80[0-7]\\d{6}"],
				["89\\d{7}"],
				0,
				0,
				0,
				0,
				["(?:592(?:4[0-2]|93)|80[89]\\d\\d)\\d{4}"]
			]
		],
		ER: [
			"291",
			"00",
			"[178]\\d{6}",
			[7],
			[[
				"(\\d)(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[178]"],
				"0$1"
			]],
			"0"
		],
		ES: [
			"34",
			"00",
			"[5-9]\\d{8}",
			[9],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[89]00"]
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[5-9]"]
			]]
		],
		ET: [
			"251",
			"00",
			"(?:11|[2-579]\\d)\\d{7}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[1-579]"],
				"0$1"
			]],
			"0"
		],
		FI: [
			"358",
			"00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))",
			"[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}",
			[
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{5})",
					"$1",
					["20[2-59]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3,7})",
					"$1 $2",
					["(?:[1-3]0|[68])0|70[07-9]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4,8})",
					"$1 $2",
					["[14]|2[09]|50|7[135]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{6,10})",
					"$1 $2",
					["7"],
					"0$1"
				],
				[
					"(\\d)(\\d{4,9})",
					"$1 $2",
					["(?:19|[2568])[1-8]|3(?:0[1-9]|[1-9])|9"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			"1[03-79]|[2-9]",
			0,
			"00"
		],
		FJ: [
			"679",
			"0(?:0|52)",
			"45\\d{5}|(?:0800\\d|[235-9])\\d{6}",
			[7, 11],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[235-9]|45"]
			], [
				"(\\d{4})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["0"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		FK: [
			"500",
			"00",
			"[2-7]\\d{4}",
			[5]
		],
		FM: [
			"691",
			"00",
			"(?:[39]\\d\\d|820)\\d{4}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[389]"]
			]]
		],
		FO: [
			"298",
			"00",
			"[2-9]\\d{5}",
			[6],
			[[
				"(\\d{6})",
				"$1",
				["[2-9]"]
			]],
			0,
			0,
			"(10(?:01|[12]0|88))"
		],
		FR: [
			"33",
			"00",
			"[1-9]\\d{8}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"],
				"0 $1"
			], [
				"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4 $5",
				["[1-79]"],
				"0$1"
			]],
			"0"
		],
		GA: [
			"241",
			"00",
			"(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}",
			[7, 8],
			[
				[
					"(\\d)(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[2-7]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["0"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["11|[67]"],
					"0$1"
				]
			],
			0,
			0,
			"0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})",
			"$1"
		],
		GB: [
			"44",
			"00",
			"[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",
			[
				7,
				9,
				10
			],
			[
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					[
						"800",
						"8001",
						"80011",
						"800111",
						"8001111"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3",
					[
						"845",
						"8454",
						"84546",
						"845464"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{6})",
					"$1 $2",
					["800"],
					"0$1"
				],
				[
					"(\\d{5})(\\d{4,5})",
					"$1 $2",
					[
						"1(?:38|5[23]|69|76|94)",
						"1(?:(?:38|69)7|5(?:24|39)|768|946)",
						"1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"
					],
					"0$1"
				],
				[
					"(\\d{4})(\\d{5,6})",
					"$1 $2",
					["1(?:[2-69][02-9]|[78])"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{6})",
					"$1 $2",
					["7"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[1389]"],
					"0$1"
				]
			],
			"0",
			0,
			"0|180020",
			0,
			0,
			0,
			[
				["(?:1(?:1(?:3(?:[0-58]\\d\\d|73[0-5])|4(?:(?:[0-5]\\d|70)\\d|69[7-9])|(?:(?:5[0-26-9]|[78][0-49])\\d|6(?:[0-4]\\d|5[01]))\\d)|(?:2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d|1(?:[0-7]\\d|8[0-3]))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d)\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}", [9, 10]],
				["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}", [10]],
				["80[08]\\d{7}|800\\d{6}|8001111"],
				["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d", [7, 10]],
				["70\\d{8}", [10]],
				0,
				["(?:3[0347]|55)\\d{8}", [10]],
				["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]],
				["56\\d{8}", [10]]
			],
			0,
			" x"
		],
		GD: [
			"1",
			"011",
			"(?:473|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"473$1",
			0,
			"473"
		],
		GE: [
			"995",
			"00",
			"(?:[3-57]\\d\\d|800)\\d{6}",
			[9],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["70"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["32"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[57]"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[348]"],
					"0$1"
				]
			],
			"0"
		],
		GF: [
			"594",
			"00",
			"(?:694\\d|7093)\\d{5}|(?:59|[89]\\d)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[5-7]|80[6-9]|9[47]"],
				"0$1"
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[89]"],
				"0$1"
			]],
			"0"
		],
		GG: [
			"44",
			"00",
			"(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",
			[
				7,
				9,
				10
			],
			0,
			"0",
			0,
			"([25-9]\\d{5})$|0|180020",
			"1481$1",
			0,
			0,
			[
				["1481[25-9]\\d{5}", [10]],
				["7(?:(?:781|839)\\d|911[17])\\d{5}", [10]],
				["80[08]\\d{7}|800\\d{6}|8001111"],
				["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d", [7, 10]],
				["70\\d{8}", [10]],
				0,
				["(?:3[0347]|55)\\d{8}", [10]],
				["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]],
				["56\\d{8}", [10]]
			]
		],
		GH: [
			"233",
			"00",
			"[235]\\d{8}|800\\d{5,6}",
			[8, 9],
			[[
				"(\\d{3})(\\d{5})",
				"$1 $2",
				["8"],
				"0$1"
			], [
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[2358]"],
				"0$1"
			]],
			"0"
		],
		GI: [
			"350",
			"00",
			"(?:[25]\\d|60)\\d{6}",
			[8],
			[[
				"(\\d{3})(\\d{5})",
				"$1 $2",
				["2"]
			]]
		],
		GL: [
			"299",
			"00",
			"(?:19|[2-689]\\d|70)\\d{4}",
			[6],
			[[
				"(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3",
				["19|[2-9]"]
			]]
		],
		GM: [
			"220",
			"00",
			"[2-9]\\d{6}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[2-9]"]
			]]
		],
		GN: [
			"224",
			"00",
			"722\\d{6}|(?:3|6\\d)\\d{7}",
			[8, 9],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["3"]
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[67]"]
			]]
		],
		GP: [
			"590",
			"00",
			"7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[5-79]|80[6-9]"],
				"0$1"
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"],
				"0$1"
			]],
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["(?:59(?:0(?:0[1-68]|[14][0-24-9]|2[0-68]|3[1-9]|5[3-579]|[68][0-689]|7[08]|9\\d)|87\\d)|80[6-9]\\d\\d)\\d{4}"],
				["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"],
				["80[0-5]\\d{6}"],
				["8[129]\\d{7}"],
				0,
				0,
				0,
				0,
				["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]
			]
		],
		GQ: [
			"240",
			"00",
			"222\\d{6}|(?:3\\d|55|[89]0)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[235]"]
			], [
				"(\\d{3})(\\d{6})",
				"$1 $2",
				["[89]"]
			]]
		],
		GR: [
			"30",
			"00",
			"5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}",
			[
				10,
				11,
				12
			],
			[
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["21|7"]
				],
				[
					"(\\d{4})(\\d{6})",
					"$1 $2",
					["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[2689]"]
				],
				[
					"(\\d{3})(\\d{3,4})(\\d{5})",
					"$1 $2 $3",
					["8"]
				]
			]
		],
		GT: [
			"502",
			"00",
			"80\\d{6}|(?:1\\d{3}|[2-7])\\d{7}",
			[8, 11],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[2-8]"]
			], [
				"(\\d{4})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["1"]
			]]
		],
		GU: [
			"1",
			"011",
			"(?:[58]\\d\\d|671|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"671$1",
			0,
			"671"
		],
		GW: [
			"245",
			"00",
			"[49]\\d{8}|4\\d{6}",
			[7, 9],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["40"]
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[49]"]
			]]
		],
		GY: [
			"592",
			"001",
			"(?:[2-8]\\d{3}|9008)\\d{3}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[2-9]"]
			]]
		],
		HK: [
			"852",
			"00(?:30|5[09]|[126-9]?)",
			"8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}",
			[
				5,
				6,
				7,
				8,
				9,
				11
			],
			[
				[
					"(\\d{3})(\\d{2,5})",
					"$1 $2",
					["900", "9003"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["9"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		HN: [
			"504",
			"00",
			"8\\d{10}|[237-9]\\d{7}",
			[8, 11],
			[[
				"(\\d{4})(\\d{4})",
				"$1-$2",
				["[237-9]"]
			]]
		],
		HR: [
			"385",
			"00",
			"[2-69]\\d{8}|80\\d{5,7}|[1-79]\\d{7}|6\\d{6}",
			[
				7,
				8,
				9
			],
			[
				[
					"(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["6[01]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2,3})",
					"$1 $2 $3",
					["8"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{3})",
					"$1 $2 $3",
					["1"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["6|7[245]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["9"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[2-57]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		HT: [
			"509",
			"00",
			"[2-589]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{4})",
				"$1 $2 $3",
				["[2-589]"]
			]]
		],
		HU: [
			"36",
			"00",
			"[235-7]\\d{8}|[1-9]\\d{7}",
			[8, 9],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"(06 $1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"],
					"(06 $1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[2-9]"],
					"06 $1"
				]
			],
			"06"
		],
		ID: [
			"62",
			"00[89]",
			"00[1-9]\\d{9,14}|(?:[1-36]|8\\d{5})\\d{6}|00\\d{9}|[1-9]\\d{8,10}|[2-9]\\d{7}",
			[
				7,
				8,
				9,
				10,
				11,
				12,
				13,
				14,
				15,
				16,
				17
			],
			[
				[
					"(\\d)(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["15"]
				],
				[
					"(\\d{2})(\\d{5,9})",
					"$1 $2",
					["2[124]|[36]1"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{5,7})",
					"$1 $2",
					["800"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5,8})",
					"$1 $2",
					["[2-79]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{3,4})(\\d{3})",
					"$1-$2-$3",
					["8[1-35-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{6,8})",
					"$1 $2",
					["1"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["804"],
					"0$1"
				],
				[
					"(\\d{3})(\\d)(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["80"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})(\\d{4,5})",
					"$1-$2-$3",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		IE: [
			"353",
			"00",
			"(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}",
			[
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["2[24-9]|47|58|6[237-9]|9[35-9]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["[45]0"],
					"(0$1)"
				],
				[
					"(\\d)(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[2569]|4[1-69]|7[14]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["70"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["81"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[78]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1"]
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["4"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3 $4",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		IL: [
			"972",
			"0(?:0|1[2-9])",
			"1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",
			[
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{4})(\\d{3})",
					"$1-$2",
					["125"]
				],
				[
					"(\\d{4})(\\d{2})(\\d{2})",
					"$1-$2-$3",
					["121"]
				],
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["[2-489]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["[57]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1-$2-$3",
					["12"]
				],
				[
					"(\\d{4})(\\d{6})",
					"$1-$2",
					["159"]
				],
				[
					"(\\d)(\\d{3})(\\d{3})(\\d{3})",
					"$1-$2-$3-$4",
					["1[7-9]"]
				],
				[
					"(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})",
					"$1-$2 $3-$4",
					["15"]
				]
			],
			"0"
		],
		IM: [
			"44",
			"00",
			"1624\\d{6}|(?:[3578]\\d|90)\\d{8}",
			[10],
			0,
			"0",
			0,
			"([25-8]\\d{5})$|0|180020",
			"1624$1",
			0,
			"74576|(?:16|7[56])24"
		],
		IN: [
			"91",
			"00",
			"(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}",
			[
				8,
				9,
				10,
				11,
				12,
				13
			],
			[
				[
					"(\\d{8})",
					"$1",
					[
						"5(?:0|2[23]|3[03]|[67]1|88)",
						"5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)",
						"5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"
					],
					0,
					1
				],
				[
					"(\\d{4})(\\d{4,5})",
					"$1 $2",
					["180", "1800"],
					0,
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["140"],
					0,
					1
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					[
						"11|2[02]|33|4[04]|79[1-7]|80[2-46]",
						"11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])",
						"11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"
					],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					[
						"1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]",
						"1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]",
						"1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"
					],
					"0$1",
					1
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					[
						"1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807",
						"1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]",
						"1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|8(?:28[235-7]|3))|73179|807(?:1|9[1-3])|(?:1552|6(?:(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689])\\d|8(?:[14-6]\\d|2[0-79]))|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"
					],
					"0$1",
					1
				],
				[
					"(\\d{5})(\\d{5})",
					"$1 $2",
					["16|[6-9]"],
					"0$1",
					1
				],
				[
					"(\\d{4})(\\d{2,4})(\\d{4})",
					"$1 $2 $3",
					["18[06]", "18[06]0"],
					0,
					1
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["18"],
					0,
					1
				]
			],
			"0"
		],
		IO: [
			"246",
			"00",
			"3\\d{6}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["3"]
			]]
		],
		IQ: [
			"964",
			"00",
			"(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[2-6]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["7"],
					"0$1"
				]
			],
			"0"
		],
		IR: [
			"98",
			"00",
			"[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}",
			[
				4,
				5,
				6,
				7,
				10
			],
			[
				[
					"(\\d{4,5})",
					"$1",
					["96"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4,5})",
					"$1 $2",
					["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["9"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[1-8]"],
					"0$1"
				]
			],
			"0"
		],
		IS: [
			"354",
			"00|1(?:0(?:01|[12]0)|100)",
			"(?:38\\d|[4-9])\\d{6}",
			[7, 9],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[4-9]"]
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["3"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		IT: [
			"39",
			"00",
			"0\\d{5,11}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:43|55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?",
			[
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{2})(\\d{4,6})",
					"$1 $2",
					["0[26]"]
				],
				[
					"(\\d{3})(\\d{3,6})",
					"$1 $2",
					["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]
				],
				[
					"(\\d{4})(\\d{2,6})",
					"$1 $2",
					["0(?:[13-579][2-46-8]|8[236-8])"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["894"]
				],
				[
					"(\\d{2})(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["0[26]|5"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["1(?:44|[679])|[378]|43"]
				],
				[
					"(\\d{3})(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["0[13-57-9][0159]|14"]
				],
				[
					"(\\d{2})(\\d{4})(\\d{5})",
					"$1 $2 $3",
					["0[26]"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["0"]
				],
				[
					"(\\d{3})(\\d{4})(\\d{4,5})",
					"$1 $2 $3",
					["[03]"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				["0(?:669[0-79]\\d{1,6}|831\\d{2,8})|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[2356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}"],
				["3[2-9]\\d{7,8}|(?:31|43)\\d{8}", [9, 10]],
				["80(?:0\\d{3}|3)\\d{3}", [6, 9]],
				["(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}", [
					6,
					8,
					9,
					10
				]],
				["1(?:78\\d|99)\\d{6}", [9, 10]],
				["3[2-8]\\d{9,10}", [11, 12]],
				0,
				0,
				["55\\d{8}", [10]],
				["84(?:[08]\\d{3}|[17])\\d{3}", [6, 9]]
			]
		],
		JE: [
			"44",
			"00",
			"1534\\d{6}|(?:[3578]\\d|90)\\d{8}",
			[10],
			0,
			"0",
			0,
			"([0-24-8]\\d{5})$|0|180020",
			"1534$1",
			0,
			0,
			[
				["1534[0-24-8]\\d{5}"],
				["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97\\d))\\d{5}"],
				["80(?:07(?:35|81)|8901)\\d{4}"],
				["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"],
				["701511\\d{4}"],
				0,
				["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"],
				["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}"],
				["56\\d{8}"]
			]
		],
		JM: [
			"1",
			"011",
			"(?:[58]\\d\\d|658|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			0,
			0,
			0,
			"658|876"
		],
		JO: [
			"962",
			"00",
			"(?:(?:[2689]|7\\d)\\d|32|427|53)\\d{6}",
			[8, 9],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[2356]|87"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{5,6})",
					"$1 $2",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1 $2",
					["70"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[47]"],
					"0$1"
				]
			],
			"0"
		],
		JP: [
			"81",
			"010",
			"00[1-9]\\d{6,14}|[25-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",
			[
				8,
				9,
				10,
				11,
				12,
				13,
				14,
				15,
				16,
				17
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1-$2-$3",
					["(?:12|57|99)0"],
					"0$1"
				],
				[
					"(\\d{4})(\\d)(\\d{4})",
					"$1-$2-$3",
					[
						"1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])",
						"1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]",
						"1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"
					],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["60"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1-$2-$3",
					["3|4(?:2[09]|7[01])|6[1-9]", "3|4(?:2(?:0|9[02-69])|7(?:0[019]|1))|6[1-9]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					[
						"1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])",
						"1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]",
						"1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"
					],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{4})",
					"$1-$2-$3",
					["[14]|[289][2-9]|5[3-9]|7[2-4679]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["800"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1-$2-$3",
					["[25-9]"],
					"0$1"
				]
			],
			"0",
			0,
			"(000[2569]\\d{4,6})$|(?:(?:003768)0?)|0",
			"$1"
		],
		KE: [
			"254",
			"000",
			"(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}",
			[
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{5,7})",
					"$1 $2",
					["[24-6]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{6})",
					"$1 $2",
					["[17]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				]
			],
			"0"
		],
		KG: [
			"996",
			"00",
			"8\\d{9}|[235-9]\\d{8}",
			[9, 10],
			[
				[
					"(\\d{4})(\\d{5})",
					"$1 $2",
					["3(?:1[346]|[24-79])"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[235-79]|88"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d)(\\d{2,3})",
					"$1 $2 $3 $4",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		KH: [
			"855",
			"00[14-9]",
			"1\\d{9}|[1-9]\\d{7,8}",
			[
				8,
				9,
				10
			],
			[[
				"(\\d{2})(\\d{3})(\\d{3,4})",
				"$1 $2 $3",
				["[1-9]"],
				"0$1"
			], [
				"(\\d{4})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["1"]
			]],
			"0"
		],
		KI: [
			"686",
			"00",
			"(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",
			[5, 8],
			0,
			"0"
		],
		KM: [
			"269",
			"00",
			"[3478]\\d{6}",
			[7],
			[[
				"(\\d{3})(\\d{2})(\\d{2})",
				"$1 $2 $3",
				["[3478]"]
			]]
		],
		KN: [
			"1",
			"011",
			"(?:[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-7]\\d{6})$|1",
			"869$1",
			0,
			"869"
		],
		KP: [
			"850",
			"00|99",
			"85\\d{6}|(?:19\\d|[2-7])\\d{7}",
			[8, 10],
			[
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[2-7]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"0$1"
				]
			],
			"0"
		],
		KR: [
			"82",
			"00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))",
			"00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}",
			[
				5,
				6,
				8,
				9,
				10,
				11,
				12,
				13,
				14
			],
			[
				[
					"(\\d{2})(\\d{3,4})",
					"$1-$2",
					["(?:3[1-3]|[46][1-4]|5[1-5])1"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{4})",
					"$1-$2",
					["1"]
				],
				[
					"(\\d)(\\d{3,4})(\\d{4})",
					"$1-$2-$3",
					["2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1-$2-$3",
					["[36]0|8"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3,4})(\\d{4})",
					"$1-$2-$3",
					["[1346]|5[1-5]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1-$2-$3",
					["[57]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{5})(\\d{4})",
					"$1-$2-$3",
					["5"],
					"0$1"
				]
			],
			"0",
			0,
			"0(8(?:[1-46-8]|5\\d\\d))?"
		],
		KW: [
			"965",
			"00",
			"18\\d{5}|(?:[2569]\\d|41)\\d{6}",
			[7, 8],
			[[
				"(\\d{4})(\\d{3,4})",
				"$1 $2",
				["[169]|2(?:[235]|4[1-35-9])|52"]
			], [
				"(\\d{3})(\\d{5})",
				"$1 $2",
				["[245]"]
			]]
		],
		KY: [
			"1",
			"011",
			"(?:345|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"345$1",
			0,
			"345"
		],
		KZ: [
			"7",
			"810",
			"8\\d{13}|[78]\\d{9}",
			[10, 14],
			0,
			"8",
			0,
			0,
			0,
			0,
			"7",
			0,
			"8~10"
		],
		LA: [
			"856",
			"00",
			"[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["2[13]|3[14]|[4-8]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3 $4",
					["3"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["[23]"],
					"0$1"
				]
			],
			"0"
		],
		LB: [
			"961",
			"00",
			"[27-9]\\d{7}|[13-9]\\d{6}",
			[7, 8],
			[[
				"(\\d)(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[13-69]|7(?:[2-57]|62|8[0-6]|9[04-9])|8[02-9]"],
				"0$1"
			], [
				"(\\d{2})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[27-9]"]
			]],
			"0"
		],
		LC: [
			"1",
			"011",
			"(?:[58]\\d\\d|758|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-8]\\d{6})$|1",
			"758$1",
			0,
			"758"
		],
		LI: [
			"423",
			"00",
			"[68]\\d{8}|(?:[2378]\\d|90)\\d{5}",
			[7, 9],
			[
				[
					"(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3",
					["[2379]|8(?:0[09]|7)", "[2379]|8(?:0(?:02|9)|7)"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["8"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["69"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["6"]
				]
			],
			"0",
			0,
			"(1001)|0"
		],
		LK: [
			"94",
			"00",
			"[1-9]\\d{8}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["7"],
				"0$1"
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[1-689]"],
				"0$1"
			]],
			"0"
		],
		LR: [
			"231",
			"00",
			"(?:[2457]\\d|33|88)\\d{7}|(?:2\\d|[4-6])\\d{6}",
			[
				7,
				8,
				9
			],
			[
				[
					"(\\d)(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["4[67]|[56]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[2-578]"],
					"0$1"
				]
			],
			"0"
		],
		LS: [
			"266",
			"00",
			"(?:[256]\\d\\d|800)\\d{5}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[2568]"]
			]]
		],
		LT: [
			"370",
			"00",
			"(?:[3469]\\d|52|[78]0)\\d{6}",
			[8],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["52[0-7]"],
					"(0-$1)",
					1
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["[7-9]"],
					"0 $1",
					1
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["37|4(?:[15]|6[1-8])"],
					"(0-$1)",
					1
				],
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["[3-6]"],
					"(0-$1)",
					1
				]
			],
			"0",
			0,
			"[08]"
		],
		LU: [
			"352",
			"00",
			"35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}",
			[
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{2})(\\d{3})",
					"$1 $2",
					["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3",
					["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["20[2-689]"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})",
					"$1 $2 $3 $4",
					["20"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})",
					"$1 $2 $3 $4",
					["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["80[01]|90[015]"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3 $4",
					["20"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["6"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})",
					"$1 $2 $3 $4 $5",
					["20"]
				]
			],
			0,
			0,
			"(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"
		],
		LV: [
			"371",
			"00",
			"(?:[268]\\d|78|90)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[2679]|8[01]"]
			]]
		],
		LY: [
			"218",
			"00",
			"[2-9]\\d{8}",
			[9],
			[[
				"(\\d{2})(\\d{7})",
				"$1-$2",
				["[2-9]"],
				"0$1"
			]],
			"0"
		],
		MA: [
			"212",
			"00",
			"[5-8]\\d{8}",
			[9],
			[
				[
					"(\\d{4})(\\d{5})",
					"$1-$2",
					["892"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1-$2",
					["8(?:0[0-7]|9)"],
					"0$1"
				],
				[
					"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4 $5",
					["[5-8]"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			"[5-8]"
		],
		MC: [
			"377",
			"00",
			"(?:[3489]|[67]\\d)\\d{7}",
			[8, 9],
			[
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["4"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[389]"]
				],
				[
					"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4 $5",
					["[67]"],
					"0$1"
				]
			],
			"0"
		],
		MD: [
			"373",
			"00",
			"(?:[235-7]\\d|[89]0)\\d{6}",
			[8],
			[
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["22|3"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["[25-7]"],
					"0$1"
				]
			],
			"0"
		],
		ME: [
			"382",
			"00",
			"(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}",
			[8, 9],
			[[
				"(\\d{2})(\\d{3})(\\d{3,4})",
				"$1 $2 $3",
				["[2-9]"],
				"0$1"
			]],
			"0"
		],
		MF: [
			"590",
			"00",
			"7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}",
			[9],
			0,
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["(?:59(?:0(?:0[079]|[14]3|[27][79]|3[03-7]|5[0-268]|87)|87\\d)|80[6-9]\\d\\d)\\d{4}"],
				["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"],
				["80[0-5]\\d{6}"],
				["8[129]\\d{7}"],
				0,
				0,
				0,
				0,
				["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]
			]
		],
		MG: [
			"261",
			"00",
			"[23]\\d{8}",
			[9],
			[[
				"(\\d{2})(\\d{2})(\\d{3})(\\d{2})",
				"$1 $2 $3 $4",
				["[23]"],
				"0$1"
			]],
			"0",
			0,
			"([24-9]\\d{6})$|0",
			"20$1"
		],
		MH: [
			"692",
			"011",
			"329\\d{4}|(?:[256]\\d|45)\\d{5}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1-$2",
				["[2-6]"]
			]],
			"1"
		],
		MK: [
			"389",
			"00",
			"[2-578]\\d{7}",
			[8],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["2|34[47]|4(?:[37]7|5[47]|64)"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[347]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d)(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[58]"],
					"0$1"
				]
			],
			"0"
		],
		ML: [
			"223",
			"00",
			"[24-9]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[24-9]"]
			]]
		],
		MM: [
			"95",
			"00",
			"1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}",
			[
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d)(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["16|2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["4(?:[2-46]|5[3-5])|5|6(?:[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-5]|(?:60|86)[23]"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[12]|452|678|86", "[12]|452|6788|86"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[4-7]|8[1-35]"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{4,6})",
					"$1 $2 $3",
					["9(?:2[0-4]|[35-9]|4[137-9])"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["92"],
					"0$1"
				],
				[
					"(\\d)(\\d{5})(\\d{4})",
					"$1 $2 $3",
					["9"],
					"0$1"
				]
			],
			"0"
		],
		MN: [
			"976",
			"001",
			"[12]\\d{7,9}|[5-9]\\d{7}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["[12]1"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[5-9]"]
				],
				[
					"(\\d{3})(\\d{5,6})",
					"$1 $2",
					["[12]2[1-3]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{5,6})",
					"$1 $2",
					["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"],
					"0$1"
				],
				[
					"(\\d{5})(\\d{4,5})",
					"$1 $2",
					["[12]"],
					"0$1"
				]
			],
			"0"
		],
		MO: [
			"853",
			"00",
			"0800\\d{3}|(?:28|[68]\\d)\\d{6}",
			[7, 8],
			[[
				"(\\d{4})(\\d{3})",
				"$1 $2",
				["0"]
			], [
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[268]"]
			]]
		],
		MP: [
			"1",
			"011",
			"[58]\\d{9}|(?:67|90)0\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"670$1",
			0,
			"670"
		],
		MQ: [
			"596",
			"00",
			"7091\\d{5}|(?:[56]9|[89]\\d)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[5-79]|8(?:0[6-9]|[36])"],
				"0$1"
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"],
				"0$1"
			]],
			"0"
		],
		MR: [
			"222",
			"00",
			"(?:[2-4]\\d\\d|800)\\d{5}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[2-48]"]
			]]
		],
		MS: [
			"1",
			"011",
			"(?:[58]\\d\\d|664|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([34]\\d{6})$|1",
			"664$1",
			0,
			"664"
		],
		MT: [
			"356",
			"00",
			"3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[2357-9]"]
			]]
		],
		MU: [
			"230",
			"0(?:0|[24-7]0|3[03])",
			"(?:[57]|8\\d\\d)\\d{7}|[2-468]\\d{6}",
			[
				7,
				8,
				10
			],
			[
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[2-46]|8[013]"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[57]"]
				],
				[
					"(\\d{5})(\\d{5})",
					"$1 $2",
					["8"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"020"
		],
		MV: [
			"960",
			"0(?:0|19)",
			"(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",
			[7, 10],
			[[
				"(\\d{3})(\\d{4})",
				"$1-$2",
				["[34679]"]
			], [
				"(\\d{3})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[89]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		MW: [
			"265",
			"00",
			"(?:[1289]\\d|31|77)\\d{7}|1\\d{6}",
			[7, 9],
			[
				[
					"(\\d)(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1[2-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[137-9]"],
					"0$1"
				]
			],
			"0"
		],
		MX: [
			"52",
			"0[09]",
			"[2-9]\\d{9}",
			[10],
			[[
				"(\\d{2})(\\d{4})(\\d{4})",
				"$1 $2 $3",
				["33|5[56]|81"]
			], [
				"(\\d{3})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[2-9]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		MY: [
			"60",
			"00",
			"1\\d{8,9}|(?:3\\d|[4-9])\\d{7}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1-$2 $3",
					["[4-79]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1-$2 $3",
					["1(?:[02469]|[378][1-9]|53)|8", "1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"],
					"0$1"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1-$2 $3",
					["3"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{2})(\\d{4})",
					"$1-$2-$3-$4",
					["1(?:[367]|80)"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1-$2 $3",
					["15"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1-$2 $3",
					["1"],
					"0$1"
				]
			],
			"0"
		],
		MZ: [
			"258",
			"00",
			"(?:2|8\\d)\\d{7}",
			[8, 9],
			[[
				"(\\d{2})(\\d{3})(\\d{3,4})",
				"$1 $2 $3",
				["2|8[2-79]"]
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["8"]
			]]
		],
		NA: [
			"264",
			"00",
			"[68]\\d{7,8}",
			[8, 9],
			[
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["88"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["6"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["87"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		NC: [
			"687",
			"00",
			"(?:050|[2-57-9]\\d\\d)\\d{3}",
			[6],
			[[
				"(\\d{2})(\\d{2})(\\d{2})",
				"$1.$2.$3",
				["[02-57-9]"]
			]]
		],
		NE: [
			"227",
			"00",
			"[027-9]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["08"]
			], [
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[089]|2[013]|7[0467]"]
			]]
		],
		NF: [
			"672",
			"00",
			"[13]\\d{5}",
			[6],
			[[
				"(\\d{2})(\\d{4})",
				"$1 $2",
				["1[0-3]"]
			], [
				"(\\d)(\\d{5})",
				"$1 $2",
				["[13]"]
			]],
			0,
			0,
			"([0-258]\\d{4})$",
			"3$1"
		],
		NG: [
			"234",
			"009",
			"(?:20|9\\d)\\d{8}|[78]\\d{9,13}",
			[
				10,
				11,
				12,
				13,
				14
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[7-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["20[129]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})(\\d{4,5})",
					"$1 $2 $3",
					["[78]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5})(\\d{5,6})",
					"$1 $2 $3",
					["[78]"],
					"0$1"
				]
			],
			"0"
		],
		NI: [
			"505",
			"00",
			"(?:1800|[25-8]\\d{3})\\d{4}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[125-8]"]
			]]
		],
		NL: [
			"31",
			"00",
			"(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}",
			[
				5,
				6,
				7,
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{3})(\\d{4,7})",
					"$1 $2",
					["[89]0"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1 $2",
					["66"],
					"0$1"
				],
				[
					"(\\d)(\\d{8})",
					"$1 $2",
					["6"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[1-578]|91"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{5})",
					"$1 $2 $3",
					["9"],
					"0$1"
				]
			],
			"0"
		],
		NO: [
			"47",
			"00",
			"(?:0|[2-9]\\d{3})\\d{4}",
			[5, 8],
			[[
				"(\\d{3})(\\d{2})(\\d{3})",
				"$1 $2 $3",
				["8"]
			], [
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[2-79]"]
			]],
			0,
			0,
			0,
			0,
			0,
			"[02-689]|7[0-8]"
		],
		NP: [
			"977",
			"00",
			"(?:1\\d|9)\\d{9}|[1-9]\\d{7}",
			[
				8,
				10,
				11
			],
			[
				[
					"(\\d)(\\d{7})",
					"$1-$2",
					["1[2-6]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{6})",
					"$1-$2",
					["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{7})",
					"$1-$2",
					["9"]
				]
			],
			"0"
		],
		NR: [
			"674",
			"00",
			"(?:222|444|(?:55|8\\d)\\d|666|777|999)\\d{4}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[24-9]"]
			]]
		],
		NU: [
			"683",
			"00",
			"(?:[4-7]|888\\d)\\d{3}",
			[4, 7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["8"]
			]]
		],
		NZ: [
			"64",
			"0(?:0|161)",
			"[1289]\\d{9}|50\\d{5}(?:\\d{2,3})?|[27-9]\\d{7,8}|(?:[34]\\d|6[0-35-9])\\d{6}|8\\d{4,6}",
			[
				5,
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{3,8})",
					"$1 $2",
					["8[1-79]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2,3})",
					"$1 $2 $3",
					["50[036-8]|8|90", "50(?:[0367]|88)|8|90"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["24|[346]|7[2-57-9]|9[2-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["2(?:10|74)|[589]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["1|2[028]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,5})",
					"$1 $2 $3",
					["2(?:[169]|7[0-35-9])|7"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		OM: [
			"968",
			"00",
			"(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}",
			[
				7,
				8,
				9
			],
			[
				[
					"(\\d{3})(\\d{4,6})",
					"$1 $2",
					["[58]"]
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["2"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[179]"]
				]
			]
		],
		PA: [
			"507",
			"00",
			"(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}",
			[
				7,
				8,
				10,
				11
			],
			[
				[
					"(\\d{3})(\\d{4})",
					"$1-$2",
					["[1-57-9]"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1-$2",
					["[68]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"]
				]
			]
		],
		PE: [
			"51",
			"00|19(?:1[124]|77|90)00",
			"(?:[14-8]|9\\d)\\d{7}",
			[8, 9],
			[
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["80"],
					"(0$1)"
				],
				[
					"(\\d)(\\d{7})",
					"$1 $2",
					["1"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["[4-8]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["9"]
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			"00",
			" Anexo "
		],
		PF: [
			"689",
			"00",
			"4\\d{5}(?:\\d{2})?|8\\d{7,8}",
			[
				6,
				8,
				9
			],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3",
					["44"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["4|8[7-9]"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["8"]
				]
			]
		],
		PG: [
			"675",
			"00|140[1-3]",
			"(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",
			[7, 8],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["18|[2-69]|85"]
			], [
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[78]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		PH: [
			"63",
			"00",
			"(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}",
			[
				6,
				8,
				9,
				10,
				11,
				12,
				13
			],
			[
				[
					"(\\d)(\\d{5})",
					"$1 $2",
					["2"],
					"(0$1)"
				],
				[
					"(\\d{4})(\\d{4,6})",
					"$1 $2",
					["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],
					"(0$1)"
				],
				[
					"(\\d{5})(\\d{4})",
					"$1 $2",
					["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"],
					"(0$1)"
				],
				[
					"(\\d)(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["2"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[3-7]|8[2-8]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"]
				],
				[
					"(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})",
					"$1 $2 $3 $4",
					["1"]
				]
			],
			"0"
		],
		PK: [
			"92",
			"00",
			"122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",
			[
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{2,7})",
					"$1 $2 $3",
					["[89]0"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{5})",
					"$1 $2",
					["1"]
				],
				[
					"(\\d{3})(\\d{6,7})",
					"$1 $2",
					["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])", "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{7,8})",
					"$1 $2",
					["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],
					"(0$1)"
				],
				[
					"(\\d{5})(\\d{5})",
					"$1 $2",
					["58"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{7})",
					"$1 $2",
					["3"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["[24-9]"],
					"(0$1)"
				]
			],
			"0"
		],
		PL: [
			"48",
			"00",
			"(?:6|8\\d\\d)\\d{7}|[1-9]\\d{6}(?:\\d{2})?|[26]\\d{5}",
			[
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{5})",
					"$1",
					["19"]
				],
				[
					"(\\d{3})(\\d{3})",
					"$1 $2",
					["11|20|64"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{3})",
					"$1 $2 $3",
					["30|(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1", "30|(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{2,3})",
					"$1 $2 $3",
					["64"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["1[2-8]|[2-7]|8[1-79]|9[145]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["8"]
				]
			]
		],
		PM: [
			"508",
			"00",
			"[78]\\d{8}|[2-9]\\d{5}",
			[6, 9],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3",
					["[2-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["7"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		PR: [
			"1",
			"011",
			"(?:[589]\\d\\d|787)\\d{7}",
			[10],
			0,
			"1",
			0,
			0,
			0,
			0,
			"787|939"
		],
		PS: [
			"970",
			"00",
			"[2489]2\\d{6}|(?:1\\d|5)\\d{8}",
			[
				8,
				9,
				10
			],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[2489]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["5"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1"]
				]
			],
			"0"
		],
		PT: [
			"351",
			"00",
			"1693\\d{5}|(?:[26-9]\\d|30)\\d{7}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["2[12]"]
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["16|[236-9]"]
			]]
		],
		PW: [
			"680",
			"01[12]",
			"(?:[24-8]\\d\\d|345|900)\\d{4}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[2-9]"]
			]]
		],
		PY: [
			"595",
			"00",
			"[36-8]\\d{5,8}|4\\d{6,8}|59\\d{6}|9\\d{5,10}|(?:2\\d|5[0-8])\\d{6,7}",
			[
				6,
				7,
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{3})(\\d{3,6})",
					"$1 $2",
					["[2-9]0"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["3[289]|4[246-8]|61|7[1-3]|8[1-36]"],
					"(0$1)"
				],
				[
					"(\\d{3})(\\d{4,5})",
					"$1 $2",
					["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["87"]
				],
				[
					"(\\d{3})(\\d{6})",
					"$1 $2",
					["9(?:[5-79]|8[1-7])"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[2-8]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["9"]
				]
			],
			"0"
		],
		QA: [
			"974",
			"00",
			"800\\d{4}|(?:2|800)\\d{6}|(?:0080|[3-7])\\d{7}",
			[
				7,
				8,
				9,
				11
			],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["2[136]|8"]
			], [
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[3-7]"]
			]]
		],
		RE: [
			"262",
			"00",
			"709\\d{6}|(?:26|[689]\\d)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[26-9]"],
				"0$1"
			]],
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["26(?:2\\d\\d|3(?:0\\d|1[0-6]))\\d{4}"],
				["(?:69(?:2\\d\\d|3(?:[06][0-6]|1[0-3]|2[0-2]|3[0-39]|4\\d|5[0-5]|7[0-37]|8[0-8]|9[0-479]))|7092[0-3])\\d{4}"],
				["80\\d{7}"],
				["89[1-37-9]\\d{6}"],
				0,
				0,
				0,
				0,
				["9(?:399[0-3]|479[0-6]|76(?:2[278]|3[0-37]))\\d{4}"],
				["8(?:1[019]|2[0156]|84|90)\\d{6}"]
			]
		],
		RO: [
			"40",
			"00",
			"(?:[236-8]\\d|90)\\d{7}|[23]\\d{5}",
			[6, 9],
			[
				[
					"(\\d{3})(\\d{3})",
					"$1 $2",
					["2[3-6]", "2[3-6]\\d9"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})",
					"$1 $2",
					["219|31"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[23]1"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[236-9]"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			" int "
		],
		RS: [
			"381",
			"00",
			"38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}",
			[
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			[[
				"(\\d{3})(\\d{3,9})",
				"$1 $2",
				["(?:2[389]|39)0|[7-9]"],
				"0$1"
			], [
				"(\\d{2})(\\d{5,10})",
				"$1 $2",
				["[1-36]"],
				"0$1"
			]],
			"0"
		],
		RU: [
			"7",
			"810",
			"8\\d{13}|[347-9]\\d{9}",
			[10, 14],
			[
				[
					"(\\d{4})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					[
						"7(?:1[0-8]|2[1-9])",
						"7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))",
						"7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"
					],
					"8 ($1)",
					1
				],
				[
					"(\\d{5})(\\d)(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					[
						"7(?:1[0-68]|2[1-9])",
						"7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))",
						"7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"
					],
					"8 ($1)",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["7"],
					"8 ($1)",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2-$3-$4",
					["[349]|8(?:[02-7]|1[1-8])"],
					"8 ($1)",
					1
				],
				[
					"(\\d{4})(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["8"],
					"8 ($1)"
				]
			],
			"8",
			0,
			0,
			0,
			0,
			"[3489]",
			0,
			"8~10"
		],
		RW: [
			"250",
			"00",
			"(?:06|[27]\\d\\d|[89]00)\\d{6}",
			[8, 9],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["0"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["2"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[7-9]"],
					"0$1"
				]
			],
			"0"
		],
		SA: [
			"966",
			"00",
			"(?:[15]\\d|800|92)\\d{7}",
			[9, 10],
			[
				[
					"(\\d{4})(\\d{5})",
					"$1 $2",
					["9"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["5"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"]
				]
			],
			"0"
		],
		SB: [
			"677",
			"0[01]",
			"[6-9]\\d{6}|[1-6]\\d{4}",
			[5, 7],
			[[
				"(\\d{2})(\\d{5})",
				"$1 $2",
				["6[89]|7|8[4-9]|9(?:[1-8]|9[0-8])"]
			]]
		],
		SC: [
			"248",
			"010|0[0-2]",
			"(?:[2489]\\d|64)\\d{5}",
			[7],
			[[
				"(\\d)(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[246]|9[57]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		SD: [
			"249",
			"00",
			"[19]\\d{8}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{4})",
				"$1 $2 $3",
				["[19]"],
				"0$1"
			]],
			"0"
		],
		SE: [
			"46",
			"00",
			"(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}",
			[
				6,
				7,
				8,
				9,
				10,
				12
			],
			[
				[
					"(\\d{2})(\\d{2,3})(\\d{2})",
					"$1-$2 $3",
					["20"],
					"0$1",
					0,
					"$1 $2 $3"
				],
				[
					"(\\d{3})(\\d{4})",
					"$1-$2",
					["9(?:00|39|44|9)"],
					"0$1",
					0,
					"$1 $2"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})",
					"$1-$2 $3",
					["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],
					"0$1",
					0,
					"$1 $2 $3"
				],
				[
					"(\\d)(\\d{2,3})(\\d{2})(\\d{2})",
					"$1-$2 $3 $4",
					["8"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d{3})(\\d{2,3})(\\d{2})",
					"$1-$2 $3",
					["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],
					"0$1",
					0,
					"$1 $2 $3"
				],
				[
					"(\\d{3})(\\d{2,3})(\\d{3})",
					"$1-$2 $3",
					["9(?:00|39|44)"],
					"0$1",
					0,
					"$1 $2 $3"
				],
				[
					"(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})",
					"$1-$2 $3 $4",
					["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1-$2 $3 $4",
					["10|7"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d)(\\d{3})(\\d{3})(\\d{2})",
					"$1-$2 $3 $4",
					["8"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
					"$1-$2 $3 $4",
					["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d{3})(\\d{2})(\\d{2})(\\d{3})",
					"$1-$2 $3 $4",
					["9"],
					"0$1",
					0,
					"$1 $2 $3 $4"
				],
				[
					"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1-$2 $3 $4 $5",
					["[26]"],
					"0$1",
					0,
					"$1 $2 $3 $4 $5"
				]
			],
			"0"
		],
		SG: [
			"65",
			"0[0-3]\\d",
			"(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}",
			[
				8,
				10,
				11
			],
			[
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[369]|8(?:0[1-9]|[1-9])"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"]
				],
				[
					"(\\d{4})(\\d{4})(\\d{3})",
					"$1 $2 $3",
					["7"]
				],
				[
					"(\\d{4})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["1"]
				]
			]
		],
		SH: [
			"290",
			"00",
			"(?:[256]\\d|8)\\d{3}",
			[4, 5],
			0,
			0,
			0,
			0,
			0,
			0,
			"[256]"
		],
		SI: [
			"386",
			"00|10(?:22|66|88|99)",
			"[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}",
			[
				5,
				6,
				7,
				8
			],
			[
				[
					"(\\d{2})(\\d{3,6})",
					"$1 $2",
					["8[09]|9"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["59|8"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[37][01]|4[0139]|51|6"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[1-57]"],
					"(0$1)"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		SJ: [
			"47",
			"00",
			"0\\d{4}|(?:[489]\\d|79)\\d{6}",
			[5, 8],
			0,
			0,
			0,
			0,
			0,
			0,
			"79"
		],
		SK: [
			"421",
			"00",
			"[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",
			[
				6,
				7,
				9
			],
			[
				[
					"(\\d)(\\d{2})(\\d{3,4})",
					"$1 $2 $3",
					["21"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{2})(\\d{2,3})",
					"$1 $2 $3",
					["[3-5][1-8]1", "[3-5][1-8]1[67]"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{3})(\\d{2})",
					"$1/$2 $3 $4",
					["2"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[689]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1/$2 $3 $4",
					["[3-5]"],
					"0$1"
				]
			],
			"0"
		],
		SL: [
			"232",
			"00",
			"(?:[237-9]\\d|66)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{6})",
				"$1 $2",
				["[236-9]"],
				"(0$1)"
			]],
			"0"
		],
		SM: [
			"378",
			"00",
			"(?:0549|[5-7]\\d)\\d{6}",
			[8, 10],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[5-7]"]
			], [
				"(\\d{4})(\\d{6})",
				"$1 $2",
				["0"]
			]],
			0,
			0,
			"([89]\\d{5})$",
			"0549$1"
		],
		SN: [
			"221",
			"00",
			"(?:[378]\\d|93)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"]
			], [
				"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[379]"]
			]]
		],
		SO: [
			"252",
			"00",
			"[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}",
			[
				6,
				7,
				8,
				9
			],
			[
				[
					"(\\d{2})(\\d{4})",
					"$1 $2",
					["8[125]"]
				],
				[
					"(\\d{6})",
					"$1",
					["[134]"]
				],
				[
					"(\\d)(\\d{6})",
					"$1 $2",
					["[15]|2[0-79]|3[0-46-8]|4[0-7]"]
				],
				[
					"(\\d)(\\d{7})",
					"$1 $2",
					["(?:2|90)4|[67]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[348]|64|79|90"]
				],
				[
					"(\\d{2})(\\d{5,7})",
					"$1 $2",
					["1|28|6[0-35-9]|7[67]|9[2-9]"]
				]
			],
			"0"
		],
		SR: [
			"597",
			"00",
			"(?:[2-5]|[6-8]\\d|90)\\d{5}",
			[6, 7],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})",
					"$1-$2-$3",
					["56"]
				],
				[
					"(\\d{3})(\\d{3})",
					"$1-$2",
					["[2-5]"]
				],
				[
					"(\\d{3})(\\d{4})",
					"$1-$2",
					["[6-9]"]
				]
			]
		],
		SS: [
			"211",
			"00",
			"[19]\\d{8}",
			[9],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[19]"],
				"0$1"
			]],
			"0"
		],
		ST: [
			"239",
			"00",
			"(?:22|9\\d)\\d{5}",
			[7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[29]"]
			]]
		],
		SV: [
			"503",
			"00",
			"[25-7]\\d{7}|(?:80\\d|900)\\d{4}(?:\\d{4})?",
			[
				7,
				8,
				11
			],
			[
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[89]"]
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[25-7]"]
				],
				[
					"(\\d{3})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["[89]"]
				]
			]
		],
		SX: [
			"1",
			"011",
			"7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"(5\\d{6})$|1",
			"721$1",
			0,
			"721"
		],
		SY: [
			"963",
			"00",
			"[1-359]\\d{8}|[1-5]\\d{7}",
			[8, 9],
			[[
				"(\\d{2})(\\d{3})(\\d{3,4})",
				"$1 $2 $3",
				["[1-4]|5[1-3]"],
				"0$1",
				1
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[59]"],
				"0$1",
				1
			]],
			"0"
		],
		SZ: [
			"268",
			"00",
			"0800\\d{4}|(?:[237]\\d|900)\\d{6}",
			[8, 9],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[0237]"]
			], [
				"(\\d{5})(\\d{4})",
				"$1 $2",
				["9"]
			]]
		],
		TA: [
			"290",
			"00",
			"8\\d{3}",
			[4],
			0,
			0,
			0,
			0,
			0,
			0,
			"8"
		],
		TC: [
			"1",
			"011",
			"(?:[58]\\d\\d|649|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-479]\\d{6})$|1",
			"649$1",
			0,
			"649"
		],
		TD: [
			"235",
			"00|16",
			"(?:22|[3689]\\d|77)\\d{6}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[236-9]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"00"
		],
		TG: [
			"228",
			"00",
			"[279]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[279]"]
			]]
		],
		TH: [
			"66",
			"00[1-9]",
			"(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}",
			[
				8,
				9,
				10,
				13
			],
			[
				[
					"(\\d)(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["2"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[13-9]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["1"]
				]
			],
			"0"
		],
		TJ: [
			"992",
			"810",
			"(?:[0-57-9]\\d|66)\\d{7}",
			[9],
			[
				[
					"(\\d{6})(\\d)(\\d{2})",
					"$1 $2 $3",
					["331", "3317"]
				],
				[
					"(\\d{3})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["44[02-479]|[34]7"]
				],
				[
					"(\\d{4})(\\d)(\\d{4})",
					"$1 $2 $3",
					["3(?:[1245]|3[12])"]
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["\\d"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"8~10"
		],
		TK: [
			"690",
			"00",
			"[2-47]\\d{3,6}",
			[
				4,
				5,
				6,
				7
			]
		],
		TL: [
			"670",
			"00",
			"7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}",
			[7, 8],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[2-489]|70"]
			], [
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["7"]
			]]
		],
		TM: [
			"993",
			"810",
			"(?:[1-6]\\d|71)\\d{6}",
			[8],
			[
				[
					"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
					"$1 $2-$3-$4",
					["12"],
					"(8 $1)"
				],
				[
					"(\\d{3})(\\d)(\\d{2})(\\d{2})",
					"$1 $2-$3-$4",
					["[1-5]"],
					"(8 $1)"
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["[67]"],
					"8 $1"
				]
			],
			"8",
			0,
			0,
			0,
			0,
			0,
			0,
			"8~10"
		],
		TN: [
			"216",
			"00",
			"[2-57-9]\\d{7}",
			[8],
			[[
				"(\\d{2})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[2-57-9]"]
			]]
		],
		TO: [
			"676",
			"00",
			"(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}",
			[5, 7],
			[
				[
					"(\\d{2})(\\d{3})",
					"$1-$2",
					["[2-4]|50|6[09]|7[0-24-69]|8[05]"]
				],
				[
					"(\\d{4})(\\d{3})",
					"$1 $2",
					["0"]
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[5-9]"]
				]
			]
		],
		TR: [
			"90",
			"00",
			"4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}",
			[
				7,
				10,
				12,
				13
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["512|8[01589]|90"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					[
						"5(?:[0-579]|61)",
						"5(?:[0-579]|61[06])",
						"5(?:[0-579]|61[06]1)"
					],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["[24][1-8]|3[1-9]"],
					"(0$1)",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{6,7})",
					"$1 $2 $3",
					["80"],
					"0$1",
					1
				]
			],
			"0"
		],
		TT: [
			"1",
			"011",
			"(?:[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-46-8]\\d{6})$|1",
			"868$1",
			0,
			"868"
		],
		TV: [
			"688",
			"00",
			"(?:2|7\\d\\d|90)\\d{4}",
			[
				5,
				6,
				7
			],
			[
				[
					"(\\d{2})(\\d{3})",
					"$1 $2",
					["2"]
				],
				[
					"(\\d{2})(\\d{4})",
					"$1 $2",
					["90"]
				],
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["7"]
				]
			]
		],
		TW: [
			"886",
			"0(?:0[25-79]|19)",
			"[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}",
			[
				7,
				8,
				9,
				10,
				11
			],
			[
				[
					"(\\d{2})(\\d)(\\d{4})",
					"$1 $2 $3",
					["202"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[258]0"],
					"0$1"
				],
				[
					"(\\d)(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]", "[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[49]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{4})(\\d{4,5})",
					"$1 $2 $3",
					["7"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			"#"
		],
		TZ: [
			"255",
			"00[056]",
			"(?:[25-8]\\d|41|90)\\d{7}",
			[9],
			[
				[
					"(\\d{3})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[24]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1 $2",
					["5"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[67]"],
					"0$1"
				]
			],
			"0"
		],
		UA: [
			"380",
			"00",
			"[89]\\d{9}|[3-9]\\d{8}",
			[9, 10],
			[
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]", "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{5})",
					"$1 $2",
					["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])", "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[3-7]|89|9[1-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["[89]"],
					"0$1"
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			"0~0"
		],
		UG: [
			"256",
			"00[057]",
			"800\\d{6}|(?:[29]0|[347]\\d)\\d{7}",
			[9],
			[
				[
					"(\\d{4})(\\d{5})",
					"$1 $2",
					["202", "2024"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{6})",
					"$1 $2",
					["[27-9]|4(?:6[45]|[7-9])"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1 $2",
					["[34]"],
					"0$1"
				]
			],
			"0"
		],
		US: [
			"1",
			"011",
			"[2-9]\\d{9}|3\\d{6}",
			[10],
			[[
				"(\\d{3})(\\d{4})",
				"$1-$2",
				["310"],
				0,
				1
			], [
				"(\\d{3})(\\d{3})(\\d{4})",
				"($1) $2-$3",
				["[2-9]"],
				0,
				1,
				"$1-$2-$3"
			]],
			"1",
			0,
			0,
			0,
			0,
			0,
			[
				["(?:274[27]|(?:472|983)[2-47-9])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-57-9]|3[1459]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[013-79]|3[0-24679]|4[167]|5[0-3]|6[01349]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[0156]|5[01679]|6[0-279]|78|8[0-269])|7(?:0[1-46-8]|1[2-9]|2[04-8]|3[0-2478]|4[0378]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[0168]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-3589]|8[04-69]))[2-9]\\d{6}"],
				[""],
				["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],
				["900[2-9]\\d{6}"],
				["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|3[23]|44|66|77|88)[2-9]\\d{6}"]
			]
		],
		UY: [
			"598",
			"0(?:0|1[3-9]\\d)",
			"0004\\d{2,9}|[1249]\\d{7}|2\\d{3,4}|(?:[49]\\d|80)\\d{5}",
			[
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				13
			],
			[
				[
					"(\\d{4,5})",
					"$1",
					["21"]
				],
				[
					"(\\d{3})(\\d{3,4})",
					"$1 $2",
					["0"]
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["[49]0|8"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["9"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{4})",
					"$1 $2",
					["[124]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{2,4})",
					"$1 $2 $3",
					["0"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})(\\d{2,4})",
					"$1 $2 $3 $4",
					["0"]
				]
			],
			"0",
			0,
			0,
			0,
			0,
			0,
			0,
			"00",
			" int. "
		],
		UZ: [
			"998",
			"00",
			"(?:20|33|[5-9]\\d)\\d{7}",
			[9],
			[[
				"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["[235-9]"]
			]]
		],
		VA: [
			"39",
			"00",
			"0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",
			[
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			0,
			0,
			0,
			0,
			0,
			0,
			"06698"
		],
		VC: [
			"1",
			"011",
			"(?:[58]\\d\\d|784|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-7]\\d{6})$|1",
			"784$1",
			0,
			"784"
		],
		VE: [
			"58",
			"00",
			"[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}",
			[10],
			[[
				"(\\d{3})(\\d{7})",
				"$1-$2",
				["[24-689]"],
				"0$1"
			]],
			"0"
		],
		VG: [
			"1",
			"011",
			"(?:284|[58]\\d\\d|900)\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-578]\\d{6})$|1",
			"284$1",
			0,
			"284"
		],
		VI: [
			"1",
			"011",
			"[58]\\d{9}|(?:34|90)0\\d{7}",
			[10],
			0,
			"1",
			0,
			"([2-9]\\d{6})$|1",
			"340$1",
			0,
			"340"
		],
		VN: [
			"84",
			"00",
			"[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}",
			[
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["80"],
					"0$1",
					1
				],
				[
					"(\\d{4})(\\d{4,6})",
					"$1 $2",
					["1"],
					0,
					1
				],
				[
					"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
					"$1 $2 $3 $4",
					["6"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[357-9]"],
					"0$1",
					1
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["2[48]"],
					"0$1",
					1
				],
				[
					"(\\d{3})(\\d{4})(\\d{3})",
					"$1 $2 $3",
					["2"],
					"0$1",
					1
				]
			],
			"0"
		],
		VU: [
			"678",
			"00",
			"[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}",
			[5, 7],
			[[
				"(\\d{3})(\\d{4})",
				"$1 $2",
				["[57-9]"]
			]]
		],
		WF: [
			"681",
			"00",
			"(?:40|72|8\\d{4})\\d{4}|[89]\\d{5}",
			[6, 9],
			[[
				"(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3",
				["[47-9]"]
			], [
				"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
				"$1 $2 $3 $4",
				["8"]
			]]
		],
		WS: [
			"685",
			"0",
			"(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}",
			[
				5,
				6,
				7,
				10
			],
			[
				[
					"(\\d{5})",
					"$1",
					["[2-5]|6[1-9]"]
				],
				[
					"(\\d{3})(\\d{3,7})",
					"$1 $2",
					["[68]"]
				],
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["7"]
				]
			]
		],
		XK: [
			"383",
			"00",
			"2\\d{7,8}|3\\d{7,11}|(?:4\\d\\d|[89]00)\\d{5}",
			[
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{3})(\\d{5})",
					"$1 $2",
					["[89]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["[2-4]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["2|39"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7,10})",
					"$1 $2",
					["3"],
					"0$1"
				]
			],
			"0"
		],
		YE: [
			"967",
			"00",
			"(?:1|7\\d)\\d{7}|[1-7]\\d{6}",
			[
				7,
				8,
				9
			],
			[[
				"(\\d)(\\d{3})(\\d{3,4})",
				"$1 $2 $3",
				["[1-6]|7(?:[24-6]|8[0-7])"],
				"0$1"
			], [
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["7"],
				"0$1"
			]],
			"0"
		],
		YT: [
			"262",
			"00",
			"7093\\d{5}|(?:80|9\\d)\\d{7}|(?:26|63)9\\d{6}",
			[9],
			0,
			"0",
			0,
			0,
			0,
			0,
			0,
			[
				["269(?:0[0-467]|15|5[0-4]|6\\d|[78]0)\\d{4}"],
				["(?:639(?:0[0-79]|1[019]|[267]\\d|3[09]|40|5[05-9]|9[04-79])|7093[5-7])\\d{4}"],
				["80\\d{7}"],
				0,
				0,
				0,
				0,
				0,
				["9(?:(?:39|47)8[01]|769\\d)\\d{4}"]
			]
		],
		ZA: [
			"27",
			"00",
			"[1-79]\\d{8}|8\\d{4,9}",
			[
				5,
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{2})(\\d{3,4})",
					"$1 $2",
					["8[1-4]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{2,3})",
					"$1 $2 $3",
					["8[1-4]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["860"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["[1-9]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["8"],
					"0$1"
				]
			],
			"0"
		],
		ZM: [
			"260",
			"00",
			"800\\d{6}|(?:21|[579]\\d|63)\\d{7}",
			[9],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[28]"],
				"0$1"
			], [
				"(\\d{2})(\\d{7})",
				"$1 $2",
				["[579]"],
				"0$1"
			]],
			"0"
		],
		ZW: [
			"263",
			"00",
			"2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",
			[
				5,
				6,
				7,
				8,
				9,
				10
			],
			[
				[
					"(\\d{3})(\\d{3,5})",
					"$1 $2",
					["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"],
					"0$1"
				],
				[
					"(\\d)(\\d{3})(\\d{2,4})",
					"$1 $2 $3",
					["[49]"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{4})",
					"$1 $2",
					["80"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{7})",
					"$1 $2",
					["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2", "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"],
					"(0$1)"
				],
				[
					"(\\d{2})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["7"],
					"0$1"
				],
				[
					"(\\d{3})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)", "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{6})",
					"$1 $2",
					["8"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3,5})",
					"$1 $2",
					["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"],
					"0$1"
				],
				[
					"(\\d{2})(\\d{3})(\\d{3,4})",
					"$1 $2 $3",
					["29[013-9]|39|54"],
					"0$1"
				],
				[
					"(\\d{4})(\\d{3,5})",
					"$1 $2",
					["(?:25|54)8", "258|5483"],
					"0$1"
				]
			],
			"0"
		]
	},
	nonGeographic: {
		800: [
			"800",
			0,
			"(?:00|[1-9]\\d)\\d{6}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["\\d"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				["(?:00|[1-9]\\d)\\d{6}"]
			]
		],
		808: [
			"808",
			0,
			"[1-9]\\d{7}",
			[8],
			[[
				"(\\d{4})(\\d{4})",
				"$1 $2",
				["[1-9]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				["[1-9]\\d{7}"]
			]
		],
		870: [
			"870",
			0,
			"7\\d{11}|[235-7]\\d{8}",
			[9, 12],
			[[
				"(\\d{3})(\\d{3})(\\d{3})",
				"$1 $2 $3",
				["[235-7]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				["(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}"],
				0,
				0,
				0,
				0,
				0,
				0,
				["2\\d{8}", [9]]
			]
		],
		878: [
			"878",
			0,
			"10\\d{10}",
			[12],
			[[
				"(\\d{2})(\\d{5})(\\d{5})",
				"$1 $2 $3",
				["1"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				["10\\d{10}"]
			]
		],
		881: [
			"881",
			0,
			"6\\d{9}|[0-36-9]\\d{8}",
			[9, 10],
			[[
				"(\\d)(\\d{3})(\\d{5})",
				"$1 $2 $3",
				["[0-37-9]"]
			], [
				"(\\d)(\\d{3})(\\d{5,6})",
				"$1 $2 $3",
				["6"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[0, ["6\\d{9}|[0-36-9]\\d{8}"]]
		],
		882: [
			"882",
			0,
			"[13]\\d{6}(?:\\d{2,5})?|[19]\\d{7}|(?:[25]\\d\\d|4)\\d{7}(?:\\d{2})?",
			[
				7,
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{2})(\\d{5})",
					"$1 $2",
					["16|342"]
				],
				[
					"(\\d{2})(\\d{6})",
					"$1 $2",
					["49"]
				],
				[
					"(\\d{2})(\\d{2})(\\d{4})",
					"$1 $2 $3",
					["1[36]|9"]
				],
				[
					"(\\d{2})(\\d{4})(\\d{3})",
					"$1 $2 $3",
					["3[23]"]
				],
				[
					"(\\d{2})(\\d{3,4})(\\d{4})",
					"$1 $2 $3",
					["16"]
				],
				[
					"(\\d{2})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["10|23|3(?:[15]|4[57])|4|5[12]"]
				],
				[
					"(\\d{3})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["34"]
				],
				[
					"(\\d{2})(\\d{4,5})(\\d{5})",
					"$1 $2 $3",
					["[1-35]"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				["342\\d{4}|(?:337|49)\\d{6}|(?:3(?:2|47|7\\d{3})|5(?:0\\d{3}|2[0-2]))\\d{7}", [
					7,
					8,
					9,
					10,
					12
				]],
				0,
				0,
				0,
				["348[57]\\d{7}", [11]],
				0,
				0,
				["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:345\\d|9[89])\\d{6}|(?:10|2(?:3|85\\d)|3(?:[15]|[69]\\d\\d)|4[15-8]|51)\\d{8}"]
			]
		],
		883: [
			"883",
			0,
			"(?:[1-4]\\d|51)\\d{6,10}",
			[
				8,
				9,
				10,
				11,
				12
			],
			[
				[
					"(\\d{3})(\\d{3})(\\d{2,8})",
					"$1 $2 $3",
					["[14]|2[24-689]|3[02-689]|51[24-9]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3",
					["510"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{4})",
					"$1 $2 $3",
					["21"]
				],
				[
					"(\\d{4})(\\d{4})(\\d{4})",
					"$1 $2 $3",
					["51[13]"]
				],
				[
					"(\\d{3})(\\d{3})(\\d{3})(\\d{3})",
					"$1 $2 $3 $4",
					["[235]"]
				]
			],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				["(?:2(?:00\\d\\d|10)|(?:370[1-9]|51\\d0)\\d)\\d{7}|51(?:00\\d{5}|[24-9]0\\d{4,7})|(?:1[0-79]|2[24-689]|3[02-689]|4[0-4])0\\d{5,9}"]
			]
		],
		888: [
			"888",
			0,
			"\\d{11}",
			[11],
			[["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				0,
				0,
				0,
				0,
				["\\d{11}"]
			]
		],
		979: [
			"979",
			0,
			"[1359]\\d{8}",
			[9],
			[[
				"(\\d)(\\d{4})(\\d{4})",
				"$1 $2 $3",
				["[1359]"]
			]],
			0,
			0,
			0,
			0,
			0,
			0,
			[
				0,
				0,
				0,
				["[1359]\\d{8}"]
			]
		]
	}
};
//#endregion
//#region node_modules/libphonenumber-js/min/exports/withMetadataArgument.js
function Ks(e, t) {
	var n = Array.prototype.slice.call(t);
	return n.push(Gs), e.apply(this, n);
}
//#endregion
//#region node_modules/libphonenumber-js/es6/tools/semver-compare.js
function qs(e, t) {
	e = e.split("-"), t = t.split("-");
	for (var n = e[0].split("."), r = t[0].split("."), i = 0; i < 3; i++) {
		var a = Number(n[i]), o = Number(r[i]);
		if (a > o) return 1;
		if (o > a) return -1;
		if (!isNaN(a) && isNaN(o)) return 1;
		if (isNaN(a) && !isNaN(o)) return -1;
	}
	return e[1] && t[1] ? e[1] > t[1] ? 1 : e[1] < t[1] ? -1 : 0 : !e[1] && t[1] ? 1 : e[1] && !t[1] ? -1 : 0;
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/isObject.js
var Js = {}.constructor;
function Ys(e) {
	return e != null && e.constructor === Js;
}
//#endregion
//#region node_modules/libphonenumber-js/es6/metadata.js
function Xs(e) {
	"@babel/helpers - typeof";
	return Xs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Xs(e);
}
function Zs(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Qs(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, ec(r.key), r);
	}
}
function $s(e, t, n) {
	return t && Qs(e.prototype, t), n && Qs(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function ec(e) {
	var t = tc(e, "string");
	return Xs(t) == "symbol" ? t : t + "";
}
function tc(e, t) {
	if (Xs(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Xs(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var nc = "1.2.0", rc = "1.7.35", ic = " ext. ", ac = /^\d+$/, Z = /* @__PURE__ */ function() {
	function e(t) {
		Zs(this, e), dc(t), this.metadata = t, hc.call(this, t);
	}
	return $s(e, [
		{
			key: "getCountries",
			value: function() {
				return Object.keys(this.metadata.countries).filter(function(e) {
					return e !== "001";
				});
			}
		},
		{
			key: "getCountryMetadata",
			value: function(e) {
				return this.metadata.countries[e];
			}
		},
		{
			key: "nonGeographic",
			value: function() {
				if (!(this.v1 || this.v2 || this.v3)) return this.metadata.nonGeographic || this.metadata.nonGeographical;
			}
		},
		{
			key: "hasCountry",
			value: function(e) {
				return this.getCountryMetadata(e) !== void 0;
			}
		},
		{
			key: "hasCallingCode",
			value: function(e) {
				if (this.getCountryCodesForCallingCode(e)) return !0;
				if (this.nonGeographic()) {
					if (this.nonGeographic()[e]) return !0;
				} else {
					var t = this.countryCallingCodes()[e];
					if (t && t.length === 1 && t[0] === "001") return !0;
				}
			}
		},
		{
			key: "isNonGeographicCallingCode",
			value: function(e) {
				return this.nonGeographic() ? !!this.nonGeographic()[e] : !this.getCountryCodesForCallingCode(e);
			}
		},
		{
			key: "country",
			value: function(e) {
				return this.selectNumberingPlan(e);
			}
		},
		{
			key: "selectNumberingPlan",
			value: function(e, t) {
				if (e && ac.test(e) && (t = e, e = null), e && e !== "001") {
					if (!this.hasCountry(e)) throw Error(`Unknown country: ${e}`);
					this.numberingPlan = new oc(this.getCountryMetadata(e), this);
				} else if (t) {
					if (!this.hasCallingCode(t)) throw Error(`Unknown calling code: ${t}`);
					this.numberingPlan = new oc(this.getNumberingPlanMetadata(t), this);
				} else this.numberingPlan = void 0;
				return this;
			}
		},
		{
			key: "getCountryCodesForCallingCode",
			value: function(e) {
				var t = this.countryCallingCodes()[e];
				if (t) return t.length === 1 && t[0].length === 3 ? void 0 : t;
			}
		},
		{
			key: "getCountryCodeForCallingCode",
			value: function(e) {
				var t = this.getCountryCodesForCallingCode(e);
				if (t) return t[0];
			}
		},
		{
			key: "getNumberingPlanMetadata",
			value: function(e) {
				var t = this.getCountryCodeForCallingCode(e);
				if (t) return this.getCountryMetadata(t);
				if (this.nonGeographic()) {
					var n = this.nonGeographic()[e];
					if (n) return n;
				} else {
					var r = this.countryCallingCodes()[e];
					if (r && r.length === 1 && r[0] === "001") return this.metadata.countries["001"];
				}
			}
		},
		{
			key: "countryCallingCode",
			value: function() {
				return this.numberingPlan.callingCode();
			}
		},
		{
			key: "IDDPrefix",
			value: function() {
				return this.numberingPlan.IDDPrefix();
			}
		},
		{
			key: "defaultIDDPrefix",
			value: function() {
				return this.numberingPlan.defaultIDDPrefix();
			}
		},
		{
			key: "nationalNumberPattern",
			value: function() {
				return this.numberingPlan.nationalNumberPattern();
			}
		},
		{
			key: "possibleLengths",
			value: function() {
				return this.numberingPlan.possibleLengths();
			}
		},
		{
			key: "formats",
			value: function() {
				return this.numberingPlan.formats();
			}
		},
		{
			key: "nationalPrefixForParsing",
			value: function() {
				return this.numberingPlan.nationalPrefixForParsing();
			}
		},
		{
			key: "nationalPrefixTransformRule",
			value: function() {
				return this.numberingPlan.nationalPrefixTransformRule();
			}
		},
		{
			key: "leadingDigits",
			value: function() {
				return this.numberingPlan.leadingDigits();
			}
		},
		{
			key: "hasTypes",
			value: function() {
				return this.numberingPlan.hasTypes();
			}
		},
		{
			key: "type",
			value: function(e) {
				return this.numberingPlan.type(e);
			}
		},
		{
			key: "ext",
			value: function() {
				return this.numberingPlan.ext();
			}
		},
		{
			key: "countryCallingCodes",
			value: function() {
				return this.v1 ? this.metadata.country_phone_code_to_countries : this.metadata.country_calling_codes;
			}
		},
		{
			key: "chooseCountryByCountryCallingCode",
			value: function(e) {
				return this.selectNumberingPlan(e);
			}
		},
		{
			key: "hasSelectedNumberingPlan",
			value: function() {
				return this.numberingPlan !== void 0;
			}
		}
	]);
}(), oc = /* @__PURE__ */ function() {
	function e(t, n) {
		Zs(this, e), this.globalMetadataObject = n, this.metadata = t, hc.call(this, n.metadata);
	}
	return $s(e, [
		{
			key: "callingCode",
			value: function() {
				return this.metadata[0];
			}
		},
		{
			key: "getDefaultCountryMetadataForRegion",
			value: function() {
				return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode());
			}
		},
		{
			key: "IDDPrefix",
			value: function() {
				if (!(this.v1 || this.v2)) return this.metadata[1];
			}
		},
		{
			key: "defaultIDDPrefix",
			value: function() {
				if (!(this.v1 || this.v2)) return this.metadata[12];
			}
		},
		{
			key: "nationalNumberPattern",
			value: function() {
				return this.v1 || this.v2 ? this.metadata[1] : this.metadata[2];
			}
		},
		{
			key: "possibleLengths",
			value: function() {
				if (!this.v1) return this.metadata[this.v2 ? 2 : 3];
			}
		},
		{
			key: "_getFormats",
			value: function(e) {
				return e[this.v1 ? 2 : this.v2 ? 3 : 4];
			}
		},
		{
			key: "formats",
			value: function() {
				var e = this;
				return (this._getFormats(this.metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || []).map(function(t) {
					return new sc(t, e);
				});
			}
		},
		{
			key: "nationalPrefix",
			value: function() {
				return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
			}
		},
		{
			key: "_getNationalPrefixFormattingRule",
			value: function(e) {
				return e[this.v1 ? 4 : this.v2 ? 5 : 6];
			}
		},
		{
			key: "nationalPrefixFormattingRule",
			value: function() {
				return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion());
			}
		},
		{
			key: "_nationalPrefixForParsing",
			value: function() {
				return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7];
			}
		},
		{
			key: "nationalPrefixForParsing",
			value: function() {
				return this._nationalPrefixForParsing() || this.nationalPrefix();
			}
		},
		{
			key: "nationalPrefixTransformRule",
			value: function() {
				return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
			}
		},
		{
			key: "_getNationalPrefixIsOptionalWhenFormatting",
			value: function() {
				return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
			}
		},
		{
			key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
			value: function() {
				return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion());
			}
		},
		{
			key: "leadingDigits",
			value: function() {
				return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
			}
		},
		{
			key: "types",
			value: function() {
				return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
			}
		},
		{
			key: "hasTypes",
			value: function() {
				return this.types() && this.types().length === 0 ? !1 : !!this.types();
			}
		},
		{
			key: "type",
			value: function(e) {
				if (this.hasTypes() && uc(this.types(), e)) return new lc(uc(this.types(), e), this);
			}
		},
		{
			key: "ext",
			value: function() {
				return this.v1 || this.v2 ? ic : this.metadata[13] || ic;
			}
		}
	]);
}(), sc = /* @__PURE__ */ function() {
	function e(t, n) {
		Zs(this, e), this._format = t, this.metadata = n;
	}
	return $s(e, [
		{
			key: "pattern",
			value: function() {
				return this._format[0];
			}
		},
		{
			key: "format",
			value: function() {
				return this._format[1];
			}
		},
		{
			key: "leadingDigitsPatterns",
			value: function() {
				return this._format[2] || [];
			}
		},
		{
			key: "nationalPrefixFormattingRule",
			value: function() {
				return this._format[3] || this.metadata.nationalPrefixFormattingRule();
			}
		},
		{
			key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
			value: function() {
				return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
			}
		},
		{
			key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
			value: function() {
				return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
			}
		},
		{
			key: "usesNationalPrefix",
			value: function() {
				return !!(this.nationalPrefixFormattingRule() && !cc.test(this.nationalPrefixFormattingRule()));
			}
		},
		{
			key: "internationalFormat",
			value: function() {
				return this._format[5] || this.format();
			}
		}
	]);
}(), cc = /^\(?\$1\)?$/, lc = /* @__PURE__ */ function() {
	function e(t, n) {
		Zs(this, e), this.type = t, this.metadata = n;
	}
	return $s(e, [{
		key: "pattern",
		value: function() {
			return this.metadata.v1 ? this.type : this.type[0];
		}
	}, {
		key: "possibleLengths",
		value: function() {
			if (!this.metadata.v1) return this.type[1] || this.metadata.possibleLengths();
		}
	}]);
}();
function uc(e, t) {
	switch (t) {
		case "FIXED_LINE": return e[0];
		case "MOBILE": return e[1];
		case "TOLL_FREE": return e[2];
		case "PREMIUM_RATE": return e[3];
		case "PERSONAL_NUMBER": return e[4];
		case "VOICEMAIL": return e[5];
		case "UAN": return e[6];
		case "PAGER": return e[7];
		case "VOIP": return e[8];
		case "SHARED_COST": return e[9];
	}
}
function dc(e) {
	if (!e) throw Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");
	if (!Ys(e) || !Ys(e.countries)) throw Error(`[libphonenumber-js] \`metadata\` argument was passed but it's not a valid metadata. Must be an object having \`.countries\` child object property. Got ${Ys(e) ? "an object of shape: { " + Object.keys(e).join(", ") + " }" : "a " + fc(e) + ": " + e}.`);
}
/* istanbul ignore next */
var fc = function(e) {
	return Xs(e);
};
function pc(e, t) {
	if (t = new Z(t), t.hasCountry(e)) return t.selectNumberingPlan(e).countryCallingCode();
	throw Error(`Unknown country: ${e}`);
}
function mc(e, t) {
	return t.countries.hasOwnProperty(e);
}
function hc(e) {
	var t = e.version;
	typeof t == "number" ? (this.v1 = t === 1, this.v2 = t === 2, this.v3 = t === 3, this.v4 = t === 4) : t ? qs(t, nc) === -1 ? this.v2 = !0 : qs(t, rc) === -1 ? this.v3 = !0 : this.v4 = !0 : this.v1 = !0;
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/mergeArrays.js
function gc(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = _c(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _c(e, t) {
	if (e) {
		if (typeof e == "string") return vc(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? vc(e, t) : void 0;
	}
}
function vc(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function yc(e, t) {
	for (var n = e.slice(), r = gc(t), i; !(i = r()).done;) {
		var a = i.value;
		e.indexOf(a) < 0 && n.push(a);
	}
	return n.sort(function(e, t) {
		return e - t;
	});
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/checkNumberLength.js
function bc(e, t, n) {
	return xc(e, t, void 0, n);
}
function xc(e, t, n, r) {
	t && (r = new Z(r.metadata), r.selectNumberingPlan(t));
	var i = r.type(n), a = i && i.possibleLengths() || r.possibleLengths();
	if (!a) return "IS_POSSIBLE";
	if (n === "FIXED_LINE_OR_MOBILE") {
		/* istanbul ignore next */
		if (!r.type("FIXED_LINE")) return xc(e, t, "MOBILE", r);
		var o = r.type("MOBILE");
		o && (a = yc(a, o.possibleLengths()));
	} else if (n && !i) return "INVALID_LENGTH";
	var s = e.length, c = a[0];
	return c === s ? "IS_POSSIBLE" : c > s ? "TOO_SHORT" : a[a.length - 1] < s ? "TOO_LONG" : a.indexOf(s, 1) >= 0 ? "IS_POSSIBLE" : "INVALID_LENGTH";
}
//#endregion
//#region node_modules/libphonenumber-js/es6/isPossible.js
function Sc(e, t, n) {
	if (t === void 0 && (t = {}), n = new Z(n), t.v2) {
		if (!e.countryCallingCode) throw Error("Invalid phone number object passed");
		n.selectNumberingPlan(e.countryCallingCode);
	} else {
		if (!e.phone) return !1;
		if (e.country) {
			if (!n.hasCountry(e.country)) throw Error(`Unknown country: ${e.country}`);
			n.selectNumberingPlan(e.country);
		} else {
			if (!e.countryCallingCode) throw Error("Invalid phone number object passed");
			n.selectNumberingPlan(e.countryCallingCode);
		}
	}
	if (n.possibleLengths()) return Cc(e.phone || e.nationalNumber, e.country, n);
	if (e.countryCallingCode && n.isNonGeographicCallingCode(e.countryCallingCode)) return !0;
	throw Error("Missing \"possibleLengths\" in metadata. Perhaps the metadata has been generated before v1.0.18.");
}
function Cc(e, t, n) {
	switch (bc(e, t, n)) {
		case "IS_POSSIBLE": return !0;
		default: return !1;
	}
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/matchesEntirely.js
function wc(e, t) {
	return e ||= "", RegExp("^(?:" + t + ")$").test(e);
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/getNumberType.js
function Tc(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = Ec(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ec(e, t) {
	if (e) {
		if (typeof e == "string") return Dc(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Dc(e, t) : void 0;
	}
}
function Dc(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var Oc = [
	"MOBILE",
	"PREMIUM_RATE",
	"TOLL_FREE",
	"SHARED_COST",
	"VOIP",
	"PERSONAL_NUMBER",
	"PAGER",
	"UAN",
	"VOICEMAIL"
];
function kc(e, t, n) {
	if (t ||= {}, !(!e.country && !e.countryCallingCode)) {
		n = new Z(n), n.selectNumberingPlan(e.country, e.countryCallingCode);
		var r = t.v2 ? e.nationalNumber : e.phone;
		if (wc(r, n.nationalNumberPattern())) {
			if (Ac(r, "FIXED_LINE", n)) return n.type("MOBILE") && n.type("MOBILE").pattern() === "" || !n.type("MOBILE") || Ac(r, "MOBILE", n) ? "FIXED_LINE_OR_MOBILE" : "FIXED_LINE";
			for (var i = Tc(Oc), a; !(a = i()).done;) {
				var o = a.value;
				if (Ac(r, o, n)) return o;
			}
		}
	}
}
function Ac(e, t, n) {
	var r = n.type(t);
	return !r || !r.pattern() || r.possibleLengths() && r.possibleLengths().indexOf(e.length) < 0 ? !1 : wc(e, r.pattern());
}
//#endregion
//#region node_modules/libphonenumber-js/es6/isValid.js
function jc(e, t, n) {
	return t ||= {}, n = new Z(n), n.selectNumberingPlan(e.country, e.countryCallingCode), n.hasTypes() ? kc(e, t, n.metadata) !== void 0 : wc(t.v2 ? e.nationalNumber : e.phone, n.nationalNumberPattern());
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/getPossibleCountriesForNumber.js
function Mc(e, t, n) {
	var r = new Z(n).getCountryCodesForCallingCode(e);
	return r ? r.filter(function(e) {
		return Nc(t, e, n);
	}) : [];
}
function Nc(e, t, n) {
	var r = new Z(n);
	return r.selectNumberingPlan(t), r.numberingPlan.possibleLengths().indexOf(e.length) >= 0;
}
//#endregion
//#region node_modules/libphonenumber-js/es6/constants.js
var Q = "0-9０-９٠-٩۰-۹", Pc = "-‐-―−ー－／/．. \xA0­​⁠　()（）［］\\[\\]~⁓∼～", Fc = "+＋", Ic = RegExp("([" + Q + "])");
function Lc(e, t, n, r) {
	if (t) {
		var i = new Z(r);
		i.selectNumberingPlan(t, n);
		var a = new RegExp(i.IDDPrefix());
		if (e.search(a) === 0) {
			e = e.slice(e.match(a)[0].length);
			var o = e.match(Ic);
			if (!(o && o[1] != null && o[1].length > 0 && o[1] === "0")) return e;
		}
	}
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/extractNationalNumberFromPossiblyIncompleteNumber.js
function Rc(e, t) {
	if (e && t.numberingPlan.nationalPrefixForParsing()) {
		var n = RegExp("^(?:" + t.numberingPlan.nationalPrefixForParsing() + ")"), r = n.exec(e);
		if (r) {
			var i, a, o = r.length - 1, s = o > 0 && r[o];
			if (t.nationalPrefixTransformRule() && s) i = e.replace(n, t.nationalPrefixTransformRule()), o > 1 && (a = r[1]);
			else {
				var c = r[0];
				i = e.slice(c.length), s && (a = r[1]);
			}
			var l;
			if (s) {
				var u = e.indexOf(r[1]);
				e.slice(0, u) === t.numberingPlan.nationalPrefix() && (l = t.numberingPlan.nationalPrefix());
			} else l = r[0];
			return {
				nationalNumber: i,
				nationalPrefix: l,
				carrierCode: a
			};
		}
	}
	return { nationalNumber: e };
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/getCountryByNationalNumber.js
function zc(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = Bc(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Bc(e, t) {
	if (e) {
		if (typeof e == "string") return Vc(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Vc(e, t) : void 0;
	}
}
function Vc(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Hc(e, t) {
	var n = t.countries, r = t.metadata;
	r = new Z(r);
	for (var i = zc(n), a; !(a = i()).done;) {
		var o = a.value;
		if (r.selectNumberingPlan(o), r.leadingDigits()) {
			if (e && e.search(r.leadingDigits()) === 0) return o;
		} else if (kc({
			phone: e,
			country: o
		}, void 0, r.metadata)) return o;
	}
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/getCountryByCallingCode.js
var Uc = !1;
function Wc(e, t) {
	var n = t.nationalNumber, r = t.metadata;
	/* istanbul ignore if */
	if (Uc && r.isNonGeographicCallingCode(e)) return "001";
	var i = r.getCountryCodesForCallingCode(e);
	if (i) return i.length === 1 ? i[0] : Hc(n, {
		countries: i,
		metadata: r.metadata
	});
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/extractNationalNumber.js
function Gc(e, t, n) {
	var r = Rc(e, n), i = r.carrierCode, a = r.nationalNumber;
	return a !== e && (!Kc(e, a, n) || n.numberingPlan.possibleLengths() && (t ||= Wc(n.numberingPlan.callingCode(), {
		nationalNumber: a,
		metadata: n
	}), !qc(a, t, n))) ? { nationalNumber: e } : {
		nationalNumber: a,
		carrierCode: i
	};
}
function Kc(e, t, n) {
	return !(wc(e, n.nationalNumberPattern()) && !wc(t, n.nationalNumberPattern()));
}
function qc(e, t, n) {
	switch (bc(e, t, n)) {
		case "TOO_SHORT":
		case "INVALID_LENGTH": return !1;
		default: return !0;
	}
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCodeFromInternationalNumberWithoutPlusSign.js
function Jc(e, t, n, r, i) {
	var a = t || n ? pc(t || n, i) : r;
	if (e.indexOf(a) === 0) {
		i = new Z(i), i.selectNumberingPlan(t || n, a);
		var o = e.slice(a.length), s = Gc(o, t, i).nationalNumber, c = Gc(e, t, i).nationalNumber;
		if (!wc(c, i.nationalNumberPattern()) && wc(s, i.nationalNumberPattern()) || bc(c, t, i) === "TOO_LONG") return {
			countryCallingCode: a,
			number: o
		};
	}
	return { number: e };
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/extractCountryCallingCode.js
function Yc(e, t, n, r, i) {
	if (!e) return {};
	var a;
	if (e[0] !== "+") {
		var o = Lc(e, t || n, r, i);
		if (o && o !== e) a = !0, e = "+" + o;
		else {
			if (t || n || r) {
				var s = Jc(e, t, n, r, i), c = s.countryCallingCode, l = s.number;
				if (c) return {
					countryCallingCodeSource: "FROM_NUMBER_WITHOUT_PLUS_SIGN",
					countryCallingCode: c,
					number: l
				};
			}
			return { number: e };
		}
	}
	if (e[1] === "0") return {};
	i = new Z(i);
	for (var u = 2; u - 1 <= 3 && u <= e.length;) {
		var d = e.slice(1, u);
		if (i.hasCallingCode(d)) return i.selectNumberingPlan(d), {
			countryCallingCodeSource: a ? "FROM_NUMBER_WITH_IDD" : "FROM_NUMBER_WITH_PLUS_SIGN",
			countryCallingCode: d,
			number: e.slice(u)
		};
		u++;
	}
	return {};
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/applyInternationalSeparatorStyle.js
function Xc(e) {
	return e.replace(RegExp(`[${Pc}]+`, "g"), " ").trim();
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/formatNationalNumberUsingFormat.js
var Zc = /(\$\d)/;
function Qc(e, t, n) {
	var r = n.useInternationalFormat, i = n.withNationalPrefix;
	n.carrierCode, n.metadata;
	var a = e.replace(new RegExp(t.pattern()), r ? t.internationalFormat() : i && t.nationalPrefixFormattingRule() ? t.format().replace(Zc, t.nationalPrefixFormattingRule()) : t.format());
	return r ? Xc(a) : a;
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/getIddPrefix.js
var $c = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;
function el(e, t, n) {
	var r = new Z(n);
	if (r.selectNumberingPlan(e, t), r.defaultIDDPrefix()) return r.defaultIDDPrefix();
	if ($c.test(r.IDDPrefix())) return r.IDDPrefix();
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/extension/createExtensionPattern.js
var tl = ";ext=", nl = function(e) {
	return `([${Q}]{1,${e}})`;
};
function rl(e) {
	var t = "20", n = "15", r = "9", i = "6", a = "[ \xA0\\t,]*", o = "[:\\.．]?[ \xA0\\t,-]*", s = "#?", c = "(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|доб|anexo)", l = "(?:[xｘ#＃~～]|int|ｉｎｔ)", u = "[- ]+", d = "[ \xA0\\t]*", f = "(?:,{2}|;)", p = tl + nl(t), m = a + c + o + nl(t) + s, h = a + l + o + nl(r) + s, g = u + nl(i) + "#", _ = d + f + o + nl(n) + s, v = d + "(?:,)+" + o + nl(r) + s;
	return p + "|" + m + "|" + h + "|" + g + "|" + _ + "|" + v;
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/isViablePhoneNumber.js
var il = "[" + Q + "]{2}", al = "[" + Fc + "]{0,1}(?:[" + Pc + "]*[" + Q + "]){3,}[" + Pc + Q + "]*", ol = RegExp("^[" + Fc + "]{0,1}(?:[" + Pc + "]*[" + Q + "]){1,2}$", "i"), sl = al + "(?:" + rl() + ")?", cl = RegExp("^" + il + "$|^" + sl + "$", "i");
function ll(e) {
	return e.length >= 2 && cl.test(e);
}
function ul(e) {
	return ol.test(e);
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/RFC3966.js
function dl(e) {
	var t = e.number, n = e.ext;
	if (!t) return "";
	if (t[0] !== "+") throw Error("\"formatRFC3966()\" expects \"number\" to be in E.164 format.");
	return `tel:${t}${n ? ";ext=" + n : ""}`;
}
//#endregion
//#region node_modules/libphonenumber-js/es6/format.js
var fl = { formatExtension: function(e, t, n) {
	return `${e}${n.ext()}${t}`;
} };
function pl(e, t, n, r) {
	if (n = n ? vl({}, fl, n) : fl, r = new Z(r), e.country && e.country !== "001") {
		if (!r.hasCountry(e.country)) throw Error(`Unknown country: ${e.country}`);
		r.selectNumberingPlan(e.country);
	} else if (e.countryCallingCode) r.selectNumberingPlan(e.countryCallingCode);
	else return e.phone || "";
	var i = r.countryCallingCode(), a = n.v2 ? e.nationalNumber : e.phone, o;
	switch (t) {
		case "NATIONAL": return a ? (o = ml(a, e.carrierCode, "NATIONAL", r, n), gl(o, e.ext, r, n.formatExtension)) : "";
		case "INTERNATIONAL": return a ? (o = ml(a, null, "INTERNATIONAL", r, n), o = `+${i} ${o}`, gl(o, e.ext, r, n.formatExtension)) : `+${i}`;
		case "E.164": return `+${i}${a}`;
		case "RFC3966": return dl({
			number: `+${i}${a}`,
			ext: e.ext
		});
		case "IDD":
			if (!n.fromCountry) return;
			var s = _l(a, e.carrierCode, i, n.fromCountry, r);
			return s ? gl(s, e.ext, r, n.formatExtension) : void 0;
		default: throw Error(`Unknown "format" argument passed to "formatNumber()": "${t}"`);
	}
}
function ml(e, t, n, r, i) {
	var a = hl(r.formats(), e);
	return a ? Qc(e, a, {
		useInternationalFormat: n === "INTERNATIONAL",
		withNationalPrefix: !(a.nationalPrefixIsOptionalWhenFormattingInNationalFormat() && i && i.nationalPrefix === !1),
		carrierCode: t,
		metadata: r
	}) : e;
}
function hl(e, t) {
	return yl(e, function(e) {
		if (e.leadingDigitsPatterns().length > 0) {
			var n = e.leadingDigitsPatterns()[e.leadingDigitsPatterns().length - 1];
			if (t.search(n) !== 0) return !1;
		}
		return wc(t, e.pattern());
	});
}
function gl(e, t, n, r) {
	return t ? r(e, t, n) : e;
}
function _l(e, t, n, r, i) {
	if (pc(r, i.metadata) === n) {
		var a = ml(e, t, "NATIONAL", i);
		return n === "1" ? n + " " + a : a;
	}
	var o = el(r, void 0, i.metadata);
	if (o) return `${o} ${n} ${ml(e, null, "INTERNATIONAL", i)}`;
}
function vl() {
	for (var e = 1, t = [...arguments]; e < t.length;) {
		if (t[e]) for (var n in t[e]) t[0][n] = t[e][n];
		e++;
	}
	return t[0];
}
function yl(e, t) {
	for (var n = 0; n < e.length;) {
		if (t(e[n])) return e[n];
		n++;
	}
}
//#endregion
//#region node_modules/libphonenumber-js/es6/PhoneNumber.js
function bl(e) {
	"@babel/helpers - typeof";
	return bl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, bl(e);
}
function xl(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Sl(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? xl(Object(n), !0).forEach(function(t) {
			Cl(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xl(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Cl(e, t, n) {
	return (t = Dl(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function wl(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Tl(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Dl(r.key), r);
	}
}
function El(e, t, n) {
	return t && Tl(e.prototype, t), n && Tl(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Dl(e) {
	var t = Ol(e, "string");
	return bl(t) == "symbol" ? t : t + "";
}
function Ol(e, t) {
	if (bl(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (bl(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var kl = !1, Al = /* @__PURE__ */ function() {
	function e(t, n, r) {
		if (wl(this, e), !t) throw TypeError("First argument is required");
		if (typeof t != "string") throw TypeError("First argument must be a string");
		if (t[0] === "+" && !n) throw TypeError("`metadata` argument not passed");
		if (Ys(n) && Ys(n.countries)) {
			r = n;
			var i = t;
			if (!Nl.test(i)) throw Error("Invalid `number` argument passed: must consist of a \"+\" followed by digits");
			var a = Yc(i, void 0, void 0, void 0, r), o = a.countryCallingCode;
			if (n = a.number, t = o, !n) throw Error("Invalid `number` argument passed: too short");
		}
		if (!n) throw TypeError("`nationalNumber` argument is required");
		if (typeof n != "string") throw TypeError("`nationalNumber` argument must be a string");
		dc(r);
		var s = Ml(t, r), c = s.country, l = s.countryCallingCode;
		this.country = c, this.countryCallingCode = l, this.nationalNumber = n, this.number = "+" + this.countryCallingCode + this.nationalNumber, this.getMetadata = function() {
			return r;
		};
	}
	return El(e, [
		{
			key: "setExt",
			value: function(e) {
				this.ext = e;
			}
		},
		{
			key: "getPossibleCountries",
			value: function() {
				return this.country ? [this.country] : Mc(this.countryCallingCode, this.nationalNumber, this.getMetadata());
			}
		},
		{
			key: "isPossible",
			value: function() {
				return Sc(this, { v2: !0 }, this.getMetadata());
			}
		},
		{
			key: "isValid",
			value: function() {
				return jc(this, { v2: !0 }, this.getMetadata());
			}
		},
		{
			key: "isNonGeographic",
			value: function() {
				return new Z(this.getMetadata()).isNonGeographicCallingCode(this.countryCallingCode);
			}
		},
		{
			key: "isEqual",
			value: function(e) {
				return this.number === e.number && this.ext === e.ext;
			}
		},
		{
			key: "getType",
			value: function() {
				return kc(this, { v2: !0 }, this.getMetadata());
			}
		},
		{
			key: "format",
			value: function(e, t) {
				return pl(this, e, t ? Sl(Sl({}, t), {}, { v2: !0 }) : { v2: !0 }, this.getMetadata());
			}
		},
		{
			key: "formatNational",
			value: function(e) {
				return this.format("NATIONAL", e);
			}
		},
		{
			key: "formatInternational",
			value: function(e) {
				return this.format("INTERNATIONAL", e);
			}
		},
		{
			key: "getURI",
			value: function(e) {
				return this.format("RFC3966", e);
			}
		}
	]);
}(), jl = function(e) {
	return /^[A-Z]{2}$/.test(e);
};
function Ml(e, t) {
	var n, r, i = new Z(t);
	return jl(e) ? (n = e, i.selectNumberingPlan(n), r = i.countryCallingCode()) : (r = e, kl && i.isNonGeographicCallingCode(r) && (n = "001")), {
		country: n,
		countryCallingCode: r
	};
}
var Nl = /^\+\d+$/;
//#endregion
//#region node_modules/libphonenumber-js/es6/ParseError.js
function Pl(e) {
	"@babel/helpers - typeof";
	return Pl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Pl(e);
}
function Fl(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Ll(r.key), r);
	}
}
function Il(e, t, n) {
	return t && Fl(e.prototype, t), n && Fl(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Ll(e) {
	var t = Rl(e, "string");
	return Pl(t) == "symbol" ? t : t + "";
}
function Rl(e, t) {
	if (Pl(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Pl(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function zl(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Bl(e, t, n) {
	return t = Yl(t), Vl(e, Kl() ? Reflect.construct(t, n || [], Yl(e).constructor) : t.apply(e, n));
}
function Vl(e, t) {
	if (t && (Pl(t) == "object" || typeof t == "function")) return t;
	if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
	return Hl(e);
}
function Hl(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function Ul(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Jl(e, t);
}
function Wl(e) {
	var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
	return Wl = function(e) {
		if (e === null || !ql(e)) return e;
		if (typeof e != "function") throw TypeError("Super expression must either be null or a function");
		if (t !== void 0) {
			if (t.has(e)) return t.get(e);
			t.set(e, n);
		}
		function n() {
			return Gl(e, arguments, Yl(this).constructor);
		}
		return n.prototype = Object.create(e.prototype, { constructor: {
			value: n,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), Jl(n, e);
	}, Wl(e);
}
function Gl(e, t, n) {
	if (Kl()) return Reflect.construct.apply(null, arguments);
	var r = [null];
	r.push.apply(r, t);
	var i = new (e.bind.apply(e, r))();
	return n && Jl(i, n.prototype), i;
}
function Kl() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch {}
	return (Kl = function() {
		return !!e;
	})();
}
function ql(e) {
	try {
		return Function.toString.call(e).indexOf("[native code]") !== -1;
	} catch {
		return typeof e == "function";
	}
}
function Jl(e, t) {
	return Jl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, Jl(e, t);
}
function Yl(e) {
	return Yl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, Yl(e);
}
var Xl = /* @__PURE__ */ function(e) {
	function t(e) {
		var n;
		return zl(this, t), n = Bl(this, t, [e]), Object.setPrototypeOf(n, t.prototype), n.name = n.constructor.name, n;
	}
	return Ul(t, e), Il(t);
}(/* @__PURE__ */ Wl(Error)), Zl = RegExp("(?:" + rl() + ")$", "i");
function Ql(e) {
	var t = e.search(Zl);
	if (t < 0) return {};
	for (var n = e.slice(0, t), r = e.match(Zl), i = 1; i < r.length;) {
		if (r[i]) return {
			number: n,
			ext: r[i]
		};
		i++;
	}
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/parseDigits.js
function $l(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = eu(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function eu(e, t) {
	if (e) {
		if (typeof e == "string") return tu(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? tu(e, t) : void 0;
	}
}
function tu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var nu = {
	0: "0",
	1: "1",
	2: "2",
	3: "3",
	4: "4",
	5: "5",
	6: "6",
	7: "7",
	8: "8",
	9: "9",
	"０": "0",
	"１": "1",
	"２": "2",
	"３": "3",
	"４": "4",
	"５": "5",
	"６": "6",
	"７": "7",
	"８": "8",
	"９": "9",
	"٠": "0",
	"١": "1",
	"٢": "2",
	"٣": "3",
	"٤": "4",
	"٥": "5",
	"٦": "6",
	"٧": "7",
	"٨": "8",
	"٩": "9",
	"۰": "0",
	"۱": "1",
	"۲": "2",
	"۳": "3",
	"۴": "4",
	"۵": "5",
	"۶": "6",
	"۷": "7",
	"۸": "8",
	"۹": "9"
};
function ru(e) {
	return nu[e];
}
function iu(e) {
	for (var t = "", n = $l(e.split("")), r; !(r = n()).done;) {
		var i = r.value, a = ru(i);
		a && (t += a);
	}
	return t;
}
//#endregion
//#region node_modules/libphonenumber-js/es6/parseIncompletePhoneNumber.js
function au(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = ou(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ou(e, t) {
	if (e) {
		if (typeof e == "string") return su(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? su(e, t) : void 0;
	}
}
function su(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function cu(e) {
	for (var t = "", n = au(e.split("")), r; !(r = n()).done;) {
		var i = r.value;
		t += lu(i, t) || "";
	}
	return t;
}
function lu(e, t, n) {
	if (e === "+") {
		if (t) {
			typeof n == "function" && n("end");
			return;
		}
		return "+";
	}
	return ru(e);
}
var uu = "([" + Q + "]|[\\-\\.\\(\\)]?)", du = "^\\+" + uu + "*[" + Q + "]" + uu + "*$", fu = new RegExp(du, "g"), pu = Q, mu = "[" + pu + "]+((\\-)*[" + pu + "])*", hu = "[a-zA-Z]+((\\-)*[" + pu + "])*", gu = "^(" + mu + "\\.)*" + hu + "\\.?$", _u = new RegExp(gu, "g"), vu = "tel:", yu = ";phone-context=", bu = ";isub=";
function xu(e) {
	var t = e.indexOf(yu);
	if (t < 0) return null;
	var n = t + yu.length;
	if (n >= e.length) return "";
	var r = e.indexOf(";", n);
	return r >= 0 ? e.substring(n, r) : e.substring(n);
}
function Su(e) {
	return e === null ? !0 : e.length === 0 ? !1 : fu.test(e) || _u.test(e);
}
//#endregion
//#region node_modules/libphonenumber-js/es6/helpers/extractFormattedPhoneNumberFromPossibleRfc3966NumberUri.js
function Cu(e, t) {
	var n = t.extractFormattedPhoneNumber, r = xu(e);
	if (!Su(r)) throw new Xl("NOT_A_NUMBER");
	var i;
	if (r === null) i = n(e) || "";
	else {
		i = "", r.charAt(0) === "+" && (i += r);
		var a = e.indexOf(vu), o = a >= 0 ? a + vu.length : 0, s = e.indexOf(yu);
		i += e.substring(o, s);
	}
	var c = i.indexOf(bu);
	if (c > 0 && (i = i.substring(0, c)), i !== "") return i;
}
//#endregion
//#region node_modules/libphonenumber-js/es6/parse.js
var wu = 250, Tu = RegExp("[" + Fc + Q + "]"), Eu = RegExp("[^" + Q + "#]+$"), Du = !1;
function Ou(e, t, n) {
	if (t ||= {}, n = new Z(n), t.defaultCountry && !n.hasCountry(t.defaultCountry)) throw t.v2 ? new Xl("INVALID_COUNTRY") : Error(`Unknown country: ${t.defaultCountry}`);
	var r = Au(e, t.v2, t.extract), i = r.number, a = r.ext, o = r.error;
	if (!i) {
		if (t.v2) throw o === "TOO_SHORT" ? new Xl("TOO_SHORT") : new Xl("NOT_A_NUMBER");
		return {};
	}
	var s = Mu(i, t.defaultCountry, t.defaultCallingCode, n), c = s.country, l = s.nationalNumber, u = s.countryCallingCode, d = s.countryCallingCodeSource, f = s.carrierCode;
	if (!n.hasSelectedNumberingPlan()) {
		if (t.v2) throw new Xl("INVALID_COUNTRY");
		return {};
	}
	if (!l || l.length < 2) {
		/* istanbul ignore if */
		if (t.v2) throw new Xl("TOO_SHORT");
		return {};
	}
	if (l.length > 17) {
		if (t.v2) throw new Xl("TOO_LONG");
		return {};
	}
	if (t.v2) {
		var p = new Al(u, l, n.metadata);
		return c && (p.country = c), f && (p.carrierCode = f), a && (p.ext = a), p.__countryCallingCodeSource = d, p;
	}
	var m = (t.extended ? n.hasSelectedNumberingPlan() : c) ? wc(l, n.nationalNumberPattern()) : !1;
	return t.extended ? {
		country: c,
		countryCallingCode: u,
		carrierCode: f,
		valid: m,
		possible: m ? !0 : !!(t.extended === !0 && n.possibleLengths() && Cc(l, c, n)),
		phone: l,
		ext: a
	} : m ? ju(c, l, a) : {};
}
function ku(e, t, n) {
	if (e) {
		if (e.length > wu) {
			if (n) throw new Xl("TOO_LONG");
			return;
		}
		if (t === !1) return e;
		var r = e.search(Tu);
		if (!(r < 0)) return e.slice(r).replace(Eu, "");
	}
}
function Au(e, t, n) {
	var r = Cu(e, { extractFormattedPhoneNumber: function(e) {
		return ku(e, n, t);
	} });
	if (!r) return {};
	if (!ll(r)) return ul(r) ? { error: "TOO_SHORT" } : {};
	var i = Ql(r);
	return i.ext ? i : { number: r };
}
function ju(e, t, n) {
	var r = {
		country: e,
		phone: t
	};
	return n && (r.ext = n), r;
}
function Mu(e, t, n, r) {
	var i = Yc(cu(e), void 0, t, n, r.metadata), a = i.countryCallingCodeSource, o = i.countryCallingCode, s = i.number, c;
	if (o) r.selectNumberingPlan(o);
	else if (s && (t || n)) r.selectNumberingPlan(t, n), t ? c = t : Du && r.isNonGeographicCallingCode(n) && (c = "001"), o = n || pc(t, r.metadata);
	else return {};
	if (!s) return {
		countryCallingCodeSource: a,
		countryCallingCode: o
	};
	var l = Gc(cu(s), c, r), u = l.nationalNumber, d = l.carrierCode, f = Wc(o, {
		nationalNumber: u,
		metadata: r
	});
	return f && (c = f, f === "001" || r.selectNumberingPlan(c)), {
		country: c,
		countryCallingCode: o,
		countryCallingCodeSource: a,
		nationalNumber: u,
		carrierCode: d
	};
}
//#endregion
//#region node_modules/libphonenumber-js/es6/parsePhoneNumberWithError_.js
function Nu(e) {
	"@babel/helpers - typeof";
	return Nu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Nu(e);
}
function Pu(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Fu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Pu(Object(n), !0).forEach(function(t) {
			Iu(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Pu(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Iu(e, t, n) {
	return (t = Lu(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Lu(e) {
	var t = Ru(e, "string");
	return Nu(t) == "symbol" ? t : t + "";
}
function Ru(e, t) {
	if (Nu(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Nu(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function zu(e, t, n) {
	return Ou(e, Fu(Fu({}, t), {}, { v2: !0 }), n);
}
//#endregion
//#region node_modules/libphonenumber-js/es6/normalizeArguments.js
function Bu(e) {
	"@babel/helpers - typeof";
	return Bu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Bu(e);
}
function Vu(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Hu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Vu(Object(n), !0).forEach(function(t) {
			Uu(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Vu(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Uu(e, t, n) {
	return (t = Wu(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Wu(e) {
	var t = Gu(e, "string");
	return Bu(t) == "symbol" ? t : t + "";
}
function Gu(e, t) {
	if (Bu(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Bu(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ku(e, t) {
	return Zu(e) || Xu(e, t) || Ju(e, t) || qu();
}
function qu() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ju(e, t) {
	if (e) {
		if (typeof e == "string") return Yu(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Yu(e, t) : void 0;
	}
}
function Yu(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Xu(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Zu(e) {
	if (Array.isArray(e)) return e;
}
function Qu(e) {
	var t = Ku(Array.prototype.slice.call(e), 4), n = t[0], r = t[1], i = t[2], a = t[3], o, s, c;
	if (typeof n == "string") o = n;
	else throw TypeError("A text for parsing must be a string.");
	if (!r || typeof r == "string") a ? (s = i, c = a) : (s = void 0, c = i), r && (s = Hu({ defaultCountry: r }, s));
	else if (Ys(r)) i ? (s = r, c = i) : c = r;
	else throw Error(`Invalid second argument: ${r}`);
	return {
		text: o,
		options: s,
		metadata: c
	};
}
//#endregion
//#region node_modules/libphonenumber-js/es6/parsePhoneNumber_.js
function $u(e) {
	"@babel/helpers - typeof";
	return $u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, $u(e);
}
function ed(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function td(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ed(Object(n), !0).forEach(function(t) {
			nd(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ed(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function nd(e, t, n) {
	return (t = rd(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function rd(e) {
	var t = id(e, "string");
	return $u(t) == "symbol" ? t : t + "";
}
function id(e, t) {
	if ($u(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if ($u(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ad(e, t, n) {
	t && t.defaultCountry && !mc(t.defaultCountry, n) && (t = td(td({}, t), {}, { defaultCountry: void 0 }));
	try {
		return zu(e, t, n);
	} catch (e) {
		/* istanbul ignore else */
		if (!(e instanceof Xl)) throw e;
	}
}
//#endregion
//#region node_modules/libphonenumber-js/es6/parsePhoneNumber.js
function od() {
	var e = Qu(arguments), t = e.text, n = e.options, r = e.metadata;
	return ad(t, n, r);
}
//#endregion
//#region node_modules/libphonenumber-js/es6/AsYouTypeState.js
function sd(e) {
	"@babel/helpers - typeof";
	return sd = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, sd(e);
}
function cd(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function ld(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, dd(r.key), r);
	}
}
function ud(e, t, n) {
	return t && ld(e.prototype, t), n && ld(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function dd(e) {
	var t = fd(e, "string");
	return sd(t) == "symbol" ? t : t + "";
}
function fd(e, t) {
	if (sd(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (sd(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var pd = /* @__PURE__ */ function() {
	function e(t) {
		var n = t.onCountryChange, r = t.onCallingCodeChange;
		cd(this, e), this.onCountryChange = n, this.onCallingCodeChange = r;
	}
	return ud(e, [
		{
			key: "reset",
			value: function(e) {
				var t = e.country, n = e.callingCode;
				this.international = !1, this.missingPlus = !1, this.IDDPrefix = void 0, this.callingCode = void 0, this.digits = "", this.resetNationalSignificantNumber(), this.initCountryAndCallingCode(t, n);
			}
		},
		{
			key: "resetNationalSignificantNumber",
			value: function() {
				this.nationalSignificantNumber = this.getNationalDigits(), this.nationalSignificantNumberIsModified = !1, this.nationalPrefix = void 0, this.carrierCode = void 0, this.prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix = void 0;
			}
		},
		{
			key: "update",
			value: function(e) {
				for (var t = 0, n = Object.keys(e); t < n.length; t++) {
					var r = n[t];
					this[r] = e[r];
				}
			}
		},
		{
			key: "initCountryAndCallingCode",
			value: function(e, t) {
				this.setCountry(e), this.setCallingCode(t);
			}
		},
		{
			key: "setCountry",
			value: function(e) {
				this.country = e, this.onCountryChange(e);
			}
		},
		{
			key: "setCallingCode",
			value: function(e) {
				this.callingCode = e, this.onCallingCodeChange(e, this.country);
			}
		},
		{
			key: "startInternationalNumber",
			value: function(e, t) {
				this.international = !0, this.initCountryAndCallingCode(e, t);
			}
		},
		{
			key: "appendDigits",
			value: function(e) {
				this.digits += e;
			}
		},
		{
			key: "appendNationalSignificantNumberDigits",
			value: function(e) {
				this.nationalSignificantNumber += e;
			}
		},
		{
			key: "getNationalDigits",
			value: function() {
				return this.international ? this.digits.slice((this.IDDPrefix ? this.IDDPrefix.length : 0) + (this.callingCode ? this.callingCode.length : 0)) : this.digits;
			}
		},
		{
			key: "getDigitsWithoutInternationalPrefix",
			value: function() {
				return this.international && this.IDDPrefix ? this.digits.slice(this.IDDPrefix.length) : this.digits;
			}
		}
	]);
}();
//#endregion
//#region node_modules/libphonenumber-js/es6/AsYouTypeFormatter.util.js
function md(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = hd(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function hd(e, t) {
	if (e) {
		if (typeof e == "string") return gd(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? gd(e, t) : void 0;
	}
}
function gd(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var _d = /* @__PURE__ */ RegExp("x");
function vd(e, t) {
	if (t < 1) return "";
	for (var n = ""; t > 1;) t & 1 && (n += e), t >>= 1, e += e;
	return n + e;
}
function yd(e, t) {
	return e[t] === ")" && t++, bd(e.slice(0, t));
}
function bd(e) {
	for (var t = [], n = 0; n < e.length;) e[n] === "(" ? t.push(n) : e[n] === ")" && t.pop(), n++;
	var r = 0, i = "";
	t.push(e.length);
	for (var a = 0, o = t; a < o.length; a++) {
		var s = o[a];
		i += e.slice(r, s), r = s + 1;
	}
	return i;
}
function xd(e, t, n) {
	for (var r = md(n.split("")), i; !(i = r()).done;) {
		var a = i.value;
		if (e.slice(t + 1).search(_d) < 0) return;
		t = e.search(_d), e = e.replace(_d, a);
	}
	return [e, t];
}
//#endregion
//#region node_modules/libphonenumber-js/es6/AsYouTypeFormatter.complete.js
function Sd(e, t, n) {
	var r = n.metadata, i = n.shouldTryNationalPrefixFormattingRule, a = n.getSeparatorAfterNationalPrefix;
	if (RegExp(`^(?:${t.pattern()})\$`).test(e.nationalSignificantNumber)) return wd(e, t, {
		metadata: r,
		shouldTryNationalPrefixFormattingRule: i,
		getSeparatorAfterNationalPrefix: a
	});
}
function Cd(e, t, n) {
	return bc(e, t, n) === "IS_POSSIBLE";
}
function wd(e, t, n) {
	var r = n.metadata, i = n.shouldTryNationalPrefixFormattingRule, a = n.getSeparatorAfterNationalPrefix;
	if (e.nationalSignificantNumber, e.international, e.nationalPrefix, e.carrierCode, i(t)) {
		var o = Td(e, t, {
			useNationalPrefixFormattingRule: !0,
			getSeparatorAfterNationalPrefix: a,
			metadata: r
		});
		if (o) return o;
	}
	return Td(e, t, {
		useNationalPrefixFormattingRule: !1,
		getSeparatorAfterNationalPrefix: a,
		metadata: r
	});
}
function Td(e, t, n) {
	var r = n.metadata, i = n.useNationalPrefixFormattingRule, a = n.getSeparatorAfterNationalPrefix, o = Qc(e.nationalSignificantNumber, t, {
		carrierCode: e.carrierCode,
		useInternationalFormat: e.international,
		withNationalPrefix: i,
		metadata: r
	});
	if (i || (e.nationalPrefix ? o = e.nationalPrefix + a(t) + o : e.prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix && (o = e.prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix + " " + o)), Ed(o, e)) return o;
}
function Ed(e, t) {
	return iu(e) === t.getNationalDigits();
}
//#endregion
//#region node_modules/libphonenumber-js/es6/AsYouTypeFormatter.PatternParser.js
function Dd(e) {
	"@babel/helpers - typeof";
	return Dd = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Dd(e);
}
function Od(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function kd(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, jd(r.key), r);
	}
}
function Ad(e, t, n) {
	return t && kd(e.prototype, t), n && kd(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function jd(e) {
	var t = Md(e, "string");
	return Dd(t) == "symbol" ? t : t + "";
}
function Md(e, t) {
	if (Dd(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Dd(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Nd = /* @__PURE__ */ function() {
	function e() {
		Od(this, e);
	}
	return Ad(e, [
		{
			key: "parse",
			value: function(e) {
				if (this.context = [{
					or: !0,
					instructions: []
				}], this.parsePattern(e), this.context.length !== 1) throw Error("Non-finalized contexts left when pattern parse ended");
				var t = this.context[0], n = t.branches, r = t.instructions;
				if (n) return {
					op: "|",
					args: n.concat([Ld(r)])
				};
				/* istanbul ignore if */
				if (r.length === 0) throw Error("Pattern is required");
				return r.length === 1 ? r[0] : r;
			}
		},
		{
			key: "startContext",
			value: function(e) {
				this.context.push(e);
			}
		},
		{
			key: "endContext",
			value: function() {
				this.context.pop();
			}
		},
		{
			key: "getContext",
			value: function() {
				return this.context[this.context.length - 1];
			}
		},
		{
			key: "parsePattern",
			value: function(e) {
				if (!e) throw Error("Pattern is required");
				var t = e.match(Id);
				if (!t) {
					if (Fd.test(e)) throw Error(`Illegal characters found in a pattern: ${e}`);
					this.getContext().instructions = this.getContext().instructions.concat(e.split(""));
					return;
				}
				var n = t[1], r = e.slice(0, t.index), i = e.slice(t.index + n.length);
				switch (n) {
					case "(?:":
						r && this.parsePattern(r), this.startContext({
							or: !0,
							instructions: [],
							branches: []
						});
						break;
					case ")":
						if (!this.getContext().or) throw Error("\")\" operator must be preceded by \"(?:\" operator");
						if (r && this.parsePattern(r), this.getContext().instructions.length === 0) throw Error("No instructions found after \"|\" operator in an \"or\" group");
						var a = this.getContext().branches;
						a.push(Ld(this.getContext().instructions)), this.endContext(), this.getContext().instructions.push({
							op: "|",
							args: a
						});
						break;
					case "|":
						if (!this.getContext().or) throw Error("\"|\" operator can only be used inside \"or\" groups");
						if (r && this.parsePattern(r), !this.getContext().branches)
 /* istanbul ignore else */
						if (this.context.length === 1) this.getContext().branches = [];
						else throw Error("\"branches\" not found in an \"or\" group context");
						this.getContext().branches.push(Ld(this.getContext().instructions)), this.getContext().instructions = [];
						break;
					case "[":
						r && this.parsePattern(r), this.startContext({ oneOfSet: !0 });
						break;
					case "]":
						if (!this.getContext().oneOfSet) throw Error("\"]\" operator must be preceded by \"[\" operator");
						this.endContext(), this.getContext().instructions.push({
							op: "[]",
							args: Pd(r)
						});
						break;
					default: throw Error(`Unknown operator: ${n}`);
				}
				i && this.parsePattern(i);
			}
		}
	]);
}();
function Pd(e) {
	for (var t = [], n = 0; n < e.length;) {
		if (e[n] === "-") {
			if (n === 0 || n === e.length - 1) throw Error(`Couldn't parse a one-of set pattern: ${e}`);
			for (var r = e[n - 1].charCodeAt(0) + 1, i = e[n + 1].charCodeAt(0) - 1, a = r; a <= i;) t.push(String.fromCharCode(a)), a++;
		} else t.push(e[n]);
		n++;
	}
	return t;
}
var Fd = /[\(\)\[\]\?\:\|]/, Id = /* @__PURE__ */ RegExp("(\\||\\(\\?\\:|\\)|\\[|\\])");
function Ld(e) {
	return e.length === 1 ? e[0] : e;
}
//#endregion
//#region node_modules/libphonenumber-js/es6/AsYouTypeFormatter.PatternMatcher.js
function Rd(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = zd(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function zd(e, t) {
	if (e) {
		if (typeof e == "string") return Bd(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Bd(e, t) : void 0;
	}
}
function Bd(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Vd(e) {
	"@babel/helpers - typeof";
	return Vd = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Vd(e);
}
function Hd(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Ud(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Gd(r.key), r);
	}
}
function Wd(e, t, n) {
	return t && Ud(e.prototype, t), n && Ud(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Gd(e) {
	var t = Kd(e, "string");
	return Vd(t) == "symbol" ? t : t + "";
}
function Kd(e, t) {
	if (Vd(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Vd(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var qd = /* @__PURE__ */ function() {
	function e(t) {
		Hd(this, e), this.matchTree = new Nd().parse(t);
	}
	return Wd(e, [{
		key: "match",
		value: function(e) {
			var t = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}).allowOverflow;
			if (!e) throw Error("String is required");
			var n = Jd(e.split(""), this.matchTree, !0);
			if (n && n.match && delete n.matchedChars, !(n && n.overflow && !t)) return n;
		}
	}]);
}();
function Jd(e, t, n) {
	if (typeof t == "string") {
		var r = e.join("");
		return t.indexOf(r) === 0 ? e.length === t.length ? {
			match: !0,
			matchedChars: e
		} : { partialMatch: !0 } : r.indexOf(t) === 0 ? n && e.length > t.length ? { overflow: !0 } : {
			match: !0,
			matchedChars: e.slice(0, t.length)
		} : void 0;
	}
	if (Array.isArray(t)) {
		for (var i = e.slice(), a = 0; a < t.length;) {
			var o = t[a], s = Jd(i, o, n && a === t.length - 1);
			if (!s) return;
			if (s.overflow) return s;
			if (s.match) {
				if (i = i.slice(s.matchedChars.length), i.length === 0) return a === t.length - 1 ? {
					match: !0,
					matchedChars: e
				} : { partialMatch: !0 };
			} else if (s.partialMatch) return { partialMatch: !0 };
			else throw Error(`Unsupported match result:
${JSON.stringify(s, null, 2)}`);
			a++;
		}
		return n ? { overflow: !0 } : {
			match: !0,
			matchedChars: e.slice(0, e.length - i.length)
		};
	}
	switch (t.op) {
		case "|":
			for (var c, l = Rd(t.args), u; !(u = l()).done;) {
				var d = u.value, f = Jd(e, d, n);
				if (f) {
					if (f.overflow) return f;
					if (f.match) return {
						match: !0,
						matchedChars: f.matchedChars
					};
					if (f.partialMatch) c = !0;
					else throw Error(`Unsupported match result:
${JSON.stringify(f, null, 2)}`);
				}
			}
			return c ? { partialMatch: !0 } : void 0;
		case "[]":
			for (var p = Rd(t.args), m; !(m = p()).done;) {
				var h = m.value;
				if (e[0] === h) return e.length === 1 ? {
					match: !0,
					matchedChars: e
				} : n ? { overflow: !0 } : {
					match: !0,
					matchedChars: [h]
				};
			}
			return;
		default: throw Error(`Unsupported instruction tree: ${t}`);
	}
}
//#endregion
//#region node_modules/libphonenumber-js/es6/AsYouTypeFormatter.js
function Yd(e) {
	"@babel/helpers - typeof";
	return Yd = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Yd(e);
}
function Xd(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = Zd(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Zd(e, t) {
	if (e) {
		if (typeof e == "string") return Qd(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Qd(e, t) : void 0;
	}
}
function Qd(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function $d(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function ef(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, nf(r.key), r);
	}
}
function tf(e, t, n) {
	return t && ef(e.prototype, t), n && ef(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function nf(e) {
	var t = rf(e, "string");
	return Yd(t) == "symbol" ? t : t + "";
}
function rf(e, t) {
	if (Yd(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Yd(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var af = "9", of = vd(af, 15), sf = /[- ]/, cf = !0, lf = cf && function() {
	return /\[([^\[\]])*\]/g;
}, uf = cf && function() {
	return /\d(?=[^,}][^,}])/g;
}, df = RegExp("[" + Pc + "]*\\$1[" + Pc + "]*(\\$\\d[" + Pc + "]*)*$"), ff = 3, pf = /* @__PURE__ */ function() {
	function e(t) {
		t.state;
		var n = t.metadata;
		$d(this, e), this.metadata = n, this.resetFormat();
	}
	return tf(e, [
		{
			key: "resetFormat",
			value: function() {
				this.chosenFormat = void 0, this.template = void 0, this.nationalNumberTemplate = void 0, this.populatedNationalNumberTemplate = void 0, this.populatedNationalNumberTemplatePosition = -1;
			}
		},
		{
			key: "reset",
			value: function(e, t) {
				this.resetFormat(), e ? (this.isNANP = e.callingCode() === "1", this.matchingFormats = e.formats(), t.nationalSignificantNumber && this.narrowDownMatchingFormats(t)) : (this.isNANP = void 0, this.matchingFormats = []);
			}
		},
		{
			key: "format",
			value: function(e, t) {
				var n = this;
				if (Cd(t.nationalSignificantNumber, t.country, this.metadata)) for (var r = Xd(this.matchingFormats), i; !(i = r()).done;) {
					var a = i.value, o = Sd(t, a, {
						metadata: this.metadata,
						shouldTryNationalPrefixFormattingRule: function(e) {
							return n.shouldTryNationalPrefixFormattingRule(e, {
								international: t.international,
								nationalPrefix: t.nationalPrefix
							});
						},
						getSeparatorAfterNationalPrefix: function(e) {
							return n.getSeparatorAfterNationalPrefix(e);
						}
					});
					if (o) return this.resetFormat(), this.chosenFormat = a, this.setNationalNumberTemplate(o.replace(/\d/g, "x"), t), this.populatedNationalNumberTemplate = o, this.populatedNationalNumberTemplatePosition = this.template.lastIndexOf("x"), o;
				}
				return this.formatNationalNumberWithNextDigits(e, t);
			}
		},
		{
			key: "formatNationalNumberWithNextDigits",
			value: function(e, t) {
				var n = this.chosenFormat, r = this.chooseFormat(t);
				if (r) return r === n ? this.formatNextNationalNumberDigits(e) : this.formatNextNationalNumberDigits(t.getNationalDigits());
			}
		},
		{
			key: "narrowDownMatchingFormats",
			value: function(e) {
				var t = this, n = e.nationalSignificantNumber, r = e.nationalPrefix, i = e.international, a = n, o = a.length - ff;
				o < 0 && (o = 0), this.matchingFormats = this.matchingFormats.filter(function(e) {
					return t.formatSuits(e, i, r) && t.formatMatches(e, a, o);
				}), this.chosenFormat && this.matchingFormats.indexOf(this.chosenFormat) === -1 && this.resetFormat();
			}
		},
		{
			key: "formatSuits",
			value: function(e, t, n) {
				return !(n && !e.usesNationalPrefix() && !e.nationalPrefixIsOptionalWhenFormattingInNationalFormat() || !t && !n && e.nationalPrefixIsMandatoryWhenFormattingInNationalFormat());
			}
		},
		{
			key: "formatMatches",
			value: function(e, t, n) {
				var r = e.leadingDigitsPatterns().length;
				if (r === 0) return !0;
				n = Math.min(n, r - 1);
				var i = e.leadingDigitsPatterns()[n];
				if (t.length < ff) try {
					return new qd(i).match(t, { allowOverflow: !0 }) !== void 0;
				} catch (e) 				/* istanbul ignore next */ {
					return console.error(e), !0;
				}
				return RegExp(`^(${i})`).test(t);
			}
		},
		{
			key: "getFormatFormat",
			value: function(e, t) {
				return t ? e.internationalFormat() : e.format();
			}
		},
		{
			key: "chooseFormat",
			value: function(e) {
				/* istanbul ignore next */
				for (var t = this, n = function() {
					var n = a.value;
					return t.chosenFormat === n ? 0 : df.test(t.getFormatFormat(n, e.international)) ? t.createTemplateForFormat(n, e) ? (t.chosenFormat = n, 0) : (t.matchingFormats = t.matchingFormats.filter(function(e) {
						return e !== n;
					}), 1) : 1;
				}, r, i = Xd(this.matchingFormats.slice()), a; !(a = i()).done && (r = n(), r !== 0););
				return this.chosenFormat || this.resetFormat(), this.chosenFormat;
			}
		},
		{
			key: "createTemplateForFormat",
			value: function(e, t) {
				if (!(cf && e.pattern().indexOf("|") >= 0)) {
					var n = this.getTemplateForFormat(e, t);
					if (n) return this.setNationalNumberTemplate(n, t), !0;
				}
			}
		},
		{
			key: "getSeparatorAfterNationalPrefix",
			value: function(e) {
				return this.isNANP || e && e.nationalPrefixFormattingRule() && sf.test(e.nationalPrefixFormattingRule()) ? " " : "";
			}
		},
		{
			key: "getInternationalPrefixBeforeCountryCallingCode",
			value: function(e, t) {
				var n = e.IDDPrefix, r = e.missingPlus;
				return n ? t && t.spacing === !1 ? n : n + " " : r ? "" : "+";
			}
		},
		{
			key: "getTemplate",
			value: function(e) {
				if (this.template) {
					for (var t = -1, n = 0, r = e.international ? this.getInternationalPrefixBeforeCountryCallingCode(e, { spacing: !1 }) : ""; n < r.length + e.getDigitsWithoutInternationalPrefix().length;) t = this.template.indexOf("x", t + 1), n++;
					return yd(this.template, t + 1);
				}
			}
		},
		{
			key: "setNationalNumberTemplate",
			value: function(e, t) {
				this.nationalNumberTemplate = e, this.populatedNationalNumberTemplate = e, this.populatedNationalNumberTemplatePosition = -1, t.international ? this.template = this.getInternationalPrefixBeforeCountryCallingCode(t).replace(/[\d\+]/g, "x") + vd("x", t.callingCode.length) + " " + e : this.template = e;
			}
		},
		{
			key: "getTemplateForFormat",
			value: function(e, t) {
				var n = t.nationalSignificantNumber, r = t.international, i = t.nationalPrefix, a = t.prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix, o = e.pattern();
				/* istanbul ignore else */
				cf && (o = o.replace(lf(), "\\d").replace(uf(), "\\d"));
				var s = of.match(o)[0];
				if (!(n.length > s.length)) {
					var c = RegExp("^" + o + "$"), l = n.replace(/\d/g, af);
					c.test(l) && (s = l);
					var u = this.getFormatFormat(e, r), d;
					if (this.shouldTryNationalPrefixFormattingRule(e, {
						international: r,
						nationalPrefix: i
					})) {
						var f = u.replace(Zc, e.nationalPrefixFormattingRule());
						/* istanbul ignore else */
						if (iu(e.nationalPrefixFormattingRule()) === (i || "") + iu("$1") && (u = f, d = !0, i)) for (var p = i.length; p > 0;) u = u.replace(/\d/, "x"), p--;
					}
					var m = s.replace(new RegExp(o), u).replace(new RegExp(af, "g"), "x");
					return d || (a ? m = vd("x", a.length) + " " + m : i && (m = vd("x", i.length) + this.getSeparatorAfterNationalPrefix(e) + m)), r && (m = Xc(m)), m;
				}
			}
		},
		{
			key: "formatNextNationalNumberDigits",
			value: function(e) {
				var t = xd(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition, e);
				if (!t) {
					this.resetFormat();
					return;
				}
				return this.populatedNationalNumberTemplate = t[0], this.populatedNationalNumberTemplatePosition = t[1], yd(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition + 1);
			}
		},
		{
			key: "shouldTryNationalPrefixFormattingRule",
			value: function(e, t) {
				var n = t.international, r = t.nationalPrefix;
				if (e.nationalPrefixFormattingRule()) {
					var i = e.usesNationalPrefix();
					if (i && r || !i && !n) return !0;
				}
			}
		}
	]);
}();
//#endregion
//#region node_modules/libphonenumber-js/es6/AsYouTypeParser.js
function mf(e) {
	"@babel/helpers - typeof";
	return mf = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, mf(e);
}
function hf(e, t) {
	return bf(e) || yf(e, t) || _f(e, t) || gf();
}
function gf() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _f(e, t) {
	if (e) {
		if (typeof e == "string") return vf(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? vf(e, t) : void 0;
	}
}
function vf(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function yf(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function bf(e) {
	if (Array.isArray(e)) return e;
}
function xf(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Sf(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, wf(r.key), r);
	}
}
function Cf(e, t, n) {
	return t && Sf(e.prototype, t), n && Sf(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function wf(e) {
	var t = Tf(e, "string");
	return mf(t) == "symbol" ? t : t + "";
}
function Tf(e, t) {
	if (mf(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (mf(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Ef = "[" + Pc + Q + "]+", Df = RegExp("^" + Ef + "$", "i"), Of = "(?:[" + Fc + "][" + Pc + Q + "]*|[" + Pc + Q + "]+)", kf = RegExp("[^" + Pc + Q + "]+.*$"), Af = /[^\d\[\]]/, jf = /* @__PURE__ */ function() {
	function e(t) {
		var n = t.defaultCountry, r = t.defaultCallingCode, i = t.metadata, a = t.onNationalSignificantNumberChange;
		xf(this, e), this.defaultCountry = n, this.defaultCallingCode = r, this.metadata = i, this.onNationalSignificantNumberChange = a;
	}
	return Cf(e, [
		{
			key: "input",
			value: function(e, t) {
				var n = hf(Pf(e), 2), r = n[0], i = n[1], a = iu(r), o;
				return i && (t.digits || (t.startInternationalNumber(void 0, void 0), a || (o = !0))), a && this.inputDigits(a, t), {
					digits: a,
					justLeadingPlus: o
				};
			}
		},
		{
			key: "inputDigits",
			value: function(e, t) {
				var n = t.digits, r = n.length < 3 && n.length + e.length >= 3;
				if (t.appendDigits(e), r && this.extractIddPrefix(t), this.isWaitingForCountryCallingCode(t)) {
					if (!this.extractCountryCallingCode(t)) return;
				} else t.appendNationalSignificantNumberDigits(e);
				t.international || this.hasExtractedNationalSignificantNumber || this.extractNationalSignificantNumber(t.getNationalDigits(), function(e) {
					return t.update(e);
				});
			}
		},
		{
			key: "isWaitingForCountryCallingCode",
			value: function(e) {
				var t = e.international, n = e.callingCode;
				return t && !n;
			}
		},
		{
			key: "extractCountryCallingCode",
			value: function(e) {
				var t = Yc("+" + e.getDigitsWithoutInternationalPrefix(), e.country, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata), n = t.countryCallingCode, r = t.number;
				if (n) return e.setCallingCode(n), e.update({ nationalSignificantNumber: r }), !0;
			}
		},
		{
			key: "reset",
			value: function(e) {
				if (e) {
					this.hasSelectedNumberingPlan = !0;
					var t = e._nationalPrefixForParsing();
					this.couldPossiblyExtractAnotherNationalSignificantNumber = t && Af.test(t);
				} else this.hasSelectedNumberingPlan = void 0, this.couldPossiblyExtractAnotherNationalSignificantNumber = void 0;
			}
		},
		{
			key: "extractNationalSignificantNumber",
			value: function(e, t) {
				if (this.hasSelectedNumberingPlan) {
					var n = Rc(e, this.metadata), r = n.nationalPrefix, i = n.nationalNumber, a = n.carrierCode;
					if (i !== e) return this.onExtractedNationalNumber(r, a, i, e, t), !0;
				}
			}
		},
		{
			key: "extractAnotherNationalSignificantNumber",
			value: function(e, t, n) {
				if (!this.hasExtractedNationalSignificantNumber) return this.extractNationalSignificantNumber(e, n);
				if (this.couldPossiblyExtractAnotherNationalSignificantNumber) {
					var r = Rc(e, this.metadata), i = r.nationalPrefix, a = r.nationalNumber, o = r.carrierCode;
					if (a !== t) return this.onExtractedNationalNumber(i, o, a, e, n), !0;
				}
			}
		},
		{
			key: "onExtractedNationalNumber",
			value: function(e, t, n, r, i) {
				var a = !1, o, s = r.lastIndexOf(n);
				if (s < 0 || s !== r.length - n.length) a = !0;
				else {
					var c = r.slice(0, s);
					/* istanbul ignore if */
					c && c !== e && (o = c);
				}
				i({
					nationalPrefix: e,
					carrierCode: t,
					nationalSignificantNumber: n,
					nationalSignificantNumberIsModified: a,
					prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix: o
				}), this.hasExtractedNationalSignificantNumber = !0, this.onNationalSignificantNumberChange();
			}
		},
		{
			key: "reExtractNationalSignificantNumber",
			value: function(e) {
				if (this.extractAnotherNationalSignificantNumber(e.getNationalDigits(), e.nationalSignificantNumber, function(t) {
					return e.update(t);
				})) return !0;
				if (this.extractIddPrefix(e) || this.fixMissingPlus(e)) return this.extractCallingCodeAndNationalSignificantNumber(e), !0;
			}
		},
		{
			key: "extractIddPrefix",
			value: function(e) {
				var t = e.international, n = e.IDDPrefix, r = e.digits;
				if (e.nationalSignificantNumber, !(t || n)) {
					var i = Lc(r, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata);
					if (i !== void 0 && i !== r) return e.update({ IDDPrefix: r.slice(0, r.length - i.length) }), this.startInternationalNumber(e, {
						country: void 0,
						callingCode: void 0
					}), !0;
				}
			}
		},
		{
			key: "fixMissingPlus",
			value: function(e) {
				if (!e.international) {
					var t = Jc(e.digits, e.country, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata).countryCallingCode;
					if (t) return e.update({ missingPlus: !0 }), this.startInternationalNumber(e, {
						country: e.country,
						callingCode: t
					}), !0;
				}
			}
		},
		{
			key: "startInternationalNumber",
			value: function(e, t) {
				var n = t.country, r = t.callingCode;
				e.startInternationalNumber(n, r), e.nationalSignificantNumber && (e.resetNationalSignificantNumber(), this.onNationalSignificantNumberChange(), this.hasExtractedNationalSignificantNumber = void 0);
			}
		},
		{
			key: "extractCallingCodeAndNationalSignificantNumber",
			value: function(e) {
				this.extractCountryCallingCode(e) && this.extractNationalSignificantNumber(e.getNationalDigits(), function(t) {
					return e.update(t);
				});
			}
		}
	]);
}();
function Mf(e) {
	var t = e.search(Of);
	if (!(t < 0)) {
		e = e.slice(t);
		var n;
		return e[0] === "+" && (n = !0, e = e.slice(1)), e = e.replace(kf, ""), n && (e = "+" + e), e;
	}
}
function Nf(e) {
	var t = Mf(e) || "";
	return t[0] === "+" ? [t.slice(1), !0] : [t];
}
function Pf(e) {
	var t = hf(Nf(e), 2), n = t[0], r = t[1];
	return Df.test(n) || (n = ""), [n, r];
}
//#endregion
//#region node_modules/libphonenumber-js/es6/AsYouType.js
function Ff(e) {
	"@babel/helpers - typeof";
	return Ff = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Ff(e);
}
function If(e, t) {
	return Vf(e) || Bf(e, t) || Rf(e, t) || Lf();
}
function Lf() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Rf(e, t) {
	if (e) {
		if (typeof e == "string") return zf(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? zf(e, t) : void 0;
	}
}
function zf(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Bf(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Vf(e) {
	if (Array.isArray(e)) return e;
}
function Hf(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Uf(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Gf(r.key), r);
	}
}
function Wf(e, t, n) {
	return t && Uf(e.prototype, t), n && Uf(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Gf(e) {
	var t = Kf(e, "string");
	return Ff(t) == "symbol" ? t : t + "";
}
function Kf(e, t) {
	if (Ff(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Ff(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var qf = !1, Jf = /* @__PURE__ */ function() {
	function e(t, n) {
		Hf(this, e), this.metadata = new Z(n);
		var r = If(this.getCountryAndCallingCode(t), 2), i = r[0], a = r[1];
		this.defaultCountry = i, this.defaultCallingCode = a, this.reset();
	}
	return Wf(e, [
		{
			key: "getCountryAndCallingCode",
			value: function(e) {
				var t, n;
				return e && (Ys(e) ? (t = e.defaultCountry, n = e.defaultCallingCode) : t = e), t && !this.metadata.hasCountry(t) && (t = void 0), n && qf && this.metadata.isNonGeographicCallingCode(n) && (t = "001"), [t, n];
			}
		},
		{
			key: "input",
			value: function(e) {
				var t = this.parser.input(e, this.state), n = t.digits;
				if (t.justLeadingPlus) this.formattedOutput = "+";
				else if (n) {
					this.determineTheCountryIfNeeded(), this.state.nationalSignificantNumber && this.formatter.narrowDownMatchingFormats(this.state);
					var r;
					if (this.metadata.hasSelectedNumberingPlan() && (r = this.formatter.format(n, this.state)), r === void 0 && this.parser.reExtractNationalSignificantNumber(this.state)) {
						this.determineTheCountryIfNeeded();
						var i = this.state.getNationalDigits();
						i && (r = this.formatter.format(i, this.state));
					}
					this.formattedOutput = r ? this.getFullNumber(r) : this.getNonFormattedNumber();
				}
				return this.formattedOutput;
			}
		},
		{
			key: "reset",
			value: function() {
				var e = this;
				return this.state = new pd({
					onCountryChange: function(t) {
						e.country = t;
					},
					onCallingCodeChange: function(t, n) {
						e.metadata.selectNumberingPlan(n, t), e.formatter.reset(e.metadata.numberingPlan, e.state), e.parser.reset(e.metadata.numberingPlan);
					}
				}), this.formatter = new pf({
					state: this.state,
					metadata: this.metadata
				}), this.parser = new jf({
					defaultCountry: this.defaultCountry,
					defaultCallingCode: this.defaultCallingCode,
					metadata: this.metadata,
					state: this.state,
					onNationalSignificantNumberChange: function() {
						e.determineTheCountryIfNeeded(), e.formatter.reset(e.metadata.numberingPlan, e.state);
					}
				}), this.state.reset({
					country: this.defaultCountry,
					callingCode: this.defaultCallingCode
				}), this.formattedOutput = "", this;
			}
		},
		{
			key: "isInternational",
			value: function() {
				return this.state.international;
			}
		},
		{
			key: "getCallingCode",
			value: function() {
				if (this.isInternational()) return this.state.callingCode;
			}
		},
		{
			key: "getCountryCallingCode",
			value: function() {
				return this.getCallingCode();
			}
		},
		{
			key: "getCountry",
			value: function() {
				if (this.state.digits) return this._getCountry();
			}
		},
		{
			key: "_getCountry",
			value: function() {
				var e = this.state.country;
				if (!(qf && e === "001")) return e;
			}
		},
		{
			key: "determineTheCountryIfNeeded",
			value: function() {
				(!this.state.country || this.isCountryCallingCodeAmbiguous()) && this.determineTheCountry();
			}
		},
		{
			key: "getFullNumber",
			value: function(e) {
				var t = this;
				if (this.isInternational()) {
					var n = function(e) {
						return t.formatter.getInternationalPrefixBeforeCountryCallingCode(t.state, { spacing: !!e }) + e;
					}, r = this.state.callingCode;
					return n(r ? e ? `${r} ${e}` : r : `${this.state.getDigitsWithoutInternationalPrefix()}`);
				}
				return e;
			}
		},
		{
			key: "getNonFormattedNationalNumberWithPrefix",
			value: function() {
				var e = this.state, t = e.nationalSignificantNumber, n = e.prefixBeforeNationalSignificantNumberThatIsNotNationalPrefix, r = e.nationalPrefix, i = t, a = n || r;
				return a && (i = a + i), i;
			}
		},
		{
			key: "getNonFormattedNumber",
			value: function() {
				var e = this.state.nationalSignificantNumberIsModified;
				return this.getFullNumber(e ? this.state.getNationalDigits() : this.getNonFormattedNationalNumberWithPrefix());
			}
		},
		{
			key: "getNonFormattedTemplate",
			value: function() {
				var e = this.getNonFormattedNumber();
				if (e) return e.replace(/[\+\d]/g, "x");
			}
		},
		{
			key: "isCountryCallingCodeAmbiguous",
			value: function() {
				var e = this.state.callingCode, t = this.metadata.getCountryCodesForCallingCode(e);
				return t && t.length > 1;
			}
		},
		{
			key: "determineTheCountry",
			value: function() {
				this.state.setCountry(Wc(this.isInternational() ? this.state.callingCode : this.defaultCallingCode, {
					nationalNumber: this.state.nationalSignificantNumber,
					metadata: this.metadata
				}));
			}
		},
		{
			key: "getNumberValue",
			value: function() {
				var e = this.state, t = e.digits, n = e.callingCode, r = e.country, i = e.nationalSignificantNumber;
				if (t) {
					if (this.isInternational()) return n ? "+" + n + i : "+" + t;
					if (r || n) return "+" + (r ? this.metadata.countryCallingCode() : n) + i;
				}
			}
		},
		{
			key: "getNumber",
			value: function() {
				var e = this.state, t = e.nationalSignificantNumber, n = e.carrierCode, r = e.callingCode, i = this._getCountry();
				if (t && !(!i && !r)) {
					if (i && i === this.defaultCountry) {
						var a = new Z(this.metadata.metadata);
						a.selectNumberingPlan(i);
						var o = a.numberingPlan.callingCode(), s = this.metadata.getCountryCodesForCallingCode(o);
						if (s.length > 1) {
							var c = Hc(t, {
								countries: s,
								metadata: this.metadata.metadata
							});
							c && (i = c);
						}
					}
					var l = new Al(i || r, t, this.metadata.metadata);
					return n && (l.carrierCode = n), l;
				}
			}
		},
		{
			key: "isPossible",
			value: function() {
				var e = this.getNumber();
				return e ? e.isPossible() : !1;
			}
		},
		{
			key: "isValid",
			value: function() {
				var e = this.getNumber();
				return e ? e.isValid() : !1;
			}
		},
		{
			key: "getNationalNumber",
			value: function() {
				return this.state.nationalSignificantNumber;
			}
		},
		{
			key: "getChars",
			value: function() {
				return (this.state.international ? "+" : "") + this.state.digits;
			}
		},
		{
			key: "getTemplate",
			value: function() {
				return this.formatter.getTemplate(this.state) || this.getNonFormattedTemplate() || "";
			}
		}
	]);
}();
//#endregion
//#region node_modules/libphonenumber-js/es6/getCountries.js
function Yf(e) {
	return new Z(e).getCountries();
}
//#endregion
//#region node_modules/libphonenumber-js/es6/formatIncompletePhoneNumber.js
function Xf(e, t, n) {
	return n || (n = t, t = void 0), new Jf(t, n).input(e);
}
//#endregion
//#region node_modules/libphonenumber-js/min/exports/getCountryCallingCode.js
function Zf() {
	return Ks(pc, arguments);
}
//#endregion
//#region node_modules/prop-types/node_modules/react-is/cjs/react-is.production.min.js
var Qf = /* @__PURE__ */ y(((e) => {
	var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, c = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, u = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, p = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, h = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, _ = t ? Symbol.for("react.fundamental") : 60117, v = t ? Symbol.for("react.responder") : 60118, y = t ? Symbol.for("react.scope") : 60119;
	function b(e) {
		if (typeof e == "object" && e) {
			var t = e.$$typeof;
			switch (t) {
				case n: switch (e = e.type, e) {
					case l:
					case u:
					case i:
					case o:
					case a:
					case f: return e;
					default: switch (e &&= e.$$typeof, e) {
						case c:
						case d:
						case h:
						case m:
						case s: return e;
						default: return t;
					}
				}
				case r: return t;
			}
		}
	}
	function x(e) {
		return b(e) === u;
	}
	e.AsyncMode = l, e.ConcurrentMode = u, e.ContextConsumer = c, e.ContextProvider = s, e.Element = n, e.ForwardRef = d, e.Fragment = i, e.Lazy = h, e.Memo = m, e.Portal = r, e.Profiler = o, e.StrictMode = a, e.Suspense = f, e.isAsyncMode = function(e) {
		return x(e) || b(e) === l;
	}, e.isConcurrentMode = x, e.isContextConsumer = function(e) {
		return b(e) === c;
	}, e.isContextProvider = function(e) {
		return b(e) === s;
	}, e.isElement = function(e) {
		return typeof e == "object" && !!e && e.$$typeof === n;
	}, e.isForwardRef = function(e) {
		return b(e) === d;
	}, e.isFragment = function(e) {
		return b(e) === i;
	}, e.isLazy = function(e) {
		return b(e) === h;
	}, e.isMemo = function(e) {
		return b(e) === m;
	}, e.isPortal = function(e) {
		return b(e) === r;
	}, e.isProfiler = function(e) {
		return b(e) === o;
	}, e.isStrictMode = function(e) {
		return b(e) === a;
	}, e.isSuspense = function(e) {
		return b(e) === f;
	}, e.isValidElementType = function(e) {
		return typeof e == "string" || typeof e == "function" || e === i || e === u || e === o || e === a || e === f || e === p || typeof e == "object" && !!e && (e.$$typeof === h || e.$$typeof === m || e.$$typeof === s || e.$$typeof === c || e.$$typeof === d || e.$$typeof === _ || e.$$typeof === v || e.$$typeof === y || e.$$typeof === g);
	}, e.typeOf = b;
})), $f = /* @__PURE__ */ y(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, c = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, u = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, p = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, h = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, _ = t ? Symbol.for("react.fundamental") : 60117, v = t ? Symbol.for("react.responder") : 60118, y = t ? Symbol.for("react.scope") : 60119;
		function b(e) {
			return typeof e == "string" || typeof e == "function" || e === i || e === u || e === o || e === a || e === f || e === p || typeof e == "object" && !!e && (e.$$typeof === h || e.$$typeof === m || e.$$typeof === s || e.$$typeof === c || e.$$typeof === d || e.$$typeof === _ || e.$$typeof === v || e.$$typeof === y || e.$$typeof === g);
		}
		function x(e) {
			if (typeof e == "object" && e) {
				var t = e.$$typeof;
				switch (t) {
					case n:
						var p = e.type;
						switch (p) {
							case l:
							case u:
							case i:
							case o:
							case a:
							case f: return p;
							default:
								var g = p && p.$$typeof;
								switch (g) {
									case c:
									case d:
									case h:
									case m:
									case s: return g;
									default: return t;
								}
						}
					case r: return t;
				}
			}
		}
		var S = l, C = u, w = c, T = s, E = n, D = d, O = i, k = h, A = m, j = r, M = o, N = a, P = f, F = !1;
		function I(e) {
			return F || (F = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), L(e) || x(e) === l;
		}
		function L(e) {
			return x(e) === u;
		}
		function R(e) {
			return x(e) === c;
		}
		function ee(e) {
			return x(e) === s;
		}
		function z(e) {
			return typeof e == "object" && !!e && e.$$typeof === n;
		}
		function B(e) {
			return x(e) === d;
		}
		function te(e) {
			return x(e) === i;
		}
		function ne(e) {
			return x(e) === h;
		}
		function V(e) {
			return x(e) === m;
		}
		function H(e) {
			return x(e) === r;
		}
		function re(e) {
			return x(e) === o;
		}
		function U(e) {
			return x(e) === a;
		}
		function ie(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = w, e.ContextProvider = T, e.Element = E, e.ForwardRef = D, e.Fragment = O, e.Lazy = k, e.Memo = A, e.Portal = j, e.Profiler = M, e.StrictMode = N, e.Suspense = P, e.isAsyncMode = I, e.isConcurrentMode = L, e.isContextConsumer = R, e.isContextProvider = ee, e.isElement = z, e.isForwardRef = B, e.isFragment = te, e.isLazy = ne, e.isMemo = V, e.isPortal = H, e.isProfiler = re, e.isStrictMode = U, e.isSuspense = ie, e.isValidElementType = b, e.typeOf = x;
	})();
})), ep = /* @__PURE__ */ y(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = Qf() : t.exports = $f();
})), tp = /* @__PURE__ */ y(((e, t) => {
	var n = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, i = Object.prototype.propertyIsEnumerable;
	function a(e) {
		if (e == null) throw TypeError("Object.assign cannot be called with null or undefined");
		return Object(e);
	}
	function o() {
		try {
			if (!Object.assign) return !1;
			var e = /* @__PURE__ */ new String("abc");
			if (e[5] = "de", Object.getOwnPropertyNames(e)[0] === "5") return !1;
			for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
			if (Object.getOwnPropertyNames(t).map(function(e) {
				return t[e];
			}).join("") !== "0123456789") return !1;
			var r = {};
			return "abcdefghijklmnopqrst".split("").forEach(function(e) {
				r[e] = e;
			}), Object.keys(Object.assign({}, r)).join("") === "abcdefghijklmnopqrst";
		} catch {
			return !1;
		}
	}
	t.exports = o() ? Object.assign : function(e, t) {
		for (var o, s = a(e), c, l = 1; l < arguments.length; l++) {
			for (var u in o = Object(arguments[l]), o) r.call(o, u) && (s[u] = o[u]);
			if (n) {
				c = n(o);
				for (var d = 0; d < c.length; d++) i.call(o, c[d]) && (s[c[d]] = o[c[d]]);
			}
		}
		return s;
	};
})), np = /* @__PURE__ */ y(((e, t) => {
	t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
})), rp = /* @__PURE__ */ y(((e, t) => {
	t.exports = Function.call.bind(Object.prototype.hasOwnProperty);
})), ip = /* @__PURE__ */ y(((e, t) => {
	var n = function() {};
	if (process.env.NODE_ENV !== "production") {
		var r = np(), i = {}, a = rp();
		n = function(e) {
			var t = "Warning: " + e;
			typeof console < "u" && console.error(t);
			try {
				throw Error(t);
			} catch {}
		};
	}
	function o(e, t, o, s, c) {
		if (process.env.NODE_ENV !== "production") {
			for (var l in e) if (a(e, l)) {
				var u;
				try {
					if (typeof e[l] != "function") {
						var d = Error((s || "React class") + ": " + o + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
						throw d.name = "Invariant Violation", d;
					}
					u = e[l](t, l, s, o, null, r);
				} catch (e) {
					u = e;
				}
				if (u && !(u instanceof Error) && n((s || "React class") + ": type specification of " + o + " `" + l + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof u + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."), u instanceof Error && !(u.message in i)) {
					i[u.message] = !0;
					var f = c ? c() : "";
					n("Failed " + o + " type: " + u.message + (f ?? ""));
				}
			}
		}
	}
	o.resetWarningCache = function() {
		process.env.NODE_ENV !== "production" && (i = {});
	}, t.exports = o;
})), ap = /* @__PURE__ */ y(((e, t) => {
	var n = ep(), r = tp(), i = np(), a = rp(), o = ip(), s = function() {};
	process.env.NODE_ENV !== "production" && (s = function(e) {
		var t = "Warning: " + e;
		typeof console < "u" && console.error(t);
		try {
			throw Error(t);
		} catch {}
	});
	function c() {
		return null;
	}
	t.exports = function(e, t) {
		var l = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
		function d(e) {
			var t = e && (l && e[l] || e[u]);
			if (typeof t == "function") return t;
		}
		var f = "<<anonymous>>", p = {
			array: _("array"),
			bigint: _("bigint"),
			bool: _("boolean"),
			func: _("function"),
			number: _("number"),
			object: _("object"),
			string: _("string"),
			symbol: _("symbol"),
			any: v(),
			arrayOf: y,
			element: b(),
			elementType: x(),
			instanceOf: S,
			node: E(),
			objectOf: w,
			oneOf: C,
			oneOfType: T,
			shape: O,
			exact: k
		};
		function m(e, t) {
			return e === t ? e !== 0 || 1 / e == 1 / t : e !== e && t !== t;
		}
		function h(e, t) {
			this.message = e, this.data = t && typeof t == "object" ? t : {}, this.stack = "";
		}
		h.prototype = Error.prototype;
		function g(e) {
			if (process.env.NODE_ENV !== "production") var n = {}, r = 0;
			function a(a, o, c, l, u, d, p) {
				if (l ||= f, d ||= c, p !== i) {
					if (t) {
						var m = /* @__PURE__ */ Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
						throw m.name = "Invariant Violation", m;
					} else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
						var g = l + ":" + c;
						!n[g] && r < 3 && (s("You are manually calling a React.PropTypes validation function for the `" + d + "` prop on `" + l + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."), n[g] = !0, r++);
					}
				}
				return o[c] == null ? a ? o[c] === null ? new h("The " + u + " `" + d + "` is marked as required " + ("in `" + l + "`, but its value is `null`.")) : new h("The " + u + " `" + d + "` is marked as required in " + ("`" + l + "`, but its value is `undefined`.")) : null : e(o, c, l, u, d);
			}
			var o = a.bind(null, !1);
			return o.isRequired = a.bind(null, !0), o;
		}
		function _(e) {
			function t(t, n, r, i, a, o) {
				var s = t[n];
				if (M(s) !== e) {
					var c = N(s);
					return new h("Invalid " + i + " `" + a + "` of type " + ("`" + c + "` supplied to `" + r + "`, expected ") + ("`" + e + "`."), { expectedType: e });
				}
				return null;
			}
			return g(t);
		}
		function v() {
			return g(c);
		}
		function y(e) {
			function t(t, n, r, a, o) {
				if (typeof e != "function") return new h("Property `" + o + "` of component `" + r + "` has invalid PropType notation inside arrayOf.");
				var s = t[n];
				if (!Array.isArray(s)) {
					var c = M(s);
					return new h("Invalid " + a + " `" + o + "` of type " + ("`" + c + "` supplied to `" + r + "`, expected an array."));
				}
				for (var l = 0; l < s.length; l++) {
					var u = e(s, l, r, a, o + "[" + l + "]", i);
					if (u instanceof Error) return u;
				}
				return null;
			}
			return g(t);
		}
		function b() {
			function t(t, n, r, i, a) {
				var o = t[n];
				if (!e(o)) {
					var s = M(o);
					return new h("Invalid " + i + " `" + a + "` of type " + ("`" + s + "` supplied to `" + r + "`, expected a single ReactElement."));
				}
				return null;
			}
			return g(t);
		}
		function x() {
			function e(e, t, r, i, a) {
				var o = e[t];
				if (!n.isValidElementType(o)) {
					var s = M(o);
					return new h("Invalid " + i + " `" + a + "` of type " + ("`" + s + "` supplied to `" + r + "`, expected a single ReactElement type."));
				}
				return null;
			}
			return g(e);
		}
		function S(e) {
			function t(t, n, r, i, a) {
				if (!(t[n] instanceof e)) {
					var o = e.name || f, s = F(t[n]);
					return new h("Invalid " + i + " `" + a + "` of type " + ("`" + s + "` supplied to `" + r + "`, expected ") + ("instance of `" + o + "`."));
				}
				return null;
			}
			return g(t);
		}
		function C(e) {
			if (!Array.isArray(e)) return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? s("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).") : s("Invalid argument supplied to oneOf, expected an array.")), c;
			function t(t, n, r, i, a) {
				for (var o = t[n], s = 0; s < e.length; s++) if (m(o, e[s])) return null;
				var c = JSON.stringify(e, function(e, t) {
					return N(t) === "symbol" ? String(t) : t;
				});
				return new h("Invalid " + i + " `" + a + "` of value `" + String(o) + "` " + ("supplied to `" + r + "`, expected one of " + c + "."));
			}
			return g(t);
		}
		function w(e) {
			function t(t, n, r, o, s) {
				if (typeof e != "function") return new h("Property `" + s + "` of component `" + r + "` has invalid PropType notation inside objectOf.");
				var c = t[n], l = M(c);
				if (l !== "object") return new h("Invalid " + o + " `" + s + "` of type " + ("`" + l + "` supplied to `" + r + "`, expected an object."));
				for (var u in c) if (a(c, u)) {
					var d = e(c, u, r, o, s + "." + u, i);
					if (d instanceof Error) return d;
				}
				return null;
			}
			return g(t);
		}
		function T(e) {
			if (!Array.isArray(e)) return process.env.NODE_ENV !== "production" && s("Invalid argument supplied to oneOfType, expected an instance of array."), c;
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				if (typeof n != "function") return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + P(n) + " at index " + t + "."), c;
			}
			function r(t, n, r, o, s) {
				for (var c = [], l = 0; l < e.length; l++) {
					var u = e[l], d = u(t, n, r, o, s, i);
					if (d == null) return null;
					d.data && a(d.data, "expectedType") && c.push(d.data.expectedType);
				}
				var f = c.length > 0 ? ", expected one of type [" + c.join(", ") + "]" : "";
				return new h("Invalid " + o + " `" + s + "` supplied to " + ("`" + r + "`" + f + "."));
			}
			return g(r);
		}
		function E() {
			function e(e, t, n, r, i) {
				return A(e[t]) ? null : new h("Invalid " + r + " `" + i + "` supplied to " + ("`" + n + "`, expected a ReactNode."));
			}
			return g(e);
		}
		function D(e, t, n, r, i) {
			return new h((e || "React class") + ": " + t + " type `" + n + "." + r + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + i + "`.");
		}
		function O(e) {
			function t(t, n, r, a, o) {
				var s = t[n], c = M(s);
				if (c !== "object") return new h("Invalid " + a + " `" + o + "` of type `" + c + "` " + ("supplied to `" + r + "`, expected `object`."));
				for (var l in e) {
					var u = e[l];
					if (typeof u != "function") return D(r, a, o, l, N(u));
					var d = u(s, l, r, a, o + "." + l, i);
					if (d) return d;
				}
				return null;
			}
			return g(t);
		}
		function k(e) {
			function t(t, n, o, s, c) {
				var l = t[n], u = M(l);
				if (u !== "object") return new h("Invalid " + s + " `" + c + "` of type `" + u + "` " + ("supplied to `" + o + "`, expected `object`."));
				for (var d in r({}, t[n], e)) {
					var f = e[d];
					if (a(e, d) && typeof f != "function") return D(o, s, c, d, N(f));
					if (!f) return new h("Invalid " + s + " `" + c + "` key `" + d + "` supplied to `" + o + "`.\nBad object: " + JSON.stringify(t[n], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(e), null, "  "));
					var p = f(l, d, o, s, c + "." + d, i);
					if (p) return p;
				}
				return null;
			}
			return g(t);
		}
		function A(t) {
			switch (typeof t) {
				case "number":
				case "string":
				case "undefined": return !0;
				case "boolean": return !t;
				case "object":
					if (Array.isArray(t)) return t.every(A);
					if (t === null || e(t)) return !0;
					var n = d(t);
					if (n) {
						var r = n.call(t), i;
						if (n !== t.entries) {
							for (; !(i = r.next()).done;) if (!A(i.value)) return !1;
						} else for (; !(i = r.next()).done;) {
							var a = i.value;
							if (a && !A(a[1])) return !1;
						}
					} else return !1;
					return !0;
				default: return !1;
			}
		}
		function j(e, t) {
			return e === "symbol" ? !0 : t ? t["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && t instanceof Symbol : !1;
		}
		function M(e) {
			var t = typeof e;
			return Array.isArray(e) ? "array" : e instanceof RegExp ? "object" : j(t, e) ? "symbol" : t;
		}
		function N(e) {
			if (e == null) return "" + e;
			var t = M(e);
			if (t === "object") {
				if (e instanceof Date) return "date";
				if (e instanceof RegExp) return "regexp";
			}
			return t;
		}
		function P(e) {
			var t = N(e);
			switch (t) {
				case "array":
				case "object": return "an " + t;
				case "boolean":
				case "date":
				case "regexp": return "a " + t;
				default: return t;
			}
		}
		function F(e) {
			return !e.constructor || !e.constructor.name ? f : e.constructor.name;
		}
		return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
	};
})), op = /* @__PURE__ */ y(((e, t) => {
	var n = np();
	function r() {}
	function i() {}
	i.resetWarningCache = r, t.exports = function() {
		function e(e, t, r, i, a, o) {
			if (o !== n) {
				var s = /* @__PURE__ */ Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
				throw s.name = "Invariant Violation", s;
			}
		}
		e.isRequired = e;
		function t() {
			return e;
		}
		var a = {
			array: e,
			bigint: e,
			bool: e,
			func: e,
			number: e,
			object: e,
			string: e,
			symbol: e,
			any: e,
			arrayOf: t,
			element: e,
			elementType: e,
			instanceOf: t,
			node: e,
			objectOf: t,
			oneOf: t,
			oneOfType: t,
			shape: t,
			exact: t,
			checkPropTypes: i,
			resetWarningCache: r
		};
		return a.PropTypes = a, a;
	};
})), sp = /* @__PURE__ */ y(((e, t) => {
	if (process.env.NODE_ENV !== "production") {
		var n = ep();
		t.exports = ap()(n.isElement, !0);
	} else t.exports = op()();
})), cp = /* @__PURE__ */ y(((e, t) => {
	(function() {
		var e = {}.hasOwnProperty;
		function n() {
			for (var e = "", t = 0; t < arguments.length; t++) {
				var n = arguments[t];
				n && (e = i(e, r(n)));
			}
			return e;
		}
		function r(t) {
			if (typeof t == "string" || typeof t == "number") return t;
			if (typeof t != "object") return "";
			if (Array.isArray(t)) return n.apply(null, t);
			if (t.toString !== Object.prototype.toString && !t.toString.toString().includes("[native code]")) return t.toString();
			var r = "";
			for (var a in t) e.call(t, a) && t[a] && (r = i(r, a));
			return r;
		}
		function i(e, t) {
			return t ? e ? e + " " + t : e + t : e;
		}
		t !== void 0 && t.exports ? (n.default = n, t.exports = n) : typeof define == "function" && typeof define.amd == "object" && define.amd ? define("classnames", [], function() {
			return n;
		}) : window.classNames = n;
	})();
}));
//#endregion
//#region node_modules/input-format/modules/edit.js
function lp(e, t, n) {
	switch (n) {
		case "Backspace":
			t > 0 && (e = e.slice(0, t - 1) + e.slice(t), t--);
			break;
		case "Delete":
			e = e.slice(0, t) + e.slice(t + 1);
			break;
	}
	return {
		value: e,
		caret: t
	};
}
//#endregion
//#region node_modules/input-format/modules/parse.js
function up(e, t, n) {
	for (var r = {}, i = "", a = 0, o = 0; o < e.length;) {
		var s = n(e[o], i, r);
		s !== void 0 && (i += s, t !== void 0 && (t === o ? a = i.length - 1 : t > o && (a = i.length))), o++;
	}
	return t === void 0 && (a = i.length), {
		value: i,
		caret: a
	};
}
//#endregion
//#region node_modules/input-format/modules/helpers.js
function dp(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = fp(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function fp(e, t) {
	if (e) {
		if (typeof e == "string") return pp(e, t);
		var n = Object.prototype.toString.call(e).slice(8, -1);
		if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return pp(e, t);
	}
}
function pp(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function mp(e, t) {
	for (var n = 0, r = dp(t.split("")), i; !(i = r()).done;) i.value === e && n++;
	return n;
}
//#endregion
//#region node_modules/input-format/modules/closeBraces.js
function hp(e, t) {
	for (var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "x", r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : " ", i = e.length, a = mp("(", e) - mp(")", e); a > 0 && i < t.length;) e += t[i].replace(n, r), t[i] === ")" && a--, i++;
	return e;
}
//#endregion
//#region node_modules/input-format/modules/templateFormatter.js
function gp(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = _p(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _p(e, t) {
	if (e) {
		if (typeof e == "string") return vp(e, t);
		var n = Object.prototype.toString.call(e).slice(8, -1);
		if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return vp(e, t);
	}
}
function vp(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function yp(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "x", n = arguments.length > 2 ? arguments[2] : void 0;
	if (!e) return function(e) {
		return { text: e };
	};
	var r = mp(t, e);
	return function(i) {
		if (!i) return {
			text: "",
			template: e
		};
		for (var a = 0, o = "", s = gp(e.split("")), c; !(c = s()).done;) {
			var l = c.value;
			if (l !== t) {
				o += l;
				continue;
			}
			if (o += i[a], a++, a === i.length && i.length < r) break;
		}
		return n && (o = hp(o, e)), {
			text: o,
			template: e
		};
	};
}
//#endregion
//#region node_modules/input-format/modules/format.js
function bp(e, t, n) {
	typeof n == "string" && (n = yp(n));
	var r = n(e) || {}, i = r.text, a = r.template;
	if (i === void 0 && (i = e), a) if (t === void 0) t = i.length;
	else {
		for (var o = 0, s = !1, c = -1; o < i.length && o < a.length;) {
			if (i[o] !== a[o]) {
				if (t === 0) {
					s = !0, t = o;
					break;
				}
				c = o, t--;
			}
			o++;
		}
		s || (t = c + 1);
	}
	return {
		text: i,
		caret: t
	};
}
//#endregion
//#region node_modules/input-format/modules/dom.js
function xp(e) {
	return e.hasAttribute("readonly");
}
function Sp(e) {
	if (e.selectionStart !== e.selectionEnd) return {
		start: e.selectionStart,
		end: e.selectionEnd
	};
}
var Cp = {
	Backspace: 8,
	Delete: 46
};
function wp(e) {
	switch (e.keyCode) {
		case Cp.Backspace: return "Backspace";
		case Cp.Delete: return "Delete";
	}
}
function Tp(e) {
	return e.selectionStart;
}
function Ep(e, t) {
	t !== void 0 && (Dp() ? setTimeout(function() {
		return e.setSelectionRange(t, t);
	}, 0) : e.setSelectionRange(t, t));
}
function Dp() {
	if (typeof navigator < "u") return Op.test(navigator.userAgent);
}
var Op = /Android/i;
//#endregion
//#region node_modules/input-format/modules/inputControl.js
function kp(e, t, n, r, i) {
	Mp(t, n, r, void 0, i);
}
function Ap(e, t, n, r, i) {
	if (!xp(t)) {
		var a = wp(e);
		switch (a) {
			case "Delete":
			case "Backspace":
				e.preventDefault();
				var o = Sp(t);
				return o ? (jp(t, o), Mp(t, n, r, void 0, i)) : Mp(t, n, r, a, i);
			default:
		}
	}
}
function jp(e, t) {
	var n = e.value;
	n = n.slice(0, t.start) + n.slice(t.end), e.value = n, Ep(e, t.start);
}
function Mp(e, t, n, r, i) {
	var a = up(e.value, Tp(e), t), o = a.value, s = a.caret;
	if (r) {
		var c = lp(o, s, r);
		o = c.value, s = c.caret;
	}
	var l = bp(o, s, n), u = l.text;
	s = l.caret, e.value = u, Ep(e, s), i && i(o);
}
//#endregion
//#region node_modules/input-format/modules/react/useInput.js
var Np = [
	"ref",
	"parse",
	"format",
	"value",
	"defaultValue",
	"controlled",
	"onChange",
	"onKeyDown"
];
function Pp(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Fp(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Pp(Object(n), !0).forEach(function(t) {
			Ip(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Pp(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Ip(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Lp(e, t) {
	if (e == null) return {};
	var n = Rp(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
function Rp(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function zp(e) {
	var t = e.ref, n = e.parse, r = e.format, i = e.value, o = e.defaultValue, s = e.controlled, c = s === void 0 ? !0 : s, u = e.onChange, d = e.onKeyDown, f = Lp(e, Np), p = l(), m = a(function(e) {
		p.current = e, t && (typeof t == "function" ? t(e) : t.current = e);
	}, [t]), h = a(function(e) {
		return kp(e, p.current, n, r, u);
	}, [
		p,
		n,
		r,
		u
	]), g = a(function(e) {
		if (d && d(e), !e.defaultPrevented) return Ap(e, p.current, n, r, u);
	}, [
		p,
		n,
		r,
		u,
		d
	]), _ = Fp(Fp({}, f), {}, {
		ref: m,
		onChange: h,
		onKeyDown: g
	});
	return c ? Fp(Fp({}, _), {}, { value: r(Bp(i) ? "" : i).text }) : Fp(Fp({}, _), {}, { defaultValue: r(Bp(o) ? "" : o).text });
}
function Bp(e) {
	return e == null;
}
//#endregion
//#region node_modules/input-format/modules/react/Input.js
var $ = /* @__PURE__ */ x(sp(), 1), Vp = [
	"inputComponent",
	"parse",
	"format",
	"value",
	"defaultValue",
	"onChange",
	"controlled",
	"onKeyDown",
	"type"
];
function Hp(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Up(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Hp(Object(n), !0).forEach(function(t) {
			Wp(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hp(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Wp(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Gp(e, t) {
	if (e == null) return {};
	var n = Kp(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
function Kp(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function qp(e, t) {
	var n = e.inputComponent, r = n === void 0 ? "input" : n, a = e.parse, o = e.format, s = e.value, c = e.defaultValue, l = e.onChange, u = e.controlled, d = e.onKeyDown, f = e.type, p = f === void 0 ? "text" : f, m = Gp(e, Vp), h = zp(Up({
		ref: t,
		parse: a,
		format: o,
		value: s,
		defaultValue: c,
		onChange: l,
		controlled: u,
		onKeyDown: d,
		type: p
	}, m));
	return /* @__PURE__ */ i.createElement(r, h);
}
qp = /* @__PURE__ */ i.forwardRef(qp), qp.propTypes = {
	parse: $.default.func.isRequired,
	format: $.default.func.isRequired,
	inputComponent: $.default.elementType,
	type: $.default.string,
	value: $.default.string,
	defaultValue: $.default.string,
	onChange: $.default.func,
	controlled: $.default.bool,
	onKeyDown: $.default.func,
	onCut: $.default.func,
	onPaste: $.default.func
};
var Jp = qp, Yp = /* @__PURE__ */ x(cp(), 1);
function Xp(e) {
	var t = e.inputFormat, n = e.country, r = e.metadata;
	return t === "NATIONAL_PART_OF_INTERNATIONAL" ? `+${pc(n, r)}` : "";
}
function Zp(e, t) {
	return t && (e = e.slice(t.length), e[0] === " " && (e = e.slice(1))), e;
}
//#endregion
//#region node_modules/react-phone-number-input/modules/helpers/parsePhoneNumberCharacter.js
function Qp(e, t, n) {
	if (!(n && n.ignoreRest)) return lu(e, t, function(e) {
		if (n) switch (e) {
			case "end":
				n.ignoreRest = !0;
				break;
		}
	});
}
//#endregion
//#region node_modules/react-phone-number-input/modules/useInputKeyDownHandler.js
function $p(e) {
	var t = e.onKeyDown, n = e.inputFormat;
	return a(function(e) {
		if (e.keyCode === tm && n === "INTERNATIONAL" && e.target instanceof HTMLInputElement && em(e.target) === nm.length) {
			e.preventDefault();
			return;
		}
		t && t(e);
	}, [t, n]);
}
function em(e) {
	return e.selectionStart;
}
var tm = 8, nm = "+", rm = [
	"onKeyDown",
	"country",
	"inputFormat",
	"metadata",
	"international",
	"withCountryCallingCode"
];
function im() {
	return im = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, im.apply(this, arguments);
}
function am(e, t) {
	if (e == null) return {};
	var n = om(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
function om(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function sm(e) {
	function t(t, n) {
		var r = t.onKeyDown, o = t.country, s = t.inputFormat, c = t.metadata, l = c === void 0 ? e : c;
		t.international, t.withCountryCallingCode;
		var u = am(t, rm), d = a(function(e) {
			var t = new Jf(o, l), n = Xp({
				inputFormat: s,
				country: o,
				metadata: l
			}), r = t.input(n + e), i = t.getTemplate();
			return n && (r = Zp(r, n), i &&= Zp(i, n)), {
				text: r,
				template: i
			};
		}, [o, l]), f = $p({
			onKeyDown: r,
			inputFormat: s
		});
		return /* @__PURE__ */ i.createElement(Jp, im({}, u, {
			ref: n,
			parse: Qp,
			format: d,
			onKeyDown: f
		}));
	}
	return t = /* @__PURE__ */ i.forwardRef(t), t.propTypes = {
		value: $.default.string.isRequired,
		onChange: $.default.func.isRequired,
		onKeyDown: $.default.func,
		country: $.default.string,
		inputFormat: $.default.oneOf([
			"INTERNATIONAL",
			"NATIONAL_PART_OF_INTERNATIONAL",
			"NATIONAL",
			"INTERNATIONAL_OR_NATIONAL"
		]).isRequired,
		metadata: $.default.object
	}, t;
}
var cm = sm(), lm = [
	"value",
	"onChange",
	"onKeyDown",
	"country",
	"inputFormat",
	"metadata",
	"inputComponent",
	"international",
	"withCountryCallingCode"
];
function um() {
	return um = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, um.apply(this, arguments);
}
function dm(e, t) {
	if (e == null) return {};
	var n = fm(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
function fm(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function pm(e) {
	function t(t, n) {
		var r = t.value, o = t.onChange, s = t.onKeyDown, c = t.country, l = t.inputFormat, u = t.metadata, d = u === void 0 ? e : u, f = t.inputComponent, p = f === void 0 ? "input" : f;
		t.international, t.withCountryCallingCode;
		var m = dm(t, lm), h = Xp({
			inputFormat: l,
			country: c,
			metadata: d
		}), g = a(function(e) {
			var t = cu(e.target.value);
			t === r && hm(h, t, c, d).indexOf(e.target.value) === 0 && (t = t.slice(0, -1)), o(t);
		}, [
			h,
			r,
			o,
			c,
			d
		]), _ = $p({
			onKeyDown: s,
			inputFormat: l
		});
		return /* @__PURE__ */ i.createElement(p, um({}, m, {
			ref: n,
			value: hm(h, r, c, d),
			onChange: g,
			onKeyDown: _
		}));
	}
	return t = /* @__PURE__ */ i.forwardRef(t), t.propTypes = {
		value: $.default.string.isRequired,
		onChange: $.default.func.isRequired,
		onKeyDown: $.default.func,
		country: $.default.string,
		inputFormat: $.default.oneOf([
			"INTERNATIONAL",
			"NATIONAL_PART_OF_INTERNATIONAL",
			"NATIONAL",
			"INTERNATIONAL_OR_NATIONAL"
		]).isRequired,
		metadata: $.default.object,
		inputComponent: $.default.elementType
	}, t;
}
var mm = pm();
function hm(e, t, n, r) {
	return Zp(Xf(e + t, n, r), e);
}
//#endregion
//#region node_modules/country-flag-icons/modules/unicode.js
function gm(e) {
	return _m(e[0]) + _m(e[1]);
}
function _m(e) {
	return String.fromCodePoint(127397 + e.toUpperCase().charCodeAt(0));
}
//#endregion
//#region node_modules/react-phone-number-input/modules/CountrySelect.js
var vm = [
	"value",
	"onChange",
	"options",
	"disabled",
	"readOnly"
], ym = [
	"value",
	"options",
	"className",
	"iconComponent",
	"getIconAspectRatio",
	"arrowComponent",
	"unicodeFlags"
];
function bm(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = xm(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function xm(e, t) {
	if (e) {
		if (typeof e == "string") return Sm(e, t);
		var n = Object.prototype.toString.call(e).slice(8, -1);
		if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Sm(e, t);
	}
}
function Sm(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Cm() {
	return Cm = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Cm.apply(this, arguments);
}
function wm(e, t) {
	if (e == null) return {};
	var n = Tm(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
function Tm(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function Em(e) {
	var t = e.value, n = e.onChange, r = e.options, o = e.disabled, s = e.readOnly, l = wm(e, vm), u = a(function(e) {
		var t = e.target.value;
		n(t === "ZZ" ? void 0 : t);
	}, [n]);
	return c(function() {
		return Am(r, t);
	}, [r, t]), /* @__PURE__ */ i.createElement("select", Cm({}, l, {
		disabled: o || s,
		readOnly: s,
		value: t || "ZZ",
		onChange: u
	}), r.map(function(e) {
		var t = e.value, n = e.label, r = e.divider;
		return /* @__PURE__ */ i.createElement("option", {
			key: r ? "|" : t || "ZZ",
			value: r ? "|" : t || "ZZ",
			disabled: !!r,
			style: r ? Dm : void 0
		}, n);
	}));
}
Em.propTypes = {
	value: $.default.string,
	onChange: $.default.func.isRequired,
	options: $.default.arrayOf($.default.shape({
		value: $.default.string,
		label: $.default.string,
		divider: $.default.bool
	})).isRequired,
	disabled: $.default.bool,
	readOnly: $.default.bool
};
var Dm = {
	fontSize: "1px",
	backgroundColor: "currentColor",
	color: "inherit"
};
function Om(e) {
	var t = e.value, n = e.options, r = e.className, a = e.iconComponent;
	e.getIconAspectRatio;
	var o = e.arrowComponent, s = o === void 0 ? km : o, l = e.unicodeFlags, u = wm(e, ym), d = c(function() {
		return Am(n, t);
	}, [n, t]);
	return /* @__PURE__ */ i.createElement("div", { className: "PhoneInputCountry" }, /* @__PURE__ */ i.createElement(Em, Cm({}, u, {
		value: t,
		options: n,
		className: (0, Yp.default)("PhoneInputCountrySelect", r)
	})), d && (l && t ? /* @__PURE__ */ i.createElement("div", { className: "PhoneInputCountryIconUnicode" }, gm(t)) : /* @__PURE__ */ i.createElement(a, {
		"aria-hidden": !0,
		country: t,
		label: d.label,
		aspectRatio: l ? 1 : void 0
	})), /* @__PURE__ */ i.createElement(s, null));
}
Om.propTypes = {
	iconComponent: $.default.elementType,
	arrowComponent: $.default.elementType,
	unicodeFlags: $.default.bool
};
function km() {
	return /* @__PURE__ */ i.createElement("div", { className: "PhoneInputCountrySelectArrow" });
}
function Am(e, t) {
	for (var n = bm(e), r; !(r = n()).done;) {
		var i = r.value;
		if (!i.divider && jm(i.value, t)) return i;
	}
}
function jm(e, t) {
	return e == null ? t == null : e === t;
}
//#endregion
//#region node_modules/react-phone-number-input/modules/Flag.js
var Mm = [
	"country",
	"countryName",
	"flags",
	"flagUrl"
];
function Nm() {
	return Nm = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Nm.apply(this, arguments);
}
function Pm(e, t) {
	if (e == null) return {};
	var n = Fm(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
function Fm(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function Im(e) {
	var t = e.country, n = e.countryName, r = e.flags, a = e.flagUrl, o = Pm(e, Mm);
	return r && r[t] ? r[t]({ title: n }) : /* @__PURE__ */ i.createElement("img", Nm({}, o, {
		alt: n,
		role: n ? void 0 : "presentation",
		src: a.replace("{XX}", t).replace("{xx}", t.toLowerCase())
	}));
}
Im.propTypes = {
	country: $.default.string.isRequired,
	countryName: $.default.string.isRequired,
	flags: $.default.objectOf($.default.elementType),
	flagUrl: $.default.string.isRequired
};
//#endregion
//#region node_modules/react-phone-number-input/modules/InternationalIcon.js
var Lm = ["aspectRatio"], Rm = ["title"], zm = ["title"];
function Bm() {
	return Bm = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Bm.apply(this, arguments);
}
function Vm(e, t) {
	if (e == null) return {};
	var n = Hm(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
function Hm(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function Um(e) {
	var t = e.aspectRatio, n = Vm(e, Lm);
	return t === 1 ? /* @__PURE__ */ i.createElement(Gm, n) : /* @__PURE__ */ i.createElement(Wm, n);
}
Um.propTypes = {
	title: $.default.string.isRequired,
	aspectRatio: $.default.number
};
function Wm(e) {
	var t = e.title, n = Vm(e, Rm);
	return /* @__PURE__ */ i.createElement("svg", Bm({}, n, {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 75 50"
	}), /* @__PURE__ */ i.createElement("title", null, t), /* @__PURE__ */ i.createElement("g", {
		className: "PhoneInputInternationalIconGlobe",
		stroke: "currentColor",
		fill: "none",
		strokeWidth: "2",
		strokeMiterlimit: "10"
	}, /* @__PURE__ */ i.createElement("path", {
		strokeLinecap: "round",
		d: "M47.2,36.1C48.1,36,49,36,50,36c7.4,0,14,1.7,18.5,4.3"
	}), /* @__PURE__ */ i.createElement("path", { d: "M68.6,9.6C64.2,12.3,57.5,14,50,14c-7.4,0-14-1.7-18.5-4.3" }), /* @__PURE__ */ i.createElement("line", {
		x1: "26",
		y1: "25",
		x2: "74",
		y2: "25"
	}), /* @__PURE__ */ i.createElement("line", {
		x1: "50",
		y1: "1",
		x2: "50",
		y2: "49"
	}), /* @__PURE__ */ i.createElement("path", {
		strokeLinecap: "round",
		d: "M46.3,48.7c1.2,0.2,2.5,0.3,3.7,0.3c13.3,0,24-10.7,24-24S63.3,1,50,1S26,11.7,26,25c0,2,0.3,3.9,0.7,5.8"
	}), /* @__PURE__ */ i.createElement("path", {
		strokeLinecap: "round",
		d: "M46.8,48.2c1,0.6,2.1,0.8,3.2,0.8c6.6,0,12-10.7,12-24S56.6,1,50,1S38,11.7,38,25c0,1.4,0.1,2.7,0.2,4c0,0.1,0,0.2,0,0.2"
	})), /* @__PURE__ */ i.createElement("path", {
		className: "PhoneInputInternationalIconPhone",
		stroke: "none",
		fill: "currentColor",
		d: "M12.4,17.9c2.9-2.9,5.4-4.8,0.3-11.2S4.1,5.2,1.3,8.1C-2,11.4,1.1,23.5,13.1,35.6s24.3,15.2,27.5,11.9c2.8-2.8,7.8-6.3,1.4-11.5s-8.3-2.6-11.2,0.3c-2,2-7.2-2.2-11.7-6.7S10.4,19.9,12.4,17.9z"
	}));
}
Wm.propTypes = { title: $.default.string.isRequired };
function Gm(e) {
	var t = e.title, n = Vm(e, zm);
	return /* @__PURE__ */ i.createElement("svg", Bm({}, n, {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 50 50"
	}), /* @__PURE__ */ i.createElement("title", null, t), /* @__PURE__ */ i.createElement("g", {
		className: "PhoneInputInternationalIconGlobe",
		stroke: "currentColor",
		fill: "none",
		strokeWidth: "2",
		strokeLinecap: "round"
	}, /* @__PURE__ */ i.createElement("path", { d: "M8.45,13A21.44,21.44,0,1,1,37.08,41.56" }), /* @__PURE__ */ i.createElement("path", { d: "M19.36,35.47a36.9,36.9,0,0,1-2.28-13.24C17.08,10.39,21.88.85,27.8.85s10.72,9.54,10.72,21.38c0,6.48-1.44,12.28-3.71,16.21" }), /* @__PURE__ */ i.createElement("path", { d: "M17.41,33.4A39,39,0,0,1,27.8,32.06c6.62,0,12.55,1.5,16.48,3.86" }), /* @__PURE__ */ i.createElement("path", { d: "M44.29,8.53c-3.93,2.37-9.86,3.88-16.49,3.88S15.25,10.9,11.31,8.54" }), /* @__PURE__ */ i.createElement("line", {
		x1: "27.8",
		y1: "0.85",
		x2: "27.8",
		y2: "34.61"
	}), /* @__PURE__ */ i.createElement("line", {
		x1: "15.2",
		y1: "22.23",
		x2: "49.15",
		y2: "22.23"
	})), /* @__PURE__ */ i.createElement("path", {
		className: "PhoneInputInternationalIconPhone",
		stroke: "transparent",
		fill: "currentColor",
		d: "M9.42,26.64c2.22-2.22,4.15-3.59.22-8.49S3.08,17,.93,19.17c-2.49,2.48-.13,11.74,9,20.89s18.41,11.5,20.89,9c2.15-2.15,5.91-4.77,1-8.71s-6.27-2-8.49.22c-1.55,1.55-5.48-1.69-8.86-5.08S7.87,28.19,9.42,26.64Z"
	}));
}
Gm.propTypes = { title: $.default.string.isRequired };
//#endregion
//#region node_modules/react-phone-number-input/modules/helpers/isE164Number.js
function Km(e) {
	if (e.length < 2 || e[0] !== "+") return !1;
	for (var t = 1; t < e.length;) {
		var n = e.charCodeAt(t);
		if (!(n >= 48 && n <= 57)) return !1;
		t++;
	}
	return !0;
}
function qm(e) {
	Km(e) || console.error("[react-phone-number-input] Expected the initial `value` to be a E.164 phone number. Got", e);
}
//#endregion
//#region node_modules/react-phone-number-input/modules/helpers/countries.js
function Jm(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = Ym(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ym(e, t) {
	if (e) {
		if (typeof e == "string") return Xm(e, t);
		var n = Object.prototype.toString.call(e).slice(8, -1);
		if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Xm(e, t);
	}
}
function Xm(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Zm(e, t) {
	if (!t) return e;
	for (var n = [], r = [], i = n, a = function() {
		var t = s.value;
		if (t === "|") i.push({ divider: !0 });
		else if (t === "..." || t === "…") i = r;
		else {
			var n = t === "🌐" ? void 0 : t, a = e.indexOf(e.filter(function(e) {
				return e.value === n;
			})[0]), o = e[a];
			e.splice(a, 1), i.push(o);
		}
	}, o = Jm(t), s; !(s = o()).done;) a();
	return n.concat(e).concat(r);
}
function Qm(e, t) {
	if (e && (e = e.filter(function(e) {
		switch (e) {
			case "🌐":
			case "|":
			case "...":
			case "…": return !0;
			default: return $m(e, t);
		}
	}), e.length > 0)) return e;
}
function $m(e, t) {
	return mc(e, t) ? !0 : (console.error(`Country not found: ${e}`), !1);
}
function eh(e, t) {
	return e && (e = e.filter(function(e) {
		return $m(e, t);
	}), e.length === 0 && (e = void 0)), e;
}
//#endregion
//#region node_modules/react-phone-number-input/modules/CountryIcon.js
var th = [
	"country",
	"label",
	"aspectRatio"
];
function nh() {
	return nh = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, nh.apply(this, arguments);
}
function rh(e, t) {
	if (e == null) return {};
	var n = ih(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
function ih(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function ah(e) {
	var t = e.flags, n = e.flagUrl, r = e.flagComponent, a = e.internationalIcon;
	function o(e) {
		var o = e.country, s = e.label, c = e.aspectRatio, l = rh(e, th), u = a === Um ? c : void 0;
		return /* @__PURE__ */ i.createElement("div", nh({}, l, { className: (0, Yp.default)("PhoneInputCountryIcon", {
			"PhoneInputCountryIcon--square": u === 1,
			"PhoneInputCountryIcon--border": o
		}) }), o ? /* @__PURE__ */ i.createElement(r, {
			country: o,
			countryName: s,
			flags: t,
			flagUrl: n,
			className: "PhoneInputCountryIconImg"
		}) : /* @__PURE__ */ i.createElement(a, {
			title: s,
			aspectRatio: u,
			className: "PhoneInputCountryIconImg"
		}));
	}
	return o.propTypes = {
		country: $.default.string,
		label: $.default.string.isRequired,
		aspectRatio: $.default.number
	}, o;
}
ah({
	flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg",
	flagComponent: Im,
	internationalIcon: Um
});
//#endregion
//#region node_modules/react-phone-number-input/modules/useExternalRef.js
function oh(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n) return (n = n.call(e)).next.bind(n);
	if (Array.isArray(e) || (n = sh(e)) || t && e && typeof e.length == "number") {
		n && (e = n);
		var r = 0;
		return function() {
			return r >= e.length ? { done: !0 } : {
				done: !1,
				value: e[r++]
			};
		};
	}
	throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function sh(e, t) {
	if (e) {
		if (typeof e == "string") return ch(e, t);
		var n = Object.prototype.toString.call(e).slice(8, -1);
		if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ch(e, t);
	}
}
function ch(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function lh(e, t) {
	for (var n = oh(e), r; !(r = n()).done;) {
		var i = r.value;
		i && uh(i, t);
	}
}
function uh(e, t) {
	typeof e == "function" ? e(t) : e.current = t;
}
//#endregion
//#region node_modules/react-phone-number-input/modules/PropTypes.js
var dh = $.default.shape({
	country_calling_codes: $.default.object.isRequired,
	countries: $.default.object.isRequired
}), fh = $.default.objectOf($.default.string);
//#endregion
//#region node_modules/react-phone-number-input/modules/helpers/getInternationalPhoneNumberPrefix.js
function ph(e, t) {
	return "+" + pc(e, t);
}
//#endregion
//#region node_modules/react-phone-number-input/modules/helpers/phoneInputHelpers.js
function mh(e) {
	var t = e.value, n = e.phoneNumber, r = e.defaultCountry, i = e.getAnyCountry, a = e.countries, o = e.required, s = e.metadata, c;
	return n && n.country ? c = n.country : r && (!t || kh(t, r, s)) && (c = r), a && a.indexOf(c) < 0 && (c = void 0), !c && o && a && a.length > 0 && (c = i()), c;
}
function hh(e) {
	var t = e.countries, n = e.countryNames, r = e.addInternationalOption, i = e.compareStringsLocales, a = e.compareStrings;
	a ||= Eh;
	var o = t.map(function(e) {
		return {
			value: e,
			label: n[e] || e
		};
	});
	return o.sort(function(e, t) {
		return a(e.label, t.label, i);
	}), r && o.unshift({ label: n.ZZ }), o;
}
function gh(e, t) {
	return od(e || "", t);
}
function _h(e) {
	return e.formatNational().replace(/\D/g, "");
}
function vh(e, t) {
	var n = t.prevCountry, r = t.newCountry, i = t.metadata, a = t.useNationalFormat;
	if (n === r) return e;
	if (!e) return a ? "" : r ? ph(r, i) : "";
	if (r) {
		if (e[0] === "+") {
			if (a) return e.indexOf("+" + pc(r, i)) === 0 ? Dh(e, r, i) : "";
			if (n) {
				var o = ph(r, i);
				return e.indexOf(o) === 0 ? e : o;
			} else {
				var s = ph(r, i);
				return e.indexOf(s) === 0 ? e : s;
			}
		}
	} else if (e[0] !== "+")
 /* istanbul ignore next */
	return yh(e, n, i) || "";
	return e;
}
function yh(e, t, n) {
	if (e) {
		if (e[0] === "+") {
			if (e === "+") return;
			var r = new Jf(t, n);
			return r.input(e), r.getNumberValue();
		}
		if (t) {
			var i = Oh(e, t, n);
			return `+${pc(t, n)}${i || ""}`;
		}
	}
}
function bh(e, t, n) {
	var r = Oh(e, t, n);
	if (r) {
		var i = r.length - xh(t, n);
		if (i > 0) return e.slice(0, e.length - i);
	}
	return e;
}
function xh(e, t) {
	return t = new Z(t), t.selectNumberingPlan(e), t.numberingPlan.possibleLengths()[t.numberingPlan.possibleLengths().length - 1];
}
function Sh(e, t) {
	var n = t.country, r = t.countries, i = t.defaultCountry, a = t.latestCountrySelectedByUser, o = t.required, s = t.metadata;
	if (e === "+") return n;
	var c = Th(e, s);
	if (c) return !r || r.indexOf(c) >= 0 ? c : void 0;
	if (n) {
		if (kh(e, n, s)) {
			if (a && kh(e, a, s)) return a;
			if (i && kh(e, i, s)) return i;
			if (!o) return;
		} else if (!o) return;
	}
	return n;
}
function Ch(e, t) {
	var n = t.prevPhoneDigits, r = t.country, i = t.defaultCountry, a = t.latestCountrySelectedByUser, o = t.countryRequired, s = t.getAnyCountry, c = t.countries, l = t.international, u = t.limitMaxLength, d = t.countryCallingCodeEditable, f = t.metadata;
	if (l && d === !1 && r) {
		var p = ph(r, f);
		if (e.indexOf(p) !== 0) {
			var m;
			return e && e[0] !== "+" ? (e = p + e, m = yh(e, r, f)) : e = p, {
				phoneDigits: e,
				value: m,
				country: r
			};
		}
	}
	l === !1 && r && e && e[0] === "+" && (e = wh(e, r, f)), e && r && u && (e = bh(e, r, f)), e && e[0] !== "+" && (!r || l) && (e = "+" + e), !e && n && n[0] === "+" && (r = l ? void 0 : i), e === "+" && n && n[0] === "+" && n.length > 1 && (r = void 0);
	var h;
	return e && (h = e[0] === "+" && (e === "+" || r && ph(r, f).indexOf(e) === 0) ? void 0 : yh(e, r, f)), h && (r = Sh(h, {
		country: r,
		countries: c,
		defaultCountry: i,
		latestCountrySelectedByUser: a,
		required: !1,
		metadata: f
	}), l === !1 && r && e && e[0] === "+" && (e = wh(e, r, f), h = yh(e, r, f))), !r && o && (r = i || s()), {
		phoneDigits: e,
		country: r,
		value: h
	};
}
function wh(e, t, n) {
	if (e.indexOf(ph(t, n)) === 0) {
		var r = new Jf(t, n);
		r.input(e);
		var i = r.getNumber();
		return i ? i.formatNational().replace(/\D/g, "") : "";
	} else return e.replace(/\D/g, "");
}
function Th(e, t) {
	var n = new Jf(null, t);
	return n.input(e), n.getCountry();
}
function Eh(e, t, n) {
	/* istanbul ignore next */
	return String.prototype.localeCompare ? e.localeCompare(t, n) : e < t ? -1 : e > t ? 1 : 0;
}
function Dh(e, t, n) {
	if (t) {
		var r = "+" + pc(t, n);
		if (e.length < r.length) {
			if (r.indexOf(e) === 0) return "";
		} else if (e.indexOf(r) === 0) return e.slice(r.length);
	}
	for (var i = 0, a = Object.keys(n.country_calling_codes); i < a.length; i++) {
		var o = a[i];
		if (e.indexOf(o) === 1) return e.slice(1 + o.length);
	}
	return "";
}
function Oh(e, t, n) {
	var r = new Jf(t, n);
	r.input(e);
	var i = r.getNumber();
	return i && i.nationalNumber;
}
function kh(e, t, n) {
	for (var r = ph(t, n), i = 0; i < e.length && i < r.length;) {
		if (e[i] !== r[i]) return !1;
		i++;
	}
	return !0;
}
function Ah(e) {
	var t = e.value, n = e.phoneNumber, r = e.defaultCountry, i = e.international, a = e.useNationalFormat, o = e.metadata;
	return (i === !1 || a) && n && n.country ? _h(n) : !t && i && r ? ph(r, o) : t;
}
//#endregion
//#region node_modules/react-phone-number-input/modules/helpers/getPhoneInputWithCountryStateUpdateFromNewProps.js
function jh(e) {
	"@babel/helpers - typeof";
	return jh = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, jh(e);
}
function Mh(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Nh(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Mh(Object(n), !0).forEach(function(t) {
			Ph(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Mh(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Ph(e, t, n) {
	return t = Fh(t), t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Fh(e) {
	var t = Ih(e, "string");
	return jh(t) == "symbol" ? t : t + "";
}
function Ih(e, t) {
	if (jh(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (jh(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Lh(e, t, n) {
	var r = e.metadata, i = e.countries, a = e.defaultCountry, o = e.value, s = e.reset, c = e.international, l = e.displayInitialValueAsLocalNumber, u = e.initialValueFormat, d = t.defaultCountry, f = t.value, p = t.reset;
	n.country;
	var m = n.value, h = n.hasUserSelectedACountry, g = n.latestCountrySelectedByUser, _ = function(e) {
		return Ah(Nh(Nh({}, e), {}, {
			international: c,
			useNationalFormat: l || u === "national",
			metadata: r
		}));
	};
	if (s !== p) return {
		phoneDigits: _({
			value: void 0,
			defaultCountry: a
		}),
		value: void 0,
		country: a,
		latestCountrySelectedByUser: void 0,
		hasUserSelectedACountry: void 0
	};
	if (a !== d) {
		var v = !a || $m(a, r), y = !m || c && m === _({
			value: void 0,
			defaultCountry: d
		});
		if (!h && v && !o && y) return {
			country: a,
			phoneDigits: _({
				value: void 0,
				defaultCountry: a
			}),
			value: void 0
		};
	}
	if (!Rh(o, f) && !Rh(o, m)) {
		var b, x;
		if (o) {
			o && qm(o), b = gh(o, r);
			var S = eh(i, r);
			b && b.country ? (!S || S.indexOf(b.country) >= 0) && (x = b.country) : (x = Sh(o, {
				country: void 0,
				countries: S,
				metadata: r
			}), x || a && o.indexOf(ph(a, r)) === 0 && (x = a));
		}
		var C;
		return o ? g && ((x ? g === x : kh(o, g, r)) ? x ||= g : C = { latestCountrySelectedByUser: void 0 }) : C = {
			latestCountrySelectedByUser: void 0,
			hasUserSelectedACountry: void 0
		}, Nh(Nh({}, C), {}, {
			phoneDigits: _({
				phoneNumber: b,
				value: o,
				defaultCountry: a
			}),
			value: o,
			country: o ? x : a
		});
	}
}
function Rh(e, t) {
	return e === null && (e = void 0), t === null && (t = void 0), e === t;
}
//#endregion
//#region node_modules/react-phone-number-input/modules/PhoneInputWithCountry.js
var zh = /* @__PURE__ */ "name.disabled.readOnly.autoComplete.style.className.inputRef.inputComponent.numberInputProps.smartCaret.countrySelectComponent.countrySelectProps.containerComponent.containerComponentProps.defaultCountry.countries.countryOptionsOrder.labels.flags.flagComponent.flagUrl.addInternationalOption.internationalIcon.displayInitialValueAsLocalNumber.initialValueFormat.onCountryChange.limitMaxLength.countryCallingCodeEditable.focusInputOnCountrySelection.reset.metadata.international.locales".split(".");
function Bh(e) {
	"@babel/helpers - typeof";
	return Bh = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Bh(e);
}
function Vh(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Hh(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Vh(Object(n), !0).forEach(function(t) {
			ng(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Vh(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Uh() {
	return Uh = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Uh.apply(this, arguments);
}
function Wh(e, t) {
	if (e == null) return {};
	var n = Gh(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
function Gh(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function Kh(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function qh(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, rg(r.key), r);
	}
}
function Jh(e, t, n) {
	return t && qh(e.prototype, t), n && qh(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Yh(e, t, n) {
	return t = $h(t), Xh(e, Qh() ? Reflect.construct(t, n || [], $h(e).constructor) : t.apply(e, n));
}
function Xh(e, t) {
	if (t && (Bh(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
	return Zh(e);
}
function Zh(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function Qh() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch {}
	return (Qh = function() {
		return !!e;
	})();
}
function $h(e) {
	return $h = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, $h(e);
}
function eg(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && tg(e, t);
}
function tg(e, t) {
	return tg = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, tg(e, t);
}
function ng(e, t, n) {
	return t = rg(t), t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function rg(e) {
	var t = ig(e, "string");
	return Bh(t) == "symbol" ? t : t + "";
}
function ig(e, t) {
	if (Bh(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Bh(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var ag = /* @__PURE__ */ function(e) {
	function t(e) {
		var n;
		Kh(this, t), n = Yh(this, t, [e]), ng(n, "setInputRef", function(e) {
			lh([n.props.inputRef, n.inputRef], e);
		}), ng(n, "isCountrySupportedWithError", function(e) {
			var t = n.props.metadata;
			return $m(e, t);
		}), ng(n, "onCountryChange", function(e) {
			var t = n.props, r = t.international, i = t.metadata, a = t.onChange, o = t.focusInputOnCountrySelection, s = n.state, c = s.phoneDigits, l = s.country, u = vh(c, {
				prevCountry: l,
				newCountry: e,
				metadata: i,
				useNationalFormat: !r
			}), d = yh(u, e, i);
			o && n.inputRef.current.focus(), n.setState({
				country: e,
				latestCountrySelectedByUser: e,
				hasUserSelectedACountry: !0,
				phoneDigits: u,
				value: d
			}, function() {
				a(d);
			});
		}), ng(n, "onChange", function(e) {
			var t = n.props, r = t.defaultCountry, i = t.onChange, a = t.addInternationalOption, o = t.international, s = t.limitMaxLength, c = t.countryCallingCodeEditable, l = t.metadata, u = n.state, d = u.countries, f = u.phoneDigits, p = u.country, m = u.latestCountrySelectedByUser, h = Ch(e, {
				prevPhoneDigits: f,
				country: p,
				countryRequired: !a,
				defaultCountry: r,
				latestCountrySelectedByUser: m,
				getAnyCountry: function() {
					return n.getFirstSupportedCountry({ countries: d });
				},
				countries: d,
				international: o,
				limitMaxLength: s,
				countryCallingCodeEditable: c,
				metadata: l
			}), g = h.phoneDigits, _ = h.country, v = h.value, y = {
				phoneDigits: g,
				value: v,
				country: _
			};
			m && v && !kh(v, m, l) && (y.latestCountrySelectedByUser = void 0), c === !1 && !v && g === n.state.phoneDigits && (y.forceRerender = {}), n.setState(y, function() {
				return i(v);
			});
		}), ng(n, "_onFocus", function() {
			return n.setState({ isFocused: !0 });
		}), ng(n, "_onBlur", function() {
			return n.setState({ isFocused: !1 });
		}), ng(n, "onFocus", function(e) {
			n._onFocus();
			var t = n.props.onFocus;
			t && t(e);
		}), ng(n, "onBlur", function(e) {
			var t = n.props.onBlur;
			n._onBlur(), t && t(e);
		}), ng(n, "onCountryFocus", function(e) {
			n._onFocus();
			var t = n.props.countrySelectProps;
			if (t) {
				var r = t.onFocus;
				r && r(e);
			}
		}), ng(n, "onCountryBlur", function(e) {
			n._onBlur();
			var t = n.props.countrySelectProps;
			if (t) {
				var r = t.onBlur;
				r && r(e);
			}
		}), n.inputRef = /* @__PURE__ */ i.createRef();
		var r = n.props, a = r.value;
		r.labels;
		var o = r.international, s = r.addInternationalOption, c = r.displayInitialValueAsLocalNumber, l = r.initialValueFormat, u = r.metadata, d = n.props, f = d.defaultCountry, p = d.countries;
		f && (n.isCountrySupportedWithError(f) || (f = void 0)), a && qm(a), p = eh(p, u);
		var m = gh(a, u);
		n.CountryIcon = ah(n.props);
		var h = mh({
			value: a,
			phoneNumber: m,
			defaultCountry: f,
			required: !s,
			countries: p || Yf(u),
			getAnyCountry: function() {
				return n.getFirstSupportedCountry({ countries: p });
			},
			metadata: u
		});
		return n.state = {
			props: n.props,
			country: h,
			countries: p,
			phoneDigits: Ah({
				value: a,
				phoneNumber: m,
				defaultCountry: f,
				international: o,
				useNationalFormat: c || l === "national",
				metadata: u
			}),
			value: a
		}, n;
	}
	return eg(t, e), Jh(t, [
		{
			key: "componentDidMount",
			value: function() {
				var e = this.props.onCountryChange, t = this.props.defaultCountry, n = this.state.country;
				e && (t && (this.isCountrySupportedWithError(t) || (t = void 0)), n !== t && e(n));
			}
		},
		{
			key: "componentDidUpdate",
			value: function(e, t) {
				var n = this.props.onCountryChange, r = this.state.country;
				n && r !== t.country && n(r);
			}
		},
		{
			key: "getCountrySelectOptions",
			value: function(e) {
				var t = e.countries, n = this.props, r = n.international, i = n.countryCallingCodeEditable, a = n.countryOptionsOrder, o = n.addInternationalOption, s = n.labels, c = n.locales, l = n.metadata;
				return this.useMemoCountrySelectOptions(function() {
					return Zm(hh({
						countries: t || Yf(l),
						countryNames: s,
						addInternationalOption: r && i === !1 ? !1 : o,
						compareStringsLocales: c
					}), Qm(a, l));
				}, [
					t,
					a,
					o,
					s,
					l
				]);
			}
		},
		{
			key: "useMemoCountrySelectOptions",
			value: function(e, t) {
				return (!this.countrySelectOptionsMemoDependencies || !lg(t, this.countrySelectOptionsMemoDependencies)) && (this.countrySelectOptionsMemo = e(), this.countrySelectOptionsMemoDependencies = t), this.countrySelectOptionsMemo;
			}
		},
		{
			key: "getFirstSupportedCountry",
			value: function(e) {
				var t = e.countries;
				return this.getCountrySelectOptions({ countries: t })[0].value;
			}
		},
		{
			key: "render",
			value: function() {
				var e = this.props, t = e.name, n = e.disabled, r = e.readOnly, a = e.autoComplete, o = e.style, s = e.className;
				e.inputRef;
				var c = e.inputComponent, l = e.numberInputProps, u = e.smartCaret, d = e.countrySelectComponent, f = e.countrySelectProps, p = e.containerComponent, m = e.containerComponentProps;
				e.defaultCountry, e.countries, e.countryOptionsOrder;
				var h = e.labels;
				e.flags, e.flagComponent, e.flagUrl, e.addInternationalOption, e.internationalIcon, e.displayInitialValueAsLocalNumber, e.initialValueFormat, e.onCountryChange, e.limitMaxLength, e.countryCallingCodeEditable, e.focusInputOnCountrySelection, e.reset;
				var g = e.metadata, _ = e.international;
				e.locales;
				var v = Wh(e, zh), y = this.state, b = y.country, x = y.countries, S = y.phoneDigits, C = y.isFocused, w = u ? cm : mm, T = this.getCountrySelectOptions({ countries: x });
				return /* @__PURE__ */ i.createElement(p, Uh({
					style: o,
					className: (0, Yp.default)(s, "PhoneInput", {
						"PhoneInput--focus": C,
						"PhoneInput--disabled": n,
						"PhoneInput--readOnly": r
					})
				}, m), /* @__PURE__ */ i.createElement(d, Uh({
					name: t ? `${t}Country` : void 0,
					"aria-label": h.country
				}, f, {
					value: b,
					options: T,
					onChange: this.onCountryChange,
					onFocus: this.onCountryFocus,
					onBlur: this.onCountryBlur,
					disabled: n || f && f.disabled,
					readOnly: r || f && f.readOnly,
					iconComponent: this.CountryIcon
				})), /* @__PURE__ */ i.createElement(w, Uh({
					ref: this.setInputRef,
					type: "tel",
					autoComplete: a
				}, l, v, {
					inputFormat: _ === !0 ? "INTERNATIONAL" : _ === !1 ? "NATIONAL" : "INTERNATIONAL_OR_NATIONAL",
					international: _ ? !0 : void 0,
					withCountryCallingCode: _ ? !0 : void 0,
					name: t,
					metadata: g,
					country: b,
					value: S || "",
					onChange: this.onChange,
					onFocus: this.onFocus,
					onBlur: this.onBlur,
					disabled: n,
					readOnly: r,
					inputComponent: c,
					className: (0, Yp.default)("PhoneInputInput", l && l.className, v.className)
				})));
			}
		}
	], [{
		key: "getDerivedStateFromProps",
		value: function(e, t) {
			return Hh({ props: e }, Lh(e, t.props, t));
		}
	}]);
}(i.PureComponent), og = /* @__PURE__ */ i.forwardRef(function(e, t) {
	return /* @__PURE__ */ i.createElement(ag, Uh({}, cg(e), { inputRef: t }));
});
og.propTypes = {
	value: $.default.string,
	onChange: $.default.func.isRequired,
	onFocus: $.default.func,
	onBlur: $.default.func,
	disabled: $.default.bool,
	readOnly: $.default.bool,
	autoComplete: $.default.string,
	initialValueFormat: $.default.oneOf(["national"]),
	displayInitialValueAsLocalNumber: $.default.bool,
	defaultCountry: $.default.string,
	countries: $.default.arrayOf($.default.string),
	labels: fh,
	locales: $.default.oneOfType([$.default.string, $.default.arrayOf($.default.string)]),
	flagUrl: $.default.string,
	flags: $.default.objectOf($.default.elementType),
	flagComponent: $.default.elementType,
	addInternationalOption: $.default.bool,
	internationalIcon: $.default.elementType,
	countryOptionsOrder: $.default.arrayOf($.default.string),
	style: $.default.object,
	className: $.default.string,
	countrySelectComponent: $.default.elementType,
	countrySelectProps: $.default.object,
	inputComponent: $.default.elementType,
	numberInputProps: $.default.object,
	containerComponent: $.default.elementType,
	containerComponentProps: $.default.object,
	smartCaret: $.default.bool,
	international: $.default.bool,
	limitMaxLength: $.default.bool,
	countryCallingCodeEditable: $.default.bool,
	metadata: dh,
	onCountryChange: $.default.func,
	focusInputOnCountrySelection: $.default.bool
};
var sg = {
	autoComplete: "tel",
	countrySelectComponent: Om,
	flagComponent: Im,
	flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg",
	internationalIcon: Um,
	inputComponent: "input",
	containerComponent: "div",
	reset: $.default.any,
	smartCaret: !0,
	addInternationalOption: !0,
	countryCallingCodeEditable: !0,
	focusInputOnCountrySelection: !0
};
function cg(e) {
	for (var t in e = Hh({}, e), sg) e[t] === void 0 && (e[t] = sg[t]);
	return e;
}
function lg(e, t) {
	if (e.length !== t.length) return !1;
	for (var n = 0; n < e.length;) {
		if (e[n] !== t[n]) return !1;
		n++;
	}
	return !0;
}
//#endregion
//#region node_modules/react-phone-number-input/locale/en.json.js
var ug = {
	ext: "ext.",
	country: "Phone number country",
	phone: "Phone",
	AC: "Ascension Island",
	AD: "Andorra",
	AE: "United Arab Emirates",
	AF: "Afghanistan",
	AG: "Antigua and Barbuda",
	AI: "Anguilla",
	AL: "Albania",
	AM: "Armenia",
	AO: "Angola",
	AQ: "Antarctica",
	AR: "Argentina",
	AS: "American Samoa",
	AT: "Austria",
	AU: "Australia",
	AW: "Aruba",
	AX: "Åland Islands",
	AZ: "Azerbaijan",
	BA: "Bosnia and Herzegovina",
	BB: "Barbados",
	BD: "Bangladesh",
	BE: "Belgium",
	BF: "Burkina Faso",
	BG: "Bulgaria",
	BH: "Bahrain",
	BI: "Burundi",
	BJ: "Benin",
	BL: "Saint Barthélemy",
	BM: "Bermuda",
	BN: "Brunei Darussalam",
	BO: "Bolivia",
	BQ: "Bonaire, Sint Eustatius and Saba",
	BR: "Brazil",
	BS: "Bahamas",
	BT: "Bhutan",
	BV: "Bouvet Island",
	BW: "Botswana",
	BY: "Belarus",
	BZ: "Belize",
	CA: "Canada",
	CC: "Cocos (Keeling) Islands",
	CD: "Congo, Democratic Republic of the",
	CF: "Central African Republic",
	CG: "Congo",
	CH: "Switzerland",
	CI: "Cote d'Ivoire",
	CK: "Cook Islands",
	CL: "Chile",
	CM: "Cameroon",
	CN: "China",
	CO: "Colombia",
	CR: "Costa Rica",
	CU: "Cuba",
	CV: "Cape Verde",
	CW: "Curaçao",
	CX: "Christmas Island",
	CY: "Cyprus",
	CZ: "Czech Republic",
	DE: "Germany",
	DJ: "Djibouti",
	DK: "Denmark",
	DM: "Dominica",
	DO: "Dominican Republic",
	DZ: "Algeria",
	EC: "Ecuador",
	EE: "Estonia",
	EG: "Egypt",
	EH: "Western Sahara",
	ER: "Eritrea",
	ES: "Spain",
	ET: "Ethiopia",
	FI: "Finland",
	FJ: "Fiji",
	FK: "Falkland Islands",
	FM: "Federated States of Micronesia",
	FO: "Faroe Islands",
	FR: "France",
	GA: "Gabon",
	GB: "United Kingdom",
	GD: "Grenada",
	GE: "Georgia",
	GF: "French Guiana",
	GG: "Guernsey",
	GH: "Ghana",
	GI: "Gibraltar",
	GL: "Greenland",
	GM: "Gambia",
	GN: "Guinea",
	GP: "Guadeloupe",
	GQ: "Equatorial Guinea",
	GR: "Greece",
	GS: "South Georgia and the South Sandwich Islands",
	GT: "Guatemala",
	GU: "Guam",
	GW: "Guinea-Bissau",
	GY: "Guyana",
	HK: "Hong Kong",
	HM: "Heard Island and McDonald Islands",
	HN: "Honduras",
	HR: "Croatia",
	HT: "Haiti",
	HU: "Hungary",
	ID: "Indonesia",
	IE: "Ireland",
	IL: "Israel",
	IM: "Isle of Man",
	IN: "India",
	IO: "British Indian Ocean Territory",
	IQ: "Iraq",
	IR: "Iran",
	IS: "Iceland",
	IT: "Italy",
	JE: "Jersey",
	JM: "Jamaica",
	JO: "Jordan",
	JP: "Japan",
	KE: "Kenya",
	KG: "Kyrgyzstan",
	KH: "Cambodia",
	KI: "Kiribati",
	KM: "Comoros",
	KN: "Saint Kitts and Nevis",
	KP: "North Korea",
	KR: "South Korea",
	KW: "Kuwait",
	KY: "Cayman Islands",
	KZ: "Kazakhstan",
	LA: "Laos",
	LB: "Lebanon",
	LC: "Saint Lucia",
	LI: "Liechtenstein",
	LK: "Sri Lanka",
	LR: "Liberia",
	LS: "Lesotho",
	LT: "Lithuania",
	LU: "Luxembourg",
	LV: "Latvia",
	LY: "Libya",
	MA: "Morocco",
	MC: "Monaco",
	MD: "Moldova",
	ME: "Montenegro",
	MF: "Saint Martin (French Part)",
	MG: "Madagascar",
	MH: "Marshall Islands",
	MK: "North Macedonia",
	ML: "Mali",
	MM: "Myanmar",
	MN: "Mongolia",
	MO: "Macao",
	MP: "Northern Mariana Islands",
	MQ: "Martinique",
	MR: "Mauritania",
	MS: "Montserrat",
	MT: "Malta",
	MU: "Mauritius",
	MV: "Maldives",
	MW: "Malawi",
	MX: "Mexico",
	MY: "Malaysia",
	MZ: "Mozambique",
	NA: "Namibia",
	NC: "New Caledonia",
	NE: "Niger",
	NF: "Norfolk Island",
	NG: "Nigeria",
	NI: "Nicaragua",
	NL: "Netherlands",
	NO: "Norway",
	NP: "Nepal",
	NR: "Nauru",
	NU: "Niue",
	NZ: "New Zealand",
	OM: "Oman",
	PA: "Panama",
	PE: "Peru",
	PF: "French Polynesia",
	PG: "Papua New Guinea",
	PH: "Philippines",
	PK: "Pakistan",
	PL: "Poland",
	PM: "Saint Pierre and Miquelon",
	PN: "Pitcairn",
	PR: "Puerto Rico",
	PS: "Palestine",
	PT: "Portugal",
	PW: "Palau",
	PY: "Paraguay",
	QA: "Qatar",
	RE: "Reunion",
	RO: "Romania",
	RS: "Serbia",
	RU: "Russia",
	RW: "Rwanda",
	SA: "Saudi Arabia",
	SB: "Solomon Islands",
	SC: "Seychelles",
	SD: "Sudan",
	SE: "Sweden",
	SG: "Singapore",
	SH: "Saint Helena",
	SI: "Slovenia",
	SJ: "Svalbard and Jan Mayen",
	SK: "Slovakia",
	SL: "Sierra Leone",
	SM: "San Marino",
	SN: "Senegal",
	SO: "Somalia",
	SR: "Suriname",
	SS: "South Sudan",
	ST: "Sao Tome and Principe",
	SV: "El Salvador",
	SX: "Sint Maarten",
	SY: "Syria",
	SZ: "Swaziland",
	TA: "Tristan da Cunha",
	TC: "Turks and Caicos Islands",
	TD: "Chad",
	TF: "French Southern Territories",
	TG: "Togo",
	TH: "Thailand",
	TJ: "Tajikistan",
	TK: "Tokelau",
	TL: "Timor-Leste",
	TM: "Turkmenistan",
	TN: "Tunisia",
	TO: "Tonga",
	TR: "Turkey",
	TT: "Trinidad and Tobago",
	TV: "Tuvalu",
	TW: "Taiwan",
	TZ: "Tanzania",
	UA: "Ukraine",
	UG: "Uganda",
	UM: "United States Minor Outlying Islands",
	US: "United States",
	UY: "Uruguay",
	UZ: "Uzbekistan",
	VA: "Holy See (Vatican City State)",
	VC: "Saint Vincent and the Grenadines",
	VE: "Venezuela",
	VG: "Virgin Islands, British",
	VI: "Virgin Islands, U.S.",
	VN: "Vietnam",
	VU: "Vanuatu",
	WF: "Wallis and Futuna",
	WS: "Samoa",
	XA: "Abkhazia",
	XK: "Kosovo",
	XO: "South Ossetia",
	YE: "Yemen",
	YT: "Mayotte",
	ZA: "South Africa",
	ZM: "Zambia",
	ZW: "Zimbabwe",
	ZZ: "International"
}, dg = ["metadata", "labels"];
function fg() {
	return fg = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, fg.apply(this, arguments);
}
function pg(e, t) {
	if (e == null) return {};
	var n = mg(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
function mg(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function hg(e) {
	var t = /* @__PURE__ */ i.forwardRef(function(t, n) {
		var r = t.metadata, a = r === void 0 ? e : r, o = t.labels, s = o === void 0 ? ug : o, c = pg(t, dg);
		return /* @__PURE__ */ i.createElement(og, fg({}, c, {
			ref: n,
			metadata: a,
			labels: s
		}));
	});
	return t.propTypes = {
		metadata: dh,
		labels: fh
	}, t;
}
hg();
//#endregion
//#region node_modules/react-phone-number-input/min/index.js
var gg = hg(Gs);
//#endregion
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function _g({ value: e, onChange: r, options: i, disabled: a, dark: o }) {
	let s = "__intl__", c = (e) => e ?? s, l = (e) => e === s ? void 0 : e;
	return /* @__PURE__ */ n(Is, {
		value: c(e),
		onValueChange: (e) => r(l(e)),
		disabled: a,
		children: [/* @__PURE__ */ n(Ls, {
			className: "input-phone__country",
			"aria-label": "País",
			children: [/* @__PURE__ */ t(Rs, { children: e ? `+${Zf(e)}` : "🌐" }), /* @__PURE__ */ t(zs, {
				asChild: !0,
				children: /* @__PURE__ */ t(Be, {
					className: "input-phone__country-icon",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ t(Bs, { children: /* @__PURE__ */ t(Vs, {
			className: ["input-phone__country-content", o ? "input-phone__country-content--dark" : ""].filter(Boolean).join(" "),
			position: "popper",
			children: /* @__PURE__ */ t(Hs, { children: i.map(({ value: e, label: n }) => /* @__PURE__ */ t(Us, {
				value: c(e),
				className: "input-phone__country-item",
				children: /* @__PURE__ */ t(Ws, { children: n })
			}, c(e))) })
		}) })]
	});
}
function vg({ value: e, defaultCountry: n = "ES", placeholder: r, disabled: i, error: a = !1, dark: o, id: s, name: c, describedBy: l, onChange: u, onBlur: d }) {
	return /* @__PURE__ */ t(gg, {
		className: ["input-phone", a ? "input-phone--error" : ""].filter(Boolean).join(" "),
		value: e,
		defaultCountry: n,
		placeholder: r,
		disabled: i,
		id: s,
		name: c,
		inputComponent: yg,
		countrySelectComponent: _g,
		countrySelectProps: { dark: o },
		onChange: (e) => u?.(e),
		onBlur: d,
		numberInputProps: { "aria-describedby": l }
	});
}
var yg = (e) => /* @__PURE__ */ t("input", {
	className: "input-phone__number",
	...e
});
yg.displayName = "InputPhoneField";
//#endregion
//#region src/stories/atoms/Label/Label.tsx
function bg({ htmlFor: e, children: n, hidden: r = !1 }) {
	return /* @__PURE__ */ t("label", {
		htmlFor: e,
		className: ["label", r ? "visually-hidden" : ""].filter(Boolean).join(" "),
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Link/Link.tsx
function xg({ href: e, children: n, external: r = !1, className: i, onClick: a }) {
	return /* @__PURE__ */ t("a", {
		href: e,
		className: i,
		onClick: a,
		...r ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: n
	});
}
//#endregion
//#region src/stories/atoms/List/List.tsx
function Sg({ type: e = "unordered", children: n }) {
	return /* @__PURE__ */ t(e === "ordered" ? "ol" : "ul", {
		className: `list list--${e}`,
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Logo/Logo.tsx
function Cg({ width: r, height: i, className: a, dark: o = !1 }) {
	return /* @__PURE__ */ t(e, { children: /* @__PURE__ */ t("svg", {
		version: "1.1",
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		x: "0px",
		y: "0px",
		viewBox: "0 0 925.5 265.5",
		xmlSpace: "preserve",
		width: r,
		height: i,
		fill: "currentColor",
		className: [
			"logo",
			o ? "logo--dark" : "",
			a
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		children: /* @__PURE__ */ n("g", { children: [/* @__PURE__ */ n("g", { children: [
			/* @__PURE__ */ t("path", { d: "M108.2,203.5c-7,0-13-1.1-18.1-3.4c-5.1-2.3-9.4-5.2-13-8.9l-10.5,9.9H62l8.3-39.2h4.6 c3.6,24.7,15.1,37,34.6,37c7.6,0,14-1.6,19.2-4.7c5.2-3.1,9.2-7.1,11.9-11.8c2.7-4.7,4-9.4,4-13.9c0-5.3-1.4-9.7-4.2-13.2 c-2.8-3.5-6.4-6.6-10.9-9.2c-4.4-2.6-9.1-5.2-14.1-7.6c-5-2.5-9.7-5.2-14.1-8.4c-4.4-3.1-8-7-10.9-11.7 c-2.8-4.7-4.2-10.4-4.2-17.3c0-7.1,1.5-13.7,4.6-19.9c3.1-6.1,7.7-11.1,13.9-14.9c6.2-3.8,14-5.7,23.5-5.7c6.6,0,12.2,1,16.7,2.9 c4.5,1.9,8.2,4.3,11,7.3l7.7-8.5h4.6L161,99h-4.6c0-6.7-1.1-12.6-3.4-17.7c-2.3-5-5.5-9-9.8-11.8c-4.2-2.8-9.4-4.2-15.5-4.2 c-4.4,0-8.9,0.9-13.5,2.6c-4.6,1.7-8.5,4.2-11.6,7.5c-3.1,3.3-4.7,7.4-4.7,12.1c0,4.7,1.4,8.6,4.3,11.8c2.9,3.2,6.6,6,11,8.5 c4.5,2.5,9.3,4.9,14.4,7.5c5.1,2.5,9.9,5.5,14.4,8.9c4.5,3.4,8.2,7.7,11,12.7c2.9,5,4.3,11.3,4.3,18.8c0,9.4-2.2,17.8-6.5,24.9 c-4.4,7.2-10.2,12.8-17.6,16.8C125.9,201.5,117.5,203.5,108.2,203.5z" }),
			/* @__PURE__ */ t("path", { d: "M171.7,203.5c-4.5,0-8-1.2-10.5-3.5c-2.5-2.3-3.7-5.4-3.7-9.2c0-1,0.1-2,0.3-2.9c0.2-1,0.3-1.9,0.5-2.8 l21.2-87.6h19.7l-21.5,85.7c-0.4,1.6-0.6,2.9-0.7,3.9c-0.1,1-0.2,1.8-0.2,2.4c0,3.1,1.3,4.6,4,4.6c2.9,0,6.1-1.8,9.6-5.3 c3.4-3.6,7.2-9.6,11.4-18.2l3.7,1.7c-2.3,5.2-5.1,10.1-8.4,14.9c-3.3,4.8-7,8.7-11.1,11.8C181.7,201.9,176.9,203.5,171.7,203.5z M161.2,122.9v-4.6h49.1v4.6H161.2z" }),
			/* @__PURE__ */ t("path", { d: "M225.4,203.3c-4.7,0-8.7-1.2-12.1-3.6c-3.4-2.4-5.2-6.2-5.2-11.5c0-2.3,0.4-5,1.1-8.1l15.1-61.8h19.1 l-15.8,66.1c-0.1,0.9-0.3,1.7-0.5,2.5c-0.2,0.8-0.3,1.6-0.3,2.3c0,2.1,0.6,3.6,1.9,4.6c1.3,1,2.9,1.5,4.9,1.5 c2.8,0,5.7-0.9,8.6-2.6c2.9-1.7,5.8-4.1,8.5-7.3c2.7-3.1,5.1-6.7,7.3-10.8c2.1-4,3.9-8.5,5.2-13.2l-4,22.1H258 c-3.8,5-8.4,9.6-13.9,13.7C238.6,201.2,232.4,203.3,225.4,203.3z M209.8,122.9v-4.6H239v4.6H209.8z M273.6,203.3 c-2.3,0-4.7-0.5-7-1.6c-2.3-1-4.2-2.8-5.7-5.3c-1.5-2.5-2.2-6-2.2-10.4c0-1.7,0.2-3.7,0.5-5.9c0.3-2.2,0.8-4.7,1.4-7.4l13.1-54.5 h18.8L278.6,174c-0.9,3.8-1.5,7-2,9.7c-0.5,2.6-0.7,4.8-0.7,6.3c0,3.7,1.2,5.5,3.7,5.5c2.6,0,5.4-1.9,8.6-5.8 c3.1-3.9,6.4-9.4,9.8-16.5l3.7,1.7c-2.5,5.9-5.1,10.9-7.9,15.2c-2.8,4.2-5.9,7.5-9.1,9.8C281.3,202.2,277.7,203.3,273.6,203.3z" }),
			/* @__PURE__ */ t("path", { d: "M322.7,203.5c-5.4,0-10.4-1.3-15.1-4c-4.7-2.6-8.4-6.4-11.2-11.4c-2.8-5-4.2-11-4.2-18.1 c0-7.1,1.4-13.9,4.3-20.4c2.9-6.5,6.7-12.3,11.4-17.3c4.7-5,9.9-9,15.6-11.9c5.7-2.9,11.4-4.3,17-4.3c5.4,0,9.6,1.3,12.5,3.8 c2.9,2.5,5.2,5.7,6.8,9.7h1.3l-4.2,16.7c0.2-1.2,0.4-2.4,0.5-3.5c0.1-1.1,0.1-2.1,0.1-2.9c0-5.2-1.5-9.5-4.4-13.1 c-2.9-3.6-6.6-5.3-10.9-5.3c-3.7,0-7.1,1.4-10.1,4c-3.1,2.7-5.8,6.2-8.1,10.6c-2.3,4.4-4.3,9.1-6,14.3c-1.7,5.2-2.9,10.2-3.7,15.3 c-0.8,5-1.2,9.5-1.2,13.4c0,6.6,1.1,11.4,3.4,14.3c2.3,2.9,5.5,4.3,9.7,4.3c2.3,0,4.9-0.6,7.7-1.9c2.8-1.3,5.7-3.9,8.7-7.9 c3-4,5.9-10,8.6-17.9l-2.2,18.4h-1.3c-2.3,4.3-5.6,7.9-9.8,10.9C333.8,202,328.7,203.5,322.7,203.5z M362.5,203.5 c-4.2,0-7.5-1.2-10.1-3.7c-2.6-2.5-3.9-6.6-3.9-12.3c0-1.8,0.2-4,0.5-6.4c0.3-2.5,0.8-5.2,1.6-8.1l26.3-110.6h19.7l-29.8,120.9 c-0.4,1.6-0.6,2.9-0.7,3.9c-0.1,1-0.2,1.8-0.2,2.4c0,3.1,1.4,4.6,4.2,4.6c3.1,0,6.3-1.8,9.8-5.3c3.5-3.6,7.5-9.6,11.9-18.2 l3.7,1.7c-2.7,5.4-5.6,10.5-8.7,15.3s-6.7,8.6-10.6,11.6C372.2,202,367.6,203.5,362.5,203.5z M358.4,66.9v-4.6h35.9v4.6H358.4z" }),
			/* @__PURE__ */ t("path", { d: "M393.2,122.9v-4.6h28.5v4.6H393.2z M401.7,203.5c-4.5,0-8-1.2-10.5-3.5c-2.5-2.3-3.7-5.4-3.7-9.2 c0-1,0.1-2,0.3-2.9c0.2-1,0.3-1.9,0.5-2.8l16-66.8h19.7l-16.4,65c-0.4,1.6-0.6,2.9-0.7,3.9c-0.1,1-0.2,1.8-0.2,2.4 c0,3.1,1.3,4.6,4,4.6c2.9,0,6.1-1.8,9.6-5.3c3.4-3.6,7.2-9.6,11.4-18.2l3.7,1.7c-2.3,5.2-5.1,10.1-8.4,14.9 c-3.3,4.8-7,8.7-11.1,11.8C411.7,201.9,406.9,203.5,401.7,203.5z M420.3,91.1c-3.4,0-6.3-1.2-8.7-3.6c-2.4-2.4-3.6-5.3-3.6-8.7 c0-3.6,1.2-6.5,3.6-8.9c2.4-2.4,5.3-3.6,8.7-3.6c3.6,0,6.5,1.2,8.9,3.6c2.4,2.4,3.6,5.4,3.6,8.9c0,3.4-1.2,6.3-3.6,8.7 C426.8,89.9,423.8,91.1,420.3,91.1z" }),
			/* @__PURE__ */ t("path", { d: "M458,203.5c-6.7,0-12.6-1.5-17.7-4.6c-5-3.1-9-7.2-11.8-12.4c-2.8-5.2-4.2-11-4.2-17.4 c0-6.5,1.4-12.9,4.3-19.2c2.9-6.3,6.8-12,11.7-17.1c4.9-5.1,10.5-9.1,16.7-12.1c6.3-3,12.8-4.5,19.7-4.5c6.7,0,12.6,1.5,17.7,4.4 c5,2.9,9,6.9,11.8,12c2.8,5,4.2,10.7,4.2,17.1c0,6.5-1.4,12.9-4.3,19.3c-2.9,6.4-6.8,12.2-11.7,17.4c-4.9,5.2-10.5,9.4-16.7,12.5 C471.4,201.9,464.8,203.5,458,203.5z M458.3,198.9c5,0,9.5-1.7,13.3-5.2s7.1-8,9.8-13.6c2.6-5.6,4.6-11.7,6-18.2 c1.3-6.6,2-12.9,2-19c0-6.5-1-11.8-2.9-15.9c-1.9-4.1-5.5-6.2-10.8-6.2c-4.9,0-9.3,1.8-13.1,5.3c-3.8,3.6-7,8.2-9.7,13.9 c-2.6,5.7-4.6,11.9-6,18.6c-1.4,6.7-2,13.1-2,19.2c0,6.9,1,12.1,2.9,15.7C450,197.1,453.4,198.9,458.3,198.9z" })
		] }), /* @__PURE__ */ n("g", { children: [
			/* @__PURE__ */ t("path", { d: "M547.6,201.4V69.7h20.2v113.1h60.4v18.7H547.6z" }),
			/* @__PURE__ */ t("path", { d: "M631.6,201.4l49.3-74.3l2.2-0.1l35.6-57.3h22.4l-45.4,69.9h-1.8l-39.7,61.8H631.6z M722.6,201.4l-40.8-62.2 l-1.4-0.1l-46.1-69.5h23.3l37.4,57.3h1.8l49.6,74.4H722.6z" }),
			/* @__PURE__ */ t("path", { d: "M751.6,201.4V69.7h45.1c20.2,0,36.3,6,48.5,18c12.1,12,18.2,27.9,18.2,47.8c0,19.8-6.1,35.8-18.4,47.8 c-12.2,12.1-28.4,18.1-48.3,18.1H751.6z M771.9,183.3h24.4c14.2,0,25.4-4.3,33.8-12.8c8.4-8.5,12.6-20.1,12.6-34.6v-0.1 c0-14.7-4.1-26.3-12.4-34.9c-8.2-8.6-19.6-12.9-34-12.9h-24.4V183.3z" })
		] })] })
	}) });
}
//#endregion
//#region src/stories/atoms/Paragraph/Paragraph.tsx
function wg({ size: e = "default", children: n }) {
	return /* @__PURE__ */ t("p", {
		className: ["paragraph", e === "default" ? "" : `paragraph--${e}`].filter(Boolean).join(" "),
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Select/Select.tsx
function Tg({ options: e, value: r, defaultValue: i, placeholder: a = "Seleccionar…", disabled: o, dark: s, onValueChange: c, id: l }) {
	return /* @__PURE__ */ n(Is, {
		value: r,
		defaultValue: i,
		disabled: o,
		onValueChange: c,
		children: [/* @__PURE__ */ n(Ls, {
			className: "select",
			id: l,
			"aria-label": a,
			children: [/* @__PURE__ */ t(Rs, { placeholder: a }), /* @__PURE__ */ t(zs, {
				asChild: !0,
				children: /* @__PURE__ */ t(Be, {
					className: "select__icon",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ t(Bs, { children: /* @__PURE__ */ t(Vs, {
			className: ["select__content", s ? "select__content--dark" : ""].filter(Boolean).join(" "),
			position: "popper",
			children: /* @__PURE__ */ t(Hs, { children: e.map(({ value: e, label: n }) => /* @__PURE__ */ t(Us, {
				value: e,
				className: "select__item",
				children: /* @__PURE__ */ t(Ws, { children: n })
			}, e)) })
		}) })]
	});
}
//#endregion
//#region src/stories/atoms/Tag/Tag.tsx
function Eg({ variant: e = "default", children: n }) {
	return /* @__PURE__ */ t("span", {
		className: ["tag", `tag--${e}`].join(" "),
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Textarea/Textarea.tsx
function Dg({ placeholder: e, value: n, defaultValue: r, rows: i, disabled: a, readOnly: o, error: s = !1, id: c, name: l, describedBy: u, onChange: d, onBlur: f, onFocus: p }) {
	return /* @__PURE__ */ t("textarea", {
		className: ["textarea", s ? "textarea--error" : ""].filter(Boolean).join(" "),
		placeholder: e,
		value: n,
		defaultValue: r,
		rows: i,
		disabled: a,
		readOnly: o,
		id: c,
		name: l,
		"aria-invalid": s || void 0,
		"aria-describedby": u,
		onChange: d,
		onBlur: f,
		onFocus: p
	});
}
//#endregion
//#region src/stories/atoms/VisuallyHidden/VisuallyHidden.tsx
function Og({ children: e }) {
	return /* @__PURE__ */ t("span", {
		className: "visually-hidden",
		children: e
	});
}
//#endregion
//#region src/stories/molecules/Card/Card.tsx
function kg({ href: e, title: r, description: i, ctaLabel: a, color: o }) {
	return /* @__PURE__ */ n("a", {
		href: e,
		className: ["card", `card--${o}`].join(" "),
		children: [
			/* @__PURE__ */ t(J, {
				level: 2,
				weight: "semibold",
				children: r
			}),
			/* @__PURE__ */ t("p", { children: i }),
			/* @__PURE__ */ t(Og, { children: a }),
			/* @__PURE__ */ t(S, { size: "lg" })
		]
	});
}
//#endregion
//#region src/stories/molecules/CardSplit/CardSplit.tsx
function Ag({ href: e, title: r, description: i, ctaLabel: a, color: o, image: s }) {
	return /* @__PURE__ */ n("a", {
		href: e,
		className: ["card-split", `card-split--${o}`].join(" "),
		children: [/* @__PURE__ */ n("div", {
			className: "card-split__primary",
			children: [
				/* @__PURE__ */ t(J, {
					level: 2,
					weight: "semibold",
					className: "card-split__title",
					children: r
				}),
				/* @__PURE__ */ t("p", {
					className: "card-split__description",
					children: i
				}),
				/* @__PURE__ */ t(S, {
					className: "card-split__arrow",
					size: "lg"
				}),
				/* @__PURE__ */ t(Og, { children: a })
			]
		}), /* @__PURE__ */ t("div", {
			className: "card-split__photo",
			children: /* @__PURE__ */ t("img", {
				src: s.src,
				alt: s.alt
			})
		})]
	});
}
//#endregion
//#region src/stories/molecules/CardSquare/CardSquare.tsx
function jg({ href: e, title: r, description: i, ctaLabel: a, color: o, image: s }) {
	return /* @__PURE__ */ n("a", {
		href: e,
		className: ["card-square", `card-square--${o}`].join(" "),
		children: [/* @__PURE__ */ t("img", {
			className: "card-square__image",
			src: s.src,
			alt: s.alt
		}), /* @__PURE__ */ n("div", {
			className: "card-square__body",
			children: [
				/* @__PURE__ */ t(J, {
					level: 2,
					weight: "semibold",
					className: "card-square__title",
					children: r
				}),
				/* @__PURE__ */ t("p", {
					className: "card-square__description",
					children: i
				}),
				/* @__PURE__ */ t(S, {
					className: "card-square__arrow",
					size: "lg"
				}),
				/* @__PURE__ */ t(Og, { children: a })
			]
		})]
	});
}
//#endregion
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
function Mg({ label: e, checked: r, defaultChecked: i, disabled: a, id: o, name: s, value: c, onCheckedChange: l }) {
	return /* @__PURE__ */ n("label", {
		className: ["checkbox-field", a ? "checkbox-field--disabled" : ""].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ t(Dt, {
			checked: r,
			defaultChecked: i,
			disabled: a,
			id: o,
			name: s,
			value: c,
			onCheckedChange: l
		}), /* @__PURE__ */ t("span", {
			className: "checkbox-field__label",
			children: e
		})]
	});
}
//#endregion
//#region src/stories/molecules/Form/Form.tsx
function Ng({ errors: e, onSubmit: r, actions: i, children: a }) {
	return /* @__PURE__ */ n("form", {
		className: "form",
		onSubmit: r,
		noValidate: !0,
		children: [
			a,
			e && e.length > 0 && /* @__PURE__ */ t("ul", {
				className: "form-errors",
				role: "alert",
				children: e.map((e) => /* @__PURE__ */ t("li", {
					className: "form-errors__item",
					children: e
				}, e))
			}),
			i
		]
	});
}
//#endregion
//#region src/stories/molecules/InputField/InputField.tsx
function Pg({ id: e, label: r, labelHidden: i = !0, name: a, type: o, placeholder: s, value: c, defaultValue: l, disabled: u, readOnly: d, error: f = !1, errorMessage: p, helperText: m, onChange: h, onBlur: g, onFocus: _ }) {
	let v = p ? `${e}-error` : void 0, y = m ? `${e}-helper` : void 0, b = [v, y].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ n("div", {
		className: "input-field",
		children: [
			/* @__PURE__ */ t(bg, {
				htmlFor: e,
				hidden: i,
				children: r
			}),
			/* @__PURE__ */ t(kt, {
				id: e,
				name: a,
				type: o,
				placeholder: s,
				value: c,
				defaultValue: l,
				disabled: u,
				readOnly: d,
				error: f,
				describedBy: b,
				onChange: h,
				onBlur: g,
				onFocus: _
			}),
			p && /* @__PURE__ */ t("span", {
				id: v,
				className: "input-field__error",
				role: "alert",
				children: p
			}),
			m && /* @__PURE__ */ t("span", {
				id: y,
				className: "input-field__helper",
				children: m
			})
		]
	});
}
//#endregion
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
function Fg({ id: e, label: r, labelHidden: i = !0, value: a, defaultCountry: o, placeholder: s, disabled: c, error: l = !1, errorMessage: u, helperText: d, dark: f, name: p, onChange: m, onBlur: h }) {
	let g = u ? `${e}-error` : void 0, _ = d ? `${e}-helper` : void 0, v = [g, _].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ n("div", {
		className: "input-phone-field",
		children: [
			/* @__PURE__ */ t(bg, {
				htmlFor: e,
				hidden: i,
				children: r
			}),
			/* @__PURE__ */ t(vg, {
				id: e,
				name: p,
				value: a,
				defaultCountry: o,
				placeholder: s,
				disabled: c,
				error: l,
				dark: f,
				describedBy: v,
				onChange: m,
				onBlur: h
			}),
			u && /* @__PURE__ */ t("span", {
				id: g,
				className: "input-phone-field__error",
				children: u
			}),
			d && /* @__PURE__ */ t("span", {
				id: _,
				className: "input-phone-field__helper",
				children: d
			})
		]
	});
}
//#endregion
//#region src/stories/molecules/TextareaField/TextareaField.tsx
function Ig({ id: e, label: r, labelHidden: i = !0, name: a, placeholder: o, value: s, defaultValue: c, rows: l, disabled: u, readOnly: d, error: f = !1, errorMessage: p, helperText: m, onChange: h, onBlur: g, onFocus: _ }) {
	let v = p ? `${e}-error` : void 0, y = m ? `${e}-helper` : void 0, b = [v, y].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ n("div", {
		className: "textarea-field",
		children: [
			/* @__PURE__ */ t(bg, {
				htmlFor: e,
				hidden: i,
				children: r
			}),
			/* @__PURE__ */ t(Dg, {
				id: e,
				name: a,
				placeholder: o,
				value: s,
				defaultValue: c,
				rows: l,
				disabled: u,
				readOnly: d,
				error: f,
				describedBy: b,
				onChange: h,
				onBlur: g,
				onFocus: _
			}),
			p && /* @__PURE__ */ t("span", {
				id: v,
				className: "textarea-field__error",
				role: "alert",
				children: p
			}),
			m && /* @__PURE__ */ t("span", {
				id: y,
				className: "textarea-field__helper",
				children: m
			})
		]
	});
}
//#endregion
//#region src/stories/organisms/ContactForm/ContactForm.tsx
function Lg({ emailPlaceholder: e = "Escribe aquí tu correo electrónico", messagePlaceholder: r = "Escribe aquí tu mensaje", messageRows: i = 5, privacyLabel: a, buttonLabel: o = "Enviar mensaje", submitting: s = !1, submittingLabel: c = "Enviando…", errors: l, success: d = !1, successMessage: f = "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.", onSubmit: p }) {
	let [m, h] = u(!1);
	return d ? /* @__PURE__ */ t("p", {
		className: "form__success",
		children: f
	}) : /* @__PURE__ */ n(Ng, {
		errors: l,
		onSubmit: p,
		actions: /* @__PURE__ */ t(w, {
			variant: "form",
			disabled: s,
			children: s ? c : o
		}),
		children: [
			/* @__PURE__ */ t(Pg, {
				id: "contact-email",
				label: "Email",
				labelHidden: !0,
				type: "email",
				placeholder: e,
				disabled: s
			}),
			/* @__PURE__ */ t(Ig, {
				id: "contact-message",
				label: "Mensaje",
				labelHidden: !0,
				placeholder: r,
				rows: i,
				disabled: s
			}),
			/* @__PURE__ */ t(Mg, {
				id: "contact-phone",
				label: "Prefiero que me llaméis por teléfono",
				disabled: s,
				checked: m,
				onCheckedChange: (e) => h(e === !0)
			}),
			m && /* @__PURE__ */ t(Fg, {
				id: "contact-phone-number",
				label: "Teléfono",
				labelHidden: !0,
				placeholder: "Escribe aquí tu número de teléfono",
				helperText: "Solo utilizaremos tu número de teléfono para hablarte sobre este proyecto.",
				disabled: s
			}),
			/* @__PURE__ */ t(Mg, {
				id: "contact-privacy",
				label: a,
				disabled: s
			})
		]
	});
}
//#endregion
//#region src/stories/organisms/NewsletterForm/NewsletterForm.tsx
function Rg({ emailPlaceholder: e = "Escribe aquí tu correo electrónico", privacyLabel: r, buttonLabel: i = "Suscríbeme a la newsletter", submitting: a = !1, submittingLabel: o = "Suscribiéndote…", errors: s, success: c = !1, successMessage: l = "¡Gracias por suscribirte! Ya no te perderás ninguna de nuestras novedades.", onSubmit: u }) {
	return c ? /* @__PURE__ */ t("p", {
		className: "form__success",
		children: l
	}) : /* @__PURE__ */ t("div", {
		className: "newsletter-form",
		children: /* @__PURE__ */ n(Ng, {
			errors: s,
			onSubmit: u,
			actions: /* @__PURE__ */ t(w, {
				variant: "form",
				disabled: a,
				children: a ? o : i
			}),
			children: [/* @__PURE__ */ t(Pg, {
				id: "newsletter-email",
				label: "Email",
				labelHidden: !0,
				type: "email",
				placeholder: e,
				disabled: a
			}), /* @__PURE__ */ t(Mg, {
				id: "newsletter-privacy",
				label: r,
				disabled: a
			})]
		})
	});
}
//#endregion
//#region node_modules/embla-carousel-auto-scroll/esm/embla-carousel-auto-scroll.esm.js
var zg = {
	direction: "forward",
	speed: 2,
	startDelay: 1e3,
	active: !0,
	breakpoints: {},
	playOnInit: !0,
	stopOnFocusIn: !0,
	stopOnInteraction: !0,
	stopOnMouseEnter: !1,
	rootNode: null
};
function Bg(e, t) {
	let n = e.rootNode();
	return t && t(n) || n;
}
function Vg(e = {}) {
	let t, n, r, i, a = 0, o = !1, s = !1, c;
	function l(a, o) {
		n = a;
		let { mergeOptions: s, optionsAtMedia: l } = o;
		if (t = l(s(s(zg, Vg.globalOptions), e)), n.scrollSnapList().length <= 1) return;
		i = t.startDelay, r = !1, c = n.internalEngine().scrollBody;
		let { eventStore: u } = n.internalEngine(), p = !!n.internalEngine().options.watchDrag, v = Bg(n, t.rootNode);
		p && n.on("pointerDown", m), p && !t.stopOnInteraction && n.on("pointerUp", h), t.stopOnMouseEnter && u.add(v, "mouseenter", g), t.stopOnMouseEnter && !t.stopOnInteraction && u.add(v, "mouseleave", _), t.stopOnFocusIn && n.on("slideFocusStart", f), t.stopOnFocusIn && !t.stopOnInteraction && u.add(n.containerNode(), "focusout", d), t.playOnInit && d();
	}
	function u() {
		n.off("pointerDown", m).off("pointerUp", h).off("slideFocusStart", f).off("settle", v), f(), r = !0, o = !1;
	}
	function d() {
		if (r || o) return;
		n.emit("autoScroll:play");
		let e = n.internalEngine(), { ownerWindow: t } = e;
		a = t.setTimeout(() => {
			e.scrollBody = p(e), e.animation.start();
		}, i), o = !0;
	}
	function f() {
		if (r || !o) return;
		n.emit("autoScroll:stop");
		let e = n.internalEngine(), { ownerWindow: t } = e;
		e.scrollBody = c, t.clearTimeout(a), a = 0, o = !1;
	}
	function p(e) {
		let { location: r, previousLocation: i, offsetLocation: a, target: o, scrollTarget: s, index: c, indexPrevious: l, limit: { reachedMin: u, reachedMax: d, constrain: p }, options: { loop: m } } = e, h = t.direction === "forward" ? -1 : 1, g = () => C, _ = 0, v = 0, y = r.get(), b = 0, x = !1;
		function S() {
			let e = 0;
			i.set(r), _ = h * t.speed, y += _, r.add(_), o.set(r), e = y - b, v = Math.sign(e), b = y;
			let g = s.byDistance(0, !1).index;
			c.get() !== g && (l.set(c.get()), c.set(g), n.emit("select"));
			let S = t.direction === "forward" ? u(a.get()) : d(a.get());
			if (!m && S) {
				x = !0;
				let e = p(r.get());
				r.set(e), o.set(r), f();
			}
			return C;
		}
		let C = {
			direction: () => v,
			duration: () => -1,
			velocity: () => _,
			settled: () => x,
			seek: S,
			useBaseFriction: g,
			useBaseDuration: g,
			useFriction: g,
			useDuration: g
		};
		return C;
	}
	function m() {
		s || f();
	}
	function h() {
		s || y();
	}
	function g() {
		s = !0, f();
	}
	function _() {
		s = !1, d();
	}
	function v() {
		n.off("settle", v), d();
	}
	function y() {
		n.on("settle", v);
	}
	function b(e) {
		e !== void 0 && (i = e), d();
	}
	function x() {
		o && f();
	}
	function S() {
		o && (f(), y());
	}
	function C() {
		return o;
	}
	return {
		name: "autoScroll",
		options: e,
		init: l,
		destroy: u,
		play: b,
		stop: x,
		reset: S,
		isPlaying: C
	};
}
Vg.globalOptions = void 0;
//#endregion
//#region src/stories/sections/ClientsSection/ClientsSection.tsx
function Hg({ title: e = "Hemos trabajado junto a...", clients: r }) {
	return /* @__PURE__ */ n("section", {
		className: "clients-section",
		children: [/* @__PURE__ */ t(J, {
			level: 2,
			weight: "semibold",
			children: e
		}), /* @__PURE__ */ t(Ve, {
			options: { align: "start" },
			plugins: [Vg({
				speed: 1,
				stopOnInteraction: !1
			})],
			hideButtons: !0,
			children: r.map((e) => /* @__PURE__ */ t(He, {
				className: "clients-section__slide",
				children: /* @__PURE__ */ t("img", {
					src: e.logo,
					alt: e.name,
					className: "clients-section__logo"
				})
			}, e.id))
		})]
	});
}
//#endregion
//#region src/stories/sections/ContactSection/ContactSection.tsx
function Ug({ title: e, form: r, whatsappTitle: i, whatsappLabel: a, whatsappHref: o }) {
	return /* @__PURE__ */ n("section", {
		className: "contact-section",
		children: [/* @__PURE__ */ n("div", {
			className: "contact-section__left",
			children: [/* @__PURE__ */ t("div", {
				className: "contact-section__intro",
				children: /* @__PURE__ */ t(J, {
					level: 2,
					weight: "semibold",
					children: e
				})
			}), /* @__PURE__ */ n("aside", {
				className: "contact-section__cta",
				children: [/* @__PURE__ */ t(J, {
					level: 3,
					children: i
				}), /* @__PURE__ */ t(w, {
					href: o,
					variant: "primary",
					external: !0,
					children: a
				})]
			})]
		}), /* @__PURE__ */ t("div", {
			className: "contact-section__form",
			children: /* @__PURE__ */ t(Lg, { ...r })
		})]
	});
}
//#endregion
//#region src/stories/sections/Footer/Footer.tsx
function Wg() {
	return /* @__PURE__ */ n("footer", {
		className: "footer surface-dark",
		children: [
			/* @__PURE__ */ n("div", {
				className: "footer__col footer__col--1",
				children: [/* @__PURE__ */ n(J, {
					level: 2,
					className: "footer__tagline",
					children: [
						/* @__PURE__ */ t("span", { children: "Learning" }),
						/* @__PURE__ */ t("span", { children: "experience" }),
						/* @__PURE__ */ t("span", { children: "design" })
					]
				}), /* @__PURE__ */ t("div", {
					className: "footer__logo",
					children: /* @__PURE__ */ t(Cg, { height: 50 })
				})]
			}),
			/* @__PURE__ */ n("div", {
				className: "footer__col footer__col--2",
				children: [/* @__PURE__ */ t(J, {
					level: 3,
					children: "Suscríbete a nuestra newsletter"
				}), /* @__PURE__ */ t(Rg, { privacyLabel: /* @__PURE__ */ n(e, { children: [
					"He leído la ",
					/* @__PURE__ */ t(xg, {
						href: "#",
						children: "política de privacidad"
					}),
					" y consiento recibir la newsletter"
				] }) })]
			}),
			/* @__PURE__ */ n("div", {
				className: "footer__col footer__col--3",
				children: [/* @__PURE__ */ n("ul", {
					className: "footer__social",
					children: [
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(xg, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "LinkedIn"
						}) }),
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(xg, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "Instagram"
						}) }),
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(xg, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "GitHub"
						}) })
					]
				}), /* @__PURE__ */ n("address", {
					className: "footer__contact",
					children: [/* @__PURE__ */ t(xg, {
						href: "mailto:hello@studiolxd.com",
						children: "hello@studiolxd.com"
					}), /* @__PURE__ */ t(xg, {
						href: "tel:+34623752862",
						children: "+34 623 752 862"
					})]
				})]
			}),
			/* @__PURE__ */ t("div", {
				className: "footer__bottom",
				children: /* @__PURE__ */ n("ul", {
					className: "footer__legal",
					children: [
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(xg, {
							href: "#",
							children: "Aviso legal"
						}) }),
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(xg, {
							href: "#",
							children: "Política de privacidad"
						}) }),
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(xg, {
							href: "#",
							children: "Política de cookies"
						}) })
					]
				})
			})
		]
	});
}
//#endregion
//#region src/stories/sections/Header/Header.tsx
function Gg({ navItems: e, featuredLink: r, actions: i, logoHref: a = "/", logoLabel: o = "Studio LXD — ir al inicio", navLabel: s = "Main navigation", dark: c = !1 }) {
	let [l, d] = u(!1), f = () => {
		d(!1);
	};
	return /* @__PURE__ */ n("header", {
		className: ["header", c ? "header--dark" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ t("a", {
				href: "#main-content",
				className: "header__skip-link",
				children: "Saltar al contenido principal"
			}),
			/* @__PURE__ */ t("a", {
				href: a,
				className: "header__logo",
				"aria-label": o,
				children: /* @__PURE__ */ t(Cg, {})
			}),
			/* @__PURE__ */ t(Ot, {
				isOpen: l,
				onClick: () => d(!l),
				label: l ? "Cerrar menu" : "Abrir menu"
			}),
			/* @__PURE__ */ n("div", {
				className: "header__navbar",
				"aria-hidden": !l,
				children: [
					r && /* @__PURE__ */ t("a", {
						href: r.href,
						className: "header__featured",
						onClick: f,
						children: r.label
					}),
					/* @__PURE__ */ t("nav", {
						"aria-label": s,
						children: e.map((e) => /* @__PURE__ */ t("a", {
							href: e.href,
							className: "header__nav-link",
							onClick: f,
							children: e.label
						}, e.href))
					}),
					i && /* @__PURE__ */ t("div", {
						className: "header__actions",
						children: i
					})
				]
			})
		]
	});
}
//#endregion
//#region src/stories/sections/HighlightSection/HighlightSection.tsx
function Kg({ text: e, align: n = "left", textAlign: r, className: i }) {
	return /* @__PURE__ */ t("section", {
		className: "highlight-section",
		children: /* @__PURE__ */ t("div", {
			className: [
				"highlight-section__container",
				n === "left" ? "" : `highlight-section__container--${n}`,
				r ? `highlight-section__container--text-${r}` : "",
				i
			].filter(Boolean).join(" "),
			children: /* @__PURE__ */ t("p", { children: e })
		})
	});
}
//#endregion
//#region src/stories/sections/MethodologySection/MethodologySection.tsx
function qg({ intro: e, ctaLabel: r, ctaHref: i, steps: a, "aria-label": o }) {
	return /* @__PURE__ */ n("section", {
		className: "methodology-section",
		"aria-label": o,
		children: [/* @__PURE__ */ n("div", {
			className: "methodology-section__intro",
			children: [/* @__PURE__ */ t(J, {
				level: 2,
				weight: "semibold",
				children: e
			}), /* @__PURE__ */ t(w, {
				href: i,
				variant: "primary",
				children: r
			})]
		}), /* @__PURE__ */ t("div", {
			className: "methodology-section__steps",
			children: a.map((e, r) => /* @__PURE__ */ n("div", {
				className: "methodology-section__step",
				children: [/* @__PURE__ */ t("div", {
					className: "methodology-section__number",
					children: String(r + 1).padStart(2, "0")
				}), /* @__PURE__ */ t("div", {
					className: "methodology-section__text",
					children: e.text
				})]
			}, e.text))
		})]
	});
}
//#endregion
//#region src/stories/sections/ProjectsSection/ProjectsSection.tsx
function Jg({ title: e = "Proyectos", projects: r }) {
	return /* @__PURE__ */ n("section", {
		className: "projects-section",
		children: [/* @__PURE__ */ t(J, {
			level: 2,
			weight: "semibold",
			children: e
		}), /* @__PURE__ */ t(Ve, {
			options: { align: "center" },
			children: r.map((e) => /* @__PURE__ */ t(He, { children: /* @__PURE__ */ n("a", {
				className: "project-card",
				href: e.href,
				"aria-label": e.title,
				children: [
					/* @__PURE__ */ t(Eg, {
						variant: e.tagVariant ?? "default",
						children: e.category
					}),
					/* @__PURE__ */ t(J, {
						level: 3,
						className: "project-card__title",
						children: e.title
					}),
					/* @__PURE__ */ t("div", {
						className: "project-card__image-wrap",
						children: /* @__PURE__ */ t("img", {
							src: e.photo,
							alt: e.photoAlt ?? e.title,
							className: "project-card__image"
						})
					}),
					/* @__PURE__ */ t("p", {
						className: "project-card__description",
						children: e.description
					}),
					/* @__PURE__ */ t("span", {
						className: "project-card__cta button button--primary",
						"aria-hidden": "true",
						children: "Leer más"
					})
				]
			}) }, e.id))
		})]
	});
}
//#endregion
//#region src/stories/sections/ReviewsSection/ReviewsSection.tsx
function Yg({ title: e = "Lo que dice nuestro alumnado", reviews: r }) {
	return /* @__PURE__ */ n("section", {
		className: "reviews-section surface-dark",
		children: [/* @__PURE__ */ t(J, {
			level: 2,
			weight: "semibold",
			children: e
		}), /* @__PURE__ */ t(Ve, {
			options: {
				align: "center",
				loop: !0
			},
			gradientColor: "var(--color-background-dark)",
			children: r.map((e) => /* @__PURE__ */ t(He, { children: /* @__PURE__ */ n("article", {
				className: "review-card",
				children: [/* @__PURE__ */ n("div", {
					className: "review-card__author",
					children: [/* @__PURE__ */ t(C, {
						src: e.photo,
						alt: e.author,
						size: "xl",
						className: "review-card__avatar"
					}), /* @__PURE__ */ n("div", {
						className: "review-card__identity",
						children: [/* @__PURE__ */ t(J, {
							level: 3,
							className: "review-card__name",
							children: e.author
						}), /* @__PURE__ */ t(J, {
							level: 4,
							className: "review-card__role",
							children: e.role
						})]
					})]
				}), /* @__PURE__ */ t("blockquote", {
					className: "review-card__quote",
					children: e.quote
				})]
			}) }, e.id))
		})]
	});
}
//#endregion
//#region src/stories/sections/SolutionsSection/SolutionsSection.tsx
function Xg({ items: e, "aria-label": n }) {
	return /* @__PURE__ */ t("section", {
		className: "solutions-section",
		"aria-label": n,
		children: e.map((e) => /* @__PURE__ */ t(kg, { ...e }, e.title))
	});
}
//#endregion
//#region src/stories/constants/navigation.ts
var Zg = [
	{
		label: "Inicio",
		href: "#"
	},
	{
		label: "Soluciones",
		href: "#"
	},
	{
		label: "Proyectos",
		href: "#"
	},
	{
		label: "Academia",
		href: "#"
	},
	{
		label: "Contacto",
		href: "#"
	}
], Qg = {
	label: "Cursos online",
	href: "#"
}, $g = [
	{
		id: "ana-garcia",
		photo: "https://i.pravatar.cc/120?img=47",
		author: "Ana García",
		role: "Diseñadora instruccional",
		quote: "El curso cambió completamente mi forma de diseñar formaciones. Ahora entiendo la pedagogía detrás de cada decisión."
	},
	{
		id: "carlos-martinez",
		photo: "https://i.pravatar.cc/120?img=12",
		author: "Carlos Martínez",
		role: "Responsable de formación",
		quote: "Muy práctico y directo al grano. Aprendí más en unas semanas que en años de prueba y error por mi cuenta."
	},
	{
		id: "laura-sanchez",
		photo: "https://i.pravatar.cc/120?img=32",
		author: "Laura Sánchez",
		role: "Técnica de RRHH",
		quote: "El acompañamiento del equipo de Studio LXD durante todo el proceso fue clave. No me sentí sola en ningún momento."
	},
	{
		id: "miguel-torres",
		photo: "https://i.pravatar.cc/120?img=68",
		author: "Miguel Torres",
		role: "Consultor de e-learning",
		quote: "Herramientas reales, casos reales. Exactamente lo que necesitaba para dar el salto profesional que buscaba."
	},
	{
		id: "sofia-ruiz",
		photo: "https://i.pravatar.cc/120?img=5",
		author: "Sofía Ruiz",
		role: "Coordinadora de formación",
		quote: "El enfoque centrado en el aprendizaje me ayudó a replantear todos mis proyectos. Una visión totalmente nueva."
	},
	{
		id: "pablo-jimenez",
		photo: "https://i.pravatar.cc/120?img=15",
		author: "Pablo Jiménez",
		role: "Desarrollador instruccional",
		quote: "Muy buena relación entre teoría y práctica. Pude aplicar lo aprendido desde el primer módulo en mi trabajo diario."
	},
	{
		id: "elena-moreno",
		photo: "https://i.pravatar.cc/120?img=9",
		author: "Elena Moreno",
		role: "Formadora corporativa",
		quote: "El programa me dio el marco conceptual que me faltaba. Ahora diseño con mucha más seguridad y criterio."
	},
	{
		id: "david-lopez",
		photo: "https://i.pravatar.cc/120?img=53",
		author: "David López",
		role: "Técnico de formación",
		quote: "Superó mis expectativas. El contenido está muy bien estructurado y el equipo resuelve dudas con rapidez y claridad."
	}
], e_ = [
	{
		id: "onboarding-randstad",
		category: "E-learning",
		tagVariant: "secondary",
		photo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fit=crop",
		title: "Onboarding digital para Randstad",
		description: "Diseñamos un itinerario de incorporación 100% online para 1.200 nuevos empleados al año."
	},
	{
		id: "liderazgo-retail",
		category: "Formación presencial",
		tagVariant: "tertiary",
		photo: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&fit=crop",
		title: "Taller de liderazgo para mandos intermedios",
		description: "Programa presencial de tres módulos para 80 responsables de equipo de una empresa del sector retail."
	},
	{
		id: "catalogo-grupo-mayo",
		category: "Diseño instruccional",
		tagVariant: "quaternary",
		photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&fit=crop",
		title: "Rediseño del catálogo formativo de Grupo Mayo",
		description: "Auditamos y rediseñamos desde cero un catálogo de 40 cursos desactualizados."
	},
	{
		id: "moodle-junta-andalucia",
		category: "Plataformas LMS",
		tagVariant: "quinary",
		photo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&fit=crop",
		title: "Implantación de Moodle para la Junta de Andalucía",
		description: "Configuramos y personalizamos una instancia de Moodle para 15.000 usuarios."
	},
	{
		id: "estrategia-linkup",
		category: "Consultoría",
		tagVariant: "primary",
		photo: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&fit=crop",
		title: "Estrategia L&D para Linkup Coaching",
		description: "Acompañamos a su equipo en la definición de una estrategia de aprendizaje alineada con el plan de negocio."
	},
	{
		id: "compliance-elearning",
		category: "E-learning",
		tagVariant: "secondary",
		photo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&fit=crop",
		title: "Curso de compliance y prevención de riesgos",
		description: "Módulo e-learning con escenarios de decisión ramificados para garantizar la comprensión real de la normativa."
	},
	{
		id: "guia-formadores-sawy",
		category: "Diseño instruccional",
		tagVariant: "quaternary",
		photo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&fit=crop",
		title: "Guía didáctica para formadores internos de Sawy",
		description: "Creamos una guía metodológica para que el equipo interno pudiera replicar y actualizar los contenidos."
	},
	{
		id: "migracion-lms",
		category: "Plataformas LMS",
		tagVariant: "quinary",
		photo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80&fit=crop",
		title: "Migración de TalentLMS a Canvas",
		description: "Gestionamos la migración completa de contenidos, usuarios y datos históricos."
	}
], t_ = [
	{
		id: "junta-de-andalucia",
		name: "Junta de Andalucía",
		logo: "/clients/logo-junta-de-andalucia.png"
	},
	{
		id: "grupo-mayo",
		name: "Grupo Mayo",
		logo: "/clients/logo-grupo-mayo.png"
	},
	{
		id: "randstad",
		name: "Randstad",
		logo: "/clients/logo-randstad.png"
	},
	{
		id: "meridianos",
		name: "Meridianos",
		logo: "/clients/logo-meridianos.png"
	},
	{
		id: "linkup-coaching",
		name: "Linkup Coaching",
		logo: "/clients/logo-linkup-coaching.png"
	},
	{
		id: "design-training",
		name: "Design Training",
		logo: "/clients/logo-design-training.png"
	},
	{
		id: "sawy",
		name: "Sawy",
		logo: "/clients/logo-sawy.png"
	}
], n_ = [
	{ text: "Preguntamos para conocer vuestras necesidades." },
	{ text: "Colaboramos con vuestro equipo quienes tienen el know how de la organización." },
	{ text: "Asesoramos sobre las mejores soluciones." },
	{ text: "Acompañamos hasta implementar la solución." }
], r_ = [{
	href: "#",
	color: "secondary",
	title: "Contenidos elearning",
	description: "Diseñamos contenidos multimedia interactivos para formación online, utilizando estándares como SCORM y xAPI.",
	ctaLabel: "Ver más sobre contenidos elearning"
}, {
	href: "#",
	color: "tertiary",
	title: "Plataformas elearning",
	description: "Desarrollamos plataformas elearning adaptadas a tu identidad visual y centradas en las personas usuarias para lograr una experiencia de aprendizaje gratificante.",
	ctaLabel: "Ver más sobre plataformas elearning"
}], i_ = {
	title: "¿Hablamos?",
	form: {
		privacyLabel: /* @__PURE__ */ n(e, { children: [
			"He leído la",
			" ",
			/* @__PURE__ */ t("a", {
				href: "#",
				children: "política de privacidad"
			})
		] }),
		emailPlaceholder: "Escribe aquí tu correo electrónico",
		messagePlaceholder: "Cuéntanos brevemente qué necesitas",
		buttonLabel: "Envía el mensaje",
		submittingLabel: "Enviando mensaje...",
		successMessage: "¡Gracias por tu mensaje! Nos pondremos en contacto contigo lo antes posible."
	},
	whatsappTitle: "¿Mejor por WhatsApp?",
	whatsappLabel: "Escríbenos",
	whatsappHref: "https://wa.me/34600000000"
};
//#endregion
//#region src/stories/pages/Home/Home.tsx
function a_() {
	return /* @__PURE__ */ n("div", {
		className: "home",
		children: [
			/* @__PURE__ */ t(Gg, {
				navItems: Zg,
				featuredLink: Qg,
				actions: /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t(Tg, {
					options: [{
						value: "es",
						label: "ES"
					}, {
						value: "en",
						label: "EN"
					}],
					defaultValue: "es"
				}), /* @__PURE__ */ t(w, {
					href: "https://academy.studiolxd.com",
					variant: "primary",
					external: !0,
					children: "Entra a la academia"
				})] })
			}),
			/* @__PURE__ */ n("main", {
				id: "main-content",
				className: "home__main",
				children: [
					/* @__PURE__ */ n("section", {
						className: "home__video-section",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ t("div", {
							className: "home__video-landscape",
							children: /* @__PURE__ */ n("video", {
								autoPlay: !0,
								loop: !0,
								muted: !0,
								playsInline: !0,
								children: [/* @__PURE__ */ t("source", {
									src: "/videos/hero-landscape.webm",
									type: "video/webm"
								}), /* @__PURE__ */ t("source", {
									src: "/videos/hero-landscape.mp4",
									type: "video/mp4"
								})]
							})
						}), /* @__PURE__ */ t("div", {
							className: "home__video-portrait",
							children: /* @__PURE__ */ n("video", {
								autoPlay: !0,
								loop: !0,
								muted: !0,
								playsInline: !0,
								children: [/* @__PURE__ */ t("source", {
									src: "/videos/hero-portrait.webm",
									type: "video/webm"
								}), /* @__PURE__ */ t("source", {
									src: "/videos/hero-portrait.mp4",
									type: "video/mp4"
								})]
							})
						})]
					}),
					/* @__PURE__ */ t(Xg, {
						"aria-label": "Soluciones",
						items: r_
					}),
					/* @__PURE__ */ t(qg, {
						"aria-label": "Metodología",
						intro: "Te acompañamos durante todo el proceso",
						ctaLabel: "Descubre cómo trabajamos",
						ctaHref: "#",
						steps: n_
					}),
					/* @__PURE__ */ t(Jg, {
						title: "Nuestros trabajos",
						projects: e_
					}),
					/* @__PURE__ */ n("section", {
						className: "home__academy",
						"aria-label": "Academia",
						children: [/* @__PURE__ */ t(Kg, {
							text: "Fórmate en la academia de Studio LXD. Aprende sobre diseño instruccional y herramientas para crear contenidos elearning con nuestros cursos.",
							align: "center"
						}), /* @__PURE__ */ n("div", {
							className: "home__courses",
							children: [
								/* @__PURE__ */ t(jg, {
									href: "#",
									color: "secondary",
									title: "Diseño instruccional",
									description: "Aprende a diseñar experiencias de aprendizaje efectivas combinando pedagogía, diseño y tecnología.",
									ctaLabel: "Ver más sobre diseño instruccional",
									image: {
										src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80&fit=crop",
										alt: "Personas trabajando en equipo"
									}
								}),
								/* @__PURE__ */ t(jg, {
									href: "#",
									color: "tertiary",
									title: "Herramientas elearning",
									description: "Domina las principales herramientas de autoría para crear contenidos interactivos y atractivos.",
									ctaLabel: "Ver más sobre herramientas elearning",
									image: {
										src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80&fit=crop",
										alt: "Persona trabajando con ordenador"
									}
								}),
								/* @__PURE__ */ t(Ag, {
									href: "#",
									color: "quaternary",
									title: "Formación de formadores",
									description: "Desarrolla las competencias clave para facilitar sesiones formativas presenciales y online con impacto real.",
									ctaLabel: "Ver más sobre formación de formadores",
									image: {
										src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&fit=crop",
										alt: "Sesión de formación en grupo"
									}
								}),
								/* @__PURE__ */ t(Ag, {
									href: "#",
									color: "quinary",
									title: "Moodle y plataformas LMS",
									description: "Configura y personaliza tu plataforma de formación online para ofrecer la mejor experiencia a tus estudiantes.",
									ctaLabel: "Ver más sobre Moodle y plataformas LMS",
									image: {
										src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80&fit=crop",
										alt: "Pantalla con interfaz digital"
									}
								})
							]
						})]
					}),
					/* @__PURE__ */ t(Yg, {
						title: "Lo que dice nuestro alumnado",
						reviews: $g
					}),
					/* @__PURE__ */ t(Hg, {
						title: "Hemos trabajado junto a...",
						clients: t_
					}),
					/* @__PURE__ */ t(Ug, { ...i_ })
				]
			}),
			/* @__PURE__ */ t(Wg, {})
		]
	});
}
//#endregion
//#region src/stories/pages/Legal/Legal.tsx
function o_({ section: e, index: r }) {
	let [i, a] = u(!1), o = `legal-section-${r}`;
	return /* @__PURE__ */ n("div", {
		className: `legal-accordion__item${i ? " legal-accordion__item--open" : ""}`,
		children: [/* @__PURE__ */ t(J, {
			level: 2,
			className: "legal-accordion__heading",
			children: /* @__PURE__ */ n("button", {
				className: "legal-accordion__header",
				onClick: () => a((e) => !e),
				"aria-expanded": i,
				"aria-controls": o,
				children: [
					/* @__PURE__ */ t("span", {
						className: "legal-accordion__counter",
						children: String(r + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ t("span", {
						className: "legal-accordion__title",
						children: e.title
					}),
					/* @__PURE__ */ t(Be, {
						className: "legal-accordion__chevron",
						size: "lg"
					})
				]
			})
		}), /* @__PURE__ */ t("div", {
			className: "legal-accordion__body",
			id: o,
			role: "region",
			children: /* @__PURE__ */ t("div", {
				className: "legal-accordion__body-inner",
				children: e.content
			})
		})]
	});
}
function s_({ title: e, sections: r, navItems: i = Zg, featuredLink: a = Qg }) {
	return /* @__PURE__ */ n("div", {
		className: "legal-page",
		children: [
			/* @__PURE__ */ t(Gg, {
				navItems: i,
				featuredLink: a,
				actions: /* @__PURE__ */ t(w, {
					href: "https://academy.studiolxd.com",
					variant: "primary",
					external: !0,
					children: "Entra a la academia"
				})
			}),
			/* @__PURE__ */ n("main", {
				id: "main-content",
				className: "legal-page__main",
				children: [/* @__PURE__ */ t("div", {
					className: "legal-page__header",
					children: /* @__PURE__ */ t(J, {
						level: 1,
						className: "legal-page__title",
						children: e
					})
				}), /* @__PURE__ */ t("div", {
					className: "legal-accordion",
					children: r.map((e, n) => /* @__PURE__ */ t(o_, {
						section: e,
						index: n
					}, e.title))
				})]
			}),
			/* @__PURE__ */ t(Wg, {})
		]
	});
}
//#endregion
//#region src/stories/pages/Project/Project.tsx
function c_({ category: e, tagVariant: r = "default", photo: i, photoAlt: a, title: o, description: s, sections: c, navItems: l = Zg, featuredLink: u = Qg }) {
	return /* @__PURE__ */ n("div", {
		className: "project-page",
		children: [
			/* @__PURE__ */ t(Gg, {
				navItems: l,
				featuredLink: u,
				actions: /* @__PURE__ */ t(w, {
					href: "https://academy.studiolxd.com",
					variant: "primary",
					external: !0,
					children: "Entra a la academia"
				})
			}),
			/* @__PURE__ */ t("main", {
				id: "main-content",
				className: "project-page__main",
				children: /* @__PURE__ */ t("div", {
					className: "project-page__body",
					children: /* @__PURE__ */ n("article", {
						className: "project-detail",
						children: [
							/* @__PURE__ */ t(Eg, {
								variant: r,
								children: e
							}),
							/* @__PURE__ */ t(J, {
								level: 1,
								className: "project-detail__title",
								children: o
							}),
							/* @__PURE__ */ t("p", {
								className: "project-detail__intro",
								children: s
							}),
							/* @__PURE__ */ t("img", {
								src: i,
								alt: a ?? o,
								className: "project-detail__photo",
								width: 1200,
								height: 800
							}),
							/* @__PURE__ */ t("div", {
								className: "project-detail__content",
								children: c.map((e) => /* @__PURE__ */ n("section", {
									className: "project-detail__section",
									children: [/* @__PURE__ */ t(J, {
										level: 2,
										className: "project-detail__section-title",
										children: e.title
									}), /* @__PURE__ */ t("p", {
										className: "project-detail__section-body",
										children: e.body
									})]
								}, e.title))
							})
						]
					})
				})
			}),
			/* @__PURE__ */ t(Wg, {})
		]
	});
}
//#endregion
export { S as Arrow, C as Avatar, w as Button, kg as Card, Ag as CardSplit, jg as CardSquare, Ve as Carousel, Dt as Checkbox, Mg as CheckboxField, Be as Chevron, Hg as ClientsSection, Lg as ContactForm, Ug as ContactSection, Wg as Footer, Ng as Form, Ot as Hamburger, Gg as Header, J as Heading, Kg as HighlightSection, a_ as Home, kt as Input, Pg as InputField, vg as InputPhone, Fg as InputPhoneField, bg as Label, s_ as Legal, xg as Link, Sg as List, Cg as Logo, qg as MethodologySection, Rg as NewsletterForm, wg as Paragraph, c_ as Project, Jg as ProjectsSection, Yg as ReviewsSection, Tg as Select, Xg as SolutionsSection, Eg as Tag, Dg as Textarea, Ig as TextareaField, Og as VisuallyHidden };
