import '../inputfield.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { n } from "./form-size.js";
import { Input as r } from "../input.js";
import { n as i } from "./field-labels.js";
import { n as a, t as o } from "./fieldshell.js";
import { forwardRef as s, useImperativeHandle as c, useRef as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/messages/es/inputField.ts
var p = { clear: "Borrar" }, m = s(function({ id: s, label: m, labelHidden: h, name: g, type: _, kind: v = "text", clearable: y = !1, clearLabel: b, onClear: x, placeholder: S, value: C, defaultValue: w, disabled: T, readOnly: E, size: D, error: O = !1, errorMessage: k, helperText: A, onChange: j, onBlur: M, onFocus: N, className: P, ...F }, I) {
	let L = e("inputField", p), R = i(h), z = n(D), B = a({
		id: s,
		error: O,
		errorMessage: k,
		helperText: A,
		describedBy: F["aria-describedby"]
	}), V = v === "search", H = l(null);
	c(I, () => H.current);
	let [U, W] = u(() => (w ?? "") !== ""), G = V && y && (C === void 0 ? U : C !== "") && !T && !E;
	function K(e) {
		C === void 0 && W(e.target.value !== ""), j?.(e);
	}
	function q() {
		let e = H.current;
		e && ((Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set)?.call(e, ""), e.dispatchEvent(new Event("input", { bubbles: !0 })), W(!1), e.focus(), x?.());
	}
	let J = /* @__PURE__ */ d(r, {
		ref: H,
		...V ? {
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search"
		} : { type: _ },
		...F,
		id: s,
		name: g,
		placeholder: S ?? (R ? m : void 0),
		value: C,
		defaultValue: w,
		disabled: T,
		readOnly: E,
		size: z,
		error: B.hasError,
		"aria-describedby": B.describedBy,
		onChange: K,
		onBlur: M,
		onFocus: N
	});
	return /* @__PURE__ */ d(o, {
		field: B,
		block: "input-field",
		className: P,
		label: m,
		labelHidden: R,
		size: z,
		children: V ? /* @__PURE__ */ f("div", {
			className: [
				"input-field__search",
				z === "md" ? "" : `input-field__search--${z}`,
				y ? "input-field__search--clearable" : ""
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
				J,
				G && /* @__PURE__ */ d("button", {
					type: "button",
					className: "input-field__clear",
					"aria-label": L("clear", b),
					"aria-controls": s,
					onClick: q,
					children: /* @__PURE__ */ d(t, {
						name: "close",
						className: "input-field__search-glyph"
					})
				})
			]
		}) : J
	});
});
//#endregion
export { m as t };
