'use client';
import './chat-shell.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Sheet as n } from "./sheet.js";
import { forwardRef as r, useCallback as i, useEffect as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/templates/ChatShell/ChatShell.tsx
var l = "(min-width: 1024px)", u = r(function({ list: r, header: u, children: d, composer: f, listLabel: p = "Conversaciones", listTriggerLabel: m = "Abrir conversaciones", listOpen: h, onListOpenChange: g, className: _, ...v }, y) {
	let [b, x] = o(() => typeof window > "u" ? !0 : window.matchMedia(l).matches), [S, C] = o(!1);
	a(() => {
		let e = window.matchMedia(l), t = () => {
			x(e.matches), e.matches && C(!1);
		};
		return t(), e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let w = i((e) => {
		h === void 0 && C(e), g?.(e);
	}, [h, g]), T = !b && (h ?? S), E = r != null && b, D = r != null && !b;
	return /* @__PURE__ */ c("div", {
		ref: y,
		className: [
			"chat-shell",
			E ? "chat-shell--with-list" : "",
			_ ?? ""
		].filter(Boolean).join(" "),
		...v,
		children: [
			E && /* @__PURE__ */ s("aside", {
				className: "chat-shell__list",
				"aria-label": p,
				children: r
			}),
			/* @__PURE__ */ c("div", {
				className: "chat-shell__main",
				children: [
					(u || D) && /* @__PURE__ */ c("header", {
						className: "chat-shell__header",
						children: [D && /* @__PURE__ */ s(t, {
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": m,
							"aria-haspopup": "dialog",
							"aria-expanded": T,
							className: "chat-shell__list-trigger",
							onClick: () => w(!0),
							children: /* @__PURE__ */ s(e, {
								name: "menu",
								size: "sm"
							})
						}), u && /* @__PURE__ */ s("div", {
							className: "chat-shell__header-content",
							children: u
						})]
					}),
					/* @__PURE__ */ s("div", {
						className: "chat-shell__thread",
						children: d
					}),
					f && /* @__PURE__ */ s("div", {
						className: "chat-shell__composer",
						children: f
					})
				]
			}),
			D && /* @__PURE__ */ s(n, {
				side: "left",
				open: T,
				onOpenChange: w,
				title: p,
				className: "chat-shell__drawer",
				children: r
			})
		]
	});
});
//#endregion
export { u as ChatShell };
