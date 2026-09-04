import './prose.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/molecules/Prose/Prose.tsx
var n = t(function({ as: t = "div", size: n = "md", measure: r = !0, className: i, children: a, ...o }, s) {
	return /* @__PURE__ */ e(t, {
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
