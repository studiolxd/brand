import '../sheet.css';
import { n as e } from "./brandmessagescontext.js";
import { VisuallyHidden as t } from "../visually-hidden.js";
import { n } from "./portal-container.js";
import { t as r } from "./closebutton.js";
import { n as i, r as a, t as o } from "./dialogsurface.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Dialog as l } from "@base-ui/react/dialog";
//#region src/stories/messages/es/sheet.ts
var u = { close: "Cerrar" };
//#endregion
//#region src/stories/molecules/Sheet/Sheet.tsx
function d({ className: e, ...t }) {
	return /* @__PURE__ */ s(o, {
		className: ["sheet__footer", e].filter(Boolean).join(" "),
		...t
	});
}
function f({ open: o, onOpenChange: f, side: p = "right", title: m, titleHidden: h = !1, description: g, footer: _, children: v, closeLabel: y, hideClose: b = !1, trigger: x, container: S, onAnimationEndCapture: C, className: w, ...T }) {
	let E = e("sheet", u), D = n(S);
	return /* @__PURE__ */ c(l.Root, {
		open: o,
		onOpenChange: (e) => f(e),
		children: [x && /* @__PURE__ */ s(l.Trigger, { render: x }), /* @__PURE__ */ c(l.Portal, {
			container: D,
			children: [/* @__PURE__ */ s(a, { className: "sheet__overlay" }), /* @__PURE__ */ c(l.Popup, {
				className: ["sheet", w].filter(Boolean).join(" "),
				"data-side": p,
				onAnimationEndCapture: C,
				...T,
				children: [
					/* @__PURE__ */ c(i, {
						layout: "stacked",
						className: "sheet__header",
						children: [h ? /* @__PURE__ */ s(l.Title, { render: /* @__PURE__ */ s(t, { children: m }) }) : /* @__PURE__ */ s(l.Title, {
							className: "sheet__title",
							children: m
						}), g != null && /* @__PURE__ */ s(l.Description, {
							className: "sheet__description",
							children: g
						})]
					}),
					!b && /* @__PURE__ */ s(l.Close, {
						className: "sheet__close",
						render: /* @__PURE__ */ s(r, { label: E("close", y) })
					}),
					/* @__PURE__ */ s("div", {
						className: "sheet__body",
						children: v
					}),
					_ && /* @__PURE__ */ s(d, { children: _ })
				]
			})]
		})]
	});
}
//#endregion
export { d as n, f as t };
