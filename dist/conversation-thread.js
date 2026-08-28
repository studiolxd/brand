'use client';
import './conversation-thread.css';
import { UserMessage as e } from "./user-message.js";
import { AssistantMessage as t } from "./assistant-message.js";
import { forwardRef as n, useEffect as r, useRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/organisms/ConversationThread/ConversationThread.tsx
function s() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}
var c = n(function({ messages: n = [], children: c, streamingLabel: l, ariaLabel: u = "Conversación", locale: d, timestampFormat: f, className: p, ...m }, h) {
	let g = i(null);
	return r(() => {
		g.current?.scrollIntoView({ behavior: s() });
	}, [n, c]), /* @__PURE__ */ o("div", {
		ref: h,
		className: `conversation-thread${p ? ` ${p}` : ""}`,
		role: "log",
		"aria-label": u,
		...m,
		children: [c ?? n.map((n) => n.role === "user" ? /* @__PURE__ */ a(e, {
			timestamp: n.timestamp,
			locale: d,
			timestampFormat: f,
			children: n.content
		}, n.id) : /* @__PURE__ */ a(t, {
			model: n.model,
			timestamp: n.timestamp,
			locale: d,
			timestampFormat: f,
			isStreaming: n.isStreaming,
			streamingLabel: l,
			children: n.content
		}, n.id)), /* @__PURE__ */ a("div", {
			ref: g,
			"aria-hidden": "true"
		})]
	});
});
//#endregion
export { c as ConversationThread };
