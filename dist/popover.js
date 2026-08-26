'use client';
import './popover.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { Popover as n } from "@base-ui-components/react/popover";
//#region src/stories/atoms/Popover/Popover.tsx
function r({ trigger: r, children: i, open: a, defaultOpen: o, onOpenChange: s, side: c = "bottom", align: l = "start", sideOffset: u = 8, className: d }) {
	return /* @__PURE__ */ t(n.Root, {
		open: a,
		defaultOpen: o,
		onOpenChange: (e) => s?.(e),
		children: [/* @__PURE__ */ e(n.Trigger, { render: r }), /* @__PURE__ */ e(n.Portal, { children: /* @__PURE__ */ e(n.Positioner, {
			className: "popover__positioner",
			side: c,
			align: l,
			sideOffset: u,
			children: /* @__PURE__ */ e(n.Popup, {
				className: ["popover", d].filter(Boolean).join(" "),
				children: i
			})
		}) })]
	});
}
//#endregion
export { r as Popover };
