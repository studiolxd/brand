import './kbd.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Kbd/Kbd.tsx
var n = t(function({ size: t = "md", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ e("kbd", {
		ref: a,
		className: [
			"kbd",
			t === "md" ? "" : `kbd--${t}`,
			n ?? ""
		].filter(Boolean).join(" "),
		...i,
		children: r
	});
});
//#endregion
export { n as Kbd };
