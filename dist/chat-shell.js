'use client';
import './chat-shell.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { t as r } from "./_shared/assign-ref.js";
import { Sheet as i } from "./sheet.js";
import { t as a } from "./_shared/media-query.js";
import { forwardRef as o, useCallback as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/templates/ChatShell/ChatShell.tsx
var d = "(min-width: 1024px)", f = o(function({ list: o, header: f, children: p, composer: m, listLabel: h, listTriggerLabel: g, listOpen: _, onListOpenChange: v, className: y, ...b }, x) {
	let S = e("chatShell"), C = a(d), w = C ?? !0, [T, E] = c(!1), [D, O] = c(null), k = s((e) => {
		O(e), r(x, e);
	}, [x]), [A, j] = c(C);
	C !== A && (j(C), C && E(!1));
	let M = s((e) => {
		_ === void 0 && E(e), v?.(e);
	}, [_, v]), N = !w && (_ ?? T), P = o != null && w, F = o != null && !w;
	return /* @__PURE__ */ u("div", {
		ref: k,
		className: [
			"chat-shell",
			P ? "chat-shell--with-list" : "",
			y ?? ""
		].filter(Boolean).join(" "),
		"data-layout": C === null ? void 0 : w ? "column" : "drawer",
		...b,
		children: [
			P && /* @__PURE__ */ l("aside", {
				className: "chat-shell__list",
				"aria-label": S("list", h),
				children: o
			}),
			/* @__PURE__ */ u("div", {
				className: "chat-shell__main",
				children: [
					(f || F) && /* @__PURE__ */ u("header", {
						className: "chat-shell__header",
						children: [F && /* @__PURE__ */ l(n, {
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": S("listTrigger", g),
							"aria-haspopup": "dialog",
							"aria-expanded": N,
							className: "chat-shell__list-trigger",
							onClick: () => M(!0),
							children: /* @__PURE__ */ l(t, {
								name: "layout-sidebar",
								size: "sm"
							})
						}), f && /* @__PURE__ */ l("div", {
							className: "chat-shell__header-content",
							children: f
						})]
					}),
					/* @__PURE__ */ l("div", {
						className: "chat-shell__thread",
						children: p
					}),
					m && /* @__PURE__ */ l("div", {
						className: "chat-shell__composer",
						children: m
					})
				]
			}),
			F && /* @__PURE__ */ u(i, {
				side: "left",
				open: N,
				onOpenChange: M,
				title: S("list", h),
				titleHidden: !0,
				container: D ?? void 0,
				hideClose: !0,
				className: "chat-shell__drawer",
				children: [/* @__PURE__ */ l("header", {
					className: "chat-shell__header",
					children: /* @__PURE__ */ l(n, {
						variant: "ghost",
						size: "sm",
						iconOnly: !0,
						"aria-label": S("listTrigger", g),
						"aria-expanded": !0,
						className: "chat-shell__list-trigger",
						onClick: () => M(!1),
						children: /* @__PURE__ */ l(t, {
							name: "layout-sidebar",
							size: "sm"
						})
					})
				}), /* @__PURE__ */ l("div", {
					className: "chat-shell__drawer-list",
					children: o
				})]
			})
		]
	});
});
//#endregion
export { f as ChatShell };
