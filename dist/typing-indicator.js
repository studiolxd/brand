'use client';
import './typing-indicator.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/atoms/TypingIndicator/TypingIndicator.tsx
function i({ name: i, label: a, className: o }) {
	let s = e("typingIndicator");
	return /* @__PURE__ */ r("span", {
		className: ["typing-indicator", o].filter(Boolean).join(" "),
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
			/* @__PURE__ */ n(t, { children: a ?? s("typing")(i) })
		]
	});
}
//#endregion
export { i as TypingIndicator };
