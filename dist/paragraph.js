import './paragraph.css';
import { n as e } from "./_shared/env.js";
import { forwardRef as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/atoms/Paragraph/Paragraph.tsx
var r = {
	small: "sm",
	default: "md",
	large: "lg"
}, i = t(function({ size: t = "md", className: i, children: a, ...o }, s) {
	let c = t;
	return t in r && (c = r[t], e("Paragraph", `size="${t}"`, `\`size="${c}"\``)), /* @__PURE__ */ n("p", {
		ref: s,
		className: [
			"paragraph",
			c === "md" ? "" : `paragraph--${c}`,
			i
		].filter(Boolean).join(" "),
		...o,
		children: a
	});
});
//#endregion
export { i as Paragraph };
