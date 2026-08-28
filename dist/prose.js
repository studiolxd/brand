import './prose.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/molecules/Prose/Prose.tsx
var n = e(function({ as: e = "div", size: n = "md", measure: r = !0, className: i, children: a, ...o }, s) {
	return /* @__PURE__ */ t(e, {
		ref: s,
		className: [
			"prose",
			n === "md" ? "" : `prose--${n}`,
			r ? "" : "prose--full",
			i ?? ""
		].filter(Boolean).join(" "),
		...o,
		children: a
	});
});
//#endregion
export { n as Prose };
