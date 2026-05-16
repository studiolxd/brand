'use client';
import './textarea.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Textarea/Textarea.tsx
function t({ placeholder: t, value: n, defaultValue: r, rows: i, disabled: a, readOnly: o, size: s = "md", error: c = !1, id: l, name: u, describedBy: d, onChange: f, onBlur: p, onFocus: m }) {
	return /* @__PURE__ */ e("textarea", {
		className: [
			"textarea",
			s === "md" ? "" : `textarea--${s}`,
			c ? "textarea--error" : ""
		].filter(Boolean).join(" "),
		placeholder: t,
		value: n,
		defaultValue: r,
		rows: i,
		disabled: a,
		readOnly: o,
		id: l,
		name: u,
		"aria-invalid": c || void 0,
		"aria-describedby": d,
		onChange: f,
		onBlur: p,
		onFocus: m
	});
}
//#endregion
export { t as Textarea };
