import './user-message.css';
import { MessageBubble as e } from "./message-bubble.js";
import { t } from "./_shared/messageTimestamp.js";
import { forwardRef as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/UserMessage/UserMessage.tsx
var a = n(function({ children: n, timestamp: a, locale: o, timestampFormat: s, className: c, ...l }, u) {
	let d = t(a, o, s);
	return /* @__PURE__ */ i("div", {
		ref: u,
		className: `user-message${c ? ` ${c}` : ""}`,
		...l,
		children: [/* @__PURE__ */ r(e, {
			role: "user",
			children: n
		}), d && /* @__PURE__ */ r("time", {
			className: "user-message__timestamp",
			dateTime: d.dateTime,
			children: d.label
		})]
	});
});
//#endregion
export { a as UserMessage };
