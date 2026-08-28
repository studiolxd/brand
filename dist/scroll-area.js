'use client';
import './scroll-area.css';
import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { ScrollArea as r } from "@base-ui/react/scroll-area";
//#region src/stories/atoms/ScrollArea/ScrollArea.tsx
var i = e(function({ orientation: e = "vertical", label: i, children: a, className: o, ...s }, c) {
	let l = e === "vertical" || e === "both", u = e === "horizontal" || e === "both";
	return /* @__PURE__ */ n(r.Root, {
		ref: c,
		className: ["scroll-area", o].filter(Boolean).join(" "),
		...s,
		children: [
			/* @__PURE__ */ t(r.Viewport, {
				className: "scroll-area__viewport",
				role: i ? "region" : void 0,
				"aria-label": i,
				children: a
			}),
			l && /* @__PURE__ */ t(r.Scrollbar, {
				keepMounted: !0,
				orientation: "vertical",
				className: "scroll-area__scrollbar",
				children: /* @__PURE__ */ t(r.Thumb, { className: "scroll-area__thumb" })
			}),
			u && /* @__PURE__ */ t(r.Scrollbar, {
				keepMounted: !0,
				orientation: "horizontal",
				className: "scroll-area__scrollbar",
				children: /* @__PURE__ */ t(r.Thumb, { className: "scroll-area__thumb" })
			}),
			l && u && /* @__PURE__ */ t(r.Corner, { className: "scroll-area__corner" })
		]
	});
});
//#endregion
export { i as ScrollArea };
