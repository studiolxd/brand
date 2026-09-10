import './error-text.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/ErrorText/ErrorText.tsx
var n = t(function({ as: t = "p", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ e(t, {
		ref: a,
		role: "alert",
		className: ["error-text", n].filter(Boolean).join(" "),
		...i,
		children: r
	});
});
//#endregion
export { n as ErrorText };
