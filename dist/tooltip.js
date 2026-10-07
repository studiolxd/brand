'use client';
import './tooltip.css';
import { n as e } from "./_shared/env.js";
import { n as t } from "./_shared/portal-container.js";
import { n } from "./_shared/focusable-when-disabled.js";
import { t as r } from "./_shared/side-offset.js";
import { cloneElement as i, forwardRef as a, isValidElement as o, useId as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
import { Tooltip as d } from "@base-ui/react/tooltip";
//#region src/stories/atoms/Tooltip/Tooltip.tsx
function f({ children: e, delayDuration: t = 0, skipDelayDuration: n }) {
	return /* @__PURE__ */ l(d.Provider, {
		delay: t,
		...n === void 0 ? {} : { timeout: n },
		children: e
	});
}
var p = r("--tooltip-offset"), m = a(function({ label: r, children: a, side: f = "top", align: m = "center", sideOffset: h, open: g, defaultOpen: _, onOpenChange: v, delayDuration: y, describe: b = !0, disabledTrigger: x = !1, container: S, className: C, ...w }, T) {
	let E = t(S), D = s(), O = s(), k = w.id ?? O, [A, j] = c(_ ?? !1), M = g ?? A;
	x && e("Tooltip", "disabledTrigger", "nada: el disparador deshabilitado ya recibe foco solo");
	let N = o(a) ? a : null, P = !!N?.props.disabled || x, F = null;
	return N && P && n(N.type) ? F = i(N, { focusableWhenDisabled: !0 }) : N && N.props.disabled && typeof N.type == "string" ? F = i(N, {
		disabled: void 0,
		"aria-disabled": !0,
		onClick: (e) => {
			e.preventDefault(), e.stopPropagation();
		}
	}) : x || (F = a), /* @__PURE__ */ u(d.Root, {
		open: g,
		defaultOpen: _,
		onOpenChange: (e) => {
			g === void 0 && j(e), v?.(e);
		},
		children: [/* @__PURE__ */ l(d.Trigger, {
			ref: T,
			render: F ?? /* @__PURE__ */ l("span", {
				id: k,
				className: "tooltip__trigger",
				tabIndex: 0,
				role: "group",
				"aria-disabled": !0,
				...w["aria-label"] === void 0 && w["aria-labelledby"] === void 0 ? { "aria-labelledby": k } : {},
				children: a
			}),
			"aria-describedby": M && b ? D : void 0,
			...y === void 0 ? {} : { delay: y },
			...w
		}), /* @__PURE__ */ l(d.Portal, {
			container: E,
			children: /* @__PURE__ */ l(d.Positioner, {
				className: "tooltip__positioner",
				side: f,
				align: m,
				sideOffset: h ?? p,
				children: /* @__PURE__ */ u(d.Popup, {
					id: D,
					role: "tooltip",
					className: ["tooltip", C].filter(Boolean).join(" "),
					children: [r, /* @__PURE__ */ l(d.Arrow, {
						className: "tooltip__arrow",
						children: /* @__PURE__ */ l("svg", {
							width: "10",
							height: "5",
							viewBox: "0 0 30 10",
							preserveAspectRatio: "none",
							children: /* @__PURE__ */ l("polygon", { points: "0,0 30,0 15,10" })
						})
					})]
				})
			})
		})]
	});
});
//#endregion
export { m as Tooltip, f as TooltipProvider };
