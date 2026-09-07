'use client';
import './card.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Arrow as t } from "./arrow.js";
import { Heading as n } from "./heading.js";
import { Paragraph as r } from "./paragraph.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s } from "react";
import { useRender as c } from "@base-ui/react/use-render";
//#region src/stories/molecules/Card/Card.tsx
var l = s(function({ href: r, render: s, external: l = !1, title: u, description: d, ctaLabel: f, color: p = "outline", variant: m = "default", media: h, selectable: g = !1, selected: _ = !1, className: v, children: y, ...b }, x) {
	let S = [
		"card",
		`card--${p}`,
		m === "default" ? "" : `card--${m}`,
		g ? "card--selectable" : "",
		g && _ ? "card--selected" : "",
		v ?? ""
	].filter(Boolean).join(" "), C = /* @__PURE__ */ o(i, { children: [
		u !== void 0 && /* @__PURE__ */ a(n, {
			level: 2,
			size: 8,
			children: u
		}),
		d && (typeof d == "string" ? /* @__PURE__ */ a("p", { children: d }) : d),
		y,
		f !== void 0 && /* @__PURE__ */ a(e, { children: f }),
		/* @__PURE__ */ a(t, { size: "lg" })
	] }), w = h && /* @__PURE__ */ a("div", {
		className: "card__media",
		children: /* @__PURE__ */ a("img", {
			src: h.src,
			alt: h.alt
		})
	}), T = m === "default" && !h ? C : /* @__PURE__ */ o(i, { children: [w, /* @__PURE__ */ a("div", {
		className: "card__body",
		children: C
	})] });
	return c({
		render: s,
		ref: x,
		enabled: s !== void 0,
		props: {
			className: S,
			...b,
			children: T
		}
	}) || (r === void 0 ? /* @__PURE__ */ a("div", {
		ref: x,
		className: S,
		...b,
		children: y
	}) : /* @__PURE__ */ a("a", {
		ref: x,
		href: r,
		className: S,
		...l ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		...b,
		children: T
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
}), f = s(function({ size: e = "small", lines: t, className: n, children: i, ...o }, s) {
	return /* @__PURE__ */ a(r, {
		ref: s,
		size: e,
		className: [
			"card__description",
			t ? `card__description--lines-${t}` : "",
			n
		].filter(Boolean).join(" "),
		...o,
		children: i
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
}), h = s(function({ direction: e = "row", className: t, ...n }, r) {
	return /* @__PURE__ */ a("div", {
		ref: r,
		className: [
			"card__footer",
			e === "column" ? "card__footer--column" : "",
			t
		].filter(Boolean).join(" "),
		...n
	});
});
//#endregion
export { l as Card, p as CardAction, m as CardContent, f as CardDescription, h as CardFooter, u as CardHeader, d as CardTitle };
