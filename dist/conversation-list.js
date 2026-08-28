import './conversation-list.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { Skeleton as r } from "./skeleton.js";
import { Alert as i } from "./alert.js";
import { EmptyState as a } from "./empty-state.js";
import { forwardRef as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/ConversationList/ConversationList.tsx
var l = o(function({ conversations: o, activeId: l, onNew: u, onSelect: d, onDelete: f, newLabel: p = "Nueva conversación", navLabel: m = "Conversaciones", deleteLabel: h = (e) => `Eliminar conversación "${e}"`, isLoading: g = !1, loadingCount: _ = 4, error: v, emptyMessage: y = "Todavía no hay conversaciones", errorTitle: b = "No se pudieron cargar las conversaciones", className: x, ...S }, C) {
	let w = v === void 0 ? g ? "loading" : o.length === 0 ? "empty" : "list" : "error";
	return /* @__PURE__ */ c("div", {
		ref: C,
		className: `conversation-list${x ? ` ${x}` : ""}`,
		...S,
		children: [/* @__PURE__ */ s("div", {
			className: "conversation-list__header",
			children: /* @__PURE__ */ s(n, {
				variant: "outline",
				block: !0,
				onClick: u,
				children: p
			})
		}), /* @__PURE__ */ c("nav", {
			"aria-label": m,
			className: "conversation-list__nav",
			"aria-busy": g || void 0,
			children: [
				w === "error" && /* @__PURE__ */ s(i, {
					variant: "error",
					title: b,
					description: v,
					className: "conversation-list__state"
				}),
				w === "loading" && /* @__PURE__ */ s("div", {
					className: "conversation-list__loading",
					children: Array.from({ length: _ }, (e, t) => /* @__PURE__ */ s(r, {}, t))
				}),
				w === "empty" && /* @__PURE__ */ s(a, {
					size: "sm",
					title: y,
					className: "conversation-list__state"
				}),
				w === "list" && /* @__PURE__ */ s("ul", {
					className: "conversation-list__items",
					role: "list",
					children: o.map((n) => {
						let r = n.id === l;
						return /* @__PURE__ */ c("li", {
							className: "conversation-list__item",
							children: [/* @__PURE__ */ s("button", {
								type: "button",
								className: `conversation-list__label${r ? " conversation-list__label--active" : ""}`,
								"aria-current": r ? "page" : void 0,
								onClick: () => d(n.id),
								children: n.label
							}), /* @__PURE__ */ c("button", {
								type: "button",
								className: "conversation-list__delete",
								onClick: (e) => {
									e.stopPropagation(), f(n.id);
								},
								children: [/* @__PURE__ */ s(e, {
									name: "close",
									size: "xs"
								}), /* @__PURE__ */ s(t, { children: h(n.label) })]
							})]
						}, n.id);
					})
				})
			]
		})]
	});
});
//#endregion
export { l as ConversationList };
