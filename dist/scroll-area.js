'use client';
import './scroll-area.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { forwardRef as n } from "react";
import { ScrollArea as r } from "@base-ui/react/scroll-area";
//#region src/stories/atoms/ScrollArea/ScrollArea.tsx
var i = n(function({ orientation: n = "vertical", label: i, children: a, className: o, ...s }, c) {
	let l = n === "vertical" || n === "both", u = n === "horizontal" || n === "both";
	return /* @__PURE__ */ t(r.Root, {
		ref: c,
		className: ["scroll-area", o].filter(Boolean).join(" "),
		...s,
		children: [
			/* @__PURE__ */ e(r.Viewport, {
				className: "scroll-area__viewport",
				role: i ? "region" : void 0,
				"aria-label": i,
				children: a
			}),
			l && /* @__PURE__ */ e(r.Scrollbar, {
				keepMounted: !0,
				orientation: "vertical",
				className: "scroll-area__scrollbar",
				children: /* @__PURE__ */ e(r.Thumb, { className: "scroll-area__thumb" })
			}),
			u && /* @__PURE__ */ e(r.Scrollbar, {
				keepMounted: !0,
				orientation: "horizontal",
				className: "scroll-area__scrollbar",
				children: /* @__PURE__ */ e(r.Thumb, { className: "scroll-area__thumb" })
			}),
			l && u && /* @__PURE__ */ e(r.Corner, { className: "scroll-area__corner" })
		]
	});
});
//#endregion
export { i as ScrollArea };
