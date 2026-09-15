'use client';
import './description-list.css';
import { CopyableValue as e } from "./copyable-value.js";
import { forwardRef as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/atoms/DescriptionList/DescriptionList.tsx
var r = t(function({ className: e, children: t, ...r }, i) {
	return /* @__PURE__ */ n("dl", {
		ref: i,
		className: ["description-list", e].filter(Boolean).join(" "),
		...r,
		children: t
	});
}), i = t(function({ as: e = "dt", className: t, children: r, ...i }, a) {
	return /* @__PURE__ */ n(e, {
		ref: a,
		className: ["description-list__term", t].filter(Boolean).join(" "),
		...i,
		children: r
	});
}), a = t(function({ as: t = "dd", className: r, children: i, copyable: a = !1, copyText: o, copyLabel: s = "Copiar", copiedLabel: c = "Copiado", ...l }, u) {
	let d = [
		"description-list__details",
		a ? "description-list__details--copyable" : "",
		r
	].filter(Boolean).join(" ");
	return a ? /* @__PURE__ */ n(t, {
		ref: u,
		className: d,
		...l,
		children: /* @__PURE__ */ n(e, {
			copyText: o,
			copyLabel: s,
			copiedLabel: c,
			children: i
		})
	}) : /* @__PURE__ */ n(t, {
		ref: u,
		className: d,
		...l,
		children: i
	});
});
//#endregion
export { a as DescriptionDetails, r as DescriptionList, i as DescriptionTerm };
