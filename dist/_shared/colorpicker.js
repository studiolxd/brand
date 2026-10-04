import '../colorpicker.css';
import { n as e } from "./brandmessagescontext.js";
import { VisuallyHidden as t } from "../visually-hidden.js";
import { Button as n } from "../button.js";
import { Input as r } from "../input.js";
import { Popover as i } from "../popover.js";
import { Slider as a } from "../slider.js";
import { t as o } from "./css-properties.js";
import { ColorSwatch as s } from "../color-swatch.js";
import { cloneElement as c, forwardRef as l, useCallback as u, useId as d, useRef as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
import { useRender as g } from "@base-ui/react/use-render";
import { useDirection as _ } from "@base-ui/react/direction-provider";
//#region src/stories/molecules/ColorPicker/ColorArea.tsx
var v = 1, y = 10, b = (e) => Math.min(100, Math.max(0, e)), x = l(function({ hueColor: e, saturation: t, brightness: n, onChange: r, onCommit: i, label: a, roleDescription: s, valueText: c, disabled: l = !1 }, d) {
	let p = _() === "rtl", h = f(null), g = f(null), x = f({
		s: 0,
		v: 0
	}), S = o({
		"--color-picker-area-x": `${p ? 100 - t : t}%`,
		"--color-picker-area-y": `${100 - n}%`,
		"--color-picker-area-hue": e
	}), C = u((e) => {
		h.current = e, S(e);
	}, [S]), w = (e) => {
		let t = e.currentTarget.getBoundingClientRect(), n = t.width ? (e.clientX - t.left) / t.width : 0, r = t.height ? (e.clientY - t.top) / t.height : 0;
		return {
			s: b((p ? 1 - n : n) * 100),
			v: b((1 - r) * 100)
		};
	}, T = () => {
		((typeof d == "function" ? null : d?.current) ?? h.current?.querySelector("[role=\"slider\"]"))?.focus({ preventScroll: !0 });
	}, E = (e) => {
		if (l || e.button !== 0) return;
		e.preventDefault();
		try {
			e.currentTarget.setPointerCapture?.(e.pointerId);
		} catch {}
		g.current = e.pointerId, T();
		let t = w(e);
		x.current = t, r(t);
	}, D = (e) => {
		if (g.current !== e.pointerId) return;
		let t = w(e);
		x.current = t, r(t);
	}, O = (e) => {
		if (g.current === e.pointerId) {
			g.current = null;
			try {
				e.currentTarget.releasePointerCapture?.(e.pointerId);
			} catch {}
			i(x.current);
		}
	}, k = (e) => {
		if (l) return;
		let a = e.shiftKey ? y : v, { s: o, v: s } = {
			s: t,
			v: n
		};
		switch (e.key) {
			case "ArrowRight":
				o += p ? -a : a;
				break;
			case "ArrowLeft":
				o += p ? a : -a;
				break;
			case "ArrowUp":
				s += a;
				break;
			case "ArrowDown":
				s -= a;
				break;
			case "PageUp":
				e.shiftKey ? o += y : s += y;
				break;
			case "PageDown":
				e.shiftKey ? o -= y : s -= y;
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
			s: b(o),
			v: b(s)
		};
		r(c), i(c);
	};
	return /* @__PURE__ */ m("div", {
		ref: C,
		className: "color-picker__area",
		"data-direction": p ? "rtl" : "ltr",
		"data-disabled": l ? "" : void 0,
		onPointerDown: E,
		onPointerMove: D,
		onPointerUp: O,
		onPointerCancel: O,
		children: /* @__PURE__ */ m("div", {
			ref: d,
			className: "color-picker__area-thumb",
			role: "slider",
			tabIndex: l ? -1 : 0,
			"aria-label": a,
			"aria-roledescription": s,
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-valuenow": Math.round(t),
			"aria-valuetext": c,
			"aria-disabled": l || void 0,
			onKeyDown: k
		})
	});
}), S = (e, t, n) => Math.min(n, Math.max(t, e));
function C(e) {
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
var w = (e) => S(Math.round(e), 0, 255).toString(16).padStart(2, "0");
function T({ r: e, g: t, b: n, a: r }, i) {
	let a = `#${w(e)}${w(t)}${w(n)}`;
	return i ? `${a}${w(S(r, 0, 1) * 255)}` : a;
}
function E({ r: e, g: t, b: n, a: r }) {
	let i = e / 255, a = t / 255, o = n / 255, s = Math.max(i, a, o), c = s - Math.min(i, a, o), l = 0;
	return c !== 0 && (l = s === i ? (a - o) / c % 6 : s === a ? (o - i) / c + 2 : (i - a) / c + 4, l *= 60, l < 0 && (l += 360)), {
		h: l,
		s: s === 0 ? 0 : c / s * 100,
		v: s * 100,
		a: r
	};
}
function D({ h: e, s: t, v: n, a: r }) {
	let i = (e % 360 + 360) % 360, a = S(t, 0, 100) / 100, o = S(n, 0, 100) / 100, s = o * a, c = s * (1 - Math.abs(i / 60 % 2 - 1)), l = o - s, u;
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
		a: S(r, 0, 1)
	};
}
function O(e) {
	let t = C(e);
	return t ? E(t) : null;
}
function k(e, t) {
	return T(D(e), t);
}
function A(e, t) {
	let n = C(e);
	return n ? T(n, t) : null;
}
function ee() {
	return [
		0,
		60,
		120,
		180,
		240,
		300,
		360
	].map((e) => k({
		h: e,
		s: 100,
		v: 100,
		a: 1
	}, !1));
}
//#endregion
//#region src/stories/molecules/ColorPicker/ColorPicker.tsx
var j = {
	h: 0,
	s: 0,
	v: 0,
	a: 1
}, te = l(function({ value: l, defaultValue: v = null, onValueChange: y, onValueCommitted: b, alpha: S = !1, presets: C, clearable: w = !1, onClear: T, open: E, defaultOpen: D = !1, onOpenChange: te, size: M = "md", disabled: N = !1, error: P = !1, locale: ne = "es-ES", id: re, name: F, "aria-label": I, "aria-labelledby": L, "aria-describedby": ie, dialogLabel: ae, clearLabel: oe, trigger: R, anchor: z, className: se }, B) {
	let V = e("colorPicker"), H = _() === "rtl", [ce, U] = p(D), W = E ?? ce, G = l !== void 0, [le, ue] = p(v), K = G ? l : le, q = K ? A(K, S) : null, [J, de] = p(() => q && O(q) || j), [fe, pe] = p(q);
	q !== fe && (pe(q), q && k(J, S) !== q && de(O(q) ?? j));
	let me = k(J, S), he = k({
		...J,
		a: 1
	}, !1), Y = u((e, t) => {
		let n = S ? e : {
			...e,
			a: 1
		};
		de(n);
		let r = k(n, S);
		G || ue(r), y?.(r), t && b?.(r);
	}, [
		S,
		G,
		y,
		b
	]), [X, Z] = p(null), [ge, _e] = p(W);
	W !== ge && (_e(W), W || Z(null));
	let ve = (e, t) => {
		let n = A(e, S), r = n ? O(n) : null;
		return r ? (Y(r, t), !0) : !1;
	}, ye = (e) => {
		let t = e.target.value;
		Z(t);
		let n = t.trim().replace(/^#/, "").length;
		(n === 6 || S && n === 8) && ve(t, !0);
	}, be = () => {
		X !== null && ve(X, !0), Z(null);
	}, xe = () => {
		G || ue(null), T?.(), E === void 0 && U(!1);
	}, Se = (e, t) => {
		e && N || (E === void 0 && U(e), te?.(e, t));
	}, Ce = f(null), Q = d(), we = o({
		"--color-picker-hue-gradient": `linear-gradient(to ${H ? "left" : "right"}, ${ee().join(", ")})`,
		"--color-picker-alpha-gradient": `linear-gradient(to ${H ? "left" : "right"}, transparent, ${he})`
	}), Te = (e) => Y({
		...J,
		s: e.s,
		v: e.v
	}, !1), Ee = (e) => Y({
		...J,
		s: e.s,
		v: e.v
	}, !0), De = (C ?? []).map((e) => ({
		...e,
		hex: A(e.color, S)
	})).filter((e) => e.hex !== null), Oe = [
		"color-picker",
		M === "md" ? "" : `color-picker--${M}`,
		P ? "color-picker--error" : "",
		se ?? ""
	].filter(Boolean).join(" "), ke = [Q, ie].filter(Boolean).join(" "), Ae = /* @__PURE__ */ h("button", {
		ref: B,
		id: re,
		type: "button",
		className: "color-picker__trigger",
		disabled: N,
		"aria-label": I ?? (L ? void 0 : V("trigger")),
		"aria-labelledby": I ? void 0 : L,
		"aria-describedby": ke,
		"aria-haspopup": "dialog",
		"aria-expanded": W,
		"aria-invalid": P || void 0,
		children: [/* @__PURE__ */ m(s, {
			color: K,
			className: "color-picker__swatch"
		}), /* @__PURE__ */ m(t, {
			id: Q,
			children: K ? V("value")(q ?? K) : V("empty")
		})]
	}), je = R?.props ?? {}, Me = g({
		render: R && c(R, {
			disabled: N || je.disabled || void 0,
			"aria-describedby": [ke, je["aria-describedby"]].filter(Boolean).join(" ")
		}),
		ref: B,
		enabled: R !== void 0,
		props: {
			id: re,
			"aria-label": I,
			"aria-labelledby": I ? void 0 : L,
			"aria-haspopup": "dialog",
			"aria-expanded": W,
			"aria-invalid": P || void 0
		}
	}), $;
	return Me ? $ = Me : z === void 0 && ($ = Ae), /* @__PURE__ */ h("div", {
		className: Oe,
		children: [
			F && /* @__PURE__ */ m("input", {
				type: "hidden",
				name: F,
				value: q ?? ""
			}),
			R && /* @__PURE__ */ m(t, {
				id: Q,
				children: K ? V("value")(q ?? K) : V("empty")
			}),
			/* @__PURE__ */ m(i, {
				trigger: $,
				anchor: z,
				label: V("dialog", ae),
				open: W,
				onOpenChange: Se,
				side: "bottom",
				align: "start",
				initialFocus: Ce,
				className: "color-picker__popover",
				children: /* @__PURE__ */ h("div", {
					ref: we,
					className: "color-picker__panel",
					children: [
						/* @__PURE__ */ m(x, {
							ref: Ce,
							hueColor: k({
								h: J.h,
								s: 100,
								v: 100,
								a: 1
							}, !1),
							saturation: J.s,
							brightness: J.v,
							onChange: Te,
							onCommit: Ee,
							label: V("area"),
							roleDescription: V("areaDescription"),
							valueText: V("areaValue")(Math.round(J.s), Math.round(J.v))
						}),
						/* @__PURE__ */ m(a, {
							className: "color-picker__channel color-picker__channel--hue",
							label: V("hue"),
							min: 0,
							max: 360,
							step: 1,
							value: Math.round(J.h),
							format: {
								style: "unit",
								unit: "degree"
							},
							locale: ne,
							onValueChange: (e) => Y({
								...J,
								h: e
							}, !1),
							onValueCommitted: (e) => Y({
								...J,
								h: e
							}, !0)
						}),
						S && /* @__PURE__ */ m(a, {
							className: "color-picker__channel color-picker__channel--alpha",
							label: V("alpha"),
							min: 0,
							max: 100,
							step: 1,
							value: Math.round(J.a * 100),
							format: {
								style: "unit",
								unit: "percent"
							},
							locale: ne,
							onValueChange: (e) => Y({
								...J,
								a: e / 100
							}, !1),
							onValueCommitted: (e) => Y({
								...J,
								a: e / 100
							}, !0)
						}),
						/* @__PURE__ */ m(r, {
							className: "color-picker__hex",
							type: "text",
							size: M,
							"aria-label": V("hex"),
							autoComplete: "off",
							spellCheck: !1,
							maxLength: S ? 9 : 7,
							value: X ?? me,
							onChange: ye,
							onBlur: be,
							onKeyDown: (e) => {
								e.key === "Enter" && (e.preventDefault(), be());
							}
						}),
						De.length > 0 && /* @__PURE__ */ m("div", {
							className: "color-picker__presets",
							role: "group",
							"aria-label": V("presets"),
							children: De.map((e) => /* @__PURE__ */ m("button", {
								type: "button",
								className: "color-picker__preset",
								title: e.title,
								"aria-label": e.title,
								"aria-pressed": e.hex === me,
								onClick: () => Y(O(e.hex) ?? j, !0),
								children: /* @__PURE__ */ m(s, {
									color: e.hex,
									className: "color-picker__preset-swatch"
								})
							}, `${e.hex}-${e.title}`))
						}),
						w && /* @__PURE__ */ m(n, {
							variant: "ghost",
							size: "sm",
							className: "color-picker__clear",
							onClick: xe,
							children: V("clear", oe)
						})
					]
				})
			})
		]
	});
});
//#endregion
export { te as t };
