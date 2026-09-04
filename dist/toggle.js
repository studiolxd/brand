'use client';
import './toggle.css';
import { n as e } from "./_shared/ToggleGroupContext.js";
import { jsx as t } from "react/jsx-runtime";
import { forwardRef as n } from "react";
import { Toggle as r } from "@base-ui/react/toggle";
//#region src/stories/atoms/Toggle/Toggle.tsx
var i = n(function({ size: n, iconOnly: i = !1, className: a, onPressedChange: o, ...s }, c) {
	let l = e(), u = n ?? l?.size ?? "md";
	return /* @__PURE__ */ t(r, {
		ref: c,
		className: [
			"toggle",
			u === "md" ? "" : `toggle--${u}`,
			i ? "toggle--icon-only" : "",
			a ?? ""
		].filter(Boolean).join(" "),
		onPressedChange: o ? (e) => o(e) : void 0,
		...s
	});
});
//#endregion
export { i as Toggle };
