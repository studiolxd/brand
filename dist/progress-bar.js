import './progress-bar.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/atoms/ProgressBar/ProgressBar.tsx
var n = 15;
function r({ value: r, variant: i = "primary", size: a = "md", label: o }) {
	let s = Math.min(100, Math.max(0, Math.round(r))), c = a !== "sm", l = c && s >= n, u = c && !l;
	return /* @__PURE__ */ e("div", {
		className: `progress-bar progress-bar--${i} progress-bar--${a}`,
		children: /* @__PURE__ */ t("div", {
			className: "progress-bar__track",
			role: "progressbar",
			"aria-valuenow": s,
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-label": o,
			children: [/* @__PURE__ */ e("div", {
				className: "progress-bar__fill",
				style: { width: `${s}%` },
				children: l && /* @__PURE__ */ t("span", {
					className: "progress-bar__label progress-bar__label--inside",
					"aria-hidden": "true",
					children: [s, "%"]
				})
			}), u && /* @__PURE__ */ t("span", {
				className: "progress-bar__label progress-bar__label--outside",
				"aria-hidden": "true",
				style: { insetInlineStart: `${s}%` },
				children: [s, "%"]
			})]
		})
	});
}
//#endregion
export { r as ProgressBar };
