'use client';
import './input-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { Input as n } from "./input.js";
import { Label as r } from "./label.js";
import { n as i } from "./_shared/field-labels.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useImperativeHandle as c, useRef as l, useState as u } from "react";
//#region src/stories/molecules/InputField/InputField.tsx
var d = s(function({ id: s, label: d, labelHidden: f, name: p, type: m, kind: h = "text", clearable: g = !1, clearLabel: _ = "Borrar", onClear: v, placeholder: y, value: b, defaultValue: x, disabled: S, readOnly: C, size: w, error: T = !1, errorMessage: E, helperText: D, onChange: O, onBlur: k, onFocus: A, className: j, ...M }, N) {
	let P = i(f), F = t(w), I = E ? `${s}-error` : void 0, L = D ? `${s}-helper` : void 0, R = [
		I,
		L,
		M["aria-describedby"]
	].filter(Boolean).join(" ") || void 0, z = T || !!E, B = h === "search", V = l(null);
	c(N, () => V.current);
	let [H, U] = u(() => (x ?? "") !== ""), W = B && g && (b === void 0 ? H : b !== "") && !S && !C;
	function G(e) {
		b === void 0 && U(e.target.value !== ""), O?.(e);
	}
	function K() {
		let e = V.current;
		e && ((Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set)?.call(e, ""), e.dispatchEvent(new Event("input", { bubbles: !0 })), U(!1), e.focus(), v?.());
	}
	let q = /* @__PURE__ */ a(n, {
		ref: V,
		...B ? {
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search"
		} : { type: m },
		...M,
		id: s,
		name: p,
		placeholder: y ?? (P ? d : void 0),
		value: b,
		defaultValue: x,
		disabled: S,
		readOnly: C,
		size: F,
		error: z,
		"aria-describedby": R,
		onChange: G,
		onBlur: k,
		onFocus: A
	});
	return /* @__PURE__ */ o("div", {
		className: ["input-field", j].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(r, {
				htmlFor: s,
				hidden: P,
				size: F,
				children: d
			}),
			B ? /* @__PURE__ */ o("div", {
				className: [
					"input-field__search",
					F === "md" ? "" : `input-field__search--${F}`,
					g ? "input-field__search--clearable" : ""
				].filter(Boolean).join(" "),
				children: [
					/* @__PURE__ */ a("span", {
						className: "input-field__search-icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ a(e, {
							name: "search",
							className: "input-field__search-glyph"
						})
					}),
					q,
					W && /* @__PURE__ */ a("button", {
						type: "button",
						className: "input-field__clear",
						"aria-label": _,
						"aria-controls": s,
						onClick: K,
						children: /* @__PURE__ */ a(e, {
							name: "close",
							className: "input-field__search-glyph"
						})
					})
				]
			}) : q,
			E && /* @__PURE__ */ a("span", {
				id: I,
				className: "input-field__error",
				role: "alert",
				children: E
			}),
			D && /* @__PURE__ */ a("span", {
				id: L,
				className: "input-field__helper",
				children: D
			})
		]
	});
});
//#endregion
export { d as InputField };
