import './assistant-message.css';
import { MessageBubble as e } from "./message-bubble.js";
import { TypingIndicator as t } from "./typing-indicator.js";
import { t as n } from "./_shared/messagetimestamp.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/AssistantMessage/AssistantMessage.tsx
var o = r(function({ children: r, model: o, timestamp: s, locale: c, timestampFormat: l, isStreaming: u = !1, streamingName: d, streamingLabel: f, className: p, ...m }, h) {
	let g = n(s, c, l);
	return /* @__PURE__ */ a("div", {
		ref: h,
		className: `assistant-message${p ? ` ${p}` : ""}`,
		...m,
		children: [
			o && /* @__PURE__ */ i("span", {
				className: "assistant-message__model",
				children: o
			}),
			/* @__PURE__ */ i(e, {
				role: "assistant",
				children: u ? /* @__PURE__ */ i(t, {
					name: d,
					label: f
				}) : r
			}),
			g && !u && /* @__PURE__ */ i("time", {
				className: "assistant-message__timestamp",
				dateTime: g.dateTime,
				children: g.label
			})
		]
	});
});
//#endregion
export { o as AssistantMessage };
