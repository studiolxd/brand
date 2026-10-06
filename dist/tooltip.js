'use client';
import './tooltip.css';
import { n as e } from "./_shared/portal-container.js";
import { t } from "./_shared/side-offset.js";
import { forwardRef as n, useId as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { Tooltip as s } from "@base-ui/react/tooltip";
//#region src/stories/atoms/Tooltip/Tooltip.tsx
function c({ children: e, delayDuration: t = 0, skipDelayDuration: n }) {
	return /* @__PURE__ */ a(s.Provider, {
		delay: t,
		...n === void 0 ? {} : { timeout: n },
		children: e
	});
}
var l = t("--tooltip-offset"), u = n(function({ label: t, children: n, side: c = "top", align: u = "center", sideOffset: d, open: f, defaultOpen: p, onOpenChange: m, delayDuration: h, describe: g = !0, disabledTrigger: _ = !1, container: v, className: y, ...b }, x) {
	let S = e(v), C = r(), [w, T] = i(p ?? !1), E = f ?? w;
	return /* @__PURE__ */ o(s.Root, {
		open: f,
		defaultOpen: p,
		onOpenChange: (e) => {
			f === void 0 && T(e), m?.(e);
		},
		children: [/* @__PURE__ */ a(s.Trigger, {
			ref: x,
			render: _ ? /* @__PURE__ */ a("span", {
				className: "tooltip__trigger",
				tabIndex: 0,
				children: n
			}) : n,
			"aria-describedby": E && g ? C : void 0,
			...h === void 0 ? {} : { delay: h },
			...b
		}), /* @__PURE__ */ a(s.Portal, {
			container: S,
			children: /* @__PURE__ */ a(s.Positioner, {
				className: "tooltip__positioner",
				side: c,
				align: u,
				sideOffset: d ?? l,
				children: /* @__PURE__ */ o(s.Popup, {
					id: C,
					role: "tooltip",
					className: ["tooltip", y].filter(Boolean).join(" "),
					children: [t, /* @__PURE__ */ a(s.Arrow, {
						className: "tooltip__arrow",
						children: /* @__PURE__ */ a("svg", {
							width: "10",
							height: "5",
							viewBox: "0 0 30 10",
							preserveAspectRatio: "none",
							children: /* @__PURE__ */ a("polygon", { points: "0,0 30,0 15,10" })
						})
					})]
				})
			})
		})]
	});
});
//#endregion
export { u as Tooltip, c as TooltipProvider };
