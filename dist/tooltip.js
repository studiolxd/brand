'use client';
import './tooltip.css';
import { n as e } from "./_shared/portal-container.js";
import { forwardRef as t, useId as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { Tooltip as o } from "@base-ui/react/tooltip";
//#region src/stories/atoms/Tooltip/Tooltip.tsx
function s({ children: e, delayDuration: t = 0, skipDelayDuration: n }) {
	return /* @__PURE__ */ i(o.Provider, {
		delay: t,
		...n === void 0 ? {} : { timeout: n },
		children: e
	});
}
function c(e, t) {
	let n = parseFloat(e);
	return Number.isNaN(n) ? 0 : e.endsWith("rem") ? n * parseFloat(getComputedStyle(document.documentElement).fontSize) : e.endsWith("em") ? n * parseFloat(getComputedStyle(t).fontSize) : n;
}
function l() {
	let e = document.documentElement;
	return c(getComputedStyle(e).getPropertyValue("--tooltip-offset").trim(), e);
}
var u = t(function({ label: t, children: s, side: c = "top", align: u = "center", sideOffset: d, open: f, defaultOpen: p, onOpenChange: m, delayDuration: h, describe: g = !0, disabledTrigger: _ = !1, container: v, className: y, ...b }, x) {
	let S = e(v), C = n(), [w, T] = r(p ?? !1), E = f ?? w;
	return /* @__PURE__ */ a(o.Root, {
		open: f,
		defaultOpen: p,
		onOpenChange: (e) => {
			f === void 0 && T(e), m?.(e);
		},
		children: [/* @__PURE__ */ i(o.Trigger, {
			ref: x,
			render: _ ? /* @__PURE__ */ i("span", {
				className: "tooltip__trigger",
				tabIndex: 0,
				children: s
			}) : s,
			"aria-describedby": E && g ? C : void 0,
			...h === void 0 ? {} : { delay: h },
			...b
		}), /* @__PURE__ */ i(o.Portal, {
			container: S,
			children: /* @__PURE__ */ i(o.Positioner, {
				className: "tooltip__positioner",
				side: c,
				align: u,
				sideOffset: d ?? l,
				children: /* @__PURE__ */ a(o.Popup, {
					id: C,
					role: "tooltip",
					className: ["tooltip", y].filter(Boolean).join(" "),
					children: [t, /* @__PURE__ */ i(o.Arrow, {
						className: "tooltip__arrow",
						children: /* @__PURE__ */ i("svg", {
							width: "10",
							height: "5",
							viewBox: "0 0 30 10",
							preserveAspectRatio: "none",
							children: /* @__PURE__ */ i("polygon", { points: "0,0 30,0 15,10" })
						})
					})]
				})
			})
		})]
	});
});
//#endregion
export { u as Tooltip, s as TooltipProvider };
