import './number-badge.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/NumberBadge/NumberBadge.tsx
function t({ count: t, variant: n = "primary", max: r = 99, "aria-label": i, "aria-hidden": a, className: o }) {
	let s = t > r ? `${r}+` : String(t), c = a === !0 || a === "true";
	return /* @__PURE__ */ e("span", {
		className: [
			"number-badge",
			`number-badge--${n}`,
			o
		].filter(Boolean).join(" "),
		"aria-hidden": c || void 0,
		"aria-label": c ? void 0 : i ?? s,
		"aria-atomic": c ? void 0 : !0,
		children: s
	});
}
//#endregion
export { t as NumberBadge };
