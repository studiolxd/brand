import '../colorpicker.css';
import { n as e } from "./brandmessagescontext.js";
import { VisuallyHidden as t } from "../visually-hidden.js";
import { Button as n } from "../button.js";
import { Input as r } from "../input.js";
import { Popover as i } from "../popover.js";
import { t as a } from "./slider.js";
import { t as o } from "./css-properties.js";
import { ColorSwatch as s } from "../color-swatch.js";
import { cloneElement as c, forwardRef as l, useCallback as u, useId as d, useRef as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
import { useRender as g } from "@base-ui/react/use-render";
import { useDirection as _ } from "@base-ui/react/direction-provider";
//#region src/stories/messages/es/colorPicker.ts
var v = {
	trigger: "Elegir color",
	value: (e) => `Color actual: ${e}`,
	empty: "Sin color",
	dialog: "Selector de color",
	area: "Saturación y brillo",
	areaDescription: "deslizador bidimensional",
	areaValue: (e, t) => `Saturación ${e} %, brillo ${t} %`,
	hue: "Tono",
	alpha: "Opacidad",
	hex: "Hexadecimal",
	presets: "Colores predefinidos",
	clear: "Quitar color"
}, ee = 1, y = 10, b = (e) => Math.min(100, Math.max(0, e)), x = l(function({ hueColor: e, saturation: t, brightness: n, onChange: r, onCommit: i, label: a, roleDescription: s, valueText: c, disabled: l = !1 }, d) {
	let p = _() === "rtl", h = f(null), g = f(null), v = f({
		s: 0,
		v: 0
	}), x = o({
		"--color-picker-area-x": `${p ? 100 - t : t}%`,
		"--color-picker-area-y": `${100 - n}%`,
		"--color-picker-area-hue": e
	}), S = u((e) => {
		h.current = e, x(e);
	}, [x]), C = (e) => {
		let t = e.currentTarget.getBoundingClientRect(), n = t.width ? (e.clientX - t.left) / t.width : 0, r = t.height ? (e.clientY - t.top) / t.height : 0;
		return {
			s: b((p ? 1 - n : n) * 100),
			v: b((1 - r) * 100)
		};
	}, w = () => {
		((typeof d == "function" ? null : d?.current) ?? h.current?.querySelector("[role=\"slider\"]"))?.focus({ preventScroll: !0 });
	}, T = (e) => {
		if (l || e.button !== 0) return;
		e.preventDefault();
		try {
			e.currentTarget.setPointerCapture?.(e.pointerId);
		} catch {}
		g.current = e.pointerId, w();
		let t = C(e);
		v.current = t, r(t);
	}, E = (e) => {
		if (g.current !== e.pointerId) return;
		let t = C(e);
		v.current = t, r(t);
	}, D = (e) => {
		if (g.current === e.pointerId) {
			g.current = null;
			try {
				e.currentTarget.releasePointerCapture?.(e.pointerId);
			} catch {}
			i(v.current);
		}
	}, O = (e) => {
		if (l) return;
		let a = e.shiftKey ? y : ee, { s: o, v: s } = {
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
		ref: S,
		className: "color-picker__area",
		"data-direction": p ? "rtl" : "ltr",
		"data-disabled": l ? "" : void 0,
		onPointerDown: T,
		onPointerMove: E,
		onPointerUp: D,
		onPointerCancel: D,
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
			onKeyDown: O
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
function te() {
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
}, ne = l(function({ value: l, defaultValue: ee = null, onValueChange: y, onValueCommitted: b, alpha: S = !1, presets: C, clearable: w = !1, onClear: T, open: E, defaultOpen: D = !1, onOpenChange: ne, size: M = "md", disabled: N = !1, error: P = !1, locale: F = "es-ES", id: I, name: re, "aria-label": L, "aria-labelledby": R, "aria-describedby": ie, dialogLabel: ae, clearLabel: oe, trigger: z, anchor: se, className: ce }, le) {
	let B = e("colorPicker", v), V = _() === "rtl", [ue, H] = p(D), U = E ?? ue, W = l !== void 0, [de, fe] = p(ee), G = W ? l : de, K = G ? A(G, S) : null, [q, pe] = p(() => K && O(K) || j), [me, he] = p(K);
	K !== me && (he(K), K && k(q, S) !== K && pe(O(K) ?? j));
	let ge = k(q, S), _e = k({
		...q,
		a: 1
	}, !1), J = u((e, t) => {
		let n = S ? e : {
			...e,
			a: 1
		};
		pe(n);
		let r = k(n, S);
		W || fe(r), y?.(r), t && b?.(r);
	}, [
		S,
		W,
		y,
		b
	]), [Y, X] = p(null), [ve, ye] = p(U);
	U !== ve && (ye(U), U || X(null));
	let be = (e, t) => {
		let n = A(e, S), r = n ? O(n) : null;
		return r ? (J(r, t), !0) : !1;
	}, xe = (e) => {
		let t = e.target.value;
		X(t);
		let n = t.trim().replace(/^#/, "").length;
		(n === 6 || S && n === 8) && be(t, !0);
	}, Se = () => {
		Y !== null && be(Y, !0), X(null);
	}, Ce = () => {
		W || fe(null), T?.(), E === void 0 && H(!1);
	}, we = (e, t) => {
		e && N || (E === void 0 && H(e), ne?.(e, t));
	}, Te = f(null), Z = d(), Ee = o({
		"--color-picker-hue-gradient": `linear-gradient(to ${V ? "left" : "right"}, ${te().join(", ")})`,
		"--color-picker-alpha-gradient": `linear-gradient(to ${V ? "left" : "right"}, transparent, ${_e})`
	}), De = (e) => J({
		...q,
		s: e.s,
		v: e.v
	}, !1), Oe = (e) => J({
		...q,
		s: e.s,
		v: e.v
	}, !0), Q = (C ?? []).map((e) => ({
		...e,
		hex: A(e.color, S)
	})).filter((e) => e.hex !== null), ke = [
		"color-picker",
		M === "md" ? "" : `color-picker--${M}`,
		P ? "color-picker--error" : "",
		ce ?? ""
	].filter(Boolean).join(" "), Ae = [Z, ie].filter(Boolean).join(" "), je = /* @__PURE__ */ h("button", {
		ref: le,
		id: I,
		type: "button",
		className: "color-picker__trigger",
		disabled: N,
		"aria-label": L ?? (R ? void 0 : B("trigger")),
		"aria-labelledby": L ? void 0 : R,
		"aria-describedby": Ae,
		"aria-haspopup": "dialog",
		"aria-expanded": U,
		"aria-invalid": P || void 0,
		children: [/* @__PURE__ */ m(s, {
			color: G,
			className: "color-picker__swatch"
		}), /* @__PURE__ */ m(t, {
			id: Z,
			children: G ? B("value")(K ?? G) : B("empty")
		})]
	}), Me = z?.props ?? {}, Ne = g({
		render: z && c(z, {
			disabled: N || Me.disabled || void 0,
			"aria-describedby": [Ae, Me["aria-describedby"]].filter(Boolean).join(" ")
		}),
		ref: le,
		enabled: z !== void 0,
		props: {
			id: I,
			"aria-label": L,
			"aria-labelledby": L ? void 0 : R,
			"aria-haspopup": "dialog",
			"aria-expanded": U,
			"aria-invalid": P || void 0
		}
	}), $;
	return Ne ? $ = Ne : se === void 0 && ($ = je), /* @__PURE__ */ h("div", {
		className: ke,
		children: [
			re && /* @__PURE__ */ m("input", {
				type: "hidden",
				name: re,
				value: K ?? ""
			}),
			z && /* @__PURE__ */ m(t, {
				id: Z,
				children: G ? B("value")(K ?? G) : B("empty")
			}),
			/* @__PURE__ */ m(i, {
				trigger: $,
				anchor: se,
				label: B("dialog", ae),
				open: U,
				onOpenChange: we,
				side: "bottom",
				align: "start",
				initialFocus: Te,
				className: "color-picker__popover",
				children: /* @__PURE__ */ h("div", {
					ref: Ee,
					className: "color-picker__panel",
					children: [
						/* @__PURE__ */ m(x, {
							ref: Te,
							hueColor: k({
								h: q.h,
								s: 100,
								v: 100,
								a: 1
							}, !1),
							saturation: q.s,
							brightness: q.v,
							onChange: De,
							onCommit: Oe,
							label: B("area"),
							roleDescription: B("areaDescription"),
							valueText: B("areaValue")(Math.round(q.s), Math.round(q.v))
						}),
						/* @__PURE__ */ m(a, {
							className: "color-picker__channel color-picker__channel--hue",
							label: B("hue"),
							min: 0,
							max: 360,
							step: 1,
							value: Math.round(q.h),
							format: {
								style: "unit",
								unit: "degree"
							},
							locale: F,
							onValueChange: (e) => J({
								...q,
								h: e
							}, !1),
							onValueCommitted: (e) => J({
								...q,
								h: e
							}, !0)
						}),
						S && /* @__PURE__ */ m(a, {
							className: "color-picker__channel color-picker__channel--alpha",
							label: B("alpha"),
							min: 0,
							max: 100,
							step: 1,
							value: Math.round(q.a * 100),
							format: {
								style: "unit",
								unit: "percent"
							},
							locale: F,
							onValueChange: (e) => J({
								...q,
								a: e / 100
							}, !1),
							onValueCommitted: (e) => J({
								...q,
								a: e / 100
							}, !0)
						}),
						/* @__PURE__ */ m(r, {
							className: "color-picker__hex",
							type: "text",
							size: M,
							"aria-label": B("hex"),
							autoComplete: "off",
							spellCheck: !1,
							maxLength: S ? 9 : 7,
							value: Y ?? ge,
							onChange: xe,
							onBlur: Se,
							onKeyDown: (e) => {
								e.key === "Enter" && (e.preventDefault(), Se());
							}
						}),
						Q.length > 0 && /* @__PURE__ */ m("div", {
							className: "color-picker__presets",
							role: "group",
							"aria-label": B("presets"),
							children: Q.map((e) => /* @__PURE__ */ m("button", {
								type: "button",
								className: "color-picker__preset",
								title: e.title,
								"aria-label": e.title,
								"aria-pressed": e.hex === ge,
								onClick: () => J(O(e.hex) ?? j, !0),
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
							onClick: Ce,
							children: B("clear", oe)
						})
					]
				})
			})
		]
	});
});
//#endregion
export { ne as t };
