'use client';
import './button.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
import { Slot as n } from "@radix-ui/react-slot";
//#region src/stories/atoms/Button/Button.tsx
var r = t(function({ variant: t = "primary", destructive: r = !1, size: i = "md", block: a = !1, iconOnly: o = !1, children: s, type: c = "button", disabled: l, onClick: u, href: d, external: f = !1, asChild: p = !1, className: m, ...h }, g) {
	let _ = [
		"button",
		`button--${t}`,
		r ? "button--destructive-intent" : "",
		i === "md" ? "" : `button--${i}`,
		a ? "button--block" : "",
		o ? "button--icon-only" : "",
		m ?? ""
	].filter(Boolean).join(" ");
	return p ? /* @__PURE__ */ e(n, {
		ref: g,
		className: _,
		onClick: u,
		...h,
		children: s
	}) : d === void 0 ? /* @__PURE__ */ e("button", {
		ref: g,
		className: _,
		type: c,
		disabled: l,
		onClick: u,
		...h,
		children: s
	}) : /* @__PURE__ */ e("a", {
		ref: g,
		className: _,
		href: l ? void 0 : d,
		"aria-disabled": l ? !0 : void 0,
		onClick: u,
		...f ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		...h,
		children: s
	});
});
//#endregion
export { r as Button };
