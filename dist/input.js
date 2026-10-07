'use client';
import './input.css';
import { n as e } from "./_shared/env.js";
import { forwardRef as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/atoms/Input/Input.tsx
var r = t(function({ size: t = "md", error: r = !1, className: i, describedBy: a, ariaLabel: o, ...s }, c) {
	return o !== void 0 && e("Input", "ariaLabel", "`aria-label`"), /* @__PURE__ */ n("input", {
		ref: c,
		className: [
			"input",
			t === "md" ? "" : `input--${t}`,
			r ? "input--error" : "",
			i ?? ""
		].filter(Boolean).join(" "),
		"aria-invalid": r || void 0,
		"aria-describedby": a,
		"aria-label": o,
		...s
	});
});
//#endregion
export { r as Input };
