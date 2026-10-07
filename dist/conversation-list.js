'use client';
import './conversation-list.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { Skeleton as r } from "./skeleton.js";
import { Tooltip as i } from "./tooltip.js";
import { t as a } from "./_shared/alert.js";
import { EmptyState as o } from "./empty-state.js";
import { forwardRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/messages/es/conversationList.ts
var d = {
	new: "Nueva conversación",
	nav: "Conversaciones",
	delete: (e) => `Eliminar la conversación «${e}»`,
	empty: "Todavía no hay conversaciones",
	error: "No se pudieron cargar las conversaciones"
};
//#endregion
//#region src/stories/molecules/ConversationList/ConversationList.tsx
function f(e) {
	return e.scrollWidth > e.clientWidth + 1;
}
var p = s(function({ conversations: s, activeId: p, onNew: m, onSelect: h, onDelete: g, newLabel: _, navLabel: v, deleteLabel: y, isLoading: b = !1, loadingCount: x = 4, error: S, emptyMessage: C, emptyDescription: w, errorTitle: T, className: E, ...D }, O) {
	let [k, A] = c(null), j = e("conversationList", d), M = S === void 0 ? b ? "loading" : s.length === 0 ? "empty" : "list" : "error";
	return /* @__PURE__ */ u("div", {
		ref: O,
		className: `conversation-list${E ? ` ${E}` : ""}`,
		...D,
		children: [/* @__PURE__ */ l("div", {
			className: "conversation-list__header",
			children: /* @__PURE__ */ l(n, {
				variant: "outline",
				block: !0,
				onClick: m,
				children: j("new", _)
			})
		}), /* @__PURE__ */ u("nav", {
			"aria-label": j("nav", v),
			className: "conversation-list__nav",
			"aria-busy": b || void 0,
			children: [
				M === "error" && /* @__PURE__ */ l(a, {
					tone: "error",
					title: j("error", T),
					description: S,
					className: "conversation-list__state"
				}),
				M === "loading" && /* @__PURE__ */ l("div", {
					className: "conversation-list__loading",
					children: Array.from({ length: x }, (e, t) => /* @__PURE__ */ l(r, {}, t))
				}),
				M === "empty" && /* @__PURE__ */ l(o, {
					size: "sm",
					title: j("empty", C),
					description: w,
					className: "conversation-list__state"
				}),
				M === "list" && /* @__PURE__ */ l("ul", {
					className: "conversation-list__items",
					role: "list",
					children: s.map((e) => {
						let r = e.id === p;
						return /* @__PURE__ */ u("li", {
							className: "conversation-list__item",
							children: [/* @__PURE__ */ l(i, {
								label: e.label,
								describe: !1,
								open: k === e.id,
								onOpenChange: (e) => {
									e || A(null);
								},
								onPointerEnter: (t) => {
									f(t.currentTarget) && A(e.id);
								},
								onPointerLeave: () => A(null),
								onFocus: (t) => {
									f(t.currentTarget) && A(e.id);
								},
								onBlur: () => A(null),
								children: /* @__PURE__ */ l("button", {
									type: "button",
									className: `conversation-list__label${r ? " conversation-list__label--active" : ""}`,
									"aria-current": r ? "page" : void 0,
									onClick: () => h(e.id),
									children: e.label
								})
							}), /* @__PURE__ */ l(n, {
								variant: "ghost",
								size: "sm",
								iconOnly: !0,
								"aria-label": j("delete", y)(e.label),
								className: "conversation-list__delete",
								onClick: (t) => {
									t.stopPropagation(), g(e.id);
								},
								children: /* @__PURE__ */ l(t, {
									name: "close",
									size: "sm"
								})
							})]
						}, e.id);
					})
				})
			]
		})]
	});
});
//#endregion
export { p as ConversationList };
