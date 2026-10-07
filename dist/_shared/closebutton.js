import '../closebutton.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { forwardRef as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/messages/es/closeButton.ts
var i = { label: "Cerrar" }, a = n(function({ label: n, size: a = "md", className: o, ...s }, c) {
	let l = e("closeButton", i);
	return /* @__PURE__ */ r("button", {
		ref: c,
		type: "button",
		className: [
			"close-button",
			a === "md" ? "" : `close-button--${a}`,
			o
		].filter(Boolean).join(" "),
		"aria-label": l("label", n),
		...s,
		children: /* @__PURE__ */ r(t, { name: "close" })
	});
});
//#endregion
export { a as t };
