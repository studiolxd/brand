import './user-message.css';
import { MessageBubble as e } from "./message-bubble.js";
import { t } from "./_shared/messageTimestamp.js";
import { forwardRef as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/UserMessage/UserMessage.tsx
var a = n(function({ children: n, author: a, timestamp: o, locale: s, timestampFormat: c, className: l, ...u }, d) {
	let f = t(o, s, c);
	return /* @__PURE__ */ i("div", {
		ref: d,
		className: `user-message${l ? ` ${l}` : ""}`,
		...u,
		children: [
			a && /* @__PURE__ */ r("span", {
				className: "user-message__author",
				children: a
			}),
			/* @__PURE__ */ r(e, {
				role: "user",
				children: n
			}),
			f && /* @__PURE__ */ r("time", {
				className: "user-message__timestamp",
				dateTime: f.dateTime,
				children: f.label
			})
		]
	});
});
//#endregion
export { a as UserMessage };
