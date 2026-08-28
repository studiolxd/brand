'use client';
import './link.css';
import { Icon as e } from "./icon.js";
import { forwardRef as t } from "react";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { useRender as a } from "@base-ui/react/use-render";
//#region src/stories/atoms/Link/Link.tsx
var o = t(function({ href: t, children: o, external: s = !1, tone: c = "accent", icon: l, iconPosition: u = "start", render: d, className: f, ...p }, m) {
	let h = [
		c === "ink" ? "link--ink" : "",
		l ? "link--with-icon" : "",
		f
	].filter(Boolean).join(" ") || void 0, g = l ? /* @__PURE__ */ r(e, {
		name: l,
		size: "sm",
		className: "link__icon"
	}) : null, _ = /* @__PURE__ */ i(n, { children: [
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
	}) || /* @__PURE__ */ r("a", {
		ref: m,
		href: t,
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
