import './embed-frame.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/EmbedFrame/EmbedFrame.tsx
var n = e(function({ title: e, className: n, ...r }, i) {
	return /* @__PURE__ */ t("iframe", {
		ref: i,
		className: ["embed-frame", n].filter(Boolean).join(" "),
		title: e,
		...r
	});
});
//#endregion
export { n as EmbedFrame };
