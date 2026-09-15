'use client';
import './button.css';
import { n as e } from "./_shared/form-size.js";
import { forwardRef as t } from "react";
import { jsx as n } from "react/jsx-runtime";
import { useRender as r } from "@base-ui/react/use-render";
//#region src/stories/atoms/Button/Button.tsx
var i = t(function({ variant: t = "primary", tone: i = "accent", destructive: a = !1, size: o, block: s = !1, iconOnly: c = !1, children: l, type: u = "button", disabled: d, onClick: f, href: p, external: m = !1, render: h, className: g, ..._ }, v) {
	let y = e(o), b = [
		"button",
		`button--${t}`,
		t === "text" && i === "ink" ? "button--ink" : "",
		a ? "button--destructive-intent" : "",
		y === "md" ? "" : `button--${y}`,
		s === "mobile" ? "button--block-mobile" : s ? "button--block" : "",
		c ? "button--icon-only" : "",
		g ?? ""
	].filter(Boolean).join(" "), x = (e) => {
		if (d) {
			e.preventDefault(), e.stopPropagation();
			return;
		}
		f?.(e);
	};
	return r({
		render: h,
		ref: v,
		enabled: h !== void 0,
		props: {
			className: b,
			"aria-disabled": d ? !0 : void 0,
			onClick: x,
			..._,
			children: l
		}
	}) || (p === void 0 ? /* @__PURE__ */ n("button", {
		ref: v,
		className: b,
		type: u,
		disabled: d,
		onClick: f,
		..._,
		children: l
	}) : /* @__PURE__ */ n("a", {
		ref: v,
		className: b,
		href: d ? void 0 : p,
		"aria-disabled": d ? !0 : void 0,
		role: d ? "link" : void 0,
		onClick: x,
		...m ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		..._,
		children: l
	}));
});
//#endregion
export { i as Button };
