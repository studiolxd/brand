'use client';
import './textarea.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Textarea/Textarea.tsx
var n = e(function({ size: e = "md", error: n = !1, bare: r = !1, className: i, describedBy: a, ...o }, s) {
	return /* @__PURE__ */ t("textarea", {
		ref: s,
		className: [
			"textarea",
			e === "md" ? "" : `textarea--${e}`,
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
