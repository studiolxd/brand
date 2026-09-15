'use client';
import './search-form.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/form-size.js";
import { InputField as r } from "./input-field.js";
import { forwardRef as i, useId as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/SearchForm/SearchForm.tsx
var c = i(function({ id: i, name: c = "q", value: l, defaultValue: u, onChange: d, onSubmit: f, action: p, method: m = "get", label: h, labelHidden: g = !0, placeholder: _, submitLabel: v, size: y, disabled: b }, x) {
	let S = e("searchForm"), C = n(y === "xl" ? void 0 : y), w = y === "xl" ? "xl" : C, T = w === "xl" ? "lg" : w, E = a(), D = i ?? E;
	function O(e) {
		let t = String(new FormData(e.currentTarget).get(c) ?? "").trim();
		if (f) {
			e.preventDefault(), t && f(t);
			return;
		}
		t || e.preventDefault();
	}
	return /* @__PURE__ */ s("form", {
		className: ["search-form", w === "md" ? "" : `search-form--${w}`].filter(Boolean).join(" "),
		role: "search",
		"aria-label": S("label", h),
		action: p,
		method: m,
		onSubmit: O,
		children: [/* @__PURE__ */ o(r, {
			ref: x,
			className: "search-form__field",
			id: D,
			name: c,
			label: S("label", h),
			labelHidden: g,
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search",
			placeholder: S("placeholder", _),
			value: l,
			defaultValue: u,
			disabled: b,
			size: T,
			onChange: d
		}), /* @__PURE__ */ o("button", {
			className: "search-form__submit",
			type: "submit",
			disabled: b,
			"aria-label": S("submit", v),
			children: /* @__PURE__ */ o(t, {
				name: "arrow",
				className: "search-form__submit-glyph"
			})
		})]
	});
});
//#endregion
export { c as SearchForm };
