'use client';
import './dropdown-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { n as r } from "./_shared/field-labels.js";
import { Menu as i } from "./menu.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useId as c } from "react";
//#region src/stories/molecules/DropdownField/DropdownField.tsx
var l = s(function({ id: s, label: l, labelHidden: u, "aria-label": d, items: f, value: p, onValueChange: m, children: h, inline: g = !1, size: _, align: v = "start", disabled: y = !1, name: b, error: x = !1, errorMessage: S, helperText: C, onBlur: w, className: T }, E) {
	let D = r(u), O = t(_), k = c(), A = s ?? k, j = S ? `${A}-error` : void 0, M = C ? `${A}-helper` : void 0, N = [j, M].filter(Boolean).join(" ") || void 0, P = x || !!S;
	return /* @__PURE__ */ o("div", {
		className: [
			"dropdown-field",
			g ? "dropdown-field--inline" : "",
			O === "md" ? "" : `dropdown-field--${O}`,
			T
		].filter(Boolean).join(" "),
		children: [
			l && /* @__PURE__ */ a(n, {
				htmlFor: A,
				hidden: D,
				size: O,
				children: l
			}),
			/* @__PURE__ */ a(i, {
				align: v,
				size: O,
				value: p,
				onValueChange: m,
				items: f,
				trigger: /* @__PURE__ */ o("button", {
					ref: E,
					type: "button",
					id: A,
					className: "dropdown-field__control",
					"aria-label": l ? void 0 : d,
					"aria-describedby": N,
					"aria-invalid": P || void 0,
					disabled: y,
					onBlur: w,
					children: [/* @__PURE__ */ a("span", {
						className: "dropdown-field__value",
						children: h
					}), /* @__PURE__ */ a(e, {
						name: "chevron",
						size: "sm",
						className: "dropdown-field__icon",
						"aria-hidden": "true"
					})]
				})
			}),
			b && /* @__PURE__ */ a("input", {
				type: "hidden",
				name: b,
				value: p ?? ""
			}),
			S && /* @__PURE__ */ a("span", {
				id: j,
				className: "dropdown-field__error",
				role: "alert",
				children: S
			}),
			C && /* @__PURE__ */ a("span", {
				id: M,
				className: "dropdown-field__helper",
				children: C
			})
		]
	});
});
//#endregion
export { l as DropdownField };
