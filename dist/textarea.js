'use client';
import './textarea.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Textarea/Textarea.tsx
var n = t(function({ size: t = "md", error: n = !1, className: r, describedBy: i, ...a }, o) {
	return /* @__PURE__ */ e("textarea", {
		ref: o,
		className: [
			"textarea",
			t === "md" ? "" : `textarea--${t}`,
			n ? "textarea--error" : "",
			r ?? ""
		].filter(Boolean).join(" "),
		"aria-invalid": n || void 0,
		"aria-describedby": i,
		...a
	});
});
//#endregion
export { n as Textarea };
