import './tag.css';
import { n as e } from "./_shared/env.js";
import { forwardRef as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/atoms/Tag/Tag.tsx
function r(t, n, r) {
	r !== void 0 && e(t, "variant", "`tone`");
	let i = n ?? r ?? "neutral";
	return i === "danger" ? (e(t, "variant=\"danger\"", "`tone=\"error\"`"), "error") : i;
}
var i = t(function({ tone: e, variant: t, className: i, children: a, ...o }, s) {
	let c = r("Tag", e, t);
	return /* @__PURE__ */ n("span", {
		ref: s,
		className: [
			"tag",
			`tag--${c === "error" ? "danger" : c}`,
			i ?? ""
		].filter(Boolean).join(" "),
		...o,
		children: a
	});
});
//#endregion
export { i as Tag };
