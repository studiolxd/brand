'use client';
import './number-input.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { forwardRef as n, useCallback as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/atoms/NumberInput/NumberInput.tsx
var s = n(function({ value: n, defaultValue: s = 0, min: c, max: l, step: u = 1, decimal: d = !1, disabled: f = !1, readOnly: p = !1, size: m = "md", error: h = !1, id: g, name: _, describedBy: v, ariaLabel: y, decrementLabel: b, incrementLabel: x, className: S, onChange: C, onEmpty: w, onBlur: T, onFocus: E, ...D }, O) {
	let k = e("numberInput"), A = n !== void 0, [j, M] = i(s), [N, P] = i(!1), [F, I] = i(null), L = A ? n : j, R = F === null ? L === null ? "" : String(L) : F, z = L ?? 0, B = r((e) => {
		let t = e;
		return c !== void 0 && (t = Math.max(c, t)), l !== void 0 && (t = Math.min(l, t)), t;
	}, [c, l]), V = r((e) => {
		let t = B(e);
		A || M(t), C?.(t);
	}, [
		B,
		A,
		C
	]), H = () => {
		f || p || (I(null), V(z - u));
	}, U = () => {
		f || p || (I(null), V(z + u));
	}, W = (e) => {
		let t = e.target.value;
		I(t);
		let n = d ? t.replace(",", ".") : t, r = parseFloat(n);
		isNaN(r) ? w && t.trim() === "" && (A || M(null), w()) : V(r);
	}, G = (e) => {
		P(!0), E?.(e);
	}, K = (e) => {
		P(!1), I(null), T?.(e);
	}, q = [
		"number-input",
		m === "md" ? "" : `number-input--${m}`,
		h ? "number-input--error" : "",
		f ? "number-input--disabled" : "",
		N ? "number-input--focused" : "",
		S ?? ""
	].filter(Boolean).join(" "), J = f || p || L !== null && c !== void 0 && L <= c, Y = f || p || L !== null && l !== void 0 && L >= l;
	return /* @__PURE__ */ o("div", {
		className: q,
		children: [
			/* @__PURE__ */ a("button", {
				className: "number-input__btn number-input__btn--decrement",
				type: "button",
				onClick: H,
				disabled: J,
				"aria-label": k("decrement", b),
				tabIndex: -1,
				children: /* @__PURE__ */ a(t, {
					name: "minus",
					size: "sm"
				})
			}),
			/* @__PURE__ */ a("input", {
				ref: O,
				className: "number-input__field",
				type: "text",
				inputMode: d ? "decimal" : "numeric",
				pattern: d ? "[0-9]*[.,]?[0-9]*" : "[0-9]*",
				"aria-invalid": h || void 0,
				"aria-describedby": v,
				"aria-label": y,
				...D,
				id: g,
				name: _,
				value: R,
				disabled: f,
				readOnly: p,
				onChange: W,
				onFocus: G,
				onBlur: K
			}),
			/* @__PURE__ */ a("button", {
				className: "number-input__btn number-input__btn--increment",
				type: "button",
				onClick: U,
				disabled: Y,
				"aria-label": k("increment", x),
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
