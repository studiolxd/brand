'use client';
import './textarea.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Textarea/Textarea.tsx
var n = t(function({ size: t = "md", error: n = !1, bare: r = !1, className: i, describedBy: a, ...o }, s) {
	return /* @__PURE__ */ e("textarea", {
		ref: s,
		className: [
			"textarea",
			t === "md" ? "" : `textarea--${t}`,
			n ? "textarea--error" : "",
			r ? "textarea--bare" : "",
			i ?? ""
		].filter(Boolean).join(" "),
		"aria-invalid": n || void 0,
		"aria-describedby": a,
		...o
	});
});
//#endregion
export { n as Textarea };
