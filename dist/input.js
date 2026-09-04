'use client';
import './input.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Input/Input.tsx
var n = t(function({ size: t = "md", error: n = !1, className: r, describedBy: i, ariaLabel: a, ...o }, s) {
	return /* @__PURE__ */ e("input", {
		ref: s,
		className: [
			"input",
			t === "md" ? "" : `input--${t}`,
			n ? "input--error" : "",
			r ?? ""
		].filter(Boolean).join(" "),
		"aria-invalid": n || void 0,
		"aria-describedby": i,
		"aria-label": a,
		...o
	});
});
//#endregion
export { n as Input };
