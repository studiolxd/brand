'use client';
import './dropdown-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { ErrorText as n } from "./error-text.js";
import { Label as r } from "./label.js";
import { n as i } from "./_shared/field-labels.js";
import { Menu as a } from "./menu.js";
import { forwardRef as o, useId as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/molecules/DropdownField/DropdownField.tsx
var u = o(function({ id: o, label: u, labelHidden: d, "aria-label": f, items: p, value: m, onValueChange: h, children: g, inline: _ = !1, size: v, align: y = "start", disabled: b = !1, name: x, error: S = !1, errorMessage: C, helperText: w, onBlur: T, className: E }, D) {
	let O = i(d), k = t(v), A = s(), j = o ?? A, M = C ? `${j}-error` : void 0, N = w ? `${j}-helper` : void 0, P = [M, N].filter(Boolean).join(" ") || void 0, F = S || !!C;
	return /* @__PURE__ */ l("div", {
		className: [
			"dropdown-field",
			_ ? "dropdown-field--inline" : "",
			k === "md" ? "" : `dropdown-field--${k}`,
			E
		].filter(Boolean).join(" "),
		children: [
			u && /* @__PURE__ */ c(r, {
				htmlFor: j,
				hidden: O,
				size: k,
				children: u
			}),
			/* @__PURE__ */ c(a, {
				align: y,
				size: k,
				value: m,
				onValueChange: h,
				items: p,
				trigger: /* @__PURE__ */ l("button", {
					ref: D,
					type: "button",
					id: j,
					className: "dropdown-field__control",
					"aria-label": u ? void 0 : f,
					"aria-describedby": P,
					"aria-invalid": F || void 0,
					disabled: b,
					onBlur: T,
					children: [/* @__PURE__ */ c("span", {
						className: "dropdown-field__value",
						children: g
					}), /* @__PURE__ */ c(e, {
						name: "chevron",
						size: "sm",
						className: "dropdown-field__icon",
						"aria-hidden": "true"
					})]
				})
			}),
			x && /* @__PURE__ */ c("input", {
				type: "hidden",
				name: x,
				value: m ?? ""
			}),
			C && /* @__PURE__ */ c(n, {
				id: M,
				children: C
			}),
			w && /* @__PURE__ */ c("span", {
				id: N,
				className: "dropdown-field__helper",
				children: w
			})
		]
	});
});
//#endregion
export { u as DropdownField };
