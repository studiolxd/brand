import '../colorpicker.css';
import { n as e } from "./brandmessagescontext.js";
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
//#region src/stories/molecules/ColorPicker/ColorArea.tsx
var te = 1, v = 10, y = (e) => Math.min(100, Math.max(0, e)), b = u(function({ hueColor: e, saturation: t, brightness: n, onChange: r, onCommit: i, label: a, roleDescription: s, valueText: c, disabled: l = !1 }, u) {
	let f = ee() === "rtl", m = p(null), g = p(null), _ = p({
		s: 0,
		v: 0
	}), b = o({
		"--color-picker-area-x": `${f ? 100 - t : t}%`,
		"--color-picker-area-y": `${100 - n}%`,
		"--color-picker-area-hue": e
	}), x = d((e) => {
		m.current = e, b(e);
	}, [b]), S = (e) => {
		let t = e.currentTarget.getBoundingClientRect(), n = t.width ? (e.clientX - t.left) / t.width : 0, r = t.height ? (e.clientY - t.top) / t.height : 0;
		return {
			s: y((f ? 1 - n : n) * 100),
			v: y((1 - r) * 100)
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
		let a = e.shiftKey ? v : te, { s: o, v: s } = {
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
				e.shiftKey ? o += v : s += v;
				break;
			case "PageDown":
				e.shiftKey ? o -= v : s -= v;
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
			s: y(o),
			v: y(s)
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
}), x = (e, t, n) => Math.min(n, Math.max(t, e));
function S(e) {
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
var C = (e) => x(Math.round(e), 0, 255).toString(16).padStart(2, "0");
function w({ r: e, g: t, b: n, a: r }, i) {
	let a = `#${C(e)}${C(t)}${C(n)}`;
	return i ? `${a}${C(x(r, 0, 1) * 255)}` : a;
}
function T({ r: e, g: t, b: n, a: r }) {
	let i = e / 255, a = t / 255, o = n / 255, s = Math.max(i, a, o), c = s - Math.min(i, a, o), l = 0;
	return c !== 0 && (l = s === i ? (a - o) / c % 6 : s === a ? (o - i) / c + 2 : (i - a) / c + 4, l *= 60, l < 0 && (l += 360)), {
		h: l,
		s: s === 0 ? 0 : c / s * 100,
		v: s * 100,
		a: r
	};
}
function E({ h: e, s: t, v: n, a: r }) {
	let i = (e % 360 + 360) % 360, a = x(t, 0, 100) / 100, o = x(n, 0, 100) / 100, s = o * a, c = s * (1 - Math.abs(i / 60 % 2 - 1)), l = o - s, u;
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
		a: x(r, 0, 1)
	};
}
function D(e) {
	let t = S(e);
	return t ? T(t) : null;
}
function O(e, t) {
	return w(E(e), t);
}
function k(e, t) {
	let n = S(e);
	return n ? w(n, t) : null;
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
	].map((e) => O({
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
var A = {
	h: 0,
	s: 0,
	v: 0,
	a: 1
}, ie = u(function({ value: u, defaultValue: te = null, onValueChange: v, onValueCommitted: y, alpha: x = !1, presets: S, clearable: C = !1, onClear: w, open: T, defaultOpen: E = !1, onOpenChange: ie, size: j = "md", disabled: M = !1, error: N = !1, locale: ae = "es-ES", id: oe, name: se, required: ce = !1, "aria-label": P, "aria-labelledby": F, "aria-describedby": le, dialogLabel: ue, clearLabel: de, trigger: I, anchor: L, className: fe }, R) {
	let z = e("colorPicker"), B = ee() === "rtl", [pe, V] = m(E), H = T ?? pe, U = u !== void 0, [me, W] = m(te), G = U ? u : me, K = G ? k(G, x) : null, [q, he] = m(() => K && D(K) || A), [ge, _e] = m(K);
	K !== ge && (_e(K), K && O(q, x) !== K && he(D(K) ?? A));
	let ve = O(q, x), ye = O({
		...q,
		a: 1
	}, !1), J = d((e, t) => {
		let n = x ? e : {
			...e,
			a: 1
		};
		he(n);
		let r = O(n, x);
		U || W(r), v?.(r), t && y?.(r);
	}, [
		x,
		U,
		v,
		y
	]), [Y, X] = m(null), [be, xe] = m(H);
	H !== be && (xe(H), H || X(null));
	let Se = (e, t) => {
		let n = k(e, x), r = n ? D(n) : null;
		return r ? (J(r, t), !0) : !1;
	}, Ce = (e) => {
		let t = e.target.value;
		X(t);
		let n = t.trim().replace(/^#/, "").length;
		(n === 6 || x && n === 8) && Se(t, !0);
	}, we = () => {
		Y !== null && Se(Y, !0), X(null);
	}, Te = () => {
		U || W(null), w?.(), T === void 0 && V(!1);
	}, Ee = (e, t) => {
		e && M || (T === void 0 && V(e), ie?.(e, t));
	}, De = p(null), Z = f(), Oe = o({
		"--color-picker-hue-gradient": `linear-gradient(to ${B ? "left" : "right"}, ${ne().join(", ")})`,
		"--color-picker-alpha-gradient": `linear-gradient(to ${B ? "left" : "right"}, transparent, ${ye})`
	}), ke = (e) => J({
		...q,
		s: e.s,
		v: e.v
	}, !1), Ae = (e) => J({
		...q,
		s: e.s,
		v: e.v
	}, !0), je = (S ?? []).map((e) => ({
		...e,
		hex: k(e.color, x)
	})).filter((e) => e.hex !== null), Me = [
		"color-picker",
		j === "md" ? "" : `color-picker--${j}`,
		N ? "color-picker--error" : ""
	].filter(Boolean).join(" "), Ne = I === void 0 && L === void 0, Q = [Z, le].filter(Boolean).join(" "), Pe = p(null), Fe = d((e) => {
		Pe.current = e, re(R, e);
	}, [R]), Ie = /* @__PURE__ */ g("button", {
		ref: Fe,
		id: oe,
		type: "button",
		className: ["color-picker__trigger", Ne ? fe : void 0].filter(Boolean).join(" "),
		disabled: M,
		"aria-label": P ?? (F ? void 0 : z("trigger")),
		"aria-labelledby": P ? void 0 : F,
		"aria-describedby": Q,
		"aria-haspopup": "dialog",
		"aria-expanded": H,
		"aria-invalid": N || void 0,
		children: [/* @__PURE__ */ h(s, {
			color: G,
			className: "color-picker__swatch"
		}), /* @__PURE__ */ h(t, {
			id: Z,
			children: G ? z("value")(K ?? G) : z("empty")
		})]
	}), Le = I?.props ?? {}, Re = _({
		render: I && l(I, {
			disabled: M || Le.disabled || void 0,
			"aria-describedby": [Q, Le["aria-describedby"]].filter(Boolean).join(" ")
		}),
		ref: Fe,
		enabled: I !== void 0,
		props: {
			id: oe,
			"aria-label": P,
			"aria-labelledby": P ? void 0 : F,
			"aria-haspopup": "dialog",
			"aria-expanded": H,
			"aria-invalid": N || void 0
		}
	}), $;
	return Re ? $ = Re : L === void 0 && ($ = Ie), /* @__PURE__ */ g("div", {
		className: Me,
		children: [
			/* @__PURE__ */ h(c, {
				name: se,
				value: K ?? "",
				required: ce,
				focusTarget: () => Pe.current
			}),
			I && /* @__PURE__ */ h(t, {
				id: Z,
				children: G ? z("value")(K ?? G) : z("empty")
			}),
			/* @__PURE__ */ h(i, {
				trigger: $,
				anchor: L,
				label: z("dialog", ue),
				open: H,
				onOpenChange: Ee,
				side: "bottom",
				align: "start",
				initialFocus: De,
				className: ["color-picker__popover", Ne ? void 0 : fe].filter(Boolean).join(" "),
				children: /* @__PURE__ */ g("div", {
					ref: Oe,
					className: "color-picker__panel",
					children: [
						/* @__PURE__ */ h(b, {
							ref: De,
							hueColor: O({
								h: q.h,
								s: 100,
								v: 100,
								a: 1
							}, !1),
							saturation: q.s,
							brightness: q.v,
							onChange: ke,
							onCommit: Ae,
							label: z("area"),
							roleDescription: z("areaDescription"),
							valueText: z("areaValue")(Math.round(q.s), Math.round(q.v))
						}),
						/* @__PURE__ */ h(a, {
							className: "color-picker__channel color-picker__channel--hue",
							label: z("hue"),
							min: 0,
							max: 360,
							step: 1,
							value: Math.round(q.h),
							format: {
								style: "unit",
								unit: "degree"
							},
							locale: ae,
							onValueChange: (e) => J({
								...q,
								h: e
							}, !1),
							onValueCommitted: (e) => J({
								...q,
								h: e
							}, !0)
						}),
						x && /* @__PURE__ */ h(a, {
							className: "color-picker__channel color-picker__channel--alpha",
							label: z("alpha"),
							min: 0,
							max: 100,
							step: 1,
							value: Math.round(q.a * 100),
							format: {
								style: "unit",
								unit: "percent"
							},
							locale: ae,
							onValueChange: (e) => J({
								...q,
								a: e / 100
							}, !1),
							onValueCommitted: (e) => J({
								...q,
								a: e / 100
							}, !0)
						}),
						/* @__PURE__ */ h(r, {
							className: "color-picker__hex",
							type: "text",
							size: j,
							"aria-label": z("hex"),
							autoComplete: "off",
							spellCheck: !1,
							maxLength: x ? 9 : 7,
							value: Y ?? ve,
							onChange: Ce,
							onBlur: we,
							onKeyDown: (e) => {
								e.key === "Enter" && (e.preventDefault(), we());
							}
						}),
						je.length > 0 && /* @__PURE__ */ h("div", {
							className: "color-picker__presets",
							role: "group",
							"aria-label": z("presets"),
							children: je.map((e) => /* @__PURE__ */ h("button", {
								type: "button",
								className: "color-picker__preset",
								title: e.title,
								"aria-label": e.title,
								"aria-pressed": e.hex === ve,
								onClick: () => J(D(e.hex) ?? A, !0),
								children: /* @__PURE__ */ h(s, {
									color: e.hex,
									className: "color-picker__preset-swatch"
								})
							}, `${e.hex}-${e.title}`))
						}),
						C && /* @__PURE__ */ h(n, {
							variant: "ghost",
							size: "sm",
							className: "color-picker__clear",
							onClick: Te,
							children: z("clear", de)
						})
					]
				})
			})
		]
	});
});
//#endregion
export { ie as t };
