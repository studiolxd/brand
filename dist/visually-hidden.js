/* empty css                       */
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/VisuallyHidden/VisuallyHidden.tsx
var n = e(function({ children: e, as: n = "span", className: r, ...i }, a) {
	return /* @__PURE__ */ t(n, {
		ref: a,
		className: ["visually-hidden", r].filter(Boolean).join(" "),
		...i,
		children: e
	});
});
//#endregion
export { n as VisuallyHidden };
