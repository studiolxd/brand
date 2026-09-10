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
}), r = t(function({ as: t = "dt", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ e(t, {
		ref: a,
		className: ["description-list__term", n].filter(Boolean).join(" "),
		...i,
		children: r
	});
}), i = t(function({ as: t = "dd", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ e(t, {
		ref: a,
		className: ["description-list__details", n].filter(Boolean).join(" "),
		...i,
		children: r
	});
});
//#endregion
export { i as DescriptionDetails, n as DescriptionList, r as DescriptionTerm };
