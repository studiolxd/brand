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
}), s = a(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ r("div", {
		ref: n,
		className: ["card__header", e].filter(Boolean).join(" "),
		...t
	});
}), c = a(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ r("div", {
		ref: n,
		className: ["card__title", e].filter(Boolean).join(" "),
		...t
	});
}), l = a(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ r("div", {
		ref: n,
		className: ["card__description", e].filter(Boolean).join(" "),
		...t
	});
}), u = a(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ r("div", {
		ref: n,
		className: ["card__action", e].filter(Boolean).join(" "),
		...t
	});
}), d = a(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ r("div", {
		ref: n,
		className: ["card__content", e].filter(Boolean).join(" "),
		...t
	});
}), f = a(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ r("div", {
		ref: n,
		className: ["card__footer", e].filter(Boolean).join(" "),
		...t
	});
});
//#endregion
export { o as Card, u as CardAction, d as CardContent, l as CardDescription, f as CardFooter, s as CardHeader, c as CardTitle };
