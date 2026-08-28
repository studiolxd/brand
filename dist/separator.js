import './separator.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Separator/Separator.tsx
var n = t(function({ orientation: t = "horizontal", decorative: n = !0, spacing: r = "md", className: i, ...a }, o) {
	return /* @__PURE__ */ e("hr", {
		ref: o,
		className: [
			"separator",
			t === "vertical" ? "separator--vertical" : "",
			r === "md" ? "" : `separator--${r}`,
			i ?? ""
		].filter(Boolean).join(" "),
		...n ? { role: "none" } : t === "vertical" ? { "aria-orientation": "vertical" } : {},
		...a
	});
});
//#endregion
export { n as Separator };
