'use client';
import './switcher.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
import * as n from "@radix-ui/react-switch";
//#region src/stories/atoms/Switcher/Switcher.tsx
var r = t(function({ size: t = "md", className: r, ...i }, a) {
	let o = [
		"switcher",
		t === "md" ? "" : `switcher--${t}`,
		r ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ e(n.Root, {
		ref: a,
		className: o,
		...i,
		children: /* @__PURE__ */ e(n.Thumb, { className: "switcher__thumb" })
	});
});
//#endregion
export { r as Switcher };
