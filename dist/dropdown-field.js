'use client';
import './dropdown-field.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, i as a, n as o, r as s, t as c } from "./_shared/fieldshell.js";
import { Menu as l } from "./menu.js";
import { t as u } from "./_shared/requiredinput.js";
import { forwardRef as d, useRef as f } from "react";
import { jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/stories/molecules/DropdownField/DropdownField.tsx
var h = d(function({ id: d, label: h, optional: g, optionalLabel: _, labelHidden: v, "aria-label": y, items: b, value: x, onValueChange: S, children: C, inline: w = !1, size: T, align: E = "start", disabled: D = !1, name: O, required: k = !1, requiredLabel: A, error: j = !1, errorMessage: M, helperText: N, onBlur: P, className: F }, I) {
	let L = r(v), R = t(T), z = n(g, k), B = i({
		id: d,
		error: j,
		errorMessage: M,
		helperText: N
	}), { id: V } = B, H = k ? a(V) : void 0, U = f(null);
	return /* @__PURE__ */ m(o, {
		field: B,
		block: "dropdown-field",
		modifiers: [w && "dropdown-field--inline", R !== "md" && `dropdown-field--${R}`],
		className: F,
		label: h,
		optional: z,
		optionalLabel: _,
		labelHidden: L,
		size: R,
		children: [
			/* @__PURE__ */ p(l, {
				align: E,
				size: R,
				value: x,
				onValueChange: S,
				items: b,
				trigger: /* @__PURE__ */ m("button", {
					ref: (e) => {
						U.current = e, typeof I == "function" ? I(e) : I && (I.current = e);
					},
					type: "button",
					id: V,
					className: "dropdown-field__control",
					"aria-label": h ? void 0 : y,
					"aria-describedby": s(B.describedBy, H),
					"aria-invalid": B.hasError || void 0,
					disabled: D,
					onBlur: P,
					children: [/* @__PURE__ */ p("span", {
						className: "dropdown-field__value",
						children: C
					}), /* @__PURE__ */ p(e, {
						name: "chevron",
						size: "sm",
						className: "dropdown-field__icon",
						"aria-hidden": "true"
					})]
				})
			}),
			H && /* @__PURE__ */ p(c, {
				id: H,
				label: A
			}),
			/* @__PURE__ */ p(u, {
				name: O,
				value: x ?? "",
				required: k,
				focusTarget: () => U.current
			})
		]
	});
});
//#endregion
export { h as DropdownField };
