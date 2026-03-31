'use client';
import './radio.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Radio/Radio.tsx
function t({ checked: t, defaultChecked: n, disabled: r, id: i, name: a, value: o, required: s, "aria-label": c, "aria-labelledby": l, onChange: u }) {
	return /* @__PURE__ */ e("input", {
		type: "radio",
		className: "radio",
		checked: t,
		defaultChecked: n,
		disabled: r,
		id: i,
		name: a,
		value: o,
		required: s,
		"aria-label": c,
		"aria-labelledby": l,
		onChange: u
	});
}
//#endregion
export { t as Radio };
