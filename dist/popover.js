'use client';
import './popover.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { Popover as n } from "@base-ui-components/react/popover";
//#region src/stories/atoms/Popover/Popover.tsx
function r(e) {
	let t = parseFloat(e);
	return Number.isNaN(t) ? 0 : e.endsWith("rem") ? t * parseFloat(getComputedStyle(document.documentElement).fontSize) : t;
}
function i() {
	let e = document.documentElement;
	return r(getComputedStyle(e).getPropertyValue("--popover-offset").trim());
}
function a({ trigger: r, children: a, label: o, open: s, defaultOpen: c, onOpenChange: l, side: u = "bottom", align: d = "start", sideOffset: f, className: p }) {
	return /* @__PURE__ */ t(n.Root, {
		open: s,
		defaultOpen: c,
		onOpenChange: (e) => l?.(e),
		children: [/* @__PURE__ */ e(n.Trigger, { render: r }), /* @__PURE__ */ e(n.Portal, { children: /* @__PURE__ */ e(n.Positioner, {
			className: "popover__positioner",
			side: u,
			align: d,
			sideOffset: f ?? i,
			children: /* @__PURE__ */ e(n.Popup, {
				"aria-label": o,
				className: ["popover", p].filter(Boolean).join(" "),
				children: a
			})
		}) })]
	});
}
//#endregion
export { a as Popover };
