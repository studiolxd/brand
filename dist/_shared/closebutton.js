import '../closebutton.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { t as n } from "./focusable-when-disabled.js";
import { forwardRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/stories/messages/es/closeButton.ts
var a = { label: "Cerrar" }, o = r(function({ label: n, size: r = "md", className: o, disabled: s, focusableWhenDisabled: c = !1, onClick: l, ...u }, d) {
	let f = e("closeButton", a), p = [
		"close-button",
		r === "md" ? "" : `close-button--${r}`,
		o
	].filter(Boolean).join(" "), m = !!s && c;
	return /* @__PURE__ */ i("button", {
		ref: d,
		type: "button",
		className: p,
		"aria-label": f("label", n),
		disabled: m ? void 0 : s,
		"aria-disabled": m ? !0 : void 0,
		onClick: (e) => {
			if (m) {
				e.preventDefault(), e.stopPropagation();
				return;
			}
			l?.(e);
		},
		...u,
		children: /* @__PURE__ */ i(t, { name: "close" })
	});
});
n(o);
//#endregion
export { o as t };
