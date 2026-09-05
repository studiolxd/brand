'use client';
import './sheet.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { CloseButton as t } from "./close-button.js";
import { n, r, t as i } from "./_shared/dialogSurface.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { Dialog as s } from "@base-ui/react/dialog";
//#region src/stories/molecules/Sheet/Sheet.tsx
function c({ className: e, ...t }) {
	return /* @__PURE__ */ a(i, {
		className: ["sheet__footer", e].filter(Boolean).join(" "),
		...t
	});
}
function l({ open: i, onOpenChange: l, side: u = "right", title: d, titleHidden: f = !1, description: p, footer: m, children: h, closeLabel: g = "Cerrar", trigger: _, container: v, onAnimationEndCapture: y, className: b, ...x }) {
	return /* @__PURE__ */ o(s.Root, {
		open: i,
		onOpenChange: (e) => l(e),
		children: [_ && /* @__PURE__ */ a(s.Trigger, { render: _ }), /* @__PURE__ */ o(s.Portal, {
			container: v,
			children: [/* @__PURE__ */ a(r, { className: "sheet__overlay" }), /* @__PURE__ */ o(s.Popup, {
				className: ["sheet", b].filter(Boolean).join(" "),
				"data-side": u,
				onAnimationEndCapture: y,
				...x,
				children: [
					/* @__PURE__ */ o(n, {
						layout: "stacked",
						className: "sheet__header",
						children: [f ? /* @__PURE__ */ a(s.Title, { render: /* @__PURE__ */ a(e, { children: d }) }) : /* @__PURE__ */ a(s.Title, {
							className: "sheet__title",
							children: d
						}), p != null && /* @__PURE__ */ a(s.Description, {
							className: "sheet__description",
							children: p
						})]
					}),
					/* @__PURE__ */ a(s.Close, {
						className: "sheet__close",
						render: /* @__PURE__ */ a(t, { label: g })
					}),
					/* @__PURE__ */ a("div", {
						className: "sheet__body",
						children: h
					}),
					m && /* @__PURE__ */ a(c, { children: m })
				]
			})]
		})]
	});
}
//#endregion
export { l as Sheet, c as SheetFooter };
