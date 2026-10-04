import '../colorpicker.css';
import { n as e } from "./brandmessagescontext.js";
import { VisuallyHidden as t } from "../visually-hidden.js";
import { Button as n } from "../button.js";
import { Input as r } from "../input.js";
import { Popover as i } from "../popover.js";
import { Slider as a } from "../slider.js";
import { t as o } from "./css-properties.js";
import { ColorSwatch as s } from "../color-swatch.js";
import { forwardRef as c, useCallback as l, useId as u, useRef as d, useState as f } from "react";
import { jsx as p, jsxs as m } from "react/jsx-runtime";
import { useDirection as h } from "@base-ui/react/direction-provider";
//#region src/stories/molecules/ColorPicker/ColorArea.tsx
var g = 1, _ = 10, v = (e) => Math.min(100, Math.max(0, e)), y = c(function({ hueColor: e, saturation: t, brightness: n, onChange: r, onCommit: i, label: a, roleDescription: s, valueText: c, disabled: u = !1 }, f) {
	let m = h() === "rtl", y = d(null), b = d(null), x = d({
		s: 0,
		v: 0
	}), S = o({
		"--color-picker-area-x": `${m ? 100 - t : t}%`,
		"--color-picker-area-y": `${100 - n}%`,
		"--color-picker-area-hue": e
	}), C = l((e) => {
		y.current = e, S(e);
	}, [S]), w = (e) => {
		let t = e.currentTarget.getBoundingClientRect(), n = t.width ? (e.clientX - t.left) / t.width : 0, r = t.height ? (e.clientY - t.top) / t.height : 0;
		return {
			s: v((m ? 1 - n : n) * 100),
			v: v((1 - r) * 100)
		};
	}, T = () => {
		((typeof f == "function" ? null : f?.current) ?? y.current?.querySelector("[role=\"slider\"]"))?.focus({ preventScroll: !0 });
	}, E = (e) => {
		if (u || e.button !== 0) return;
		e.preventDefault();
		try {
			e.currentTarget.setPointerCapture?.(e.pointerId);
		} catch {}
		b.current = e.pointerId, T();
		let t = w(e);
		x.current = t, r(t);
	}, D = (e) => {
		if (b.current !== e.pointerId) return;
		let t = w(e);
		x.current = t, r(t);
	}, O = (e) => {
		if (b.current === e.pointerId) {
			b.current = null;
			try {
				e.currentTarget.releasePointerCapture?.(e.pointerId);
			} catch {}
			i(x.current);
		}
	}, k = (e) => {
		if (u) return;
		let a = e.shiftKey ? _ : g, { s: o, v: s } = {
			s: t,
			v: n
		};
		switch (e.key) {
			case "ArrowRight":
				o += m ? -a : a;
				break;
			case "ArrowLeft":
				o += m ? a : -a;
				break;
			case "ArrowUp":
				s += a;
				break;
			case "ArrowDown":
				s -= a;
				break;
			case "PageUp":
				e.shiftKey ? o += _ : s += _;
				break;
			case "PageDown":
				e.shiftKey ? o -= _ : s -= _;
				break;
			case "Home":
				e.ctrlKey || e.metaKey ? s = 0 : o = 0;
				break;
			case "End":
				e.ctrlKey || e.metaKey ? s = 100 : o = 100;
				break;
			default: return;
		}
		e.preventDefault();
		let c = {
			s: v(o),
			v: v(s)
		};
		r(c), i(c);
	};
	return /* @__PURE__ */ p("div", {
		ref: C,
		className: "color-picker__area",
		"data-direction": m ? "rtl" : "ltr",
		"data-disabled": u ? "" : void 0,
		onPointerDown: E,
		onPointerMove: D,
		onPointerUp: O,
		onPointerCancel: O,
		children: /* @__PURE__ */ p("div", {
			ref: f,
			className: "color-picker__area-thumb",
			role: "slider",
			tabIndex: u ? -1 : 0,
			"aria-label": a,
			"aria-roledescription": s,
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-valuenow": Math.round(t),
			"aria-valuetext": c,
			"aria-disabled": u || void 0,
			onKeyDown: k
		})
	});
}), b = (e, t, n) => Math.min(n, Math.max(t, e));
function x(e) {
	let t = e.trim().replace(/^#/, "");
	if (!/^[0-9a-f]+$/i.test(t)) return null;
	let n;
	if (t.length === 3 || t.length === 4) n = t.split("").map((e) => e + e).join("");
	else if (t.length === 6 || t.length === 8) n = t;
	else return null;
	let r = (e) => parseInt(n.slice(e * 2, e * 2 + 2), 16);
	return {
		r: r(0),
		g: r(1),
		b: r(2),
		a: n.length === 8 ? r(3) / 255 : 1
	};
}
var S = (e) => b(Math.round(e), 0, 255).toString(16).padStart(2, "0");
function C({ r: e, g: t, b: n, a: r }, i) {
	let a = `#${S(e)}${S(t)}${S(n)}`;
	return i ? `${a}${S(b(r, 0, 1) * 255)}` : a;
}
function w({ r: e, g: t, b: n, a: r }) {
	let i = e / 255, a = t / 255, o = n / 255, s = Math.max(i, a, o), c = s - Math.min(i, a, o), l = 0;
	return c !== 0 && (l = s === i ? (a - o) / c % 6 : s === a ? (o - i) / c + 2 : (i - a) / c + 4, l *= 60, l < 0 && (l += 360)), {
		h: l,
		s: s === 0 ? 0 : c / s * 100,
		v: s * 100,
		a: r
	};
}
function T({ h: e, s: t, v: n, a: r }) {
	let i = (e % 360 + 360) % 360, a = b(t, 0, 100) / 100, o = b(n, 0, 100) / 100, s = o * a, c = s * (1 - Math.abs(i / 60 % 2 - 1)), l = o - s, u;
	return u = i < 60 ? [
		s,
		c,
		0
	] : i < 120 ? [
		c,
		s,
		0
	] : i < 180 ? [
		0,
		s,
		c
	] : i < 240 ? [
		0,
		c,
		s
	] : i < 300 ? [
		c,
		0,
		s
	] : [
		s,
		0,
		c
	], {
		r: (u[0] + l) * 255,
		g: (u[1] + l) * 255,
		b: (u[2] + l) * 255,
		a: b(r, 0, 1)
	};
}
function E(e) {
	let t = x(e);
	return t ? w(t) : null;
}
function D(e, t) {
	return C(T(e), t);
}
function O(e, t) {
	let n = x(e);
	return n ? C(n, t) : null;
}
function k() {
	return [
		0,
		60,
		120,
		180,
		240,
		300,
		360
	].map((e) => D({
		h: e,
		s: 100,
		v: 100,
		a: 1
	}, !1));
}
//#endregion
//#region src/stories/molecules/ColorPicker/ColorPicker.tsx
var A = {
	h: 0,
	s: 0,
	v: 0,
	a: 1
}, j = c(function({ value: c, defaultValue: g = null, onValueChange: _, onValueCommitted: v, alpha: b = !1, presets: x, clearable: S = !1, onClear: C, open: w, defaultOpen: T = !1, onOpenChange: j, size: M = "md", disabled: ee = !1, error: N = !1, locale: P = "es-ES", id: te, name: F, "aria-label": I, "aria-labelledby": L, "aria-describedby": ne, dialogLabel: re, clearLabel: ie, className: ae }, oe) {
	let R = e("colorPicker"), z = h() === "rtl", [se, B] = f(T), V = w ?? se, H = c !== void 0, [ce, U] = f(g), W = H ? c : ce, G = W ? O(W, b) : null, [K, q] = f(() => G && E(G) || A), [le, ue] = f(G);
	G !== le && (ue(G), G && D(K, b) !== G && q(E(G) ?? A));
	let J = D(K, b), de = D({
		...K,
		a: 1
	}, !1), Y = l((e, t) => {
		let n = b ? e : {
			...e,
			a: 1
		};
		q(n);
		let r = D(n, b);
		H || U(r), _?.(r), t && v?.(r);
	}, [
		b,
		H,
		_,
		v
	]), [X, Z] = f(null), [fe, pe] = f(V);
	V !== fe && (pe(V), V || Z(null));
	let Q = (e, t) => {
		let n = O(e, b), r = n ? E(n) : null;
		return r ? (Y(r, t), !0) : !1;
	}, me = (e) => {
		let t = e.target.value;
		Z(t);
		let n = t.trim().replace(/^#/, "").length;
		(n === 6 || b && n === 8) && Q(t, !0);
	}, $ = () => {
		X !== null && Q(X, !0), Z(null);
	}, he = () => {
		H || U(null), C?.(), w === void 0 && B(!1);
	}, ge = (e, t) => {
		e && ee || (w === void 0 && B(e), j?.(e, t));
	}, _e = d(null), ve = u(), ye = o({
		"--color-picker-hue-gradient": `linear-gradient(to ${z ? "left" : "right"}, ${k().join(", ")})`,
		"--color-picker-alpha-gradient": `linear-gradient(to ${z ? "left" : "right"}, transparent, ${de})`
	}), be = (e) => Y({
		...K,
		s: e.s,
		v: e.v
	}, !1), xe = (e) => Y({
		...K,
		s: e.s,
		v: e.v
	}, !0), Se = (x ?? []).map((e) => ({
		...e,
		hex: O(e.color, b)
	})).filter((e) => e.hex !== null), Ce = [
		"color-picker",
		M === "md" ? "" : `color-picker--${M}`,
		N ? "color-picker--error" : "",
		ae ?? ""
	].filter(Boolean).join(" "), we = [ve, ne].filter(Boolean).join(" "), Te = /* @__PURE__ */ m("button", {
		ref: oe,
		id: te,
		type: "button",
		className: "color-picker__trigger",
		disabled: ee,
		"aria-label": I ?? (L ? void 0 : R("trigger")),
		"aria-labelledby": I ? void 0 : L,
		"aria-describedby": we,
		"aria-haspopup": "dialog",
		"aria-expanded": V,
		"aria-invalid": N || void 0,
		children: [/* @__PURE__ */ p(s, {
			color: W,
			className: "color-picker__swatch"
		}), /* @__PURE__ */ p(t, {
			id: ve,
			children: W ? R("value")(G ?? W) : R("empty")
		})]
	});
	return /* @__PURE__ */ m("div", {
		className: Ce,
		children: [F && /* @__PURE__ */ p("input", {
			type: "hidden",
			name: F,
			value: G ?? ""
		}), /* @__PURE__ */ p(i, {
			trigger: Te,
			label: R("dialog", re),
			open: V,
			onOpenChange: ge,
			side: "bottom",
			align: "start",
			initialFocus: _e,
			className: "color-picker__popover",
			children: /* @__PURE__ */ m("div", {
				ref: ye,
				className: "color-picker__panel",
				children: [
					/* @__PURE__ */ p(y, {
						ref: _e,
						hueColor: D({
							h: K.h,
							s: 100,
							v: 100,
							a: 1
						}, !1),
						saturation: K.s,
						brightness: K.v,
						onChange: be,
						onCommit: xe,
						label: R("area"),
						roleDescription: R("areaDescription"),
						valueText: R("areaValue")(Math.round(K.s), Math.round(K.v))
					}),
					/* @__PURE__ */ p(a, {
						className: "color-picker__channel color-picker__channel--hue",
						label: R("hue"),
						min: 0,
						max: 360,
						step: 1,
						value: Math.round(K.h),
						format: {
							style: "unit",
							unit: "degree"
						},
						locale: P,
						onValueChange: (e) => Y({
							...K,
							h: e
						}, !1),
						onValueCommitted: (e) => Y({
							...K,
							h: e
						}, !0)
					}),
					b && /* @__PURE__ */ p(a, {
						className: "color-picker__channel color-picker__channel--alpha",
						label: R("alpha"),
						min: 0,
						max: 100,
						step: 1,
						value: Math.round(K.a * 100),
						format: {
							style: "unit",
							unit: "percent"
						},
						locale: P,
						onValueChange: (e) => Y({
							...K,
							a: e / 100
						}, !1),
						onValueCommitted: (e) => Y({
							...K,
							a: e / 100
						}, !0)
					}),
					/* @__PURE__ */ p(r, {
						className: "color-picker__hex",
						type: "text",
						size: M,
						"aria-label": R("hex"),
						autoComplete: "off",
						spellCheck: !1,
						maxLength: b ? 9 : 7,
						value: X ?? J,
						onChange: me,
						onBlur: $,
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), $());
						}
					}),
					Se.length > 0 && /* @__PURE__ */ p("div", {
						className: "color-picker__presets",
						role: "group",
						"aria-label": R("presets"),
						children: Se.map((e) => /* @__PURE__ */ p("button", {
							type: "button",
							className: "color-picker__preset",
							title: e.title,
							"aria-label": e.title,
							"aria-pressed": e.hex === J,
							onClick: () => Y(E(e.hex) ?? A, !0),
							children: /* @__PURE__ */ p(s, {
								color: e.hex,
								className: "color-picker__preset-swatch"
							})
						}, `${e.hex}-${e.title}`))
					}),
					S && /* @__PURE__ */ p(n, {
						variant: "ghost",
						size: "sm",
						className: "color-picker__clear",
						onClick: he,
						children: R("clear", ie)
					})
				]
			})
		})]
	});
});
//#endregion
export { j as t };
