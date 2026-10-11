'use client';
import './input.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Input/Input.tsx
var n = e(function({ size: e = "md", error: n = !1, className: r, "aria-describedby": i, ...a }, o) {
	return /* @__PURE__ */ t("input", {
		ref: o,
		className: [
			"input",
			e === "md" ? "" : `input--${e}`,
			n ? "input--error" : "",
			r ?? ""
		].filter(Boolean).join(" "),
		"aria-invalid": n || void 0,
		"aria-describedby": i,
		...a
	});
});
//#endregion
export { n as Input };
