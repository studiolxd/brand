'use client';
import './floating-toolbar.css';
import { Button as e } from "./button.js";
import { Tooltip as t } from "./tooltip.js";
import { t as n } from "./_shared/media-query.js";
import { createContext as r, forwardRef as i, useContext as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { Toolbar as c } from "@base-ui/react/toolbar";
//#region src/stories/molecules/FloatingToolbar/FloatingToolbar.tsx
var l = "(min-width: 1024px)", u = r("top"), d = i(function({ start: e, end: t, layout: r = "auto", alwaysVisible: i = !1, label: a, children: d, className: f, ...p }, m) {
	let h = n(l), g = r === "sides" || r === "auto" && h === !0;
	return /* @__PURE__ */ s("div", {
		ref: m,
		className: [
			"floating-toolbar",
			`floating-toolbar--${r}`,
			i ? "floating-toolbar--always-visible" : "",
			f ?? ""
		].filter(Boolean).join(" "),
		...p,
		children: [/* @__PURE__ */ s(c.Root, {
			className: "floating-toolbar__bar",
			"aria-label": a,
			orientation: g ? "vertical" : "horizontal",
			children: [e != null && /* @__PURE__ */ o(u.Provider, {
				value: g ? "left" : "top",
				children: /* @__PURE__ */ o(c.Group, {
					className: "floating-toolbar__group floating-toolbar__group--start",
					children: e
				})
			}), t != null && /* @__PURE__ */ o(u.Provider, {
				value: g ? "right" : "top",
				children: /* @__PURE__ */ o(c.Group, {
					className: "floating-toolbar__group floating-toolbar__group--end",
					children: t
				})
			})]
		}), /* @__PURE__ */ o("div", {
			className: "floating-toolbar__content",
			children: d
		})]
	});
}), f = i(function({ label: n, icon: r, destructive: i = !1, className: s, ...l }, d) {
	return /* @__PURE__ */ o(t, {
		label: n,
		side: a(u),
		describe: !1,
		ref: d,
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
export { d as FloatingToolbar, f as FloatingToolbarButton };
