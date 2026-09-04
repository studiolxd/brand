'use client';
import './number-input.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r, useCallback as i, useState as a } from "react";
//#region src/stories/atoms/NumberInput/NumberInput.tsx
var o = r(function({ value: r, defaultValue: o = 0, min: s, max: c, step: l = 1, decimal: u = !1, disabled: d = !1, readOnly: f = !1, size: p = "md", error: m = !1, id: h, name: g, describedBy: _, ariaLabel: v, decrementLabel: y = "Decrementar", incrementLabel: b = "Incrementar", className: x, onChange: S, onBlur: C, onFocus: w, ...T }, E) {
	let D = r !== void 0, [O, k] = a(o), [A, j] = a(!1), [M, N] = a(null), P = D ? r : O, F = M === null ? String(P) : M, I = i((e) => {
		let t = e;
		return s !== void 0 && (t = Math.max(s, t)), c !== void 0 && (t = Math.min(c, t)), t;
	}, [s, c]), L = i((e) => {
		let t = I(e);
		D || k(t), S?.(t);
	}, [
		I,
		D,
		S
	]), R = () => {
		d || f || (N(null), L(P - l));
	}, z = () => {
		d || f || (N(null), L(P + l));
	}, B = (e) => {
		let t = e.target.value;
		N(t);
		let n = u ? t.replace(",", ".") : t, r = parseFloat(n);
		isNaN(r) || L(r);
	}, V = (e) => {
		j(!0), w?.(e);
	}, H = (e) => {
		j(!1), N(null), C?.(e);
	}, U = [
		"number-input",
		p === "md" ? "" : `number-input--${p}`,
		m ? "number-input--error" : "",
		d ? "number-input--disabled" : "",
		A ? "number-input--focused" : "",
		x ?? ""
	].filter(Boolean).join(" "), W = d || f || s !== void 0 && P <= s, G = d || f || c !== void 0 && P >= c;
	return /* @__PURE__ */ n("div", {
		className: U,
		children: [
			/* @__PURE__ */ t("button", {
				className: "number-input__btn number-input__btn--decrement",
				type: "button",
				onClick: R,
				disabled: W,
				"aria-label": y,
				tabIndex: -1,
				children: /* @__PURE__ */ t(e, {
					name: "minus",
					size: "sm"
				})
			}),
			/* @__PURE__ */ t("input", {
				ref: E,
				className: "number-input__field",
				type: "text",
				inputMode: u ? "decimal" : "numeric",
				pattern: u ? "[0-9]*[.,]?[0-9]*" : "[0-9]*",
				"aria-invalid": m || void 0,
				"aria-describedby": _,
				"aria-label": v,
				...T,
				id: h,
				name: g,
				value: F,
				disabled: d,
				readOnly: f,
				onChange: B,
				onFocus: V,
				onBlur: H
			}),
			/* @__PURE__ */ t("button", {
				className: "number-input__btn number-input__btn--increment",
				type: "button",
				onClick: z,
				disabled: G,
				"aria-label": b,
				tabIndex: -1,
				children: /* @__PURE__ */ t(e, {
					name: "plus",
					size: "sm"
				})
			})
		]
	});
});
//#endregion
export { o as NumberInput };
