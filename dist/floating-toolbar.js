'use client';
import './floating-toolbar.css';
import { Button as e } from "./button.js";
import { Tooltip as t } from "./tooltip.js";
import { t as n } from "./_shared/media-query.js";
import { createContext as r, forwardRef as i, useContext as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { Toolbar as c } from "@base-ui/react/toolbar";
//#region src/stories/molecules/FloatingToolbar/FloatingToolbar.tsx
var l = "(min-width: 1024px)", u = new Set([
	"className",
	"role",
	"aria-label",
	"aria-orientation",
	"children"
]), d = r("top"), f = i(function({ start: e, end: t, layout: r = "auto", alwaysVisible: i = !1, label: a, toolbarProps: f, children: p, className: m, ...h }, g) {
	let _ = n(l), v = r === "sides" || r === "auto" && _ === !0, y = f ? Object.fromEntries(Object.entries(f).filter(([e]) => !u.has(e))) : void 0;
	return /* @__PURE__ */ s("div", {
		ref: g,
		className: [
			"floating-toolbar",
			`floating-toolbar--${r}`,
			i ? "floating-toolbar--always-visible" : "",
			m ?? ""
		].filter(Boolean).join(" "),
		...h,
		children: [/* @__PURE__ */ s(c.Root, {
			...y,
			className: "floating-toolbar__bar",
			"aria-label": a,
			orientation: v ? "vertical" : "horizontal",
			children: [e != null && /* @__PURE__ */ o(d.Provider, {
				value: v ? "left" : "top",
				children: /* @__PURE__ */ o(c.Group, {
					className: "floating-toolbar__group floating-toolbar__group--start",
					children: e
				})
			}), t != null && /* @__PURE__ */ o(d.Provider, {
				value: v ? "right" : "top",
				children: /* @__PURE__ */ o(c.Group, {
					className: "floating-toolbar__group floating-toolbar__group--end",
					children: t
				})
			})]
		}), /* @__PURE__ */ o("div", {
			className: "floating-toolbar__content",
			children: p
		})]
	});
}), p = i(function({ label: n, icon: r, destructive: i = !1, className: s, ...l }, u) {
	return /* @__PURE__ */ o(t, {
		label: n,
		side: a(d),
		describe: !1,
		ref: u,
		...l,
		children: /* @__PURE__ */ o(c.Button, {
			render: /* @__PURE__ */ o(e, {
				variant: "ghost",
				size: "sm",
				iconOnly: !0,
				destructive: i,
				"aria-label": n,
				className: s
			}),
			children: r
		})
	});
});
//#endregion
export { f as FloatingToolbar, p as FloatingToolbarButton };
