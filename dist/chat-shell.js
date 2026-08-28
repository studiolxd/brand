import './chat-shell.css';
import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/templates/ChatShell/ChatShell.tsx
var r = e(function({ list: e, header: r, children: i, composer: a, listLabel: o = "Conversaciones", className: s, ...c }, l) {
	return /* @__PURE__ */ n("div", {
		ref: l,
		className: [
			"chat-shell",
			e ? "chat-shell--with-list" : "",
			s ?? ""
		].filter(Boolean).join(" "),
		...c,
		children: [e && /* @__PURE__ */ t("aside", {
			className: "chat-shell__list",
			"aria-label": o,
			children: e
		}), /* @__PURE__ */ n("div", {
			className: "chat-shell__main",
			children: [
				r && /* @__PURE__ */ t("header", {
					className: "chat-shell__header",
					children: r
				}),
				/* @__PURE__ */ t("div", {
					className: "chat-shell__thread",
					children: i
				}),
				a && /* @__PURE__ */ t("div", {
					className: "chat-shell__composer",
					children: a
				})
			]
		})]
	});
});
//#endregion
export { r as ChatShell };
