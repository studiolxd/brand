'use client';
import './chat-shell.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { Sheet as r } from "./sheet.js";
import { forwardRef as i, useCallback as a, useEffect as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/templates/ChatShell/ChatShell.tsx
var u = "(min-width: 1024px)", d = i(function({ list: i, header: d, children: f, composer: p, listLabel: m, listTriggerLabel: h, listOpen: g, onListOpenChange: _, className: v, ...y }, b) {
	let x = e("chatShell"), [S, C] = s(() => typeof window > "u" ? !0 : window.matchMedia(u).matches), [w, T] = s(!1), [E, D] = s(null), O = a((e) => {
		D(e), typeof b == "function" ? b(e) : b && (b.current = e);
	}, [b]);
	o(() => {
		let e = window.matchMedia(u), t = () => {
			C(e.matches), e.matches && T(!1);
		};
		return t(), e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let k = a((e) => {
		g === void 0 && T(e), _?.(e);
	}, [g, _]), A = !S && (g ?? w), j = i != null && S, M = i != null && !S;
	return /* @__PURE__ */ l("div", {
		ref: O,
		className: [
			"chat-shell",
			j ? "chat-shell--with-list" : "",
			v ?? ""
		].filter(Boolean).join(" "),
		...y,
		children: [
			j && /* @__PURE__ */ c("aside", {
				className: "chat-shell__list",
				"aria-label": x("list", m),
				children: i
			}),
			/* @__PURE__ */ l("div", {
				className: "chat-shell__main",
				children: [
					(d || M) && /* @__PURE__ */ l("header", {
						className: "chat-shell__header",
						children: [M && /* @__PURE__ */ c(n, {
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": x("listTrigger", h),
							"aria-haspopup": "dialog",
							"aria-expanded": A,
							className: "chat-shell__list-trigger",
							onClick: () => k(!0),
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
			M && /* @__PURE__ */ l(r, {
				side: "left",
				open: A,
				onOpenChange: k,
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
						onClick: () => k(!1),
						children: /* @__PURE__ */ c(t, {
							name: "layout-sidebar",
							size: "sm"
						})
					})
				}), /* @__PURE__ */ c("div", {
					className: "chat-shell__drawer-list",
					children: i
				})]
			})
		]
	});
});
//#endregion
export { d as ChatShell };
