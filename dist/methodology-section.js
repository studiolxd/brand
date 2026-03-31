import './methodology-section.css';
import { Button as e } from "./button.js";
import { Heading as t } from "./heading.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/sections/MethodologySection/MethodologySection.tsx
function i({ intro: i, ctaLabel: a, ctaHref: o, steps: s, "aria-label": c }) {
	return /* @__PURE__ */ r("section", {
		className: "methodology-section",
		"aria-label": c,
		children: [/* @__PURE__ */ r("div", {
			className: "methodology-section__intro",
			children: [/* @__PURE__ */ n(t, {
				level: 2,
				weight: "semibold",
				children: i
			}), /* @__PURE__ */ n(e, {
				href: o,
				variant: "primary",
				children: a
			})]
		}), /* @__PURE__ */ n("div", {
			className: "methodology-section__steps",
			children: s.map((e, t) => /* @__PURE__ */ r("div", {
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
