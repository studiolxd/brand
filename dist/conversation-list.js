'use client';
import './conversation-list.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Skeleton as n } from "./skeleton.js";
import { Tooltip as r } from "./tooltip.js";
import { Alert as i } from "./alert.js";
import { EmptyState as a } from "./empty-state.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { forwardRef as c, useState as l } from "react";
//#region src/stories/molecules/ConversationList/ConversationList.tsx
function u(e) {
	return e.scrollWidth > e.clientWidth + 1;
}
var d = c(function({ conversations: c, activeId: d, onNew: f, onSelect: p, onDelete: m, newLabel: h = "Nueva conversación", navLabel: g = "Conversaciones", deleteLabel: _ = (e) => `Eliminar conversación "${e}"`, isLoading: v = !1, loadingCount: y = 4, error: b, emptyMessage: x = "Todavía no hay conversaciones", errorTitle: S = "No se pudieron cargar las conversaciones", className: C, ...w }, T) {
	let [E, D] = l(null), O = b === void 0 ? v ? "loading" : c.length === 0 ? "empty" : "list" : "error";
	return /* @__PURE__ */ s("div", {
		ref: T,
		className: `conversation-list${C ? ` ${C}` : ""}`,
		...w,
		children: [/* @__PURE__ */ o("div", {
			className: "conversation-list__header",
			children: /* @__PURE__ */ o(t, {
				variant: "outline",
				block: !0,
				onClick: f,
				children: h
			})
		}), /* @__PURE__ */ s("nav", {
			"aria-label": g,
			className: "conversation-list__nav",
			"aria-busy": v || void 0,
			children: [
				O === "error" && /* @__PURE__ */ o(i, {
					variant: "error",
					title: S,
					description: b,
					className: "conversation-list__state"
				}),
				O === "loading" && /* @__PURE__ */ o("div", {
					className: "conversation-list__loading",
					children: Array.from({ length: y }, (e, t) => /* @__PURE__ */ o(n, {}, t))
				}),
				O === "empty" && /* @__PURE__ */ o(a, {
					size: "sm",
					title: x,
					className: "conversation-list__state"
				}),
				O === "list" && /* @__PURE__ */ o("ul", {
					className: "conversation-list__items",
					role: "list",
					children: c.map((n) => {
						let i = n.id === d;
						return /* @__PURE__ */ s("li", {
							className: "conversation-list__item",
							children: [/* @__PURE__ */ o(r, {
								label: n.label,
								describe: !1,
								open: E === n.id,
								onOpenChange: (e) => {
									e || D(null);
								},
								onPointerEnter: (e) => {
									u(e.currentTarget) && D(n.id);
								},
								onPointerLeave: () => D(null),
								onFocus: (e) => {
									u(e.currentTarget) && D(n.id);
								},
								onBlur: () => D(null),
								children: /* @__PURE__ */ o("button", {
									type: "button",
									className: `conversation-list__label${i ? " conversation-list__label--active" : ""}`,
									"aria-current": i ? "page" : void 0,
									onClick: () => p(n.id),
									children: n.label
								})
							}), /* @__PURE__ */ o(t, {
								variant: "ghost",
								size: "sm",
								iconOnly: !0,
								"aria-label": _(n.label),
								className: "conversation-list__delete",
								onClick: (e) => {
									e.stopPropagation(), m(n.id);
								},
								children: /* @__PURE__ */ o(e, {
									name: "close",
									size: "sm"
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
export { d as ConversationList };
