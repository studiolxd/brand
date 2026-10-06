'use client';
import './popover.css';
import { n as e } from "./_shared/portal-container.js";
import { t } from "./_shared/side-offset.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { Popover as i } from "@base-ui/react/popover";
//#region src/stories/atoms/Popover/Popover.tsx
var a = t("--popover-offset");
function o({ trigger: t, anchor: o, children: s, label: c, open: l, defaultOpen: u, onOpenChange: d, onPointerDownOutside: f, onFocusOutside: p, onEscapeKeyDown: m, side: h = "bottom", align: g = "start", sideOffset: _, initialFocus: v, container: y, className: b }) {
	let x = e(y);
	return /* @__PURE__ */ r(i.Root, {
		open: l,
		defaultOpen: u,
		onOpenChange: (e, t) => {
			e || (t.reason === "outside-press" ? f?.(t) : t.reason === "focus-out" ? p?.(t) : t.reason === "escape-key" && m?.(t)), d?.(e, t);
		},
		children: [t !== void 0 && /* @__PURE__ */ n(i.Trigger, { render: t }), /* @__PURE__ */ n(i.Portal, {
			container: x,
			children: /* @__PURE__ */ n(i.Positioner, {
				className: "popover__positioner",
				anchor: o,
				side: h,
				align: g,
				sideOffset: _ ?? a,
				children: /* @__PURE__ */ n(i.Popup, {
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
