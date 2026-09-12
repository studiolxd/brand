'use client';
import './description-list.css';
import { CopyableValue as e } from "./copyable-value.js";
import { jsx as t } from "react/jsx-runtime";
import { forwardRef as n } from "react";
//#region src/stories/atoms/DescriptionList/DescriptionList.tsx
var r = n(function({ className: e, children: n, ...r }, i) {
	return /* @__PURE__ */ t("dl", {
		ref: i,
		className: ["description-list", e].filter(Boolean).join(" "),
		...r,
		children: n
	});
}), i = n(function({ as: e = "dt", className: n, children: r, ...i }, a) {
	return /* @__PURE__ */ t(e, {
		ref: a,
		className: ["description-list__term", n].filter(Boolean).join(" "),
		...i,
		children: r
	});
}), a = n(function({ as: n = "dd", className: r, children: i, copyable: a = !1, copyText: o, copyLabel: s = "Copiar", copiedLabel: c = "Copiado", ...l }, u) {
	let d = [
		"description-list__details",
		a ? "description-list__details--copyable" : "",
		r
	].filter(Boolean).join(" ");
	return a ? /* @__PURE__ */ t(n, {
		ref: u,
		className: d,
		...l,
		children: /* @__PURE__ */ t(e, {
			copyText: o,
			copyLabel: s,
			copiedLabel: c,
			children: i
		})
	}) : /* @__PURE__ */ t(n, {
		ref: u,
		className: d,
		...l,
		children: i
	});
});
//#endregion
export { a as DescriptionDetails, r as DescriptionList, i as DescriptionTerm };
