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
function o({ trigger: i, anchor: o, children: s, label: c, open: l, defaultOpen: u, onOpenChange: d, onPointerDownOutside: f, onFocusOutside: p, onEscapeKeyDown: m, side: h = "bottom", align: g = "start", sideOffset: _, initialFocus: v, container: y, className: b }) {
	let x = e(y);
	return /* @__PURE__ */ n(r.Root, {
		open: l,
		defaultOpen: u,
		onOpenChange: (e, t) => {
			e || (t.reason === "outside-press" ? f?.(t) : t.reason === "focus-out" ? p?.(t) : t.reason === "escape-key" && m?.(t)), d?.(e, t);
		},
		children: [i !== void 0 && /* @__PURE__ */ t(r.Trigger, { render: i }), /* @__PURE__ */ t(r.Portal, {
			container: x,
			children: /* @__PURE__ */ t(r.Positioner, {
				className: "popover__positioner",
				anchor: o,
				side: h,
				align: g,
				sideOffset: _ ?? a,
				children: /* @__PURE__ */ t(r.Popup, {
					"aria-label": c,
					initialFocus: v,
					className: ["popover", b].filter(Boolean).join(" "),
					children: s
				})
			})
		})]
	});
}
//#endregion
export { o as Popover };
