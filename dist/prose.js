import './prose.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/molecules/Prose/Prose.tsx
var n = e(function({ as: e = "div", size: n = "md", measure: r = !0, className: i, children: a, html: o, ...s }, c) {
	let l = [
		"prose",
		n === "md" ? "" : `prose--${n}`,
		r ? "" : "prose--full",
		i ?? ""
	].filter(Boolean).join(" ");
	return o === void 0 ? /* @__PURE__ */ t(e, {
		ref: c,
		className: l,
		...s,
		children: a
	}) : /* @__PURE__ */ t(e, {
		ref: c,
		className: l,
		...s,
		dangerouslySetInnerHTML: { __html: o }
	});
});
//#endregion
export { n as Prose };
