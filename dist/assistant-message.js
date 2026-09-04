import './assistant-message.css';
import { MessageBubble as e } from "./message-bubble.js";
import { TypingIndicator as t } from "./typing-indicator.js";
import { t as n } from "./_shared/messageTimestamp.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a } from "react";
//#region src/stories/molecules/AssistantMessage/AssistantMessage.tsx
var o = a(function({ children: a, model: o, timestamp: s, locale: c, timestampFormat: l, isStreaming: u = !1, streamingLabel: d, className: f, ...p }, m) {
	let h = n(s, c, l);
	return /* @__PURE__ */ i("div", {
		ref: m,
		className: `assistant-message${f ? ` ${f}` : ""}`,
		...p,
		children: [
			o && /* @__PURE__ */ r("span", {
				className: "assistant-message__model",
				children: o
			}),
			/* @__PURE__ */ r(e, {
				role: "assistant",
				children: u ? /* @__PURE__ */ r(t, { label: d }) : a
			}),
			h && !u && /* @__PURE__ */ r("time", {
				className: "assistant-message__timestamp",
				dateTime: h.dateTime,
				children: h.label
			})
		]
	});
});
//#endregion
export { o as AssistantMessage };
