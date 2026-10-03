'use client';
import './number-input.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { forwardRef as n, useCallback as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/atoms/NumberInput/NumberInput.tsx
var s = n(function({ value: n, defaultValue: s = 0, min: c, max: l, step: u = 1, decimal: d = !1, disabled: f = !1, readOnly: p = !1, size: m = "md", compact: h = !1, commitMode: g = "change", error: _ = !1, id: v, name: y, describedBy: b, ariaLabel: x, decrementLabel: S, incrementLabel: C, className: w, onChange: T, onEmpty: E, onBlur: D, onFocus: O, onKeyDown: k, ...A }, j) {
	let M = e("numberInput"), N = n !== void 0, [P, F] = i(s), [I, L] = i(!1), [R, z] = i(null), B = N ? n : P, V = R === null ? B === null ? "" : String(B) : R, H = B ?? 0, U = r((e) => {
		let t = e;
		return c !== void 0 && (t = Math.max(c, t)), l !== void 0 && (t = Math.min(l, t)), t;
	}, [c, l]), W = r((e) => {
		let t = U(e);
		N || F(t), T?.(t);
	}, [
		U,
		N,
		T
	]), G = () => {
		f || p || (z(null), W(H - u));
	}, K = () => {
		f || p || (z(null), W(H + u));
	}, q = (e) => {
		let t = d ? e.replace(",", ".") : e, n = parseFloat(t);
		if (!isNaN(n)) {
			if (g === "blur" && U(n) === B) return;
			W(n);
		} else if (E && e.trim() === "") {
			if (g === "blur" && B === null) return;
			N || F(null), E();
		}
	}, J = (e) => {
		let t = e.target.value;
		z(t), g === "change" && q(t);
	}, Y = (e) => {
		k?.(e), !(e.defaultPrevented || g !== "blur" || R === null) && (e.key === "Enter" ? (q(R), z(null)) : e.key === "Escape" && (e.preventDefault(), z(null)));
	}, X = (e) => {
		L(!0), O?.(e);
	}, Z = (e) => {
		L(!1), g === "blur" && R !== null && q(R), z(null), D?.(e);
	}, Q = [
		"number-input",
		h ? "number-input--compact" : m === "md" ? "" : `number-input--${m}`,
		_ ? "number-input--error" : "",
		f ? "number-input--disabled" : "",
		I ? "number-input--focused" : "",
		w ?? ""
	].filter(Boolean).join(" "), $ = f || p || B !== null && c !== void 0 && B <= c, ee = f || p || B !== null && l !== void 0 && B >= l;
	return /* @__PURE__ */ o("div", {
		className: Q,
		children: [
			/* @__PURE__ */ a("button", {
				className: "number-input__btn number-input__btn--decrement",
				type: "button",
				onClick: G,
				disabled: $,
				"aria-label": M("decrement", S),
				tabIndex: -1,
				children: /* @__PURE__ */ a(t, {
					name: "minus",
					size: "sm"
				})
			}),
			/* @__PURE__ */ a("input", {
				ref: j,
				className: "number-input__field",
				type: "text",
				inputMode: d ? "decimal" : "numeric",
				pattern: d ? "[0-9]*[.,]?[0-9]*" : "[0-9]*",
				"aria-invalid": _ || void 0,
				"aria-describedby": b,
				"aria-label": x,
				...A,
				id: v,
				name: y,
				value: V,
				disabled: f,
				readOnly: p,
				onChange: J,
				onKeyDown: Y,
				onFocus: X,
				onBlur: Z
			}),
			/* @__PURE__ */ a("button", {
				className: "number-input__btn number-input__btn--increment",
				type: "button",
				onClick: K,
				disabled: ee,
				"aria-label": M("increment", C),
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
