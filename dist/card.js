import './card.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Arrow as t } from "./arrow.js";
import { Heading as n } from "./heading.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/Card/Card.tsx
var o = r(function({ href: r, title: o, description: s, ctaLabel: c, color: l = "outline", className: u, children: d, ...f }, p) {
	let m = [
		"card",
		`card--${l}`,
		u ?? ""
	].filter(Boolean).join(" ");
	return r === void 0 ? /* @__PURE__ */ i("div", {
		ref: p,
		className: m,
		...f,
		children: d
	}) : /* @__PURE__ */ a("a", {
		ref: p,
		href: r,
		className: m,
		...f,
		children: [
			/* @__PURE__ */ i(n, {
				level: 2,
				size: 8,
				children: o
			}),
			s && /* @__PURE__ */ i("p", { children: s }),
			/* @__PURE__ */ i(e, { children: c }),
			/* @__PURE__ */ i(t, { size: "lg" })
		]
	});
}), s = r(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ i("div", {
		ref: n,
		className: ["card__header", e].filter(Boolean).join(" "),
		...t
	});
}), c = r(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ i("div", {
		ref: n,
		className: ["card__title", e].filter(Boolean).join(" "),
		...t
	});
}), l = r(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ i("div", {
		ref: n,
		className: ["card__description", e].filter(Boolean).join(" "),
		...t
	});
}), u = r(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ i("div", {
		ref: n,
		className: ["card__action", e].filter(Boolean).join(" "),
		...t
	});
}), d = r(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ i("div", {
		ref: n,
		className: ["card__content", e].filter(Boolean).join(" "),
		...t
	});
}), f = r(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ i("div", {
		ref: n,
		className: ["card__footer", e].filter(Boolean).join(" "),
		...t
	});
});
//#endregion
export { o as Card, u as CardAction, d as CardContent, l as CardDescription, f as CardFooter, s as CardHeader, c as CardTitle };
