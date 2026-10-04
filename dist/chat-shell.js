'use client';
import './chat-shell.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { Sheet as r } from "./sheet.js";
import { t as i } from "./_shared/media-query.js";
import { forwardRef as a, useCallback as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/templates/ChatShell/ChatShell.tsx
var u = "(min-width: 1024px)", d = a(function({ list: a, header: d, children: f, composer: p, listLabel: m, listTriggerLabel: h, listOpen: g, onListOpenChange: _, className: v, ...y }, b) {
	let x = e("chatShell"), S = i(u), C = S ?? !0, [w, T] = s(!1), [E, D] = s(null), O = o((e) => {
		D(e), typeof b == "function" ? b(e) : b && (b.current = e);
	}, [b]), [k, A] = s(S);
	S !== k && (A(S), S && T(!1));
	let j = o((e) => {
		g === void 0 && T(e), _?.(e);
	}, [g, _]), M = !C && (g ?? w), N = a != null && C, P = a != null && !C;
	return /* @__PURE__ */ l("div", {
		ref: O,
		className: [
			"chat-shell",
			N ? "chat-shell--with-list" : "",
			v ?? ""
		].filter(Boolean).join(" "),
		"data-layout": S === null ? void 0 : C ? "column" : "drawer",
		...y,
		children: [
			N && /* @__PURE__ */ c("aside", {
				className: "chat-shell__list",
				"aria-label": x("list", m),
				children: a
			}),
			/* @__PURE__ */ l("div", {
				className: "chat-shell__main",
				children: [
					(d || P) && /* @__PURE__ */ l("header", {
						className: "chat-shell__header",
						children: [P && /* @__PURE__ */ c(n, {
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": x("listTrigger", h),
							"aria-haspopup": "dialog",
							"aria-expanded": M,
							className: "chat-shell__list-trigger",
							onClick: () => j(!0),
							children: /* @__PURE__ */ c(t, {
								name: "layout-sidebar",
								size: "sm"
							})
						}), d && /* @__PURE__ */ c("div", {
							className: "chat-shell__header-content",
							children: d
						})]
					}),
					/* @__PURE__ */ c("div", {
						className: "chat-shell__thread",
						children: f
					}),
					p && /* @__PURE__ */ c("div", {
						className: "chat-shell__composer",
						children: p
					})
				]
			}),
			P && /* @__PURE__ */ l(r, {
				side: "left",
				open: M,
				onOpenChange: j,
				title: x("list", m),
				titleHidden: !0,
				container: E ?? void 0,
				hideClose: !0,
				className: "chat-shell__drawer",
				children: [/* @__PURE__ */ c("header", {
					className: "chat-shell__header",
					children: /* @__PURE__ */ c(n, {
						variant: "ghost",
						size: "sm",
						iconOnly: !0,
						"aria-label": x("listTrigger", h),
						"aria-expanded": !0,
						className: "chat-shell__list-trigger",
						onClick: () => j(!1),
						children: /* @__PURE__ */ c(t, {
							name: "layout-sidebar",
							size: "sm"
						})
					})
				}), /* @__PURE__ */ c("div", {
					className: "chat-shell__drawer-list",
					children: a
				})]
			})
		]
	});
});
//#endregion
export { d as ChatShell };
