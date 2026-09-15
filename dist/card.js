'use client';
import './card.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Arrow as t } from "./arrow.js";
import { Heading as n } from "./heading.js";
import { Paragraph as r } from "./paragraph.js";
import { forwardRef as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { useRender as c } from "@base-ui/react/use-render";
//#region src/stories/molecules/Card/Card.tsx
var l = i(function({ href: r, render: i, external: l = !1, title: u, description: d, ctaLabel: f, color: p = "outline", variant: m = "default", media: h, selectable: g = !1, selected: _ = !1, className: v, children: y, ...b }, x) {
	let S = [
		"card",
		`card--${p}`,
		m === "default" ? "" : `card--${m}`,
		g ? "card--selectable" : "",
		g && _ ? "card--selected" : "",
		v ?? ""
	].filter(Boolean).join(" "), C = /* @__PURE__ */ s(a, { children: [
		u !== void 0 && /* @__PURE__ */ o(n, {
			level: 2,
			size: 8,
			children: u
		}),
		d && (typeof d == "string" ? /* @__PURE__ */ o("p", { children: d }) : d),
		y,
		f !== void 0 && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(e, { children: f }), /* @__PURE__ */ o(t, { size: "lg" })] })
	] }), w = h && /* @__PURE__ */ o("div", {
		className: "card__media",
		children: /* @__PURE__ */ o("img", {
			src: h.src,
			alt: h.alt
		})
	}), T = m === "default" && !h ? C : /* @__PURE__ */ s(a, { children: [w, /* @__PURE__ */ o("div", {
		className: "card__body",
		children: C
	})] });
	return c({
		render: i,
		ref: x,
		enabled: i !== void 0,
		props: {
			className: S,
			...b,
			children: T
		}
	}) || (r === void 0 ? /* @__PURE__ */ o("div", {
		ref: x,
		className: S,
		...b,
		children: y
	}) : /* @__PURE__ */ o("a", {
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
}), u = i(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ o("div", {
		ref: n,
		className: ["card__header", e].filter(Boolean).join(" "),
		...t
	});
}), d = i(function({ level: e = 3, size: t = 4, className: r, children: i, ...a }, s) {
	return /* @__PURE__ */ o(n, {
		ref: s,
		level: e,
		size: t,
		className: ["card__title", r].filter(Boolean).join(" "),
		...a,
		children: i
	});
}), f = i(function({ size: e = "small", lines: t, className: n, children: i, ...a }, s) {
	return /* @__PURE__ */ o(r, {
		ref: s,
		size: e,
		className: [
			"card__description",
			t ? `card__description--lines-${t}` : "",
			n
		].filter(Boolean).join(" "),
		...a,
		children: i
	});
}), p = i(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ o("div", {
		ref: n,
		className: ["card__action", e].filter(Boolean).join(" "),
		...t
	});
}), m = i(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ o("div", {
		ref: n,
		className: ["card__content", e].filter(Boolean).join(" "),
		...t
	});
}), h = i(function({ direction: e = "row", className: t, ...n }, r) {
	return /* @__PURE__ */ o("div", {
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
