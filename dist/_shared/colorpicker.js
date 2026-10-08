import '../colorpicker.css';
import { r as e } from "./brandmessagescontext.js";
import { VisuallyHidden as t } from "../visually-hidden.js";
import { Button as n } from "../button.js";
import { Input as r } from "../input.js";
import { Popover as i } from "../popover.js";
import { Slider as a } from "../slider.js";
import { t as o } from "./css-properties.js";
import { ColorSwatch as s } from "../color-swatch.js";
import { t as c } from "./requiredinput.js";
import { cloneElement as l, forwardRef as u, useCallback as d, useId as f, useRef as p, useState as m } from "react";
import { jsx as h, jsxs as g } from "react/jsx-runtime";
import { useRender as _ } from "@base-ui/react/use-render";
import { useDirection as ee } from "@base-ui/react/direction-provider";
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
}, te = 1, y = 10, b = (e) => Math.min(100, Math.max(0, e)), x = u(function({ hueColor: e, saturation: t, brightness: n, onChange: r, onCommit: i, label: a, roleDescription: s, valueText: c, disabled: l = !1 }, u) {
	let f = ee() === "rtl", m = p(null), g = p(null), _ = p({
		s: 0,
		v: 0
	}), v = o({
		"--color-picker-area-x": `${f ? 100 - t : t}%`,
		"--color-picker-area-y": `${100 - n}%`,
		"--color-picker-area-hue": e
	}), x = d((e) => {
		m.current = e, v(e);
	}, [v]), S = (e) => {
		let t = e.currentTarget.getBoundingClientRect(), n = t.width ? (e.clientX - t.left) / t.width : 0, r = t.height ? (e.clientY - t.top) / t.height : 0;
		return {
			s: b((f ? 1 - n : n) * 100),
			v: b((1 - r) * 100)
		};
	}, C = () => {
		((typeof u == "function" ? null : u?.current) ?? m.current?.querySelector("[role=\"slider\"]"))?.focus({ preventScroll: !0 });
	}, w = (e) => {
		if (l || e.button !== 0) return;
		e.preventDefault();
		try {
			e.currentTarget.setPointerCapture?.(e.pointerId);
		} catch {}
		g.current = e.pointerId, C();
		let t = S(e);
		_.current = t, r(t);
	}, T = (e) => {
		if (g.current !== e.pointerId) return;
		let t = S(e);
		_.current = t, r(t);
	}, E = (e) => {
		if (g.current === e.pointerId) {
			g.current = null;
			try {
				e.currentTarget.releasePointerCapture?.(e.pointerId);
			} catch {}
			i(_.current);
		}
	}, D = (e) => {
		if (l) return;
		let a = e.shiftKey ? y : te, { s: o, v: s } = {
			s: t,
			v: n
		};
		switch (e.key) {
			case "ArrowRight":
				o += f ? -a : a;
				break;
			case "ArrowLeft":
				o += f ? a : -a;
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
	return /* @__PURE__ */ h("div", {
		ref: x,
		className: "color-picker__area",
		"data-direction": f ? "rtl" : "ltr",
		"data-disabled": l ? "" : void 0,
		onPointerDown: w,
		onPointerMove: T,
		onPointerUp: E,
		onPointerCancel: E,
		children: /* @__PURE__ */ h("div", {
			ref: u,
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
			onKeyDown: D
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
function ne() {
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
function re(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var j = {
	h: 0,
	s: 0,
	v: 0,
	a: 1
}, ie = u(function({ value: u, defaultValue: te = null, onValueChange: y, onValueCommitted: b, alpha: S = !1, presets: C, clearable: w = !1, onClear: T, open: E, defaultOpen: D = !1, onOpenChange: ie, size: M = "md", disabled: N = !1, error: P = !1, locale: ae = "es-ES", id: oe, name: se, required: ce = !1, "aria-label": F, "aria-labelledby": I, "aria-describedby": le, dialogLabel: ue, clearLabel: de, trigger: L, anchor: R, className: z }, B) {
	let V = e("colorPicker", v), H = ee() === "rtl", [fe, U] = m(D), W = E ?? fe, G = u !== void 0, [pe, me] = m(te), K = G ? u : pe, q = K ? A(K, S) : null, [J, he] = m(() => q && O(q) || j), [ge, _e] = m(q);
	q !== ge && (_e(q), q && k(J, S) !== q && he(O(q) ?? j));
	let ve = k(J, S), ye = k({
		...J,
		a: 1
	}, !1), Y = d((e, t) => {
		let n = S ? e : {
			...e,
			a: 1
		};
		he(n);
		let r = k(n, S);
		G || me(r), y?.(r), t && b?.(r);
	}, [
		S,
		G,
		y,
		b
	]), [X, Z] = m(null), [be, xe] = m(W);
	W !== be && (xe(W), W || Z(null));
	let Se = (e, t) => {
		let n = A(e, S), r = n ? O(n) : null;
		return r ? (Y(r, t), !0) : !1;
	}, Ce = (e) => {
		let t = e.target.value;
		Z(t);
		let n = t.trim().replace(/^#/, "").length;
		(n === 6 || S && n === 8) && Se(t, !0);
	}, we = () => {
		X !== null && Se(X, !0), Z(null);
	}, Te = () => {
		G || me(null), T?.(), E === void 0 && U(!1);
	}, Ee = (e, t) => {
		e && N || (E === void 0 && U(e), ie?.(e, t));
	}, De = p(null), Q = f(), Oe = o({
		"--color-picker-hue-gradient": `linear-gradient(to ${H ? "left" : "right"}, ${ne().join(", ")})`,
		"--color-picker-alpha-gradient": `linear-gradient(to ${H ? "left" : "right"}, transparent, ${ye})`
	}), ke = (e) => Y({
		...J,
		s: e.s,
		v: e.v
	}, !1), Ae = (e) => Y({
		...J,
		s: e.s,
		v: e.v
	}, !0), je = (C ?? []).map((e) => ({
		...e,
		hex: A(e.color, S)
	})).filter((e) => e.hex !== null), Me = [
		"color-picker",
		M === "md" ? "" : `color-picker--${M}`,
		P ? "color-picker--error" : ""
	].filter(Boolean).join(" "), Ne = L === void 0 && R === void 0, Pe = [Q, le].filter(Boolean).join(" "), Fe = p(null), Ie = d((e) => {
		Fe.current = e, re(B, e);
	}, [B]), Le = /* @__PURE__ */ g("button", {
		ref: Ie,
		id: oe,
		type: "button",
		className: ["color-picker__trigger", Ne ? z : void 0].filter(Boolean).join(" "),
		disabled: N,
		"aria-label": F ?? (I ? void 0 : V("trigger")),
		"aria-labelledby": F ? void 0 : I,
		"aria-describedby": Pe,
		"aria-haspopup": "dialog",
		"aria-expanded": W,
		"aria-invalid": P || void 0,
		children: [/* @__PURE__ */ h(s, {
			color: K,
			className: "color-picker__swatch"
		}), /* @__PURE__ */ h(t, {
			id: Q,
			children: K ? V("value")(q ?? K) : V("empty")
		})]
	}), Re = L?.props ?? {}, ze = _({
		render: L && l(L, {
			disabled: N || Re.disabled || void 0,
			"aria-describedby": [Pe, Re["aria-describedby"]].filter(Boolean).join(" ")
		}),
		ref: Ie,
		enabled: L !== void 0,
		props: {
			id: oe,
			"aria-label": F,
			"aria-labelledby": F ? void 0 : I,
			"aria-haspopup": "dialog",
			"aria-expanded": W,
			"aria-invalid": P || void 0
		}
	}), $;
	return ze ? $ = ze : R === void 0 && ($ = Le), /* @__PURE__ */ g("div", {
		className: Me,
		children: [
			/* @__PURE__ */ h(c, {
				name: se,
				value: q ?? "",
				required: ce,
				focusTarget: () => Fe.current
			}),
			L && /* @__PURE__ */ h(t, {
				id: Q,
				children: K ? V("value")(q ?? K) : V("empty")
			}),
			/* @__PURE__ */ h(i, {
				trigger: $,
				anchor: R,
				label: V("dialog", ue),
				open: W,
				onOpenChange: Ee,
				side: "bottom",
				align: "start",
				initialFocus: De,
				className: ["color-picker__popover", Ne ? void 0 : z].filter(Boolean).join(" "),
				children: /* @__PURE__ */ g("div", {
					ref: Oe,
					className: "color-picker__panel",
					children: [
						/* @__PURE__ */ h(x, {
							ref: De,
							hueColor: k({
								h: J.h,
								s: 100,
								v: 100,
								a: 1
							}, !1),
							saturation: J.s,
							brightness: J.v,
							onChange: ke,
							onCommit: Ae,
							label: V("area"),
							roleDescription: V("areaDescription"),
							valueText: V("areaValue")(Math.round(J.s), Math.round(J.v))
						}),
						/* @__PURE__ */ h(a, {
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
							locale: ae,
							onValueChange: (e) => Y({
								...J,
								h: e
							}, !1),
							onValueCommitted: (e) => Y({
								...J,
								h: e
							}, !0)
						}),
						S && /* @__PURE__ */ h(a, {
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
							locale: ae,
							onValueChange: (e) => Y({
								...J,
								a: e / 100
							}, !1),
							onValueCommitted: (e) => Y({
								...J,
								a: e / 100
							}, !0)
						}),
						/* @__PURE__ */ h(r, {
							className: "color-picker__hex",
							type: "text",
							size: M,
							"aria-label": V("hex"),
							autoComplete: "off",
							spellCheck: !1,
							maxLength: S ? 9 : 7,
							value: X ?? ve,
							onChange: Ce,
							onBlur: we,
							onKeyDown: (e) => {
								e.key === "Enter" && (e.preventDefault(), we());
							}
						}),
						je.length > 0 && /* @__PURE__ */ h("div", {
							className: "color-picker__presets",
							role: "group",
							"aria-label": V("presets"),
							children: je.map((e) => /* @__PURE__ */ h("button", {
								type: "button",
								className: "color-picker__preset",
								title: e.title,
								"aria-label": e.title,
								"aria-pressed": e.hex === ve,
								onClick: () => Y(O(e.hex) ?? j, !0),
								children: /* @__PURE__ */ h(s, {
									color: e.hex,
									className: "color-picker__preset-swatch"
								})
							}, `${e.hex}-${e.title}`))
						}),
						w && /* @__PURE__ */ h(n, {
							variant: "ghost",
							size: "sm",
							className: "color-picker__clear",
							onClick: Te,
							children: V("clear", de)
						})
					]
				})
			})
		]
	});
});
//#endregion
export { ie as t };
