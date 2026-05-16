'use client';
import './radio.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Radio/Radio.tsx
function t({ checked: t, defaultChecked: n, disabled: r, size: i = "md", id: a, name: o, value: s, required: c, "aria-label": l, "aria-labelledby": u, onChange: d }) {
	return /* @__PURE__ */ e("input", {
		type: "radio",
		className: ["radio", i === "md" ? "" : `radio--${i}`].filter(Boolean).join(" "),
		checked: t,
		defaultChecked: n,
		disabled: r,
		id: a,
		name: o,
		value: s,
		required: c,
		"aria-label": l,
		"aria-labelledby": u,
		onChange: d
	});
}
//#endregion
export { t as Radio };
