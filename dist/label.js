import './label.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Label/Label.tsx
var n = t(function({ children: t, hidden: n = !1, className: r, ...i }, a) {
	return /* @__PURE__ */ e("label", {
		ref: a,
		className: [
			"label",
			n ? "visually-hidden" : "",
			r ?? ""
		].filter(Boolean).join(" "),
		...i,
		children: t
	});
});
//#endregion
export { n as Label };
