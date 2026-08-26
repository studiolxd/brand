'use client';
import './input-phone.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { Select as r } from "@base-ui-components/react/select";
import { getCountryCallingCode as i } from "libphonenumber-js";
import a from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function o({ value: a, onChange: o, options: s, disabled: c, size: l = "md", countryLabel: u = "País", container: d }) {
	let f = "__intl__", p = (e) => e ?? f, m = (e) => e === f ? void 0 : e, h = l === "sm" ? "xs" : l === "lg" ? "md" : "sm", g = ["input-phone__country-content", l === "md" ? "" : `input-phone__country-content--${l}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(r.Root, {
		value: p(a),
		onValueChange: (e) => o(m(e)),
		disabled: c,
		children: [/* @__PURE__ */ n(r.Trigger, {
			className: "input-phone__country",
			"aria-label": u,
			children: [/* @__PURE__ */ t(r.Value, { children: a ? `+${i(a)}` : "🌐" }), /* @__PURE__ */ t(e, {
				name: "chevron",
				className: "input-phone__country-icon",
				size: h
			})]
		}), /* @__PURE__ */ t(r.Portal, {
			container: d,
			children: /* @__PURE__ */ t(r.Positioner, {
				className: "input-phone__country-positioner",
				side: "bottom",
				align: "start",
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ t(r.Popup, {
					className: g,
					children: s.map(({ value: e, label: n }) => /* @__PURE__ */ t(r.Item, {
						value: p(e),
						className: "input-phone__country-item",
						children: /* @__PURE__ */ t(r.ItemText, { children: n })
					}, p(e)))
				})
			})
		})]
	});
}
function s({ value: e, defaultCountry: n = "ES", placeholder: r, disabled: i, error: s = !1, size: l = "md", id: u, name: d, describedBy: f, onChange: p, onBlur: m, countryLabel: h, container: g }) {
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
			countryLabel: h,
			container: g
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
