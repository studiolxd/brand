'use client';
import './button.css';
import { Spinner as e } from "./spinner.js";
import { n as t } from "./_shared/form-size.js";
import { forwardRef as n } from "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { useRender as o } from "@base-ui/react/use-render";
//#region src/stories/atoms/Button/Button.tsx
var s = n(function({ variant: n = "primary", tone: s = "accent", destructive: c = !1, size: l, block: u = !1, iconOnly: d = !1, children: f, type: p = "button", disabled: m, loading: h = !1, onClick: g, href: _, external: v = !1, render: y, className: b, ...x }, S) {
	let C = t(l), w = [
		"button",
		`button--${n}`,
		n === "text" && s === "ink" ? "button--ink" : "",
		c ? "button--destructive-intent" : "",
		C === "md" ? "" : `button--${C}`,
		u === "mobile" ? "button--block-mobile" : u ? "button--block" : "",
		d ? "button--icon-only" : "",
		h ? "button--loading" : "",
		b ?? ""
	].filter(Boolean).join(" "), T = !!m || h, E = (e) => {
		if (T) {
			e.preventDefault(), e.stopPropagation();
			return;
		}
		g?.(e);
	}, D = h ? /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i("span", {
		className: "button__spinner",
		children: /* @__PURE__ */ i(e, {
			size: "sm",
			"aria-hidden": !0
		})
	}), d ? null : f] }) : f;
	return o({
		render: y,
		ref: S,
		enabled: y !== void 0,
		props: {
			className: w,
			"aria-disabled": T ? !0 : void 0,
			"aria-busy": h ? !0 : void 0,
			onClick: E,
			...x,
			children: D
		}
	}) || (_ === void 0 ? /* @__PURE__ */ i("button", {
		ref: S,
		className: w,
		type: p,
		disabled: m,
		"aria-disabled": h ? !0 : void 0,
		"aria-busy": h ? !0 : void 0,
		onClick: E,
		...x,
		children: D
	}) : /* @__PURE__ */ i("a", {
		ref: S,
		className: w,
		href: T ? void 0 : _,
		"aria-disabled": T ? !0 : void 0,
		"aria-busy": h ? !0 : void 0,
		role: T ? "link" : void 0,
		onClick: E,
		...v ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		...x,
		children: D
	}));
});
//#endregion
export { s as Button };
