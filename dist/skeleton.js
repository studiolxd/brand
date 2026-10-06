import './skeleton.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Skeleton/Skeleton.tsx
var n = e(function({ width: e, height: n, circle: r = !1, className: i, ...a }, o) {
	return /* @__PURE__ */ t("svg", {
		ref: o,
		"aria-hidden": "true",
		className: [
			"skeleton",
			r ? "skeleton--circle" : "",
			i
		].filter(Boolean).join(" "),
		width: e,
		height: n,
		...a
	});
});
//#endregion
export { n as Skeleton };
