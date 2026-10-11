import '../inputphone.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { n } from "./portal-container.js";
import { t as r } from "./assign-ref.js";
import { forwardRef as i, useMemo as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { Select as c } from "@base-ui/react/select";
import l, { getCountryCallingCode as u } from "react-phone-number-input";
//#region src/stories/messages/es/inputPhone.ts
var d = { country: "País" };
//#endregion
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function f({ value: r, onChange: i, options: a, disabled: l, size: f = "md", countryLabel: p, internationalLabel: m = "🌐", container: h }) {
	let g = e("inputPhone", d), _ = n(h), v = "__intl__", y = (e) => e ?? v, b = (e) => e === v ? void 0 : e, x = f === "lg" ? "md" : "sm", S = ["input-phone__country-content", f === "md" ? "" : `input-phone__country-content--${f}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(c.Root, {
		value: y(r),
		onValueChange: (e) => i(b(e)),
		disabled: l,
		children: [/* @__PURE__ */ s(c.Trigger, {
			className: "input-phone__country",
			"aria-label": g("country", p),
			children: [/* @__PURE__ */ o(c.Value, { children: r ? `+${u(r)}` : m }), /* @__PURE__ */ o(t, {
				name: "chevron",
				className: "input-phone__country-icon",
				size: x
			})]
		}), /* @__PURE__ */ o(c.Portal, {
			container: _,
			children: /* @__PURE__ */ o(c.Positioner, {
				className: "input-phone__country-positioner",
				side: "bottom",
				align: "start",
				alignItemWithTrigger: !1,
				children: /* @__PURE__ */ o(c.Popup, {
					className: S,
					children: a.map(({ value: e, label: t }) => /* @__PURE__ */ o(c.Item, {
						value: y(e),
						className: "input-phone__country-item",
						children: /* @__PURE__ */ o(c.ItemText, { children: t })
					}, y(e)))
				})
			})
		})]
	});
}
var p = i(function({ value: e, defaultCountry: t = "ES", placeholder: n, disabled: s, error: c = !1, size: u = "md", id: d, name: p, "aria-describedby": m, "aria-label": h, autoComplete: g, required: _, readOnly: v, onChange: y, onBlur: b, onFocus: x, countryLabel: S, internationalLabel: C, container: w, className: T }, E) {
	return /* @__PURE__ */ o(l, {
		className: [
			"input-phone",
			c ? "input-phone--error" : "",
			u === "md" ? "" : `input-phone--${u}`,
			T ?? ""
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: t,
		placeholder: n,
		disabled: s,
		readOnly: v,
		required: _,
		autoComplete: g,
		id: d,
		name: p,
		inputComponent: a(() => i(function(e, t) {
			return /* @__PURE__ */ o("input", {
				...e,
				ref: (e) => {
					r(t, e), r(E, e);
				},
				className: "input-phone__number"
			});
		}), [E]),
		countrySelectComponent: f,
		countrySelectProps: {
			size: u,
			countryLabel: S,
			internationalLabel: C,
			container: w
		},
		onChange: (e) => y?.(e),
		onBlur: b,
		onFocus: x,
		numberInputProps: {
			"aria-describedby": m,
			"aria-label": h,
			"aria-invalid": c || void 0
		}
	});
});
//#endregion
export { p as t };
