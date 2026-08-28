import './assistant-message.css';
import { MessageBubble as e } from "./message-bubble.js";
import { TypingIndicator as t } from "./typing-indicator.js";
import { t as n } from "./_shared/messageTimestamp.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/AssistantMessage/AssistantMessage.tsx
var o = r(function({ children: r, model: o, timestamp: s, locale: c, timestampFormat: l, isStreaming: u = !1, streamingLabel: d, className: f, ...p }, m) {
	let h = n(s, c, l);
	return /* @__PURE__ */ a("div", {
		ref: m,
		className: `assistant-message${f ? ` ${f}` : ""}`,
		...p,
		children: [
			o && /* @__PURE__ */ i("span", {
				className: "assistant-message__model",
				children: o
			}),
			/* @__PURE__ */ i(e, {
				role: "assistant",
				children: u ? /* @__PURE__ */ i(t, { label: d }) : r
			}),
			h && !u && /* @__PURE__ */ i("time", {
				className: "assistant-message__timestamp",
				dateTime: h.dateTime,
				children: h.label
			})
		]
	});
});
//#endregion
export { o as AssistantMessage };
