import './code.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Code/Code.tsx
var n = e(function({ className: e, children: n, ...r }, i) {
	return /* @__PURE__ */ t("code", {
		ref: i,
		className: ["code", e].filter(Boolean).join(" "),
		...r,
		children: n
	});
});
//#endregion
export { n as Code };
