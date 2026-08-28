'use client';
import './tooltip.css';
import { forwardRef as e, useId as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { Tooltip as a } from "@base-ui-components/react/tooltip";
//#region src/stories/atoms/Tooltip/Tooltip.tsx
function o({ children: e, delayDuration: t = 0, skipDelayDuration: n }) {
	return /* @__PURE__ */ r(a.Provider, {
		delay: t,
		...n === void 0 ? {} : { timeout: n },
		children: e
	});
}
function s(e, t) {
	let n = parseFloat(e);
	return Number.isNaN(n) ? 0 : e.endsWith("rem") ? n * parseFloat(getComputedStyle(document.documentElement).fontSize) : e.endsWith("em") ? n * parseFloat(getComputedStyle(t).fontSize) : n;
}
function c() {
	let e = document.documentElement;
	return s(getComputedStyle(e).getPropertyValue("--tooltip-offset").trim(), e);
}
var l = e(function({ label: e, children: o, side: s = "top", align: l = "center", sideOffset: u, open: d, defaultOpen: f, onOpenChange: p, delayDuration: m, className: h, ...g }, _) {
	let v = t(), [y, b] = n(f ?? !1), x = d ?? y;
	return /* @__PURE__ */ i(a.Root, {
		open: d,
		defaultOpen: f,
		onOpenChange: (e) => {
			d === void 0 && b(e), p?.(e);
		},
		children: [/* @__PURE__ */ r(a.Trigger, {
			ref: _,
			render: o,
			"aria-describedby": x ? v : void 0,
			...m === void 0 ? {} : { delay: m },
			...g
		}), /* @__PURE__ */ r(a.Portal, { children: /* @__PURE__ */ r(a.Positioner, {
			className: "tooltip__positioner",
			side: s,
			align: l,
			sideOffset: u ?? c,
			children: /* @__PURE__ */ i(a.Popup, {
				id: v,
				role: "tooltip",
				className: ["tooltip", h].filter(Boolean).join(" "),
				children: [e, /* @__PURE__ */ r(a.Arrow, {
					className: "tooltip__arrow",
					children: /* @__PURE__ */ r("svg", {
						width: "10",
						height: "5",
						viewBox: "0 0 30 10",
						preserveAspectRatio: "none",
						children: /* @__PURE__ */ r("polygon", { points: "0,0 30,0 15,10" })
					})
				})]
			})
		}) })]
	});
});
//#endregion
export { l as Tooltip, o as TooltipProvider };
