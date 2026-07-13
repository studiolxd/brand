import './tag.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Tag/Tag.tsx
var n = t(function({ variant: t = "default", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ e("span", {
		ref: a,
		className: [
			"tag",
			`tag--${t}`,
			n ?? ""
		].filter(Boolean).join(" "),
		...i,
		children: r
	});
});
//#endregion
export { n as Tag };
