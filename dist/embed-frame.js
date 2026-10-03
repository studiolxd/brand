import './embed-frame.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/EmbedFrame/EmbedFrame.tsx
var n = e(function({ title: e, fill: n = "container", className: r, ...i }, a) {
	return /* @__PURE__ */ t("iframe", {
		ref: a,
		className: [
			"embed-frame",
			n === "viewport" ? "embed-frame--viewport" : "",
			r
		].filter(Boolean).join(" "),
		title: e,
		...i
	});
});
//#endregion
export { n as EmbedFrame };
