import './kbd.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Kbd/Kbd.tsx
var n = e(function({ size: e = "md", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ t("kbd", {
		ref: a,
		className: [
			"kbd",
			e === "md" ? "" : `kbd--${e}`,
			n ?? ""
		].filter(Boolean).join(" "),
		...i,
		children: r
	});
});
//#endregion
export { n as Kbd };
