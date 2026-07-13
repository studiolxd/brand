'use client';
import './radio.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Radio/Radio.tsx
var n = t(function({ size: t = "md", className: n, ...r }, i) {
	return /* @__PURE__ */ e("input", {
		ref: i,
		className: [
			"radio",
			t === "md" ? "" : `radio--${t}`,
			n ?? ""
		].filter(Boolean).join(" "),
		...r,
		type: "radio"
	});
});
//#endregion
export { n as Radio };
