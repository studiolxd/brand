'use client';
import './search-form.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/form-size.js";
import { InputField as r } from "./input-field.js";
import { forwardRef as i, useId as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/SearchForm/SearchForm.tsx
var c = i(function({ id: i, className: c, name: l = "q", value: u, defaultValue: d, onChange: f, onSubmit: p, action: m, method: h = "get", label: g, labelHidden: _ = !0, placeholder: v, submitLabel: y, size: b, disabled: x, describedBy: S, controls: C }, w) {
	let T = e("searchForm"), E = n(b === "xl" ? void 0 : b), D = b === "xl" ? "xl" : E, O = D === "xl" ? "lg" : D, k = a(), A = i ?? k;
	function j(e) {
		let t = String(new FormData(e.currentTarget).get(l) ?? "").trim();
		if (p) {
			e.preventDefault(), t && p(t);
			return;
		}
		t || e.preventDefault();
	}
	return /* @__PURE__ */ s("form", {
		className: [
			"search-form",
			D === "md" ? "" : `search-form--${D}`,
			c
		].filter(Boolean).join(" "),
		role: "search",
		"aria-label": T("label", g),
		action: m,
		method: h,
		onSubmit: j,
		children: [/* @__PURE__ */ o(r, {
			ref: w,
			className: "search-form__field",
			id: A,
			name: l,
			label: T("label", g),
			labelHidden: _,
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search",
			placeholder: T("placeholder", v),
			value: u,
			defaultValue: d,
			disabled: x,
			size: O,
			onChange: f,
			"aria-describedby": S,
			...C ? { "aria-controls": C } : {}
		}), /* @__PURE__ */ o("button", {
			className: "search-form__submit",
			type: "submit",
			disabled: x,
			"aria-label": T("submit", y),
			children: /* @__PURE__ */ o(t, {
				name: "arrow",
				className: "search-form__submit-glyph"
			})
		})]
	});
});
//#endregion
export { c as SearchForm };
