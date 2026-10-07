import './embed-frame.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/EmbedFrame/EmbedFrame.tsx
var n = e(function({ title: e, fill: n = "container", device: r = "desktop", className: i, ...a }, o) {
	return /* @__PURE__ */ t("iframe", {
		ref: o,
		className: [
			"embed-frame",
			n === "viewport" ? "embed-frame--viewport" : "",
			r === "desktop" ? "" : `embed-frame--${r}`,
			i
		].filter(Boolean).join(" "),
		title: e,
		...a
	});
});
//#endregion
export { n as EmbedFrame };
