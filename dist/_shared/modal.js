import '../modal.css';
import { n as e } from "./env.js";
import { r as t } from "./brandmessagescontext.js";
import { VisuallyHidden as n } from "../visually-hidden.js";
import { n as r } from "./portal-container.js";
import { t as i } from "./closebutton.js";
import { n as a, r as o, t as s } from "./dialogsurface.js";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { Dialog as d } from "@base-ui/react/dialog";
//#region src/stories/messages/es/modal.ts
var f = {
	close: "Cerrar",
	fallbackTitle: "Diálogo"
};
//#endregion
//#region src/stories/molecules/Modal/Modal.tsx
function p({ open: p, onOpenChange: m, onClose: h, title: g, children: _, closeLabel: v, fallbackTitle: y, container: b, description: x, "aria-describedby": S, initialFocus: C, footer: w, footerClassName: T, className: E, ...D }) {
	let O = t("modal", f), k = r(b), A = S === void 0 ? {} : { "aria-describedby": S }, j = C === void 0 ? {} : { initialFocus: C };
	return h !== void 0 && e("Modal", "onClose", "`onOpenChange`"), /* @__PURE__ */ l(d.Root, {
		open: p,
		onOpenChange: (e) => {
			m?.(e), e || h?.();
		},
		children: /* @__PURE__ */ u(d.Portal, {
			container: k,
			children: [/* @__PURE__ */ l(o, { className: "modal__overlay" }), /* @__PURE__ */ u(d.Popup, {
				className: ["modal__content", E].filter(Boolean).join(" "),
				...A,
				...j,
				...D,
				children: [
					g ? /* @__PURE__ */ u(a, {
						layout: "inline",
						className: "modal__header",
						children: [/* @__PURE__ */ l(d.Title, {
							className: "modal__title",
							children: g
						}), /* @__PURE__ */ l(d.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ l(i, { label: O("close", v) })
						})]
					}) : /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l(d.Title, { render: /* @__PURE__ */ l(n, { children: O("fallbackTitle", y) }) }), /* @__PURE__ */ l(a, {
						layout: "inline",
						noTitle: !0,
						className: "modal__header modal__header--no-title",
						children: /* @__PURE__ */ l(d.Close, {
							className: "modal__close",
							render: /* @__PURE__ */ l(i, { label: O("close", v) })
						})
					})] }),
					x != null && /* @__PURE__ */ l(d.Description, {
						className: "modal__description",
						children: x
					}),
					/* @__PURE__ */ l("div", {
						className: "modal__body",
						children: _
					}),
					w != null && /* @__PURE__ */ l(s, {
						className: ["modal__footer", T].filter(Boolean).join(" "),
						children: w
					})
				]
			})]
		})
	});
}
//#endregion
export { p as t };
