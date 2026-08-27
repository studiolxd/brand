'use client';
import './input-phone.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r, useMemo as i } from "react";
import { Select as a } from "@base-ui-components/react/select";
import { getCountryCallingCode as o } from "libphonenumber-js";
import s from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function c({ value: r, onChange: i, options: s, disabled: c, size: l = "md", countryLabel: u = "País", container: d }) {
	let f = "__intl__", p = (e) => e ?? f, m = (e) => e === f ? void 0 : e, h = l === "sm" ? "xs" : l === "lg" ? "md" : "sm", g = ["input-phone__country-content", l === "md" ? "" : `input-phone__country-content--${l}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(a.Root, {
		value: p(r),
		onValueChange: (e) => i(m(e)),
		disabled: c,
		children: [/* @__PURE__ */ n(a.Trigger, {
			className: "input-phone__country",
			"aria-label": u,
			children: [/* @__PURE__ */ t(a.Value, { children: r ? `+${o(r)}` : "🌐" }), /* @__PURE__ */ t(e, {
				name: "chevron",
				className: "input-phone__country-icon",
				size: h
			})]
		}), /* @__PURE__ */ t(a.Portal, {
			container: d,
			children: /* @__PURE__ */ t(a.Positioner, {
				className: "input-phone__country-positioner",
				side: "bottom",
				align: "start",
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ t(a.Popup, {
					className: g,
					children: s.map(({ value: e, label: n }) => /* @__PURE__ */ t(a.Item, {
						value: p(e),
						className: "input-phone__country-item",
						children: /* @__PURE__ */ t(a.ItemText, { children: n })
					}, p(e)))
				})
			})
		})]
	});
}
var l = r(function({ value: e, defaultCountry: n = "ES", placeholder: a, disabled: o, error: l = !1, size: d = "md", id: f, name: p, describedBy: m, "aria-describedby": h, "aria-label": g, autoComplete: _, required: v, readOnly: y, onChange: b, onBlur: x, onFocus: S, countryLabel: C, container: w }, T) {
	return /* @__PURE__ */ t(s, {
		className: [
			"input-phone",
			l ? "input-phone--error" : "",
			d === "md" ? "" : `input-phone--${d}`
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: n,
		placeholder: a,
		disabled: o,
		readOnly: y,
		required: v,
		autoComplete: _,
		id: f,
		name: p,
		inputComponent: i(() => r(function(e, n) {
			return /* @__PURE__ */ t("input", {
				...e,
				ref: (e) => {
					u(n, e), u(T, e);
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
