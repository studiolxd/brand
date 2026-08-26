'use client';
import './input-phone.css';
import { Icon as e } from "./icon.js";
import { a as t, c as n, i as r, n as i, o as a, r as o, s, t as c } from "./_shared/SelectItemText.js";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
import { getCountryCallingCode as d } from "libphonenumber-js";
import f from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function p({ value: f, onChange: p, options: m, disabled: h, size: g = "md", countryLabel: _ = "País", container: v }) {
	let y = "__intl__", b = (e) => e ?? y, x = (e) => e === y ? void 0 : e, S = g === "sm" ? "xs" : g === "lg" ? "md" : "sm", C = ["input-phone__country-content", g === "md" ? "" : `input-phone__country-content--${g}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(n, {
		value: b(f),
		onValueChange: (e) => p(x(e)),
		disabled: h,
		children: [/* @__PURE__ */ u(s, {
			className: "input-phone__country",
			"aria-label": _,
			children: [/* @__PURE__ */ l(a, { children: f ? `+${d(f)}` : "🌐" }), /* @__PURE__ */ l(e, {
				name: "chevron",
				className: "input-phone__country-icon",
				size: S
			})]
		}), /* @__PURE__ */ l(t, {
			container: v,
			children: /* @__PURE__ */ l(r, {
				className: "input-phone__country-positioner",
				side: "bottom",
				align: "start",
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ l(o, {
					className: C,
					children: m.map(({ value: e, label: t }) => /* @__PURE__ */ l(i, {
						value: b(e),
						className: "input-phone__country-item",
						children: /* @__PURE__ */ l(c, { children: t })
					}, b(e)))
				})
			})
		})]
	});
}
function m({ value: e, defaultCountry: t = "ES", placeholder: n, disabled: r, error: i = !1, size: a = "md", id: o, name: s, describedBy: c, onChange: u, onBlur: d, countryLabel: m, container: g }) {
	return /* @__PURE__ */ l(f, {
		className: [
			"input-phone",
			i ? "input-phone--error" : "",
			a === "md" ? "" : `input-phone--${a}`
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: t,
		placeholder: n,
		disabled: r,
		id: o,
		name: s,
		inputComponent: h,
		countrySelectComponent: p,
		countrySelectProps: {
			size: a,
			countryLabel: m,
			container: g
		},
		onChange: (e) => u?.(e),
		onBlur: d,
		numberInputProps: { "aria-describedby": c }
	});
}
var h = (e) => /* @__PURE__ */ l("input", {
	...e,
	className: "input-phone__number"
});
h.displayName = "InputPhoneField";
//#endregion
export { m as InputPhone };
