'use client';
import './tooltip.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { forwardRef as n, useId as r, useState as i } from "react";
import { Tooltip as a } from "@base-ui/react/tooltip";
//#region src/stories/atoms/Tooltip/Tooltip.tsx
function o({ children: t, delayDuration: n = 0, skipDelayDuration: r }) {
	return /* @__PURE__ */ e(a.Provider, {
		delay: n,
		...r === void 0 ? {} : { timeout: r },
		children: t
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
var l = n(function({ label: n, children: o, side: s = "top", align: l = "center", sideOffset: u, open: d, defaultOpen: f, onOpenChange: p, delayDuration: m, className: h, ...g }, _) {
	let v = r(), [y, b] = i(f ?? !1), x = d ?? y;
	return /* @__PURE__ */ t(a.Root, {
		open: d,
		defaultOpen: f,
		onOpenChange: (e) => {
			d === void 0 && b(e), p?.(e);
		},
		children: [/* @__PURE__ */ e(a.Trigger, {
			ref: _,
			render: o,
			"aria-describedby": x ? v : void 0,
			...m === void 0 ? {} : { delay: m },
			...g
		}), /* @__PURE__ */ e(a.Portal, { children: /* @__PURE__ */ e(a.Positioner, {
			className: "tooltip__positioner",
			side: s,
			align: l,
			sideOffset: u ?? c,
			children: /* @__PURE__ */ t(a.Popup, {
				id: v,
				role: "tooltip",
				className: ["tooltip", h].filter(Boolean).join(" "),
				children: [n, /* @__PURE__ */ e(a.Arrow, {
					className: "tooltip__arrow",
					children: /* @__PURE__ */ e("svg", {
						width: "10",
						height: "5",
						viewBox: "0 0 30 10",
						preserveAspectRatio: "none",
						children: /* @__PURE__ */ e("polygon", { points: "0,0 30,0 15,10" })
					})
				})]
			})
		}) })]
	});
});
//#endregion
export { l as Tooltip, o as TooltipProvider };
