'use client';
import './modal.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { Dialog as o } from "@base-ui-components/react/dialog";
//#region src/stories/molecules/Modal/Modal.tsx
function s({ open: s, onClose: c, title: l, children: u, closeLabel: d = "Cerrar", fallbackTitle: f = "Diálogo", container: p, description: m, "aria-describedby": h }) {
	let g = h === void 0 ? {} : { "aria-describedby": h };
	return /* @__PURE__ */ i(o.Root, {
		open: s,
		onOpenChange: (e) => {
			e || c();
		},
		children: /* @__PURE__ */ a(o.Portal, {
			container: p,
			children: [/* @__PURE__ */ i(o.Backdrop, { className: "modal__overlay" }), /* @__PURE__ */ a(o.Popup, {
				className: "modal__content",
				...g,
				initialFocus: !1,
				children: [
					l ? /* @__PURE__ */ a("header", {
						className: "modal__header",
						children: [/* @__PURE__ */ i(o.Title, {
							className: "modal__title",
							children: l
						}), /* @__PURE__ */ i(o.Close, {
							className: "modal__close",
							"aria-label": d,
							render: /* @__PURE__ */ i(n, {
								variant: "ghost",
								size: "sm",
								iconOnly: !0
							}),
							children: /* @__PURE__ */ i(e, {
								name: "close",
								size: "sm"
							})
						})]
					}) : /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i(o.Title, { render: /* @__PURE__ */ i(t, { children: f }) }), /* @__PURE__ */ i("header", {
						className: "modal__header modal__header--no-title",
						children: /* @__PURE__ */ i(o.Close, {
							className: "modal__close",
							"aria-label": d,
							render: /* @__PURE__ */ i(n, {
								variant: "ghost",
								size: "sm",
								iconOnly: !0
							}),
							children: /* @__PURE__ */ i(e, {
								name: "close",
								size: "sm"
							})
						})
					})] }),
					m != null && /* @__PURE__ */ i(o.Description, {
						className: "modal__description",
						children: m
					}),
					/* @__PURE__ */ i("div", {
						className: "modal__body",
						children: u
					})
				]
			})]
		})
	});
}
//#endregion
export { s as Modal };
