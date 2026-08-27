'use client';
import './tooltip.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useId as n, useState as r } from "react";
import { Tooltip as i } from "@base-ui-components/react/tooltip";
//#region src/stories/atoms/Tooltip/Tooltip.tsx
function a({ children: t, delayDuration: n = 0, skipDelayDuration: r }) {
	return /* @__PURE__ */ e(i.Provider, {
		delay: n,
		...r === void 0 ? {} : { timeout: r },
		children: t
	});
}
function o(e, t) {
	let n = parseFloat(e);
	return Number.isNaN(n) ? 0 : e.endsWith("rem") ? n * parseFloat(getComputedStyle(document.documentElement).fontSize) : e.endsWith("em") ? n * parseFloat(getComputedStyle(t).fontSize) : n;
}
function s() {
	let e = document.documentElement;
	return o(getComputedStyle(e).getPropertyValue("--tooltip-offset").trim(), e);
}
function c({ label: a, children: o, side: c = "top", align: l = "center", sideOffset: u, open: d, defaultOpen: f, onOpenChange: p, delayDuration: m, className: h }) {
	let g = n(), [_, v] = r(f ?? !1), y = d ?? _;
	return /* @__PURE__ */ t(i.Root, {
		open: d,
		defaultOpen: f,
		onOpenChange: (e) => {
			d === void 0 && v(e), p?.(e);
		},
		children: [/* @__PURE__ */ e(i.Trigger, {
			render: o,
			"aria-describedby": y ? g : void 0,
			...m === void 0 ? {} : { delay: m }
		}), /* @__PURE__ */ e(i.Portal, { children: /* @__PURE__ */ e(i.Positioner, {
			className: "tooltip__positioner",
			side: c,
			align: l,
			sideOffset: u ?? s,
			children: /* @__PURE__ */ t(i.Popup, {
				id: g,
				role: "tooltip",
				className: ["tooltip", h].filter(Boolean).join(" "),
				children: [a, /* @__PURE__ */ e(i.Arrow, {
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
}
//#endregion
export { c as Tooltip, a as TooltipProvider };
