'use client';
import './input-field.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/form-size.js";
import { ErrorText as r } from "./error-text.js";
import { Input as i } from "./input.js";
import { Label as a } from "./label.js";
import { n as o } from "./_shared/field-labels.js";
import { forwardRef as s, useImperativeHandle as c, useRef as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/molecules/InputField/InputField.tsx
var p = s(function({ id: s, label: p, labelHidden: m, name: h, type: g, kind: _ = "text", clearable: v = !1, clearLabel: y, onClear: b, placeholder: x, value: S, defaultValue: C, disabled: w, readOnly: T, size: E, error: D = !1, errorMessage: O, helperText: k, onChange: A, onBlur: j, onFocus: M, className: N, ...P }, F) {
	let I = e("inputField"), L = o(m), R = n(E), z = O ? `${s}-error` : void 0, B = k ? `${s}-helper` : void 0, V = [
		z,
		B,
		P["aria-describedby"]
	].filter(Boolean).join(" ") || void 0, H = D || !!O, U = _ === "search", W = l(null);
	c(F, () => W.current);
	let [G, K] = u(() => (C ?? "") !== ""), q = U && v && (S === void 0 ? G : S !== "") && !w && !T;
	function J(e) {
		S === void 0 && K(e.target.value !== ""), A?.(e);
	}
	function Y() {
		let e = W.current;
		e && ((Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set)?.call(e, ""), e.dispatchEvent(new Event("input", { bubbles: !0 })), K(!1), e.focus(), b?.());
	}
	let X = /* @__PURE__ */ d(i, {
		ref: W,
		...U ? {
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
		error: H,
		"aria-describedby": V,
		onChange: J,
		onBlur: j,
		onFocus: M
	});
	return /* @__PURE__ */ f("div", {
		className: ["input-field", N].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ d(a, {
				htmlFor: s,
				hidden: L,
				size: R,
				children: p
			}),
			U ? /* @__PURE__ */ f("div", {
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
					X,
					q && /* @__PURE__ */ d("button", {
						type: "button",
						className: "input-field__clear",
						"aria-label": I("clear", y),
						"aria-controls": s,
						onClick: Y,
						children: /* @__PURE__ */ d(t, {
							name: "close",
							className: "input-field__search-glyph"
						})
					})
				]
			}) : X,
			O && /* @__PURE__ */ d(r, {
				id: z,
				children: O
			}),
			k && /* @__PURE__ */ d("span", {
				id: B,
				className: "input-field__helper",
				children: k
			})
		]
	});
});
//#endregion
export { p as InputField };
