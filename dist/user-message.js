import './user-message.css';
import { MessageBubble as e } from "./message-bubble.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/UserMessage/UserMessage.tsx
function r({ children: r, timestamp: i }) {
	return /* @__PURE__ */ n("div", {
		className: "user-message",
		children: [/* @__PURE__ */ t(e, {
			role: "user",
			children: r
		}), i && /* @__PURE__ */ t("time", {
			className: "user-message__timestamp",
			children: i
		})]
	});
}
//#endregion
export { r as UserMessage };
