import './paragraph.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Paragraph/Paragraph.tsx
var n = t(function({ size: t = "default", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ e("p", {
		ref: a,
		className: [
			"paragraph",
			t === "default" ? "" : `paragraph--${t}`,
			n
		].filter(Boolean).join(" "),
		...i,
		children: r
	});
});
//#endregion
export { n as Paragraph };
