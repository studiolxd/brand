'use client';
import './dropdown-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { Menu as a } from "./menu.js";
import { t as o } from "./_shared/requiredinput.js";
import { forwardRef as s, useRef as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/molecules/DropdownField/DropdownField.tsx
var d = s(function({ id: s, label: d, optional: f, optionalLabel: p, labelHidden: m, "aria-label": h, items: g, value: _, onValueChange: v, children: y, inline: b = !1, size: x, align: S = "start", disabled: C = !1, name: w, required: T = !1, error: E = !1, errorMessage: D, helperText: O, onBlur: k, className: A }, j) {
	let M = n(m), N = t(x), P = r({
		id: s,
		error: E,
		errorMessage: D,
		helperText: O
	}), { id: F, labelId: I } = P, L = c(null), R = (e) => {
		L.current = e, typeof j == "function" ? j(e) : j && (j.current = e);
	}, z = T ? {
		role: "group",
		"aria-labelledby": d ? I : void 0,
		"aria-label": d ? void 0 : h,
		"aria-required": !0
	} : void 0;
	return /* @__PURE__ */ u(i, {
		field: P,
		block: "dropdown-field",
		modifiers: [b && "dropdown-field--inline", N !== "md" && `dropdown-field--${N}`],
		className: A,
		label: d,
		optional: f,
		optionalLabel: p,
		labelHidden: M,
		size: N,
		labelIdentified: T,
		rootProps: z,
		children: [/* @__PURE__ */ l(a, {
			align: S,
			size: N,
			value: _,
			onValueChange: v,
			items: g,
			trigger: /* @__PURE__ */ u("button", {
				ref: R,
				type: "button",
				id: F,
				className: "dropdown-field__control",
				"aria-label": d ? void 0 : h,
				"aria-describedby": P.describedBy,
				"aria-invalid": P.hasError || void 0,
				disabled: C,
				onBlur: k,
				children: [/* @__PURE__ */ l("span", {
					className: "dropdown-field__value",
					children: y
				}), /* @__PURE__ */ l(e, {
					name: "chevron",
					size: "sm",
					className: "dropdown-field__icon",
					"aria-hidden": "true"
				})]
			})
		}), /* @__PURE__ */ l(o, {
			name: w,
			value: _ ?? "",
			required: T,
			focusTarget: () => L.current
		})]
	});
});
//#endregion
export { d as DropdownField };
