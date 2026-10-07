import '../dotsbutton.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { t as n } from "./focusable-when-disabled.js";
import { Button as r } from "../button.js";
import { forwardRef as i } from "react";
import { jsx as a } from "react/jsx-runtime";
//#region src/stories/messages/es/dotsButton.ts
var o = { label: "Más opciones" }, s = i(function({ size: n = "md", orientation: i = "horizontal", "aria-label": s, className: c, ...l }, u) {
	let d = e("dotsButton", o), f = [
		"dots-button",
		i === "vertical" ? "dots-button--vertical" : "",
		c
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ a(r, {
		ref: u,
		variant: "ghost",
		iconOnly: !0,
		size: n,
		"aria-label": d("label", s),
		className: f,
		...l,
		children: /* @__PURE__ */ a(t, {
			name: "dots",
			size: n === "lg" ? "md" : "sm"
		})
	});
});
n(s);
//#endregion
export { s as t };
