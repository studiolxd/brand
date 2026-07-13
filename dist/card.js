import './card.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Arrow as t } from "./arrow.js";
import { Heading as n } from "./heading.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a } from "react";
//#region src/stories/molecules/Card/Card.tsx
var o = a(function({ href: a, title: o, description: s, ctaLabel: c, color: l = "outline", className: u, children: d, ...f }, p) {
	let m = [
		"card",
		`card--${l}`,
		u ?? ""
	].filter(Boolean).join(" ");
	return a === void 0 ? /* @__PURE__ */ r("div", {
		ref: p,
		className: m,
		...f,
		children: d
	}) : /* @__PURE__ */ i("a", {
		ref: p,
		href: a,
		className: m,
		...f,
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
});
//#endregion
export { o as Card };
