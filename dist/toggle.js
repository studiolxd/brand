'use client';
import './toggle.css';
import { n as e } from "./_shared/ToggleGroupContext.js";
import { forwardRef as t } from "react";
import { jsx as n } from "react/jsx-runtime";
import { Toggle as r } from "@base-ui-components/react/toggle";
//#region src/stories/atoms/Toggle/Toggle.tsx
var i = t(function({ size: t, iconOnly: i = !1, className: a, onPressedChange: o, ...s }, c) {
	let l = e(), u = t ?? l?.size ?? "md";
	return /* @__PURE__ */ n(r, {
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
