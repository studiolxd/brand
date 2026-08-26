'use client';
import './modal.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { a as n, i as r, n as i, o as a, r as o, s, t as c } from "./_shared/DialogTitle.js";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/molecules/Modal/Modal.tsx
function f({ open: f, onClose: p, title: m, children: h, closeLabel: g = "Cerrar", fallbackTitle: _ = "Diálogo", container: v, description: y, "aria-describedby": b }) {
	return /* @__PURE__ */ u(i, {
		open: f,
		onOpenChange: (e) => {
			e || p();
		},
		children: /* @__PURE__ */ d(o, {
			container: v,
			children: [/* @__PURE__ */ u(s, { className: "modal__overlay" }), /* @__PURE__ */ d(r, {
				className: "modal__content",
				...b === void 0 ? {} : { "aria-describedby": b },
				initialFocus: !1,
				children: [
					m ? /* @__PURE__ */ d("header", {
						className: "modal__header",
						children: [/* @__PURE__ */ u(c, {
							className: "modal__title",
							children: m
						}), /* @__PURE__ */ u(a, {
							className: "modal__close",
							"aria-label": g,
							children: /* @__PURE__ */ u(e, {
								name: "close",
								size: "sm"
							})
						})]
					}) : /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u(c, { render: /* @__PURE__ */ u(t, { children: _ }) }), /* @__PURE__ */ u("header", {
						className: "modal__header modal__header--no-title",
						children: /* @__PURE__ */ u(a, {
							className: "modal__close",
							"aria-label": g,
							children: /* @__PURE__ */ u(e, {
								name: "close",
								size: "sm"
							})
						})
					})] }),
					y != null && /* @__PURE__ */ u(n, {
						className: "modal__description",
						children: y
					}),
					/* @__PURE__ */ u("div", {
						className: "modal__body",
						children: h
					})
				]
			})]
		})
	});
}
//#endregion
export { f as Modal };
