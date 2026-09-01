import './conversation-list.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Skeleton as n } from "./skeleton.js";
import { Alert as r } from "./alert.js";
import { EmptyState as i } from "./empty-state.js";
import { forwardRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/ConversationList/ConversationList.tsx
var c = a(function({ conversations: a, activeId: c, onNew: l, onSelect: u, onDelete: d, newLabel: f = "Nueva conversación", navLabel: p = "Conversaciones", deleteLabel: m = (e) => `Eliminar conversación "${e}"`, isLoading: h = !1, loadingCount: g = 4, error: _, emptyMessage: v = "Todavía no hay conversaciones", errorTitle: y = "No se pudieron cargar las conversaciones", className: b, ...x }, S) {
	let C = _ === void 0 ? h ? "loading" : a.length === 0 ? "empty" : "list" : "error";
	return /* @__PURE__ */ s("div", {
		ref: S,
		className: `conversation-list${b ? ` ${b}` : ""}`,
		...x,
		children: [/* @__PURE__ */ o("div", {
			className: "conversation-list__header",
			children: /* @__PURE__ */ o(t, {
				variant: "outline",
				block: !0,
				onClick: l,
				children: f
			})
		}), /* @__PURE__ */ s("nav", {
			"aria-label": p,
			className: "conversation-list__nav",
			"aria-busy": h || void 0,
			children: [
				C === "error" && /* @__PURE__ */ o(r, {
					variant: "error",
					title: y,
					description: _,
					className: "conversation-list__state"
				}),
				C === "loading" && /* @__PURE__ */ o("div", {
					className: "conversation-list__loading",
					children: Array.from({ length: g }, (e, t) => /* @__PURE__ */ o(n, {}, t))
				}),
				C === "empty" && /* @__PURE__ */ o(i, {
					size: "sm",
					title: v,
					className: "conversation-list__state"
				}),
				C === "list" && /* @__PURE__ */ o("ul", {
					className: "conversation-list__items",
					role: "list",
					children: a.map((n) => {
						let r = n.id === c;
						return /* @__PURE__ */ s("li", {
							className: "conversation-list__item",
							children: [/* @__PURE__ */ o("button", {
								type: "button",
								className: `conversation-list__label${r ? " conversation-list__label--active" : ""}`,
								"aria-current": r ? "page" : void 0,
								onClick: () => u(n.id),
								children: n.label
							}), /* @__PURE__ */ o(t, {
								variant: "ghost",
								size: "sm",
								iconOnly: !0,
								"aria-label": m(n.label),
								className: "conversation-list__delete",
								onClick: (e) => {
									e.stopPropagation(), d(n.id);
								},
								children: /* @__PURE__ */ o(e, {
									name: "close",
									size: "xs"
								})
							})]
						}, n.id);
					})
				})
			]
		})]
	});
});
//#endregion
export { c as ConversationList };
