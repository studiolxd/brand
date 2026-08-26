'use client';
import './link.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Link/Link.tsx
var n = t(function({ href: t, children: n, external: r = !1, className: i, ...a }, o) {
	return /* @__PURE__ */ e("a", {
		ref: o,
		href: t,
		className: i,
		...r ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		...a,
		children: n
	});
});
//#endregion
export { n as Link };
