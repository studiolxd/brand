'use client';
import './input-phone.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { forwardRef as n, useMemo as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { Select as o } from "@base-ui/react/select";
import s, { getCountryCallingCode as c } from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function l({ value: n, onChange: r, options: s, disabled: l, size: u = "md", countryLabel: d, internationalLabel: f = "🌐", container: p }) {
	let m = e("inputPhone"), h = "__intl__", g = (e) => e ?? h, _ = (e) => e === h ? void 0 : e, v = u === "sm" ? "xs" : u === "lg" ? "md" : "sm", y = ["input-phone__country-content", u === "md" ? "" : `input-phone__country-content--${u}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ a(o.Root, {
		value: g(n),
		onValueChange: (e) => r(_(e)),
		disabled: l,
		children: [/* @__PURE__ */ a(o.Trigger, {
			className: "input-phone__country",
			"aria-label": m("country", d),
			children: [/* @__PURE__ */ i(o.Value, { children: n ? `+${c(n)}` : f }), /* @__PURE__ */ i(t, {
				name: "chevron",
				className: "input-phone__country-icon",
				size: v
			})]
		}), /* @__PURE__ */ i(o.Portal, {
			container: p,
			children: /* @__PURE__ */ i(o.Positioner, {
				className: "input-phone__country-positioner",
				side: "bottom",
				align: "start",
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ i(o.Popup, {
					className: y,
					children: s.map(({ value: e, label: t }) => /* @__PURE__ */ i(o.Item, {
						value: g(e),
						className: "input-phone__country-item",
						children: /* @__PURE__ */ i(o.ItemText, { children: t })
					}, g(e)))
				})
			})
		})]
	});
}
var u = n(function({ value: e, defaultCountry: t = "ES", placeholder: a, disabled: o, error: c = !1, size: u = "md", id: f, name: p, describedBy: m, "aria-describedby": h, "aria-label": g, autoComplete: _, required: v, readOnly: y, onChange: b, onBlur: x, onFocus: S, countryLabel: C, internationalLabel: w, container: T }, E) {
	return /* @__PURE__ */ i(s, {
		className: [
			"input-phone",
			c ? "input-phone--error" : "",
			u === "md" ? "" : `input-phone--${u}`
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: t,
		placeholder: a,
		disabled: o,
		readOnly: y,
		required: v,
		autoComplete: _,
		id: f,
		name: p,
		inputComponent: r(() => n(function(e, t) {
			return /* @__PURE__ */ i("input", {
				...e,
				ref: (e) => {
					d(t, e), d(E, e);
				},
				className: "input-phone__number"
			});
		}), [E]),
		countrySelectComponent: l,
		countrySelectProps: {
			size: u,
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
			"aria-invalid": c || void 0
		}
	});
});
function d(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
//#endregion
export { u as InputPhone };
