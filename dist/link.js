'use client';
import './link.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Link/Link.tsx
var n = e(function({ href: e, children: n, external: r = !1, className: i, ...a }, o) {
	return /* @__PURE__ */ t("a", {
		ref: o,
		href: e,
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
