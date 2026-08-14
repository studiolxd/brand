'use client';
import './number-input.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useCallback as n, useState as r } from "react";
//#region src/stories/atoms/NumberInput/NumberInput.tsx
function i({ value: i, defaultValue: a = 0, min: o, max: s, step: c = 1, decimal: l = !1, disabled: u = !1, readOnly: d = !1, size: f = "md", error: p = !1, id: m, name: h, describedBy: g, ariaLabel: _, decrementLabel: v = "Decrementar", incrementLabel: y = "Incrementar", onChange: b, onBlur: x, onFocus: S }) {
	let C = i !== void 0, [w, T] = r(a), [E, D] = r(!1), [O, k] = r(null), A = C ? i : w, j = O === null ? String(A) : O, M = n((e) => {
		let t = e;
		return o !== void 0 && (t = Math.max(o, t)), s !== void 0 && (t = Math.min(s, t)), t;
	}, [o, s]), N = n((e) => {
		let t = M(e);
		C || T(t), b?.(t);
	}, [
		M,
		C,
		b
	]), P = () => {
		u || d || (k(null), N(A - c));
	}, F = () => {
		u || d || (k(null), N(A + c));
	}, I = (e) => {
		let t = e.target.value;
		k(t);
		let n = l ? t.replace(",", ".") : t, r = parseFloat(n);
		isNaN(r) || N(r);
	}, L = (e) => {
		D(!0), S?.(e);
	}, R = (e) => {
		D(!1), k(null), x?.(e);
	}, z = [
		"number-input",
		f === "md" ? "" : `number-input--${f}`,
		p ? "number-input--error" : "",
		u ? "number-input--disabled" : "",
		E ? "number-input--focused" : ""
	].filter(Boolean).join(" "), B = u || d || o !== void 0 && A <= o, V = u || d || s !== void 0 && A >= s;
	return /* @__PURE__ */ t("div", {
		className: z,
		children: [
			/* @__PURE__ */ e("button", {
				className: "number-input__btn number-input__btn--decrement",
				type: "button",
				onClick: P,
				disabled: B,
				"aria-label": v,
				tabIndex: -1,
				children: "−"
			}),
			/* @__PURE__ */ e("input", {
				className: "number-input__field",
				type: "text",
				inputMode: l ? "decimal" : "numeric",
				pattern: l ? "[0-9]*[.,]?[0-9]*" : "[0-9]*",
				id: m,
				name: h,
				value: j,
				disabled: u,
				readOnly: d,
				"aria-invalid": p || void 0,
				"aria-describedby": g,
				"aria-label": _,
				onChange: I,
				onFocus: L,
				onBlur: R
			}),
			/* @__PURE__ */ e("button", {
				className: "number-input__btn number-input__btn--increment",
				type: "button",
				onClick: F,
				disabled: V,
				"aria-label": y,
				tabIndex: -1,
				children: "+"
			})
		]
	});
}
//#endregion
export { i as NumberInput };
