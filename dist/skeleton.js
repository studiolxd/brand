import './skeleton.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Skeleton/Skeleton.tsx
function t({ width: t, height: n, circle: r = !1, className: i, ...a }) {
	return /* @__PURE__ */ e("svg", {
		"aria-hidden": "true",
		className: [
			"skeleton",
			r ? "skeleton--circle" : "",
			i
		].filter(Boolean).join(" "),
		width: t,
		height: n,
		...a
	});
}
//#endregion
export { t as Skeleton };
