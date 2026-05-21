'use client';
import './switcher.css';
import { jsx as e } from "react/jsx-runtime";
import * as t from "@radix-ui/react-switch";
//#region src/stories/atoms/Switcher/Switcher.tsx
function n({ checked: n, defaultChecked: r, disabled: i, size: a = "md", id: o, name: s, value: c, required: l, "aria-label": u, "aria-labelledby": d, onCheckedChange: f }) {
	let p = ["switcher", a === "md" ? "" : `switcher--${a}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ e(t.Root, {
		className: p,
		checked: n,
		defaultChecked: r,
		disabled: i,
		id: o,
		name: s,
		value: c,
		required: l,
		"aria-label": u,
		"aria-labelledby": d,
		onCheckedChange: f,
		children: /* @__PURE__ */ e(t.Thumb, { className: "switcher__thumb" })
	});
}
//#endregion
export { n as Switcher };
