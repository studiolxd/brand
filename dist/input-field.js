'use client';
import './input-field.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/form-size.js";
import { Input as r } from "./input.js";
import { n as i } from "./_shared/field-labels.js";
import { n as a, t as o } from "./_shared/fieldshell.js";
import { forwardRef as s, useImperativeHandle as c, useRef as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/molecules/InputField/InputField.tsx
var p = s(function({ id: s, label: p, optional: m, optionalLabel: h, labelHidden: g, name: _, type: v, kind: y = "text", clearable: b = !1, clearLabel: x, onClear: S, placeholder: C, value: w, defaultValue: T, disabled: E, readOnly: D, size: O, error: k = !1, errorMessage: A, helperText: j, onChange: M, onBlur: N, onFocus: P, className: F, ...I }, L) {
	let R = e("inputField"), z = i(g), B = n(O), V = a({
		id: s,
		error: k,
		errorMessage: A,
		helperText: j,
		describedBy: I["aria-describedby"]
	}), H = y === "search", U = l(null);
	c(L, () => U.current);
	let [W, G] = u(() => (T ?? "") !== ""), K = H && b && (w === void 0 ? W : w !== "") && !E && !D;
	function q(e) {
		w === void 0 && G(e.target.value !== ""), M?.(e);
	}
	function J() {
		let e = U.current;
		e && ((Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set)?.call(e, ""), e.dispatchEvent(new Event("input", { bubbles: !0 })), G(!1), e.focus(), S?.());
	}
	let Y = /* @__PURE__ */ d(r, {
		ref: U,
		...H ? {
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search"
		} : { type: v },
		...I,
		id: s,
		name: _,
		placeholder: C ?? (z ? p : void 0),
		value: w,
		defaultValue: T,
		disabled: E,
		readOnly: D,
		size: B,
		error: V.hasError,
		"aria-describedby": V.describedBy,
		onChange: q,
		onBlur: N,
		onFocus: P
	});
	return /* @__PURE__ */ d(o, {
		field: V,
		block: "input-field",
		className: F,
		label: p,
		optional: m,
		optionalLabel: h,
		labelHidden: z,
		size: B,
		children: H ? /* @__PURE__ */ f("div", {
			className: [
				"input-field__search",
				B === "md" ? "" : `input-field__search--${B}`,
				b ? "input-field__search--clearable" : ""
			].filter(Boolean).join(" "),
			children: [
				/* @__PURE__ */ d("span", {
					className: "input-field__search-icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ d(t, {
						name: "search",
						className: "input-field__search-glyph"
					})
				}),
				Y,
				K && /* @__PURE__ */ d("button", {
					type: "button",
					className: "input-field__clear",
					"aria-label": R("clear", x),
					"aria-controls": s,
					onClick: J,
					children: /* @__PURE__ */ d(t, {
						name: "close",
						className: "input-field__search-glyph"
					})
				})
			]
		}) : Y
	});
});
//#endregion
export { p as InputField };
