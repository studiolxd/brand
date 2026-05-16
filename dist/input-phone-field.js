'use client';
import './input-phone-field.css';
import { InputPhone as e } from "./input-phone.js";
import { Label as t } from "./label.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
function i({ id: i, label: a, labelHidden: o = !0, value: s, defaultCountry: c, placeholder: l, disabled: u, error: d = !1, errorMessage: f, helperText: p, dark: m, size: h = "md", name: g, onChange: _, onBlur: v }) {
	let y = f ? `${i}-error` : void 0, b = p ? `${i}-helper` : void 0, x = [y, b].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ r("div", {
		className: "input-phone-field",
		children: [
			/* @__PURE__ */ n(t, {
				htmlFor: i,
				hidden: o,
				children: a
			}),
			/* @__PURE__ */ n(e, {
				id: i,
				name: g,
				value: s,
				defaultCountry: c,
				placeholder: l,
				disabled: u,
				error: d,
				dark: m,
				size: h,
				describedBy: x,
				onChange: _,
				onBlur: v
			}),
			f && /* @__PURE__ */ n("span", {
				id: y,
				className: "input-phone-field__error",
				children: f
			}),
			p && /* @__PURE__ */ n("span", {
				id: b,
				className: "input-phone-field__helper",
				children: p
			})
		]
	});
}
//#endregion
export { i as InputPhoneField };
