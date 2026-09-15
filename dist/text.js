import './text.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Text/Text.tsx
var n = e(function({ as: e = "span", tone: n = "default", className: r, children: i, ...a }, o) {
	return /* @__PURE__ */ t(e, {
		ref: o,
		className: [
			"text",
			n === "default" ? "" : `text--${n}`,
			r ?? ""
		].filter(Boolean).join(" "),
		...a,
		children: i
	});
}), r = e(function({ className: e, ...n }, r) {
	return /* @__PURE__ */ t("br", {
		ref: r,
		className: ["text__break", e ?? ""].filter(Boolean).join(" "),
		...n
	});
});
//#endregion
export { r as LineBreak, n as Text };
