'use client';
import './tooltip.css';
import { n as e } from "./_shared/portal-container.js";
import { n as t } from "./_shared/focusable-when-disabled.js";
import { t as n } from "./_shared/side-offset.js";
import { cloneElement as r, forwardRef as i, isValidElement as a, useId as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { Tooltip as u } from "@base-ui/react/tooltip";
//#region src/stories/atoms/Tooltip/Tooltip.tsx
function d({ children: e, delayDuration: t = 0, skipDelayDuration: n }) {
	return /* @__PURE__ */ c(u.Provider, {
		delay: t,
		...n === void 0 ? {} : { timeout: n },
		children: e
	});
}
var f = n("--tooltip-offset"), p = i(function({ label: n, children: i, side: d = "top", align: p = "center", sideOffset: m, open: h, defaultOpen: g, onOpenChange: _, delayDuration: v, describe: y = !0, container: b, className: x, ...S }, C) {
	let w = e(b), T = o(), [E, D] = s(g ?? !1), O = h ?? E, k = a(i) ? i : null, A;
	return A = k && k.props.disabled && t(k.type) ? r(k, { focusableWhenDisabled: !0 }) : k && k.props.disabled && typeof k.type == "string" ? r(k, {
		disabled: void 0,
		"aria-disabled": !0,
		onClick: (e) => {
			e.preventDefault(), e.stopPropagation();
		}
	}) : i, /* @__PURE__ */ l(u.Root, {
		open: h,
		defaultOpen: g,
		onOpenChange: (e) => {
			h === void 0 && D(e), _?.(e);
		},
		children: [/* @__PURE__ */ c(u.Trigger, {
			ref: C,
			render: A,
			"aria-describedby": O && y ? T : void 0,
			...v === void 0 ? {} : { delay: v },
			...S
		}), /* @__PURE__ */ c(u.Portal, {
			container: w,
			children: /* @__PURE__ */ c(u.Positioner, {
				className: "tooltip__positioner",
				side: d,
				align: p,
				sideOffset: m ?? f,
				children: /* @__PURE__ */ l(u.Popup, {
					id: T,
					role: "tooltip",
					className: ["tooltip", x].filter(Boolean).join(" "),
					children: [n, /* @__PURE__ */ c(u.Arrow, {
						className: "tooltip__arrow",
						children: /* @__PURE__ */ c("svg", {
							width: "10",
							height: "5",
							viewBox: "0 0 30 10",
							preserveAspectRatio: "none",
							children: /* @__PURE__ */ c("polygon", { points: "0,0 30,0 15,10" })
						})
					})]
				})
			})
		})]
	});
});
//#endregion
export { p as Tooltip, d as TooltipProvider };
