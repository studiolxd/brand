import './paragraph.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Paragraph/Paragraph.tsx
var n = e(function({ size: e = "default", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ t("p", {
		ref: a,
		className: [
			"paragraph",
			e === "default" ? "" : `paragraph--${e}`,
			n
		].filter(Boolean).join(" "),
		...i,
		children: r
	});
});
//#endregion
export { n as Paragraph };
