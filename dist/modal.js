'use client';
import './modal.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { Dialog as a } from "@base-ui-components/react/dialog";
//#region src/stories/molecules/Modal/Modal.tsx
function o({ open: o, onClose: s, title: c, children: l, closeLabel: u = "Cerrar", fallbackTitle: d = "Diálogo", container: f, description: p, "aria-describedby": m }) {
	let h = m === void 0 ? {} : { "aria-describedby": m };
	return /* @__PURE__ */ r(a.Root, {
		open: o,
		onOpenChange: (e) => {
			e || s();
		},
		children: /* @__PURE__ */ i(a.Portal, {
			container: f,
			children: [/* @__PURE__ */ r(a.Backdrop, { className: "modal__overlay" }), /* @__PURE__ */ i(a.Popup, {
				className: "modal__content",
				...h,
				initialFocus: !1,
				children: [
					c ? /* @__PURE__ */ i("header", {
						className: "modal__header",
						children: [/* @__PURE__ */ r(a.Title, {
							className: "modal__title",
							children: c
						}), /* @__PURE__ */ r(a.Close, {
							className: "modal__close",
							"aria-label": u,
							children: /* @__PURE__ */ r(e, {
								name: "close",
								size: "sm"
							})
						})]
					}) : /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r(a.Title, { render: /* @__PURE__ */ r(t, { children: d }) }), /* @__PURE__ */ r("header", {
						className: "modal__header modal__header--no-title",
						children: /* @__PURE__ */ r(a.Close, {
							className: "modal__close",
							"aria-label": u,
							children: /* @__PURE__ */ r(e, {
								name: "close",
								size: "sm"
							})
						})
					})] }),
					p != null && /* @__PURE__ */ r(a.Description, {
						className: "modal__description",
						children: p
					}),
					/* @__PURE__ */ r("div", {
						className: "modal__body",
						children: l
					})
				]
			})]
		})
	});
}
//#endregion
export { o as Modal };
