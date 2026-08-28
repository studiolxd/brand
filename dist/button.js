'use client';
import './button.css';
import { n as e } from "./_shared/form-size.js";
import { forwardRef as t } from "react";
import { jsx as n } from "react/jsx-runtime";
import { useRender as r } from "@base-ui-components/react/use-render";
//#region src/stories/atoms/Button/Button.tsx
var i = t(function({ variant: t = "primary", destructive: i = !1, size: a, block: o = !1, iconOnly: s = !1, children: c, type: l = "button", disabled: u, onClick: d, href: f, external: p = !1, render: m, className: h, ...g }, _) {
	let v = e(a), y = [
		"button",
		`button--${t}`,
		i ? "button--destructive-intent" : "",
		v === "md" ? "" : `button--${v}`,
		o ? "button--block" : "",
		s ? "button--icon-only" : "",
		h ?? ""
	].filter(Boolean).join(" ");
	return r({
		render: m,
		ref: _,
		enabled: m !== void 0,
		props: {
			className: y,
			onClick: d,
			...g,
			children: c
		}
	}) || (f === void 0 ? /* @__PURE__ */ n("button", {
		ref: _,
		className: y,
		type: l,
		disabled: u,
		onClick: d,
		...g,
		children: c
	}) : /* @__PURE__ */ n("a", {
		ref: _,
		className: y,
		href: u ? void 0 : f,
		"aria-disabled": u ? !0 : void 0,
		onClick: d,
		...p ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		...g,
		children: c
	}));
});
//#endregion
export { i as Button };
