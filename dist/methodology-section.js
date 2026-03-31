import './methodology-section.css';
import { Button as e } from "./button.js";
import { Heading as t } from "./heading.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/sections/MethodologySection/MethodologySection.tsx
function i({ id: i, intro: a, ctaLabel: o, ctaHref: s, steps: c, "aria-label": l }) {
	return /* @__PURE__ */ r("section", {
		id: i,
		className: "methodology-section",
		"aria-label": l,
		children: [/* @__PURE__ */ r("div", {
			className: "methodology-section__intro",
			children: [/* @__PURE__ */ n(t, {
				level: 2,
				weight: "semibold",
				children: a
			}), /* @__PURE__ */ n(e, {
				href: s,
				variant: "primary",
				children: o
			})]
		}), /* @__PURE__ */ n("div", {
			className: "methodology-section__steps",
			children: c.map((e, t) => /* @__PURE__ */ r("div", {
				className: "methodology-section__step",
				children: [/* @__PURE__ */ n("div", {
					className: "methodology-section__number",
					children: String(t + 1).padStart(2, "0")
				}), /* @__PURE__ */ n("div", {
					className: "methodology-section__text",
					children: e.text
				})]
			}, e.text))
		})]
	});
}
//#endregion
export { i as MethodologySection };
