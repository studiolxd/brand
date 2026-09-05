'use client';
import './modal.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { CloseButton as t } from "./close-button.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { Dialog as a } from "@base-ui/react/dialog";
//#region src/stories/molecules/Modal/Modal.tsx
function o({ open: o, onClose: s, title: c, children: l, closeLabel: u = "Cerrar", fallbackTitle: d = "Diálogo", container: f, description: p, "aria-describedby": m, initialFocus: h, footer: g, footerClassName: _, ...v }) {
	let y = m === void 0 ? {} : { "aria-describedby": m }, b = h === void 0 ? {} : { initialFocus: h };
	return /* @__PURE__ */ r(a.Root, {
		open: o,
		onOpenChange: (e) => {
			e || s();
		},
		children: /* @__PURE__ */ i(a.Portal, {
			container: f,
			children: [/* @__PURE__ */ r(a.Backdrop, { className: "modal__overlay" }), /* @__PURE__ */ i(a.Popup, {
				className: "modal__content",
				...y,
				...b,
				...v,
				children: [
					c ? /* @__PURE__ */ i("header", {
						className: "modal__header",
						children: [/* @__PURE__ */ r(a.Title, {
							className: "modal__title",
							children: c
						}), /* @__PURE__ */ r(a.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ r(t, { label: u })
						})]
					}) : /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r(a.Title, { render: /* @__PURE__ */ r(e, { children: d }) }), /* @__PURE__ */ r("header", {
						className: "modal__header modal__header--no-title",
						children: /* @__PURE__ */ r(a.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ r(t, { label: u })
						})
					})] }),
					p != null && /* @__PURE__ */ r(a.Description, {
						className: "modal__description",
						children: p
					}),
					/* @__PURE__ */ r("div", {
						className: "modal__body",
						children: l
					}),
					g != null && /* @__PURE__ */ r("div", {
						className: ["modal__footer", _].filter(Boolean).join(" "),
						children: g
					})
				]
			})]
		})
	});
}
//#endregion
export { o as Modal };
