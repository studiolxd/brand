import './label.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Label/Label.tsx
var n = t(function({ children: t, hidden: n = !1, size: r = "md", className: i, ...a }, o) {
	return /* @__PURE__ */ e("label", {
		ref: o,
		className: [
			"label",
			n ? "visually-hidden" : "",
			r === "md" ? "" : `label--${r}`,
			i ?? ""
		].filter(Boolean).join(" "),
		...a,
		children: t
	});
});
//#endregion
export { n as Label };
