'use client';
import './search-form.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { Button as n } from "./button.js";
import { InputField as r } from "./input-field.js";
import { forwardRef as i, useId as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/SearchForm/SearchForm.tsx
var c = i(function({ id: i, name: c = "q", value: l, defaultValue: u, onChange: d, onSubmit: f, action: p, method: m = "get", label: h = "Buscar", labelHidden: g = !0, placeholder: _ = "Buscar…", submitLabel: v = "Buscar", size: y, disabled: b }, x) {
	let S = t(y), C = a(), w = i ?? C;
	function T(e) {
		let t = String(new FormData(e.currentTarget).get(c) ?? "").trim();
		if (f) {
			e.preventDefault(), t && f(t);
			return;
		}
		t || e.preventDefault();
	}
	return /* @__PURE__ */ s("form", {
		className: "search-form",
		role: "search",
		"aria-label": h,
		action: p,
		method: m,
		onSubmit: T,
		children: [/* @__PURE__ */ o(r, {
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
		}), /* @__PURE__ */ o(n, {
			className: "search-form__submit",
			type: "submit",
			variant: "outline",
			size: S,
			iconOnly: !0,
			disabled: b,
			"aria-label": v,
			children: /* @__PURE__ */ o(e, {
				name: "arrow",
				size: S === "sm" ? "sm" : "md"
			})
		})]
	});
});
//#endregion
export { c as SearchForm };
