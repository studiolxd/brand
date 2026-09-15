'use client';
import './number-input.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { forwardRef as n, useCallback as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/atoms/NumberInput/NumberInput.tsx
var s = n(function({ value: n, defaultValue: s = 0, min: c, max: l, step: u = 1, decimal: d = !1, disabled: f = !1, readOnly: p = !1, size: m = "md", error: h = !1, id: g, name: _, describedBy: v, ariaLabel: y, decrementLabel: b, incrementLabel: x, className: S, onChange: C, onBlur: w, onFocus: T, ...E }, D) {
	let O = e("numberInput"), k = n !== void 0, [A, j] = i(s), [M, N] = i(!1), [P, F] = i(null), I = k ? n : A, L = P === null ? String(I) : P, R = r((e) => {
		let t = e;
		return c !== void 0 && (t = Math.max(c, t)), l !== void 0 && (t = Math.min(l, t)), t;
	}, [c, l]), z = r((e) => {
		let t = R(e);
		k || j(t), C?.(t);
	}, [
		R,
		k,
		C
	]), B = () => {
		f || p || (F(null), z(I - u));
	}, V = () => {
		f || p || (F(null), z(I + u));
	}, H = (e) => {
		let t = e.target.value;
		F(t);
		let n = d ? t.replace(",", ".") : t, r = parseFloat(n);
		isNaN(r) || z(r);
	}, U = (e) => {
		N(!0), T?.(e);
	}, W = (e) => {
		N(!1), F(null), w?.(e);
	}, G = [
		"number-input",
		m === "md" ? "" : `number-input--${m}`,
		h ? "number-input--error" : "",
		f ? "number-input--disabled" : "",
		M ? "number-input--focused" : "",
		S ?? ""
	].filter(Boolean).join(" "), K = f || p || c !== void 0 && I <= c, q = f || p || l !== void 0 && I >= l;
	return /* @__PURE__ */ o("div", {
		className: G,
		children: [
			/* @__PURE__ */ a("button", {
				className: "number-input__btn number-input__btn--decrement",
				type: "button",
				onClick: B,
				disabled: K,
				"aria-label": O("decrement", b),
				tabIndex: -1,
				children: /* @__PURE__ */ a(t, {
					name: "minus",
					size: "sm"
				})
			}),
			/* @__PURE__ */ a("input", {
				ref: D,
				className: "number-input__field",
				type: "text",
				inputMode: d ? "decimal" : "numeric",
				pattern: d ? "[0-9]*[.,]?[0-9]*" : "[0-9]*",
				"aria-invalid": h || void 0,
				"aria-describedby": v,
				"aria-label": y,
				...E,
				id: g,
				name: _,
				value: L,
				disabled: f,
				readOnly: p,
				onChange: H,
				onFocus: U,
				onBlur: W
			}),
			/* @__PURE__ */ a("button", {
				className: "number-input__btn number-input__btn--increment",
				type: "button",
				onClick: V,
				disabled: q,
				"aria-label": O("increment", x),
				tabIndex: -1,
				children: /* @__PURE__ */ a(t, {
					name: "plus",
					size: "sm"
				})
			})
		]
	});
});
//#endregion
export { s as NumberInput };
