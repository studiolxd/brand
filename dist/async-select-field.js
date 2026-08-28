'use client';
import './async-select-field.css';
import { AsyncSelect as e } from "./async-select.js";
import { n as t } from "./_shared/form-size.js";
import { Label as n } from "./label.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/AsyncSelectField/AsyncSelectField.tsx
var s = r(function({ id: r, label: s, labelHidden: c = !1, onSearch: l, value: u, onValueChange: d, selectedOption: f, placeholder: p, name: m, disabled: h, readOnly: g, size: _, error: v = !1, errorMessage: y, helperText: b, className: x, emptyMessage: S, onBlur: C }, w) {
	let T = t(_), E = i(), D = r ?? E, O = y ? `${D}-error` : void 0, k = b ? `${D}-helper` : void 0, A = [O, k].filter(Boolean).join(" ") || void 0, j = v || !!y;
	return /* @__PURE__ */ o("div", {
		className: ["async-select-field", x].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(n, {
				htmlFor: D,
				hidden: c,
				size: T,
				children: s
			}),
			/* @__PURE__ */ a(e, {
				ref: w,
				id: D,
				name: m,
				onSearch: l,
				value: u,
				onValueChange: d,
				selectedOption: f,
				placeholder: p,
				disabled: h,
				readOnly: g,
				size: T,
				error: j,
				emptyMessage: S,
				"aria-describedby": A,
				onBlur: C
			}),
			y && /* @__PURE__ */ a("span", {
				id: O,
				className: "async-select-field__error",
				role: "alert",
				children: y
			}),
			b && /* @__PURE__ */ a("span", {
				id: k,
				className: "async-select-field__helper",
				children: b
			})
		]
	});
});
//#endregion
export { s as AsyncSelectField };
