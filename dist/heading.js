import './heading.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Heading/Heading.tsx
var n = e(function({ level: e = 2, size: n, className: r, children: i, ...a }, o) {
	return /* @__PURE__ */ t(`h${e}`, {
		ref: o,
		className: [
			"heading",
			`heading--${e}`,
			n && `heading--size-${n}`,
			r
		].filter(Boolean).join(" "),
		...a,
		children: i
	});
});
//#endregion
export { n as Heading };
