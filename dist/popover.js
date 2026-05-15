'use client';
import './popover.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import * as n from "@radix-ui/react-popover";
//#region src/stories/atoms/Popover/Popover.tsx
function r({ trigger: r, children: i, open: a, defaultOpen: o, onOpenChange: s, side: c = "bottom", align: l = "start", sideOffset: u = 8, className: d }) {
	return /* @__PURE__ */ t(n.Root, {
		open: a,
		defaultOpen: o,
		onOpenChange: s,
		children: [/* @__PURE__ */ e(n.Trigger, {
			asChild: !0,
			children: r
		}), /* @__PURE__ */ e(n.Portal, { children: /* @__PURE__ */ e(n.Content, {
			className: ["popover", d].filter(Boolean).join(" "),
			side: c,
			align: l,
			sideOffset: u,
			children: i
		}) })]
	});
}
//#endregion
export { r as Popover };
