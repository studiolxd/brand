import '../modal.css';
import { r as e } from "./brandmessagescontext.js";
import { VisuallyHidden as t } from "../visually-hidden.js";
import { n } from "./portal-container.js";
import { t as r } from "./closebutton.js";
import { n as i, r as a, t as o } from "./dialogsurface.js";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import { Dialog as u } from "@base-ui/react/dialog";
//#region src/stories/messages/es/modal.ts
var d = {
	close: "Cerrar",
	fallbackTitle: "Diálogo"
};
//#endregion
//#region src/stories/molecules/Modal/Modal.tsx
function f({ open: f, onClose: p, title: m, children: h, closeLabel: g, fallbackTitle: _, container: v, description: y, "aria-describedby": b, initialFocus: x, footer: S, footerClassName: C, className: w, ...T }) {
	let E = e("modal", d), D = n(v), O = b === void 0 ? {} : { "aria-describedby": b }, k = x === void 0 ? {} : { initialFocus: x };
	return /* @__PURE__ */ c(u.Root, {
		open: f,
		onOpenChange: (e) => {
			e || p();
		},
		children: /* @__PURE__ */ l(u.Portal, {
			container: D,
			children: [/* @__PURE__ */ c(a, { className: "modal__overlay" }), /* @__PURE__ */ l(u.Popup, {
				className: ["modal__content", w].filter(Boolean).join(" "),
				...O,
				...k,
				...T,
				children: [
					m ? /* @__PURE__ */ l(i, {
						layout: "inline",
						className: "modal__header",
						children: [/* @__PURE__ */ c(u.Title, {
							className: "modal__title",
							children: m
						}), /* @__PURE__ */ c(u.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ c(r, { label: E("close", g) })
						})]
					}) : /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c(u.Title, { render: /* @__PURE__ */ c(t, { children: E("fallbackTitle", _) }) }), /* @__PURE__ */ c(i, {
						layout: "inline",
						noTitle: !0,
						className: "modal__header modal__header--no-title",
						children: /* @__PURE__ */ c(u.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ c(r, { label: E("close", g) })
						})
					})] }),
					y != null && /* @__PURE__ */ c(u.Description, {
						className: "modal__description",
						children: y
					}),
					/* @__PURE__ */ c("div", {
						className: "modal__body",
						children: h
					}),
					S != null && /* @__PURE__ */ c(o, {
						className: ["modal__footer", C].filter(Boolean).join(" "),
						children: S
					})
				]
			})]
		})
	});
}
//#endregion
export { f as t };
