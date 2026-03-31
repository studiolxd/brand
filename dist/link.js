'use client';
import './link.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Link/Link.tsx
function t({ href: t, children: n, external: r = !1, className: i, onClick: a }) {
	return /* @__PURE__ */ e("a", {
		href: t,
		className: i,
		onClick: a,
		...r ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: n
	});
}
//#endregion
export { t as Link };
