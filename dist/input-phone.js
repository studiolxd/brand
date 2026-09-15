'use client';
import './input-phone.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { forwardRef as r, useMemo as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { Select as s } from "@base-ui/react/select";
import c, { getCountryCallingCode as l } from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function u({ value: r, onChange: i, options: c, disabled: u, size: d = "md", countryLabel: f, internationalLabel: p = "🌐", container: m }) {
	let h = e("inputPhone"), g = n(m), _ = "__intl__", v = (e) => e ?? _, y = (e) => e === _ ? void 0 : e, b = d === "sm" ? "xs" : d === "lg" ? "md" : "sm", x = ["input-phone__country-content", d === "md" ? "" : `input-phone__country-content--${d}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ o(s.Root, {
		value: v(r),
		onValueChange: (e) => i(y(e)),
		disabled: u,
		children: [/* @__PURE__ */ o(s.Trigger, {
			className: "input-phone__country",
			"aria-label": h("country", f),
			children: [/* @__PURE__ */ a(s.Value, { children: r ? `+${l(r)}` : p }), /* @__PURE__ */ a(t, {
				name: "chevron",
				className: "input-phone__country-icon",
				size: b
			})]
		}), /* @__PURE__ */ a(s.Portal, {
			container: g,
			children: /* @__PURE__ */ a(s.Positioner, {
				className: "input-phone__country-positioner",
				side: "bottom",
				align: "start",
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ a(s.Popup, {
					className: x,
					children: c.map(({ value: e, label: t }) => /* @__PURE__ */ a(s.Item, {
						value: v(e),
						className: "input-phone__country-item",
						children: /* @__PURE__ */ a(s.ItemText, { children: t })
					}, v(e)))
				})
			})
		})]
	});
}
var d = r(function({ value: e, defaultCountry: t = "ES", placeholder: n, disabled: o, error: s = !1, size: l = "md", id: d, name: p, describedBy: m, "aria-describedby": h, "aria-label": g, autoComplete: _, required: v, readOnly: y, onChange: b, onBlur: x, onFocus: S, countryLabel: C, internationalLabel: w, container: T }, E) {
	return /* @__PURE__ */ a(c, {
		className: [
			"input-phone",
			s ? "input-phone--error" : "",
			l === "md" ? "" : `input-phone--${l}`
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: t,
		placeholder: n,
		disabled: o,
		readOnly: y,
		required: v,
		autoComplete: _,
		id: d,
		name: p,
		inputComponent: i(() => r(function(e, t) {
			return /* @__PURE__ */ a("input", {
				...e,
				ref: (e) => {
					f(t, e), f(E, e);
				},
				className: "input-phone__number"
			});
		}), [E]),
		countrySelectComponent: u,
		countrySelectProps: {
			size: l,
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
			"aria-invalid": s || void 0
		}
	});
});
function f(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
//#endregion
export { d as InputPhone };
