'use client';
import './number-input.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useCallback as n, useState as r } from "react";
//#region src/stories/atoms/NumberInput/NumberInput.tsx
function i({ value: i, defaultValue: a = 0, min: o, max: s, step: c = 1, decimal: l = !1, disabled: u = !1, readOnly: d = !1, size: f = "md", error: p = !1, id: m, name: h, describedBy: g, ariaLabel: _, onChange: v, onBlur: y, onFocus: b }) {
	let x = i !== void 0, [S, C] = r(a), [w, T] = r(!1), [E, D] = r(null), O = x ? i : S, k = E === null ? String(O) : E, A = n((e) => {
		let t = e;
		return o !== void 0 && (t = Math.max(o, t)), s !== void 0 && (t = Math.min(s, t)), t;
	}, [o, s]), j = n((e) => {
		let t = A(e);
		x || C(t), v?.(t);
	}, [
		A,
		x,
		v
	]);
	return /* @__PURE__ */ t("div", {
		className: [
			"number-input",
			f === "md" ? "" : `number-input--${f}`,
			p ? "number-input--error" : "",
			u ? "number-input--disabled" : "",
			w ? "number-input--focused" : ""
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ e("button", {
				className: "number-input__btn number-input__btn--decrement",
				type: "button",
				onClick: () => {
					u || d || (D(null), j(O - c));
				},
				disabled: u || d || o !== void 0 && O <= o,
				"aria-label": "Decrementar",
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
				value: k,
				disabled: u,
				readOnly: d,
				"aria-invalid": p || void 0,
				"aria-describedby": g,
				"aria-label": _,
				onChange: (e) => {
					let t = e.target.value;
					D(t);
					let n = l ? t.replace(",", ".") : t, r = parseFloat(n);
					isNaN(r) || j(r);
				},
				onFocus: (e) => {
					T(!0), b?.(e);
				},
				onBlur: (e) => {
					T(!1), D(null), y?.(e);
				}
			}),
			/* @__PURE__ */ e("button", {
				className: "number-input__btn number-input__btn--increment",
				type: "button",
				onClick: () => {
					u || d || (D(null), j(O + c));
				},
				disabled: u || d || s !== void 0 && O >= s,
				"aria-label": "Incrementar",
				tabIndex: -1,
				children: "+"
			})
		]
	});
}
//#endregion
export { i as NumberInput };
