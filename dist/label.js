import './label.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Label/Label.tsx
var n = e(function({ children: e, hidden: n = !1, size: r = "md", className: i, ...a }, o) {
	return /* @__PURE__ */ t("label", {
		ref: o,
		className: [
			"label",
			n ? "visually-hidden" : "",
			r === "md" ? "" : `label--${r}`,
			i ?? ""
		].filter(Boolean).join(" "),
		...a,
		children: e
	});
});
//#endregion
export { n as Label };
