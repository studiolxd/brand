'use client';
import './input-phone.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { t as r } from "./_shared/assign-ref.js";
import { forwardRef as i, useMemo as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { Select as c } from "@base-ui/react/select";
import l, { getCountryCallingCode as u } from "react-phone-number-input";
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function d({ value: r, onChange: i, options: a, disabled: l, size: d = "md", countryLabel: f, internationalLabel: p = "🌐", container: m }) {
	let h = e("inputPhone"), g = n(m), _ = "__intl__", v = (e) => e ?? _, y = (e) => e === _ ? void 0 : e, b = d === "lg" ? "md" : "sm", x = ["input-phone__country-content", d === "md" ? "" : `input-phone__country-content--${d}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(c.Root, {
		value: v(r),
		onValueChange: (e) => i(y(e)),
		disabled: l,
		children: [/* @__PURE__ */ s(c.Trigger, {
			className: "input-phone__country",
			"aria-label": h("country", f),
			children: [/* @__PURE__ */ o(c.Value, { children: r ? `+${u(r)}` : p }), /* @__PURE__ */ o(t, {
				name: "chevron",
				className: "input-phone__country-icon",
				size: b
			})]
		}), /* @__PURE__ */ o(c.Portal, {
			container: g,
			children: /* @__PURE__ */ o(c.Positioner, {
				className: "input-phone__country-positioner",
				side: "bottom",
				align: "start",
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ o(c.Popup, {
					className: x,
					children: a.map(({ value: e, label: t }) => /* @__PURE__ */ o(c.Item, {
						value: v(e),
						className: "input-phone__country-item",
						children: /* @__PURE__ */ o(c.ItemText, { children: t })
					}, v(e)))
				})
			})
		})]
	});
}
var f = i(function({ value: e, defaultCountry: t = "ES", placeholder: n, disabled: s, error: c = !1, size: u = "md", id: f, name: p, describedBy: m, "aria-describedby": h, "aria-label": g, autoComplete: _, required: v, readOnly: y, onChange: b, onBlur: x, onFocus: S, countryLabel: C, internationalLabel: w, container: T, className: E }, D) {
	return /* @__PURE__ */ o(l, {
		className: [
			"input-phone",
			c ? "input-phone--error" : "",
			u === "md" ? "" : `input-phone--${u}`,
			E ?? ""
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: t,
		placeholder: n,
		disabled: s,
		readOnly: y,
		required: v,
		autoComplete: _,
		id: f,
		name: p,
		inputComponent: a(() => i(function(e, t) {
			return /* @__PURE__ */ o("input", {
				...e,
				ref: (e) => {
					r(t, e), r(D, e);
				},
				className: "input-phone__number"
			});
		}), [D]),
		countrySelectComponent: d,
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
//#endregion
export { f as InputPhone };
