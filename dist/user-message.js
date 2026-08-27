import './user-message.css';
import { MessageBubble as e } from "./message-bubble.js";
import { t } from "./_shared/messageTimestamp.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i } from "react";
//#region src/stories/molecules/UserMessage/UserMessage.tsx
var a = i(function({ children: i, timestamp: a, locale: o, timestampFormat: s, className: c, ...l }, u) {
	let d = t(a, o, s);
	return /* @__PURE__ */ r("div", {
		ref: u,
		className: `user-message${c ? ` ${c}` : ""}`,
		...l,
		children: [/* @__PURE__ */ n(e, {
			role: "user",
			children: i
		}), d && /* @__PURE__ */ n("time", {
			className: "user-message__timestamp",
			dateTime: d.dateTime,
			children: d.label
		})]
	});
});
//#endregion
export { a as UserMessage };
