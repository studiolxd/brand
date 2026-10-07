import '../typingindicator.css';
import { r as e } from "./brandmessagescontext.js";
import { VisuallyHidden as t } from "../visually-hidden.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/messages/es/typingIndicator.ts
var i = { typing: (e) => `${e} está escribiendo…` };
//#endregion
//#region src/stories/atoms/TypingIndicator/TypingIndicator.tsx
function a({ name: a, label: o, className: s }) {
	let c = e("typingIndicator", i);
	return /* @__PURE__ */ r("span", {
		className: ["typing-indicator", s].filter(Boolean).join(" "),
		role: "status",
		children: [
			/* @__PURE__ */ n("span", {
				className: "typing-indicator__dot",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ n("span", {
				className: "typing-indicator__dot",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ n("span", {
				className: "typing-indicator__dot",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ n(t, { children: o ?? c("typing")(a) })
		]
	});
}
//#endregion
export { a as t };
