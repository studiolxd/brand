'use client';
import './card.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Arrow as t } from "./arrow.js";
import { Heading as n } from "./heading.js";
import { Paragraph as r } from "./paragraph.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s } from "react";
import { useRender as c } from "@base-ui-components/react/use-render";
//#region src/stories/molecules/Card/Card.tsx
var l = s(function({ href: r, render: s, title: l, description: u, ctaLabel: d, color: f = "outline", className: p, children: m, ...h }, g) {
	let _ = [
		"card",
		`card--${f}`,
		p ?? ""
	].filter(Boolean).join(" "), v = /* @__PURE__ */ o(i, { children: [
		/* @__PURE__ */ a(n, {
			level: 2,
			size: 8,
			children: l
		}),
		u && /* @__PURE__ */ a("p", { children: u }),
		/* @__PURE__ */ a(e, { children: d }),
		/* @__PURE__ */ a(t, { size: "lg" })
	] });
	return c({
		render: s,
		ref: g,
		enabled: s !== void 0,
		props: {
			className: _,
			...h,
			children: v
		}
	}) || (r === void 0 ? /* @__PURE__ */ a("div", {
		ref: g,
		className: _,
		...h,
		children: m
	}) : /* @__PURE__ */ a("a", {
		ref: g,
		href: r,
		className: _,
		...h,
		children: v
	}));
}), u = s(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ a("div", {
		ref: n,
		className: ["card__header", e].filter(Boolean).join(" "),
		...t
	});
}), d = s(function({ level: e = 3, size: t = 4, className: r, children: i, ...o }, s) {
	return /* @__PURE__ */ a(n, {
		ref: s,
		level: e,
		size: t,
		className: ["card__title", r].filter(Boolean).join(" "),
		...o,
		children: i
	});
}), f = s(function({ size: e = "small", className: t, children: n, ...i }, o) {
	return /* @__PURE__ */ a(r, {
		ref: o,
		size: e,
		className: ["card__description", t].filter(Boolean).join(" "),
		...i,
		children: n
	});
}), p = s(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ a("div", {
		ref: n,
		className: ["card__action", e].filter(Boolean).join(" "),
		...t
	});
}), m = s(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ a("div", {
		ref: n,
		className: ["card__content", e].filter(Boolean).join(" "),
		...t
	});
}), h = s(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ a("div", {
		ref: n,
		className: ["card__footer", e].filter(Boolean).join(" "),
		...t
	});
});
//#endregion
export { l as Card, p as CardAction, m as CardContent, f as CardDescription, h as CardFooter, u as CardHeader, d as CardTitle };
