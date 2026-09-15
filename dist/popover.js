'use client';
import './popover.css';
import { n as e } from "./_shared/portal-container.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { Popover as r } from "@base-ui/react/popover";
//#region src/stories/atoms/Popover/Popover.tsx
function i(e) {
	let t = parseFloat(e);
	return Number.isNaN(t) ? 0 : e.endsWith("rem") ? t * parseFloat(getComputedStyle(document.documentElement).fontSize) : t;
}
function a() {
	let e = document.documentElement;
	return i(getComputedStyle(e).getPropertyValue("--popover-offset").trim());
}
function o({ trigger: i, children: o, label: s, open: c, defaultOpen: l, onOpenChange: u, onPointerDownOutside: d, onFocusOutside: f, onEscapeKeyDown: p, side: m = "bottom", align: h = "start", sideOffset: g, initialFocus: _, container: v, className: y }) {
	let b = e(v);
	return /* @__PURE__ */ n(r.Root, {
		open: c,
		defaultOpen: l,
		onOpenChange: (e, t) => {
			e || (t.reason === "outside-press" ? d?.(t) : t.reason === "focus-out" ? f?.(t) : t.reason === "escape-key" && p?.(t)), u?.(e, t);
		},
		children: [/* @__PURE__ */ t(r.Trigger, { render: i }), /* @__PURE__ */ t(r.Portal, {
			container: b,
			children: /* @__PURE__ */ t(r.Positioner, {
				className: "popover__positioner",
				side: m,
				align: h,
				sideOffset: g ?? a,
				children: /* @__PURE__ */ t(r.Popup, {
					"aria-label": s,
					initialFocus: _,
					className: ["popover", y].filter(Boolean).join(" "),
					children: o
				})
			})
		})]
	});
}
//#endregion
export { o as Popover };
