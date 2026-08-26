'use client';
import './radio.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Radio/Radio.tsx
var n = e(function({ size: e = "md", className: n, ...r }, i) {
	return /* @__PURE__ */ t("input", {
		ref: i,
		className: [
			"radio",
			e === "md" ? "" : `radio--${e}`,
			n ?? ""
		].filter(Boolean).join(" "),
		...r,
		type: "radio"
	});
});
//#endregion
export { n as Radio };
