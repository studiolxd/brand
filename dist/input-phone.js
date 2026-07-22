'use client';
import './input-phone.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-select";
import { getCountryCallingCode as i } from "libphonenumber-js";
import a from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function o({ value: a, onChange: o, options: s, disabled: c, size: l = "md", container: u }) {
	let d = "__intl__", f = (e) => e ?? d, p = (e) => e === d ? void 0 : e, m = l === "sm" ? "xs" : l === "lg" ? "md" : "sm", h = ["input-phone__country-content", l === "md" ? "" : `input-phone__country-content--${l}`].filter(Boolean).join(" ");
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
					name: "chevron",
					className: "input-phone__country-icon",
					size: m
				})
			})]
		}), /* @__PURE__ */ t(r.Portal, {
			container: u,
			children: /* @__PURE__ */ t(r.Content, {
				className: h,
				position: "popper",
				children: /* @__PURE__ */ t(r.Viewport, { children: s.map(({ value: e, label: n }) => /* @__PURE__ */ t(r.Item, {
					value: f(e),
					className: "input-phone__country-item",
					children: /* @__PURE__ */ t(r.ItemText, { children: n })
				}, f(e))) })
			})
		})]
	});
}
function s({ value: e, defaultCountry: n = "ES", placeholder: r, disabled: i, error: s = !1, size: l = "md", id: u, name: d, describedBy: f, onChange: p, onBlur: m, container: h }) {
	return /* @__PURE__ */ t(a, {
		className: [
			"input-phone",
			s ? "input-phone--error" : "",
			l === "md" ? "" : `input-phone--${l}`
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: n,
		placeholder: r,
		disabled: i,
		id: u,
		name: d,
		inputComponent: c,
		countrySelectComponent: o,
		countrySelectProps: {
			size: l,
			container: h
		},
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
