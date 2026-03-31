'use client';
import './textarea.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Textarea/Textarea.tsx
function t({ placeholder: t, value: n, defaultValue: r, rows: i, disabled: a, readOnly: o, error: s = !1, id: c, name: l, describedBy: u, onChange: d, onBlur: f, onFocus: p }) {
	return /* @__PURE__ */ e("textarea", {
		className: ["textarea", s ? "textarea--error" : ""].filter(Boolean).join(" "),
		placeholder: t,
		value: n,
		defaultValue: r,
		rows: i,
		disabled: a,
		readOnly: o,
		id: c,
		name: l,
		"aria-invalid": s || void 0,
		"aria-describedby": u,
		onChange: d,
		onBlur: f,
		onFocus: p
	});
}
//#endregion
export { t as Textarea };
