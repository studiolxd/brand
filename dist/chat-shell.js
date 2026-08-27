import './chat-shell.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { forwardRef as n } from "react";
//#region src/stories/templates/ChatShell/ChatShell.tsx
var r = n(function({ list: n, header: r, children: i, composer: a, listLabel: o = "Conversaciones", className: s, ...c }, l) {
	return /* @__PURE__ */ t("div", {
		ref: l,
		className: [
			"chat-shell",
			n ? "chat-shell--with-list" : "",
			s ?? ""
		].filter(Boolean).join(" "),
		...c,
		children: [n && /* @__PURE__ */ e("aside", {
			className: "chat-shell__list",
			"aria-label": o,
			children: n
		}), /* @__PURE__ */ t("div", {
			className: "chat-shell__main",
			children: [
				r && /* @__PURE__ */ e("header", {
					className: "chat-shell__header",
					children: r
				}),
				/* @__PURE__ */ e("div", {
					className: "chat-shell__thread",
					children: i
				}),
				a && /* @__PURE__ */ e("div", {
					className: "chat-shell__composer",
					children: a
				})
			]
		})]
	});
});
//#endregion
export { r as ChatShell };
