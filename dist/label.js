import './label.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Label/Label.tsx
var n = e(function({ children: e, hidden: n = !1, className: r, ...i }, a) {
	return /* @__PURE__ */ t("label", {
		ref: a,
		className: [
			"label",
			n ? "visually-hidden" : "",
			r ?? ""
		].filter(Boolean).join(" "),
		...i,
		children: e
	});
});
//#endregion
export { n as Label };
