'use client';
import './modal.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { CloseButton as n } from "./close-button.js";
import { n as r, r as i, t as a } from "./_shared/dialogsurface.js";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
import { Dialog as l } from "@base-ui/react/dialog";
//#region src/stories/molecules/Modal/Modal.tsx
function u({ open: u, onClose: d, title: f, children: p, closeLabel: m, fallbackTitle: h, container: g, description: _, "aria-describedby": v, initialFocus: y, footer: b, footerClassName: x, ...S }) {
	let C = e("modal"), w = v === void 0 ? {} : { "aria-describedby": v }, T = y === void 0 ? {} : { initialFocus: y };
	return /* @__PURE__ */ s(l.Root, {
		open: u,
		onOpenChange: (e) => {
			e || d();
		},
		children: /* @__PURE__ */ c(l.Portal, {
			container: g,
			children: [/* @__PURE__ */ s(i, { className: "modal__overlay" }), /* @__PURE__ */ c(l.Popup, {
				className: "modal__content",
				...w,
				...T,
				...S,
				children: [
					f ? /* @__PURE__ */ c(r, {
						layout: "inline",
						className: "modal__header",
						children: [/* @__PURE__ */ s(l.Title, {
							className: "modal__title",
							children: f
						}), /* @__PURE__ */ s(l.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ s(n, { label: C("close", m) })
						})]
					}) : /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s(l.Title, { render: /* @__PURE__ */ s(t, { children: C("fallbackTitle", h) }) }), /* @__PURE__ */ s(r, {
						layout: "inline",
						noTitle: !0,
						className: "modal__header modal__header--no-title",
						children: /* @__PURE__ */ s(l.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ s(n, { label: C("close", m) })
						})
					})] }),
					_ != null && /* @__PURE__ */ s(l.Description, {
						className: "modal__description",
						children: _
					}),
					/* @__PURE__ */ s("div", {
						className: "modal__body",
						children: p
					}),
					b != null && /* @__PURE__ */ s(a, {
						className: ["modal__footer", x].filter(Boolean).join(" "),
						children: b
					})
				]
			})]
		})
	});
}
//#endregion
export { u as Modal };
