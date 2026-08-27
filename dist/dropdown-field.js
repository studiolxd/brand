'use client';
import './dropdown-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { Menu as r } from "./menu.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/DropdownField/DropdownField.tsx
var c = o(function({ id: o, label: c, labelHidden: l = !1, "aria-label": u, items: d, value: f, onValueChange: p, children: m, inline: h = !1, size: g, align: _ = "start", disabled: v = !1, name: y, error: b = !1, errorMessage: x, helperText: S, onBlur: C, className: w }, T) {
	let E = t(g), D = s(), O = o ?? D, k = x ? `${O}-error` : void 0, A = S ? `${O}-helper` : void 0, j = [k, A].filter(Boolean).join(" ") || void 0, M = b || !!x;
	return /* @__PURE__ */ a("div", {
		className: [
			"dropdown-field",
			h ? "dropdown-field--inline" : "",
			E === "md" ? "" : `dropdown-field--${E}`,
			w
		].filter(Boolean).join(" "),
		children: [
			c && /* @__PURE__ */ i(n, {
				htmlFor: O,
				hidden: l,
				size: E,
				children: c
			}),
			/* @__PURE__ */ i(r, {
				align: _,
				size: E,
				value: f,
				onValueChange: p,
				items: d,
				trigger: /* @__PURE__ */ a("button", {
					ref: T,
					type: "button",
					id: O,
					className: "dropdown-field__control",
					"aria-label": c ? void 0 : u,
					"aria-describedby": j,
					"aria-invalid": M || void 0,
					disabled: v,
					onBlur: C,
					children: [/* @__PURE__ */ i("span", {
						className: "dropdown-field__value",
						children: m
					}), /* @__PURE__ */ i(e, {
						name: "chevron",
						size: "sm",
						className: "dropdown-field__icon",
						"aria-hidden": "true"
					})]
				})
			}),
			y && /* @__PURE__ */ i("input", {
				type: "hidden",
				name: y,
				value: f ?? ""
			}),
			x && /* @__PURE__ */ i("span", {
				id: k,
				className: "dropdown-field__error",
				role: "alert",
				children: x
			}),
			S && /* @__PURE__ */ i("span", {
				id: A,
				className: "dropdown-field__helper",
				children: S
			})
		]
	});
});
//#endregion
export { c as DropdownField };
