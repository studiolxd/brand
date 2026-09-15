'use client';
import './modal.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { n } from "./_shared/portal-container.js";
import { CloseButton as r } from "./close-button.js";
import { n as i, r as a, t as o } from "./_shared/dialogsurface.js";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import { Dialog as u } from "@base-ui/react/dialog";
//#region src/stories/molecules/Modal/Modal.tsx
function d({ open: d, onClose: f, title: p, children: m, closeLabel: h, fallbackTitle: g, container: _, description: v, "aria-describedby": y, initialFocus: b, footer: x, footerClassName: S, ...C }) {
	let w = e("modal"), T = n(_), E = y === void 0 ? {} : { "aria-describedby": y }, D = b === void 0 ? {} : { initialFocus: b };
	return /* @__PURE__ */ c(u.Root, {
		open: d,
		onOpenChange: (e) => {
			e || f();
		},
		children: /* @__PURE__ */ l(u.Portal, {
			container: T,
			children: [/* @__PURE__ */ c(a, { className: "modal__overlay" }), /* @__PURE__ */ l(u.Popup, {
				className: "modal__content",
				...E,
				...D,
				...C,
				children: [
					p ? /* @__PURE__ */ l(i, {
						layout: "inline",
						className: "modal__header",
						children: [/* @__PURE__ */ c(u.Title, {
							className: "modal__title",
							children: p
						}), /* @__PURE__ */ c(u.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ c(r, { label: w("close", h) })
						})]
					}) : /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c(u.Title, { render: /* @__PURE__ */ c(t, { children: w("fallbackTitle", g) }) }), /* @__PURE__ */ c(i, {
						layout: "inline",
						noTitle: !0,
						className: "modal__header modal__header--no-title",
						children: /* @__PURE__ */ c(u.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ c(r, { label: w("close", h) })
						})
					})] }),
					v != null && /* @__PURE__ */ c(u.Description, {
						className: "modal__description",
						children: v
					}),
					/* @__PURE__ */ c("div", {
						className: "modal__body",
						children: m
					}),
					x != null && /* @__PURE__ */ c(o, {
						className: ["modal__footer", S].filter(Boolean).join(" "),
						children: x
					})
				]
			})]
		})
	});
}
//#endregion
export { d as Modal };
