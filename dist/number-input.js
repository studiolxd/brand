'use client';
import './number-input.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useCallback as n, useState as r } from "react";
//#region src/stories/atoms/NumberInput/NumberInput.tsx
function i({ value: i, defaultValue: a = 0, min: o, max: s, step: c = 1, disabled: l = !1, readOnly: u = !1, size: d = "md", error: f = !1, id: p, name: m, describedBy: h, ariaLabel: g, onChange: _, onBlur: v, onFocus: y }) {
	let b = i !== void 0, [x, S] = r(a), [C, w] = r(!1), T = b ? i : x, E = n((e) => {
		let t = e;
		return o !== void 0 && (t = Math.max(o, t)), s !== void 0 && (t = Math.min(s, t)), t;
	}, [o, s]), D = n((e) => {
		let t = E(e);
		b || S(t), _?.(t);
	}, [
		E,
		b,
		_
	]), O = () => {
		l || u || D(T - c);
	}, k = () => {
		l || u || D(T + c);
	}, A = (e) => {
		let t = parseFloat(e.target.value);
		isNaN(t) || D(t);
	}, j = (e) => {
		w(!0), y?.(e);
	}, M = (e) => {
		w(!1), v?.(e);
	}, N = [
		"number-input",
		d === "md" ? "" : `number-input--${d}`,
		f ? "number-input--error" : "",
		l ? "number-input--disabled" : "",
		C ? "number-input--focused" : ""
	].filter(Boolean).join(" "), P = l || u || o !== void 0 && T <= o, F = l || u || s !== void 0 && T >= s;
	return /* @__PURE__ */ t("div", {
		className: N,
		children: [
			/* @__PURE__ */ e("button", {
				className: "number-input__btn number-input__btn--decrement",
				type: "button",
				onClick: O,
				disabled: P,
				"aria-label": "Decrementar",
				tabIndex: -1,
				children: "−"
			}),
			/* @__PURE__ */ e("input", {
				className: "number-input__field",
				type: "text",
				inputMode: "numeric",
				pattern: "[0-9]*",
				id: p,
				name: m,
				value: T,
				disabled: l,
				readOnly: u,
				"aria-invalid": f || void 0,
				"aria-describedby": h,
				"aria-label": g,
				onChange: A,
				onFocus: j,
				onBlur: M
			}),
			/* @__PURE__ */ e("button", {
				className: "number-input__btn number-input__btn--increment",
				type: "button",
				onClick: k,
				disabled: F,
				"aria-label": "Incrementar",
				tabIndex: -1,
				children: "+"
			})
		]
	});
}
//#endregion
export { i as NumberInput };
