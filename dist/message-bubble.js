import './message-bubble.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/MessageBubble/MessageBubble.tsx
var n = e(function({ role: e, children: n, className: r, ...i }, a) {
	return /* @__PURE__ */ t("div", {
		ref: a,
		className: [
			"message-bubble",
			`message-bubble--${e}`,
			r ?? ""
		].filter(Boolean).join(" "),
		...i,
		children: n
	});
});
//#endregion
export { n as MessageBubble };
