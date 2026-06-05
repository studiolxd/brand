import './assistant-message.css';
import { MessageBubble as e } from "./message-bubble.js";
import { TypingIndicator as t } from "./typing-indicator.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/AssistantMessage/AssistantMessage.tsx
function i({ children: i, model: a, timestamp: o, isStreaming: s = !1, streamingLabel: c }) {
	return /* @__PURE__ */ r("div", {
		className: "assistant-message",
		children: [
			a && /* @__PURE__ */ n("span", {
				className: "assistant-message__model",
				children: a
			}),
			/* @__PURE__ */ n(e, {
				role: "assistant",
				children: s ? /* @__PURE__ */ n(t, { label: c }) : i
			}),
			o && !s && /* @__PURE__ */ n("time", {
				className: "assistant-message__timestamp",
				children: o
			})
		]
	});
}
//#endregion
export { i as AssistantMessage };
