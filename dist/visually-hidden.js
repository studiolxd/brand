/* empty css                       */
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/VisuallyHidden/VisuallyHidden.tsx
var n = t(function({ children: t, as: n = "span", className: r, ...i }, a) {
	return /* @__PURE__ */ e(n, {
		ref: a,
		className: ["visually-hidden", r].filter(Boolean).join(" "),
		...i,
		children: t
	});
});
//#endregion
export { n as VisuallyHidden };
