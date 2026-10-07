'use client';
import './toggle.css';
import { t as e } from "./_shared/focusable-when-disabled.js";
import { n as t } from "./_shared/togglegroupcontext.js";
import { forwardRef as n } from "react";
import { jsx as r } from "react/jsx-runtime";
import { Toggle as i } from "@base-ui/react/toggle";
//#region src/stories/atoms/Toggle/Toggle.tsx
var a = n(function({ size: e, iconOnly: n = !1, className: a, onPressedChange: o, disabled: s, focusableWhenDisabled: c = !1, onClick: l, ...u }, d) {
	let f = !!s && c, p = t(), m = e ?? p?.size ?? "md";
	return /* @__PURE__ */ r(i, {
		ref: d,
		className: [
			"toggle",
			m === "md" ? "" : `toggle--${m}`,
			n ? "toggle--icon-only" : "",
			a ?? ""
		].filter(Boolean).join(" "),
		onPressedChange: (e, t) => {
			if (f) {
				t.cancel();
				return;
			}
			o?.(e);
		},
		onClick: (e) => {
			if (f) {
				e.preventDefault();
				return;
			}
			l?.(e);
		},
		disabled: f ? !1 : s,
		...f ? {
			"aria-disabled": !0,
			"data-disabled": ""
		} : {},
		...u
	});
});
e(a);
//#endregion
export { a as Toggle };
