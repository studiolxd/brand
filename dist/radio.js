'use client';
import './radio.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Radio/Radio.tsx
var n = t(function({ size: t = "md", error: n = !1, className: r, ...i }, a) {
	return /* @__PURE__ */ e("input", {
		ref: a,
		className: [
			"radio",
			t === "md" ? "" : `radio--${t}`,
			n ? "radio--error" : "",
			r ?? ""
		].filter(Boolean).join(" "),
		"aria-invalid": n || void 0,
		...i,
		type: "radio"
	});
});
//#endregion
export { n as Radio };
