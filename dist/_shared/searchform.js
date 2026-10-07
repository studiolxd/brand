import '../searchform.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { n } from "./form-size.js";
import { t as r } from "./inputfield.js";
import { forwardRef as i, useId as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/searchForm.ts
var c = {
	label: "Buscar",
	placeholder: "Buscar…",
	submit: "Buscar"
}, l = i(function({ id: i, className: l, name: u = "q", value: d, defaultValue: f, onChange: p, onSubmit: m, action: h, method: g = "get", label: _, labelHidden: v = !0, placeholder: y, submitLabel: b, size: x, disabled: S, describedBy: C, controls: w }, T) {
	let E = e("searchForm", c), D = n(x === "xl" ? void 0 : x), O = x === "xl" ? "xl" : D, k = O === "xl" ? "lg" : O, A = a(), j = i ?? A;
	function M(e) {
		let t = String(new FormData(e.currentTarget).get(u) ?? "").trim();
		if (m) {
			e.preventDefault(), t && m(t);
			return;
		}
		t || e.preventDefault();
	}
	return /* @__PURE__ */ s("form", {
		className: [
			"search-form",
			O === "md" ? "" : `search-form--${O}`,
			l
		].filter(Boolean).join(" "),
		role: "search",
		"aria-label": E("label", _),
		action: h,
		method: g,
		onSubmit: M,
		children: [/* @__PURE__ */ o(r, {
			ref: T,
			className: "search-form__field",
			id: j,
			name: u,
			label: E("label", _),
			labelHidden: v,
			type: "text",
			autoComplete: "off",
			enterKeyHint: "search",
			placeholder: E("placeholder", y),
			value: d,
			defaultValue: f,
			disabled: S,
			size: k,
			onChange: p,
			"aria-describedby": C,
			...w ? { "aria-controls": w } : {}
		}), /* @__PURE__ */ o("button", {
			className: "search-form__submit",
			type: "submit",
			disabled: S,
			"aria-label": E("submit", b),
			children: /* @__PURE__ */ o(t, {
				name: "arrow",
				className: "search-form__submit-glyph"
			})
		})]
	});
});
//#endregion
export { l as t };
