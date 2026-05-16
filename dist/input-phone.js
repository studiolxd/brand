'use client';
import './input-phone.css';
import { Chevron as e } from "./chevron.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-select";
import { getCountryCallingCode as i } from "libphonenumber-js";
import a from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function o({ value: a, onChange: o, options: s, disabled: c, dark: l, size: u = "md" }) {
	let d = "__intl__", f = (e) => e ?? d, p = (e) => e === d ? void 0 : e, m = u === "sm" ? "xs" : u === "lg" ? "md" : "sm", h = [
		"input-phone__country-content",
		u === "md" ? "" : `input-phone__country-content--${u}`,
		l ? "input-phone__country-content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(r.Root, {
		value: f(a),
		onValueChange: (e) => o(p(e)),
		disabled: c,
		children: [/* @__PURE__ */ n(r.Trigger, {
			className: "input-phone__country",
			"aria-label": "País",
			children: [/* @__PURE__ */ t(r.Value, { children: a ? `+${i(a)}` : "🌐" }), /* @__PURE__ */ t(r.Icon, {
				asChild: !0,
				children: /* @__PURE__ */ t(e, {
					className: "input-phone__country-icon",
					size: m
				})
			})]
		}), /* @__PURE__ */ t(r.Portal, { children: /* @__PURE__ */ t(r.Content, {
			className: h,
			position: "popper",
			children: /* @__PURE__ */ t(r.Viewport, { children: s.map(({ value: e, label: n }) => /* @__PURE__ */ t(r.Item, {
				value: f(e),
				className: "input-phone__country-item",
				children: /* @__PURE__ */ t(r.ItemText, { children: n })
			}, f(e))) })
		}) })]
	});
}
function s({ value: e, defaultCountry: n = "ES", placeholder: r, disabled: i, error: s = !1, dark: l, size: u = "md", id: d, name: f, describedBy: p, onChange: m, onBlur: h }) {
	return /* @__PURE__ */ t(a, {
		className: [
			"input-phone",
			s ? "input-phone--error" : "",
			u === "md" ? "" : `input-phone--${u}`
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: n,
		placeholder: r,
		disabled: i,
		id: d,
		name: f,
		inputComponent: c,
		countrySelectComponent: o,
		countrySelectProps: {
			dark: l,
			size: u
		},
		onChange: (e) => m?.(e),
		onBlur: h,
		numberInputProps: { "aria-describedby": p }
	});
}
var c = (e) => /* @__PURE__ */ t("input", {
	...e,
	className: "input-phone__number"
});
c.displayName = "InputPhoneField";
//#endregion
export { s as InputPhone };
