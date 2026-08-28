'use client';
import './radio.css';
import { n as e } from "./_shared/RadioGroupContext.js";
import { forwardRef as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/atoms/Radio/Radio.tsx
var r = t(function({ size: t, error: r, className: i, ...a }, o) {
	let s = e(), c = t ?? s?.size ?? "md", l = r ?? s?.error ?? !1, u = a.name ?? s?.name, d = a.disabled ?? s?.disabled, f = a.checked ?? (s && a.value !== void 0 ? s.value === a.value : void 0), p = [
		"radio",
		c === "md" ? "" : `radio--${c}`,
		l ? "radio--error" : "",
		i ?? ""
	].filter(Boolean).join(" ");
	function m(e) {
		a.onChange?.(e), s && e.target.checked && s.select(e.target.value);
	}
	return /* @__PURE__ */ n("input", {
		ref: o,
		className: p,
		"aria-invalid": l || void 0,
		...a,
		name: u,
		disabled: d,
		checked: f,
		onChange: s ? m : a.onChange,
		type: "radio"
	});
});
//#endregion
export { r as Radio };
