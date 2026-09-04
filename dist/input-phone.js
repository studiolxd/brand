'use client';
import './input-phone.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r, useMemo as i } from "react";
import { Select as a } from "@base-ui/react/select";
import o, { getCountryCallingCode as s } from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function c({ value: r, onChange: i, options: o, disabled: c, size: l = "md", countryLabel: u = "País", internationalLabel: d = "🌐", container: f }) {
	let p = "__intl__", m = (e) => e ?? p, h = (e) => e === p ? void 0 : e, g = l === "sm" ? "xs" : l === "lg" ? "md" : "sm", _ = ["input-phone__country-content", l === "md" ? "" : `input-phone__country-content--${l}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(a.Root, {
		value: m(r),
		onValueChange: (e) => i(h(e)),
		disabled: c,
		children: [/* @__PURE__ */ n(a.Trigger, {
			className: "input-phone__country",
			"aria-label": u,
			children: [/* @__PURE__ */ t(a.Value, { children: r ? `+${s(r)}` : d }), /* @__PURE__ */ t(e, {
				name: "chevron",
				className: "input-phone__country-icon",
				size: g
			})]
		}), /* @__PURE__ */ t(a.Portal, {
			container: f,
			children: /* @__PURE__ */ t(a.Positioner, {
				className: "input-phone__country-positioner",
				side: "bottom",
				align: "start",
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ t(a.Popup, {
					className: _,
					children: o.map(({ value: e, label: n }) => /* @__PURE__ */ t(a.Item, {
						value: m(e),
						className: "input-phone__country-item",
						children: /* @__PURE__ */ t(a.ItemText, { children: n })
					}, m(e)))
				})
			})
		})]
	});
}
var l = r(function({ value: e, defaultCountry: n = "ES", placeholder: a, disabled: s, error: l = !1, size: d = "md", id: f, name: p, describedBy: m, "aria-describedby": h, "aria-label": g, autoComplete: _, required: v, readOnly: y, onChange: b, onBlur: x, onFocus: S, countryLabel: C, internationalLabel: w, container: T }, E) {
	return /* @__PURE__ */ t(o, {
		className: [
			"input-phone",
			l ? "input-phone--error" : "",
			d === "md" ? "" : `input-phone--${d}`
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: n,
		placeholder: a,
		disabled: s,
		readOnly: y,
		required: v,
		autoComplete: _,
		id: f,
		name: p,
		inputComponent: i(() => r(function(e, n) {
			return /* @__PURE__ */ t("input", {
				...e,
				ref: (e) => {
					u(n, e), u(E, e);
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
