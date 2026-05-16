'use client';
import './button.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
import { Slot as n } from "@radix-ui/react-slot";
//#region src/stories/atoms/Button/Button.tsx
var r = t(function({ variant: t = "primary", destructive: r = !1, size: i = "md", block: a = !1, children: o, type: s = "button", disabled: c, onClick: l, href: u, external: d = !1, asChild: f = !1 }, p) {
	let m = [
		"button",
		`button--${t}`,
		r ? "button--destructive-intent" : "",
		i === "md" ? "" : `button--${i}`,
		a ? "button--block" : ""
	].filter(Boolean).join(" ");
	return f ? /* @__PURE__ */ e(n, {
		ref: p,
		className: m,
		onClick: l,
		children: o
	}) : u === void 0 ? /* @__PURE__ */ e("button", {
		ref: p,
		className: m,
		type: s,
		disabled: c,
		onClick: l,
		children: o
	}) : /* @__PURE__ */ e("a", {
		ref: p,
		className: m,
		href: c ? void 0 : u,
		"aria-disabled": c ? !0 : void 0,
		onClick: l,
		...d ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: o
	});
});
//#endregion
export { r as Button };
