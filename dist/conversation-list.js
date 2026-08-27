import './conversation-list.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a } from "react";
//#region src/stories/molecules/ConversationList/ConversationList.tsx
var o = a(function({ conversations: a, activeId: o, onNew: s, onSelect: c, onDelete: l, newLabel: u = "Nueva conversación", navLabel: d = "Conversaciones", deleteLabel: f = (e) => `Eliminar conversación "${e}"`, className: p, ...m }, h) {
	return /* @__PURE__ */ i("div", {
		ref: h,
		className: `conversation-list${p ? ` ${p}` : ""}`,
		...m,
		children: [/* @__PURE__ */ r("div", {
			className: "conversation-list__header",
			children: /* @__PURE__ */ r(n, {
				variant: "outline",
				block: !0,
				onClick: s,
				children: u
			})
		}), /* @__PURE__ */ r("nav", {
			"aria-label": d,
			className: "conversation-list__nav",
			children: /* @__PURE__ */ r("ul", {
				className: "conversation-list__items",
				role: "list",
				children: a.map((n) => {
					let a = n.id === o;
					return /* @__PURE__ */ i("li", {
						className: "conversation-list__item",
						children: [/* @__PURE__ */ r("button", {
							type: "button",
							className: `conversation-list__label${a ? " conversation-list__label--active" : ""}`,
							"aria-current": a ? "page" : void 0,
							onClick: () => c(n.id),
							children: n.label
						}), /* @__PURE__ */ i("button", {
							type: "button",
							className: "conversation-list__delete",
							onClick: (e) => {
								e.stopPropagation(), l(n.id);
							},
							children: [/* @__PURE__ */ r(e, {
								name: "close",
								size: "xs"
							}), /* @__PURE__ */ r(t, { children: f(n.label) })]
						})]
					}, n.id);
				})
			})
		})]
	});
});
//#endregion
export { o as ConversationList };
