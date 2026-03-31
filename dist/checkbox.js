'use client';
import './checkbox.css';
import { jsx as e } from "react/jsx-runtime";
import * as t from "@radix-ui/react-checkbox";
//#region src/stories/atoms/Checkbox/Checkbox.tsx
function n({ checked: n, defaultChecked: r, disabled: i, id: a, name: o, value: s, required: c, "aria-label": l, "aria-labelledby": u, onCheckedChange: d }) {
	return /* @__PURE__ */ e(t.Root, {
		className: "checkbox",
		checked: n,
		defaultChecked: r,
		disabled: i,
		id: a,
		name: o,
		value: s,
		required: c,
		"aria-label": l,
		"aria-labelledby": u,
		onCheckedChange: d,
		children: /* @__PURE__ */ e(t.Indicator, { className: "checkbox__indicator" })
	});
}
//#endregion
export { n as Checkbox };
