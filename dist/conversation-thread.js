'use client';
import './conversation-thread.css';
import { UserMessage as e } from "./user-message.js";
import { AssistantMessage as t } from "./assistant-message.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useEffect as i, useRef as a } from "react";
//#region src/stories/organisms/ConversationThread/ConversationThread.tsx
function o({ messages: o, streamingLabel: s, ariaLabel: c = "Conversación" }) {
	let l = a(null);
	return i(() => {
		l.current?.scrollIntoView({ behavior: "smooth" });
	}, [o]), /* @__PURE__ */ r("div", {
		className: "conversation-thread",
		role: "log",
		"aria-label": c,
		children: [o.map((r) => r.role === "user" ? /* @__PURE__ */ n(e, {
			timestamp: r.timestamp,
			children: r.content
		}, r.id) : /* @__PURE__ */ n(t, {
			model: r.model,
			timestamp: r.timestamp,
			isStreaming: r.isStreaming,
			streamingLabel: s,
			children: r.content
		}, r.id)), /* @__PURE__ */ n("div", {
			ref: l,
			"aria-hidden": "true"
		})]
	});
}
//#endregion
export { o as ConversationThread };
