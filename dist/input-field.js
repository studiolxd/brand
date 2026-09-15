'use client';
import './input-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { ErrorText as n } from "./error-text.js";
import { Input as r } from "./input.js";
import { Label as i } from "./label.js";
import { n as a } from "./_shared/field-labels.js";
import { forwardRef as o, useImperativeHandle as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/molecules/InputField/InputField.tsx
var f = o(function({ id: o, label: f, labelHidden: p, name: m, type: h, kind: g = "text", clearable: _ = !1, clearLabel: v = "Borrar", onClear: y, placeholder: b, value: x, defaultValue: S, disabled: C, readOnly: w, size: T, error: E = !1, errorMessage: D, helperText: O, onChange: k, onBlur: A, onFocus: j, className: M, ...N }, P) {
	let F = a(p), I = t(T), L = D ? `${o}-error` : void 0, R = O ? `${o}-helper` : void 0, z = [
		L,
		R,
		N["aria-describedby"]
	].filter(Boolean).join(" ") || void 0, B = E || !!D, V = g === "search", H = c(null);
	s(P, () => H.current);
	let [U, W] = l(() => (S ?? "") !== ""), G = V && _ && (x === void 0 ? U : x !== "") && !C && !w;
	function K(e) {
		x === void 0 && W(e.target.value !== ""), k?.(e);
	}
	function q() {
		let e = H.current;
		e && ((Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set)?.call(e, ""), e.dispatchEvent(new Event("input", { bubbles: !0 })), W(!1), e.focus(), y?.());
	}
	let J = /* @__PURE__ */ u(r, {
		ref: H,
		...V ? {
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search"
		} : { type: h },
		...N,
		id: o,
		name: m,
		placeholder: b ?? (F ? f : void 0),
		value: x,
		defaultValue: S,
		disabled: C,
		readOnly: w,
		size: I,
		error: B,
		"aria-describedby": z,
		onChange: K,
		onBlur: A,
		onFocus: j
	});
	return /* @__PURE__ */ d("div", {
		className: ["input-field", M].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ u(i, {
				htmlFor: o,
				hidden: F,
				size: I,
				children: f
			}),
			V ? /* @__PURE__ */ d("div", {
				className: [
					"input-field__search",
					I === "md" ? "" : `input-field__search--${I}`,
					_ ? "input-field__search--clearable" : ""
				].filter(Boolean).join(" "),
				children: [
					/* @__PURE__ */ u("span", {
						className: "input-field__search-icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ u(e, {
							name: "search",
							className: "input-field__search-glyph"
						})
					}),
					J,
					G && /* @__PURE__ */ u("button", {
						type: "button",
						className: "input-field__clear",
						"aria-label": v,
						"aria-controls": o,
						onClick: q,
						children: /* @__PURE__ */ u(e, {
							name: "close",
							className: "input-field__search-glyph"
						})
					})
				]
			}) : J,
			D && /* @__PURE__ */ u(n, {
				id: L,
				children: D
			}),
			O && /* @__PURE__ */ u("span", {
				id: R,
				className: "input-field__helper",
				children: O
			})
		]
	});
});
//#endregion
export { f as InputField };
