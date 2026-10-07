'use client';
import './chat-shell.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { t as r } from "./_shared/assign-ref.js";
import { t as i } from "./_shared/sheet.js";
import { t as a } from "./_shared/media-query.js";
import { forwardRef as o, useCallback as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/messages/es/chatShell.ts
var d = {
	list: "Conversaciones",
	listTrigger: "Abrir conversaciones"
}, f = "(min-width: 1024px)", p = o(function({ list: o, header: p, children: m, composer: h, listLabel: g, listTriggerLabel: _, listOpen: v, onListOpenChange: y, className: b, ...x }, S) {
	let C = e("chatShell", d), w = a(f), T = w ?? !0, [E, D] = c(!1), [O, k] = c(null), A = s((e) => {
		k(e), r(S, e);
	}, [S]), [j, M] = c(w);
	w !== j && (M(w), w && D(!1));
	let N = s((e) => {
		v === void 0 && D(e), y?.(e);
	}, [v, y]), P = !T && (v ?? E), F = o != null && T, I = o != null && !T;
	return /* @__PURE__ */ u("div", {
		ref: A,
		className: [
			"chat-shell",
			F ? "chat-shell--with-list" : "",
			b ?? ""
		].filter(Boolean).join(" "),
		"data-layout": w === null ? void 0 : T ? "column" : "drawer",
		...x,
		children: [
			F && /* @__PURE__ */ l("aside", {
				className: "chat-shell__list",
				"aria-label": C("list", g),
				children: o
			}),
			/* @__PURE__ */ u("div", {
				className: "chat-shell__main",
				children: [
					(p || I) && /* @__PURE__ */ u("header", {
						className: "chat-shell__header",
						children: [I && /* @__PURE__ */ l(n, {
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": C("listTrigger", _),
							"aria-haspopup": "dialog",
							"aria-expanded": P,
							className: "chat-shell__list-trigger",
							onClick: () => N(!0),
							children: /* @__PURE__ */ l(t, {
								name: "layout-sidebar",
								size: "sm"
							})
						}), p && /* @__PURE__ */ l("div", {
							className: "chat-shell__header-content",
							children: p
						})]
					}),
					/* @__PURE__ */ l("div", {
						className: "chat-shell__thread",
						children: m
					}),
					h && /* @__PURE__ */ l("div", {
						className: "chat-shell__composer",
						children: h
					})
				]
			}),
			I && /* @__PURE__ */ u(i, {
				side: "left",
				open: P,
				onOpenChange: N,
				title: C("list", g),
				titleHidden: !0,
				container: O ?? void 0,
				hideClose: !0,
				className: "chat-shell__drawer",
				children: [/* @__PURE__ */ l("header", {
					className: "chat-shell__header",
					children: /* @__PURE__ */ l(n, {
						variant: "ghost",
						size: "sm",
						iconOnly: !0,
						"aria-label": C("listTrigger", _),
						"aria-expanded": !0,
						className: "chat-shell__list-trigger",
						onClick: () => N(!1),
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
export { p as ChatShell };
