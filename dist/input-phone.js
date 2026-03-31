'use client';
import './input-phone.css';
import { Chevron as e } from "./chevron.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-select";
import { getCountryCallingCode as i } from "libphonenumber-js";
import a from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function o({ value: a, onChange: o, options: s, disabled: c, dark: l }) {
	let u = "__intl__", d = (e) => e ?? u, f = (e) => e === u ? void 0 : e;
	return /* @__PURE__ */ n(r.Root, {
		value: d(a),
		onValueChange: (e) => o(f(e)),
		disabled: c,
		children: [/* @__PURE__ */ n(r.Trigger, {
			className: "input-phone__country",
			"aria-label": "País",
			children: [/* @__PURE__ */ t(r.Value, { children: a ? `+${i(a)}` : "🌐" }), /* @__PURE__ */ t(r.Icon, {
				asChild: !0,
				children: /* @__PURE__ */ t(e, {
					className: "input-phone__country-icon",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ t(r.Portal, { children: /* @__PURE__ */ t(r.Content, {
			className: ["input-phone__country-content", l ? "input-phone__country-content--dark" : ""].filter(Boolean).join(" "),
			position: "popper",
			children: /* @__PURE__ */ t(r.Viewport, { children: s.map(({ value: e, label: n }) => /* @__PURE__ */ t(r.Item, {
				value: d(e),
				className: "input-phone__country-item",
				children: /* @__PURE__ */ t(r.ItemText, { children: n })
			}, d(e))) })
		}) })]
	});
}
function s({ value: e, defaultCountry: n = "ES", placeholder: r, disabled: i, error: s = !1, dark: l, id: u, name: d, describedBy: f, onChange: p, onBlur: m }) {
	return /* @__PURE__ */ t(a, {
		className: ["input-phone", s ? "input-phone--error" : ""].filter(Boolean).join(" "),
		value: e,
		defaultCountry: n,
		placeholder: r,
		disabled: i,
		id: u,
		name: d,
		inputComponent: c,
		countrySelectComponent: o,
		countrySelectProps: { dark: l },
		onChange: (e) => p?.(e),
		onBlur: m,
		numberInputProps: { "aria-describedby": f }
	});
}
var c = (e) => /* @__PURE__ */ t("input", {
	...e,
	className: "input-phone__number"
});
c.displayName = "InputPhoneField";
//#endregion
export { s as InputPhone };
