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
function a({ trigger: r, children: a, label: o, open: s, defaultOpen: c, onOpenChange: l, onPointerDownOutside: u, onFocusOutside: d, onEscapeKeyDown: f, side: p = "bottom", align: m = "start", sideOffset: h, className: g }) {
	return /* @__PURE__ */ t(n.Root, {
		open: s,
		defaultOpen: c,
		onOpenChange: (e, t) => {
			e || (t.reason === "outside-press" ? u?.(t) : t.reason === "focus-out" ? d?.(t) : t.reason === "escape-key" && f?.(t)), l?.(e, t);
		},
		children: [/* @__PURE__ */ e(n.Trigger, { render: r }), /* @__PURE__ */ e(n.Portal, { children: /* @__PURE__ */ e(n.Positioner, {
			className: "popover__positioner",
			side: p,
			align: m,
			sideOffset: h ?? i,
			children: /* @__PURE__ */ e(n.Popup, {
				"aria-label": o,
				className: ["popover", g].filter(Boolean).join(" "),
				children: a
			})
		}) })]
	});
}
//#endregion
export { a as Popover };
