import './text.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Text/Text.tsx
var n = e(function({ as: e = "span", tone: n = "default", strikethrough: r = !1, className: i, children: a, ...o }, s) {
	return /* @__PURE__ */ t(e, {
		ref: s,
		className: [
			"text",
			r || e === "del" || e === "s" ? "text--strikethrough" : "",
			n === "default" ? "" : `text--${n}`,
			i ?? ""
		].filter(Boolean).join(" "),
		...o,
		children: a
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
