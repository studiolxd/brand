import './error-text.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/ErrorText/ErrorText.tsx
var n = e(function({ as: e = "p", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ t(e, {
		ref: a,
		role: "alert",
		className: ["error-text", n].filter(Boolean).join(" "),
		...i,
		children: r
	});
});
//#endregion
export { n as ErrorText };
