import './heading.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Heading/Heading.tsx
var n = t(function({ level: t = 2, size: n, className: r, children: i, ...a }, o) {
	return /* @__PURE__ */ e(`h${t}`, {
		ref: o,
		className: [
			"heading",
			`heading--${t}`,
			n && `heading--size-${n}`,
			r
		].filter(Boolean).join(" "),
		...a,
		children: i
	});
});
//#endregion
export { n as Heading };
