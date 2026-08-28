import './description-list.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/DescriptionList/DescriptionList.tsx
var n = e(function({ className: e, children: n, ...r }, i) {
	return /* @__PURE__ */ t("dl", {
		ref: i,
		className: ["description-list", e].filter(Boolean).join(" "),
		...r,
		children: n
	});
});
//#endregion
export { n as DescriptionList };
