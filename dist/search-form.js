'use client';
import './search-form.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { Button as n } from "./button.js";
import { InputField as r } from "./input-field.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/SearchForm/SearchForm.tsx
var c = o(function({ id: o, name: c = "q", value: l, defaultValue: u, onChange: d, onSubmit: f, action: p, method: m = "get", label: h = "Buscar", labelHidden: g = !0, placeholder: _ = "Buscar…", submitLabel: v = "Buscar", size: y, disabled: b }, x) {
	let S = t(y), C = s(), w = o ?? C;
	function T(e) {
		let t = String(new FormData(e.currentTarget).get(c) ?? "").trim();
		if (f) {
			e.preventDefault(), t && f(t);
			return;
		}
		t || e.preventDefault();
	}
	return /* @__PURE__ */ a("form", {
		className: "search-form",
		role: "search",
		"aria-label": h,
		action: p,
		method: m,
		onSubmit: T,
		children: [/* @__PURE__ */ i(r, {
			ref: x,
			className: "search-form__field",
			id: w,
			name: c,
			label: h,
			labelHidden: g,
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search",
			placeholder: _,
			value: l,
			defaultValue: u,
			disabled: b,
			size: S,
			onChange: d
		}), /* @__PURE__ */ i(n, {
			className: "search-form__submit",
			type: "submit",
			variant: "outline",
			size: S,
			iconOnly: !0,
			disabled: b,
			"aria-label": v,
			children: /* @__PURE__ */ i(e, {
				name: "arrow",
				size: S === "sm" ? "sm" : "md"
			})
		})]
	});
});
//#endregion
export { c as SearchForm };
