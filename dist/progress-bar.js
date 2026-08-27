import './progress-bar.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/atoms/ProgressBar/ProgressBar.tsx
var n = 15;
function r({ value: r, variant: i = "primary", size: a = "md", label: o = "Progreso", className: s }) {
	let c = Math.min(100, Math.max(0, Math.round(r))), l = a !== "sm", u = l && c >= n, d = l && !u;
	return /* @__PURE__ */ e("div", {
		className: [
			"progress-bar",
			`progress-bar--${i}`,
			`progress-bar--${a}`,
			s
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ t("div", {
			className: "progress-bar__track",
			role: "progressbar",
			"aria-valuenow": c,
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-valuetext": `${c}%`,
			"aria-label": o,
			children: [/* @__PURE__ */ e("div", {
				className: "progress-bar__fill",
				style: { width: `${c}%` },
				children: u && /* @__PURE__ */ t("span", {
					className: "progress-bar__label progress-bar__label--inside",
					"aria-hidden": "true",
					children: [c, "%"]
				})
			}), d && /* @__PURE__ */ t("span", {
				className: "progress-bar__label progress-bar__label--outside",
				"aria-hidden": "true",
				style: { insetInlineStart: `${c}%` },
				children: [c, "%"]
			})]
		})
	});
}
//#endregion
export { r as ProgressBar };
