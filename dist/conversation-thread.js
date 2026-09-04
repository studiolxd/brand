'use client';
import './conversation-thread.css';
import { UserMessage as e } from "./user-message.js";
import { AssistantMessage as t } from "./assistant-message.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i, useEffect as a, useRef as o } from "react";
//#region src/stories/organisms/ConversationThread/ConversationThread.tsx
function s() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}
var c = i(function({ messages: i = [], children: c, streamingLabel: l, ariaLabel: u = "Conversación", locale: d, timestampFormat: f, className: p, ...m }, h) {
	let g = o(null);
	return a(() => {
		g.current?.scrollIntoView({ behavior: s() });
	}, [i, c]), /* @__PURE__ */ r("div", {
		ref: h,
		className: `conversation-thread${p ? ` ${p}` : ""}`,
		role: "log",
		"aria-label": u,
		...m,
		children: [c ?? i.map((r) => r.role === "user" ? /* @__PURE__ */ n(e, {
			timestamp: r.timestamp,
			locale: d,
			timestampFormat: f,
			children: r.content
		}, r.id) : /* @__PURE__ */ n(t, {
			model: r.model,
			timestamp: r.timestamp,
			locale: d,
			timestampFormat: f,
			isStreaming: r.isStreaming,
			streamingLabel: l,
			children: r.content
		}, r.id)), /* @__PURE__ */ n("div", {
			ref: g,
			"aria-hidden": "true"
		})]
	});
});
//#endregion
export { c as ConversationThread };
