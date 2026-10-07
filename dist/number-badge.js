import './number-badge.css';
import { n as e } from "./_shared/env.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/NumberBadge/NumberBadge.tsx
function n({ count: n, tone: r, variant: i, max: a = 99, "aria-label": o, "aria-hidden": s, className: c }) {
	i !== void 0 && e("NumberBadge", "variant", "`tone`");
	let l = r ?? i ?? "primary";
	l === "danger" && (e("NumberBadge", "variant=\"danger\"", "`tone=\"error\"`"), l = "error");
	let u = n > a ? `${a}+` : String(n), d = s === !0 || s === "true";
	return /* @__PURE__ */ t("span", {
		className: [
			"number-badge",
			`number-badge--${l}`,
			c
		].filter(Boolean).join(" "),
		"aria-hidden": d || void 0,
		"aria-label": d ? void 0 : o ?? u,
		"aria-atomic": d ? void 0 : !0,
		children: u
	});
}
//#endregion
export { n as NumberBadge };
