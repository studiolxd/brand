import './message-bubble.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/MessageBubble/MessageBubble.tsx
var n = t(function({ role: t, children: n, className: r, ...i }, a) {
	return /* @__PURE__ */ e("div", {
		ref: a,
		className: [
			"message-bubble",
			`message-bubble--${t}`,
			r ?? ""
		].filter(Boolean).join(" "),
		...i,
		children: n
	});
});
//#endregion
export { n as MessageBubble };
