'use client';
import './dropdown-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { Menu as a } from "./menu.js";
import { forwardRef as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/DropdownField/DropdownField.tsx
var l = o(function({ id: o, label: l, labelHidden: u, "aria-label": d, items: f, value: p, onValueChange: m, children: h, inline: g = !1, size: _, align: v = "start", disabled: y = !1, name: b, error: x = !1, errorMessage: S, helperText: C, onBlur: w, className: T }, E) {
	let D = n(u), O = t(_), k = r({
		id: o,
		error: x,
		errorMessage: S,
		helperText: C
	}), { id: A } = k;
	return /* @__PURE__ */ c(i, {
		field: k,
		block: "dropdown-field",
		modifiers: [g && "dropdown-field--inline", O !== "md" && `dropdown-field--${O}`],
		className: T,
		label: l,
		labelHidden: D,
		size: O,
		children: [/* @__PURE__ */ s(a, {
			align: v,
			size: O,
			value: p,
			onValueChange: m,
			items: f,
			trigger: /* @__PURE__ */ c("button", {
				ref: E,
				type: "button",
				id: A,
				className: "dropdown-field__control",
				"aria-label": l ? void 0 : d,
				"aria-describedby": k.describedBy,
				"aria-invalid": k.hasError || void 0,
				disabled: y,
				onBlur: w,
				children: [/* @__PURE__ */ s("span", {
					className: "dropdown-field__value",
					children: h
				}), /* @__PURE__ */ s(e, {
					name: "chevron",
					size: "sm",
					className: "dropdown-field__icon",
					"aria-hidden": "true"
				})]
			})
		}), b && /* @__PURE__ */ s("input", {
			type: "hidden",
			name: b,
			value: p ?? ""
		})]
	});
});
//#endregion
export { l as DropdownField };
