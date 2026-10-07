import '../inputfield.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { n } from "./form-size.js";
import { Input as r } from "../input.js";
import { n as i } from "./field-optional.js";
import { n as a } from "./field-labels.js";
import { a as o, n as s } from "./fieldshell.js";
import { forwardRef as c, useImperativeHandle as l, useRef as u, useState as d } from "react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/stories/messages/es/inputField.ts
var m = { clear: "Borrar" }, h = c(function({ id: c, label: h, optional: g, optionalLabel: _, labelHidden: v, name: y, type: b, kind: x = "text", clearable: S = !1, clearLabel: C, onClear: w, placeholder: T, value: E, defaultValue: D, disabled: O, readOnly: k, size: A, error: j = !1, errorMessage: M, helperText: N, onChange: P, onBlur: F, onFocus: I, className: L, ...R }, z) {
	let B = e("inputField", m), V = a(v), H = n(A), U = i(g, R.required), W = o({
		id: c,
		error: j,
		errorMessage: M,
		helperText: N,
		describedBy: R["aria-describedby"]
	}), G = x === "search", K = u(null);
	l(z, () => K.current);
	let [q, J] = d(() => (D ?? "") !== ""), Y = G && S && (E === void 0 ? q : E !== "") && !O && !k;
	function X(e) {
		E === void 0 && J(e.target.value !== ""), P?.(e);
	}
	function Z() {
		let e = K.current;
		e && ((Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set)?.call(e, ""), e.dispatchEvent(new Event("input", { bubbles: !0 })), J(!1), e.focus(), w?.());
	}
	let Q = /* @__PURE__ */ f(r, {
		ref: K,
		...G ? {
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search"
		} : { type: b },
		...R,
		id: c,
		name: y,
		placeholder: T ?? (V ? h : void 0),
		value: E,
		defaultValue: D,
		disabled: O,
		readOnly: k,
		size: H,
		error: W.hasError,
		"aria-describedby": W.describedBy,
		onChange: X,
		onBlur: F,
		onFocus: I
	});
	return /* @__PURE__ */ f(s, {
		field: W,
		block: "input-field",
		className: L,
		label: h,
		optional: U,
		optionalLabel: _,
		labelHidden: V,
		size: H,
		children: G ? /* @__PURE__ */ p("div", {
			className: [
				"input-field__search",
				H === "md" ? "" : `input-field__search--${H}`,
				S ? "input-field__search--clearable" : ""
			].filter(Boolean).join(" "),
			children: [
				/* @__PURE__ */ f("span", {
					className: "input-field__search-icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ f(t, {
						name: "search",
						className: "input-field__search-glyph"
					})
				}),
				Q,
				Y && /* @__PURE__ */ f("button", {
					type: "button",
					className: "input-field__clear",
					"aria-label": B("clear", C),
					"aria-controls": c,
					onClick: Z,
					children: /* @__PURE__ */ f(t, {
						name: "close",
						className: "input-field__search-glyph"
					})
				})
			]
		}) : Q
	});
});
//#endregion
export { h as t };
