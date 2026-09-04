import './text.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Text/Text.tsx
var n = t(function({ as: t = "span", tone: n = "default", className: r, children: i, ...a }, o) {
	return /* @__PURE__ */ e(t, {
		ref: o,
		className: [
			"text",
			n === "default" ? "" : `text--${n}`,
			r ?? ""
		].filter(Boolean).join(" "),
		...a,
		children: i
	});
});
//#endregion
export { n as Text };
