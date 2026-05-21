'use client';
import './input.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Input/Input.tsx
function t({ type: t = "text", placeholder: n, value: r, defaultValue: i, disabled: a, readOnly: o, size: s = "md", error: c = !1, id: l, name: u, describedBy: d, inputMode: f, pattern: p, maxLength: m, autoComplete: h, ariaLabel: g, onChange: _, onBlur: v, onFocus: y, onKeyDown: b, onPaste: x }) {
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
		"aria-label": g,
		inputMode: f,
		pattern: p,
		maxLength: m,
		autoComplete: h,
		onChange: _,
		onBlur: v,
		onFocus: y,
		onKeyDown: b,
		onPaste: x
	});
}
//#endregion
export { t as Input };
