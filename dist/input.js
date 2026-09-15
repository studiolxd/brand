'use client';
import './input.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Input/Input.tsx
var n = e(function({ size: e = "md", error: n = !1, className: r, describedBy: i, ariaLabel: a, ...o }, s) {
	return /* @__PURE__ */ t("input", {
		ref: s,
		className: [
			"input",
			e === "md" ? "" : `input--${e}`,
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
