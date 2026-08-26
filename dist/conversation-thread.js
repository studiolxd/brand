'use client';
import './conversation-thread.css';
import { UserMessage as e } from "./user-message.js";
import { AssistantMessage as t } from "./assistant-message.js";
import { useEffect as n, useRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/organisms/ConversationThread/ConversationThread.tsx
function o({ messages: o, streamingLabel: s, ariaLabel: c = "Conversación" }) {
	let l = r(null);
	return n(() => {
		l.current?.scrollIntoView({ behavior: "smooth" });
	}, [o]), /* @__PURE__ */ a("div", {
		className: "conversation-thread",
		role: "log",
		"aria-label": c,
		children: [o.map((n) => n.role === "user" ? /* @__PURE__ */ i(e, {
			timestamp: n.timestamp,
			children: n.content
		}, n.id) : /* @__PURE__ */ i(t, {
			model: n.model,
			timestamp: n.timestamp,
			isStreaming: n.isStreaming,
			streamingLabel: s,
			children: n.content
		}, n.id)), /* @__PURE__ */ i("div", {
			ref: l,
			"aria-hidden": "true"
		})]
	});
}
//#endregion
export { o as ConversationThread };
