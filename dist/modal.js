'use client';
import './modal.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
import * as i from "@radix-ui/react-dialog";
//#region src/stories/molecules/Modal/Modal.tsx
function a({ open: a, onClose: o, title: s, children: c, dark: l = !1 }) {
	let u = ["modal__content", l && "modal__content--dark"].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(i.Root, {
		open: a,
		onOpenChange: (e) => {
			e || o();
		},
		children: /* @__PURE__ */ r(i.Portal, { children: [/* @__PURE__ */ n(i.Overlay, { className: "modal__overlay" }), /* @__PURE__ */ r(i.Content, {
			className: u,
			"aria-describedby": void 0,
			children: [s ? /* @__PURE__ */ r("header", {
				className: "modal__header",
				children: [/* @__PURE__ */ n(i.Title, {
					className: "modal__title",
					children: s
				}), /* @__PURE__ */ n(i.Close, {
					className: "modal__close",
					"aria-label": "Cerrar",
					children: "✕"
				})]
			}) : /* @__PURE__ */ r(t, { children: [/* @__PURE__ */ n(i.Title, {
				asChild: !0,
				children: /* @__PURE__ */ n(e, { children: "Diálogo" })
			}), /* @__PURE__ */ n("header", {
				className: "modal__header modal__header--no-title",
				children: /* @__PURE__ */ n(i.Close, {
					className: "modal__close",
					"aria-label": "Cerrar",
					children: "✕"
				})
			})] }), /* @__PURE__ */ n("div", {
				className: "modal__body",
				children: c
			})]
		})] })
	});
}
//#endregion
export { a as Modal };
