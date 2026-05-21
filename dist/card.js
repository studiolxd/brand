import './card.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Arrow as t } from "./arrow.js";
import { Heading as n } from "./heading.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/Card/Card.tsx
function a({ href: a, title: o, description: s, ctaLabel: c, color: l }) {
	return /* @__PURE__ */ i("a", {
		href: a,
		className: ["card", `card--${l}`].join(" "),
		children: [
			/* @__PURE__ */ r(n, {
				level: 2,
				size: 8,
				children: o
			}),
			s && /* @__PURE__ */ r("p", { children: s }),
			/* @__PURE__ */ r(e, { children: c }),
			/* @__PURE__ */ r(t, { size: "lg" })
		]
	});
}
//#endregion
export { a as Card };
