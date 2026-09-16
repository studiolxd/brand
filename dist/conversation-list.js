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
var f = s(function({ conversations: s, activeId: f, onNew: p, onSelect: m, onDelete: h, newLabel: g, navLabel: _, deleteLabel: v, isLoading: y = !1, loadingCount: b = 4, error: x, emptyMessage: S, emptyDescription: C, errorTitle: w, className: T, ...E }, D) {
	let [O, k] = c(null), A = e("conversationList"), j = x === void 0 ? y ? "loading" : s.length === 0 ? "empty" : "list" : "error";
	return /* @__PURE__ */ u("div", {
		ref: D,
		className: `conversation-list${T ? ` ${T}` : ""}`,
		...E,
		children: [/* @__PURE__ */ l("div", {
			className: "conversation-list__header",
			children: /* @__PURE__ */ l(n, {
				variant: "outline",
				block: !0,
				onClick: p,
				children: A("new", g)
			})
		}), /* @__PURE__ */ u("nav", {
			"aria-label": A("nav", _),
			className: "conversation-list__nav",
			"aria-busy": y || void 0,
			children: [
				j === "error" && /* @__PURE__ */ l(a, {
					variant: "error",
					title: A("error", w),
					description: x,
					className: "conversation-list__state"
				}),
				j === "loading" && /* @__PURE__ */ l("div", {
					className: "conversation-list__loading",
					children: Array.from({ length: b }, (e, t) => /* @__PURE__ */ l(r, {}, t))
				}),
				j === "empty" && /* @__PURE__ */ l(o, {
					size: "sm",
					title: A("empty", S),
					description: C,
					className: "conversation-list__state"
				}),
				j === "list" && /* @__PURE__ */ l("ul", {
					className: "conversation-list__items",
					role: "list",
					children: s.map((e) => {
						let r = e.id === f;
						return /* @__PURE__ */ u("li", {
							className: "conversation-list__item",
							children: [/* @__PURE__ */ l(i, {
								label: e.label,
								describe: !1,
								open: O === e.id,
								onOpenChange: (e) => {
									e || k(null);
								},
								onPointerEnter: (t) => {
									d(t.currentTarget) && k(e.id);
								},
								onPointerLeave: () => k(null),
								onFocus: (t) => {
									d(t.currentTarget) && k(e.id);
								},
								onBlur: () => k(null),
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
								"aria-label": A("delete", v)(e.label),
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
