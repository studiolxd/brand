'use client';
import './dropdown-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { Menu as r } from "./menu.js";
import { forwardRef as i, useId as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/DropdownField/DropdownField.tsx
var c = i(function({ id: i, label: c, labelHidden: l = !1, "aria-label": u, items: d, value: f, onValueChange: p, children: m, inline: h = !1, size: g, align: _ = "start", disabled: v = !1, name: y, error: b = !1, errorMessage: x, helperText: S, onBlur: C, className: w }, T) {
	let E = t(g), D = a(), O = i ?? D, k = x ? `${O}-error` : void 0, A = S ? `${O}-helper` : void 0, j = [k, A].filter(Boolean).join(" ") || void 0, M = b || !!x;
	return /* @__PURE__ */ s("div", {
		className: [
			"dropdown-field",
			h ? "dropdown-field--inline" : "",
			E === "md" ? "" : `dropdown-field--${E}`,
			w
		].filter(Boolean).join(" "),
		children: [
			c && /* @__PURE__ */ o(n, {
				htmlFor: O,
				hidden: l,
				size: E,
				children: c
			}),
			/* @__PURE__ */ o(r, {
				align: _,
				size: E,
				value: f,
				onValueChange: p,
				items: d,
				trigger: /* @__PURE__ */ s("button", {
					ref: T,
					type: "button",
					id: O,
					className: "dropdown-field__control",
					"aria-label": c ? void 0 : u,
					"aria-describedby": j,
					"aria-invalid": M || void 0,
					disabled: v,
					onBlur: C,
					children: [/* @__PURE__ */ o("span", {
						className: "dropdown-field__value",
						children: m
					}), /* @__PURE__ */ o(e, {
						name: "chevron",
						size: "sm",
						className: "dropdown-field__icon",
						"aria-hidden": "true"
					})]
				})
			}),
			y && /* @__PURE__ */ o("input", {
				type: "hidden",
				name: y,
				value: f ?? ""
			}),
			x && /* @__PURE__ */ o("span", {
				id: k,
				className: "dropdown-field__error",
				role: "alert",
				children: x
			}),
			S && /* @__PURE__ */ o("span", {
				id: A,
				className: "dropdown-field__helper",
				children: S
			})
		]
	});
});
//#endregion
export { c as DropdownField };
