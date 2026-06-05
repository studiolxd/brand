import './number-badge.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/NumberBadge/NumberBadge.tsx
function t({ count: t, variant: n = "primary", max: r = 99, "aria-label": i, className: a }) {
	let o = t > r ? `${r}+` : String(t);
	return /* @__PURE__ */ e("span", {
		className: [
			"number-badge",
			`number-badge--${n}`,
			a
		].filter(Boolean).join(" "),
		"aria-label": i ?? o,
		"aria-atomic": "true",
		children: o
	});
}
//#endregion
export { t as NumberBadge };
