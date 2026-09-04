import './user-message.css';
import { MessageBubble as e } from "./message-bubble.js";
import { t } from "./_shared/messageTimestamp.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i } from "react";
//#region src/stories/molecules/UserMessage/UserMessage.tsx
var a = i(function({ children: i, author: a, timestamp: o, locale: s, timestampFormat: c, className: l, ...u }, d) {
	let f = t(o, s, c);
	return /* @__PURE__ */ r("div", {
		ref: d,
		className: `user-message${l ? ` ${l}` : ""}`,
		...u,
		children: [
			a && /* @__PURE__ */ n("span", {
				className: "user-message__author",
				children: a
			}),
			/* @__PURE__ */ n(e, {
				role: "user",
				children: i
			}),
			f && /* @__PURE__ */ n("time", {
				className: "user-message__timestamp",
				dateTime: f.dateTime,
				children: f.label
			})
		]
	});
});
//#endregion
export { a as UserMessage };
