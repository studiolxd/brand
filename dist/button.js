'use client';
import './button.css';
import { Spinner as e } from "./spinner.js";
import { n as t } from "./_shared/form-size.js";
import { t as n } from "./_shared/focusable-when-disabled.js";
import { forwardRef as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { useRender as s } from "@base-ui/react/use-render";
//#region src/stories/atoms/Button/Button.tsx
var c = r(function({ variant: n = "primary", tone: r = "accent", destructive: c = !1, size: l, block: u = !1, iconOnly: d = !1, children: f, type: p = "button", disabled: m, loading: h = !1, focusableWhenDisabled: g = !1, onClick: _, href: v, external: y = !1, render: b, className: x, ...S }, C) {
	let w = t(l), T = [
		"button",
		`button--${n}`,
		n === "text" && r === "ink" ? "button--ink" : "",
		c ? "button--destructive-intent" : "",
		w === "md" ? "" : `button--${w}`,
		u === "mobile" ? "button--block-mobile" : u ? "button--block" : "",
		d ? "button--icon-only" : "",
		h ? "button--loading" : "",
		x ?? ""
	].filter(Boolean).join(" "), E = !!m || h, D = !!m && g, O = (e) => {
		if (E) {
			e.preventDefault(), e.stopPropagation();
			return;
		}
		_?.(e);
	}, k = h ? /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a("span", {
		className: "button__spinner",
		children: /* @__PURE__ */ a(e, {
			size: "sm",
			"aria-hidden": !0
		})
	}), d ? null : f] }) : f;
	return s({
		render: b,
		ref: C,
		enabled: b !== void 0,
		props: {
			className: T,
			"aria-disabled": E ? !0 : void 0,
			"aria-busy": h ? !0 : void 0,
			onClick: O,
			...S,
			children: k
		}
	}) || (v === void 0 ? /* @__PURE__ */ a("button", {
		ref: C,
		className: T,
		type: p,
		disabled: D ? void 0 : m,
		"aria-disabled": h || D ? !0 : void 0,
		"aria-busy": h ? !0 : void 0,
		onClick: O,
		...S,
		children: k
	}) : /* @__PURE__ */ a("a", {
		ref: C,
		className: T,
		href: E ? void 0 : v,
		"aria-disabled": E ? !0 : void 0,
		"aria-busy": h ? !0 : void 0,
		role: E ? "link" : void 0,
		tabIndex: D ? 0 : void 0,
		onClick: O,
		...y ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		...S,
		children: k
	}));
});
n(c);
//#endregion
export { c as Button };
