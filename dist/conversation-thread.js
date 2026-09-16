'use client';
import './conversation-thread.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { UserMessage as t } from "./user-message.js";
import { AssistantMessage as n } from "./assistant-message.js";
import { forwardRef as r, useEffect as i, useRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/organisms/ConversationThread/ConversationThread.tsx
function c() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}
var l = r(function({ messages: r = [], children: l, streamingName: u, streamingLabel: d, ariaLabel: f, locale: p, timestampFormat: m, className: h, ...g }, _) {
	let v = a(null), y = e("conversationThread");
	return i(() => {
		v.current?.scrollIntoView({ behavior: c() });
	}, [r, l]), /* @__PURE__ */ s("div", {
		ref: _,
		className: `conversation-thread${h ? ` ${h}` : ""}`,
		role: "log",
		"aria-label": y("label", f),
		"data-content": l == null ? "messages" : "children",
		...g,
		children: [l ?? r.map((e) => e.role === "user" ? /* @__PURE__ */ o(t, {
			timestamp: e.timestamp,
			locale: p,
			timestampFormat: m,
			children: e.content
		}, e.id) : /* @__PURE__ */ o(n, {
			model: e.model,
			timestamp: e.timestamp,
			locale: p,
			timestampFormat: m,
			isStreaming: e.isStreaming,
			streamingName: u,
			streamingLabel: d,
			children: e.content
		}, e.id)), /* @__PURE__ */ o("div", {
			ref: v,
			"aria-hidden": "true"
		})]
	});
});
//#endregion
export { l as ConversationThread };
