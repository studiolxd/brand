import './description-list.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/DescriptionList/DescriptionList.tsx
var n = t(function({ className: t, children: n, ...r }, i) {
	return /* @__PURE__ */ e("dl", {
		ref: i,
		className: ["description-list", t].filter(Boolean).join(" "),
		...r,
		children: n
	});
});
//#endregion
export { n as DescriptionList };
