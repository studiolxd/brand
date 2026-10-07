'use client';
import './conversation-thread.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { UserMessage as t } from "./user-message.js";
import { AssistantMessage as n } from "./assistant-message.js";
import { forwardRef as r, useEffect as i, useRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/conversationThread.ts
var c = { label: "Conversación" };
//#endregion
//#region src/stories/organisms/ConversationThread/ConversationThread.tsx
function l() {
	return typeof window > "u" || typeof window.matchMedia != "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}
var u = r(function({ messages: r = [], children: u, streamingName: d, streamingLabel: f, ariaLabel: p, locale: m, timestampFormat: h, className: g, ..._ }, v) {
	let y = a(null), b = e("conversationThread", c);
	return i(() => {
		y.current?.scrollIntoView({ behavior: l() });
	}, [r, u]), /* @__PURE__ */ s("div", {
		ref: v,
		className: `conversation-thread${g ? ` ${g}` : ""}`,
		role: "log",
		"aria-label": b("label", p),
		tabIndex: 0,
		"data-content": u == null ? "messages" : "children",
		..._,
		children: [u ?? r.map((e) => e.role === "user" ? /* @__PURE__ */ o(t, {
			timestamp: e.timestamp,
			locale: m,
			timestampFormat: h,
			children: e.content
		}, e.id) : /* @__PURE__ */ o(n, {
			model: e.model,
			timestamp: e.timestamp,
			locale: m,
			timestampFormat: h,
			isStreaming: e.isStreaming,
			streamingName: d,
			streamingLabel: f,
			children: e.content
		}, e.id)), /* @__PURE__ */ o("div", {
			ref: y,
			"aria-hidden": "true"
		})]
	});
});
//#endregion
export { u as ConversationThread };
