'use client';
import './input-phone.css';
import { Icon as e } from "./icon.js";
import { forwardRef as t, useMemo as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { Select as a } from "@base-ui-components/react/select";
import { getCountryCallingCode as o } from "libphonenumber-js";
import s from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function c({ value: t, onChange: n, options: s, disabled: c, size: l = "md", countryLabel: u = "País", container: d }) {
	let f = "__intl__", p = (e) => e ?? f, m = (e) => e === f ? void 0 : e, h = l === "sm" ? "xs" : l === "lg" ? "md" : "sm", g = ["input-phone__country-content", l === "md" ? "" : `input-phone__country-content--${l}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ i(a.Root, {
		value: p(t),
		onValueChange: (e) => n(m(e)),
		disabled: c,
		children: [/* @__PURE__ */ i(a.Trigger, {
			className: "input-phone__country",
			"aria-label": u,
			children: [/* @__PURE__ */ r(a.Value, { children: t ? `+${o(t)}` : "🌐" }), /* @__PURE__ */ r(e, {
				name: "chevron",
				className: "input-phone__country-icon",
				size: h
			})]
		}), /* @__PURE__ */ r(a.Portal, {
			container: d,
			children: /* @__PURE__ */ r(a.Positioner, {
				className: "input-phone__country-positioner",
				side: "bottom",
				align: "start",
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ r(a.Popup, {
					className: g,
					children: s.map(({ value: e, label: t }) => /* @__PURE__ */ r(a.Item, {
						value: p(e),
						className: "input-phone__country-item",
						children: /* @__PURE__ */ r(a.ItemText, { children: t })
					}, p(e)))
				})
			})
		})]
	});
}
var l = t(function({ value: e, defaultCountry: i = "ES", placeholder: a, disabled: o, error: l = !1, size: d = "md", id: f, name: p, describedBy: m, "aria-describedby": h, "aria-label": g, autoComplete: _, required: v, readOnly: y, onChange: b, onBlur: x, onFocus: S, countryLabel: C, container: w }, T) {
	return /* @__PURE__ */ r(s, {
		className: [
			"input-phone",
			l ? "input-phone--error" : "",
			d === "md" ? "" : `input-phone--${d}`
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: i,
		placeholder: a,
		disabled: o,
		readOnly: y,
		required: v,
		autoComplete: _,
		id: f,
		name: p,
		inputComponent: n(() => t(function(e, t) {
			return /* @__PURE__ */ r("input", {
				...e,
				ref: (e) => {
					u(t, e), u(T, e);
				},
				className: "input-phone__number"
			});
		}), [T]),
		countrySelectComponent: c,
		countrySelectProps: {
			size: d,
			countryLabel: C,
			container: w
		},
		onChange: (e) => b?.(e),
		onBlur: x,
		onFocus: S,
		numberInputProps: {
			"aria-describedby": h ?? m,
			"aria-label": g,
			"aria-invalid": l || void 0
		}
	});
});
function u(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
//#endregion
export { l as InputPhone };
