'use client';
import './chat-shell.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Sheet as n } from "./sheet.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a, useCallback as o, useEffect as s, useState as c } from "react";
//#region src/stories/templates/ChatShell/ChatShell.tsx
var l = "(min-width: 1024px)", u = a(function({ list: a, header: u, children: d, composer: f, listLabel: p = "Conversaciones", listTriggerLabel: m = "Abrir conversaciones", listOpen: h, onListOpenChange: g, className: _, ...v }, y) {
	let [b, x] = c(() => typeof window > "u" ? !0 : window.matchMedia(l).matches), [S, C] = c(!1);
	s(() => {
		let e = window.matchMedia(l), t = () => {
			x(e.matches), e.matches && C(!1);
		};
		return t(), e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let w = o((e) => {
		h === void 0 && C(e), g?.(e);
	}, [h, g]), T = !b && (h ?? S), E = a != null && b, D = a != null && !b;
	return /* @__PURE__ */ i("div", {
		ref: y,
		className: [
			"chat-shell",
			E ? "chat-shell--with-list" : "",
			_ ?? ""
		].filter(Boolean).join(" "),
		...v,
		children: [
			E && /* @__PURE__ */ r("aside", {
				className: "chat-shell__list",
				"aria-label": p,
				children: a
			}),
			/* @__PURE__ */ i("div", {
				className: "chat-shell__main",
				children: [
					(u || D) && /* @__PURE__ */ i("header", {
						className: "chat-shell__header",
						children: [D && /* @__PURE__ */ r(t, {
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": m,
							"aria-haspopup": "dialog",
							"aria-expanded": T,
							className: "chat-shell__list-trigger",
							onClick: () => w(!0),
							children: /* @__PURE__ */ r(e, {
								name: "menu",
								size: "sm"
							})
						}), u && /* @__PURE__ */ r("div", {
							className: "chat-shell__header-content",
							children: u
						})]
					}),
					/* @__PURE__ */ r("div", {
						className: "chat-shell__thread",
						children: d
					}),
					f && /* @__PURE__ */ r("div", {
						className: "chat-shell__composer",
						children: f
					})
				]
			}),
			D && /* @__PURE__ */ r(n, {
				side: "left",
				open: T,
				onOpenChange: w,
				title: p,
				className: "chat-shell__drawer",
				children: a
			})
		]
	});
});
//#endregion
export { u as ChatShell };
