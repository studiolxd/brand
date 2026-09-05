'use client';
import './sheet.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { CloseButton as t } from "./close-button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { Dialog as i } from "@base-ui/react/dialog";
//#region src/stories/molecules/Sheet/Sheet.tsx
function a({ className: e, ...t }) {
	return /* @__PURE__ */ n("div", {
		className: ["sheet__footer", e].filter(Boolean).join(" "),
		...t
	});
}
function o({ open: o, onOpenChange: s, side: c = "right", title: l, titleHidden: u = !1, description: d, footer: f, children: p, closeLabel: m = "Cerrar", trigger: h, container: g, onAnimationEndCapture: _, className: v, ...y }) {
	return /* @__PURE__ */ r(i.Root, {
		open: o,
		onOpenChange: (e) => s(e),
		children: [h && /* @__PURE__ */ n(i.Trigger, { render: h }), /* @__PURE__ */ r(i.Portal, {
			container: g,
			children: [/* @__PURE__ */ n(i.Backdrop, { className: "sheet__overlay" }), /* @__PURE__ */ r(i.Popup, {
				className: ["sheet", v].filter(Boolean).join(" "),
				"data-side": c,
				onAnimationEndCapture: _,
				...y,
				children: [
					/* @__PURE__ */ r("header", {
						className: "sheet__header",
						children: [u ? /* @__PURE__ */ n(i.Title, { render: /* @__PURE__ */ n(e, { children: l }) }) : /* @__PURE__ */ n(i.Title, {
							className: "sheet__title",
							children: l
						}), d != null && /* @__PURE__ */ n(i.Description, {
							className: "sheet__description",
							children: d
						})]
					}),
					/* @__PURE__ */ n(i.Close, {
						className: "sheet__close",
						render: /* @__PURE__ */ n(t, { label: m })
					}),
					/* @__PURE__ */ n("div", {
						className: "sheet__body",
						children: p
					}),
					f && /* @__PURE__ */ n(a, { children: f })
				]
			})]
		})]
	});
}
//#endregion
export { o as Sheet, a as SheetFooter };
