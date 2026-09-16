'use client';
import './conversation-list.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { Skeleton as r } from "./skeleton.js";
import { Tooltip as i } from "./tooltip.js";
import { Alert as a } from "./alert.js";
import { EmptyState as o } from "./empty-state.js";
import { forwardRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/molecules/ConversationList/ConversationList.tsx
function d(e) {
	return e.scrollWidth > e.clientWidth + 1;
}
var f = s(function({ conversations: s, activeId: f, onNew: p, onSelect: m, onDelete: h, newLabel: g, navLabel: _, deleteLabel: v, isLoading: y = !1, loadingCount: b = 4, error: x, emptyMessage: S, errorTitle: C, className: w, ...T }, E) {
	let [D, O] = c(null), k = e("conversationList"), A = x === void 0 ? y ? "loading" : s.length === 0 ? "empty" : "list" : "error";
	return /* @__PURE__ */ u("div", {
		ref: E,
		className: `conversation-list${w ? ` ${w}` : ""}`,
		...T,
		children: [/* @__PURE__ */ l("div", {
			className: "conversation-list__header",
			children: /* @__PURE__ */ l(n, {
				variant: "outline",
				block: !0,
				onClick: p,
				children: k("new", g)
			})
		}), /* @__PURE__ */ u("nav", {
			"aria-label": k("nav", _),
			className: "conversation-list__nav",
			"aria-busy": y || void 0,
			children: [
				A === "error" && /* @__PURE__ */ l(a, {
					variant: "error",
					title: k("error", C),
					description: x,
					className: "conversation-list__state"
				}),
				A === "loading" && /* @__PURE__ */ l("div", {
					className: "conversation-list__loading",
					children: Array.from({ length: b }, (e, t) => /* @__PURE__ */ l(r, {}, t))
				}),
				A === "empty" && /* @__PURE__ */ l(o, {
					size: "sm",
					title: k("empty", S),
					className: "conversation-list__state"
				}),
				A === "list" && /* @__PURE__ */ l("ul", {
					className: "conversation-list__items",
					role: "list",
					children: s.map((e) => {
						let r = e.id === f;
						return /* @__PURE__ */ u("li", {
							className: "conversation-list__item",
							children: [/* @__PURE__ */ l(i, {
								label: e.label,
								describe: !1,
								open: D === e.id,
								onOpenChange: (e) => {
									e || O(null);
								},
								onPointerEnter: (t) => {
									d(t.currentTarget) && O(e.id);
								},
								onPointerLeave: () => O(null),
								onFocus: (t) => {
									d(t.currentTarget) && O(e.id);
								},
								onBlur: () => O(null),
								children: /* @__PURE__ */ l("button", {
									type: "button",
									className: `conversation-list__label${r ? " conversation-list__label--active" : ""}`,
									"aria-current": r ? "page" : void 0,
									onClick: () => m(e.id),
									children: e.label
								})
							}), /* @__PURE__ */ l(n, {
								variant: "ghost",
								size: "sm",
								iconOnly: !0,
								"aria-label": k("delete", v)(e.label),
								className: "conversation-list__delete",
								onClick: (t) => {
									t.stopPropagation(), h(e.id);
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
export { f as ConversationList };
