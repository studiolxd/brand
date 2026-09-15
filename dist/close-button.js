'use client';
import './close-button.css';
import { Icon as e } from "./icon.js";
import { forwardRef as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/atoms/CloseButton/CloseButton.tsx
var r = t(function({ label: t = "Cerrar", size: r = "md", className: i, ...a }, o) {
	return /* @__PURE__ */ n("button", {
		ref: o,
		type: "button",
		className: [
			"close-button",
			r === "md" ? "" : `close-button--${r}`,
			i
		].filter(Boolean).join(" "),
		"aria-label": t,
		...a,
		children: /* @__PURE__ */ n(e, { name: "close" })
	});
});
//#endregion
export { r as CloseButton };
