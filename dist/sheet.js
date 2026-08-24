'use client';
import './sheet.css';
"use client";
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import * as i from "@radix-ui/react-dialog";
//#region src/stories/molecules/Sheet/Sheet.tsx
function a({ className: e, ...t }) {
	return /* @__PURE__ */ n("div", {
		className: ["sheet__footer", e].filter(Boolean).join(" "),
		...t
	});
}
function o({ open: o, onOpenChange: s, side: c = "right", title: l, titleHidden: u = !1, description: d, footer: f, children: p, closeLabel: m = "Cerrar", trigger: h, onAnimationEndCapture: g, className: _ }) {
	return /* @__PURE__ */ r(i.Root, {
		open: o,
		onOpenChange: s,
		children: [h && /* @__PURE__ */ n(i.Trigger, {
			asChild: !0,
			children: h
		}), /* @__PURE__ */ r(i.Portal, { children: [/* @__PURE__ */ n(i.Overlay, { className: "sheet__overlay" }), /* @__PURE__ */ r(i.Content, {
			className: ["sheet", _].filter(Boolean).join(" "),
			"data-side": c,
			onAnimationEndCapture: g,
			...d == null ? { "aria-describedby": void 0 } : {},
			children: [
				/* @__PURE__ */ r("header", {
					className: "sheet__header",
					children: [u ? /* @__PURE__ */ n(i.Title, {
						asChild: !0,
						children: /* @__PURE__ */ n(t, { children: l })
					}) : /* @__PURE__ */ n(i.Title, {
						className: "sheet__title",
						children: l
					}), d != null && /* @__PURE__ */ n(i.Description, {
						className: "sheet__description",
						children: d
					})]
				}),
				/* @__PURE__ */ n(i.Close, {
					className: "sheet__close",
					"aria-label": m,
					children: /* @__PURE__ */ n(e, {
						name: "close",
						size: "sm"
					})
				}),
				/* @__PURE__ */ n("div", {
					className: "sheet__body",
					children: p
				}),
				f && /* @__PURE__ */ n(a, { children: f })
			]
		})] })]
	});
}
//#endregion
export { o as Sheet, a as SheetFooter };
