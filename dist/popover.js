'use client';
import './popover.css';
import { i as e, n as t, r as n, t as r } from "./_shared/PopoverPopup.js";
import { t as i } from "./_shared/PopoverTrigger.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/atoms/Popover/Popover.tsx
function s({ trigger: s, children: c, open: l, defaultOpen: u, onOpenChange: d, side: f = "bottom", align: p = "start", sideOffset: m = 8, className: h }) {
	return /* @__PURE__ */ o(e, {
		open: l,
		defaultOpen: u,
		onOpenChange: (e) => d?.(e),
		children: [/* @__PURE__ */ a(i, { render: s }), /* @__PURE__ */ a(n, { children: /* @__PURE__ */ a(t, {
			className: "popover__positioner",
			side: f,
			align: p,
			sideOffset: m,
			children: /* @__PURE__ */ a(r, {
				className: ["popover", h].filter(Boolean).join(" "),
				children: c
			})
		}) })]
	});
}
//#endregion
export { s as Popover };
