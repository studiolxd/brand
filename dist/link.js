'use client';
import './link.css';
import { Icon as e } from "./icon.js";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i } from "react";
import { useRender as a } from "@base-ui-components/react/use-render";
//#region src/stories/atoms/Link/Link.tsx
var o = i(function({ href: i, children: o, external: s = !1, icon: c, iconPosition: l = "start", render: u, className: d, ...f }, p) {
	let m = [c ? "link--with-icon" : "", d].filter(Boolean).join(" ") || void 0, h = c ? /* @__PURE__ */ n(e, {
		name: c,
		size: "sm",
		className: "link__icon"
	}) : null, g = /* @__PURE__ */ r(t, { children: [
		l === "start" && h,
		o,
		l === "end" && h
	] });
	return a({
		render: u,
		ref: p,
		enabled: u !== void 0,
		props: {
			className: m,
			...f,
			children: g
		}
	}) || /* @__PURE__ */ n("a", {
		ref: p,
		href: i,
		className: m,
		...s ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		...f,
		children: g
	});
});
//#endregion
export { o as Link };
