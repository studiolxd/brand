import './separator.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Separator/Separator.tsx
var n = e(function({ orientation: e = "horizontal", decorative: n = !0, spacing: r = "md", className: i, ...a }, o) {
	return /* @__PURE__ */ t("hr", {
		ref: o,
		className: [
			"separator",
			e === "vertical" ? "separator--vertical" : "",
			r === "md" ? "" : `separator--${r}`,
			i ?? ""
		].filter(Boolean).join(" "),
		...n ? { role: "none" } : e === "vertical" ? { "aria-orientation": "vertical" } : {},
		...a
	});
});
//#endregion
export { n as Separator };
