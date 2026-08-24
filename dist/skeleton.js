import './skeleton.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Skeleton/Skeleton.tsx
function t({ width: t, height: n, circle: r = !1, className: i, style: a, ...o }) {
	return /* @__PURE__ */ e("span", {
		"aria-hidden": "true",
		className: [
			"skeleton",
			r ? "skeleton--circle" : "",
			i
		].filter(Boolean).join(" "),
		style: {
			...t ? { width: t } : {},
			...n ? { height: n } : {},
			...a
		},
		...o
	});
}
//#endregion
export { t as Skeleton };
