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
function o({ label: a, children: o, side: s = "top", align: c = "center", sideOffset: l = 4, open: u, defaultOpen: d, onOpenChange: f, delayDuration: p, className: m }) {
	let h = n(), [g, _] = r(d ?? !1), v = u ?? g;
	return /* @__PURE__ */ t(i.Root, {
		open: u,
		defaultOpen: d,
		onOpenChange: (e) => {
			u === void 0 && _(e), f?.(e);
		},
		children: [/* @__PURE__ */ e(i.Trigger, {
			render: o,
			"aria-describedby": v ? h : void 0,
			...p === void 0 ? {} : { delay: p }
		}), /* @__PURE__ */ e(i.Portal, { children: /* @__PURE__ */ e(i.Positioner, {
			className: "tooltip__positioner",
			side: s,
			align: c,
			sideOffset: l,
			children: /* @__PURE__ */ t(i.Popup, {
				id: h,
				role: "tooltip",
				className: ["tooltip", m].filter(Boolean).join(" "),
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
export { o as Tooltip, a as TooltipProvider };
