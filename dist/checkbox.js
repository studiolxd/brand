'use client';
import './checkbox.css';
import { jsx as e } from "react/jsx-runtime";
import * as t from "@radix-ui/react-checkbox";
//#region src/stories/atoms/Checkbox/Checkbox.tsx
function n({ checked: n, defaultChecked: r, disabled: i, size: a = "md", id: o, name: s, value: c, required: l, "aria-label": u, "aria-labelledby": d, onCheckedChange: f }) {
	let p = ["checkbox", a === "md" ? "" : `checkbox--${a}`].filter(Boolean).join(" ");
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
		children: /* @__PURE__ */ e(t.Indicator, { className: "checkbox__indicator" })
	});
}
//#endregion
export { n as Checkbox };
