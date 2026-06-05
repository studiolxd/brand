import './conversation-list.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/ConversationList/ConversationList.tsx
function i({ conversations: i, activeId: a, onNew: o, onSelect: s, onDelete: c, newLabel: l = "Nueva conversación" }) {
	return /* @__PURE__ */ r("div", {
		className: "conversation-list",
		children: [/* @__PURE__ */ n("div", {
			className: "conversation-list__header",
			children: /* @__PURE__ */ n("button", {
				type: "button",
				className: "conversation-list__new",
				onClick: o,
				children: l
			})
		}), /* @__PURE__ */ n("nav", {
			"aria-label": "Conversaciones",
			className: "conversation-list__nav",
			children: /* @__PURE__ */ n("ul", {
				className: "conversation-list__items",
				role: "list",
				children: i.map((i) => {
					let o = i.id === a;
					return /* @__PURE__ */ r("li", {
						className: "conversation-list__item",
						children: [/* @__PURE__ */ n("button", {
							type: "button",
							className: `conversation-list__label${o ? " conversation-list__label--active" : ""}`,
							"aria-current": o ? "page" : void 0,
							onClick: () => s(i.id),
							children: i.label
						}), /* @__PURE__ */ r("button", {
							type: "button",
							className: "conversation-list__delete",
							onClick: (e) => {
								e.stopPropagation(), c(i.id);
							},
							tabIndex: -1,
							children: [/* @__PURE__ */ n(e, {
								name: "close",
								size: "xs"
							}), /* @__PURE__ */ r(t, { children: [
								"Eliminar conversación \"",
								i.label,
								"\""
							] })]
						})]
					}, i.id);
				})
			})
		})]
	});
}
//#endregion
export { i as ConversationList };
