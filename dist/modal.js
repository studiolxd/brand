'use client';
import './modal.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { CloseButton as t } from "./close-button.js";
import { n, r, t as i } from "./_shared/dialogSurface.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { Dialog as c } from "@base-ui/react/dialog";
//#region src/stories/molecules/Modal/Modal.tsx
function l({ open: l, onClose: u, title: d, children: f, closeLabel: p = "Cerrar", fallbackTitle: m = "Diálogo", container: h, description: g, "aria-describedby": _, initialFocus: v, footer: y, footerClassName: b, ...x }) {
	let S = _ === void 0 ? {} : { "aria-describedby": _ }, C = v === void 0 ? {} : { initialFocus: v };
	return /* @__PURE__ */ o(c.Root, {
		open: l,
		onOpenChange: (e) => {
			e || u();
		},
		children: /* @__PURE__ */ s(c.Portal, {
			container: h,
			children: [/* @__PURE__ */ o(r, { className: "modal__overlay" }), /* @__PURE__ */ s(c.Popup, {
				className: "modal__content",
				...S,
				...C,
				...x,
				children: [
					d ? /* @__PURE__ */ s(n, {
						layout: "inline",
						className: "modal__header",
						children: [/* @__PURE__ */ o(c.Title, {
							className: "modal__title",
							children: d
						}), /* @__PURE__ */ o(c.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ o(t, { label: p })
						})]
					}) : /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(c.Title, { render: /* @__PURE__ */ o(e, { children: m }) }), /* @__PURE__ */ o(n, {
						layout: "inline",
						noTitle: !0,
						className: "modal__header modal__header--no-title",
						children: /* @__PURE__ */ o(c.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ o(t, { label: p })
						})
					})] }),
					g != null && /* @__PURE__ */ o(c.Description, {
						className: "modal__description",
						children: g
					}),
					/* @__PURE__ */ o("div", {
						className: "modal__body",
						children: f
					}),
					y != null && /* @__PURE__ */ o(i, {
						className: ["modal__footer", b].filter(Boolean).join(" "),
						children: y
					})
				]
			})]
		})
	});
}
//#endregion
export { l as Modal };
