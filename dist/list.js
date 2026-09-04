import './list.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/List/List.tsx
var n = t(function({ type: t = "unordered", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ e(t === "ordered" ? "ol" : "ul", {
		ref: a,
		className: [
			"list",
			`list--${t}`,
			n ?? ""
		].filter(Boolean).join(" "),
		...i,
		children: r
	});
});
//#endregion
export { n as List };
