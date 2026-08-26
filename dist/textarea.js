'use client';
import './textarea.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Textarea/Textarea.tsx
var n = e(function({ size: e = "md", error: n = !1, className: r, describedBy: i, ...a }, o) {
	return /* @__PURE__ */ t("textarea", {
		ref: o,
		className: [
			"textarea",
			e === "md" ? "" : `textarea--${e}`,
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
