'use client';
import './link.css';
import { Icon as e } from "./icon.js";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i } from "react";
import { useRender as a } from "@base-ui-components/react/use-render";
//#region src/stories/atoms/Link/Link.tsx
var o = i(function({ href: i, children: o, external: s = !1, tone: c = "accent", icon: l, iconPosition: u = "start", render: d, className: f, ...p }, m) {
	let h = [
		c === "ink" ? "link--ink" : "",
		l ? "link--with-icon" : "",
		f
	].filter(Boolean).join(" ") || void 0, g = l ? /* @__PURE__ */ n(e, {
		name: l,
		size: "sm",
		className: "link__icon"
	}) : null, _ = /* @__PURE__ */ r(t, { children: [
		u === "start" && g,
		o,
		u === "end" && g
	] });
	return a({
		render: d,
		ref: m,
		enabled: d !== void 0,
		props: {
			className: h,
			...p,
			children: _
		}
	}) || /* @__PURE__ */ n("a", {
		ref: m,
		href: i,
		className: h,
		...s ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		...p,
		children: _
	});
});
//#endregion
export { o as Link };
