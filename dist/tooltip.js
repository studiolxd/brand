'use client';
import './tooltip.css';
"use client";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import * as n from "@radix-ui/react-tooltip";
//#region src/stories/atoms/Tooltip/Tooltip.tsx
function r({ children: t, delayDuration: r = 0, skipDelayDuration: i }) {
	return /* @__PURE__ */ e(n.Provider, {
		delayDuration: r,
		...i === void 0 ? {} : { skipDelayDuration: i },
		children: t
	});
}
function i({ label: r, children: i, side: a = "top", align: o = "center", sideOffset: s = 4, open: c, defaultOpen: l, onOpenChange: u, delayDuration: d, className: f }) {
	return /* @__PURE__ */ t(n.Root, {
		open: c,
		defaultOpen: l,
		onOpenChange: u,
		...d === void 0 ? {} : { delayDuration: d },
		children: [/* @__PURE__ */ e(n.Trigger, {
			asChild: !0,
			children: i
		}), /* @__PURE__ */ e(n.Portal, { children: /* @__PURE__ */ t(n.Content, {
			className: ["tooltip", f].filter(Boolean).join(" "),
			side: a,
			align: o,
			sideOffset: s,
			children: [r, /* @__PURE__ */ e(n.Arrow, { className: "tooltip__arrow" })]
		}) })]
	});
}
//#endregion
export { i as Tooltip, r as TooltipProvider };
