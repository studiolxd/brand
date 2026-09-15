import './tag.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Tag/Tag.tsx
var n = e(function({ variant: e = "neutral", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ t("span", {
		ref: a,
		className: [
			"tag",
			`tag--${e}`,
			n ?? ""
		].filter(Boolean).join(" "),
		...i,
		children: r
	});
});
//#endregion
export { n as Tag };
