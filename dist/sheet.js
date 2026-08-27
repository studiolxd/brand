'use client';
import './sheet.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { Dialog as a } from "@base-ui-components/react/dialog";
//#region src/stories/molecules/Sheet/Sheet.tsx
function o({ className: e, ...t }) {
	return /* @__PURE__ */ r("div", {
		className: ["sheet__footer", e].filter(Boolean).join(" "),
		...t
	});
}
function s({ open: s, onOpenChange: c, side: l = "right", title: u, titleHidden: d = !1, description: f, footer: p, children: m, closeLabel: h = "Cerrar", trigger: g, onAnimationEndCapture: _, className: v }) {
	return /* @__PURE__ */ i(a.Root, {
		open: s,
		onOpenChange: (e) => c(e),
		children: [g && /* @__PURE__ */ r(a.Trigger, { render: g }), /* @__PURE__ */ i(a.Portal, { children: [/* @__PURE__ */ r(a.Backdrop, { className: "sheet__overlay" }), /* @__PURE__ */ i(a.Popup, {
			className: ["sheet", v].filter(Boolean).join(" "),
			"data-side": l,
			onAnimationEndCapture: _,
			children: [
				/* @__PURE__ */ i("header", {
					className: "sheet__header",
					children: [d ? /* @__PURE__ */ r(a.Title, { render: /* @__PURE__ */ r(t, { children: u }) }) : /* @__PURE__ */ r(a.Title, {
						className: "sheet__title",
						children: u
					}), f != null && /* @__PURE__ */ r(a.Description, {
						className: "sheet__description",
						children: f
					})]
				}),
				/* @__PURE__ */ r(a.Close, {
					className: "sheet__close",
					"aria-label": h,
					render: /* @__PURE__ */ r(n, {
						variant: "ghost",
						size: "sm",
						iconOnly: !0
					}),
					children: /* @__PURE__ */ r(e, {
						name: "close",
						size: "sm"
					})
				}),
				/* @__PURE__ */ r("div", {
					className: "sheet__body",
					children: m
				}),
				p && /* @__PURE__ */ r(o, { children: p })
			]
		})] })]
	});
}
//#endregion
export { s as Sheet, o as SheetFooter };
