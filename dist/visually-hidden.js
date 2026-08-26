/* empty css                       */
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/VisuallyHidden/VisuallyHidden.tsx
var n = t(function({ children: t, className: n, ...r }, i) {
	return /* @__PURE__ */ e("span", {
		ref: i,
		className: ["visually-hidden", n].filter(Boolean).join(" "),
		...r,
		children: t
	});
});
//#endregion
export { n as VisuallyHidden };
