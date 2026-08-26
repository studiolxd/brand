/* empty css                        */
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/VisuallyHidden/VisuallyHidden.tsx
var n = e(function({ children: e, className: n, ...r }, i) {
	return /* @__PURE__ */ t("span", {
		ref: i,
		className: ["visually-hidden", n].filter(Boolean).join(" "),
		...r,
		children: e
	});
});
//#endregion
export { n as VisuallyHidden };
