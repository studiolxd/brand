'use client';
import './search-form.css';
import { Icon as e } from "./icon.js";
import { n as t } from "./_shared/form-size.js";
import { InputField as n } from "./input-field.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/SearchForm/SearchForm.tsx
var s = r(function({ id: r, name: s = "q", value: c, defaultValue: l, onChange: u, onSubmit: d, action: f, method: p = "get", label: m = "Buscar", labelHidden: h = !0, placeholder: g = "Buscar…", submitLabel: _ = "Buscar", size: v, disabled: y }, b) {
	let x = t(v), S = i(), C = r ?? S;
	function w(e) {
		let t = String(new FormData(e.currentTarget).get(s) ?? "").trim();
		if (d) {
			e.preventDefault(), t && d(t);
			return;
		}
		t || e.preventDefault();
	}
	return /* @__PURE__ */ o("form", {
		className: ["search-form", x === "md" ? "" : `search-form--${x}`].filter(Boolean).join(" "),
		role: "search",
		"aria-label": m,
		action: f,
		method: p,
		onSubmit: w,
		children: [/* @__PURE__ */ a(n, {
			ref: b,
			className: "search-form__field",
			id: C,
			name: s,
			label: m,
			labelHidden: h,
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search",
			placeholder: g,
			value: c,
			defaultValue: l,
			disabled: y,
			size: x,
			onChange: u
		}), /* @__PURE__ */ a("button", {
			className: "search-form__submit",
			type: "submit",
			disabled: y,
			"aria-label": _,
			children: /* @__PURE__ */ a(e, {
				name: "arrow",
				className: "search-form__submit-glyph"
			})
		})]
	});
});
//#endregion
export { s as SearchForm };
