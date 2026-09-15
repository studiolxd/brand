'use client';
import './chat-shell.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Sheet as n } from "./sheet.js";
import { forwardRef as r, useCallback as i, useEffect as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/templates/ChatShell/ChatShell.tsx
var l = "(min-width: 1024px)", u = r(function({ list: r, header: u, children: d, composer: f, listLabel: p = "Conversaciones", listTriggerLabel: m = "Abrir conversaciones", listOpen: h, onListOpenChange: g, className: _, ...v }, y) {
	let [b, x] = o(() => typeof window > "u" ? !0 : window.matchMedia(l).matches), [S, C] = o(!1), [w, T] = o(null), E = i((e) => {
		T(e), typeof y == "function" ? y(e) : y && (y.current = e);
	}, [y]);
	a(() => {
		let e = window.matchMedia(l), t = () => {
			x(e.matches), e.matches && C(!1);
		};
		return t(), e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let D = i((e) => {
		h === void 0 && C(e), g?.(e);
	}, [h, g]), O = !b && (h ?? S), k = r != null && b, A = r != null && !b;
	return /* @__PURE__ */ c("div", {
		ref: E,
		className: [
			"chat-shell",
			k ? "chat-shell--with-list" : "",
			_ ?? ""
		].filter(Boolean).join(" "),
		...v,
		children: [
			k && /* @__PURE__ */ s("aside", {
				className: "chat-shell__list",
				"aria-label": p,
				children: r
			}),
			/* @__PURE__ */ c("div", {
				className: "chat-shell__main",
				children: [
					(u || A) && /* @__PURE__ */ c("header", {
						className: "chat-shell__header",
						children: [A && /* @__PURE__ */ s(t, {
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": m,
							"aria-haspopup": "dialog",
							"aria-expanded": O,
							className: "chat-shell__list-trigger",
							onClick: () => D(!0),
							children: /* @__PURE__ */ s(e, {
								name: "layout-sidebar",
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
			A && /* @__PURE__ */ c(n, {
				side: "left",
				open: O,
				onOpenChange: D,
				title: p,
				titleHidden: !0,
				container: w ?? void 0,
				hideClose: !0,
				className: "chat-shell__drawer",
				children: [/* @__PURE__ */ s("header", {
					className: "chat-shell__header",
					children: /* @__PURE__ */ s(t, {
						variant: "ghost",
						size: "sm",
						iconOnly: !0,
						"aria-label": m,
						"aria-expanded": !0,
						className: "chat-shell__list-trigger",
						onClick: () => D(!1),
						children: /* @__PURE__ */ s(e, {
							name: "layout-sidebar",
							size: "sm"
						})
					})
				}), /* @__PURE__ */ s("div", {
					className: "chat-shell__drawer-list",
					children: r
				})]
			})
		]
	});
});
//#endregion
export { u as ChatShell };
