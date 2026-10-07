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
var p = { clear: "Borrar" }, m = s(function({ id: s, label: m, optional: h, optionalLabel: g, labelHidden: _, name: v, type: y, kind: b = "text", clearable: x = !1, clearLabel: S, onClear: C, placeholder: w, value: T, defaultValue: E, disabled: D, readOnly: O, size: k, error: A = !1, errorMessage: j, helperText: M, onChange: N, onBlur: P, onFocus: F, className: I, ...L }, R) {
	let z = e("inputField", p), B = i(_), V = n(k), H = a({
		id: s,
		error: A,
		errorMessage: j,
		helperText: M,
		describedBy: L["aria-describedby"]
	}), U = b === "search", W = l(null);
	c(R, () => W.current);
	let [G, K] = u(() => (E ?? "") !== ""), q = U && x && (T === void 0 ? G : T !== "") && !D && !O;
	function J(e) {
		T === void 0 && K(e.target.value !== ""), N?.(e);
	}
	function Y() {
		let e = W.current;
		e && ((Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set)?.call(e, ""), e.dispatchEvent(new Event("input", { bubbles: !0 })), K(!1), e.focus(), C?.());
	}
	let X = /* @__PURE__ */ d(r, {
		ref: W,
		...U ? {
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search"
		} : { type: y },
		...L,
		id: s,
		name: v,
		placeholder: w ?? (B ? m : void 0),
		value: T,
		defaultValue: E,
		disabled: D,
		readOnly: O,
		size: V,
		error: H.hasError,
		"aria-describedby": H.describedBy,
		onChange: J,
		onBlur: P,
		onFocus: F
	});
	return /* @__PURE__ */ d(o, {
		field: H,
		block: "input-field",
		className: I,
		label: m,
		optional: h,
		optionalLabel: g,
		labelHidden: B,
		size: V,
		children: U ? /* @__PURE__ */ f("div", {
			className: [
				"input-field__search",
				V === "md" ? "" : `input-field__search--${V}`,
				x ? "input-field__search--clearable" : ""
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
				X,
				q && /* @__PURE__ */ d("button", {
					type: "button",
					className: "input-field__clear",
					"aria-label": z("clear", S),
					"aria-controls": s,
					onClick: Y,
					children: /* @__PURE__ */ d(t, {
						name: "close",
						className: "input-field__search-glyph"
					})
				})
			]
		}) : X
	});
});
//#endregion
export { m as t };
