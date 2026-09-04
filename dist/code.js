import './code.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Code/Code.tsx
var n = t(function({ className: t, children: n, ...r }, i) {
	return /* @__PURE__ */ e("code", {
		ref: i,
		className: ["code", t].filter(Boolean).join(" "),
		...r,
		children: n
	});
});
//#endregion
export { n as Code };
