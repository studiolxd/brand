import './list.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/List/List.tsx
var n = e(function({ type: e = "unordered", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ t(e === "ordered" ? "ol" : "ul", {
		ref: a,
		className: [
			"list",
			`list--${e}`,
			n ?? ""
		].filter(Boolean).join(" "),
		...i,
		children: r
	});
});
//#endregion
export { n as List };
