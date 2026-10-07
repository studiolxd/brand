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
var p = s(function({ id: s, label: p, labelHidden: m, name: h, type: g, kind: _ = "text", clearable: v = !1, clearLabel: y, onClear: b, placeholder: x, value: S, defaultValue: C, disabled: w, readOnly: T, size: E, error: D = !1, errorMessage: O, helperText: k, onChange: A, onBlur: j, onFocus: M, className: N, ...P }, F) {
	let I = e("inputField"), L = i(m), R = n(E), z = a({
		id: s,
		error: D,
		errorMessage: O,
		helperText: k,
		describedBy: P["aria-describedby"]
	}), B = _ === "search", V = l(null);
	c(F, () => V.current);
	let [H, U] = u(() => (C ?? "") !== ""), W = B && v && (S === void 0 ? H : S !== "") && !w && !T;
	function G(e) {
		S === void 0 && U(e.target.value !== ""), A?.(e);
	}
	function K() {
		let e = V.current;
		e && ((Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set)?.call(e, ""), e.dispatchEvent(new Event("input", { bubbles: !0 })), U(!1), e.focus(), b?.());
	}
	let q = /* @__PURE__ */ d(r, {
		ref: V,
		...B ? {
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search"
		} : { type: g },
		...P,
		id: s,
		name: h,
		placeholder: x ?? (L ? p : void 0),
		value: S,
		defaultValue: C,
		disabled: w,
		readOnly: T,
		size: R,
		error: z.hasError,
		"aria-describedby": z.describedBy,
		onChange: G,
		onBlur: j,
		onFocus: M
	});
	return /* @__PURE__ */ d(o, {
		field: z,
		block: "input-field",
		className: N,
		label: p,
		labelHidden: L,
		size: R,
		children: B ? /* @__PURE__ */ f("div", {
			className: [
				"input-field__search",
				R === "md" ? "" : `input-field__search--${R}`,
				v ? "input-field__search--clearable" : ""
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
				q,
				W && /* @__PURE__ */ d("button", {
					type: "button",
					className: "input-field__clear",
					"aria-label": I("clear", y),
					"aria-controls": s,
					onClick: K,
					children: /* @__PURE__ */ d(t, {
						name: "close",
						className: "input-field__search-glyph"
					})
				})
			]
		}) : q
	});
});
//#endregion
export { p as InputField };
