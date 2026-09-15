'use client';
import './input-phone.css';
import { Icon as e } from "./icon.js";
import { forwardRef as t, useMemo as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { Select as a } from "@base-ui/react/select";
import o, { getCountryCallingCode as s } from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function c({ value: t, onChange: n, options: o, disabled: c, size: l = "md", countryLabel: u = "País", internationalLabel: d = "🌐", container: f }) {
	let p = "__intl__", m = (e) => e ?? p, h = (e) => e === p ? void 0 : e, g = l === "sm" ? "xs" : l === "lg" ? "md" : "sm", _ = ["input-phone__country-content", l === "md" ? "" : `input-phone__country-content--${l}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ i(a.Root, {
		value: m(t),
		onValueChange: (e) => n(h(e)),
		disabled: c,
		children: [/* @__PURE__ */ i(a.Trigger, {
			className: "input-phone__country",
			"aria-label": u,
			children: [/* @__PURE__ */ r(a.Value, { children: t ? `+${s(t)}` : d }), /* @__PURE__ */ r(e, {
				name: "chevron",
				className: "input-phone__country-icon",
				size: g
			})]
		}), /* @__PURE__ */ r(a.Portal, {
			container: f,
			children: /* @__PURE__ */ r(a.Positioner, {
				className: "input-phone__country-positioner",
				side: "bottom",
				align: "start",
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ r(a.Popup, {
					className: _,
					children: o.map(({ value: e, label: t }) => /* @__PURE__ */ r(a.Item, {
						value: m(e),
						className: "input-phone__country-item",
						children: /* @__PURE__ */ r(a.ItemText, { children: t })
					}, m(e)))
				})
			})
		})]
	});
}
var l = t(function({ value: e, defaultCountry: i = "ES", placeholder: a, disabled: s, error: l = !1, size: d = "md", id: f, name: p, describedBy: m, "aria-describedby": h, "aria-label": g, autoComplete: _, required: v, readOnly: y, onChange: b, onBlur: x, onFocus: S, countryLabel: C, internationalLabel: w, container: T }, E) {
	return /* @__PURE__ */ r(o, {
		className: [
			"input-phone",
			l ? "input-phone--error" : "",
			d === "md" ? "" : `input-phone--${d}`
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: i,
		placeholder: a,
		disabled: s,
		readOnly: y,
		required: v,
		autoComplete: _,
		id: f,
		name: p,
		inputComponent: n(() => t(function(e, t) {
			return /* @__PURE__ */ r("input", {
				...e,
				ref: (e) => {
					u(t, e), u(E, e);
				},
				className: "input-phone__number"
			});
		}), [E]),
		countrySelectComponent: c,
		countrySelectProps: {
			size: d,
			countryLabel: C,
			internationalLabel: w,
			container: T
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
