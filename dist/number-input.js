'use client';
import './number-input.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { forwardRef as n, useCallback as r, useState as i } from "react";
//#region src/stories/atoms/NumberInput/NumberInput.tsx
var a = n(function({ value: n, defaultValue: a = 0, min: o, max: s, step: c = 1, decimal: l = !1, disabled: u = !1, readOnly: d = !1, size: f = "md", error: p = !1, id: m, name: h, describedBy: g, ariaLabel: _, decrementLabel: v = "Decrementar", incrementLabel: y = "Incrementar", className: b, onChange: x, onBlur: S, onFocus: C, ...w }, T) {
	let E = n !== void 0, [D, O] = i(a), [k, A] = i(!1), [j, M] = i(null), N = E ? n : D, P = j === null ? String(N) : j, F = r((e) => {
		let t = e;
		return o !== void 0 && (t = Math.max(o, t)), s !== void 0 && (t = Math.min(s, t)), t;
	}, [o, s]), I = r((e) => {
		let t = F(e);
		E || O(t), x?.(t);
	}, [
		F,
		E,
		x
	]), L = () => {
		u || d || (M(null), I(N - c));
	}, R = () => {
		u || d || (M(null), I(N + c));
	}, z = (e) => {
		let t = e.target.value;
		M(t);
		let n = l ? t.replace(",", ".") : t, r = parseFloat(n);
		isNaN(r) || I(r);
	}, B = (e) => {
		A(!0), C?.(e);
	}, V = (e) => {
		A(!1), M(null), S?.(e);
	}, H = [
		"number-input",
		f === "md" ? "" : `number-input--${f}`,
		p ? "number-input--error" : "",
		u ? "number-input--disabled" : "",
		k ? "number-input--focused" : "",
		b ?? ""
	].filter(Boolean).join(" "), U = u || d || o !== void 0 && N <= o, W = u || d || s !== void 0 && N >= s;
	return /* @__PURE__ */ t("div", {
		className: H,
		children: [
			/* @__PURE__ */ e("button", {
				className: "number-input__btn number-input__btn--decrement",
				type: "button",
				onClick: L,
				disabled: U,
				"aria-label": v,
				tabIndex: -1,
				children: "−"
			}),
			/* @__PURE__ */ e("input", {
				ref: T,
				className: "number-input__field",
				type: "text",
				inputMode: l ? "decimal" : "numeric",
				pattern: l ? "[0-9]*[.,]?[0-9]*" : "[0-9]*",
				"aria-invalid": p || void 0,
				"aria-describedby": g,
				"aria-label": _,
				...w,
				id: m,
				name: h,
				value: P,
				disabled: u,
				readOnly: d,
				onChange: z,
				onFocus: B,
				onBlur: V
			}),
			/* @__PURE__ */ e("button", {
				className: "number-input__btn number-input__btn--increment",
				type: "button",
				onClick: R,
				disabled: W,
				"aria-label": y,
				tabIndex: -1,
				children: "+"
			})
		]
	});
});
//#endregion
export { a as NumberInput };
