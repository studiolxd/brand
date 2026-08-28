import './steps.css';
import { Icon as e } from "./icon.js";
import { Heading as t } from "./heading.js";
import { Paragraph as n } from "./paragraph.js";
import { NumberBadge as r } from "./number-badge.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/organisms/Steps/Steps.tsx
function o({ items: o, orientation: s = "vertical", badgeVariant: c = "primary", titleLevel: l = 3, titleSize: u = 4, label: d, className: f, id: p }) {
	return /* @__PURE__ */ i("ol", {
		id: p,
		className: [
			"steps",
			`steps--${s}`,
			f
		].filter(Boolean).join(" "),
		"aria-label": d,
		children: o.map((o, s) => /* @__PURE__ */ a("li", {
			className: "steps__item",
			children: [/* @__PURE__ */ i("span", {
				className: "steps__marker",
				"aria-hidden": "true",
				children: /* @__PURE__ */ i(r, {
					count: s + 1,
					variant: c,
					className: "steps__number"
				})
			}), /* @__PURE__ */ a("div", {
				className: "steps__body",
				children: [/* @__PURE__ */ a(t, {
					level: l,
					size: u,
					className: "steps__title",
					children: [o.icon && /* @__PURE__ */ i(e, {
						name: o.icon,
						className: "steps__icon"
					}), o.title]
				}), o.description && /* @__PURE__ */ i(n, {
					className: "steps__description",
					children: o.description
				})]
			})]
		}, o.id ?? s))
	});
}
//#endregion
export { o as Steps };
