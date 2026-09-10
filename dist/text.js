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
}), r = t(function({ className: t, ...n }, r) {
	return /* @__PURE__ */ e("br", {
		ref: r,
		className: ["text__break", t ?? ""].filter(Boolean).join(" "),
		...n
	});
});
//#endregion
export { r as LineBreak, n as Text };
