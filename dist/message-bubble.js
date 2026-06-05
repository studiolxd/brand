import './message-bubble.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/MessageBubble/MessageBubble.tsx
function t({ role: t, children: n }) {
	return /* @__PURE__ */ e("div", {
		className: `message-bubble message-bubble--${t}`,
		children: n
	});
}
//#endregion
export { t as MessageBubble };
