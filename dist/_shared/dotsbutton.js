import '../dotsbutton.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { Button as n } from "../button.js";
import { forwardRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/stories/messages/es/dotsButton.ts
var a = { label: "Más opciones" }, o = r(function({ size: r = "md", orientation: o = "horizontal", "aria-label": s, className: c, ...l }, u) {
	let d = e("dotsButton", a), f = [
		"dots-button",
		o === "vertical" ? "dots-button--vertical" : "",
		c
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ i(n, {
		ref: u,
		variant: "ghost",
		iconOnly: !0,
		size: r,
		"aria-label": d("label", s),
		className: f,
		...l,
		children: /* @__PURE__ */ i(t, {
			name: "dots",
			size: r === "lg" ? "md" : "sm"
		})
	});
});
//#endregion
export { o as t };
