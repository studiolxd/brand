'use client';
import './sheet.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { CloseButton as n } from "./close-button.js";
import { n as r, r as i, t as a } from "./_shared/dialogsurface.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { Dialog as c } from "@base-ui/react/dialog";
//#region src/stories/molecules/Sheet/Sheet.tsx
function l({ className: e, ...t }) {
	return /* @__PURE__ */ o(a, {
		className: ["sheet__footer", e].filter(Boolean).join(" "),
		...t
	});
}
function u({ open: a, onOpenChange: u, side: d = "right", title: f, titleHidden: p = !1, description: m, footer: h, children: g, closeLabel: _, hideClose: v = !1, trigger: y, container: b, onAnimationEndCapture: x, className: S, ...C }) {
	let w = e("sheet");
	return /* @__PURE__ */ s(c.Root, {
		open: a,
		onOpenChange: (e) => u(e),
		children: [y && /* @__PURE__ */ o(c.Trigger, { render: y }), /* @__PURE__ */ s(c.Portal, {
			container: b,
			children: [/* @__PURE__ */ o(i, { className: "sheet__overlay" }), /* @__PURE__ */ s(c.Popup, {
				className: ["sheet", S].filter(Boolean).join(" "),
				"data-side": d,
				onAnimationEndCapture: x,
				...C,
				children: [
					/* @__PURE__ */ s(r, {
						layout: "stacked",
						className: "sheet__header",
						children: [p ? /* @__PURE__ */ o(c.Title, { render: /* @__PURE__ */ o(t, { children: f }) }) : /* @__PURE__ */ o(c.Title, {
							className: "sheet__title",
							children: f
						}), m != null && /* @__PURE__ */ o(c.Description, {
							className: "sheet__description",
							children: m
						})]
					}),
					!v && /* @__PURE__ */ o(c.Close, {
						className: "sheet__close",
						render: /* @__PURE__ */ o(n, { label: w("close", _) })
					}),
					/* @__PURE__ */ o("div", {
						className: "sheet__body",
						children: g
					}),
					h && /* @__PURE__ */ o(l, { children: h })
				]
			})]
		})]
	});
}
//#endregion
export { u as Sheet, l as SheetFooter };
