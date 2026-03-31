'use client';
import './input.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Input/Input.tsx
function t({ type: t = "text", placeholder: n, value: r, defaultValue: i, disabled: a, readOnly: o, size: s = "md", error: c = !1, id: l, name: u, describedBy: d, onChange: f, onBlur: p, onFocus: m }) {
	return /* @__PURE__ */ e("input", {
		className: [
			"input",
			s === "md" ? "" : `input--${s}`,
			c ? "input--error" : ""
		].filter(Boolean).join(" "),
		type: t,
		placeholder: n,
		value: r,
		defaultValue: i,
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
export { t as Input };
