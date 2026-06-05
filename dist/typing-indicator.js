import './typing-indicator.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/atoms/TypingIndicator/TypingIndicator.tsx
function r({ label: r = "El asistente está escribiendo…" }) {
	return /* @__PURE__ */ n("span", {
		className: "typing-indicator",
		role: "status",
		children: [
			/* @__PURE__ */ t("span", {
				className: "typing-indicator__dot",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ t("span", {
				className: "typing-indicator__dot",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ t("span", {
				className: "typing-indicator__dot",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ t(e, { children: r })
		]
	});
}
//#endregion
export { r as TypingIndicator };
