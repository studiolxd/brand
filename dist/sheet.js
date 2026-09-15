'use client';
import './sheet.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { n } from "./_shared/portal-container.js";
import { CloseButton as r } from "./close-button.js";
import { n as i, r as a, t as o } from "./_shared/dialogsurface.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Dialog as l } from "@base-ui/react/dialog";
//#region src/stories/molecules/Sheet/Sheet.tsx
function u({ className: e, ...t }) {
	return /* @__PURE__ */ s(o, {
		className: ["sheet__footer", e].filter(Boolean).join(" "),
		...t
	});
}
function d({ open: o, onOpenChange: d, side: f = "right", title: p, titleHidden: m = !1, description: h, footer: g, children: _, closeLabel: v, hideClose: y = !1, trigger: b, container: x, onAnimationEndCapture: S, className: C, ...w }) {
	let T = e("sheet"), E = n(x);
	return /* @__PURE__ */ c(l.Root, {
		open: o,
		onOpenChange: (e) => d(e),
		children: [b && /* @__PURE__ */ s(l.Trigger, { render: b }), /* @__PURE__ */ c(l.Portal, {
			container: E,
			children: [/* @__PURE__ */ s(a, { className: "sheet__overlay" }), /* @__PURE__ */ c(l.Popup, {
				className: ["sheet", C].filter(Boolean).join(" "),
				"data-side": f,
				onAnimationEndCapture: S,
				...w,
				children: [
					/* @__PURE__ */ c(i, {
						layout: "stacked",
						className: "sheet__header",
						children: [m ? /* @__PURE__ */ s(l.Title, { render: /* @__PURE__ */ s(t, { children: p }) }) : /* @__PURE__ */ s(l.Title, {
							className: "sheet__title",
							children: p
						}), h != null && /* @__PURE__ */ s(l.Description, {
							className: "sheet__description",
							children: h
						})]
					}),
					!y && /* @__PURE__ */ s(l.Close, {
						className: "sheet__close",
						render: /* @__PURE__ */ s(r, { label: T("close", v) })
					}),
					/* @__PURE__ */ s("div", {
						className: "sheet__body",
						children: _
					}),
					g && /* @__PURE__ */ s(u, { children: g })
				]
			})]
		})]
	});
}
//#endregion
export { d as Sheet, u as SheetFooter };
