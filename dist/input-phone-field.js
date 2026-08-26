'use client';
import './input-phone-field.css';
import { n as e } from "./_shared/form-size.js";
import { InputPhone as t } from "./input-phone.js";
import { Label as n } from "./label.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
function a({ id: a, label: o, labelHidden: s = !0, value: c, defaultCountry: l, placeholder: u, disabled: d, error: f = !1, errorMessage: p, helperText: m, size: h, name: g, onChange: _, onBlur: v }) {
	let y = e(h), b = p ? `${a}-error` : void 0, x = m ? `${a}-helper` : void 0, S = [b, x].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ i("div", {
		className: "input-phone-field",
		children: [
			/* @__PURE__ */ r(n, {
				htmlFor: a,
				hidden: s,
				size: y,
				children: o
			}),
			/* @__PURE__ */ r(t, {
				id: a,
				name: g,
				value: c,
				defaultCountry: l,
				placeholder: u,
				disabled: d,
				error: f,
				size: y,
				describedBy: S,
				onChange: _,
				onBlur: v
			}),
			p && /* @__PURE__ */ r("span", {
				id: b,
				className: "input-phone-field__error",
				children: p
			}),
			m && /* @__PURE__ */ r("span", {
				id: x,
				className: "input-phone-field__helper",
				children: m
			})
		]
	});
}
//#endregion
export { a as InputPhoneField };
