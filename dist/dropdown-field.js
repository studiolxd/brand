'use client';
import './dropdown-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { ErrorText as n } from "./error-text.js";
import { Label as r } from "./label.js";
import { n as i } from "./_shared/field-labels.js";
import { Menu as a } from "./menu.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { forwardRef as c, useId as l } from "react";
//#region src/stories/molecules/DropdownField/DropdownField.tsx
var u = c(function({ id: c, label: u, labelHidden: d, "aria-label": f, items: p, value: m, onValueChange: h, children: g, inline: _ = !1, size: v, align: y = "start", disabled: b = !1, name: x, error: S = !1, errorMessage: C, helperText: w, onBlur: T, className: E }, D) {
	let O = i(d), k = t(v), A = l(), j = c ?? A, M = C ? `${j}-error` : void 0, N = w ? `${j}-helper` : void 0, P = [M, N].filter(Boolean).join(" ") || void 0, F = S || !!C;
	return /* @__PURE__ */ s("div", {
		className: [
			"dropdown-field",
			_ ? "dropdown-field--inline" : "",
			k === "md" ? "" : `dropdown-field--${k}`,
			E
		].filter(Boolean).join(" "),
		children: [
			u && /* @__PURE__ */ o(r, {
				htmlFor: j,
				hidden: O,
				size: k,
				children: u
			}),
			/* @__PURE__ */ o(a, {
				align: y,
				size: k,
				value: m,
				onValueChange: h,
				items: p,
				trigger: /* @__PURE__ */ s("button", {
					ref: D,
					type: "button",
					id: j,
					className: "dropdown-field__control",
					"aria-label": u ? void 0 : f,
					"aria-describedby": P,
					"aria-invalid": F || void 0,
					disabled: b,
					onBlur: T,
					children: [/* @__PURE__ */ o("span", {
						className: "dropdown-field__value",
						children: g
					}), /* @__PURE__ */ o(e, {
						name: "chevron",
						size: "sm",
						className: "dropdown-field__icon",
						"aria-hidden": "true"
					})]
				})
			}),
			x && /* @__PURE__ */ o("input", {
				type: "hidden",
				name: x,
				value: m ?? ""
			}),
			C && /* @__PURE__ */ o(n, {
				id: M,
				children: C
			}),
			w && /* @__PURE__ */ o("span", {
				id: N,
				className: "dropdown-field__helper",
				children: w
			})
		]
	});
});
//#endregion
export { u as DropdownField };
