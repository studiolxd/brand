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
var l = s(function({ href: r, render: s, external: l = !1, title: u, description: d, ctaLabel: f, color: p = "outline", variant: m = "default", media: h, className: g, children: _, ...v }, y) {
	let b = [
		"card",
		`card--${p}`,
		m === "default" ? "" : `card--${m}`,
		g ?? ""
	].filter(Boolean).join(" "), x = /* @__PURE__ */ o(i, { children: [
		u !== void 0 && /* @__PURE__ */ a(n, {
			level: 2,
			size: 8,
			children: u
		}),
		d && (typeof d == "string" ? /* @__PURE__ */ a("p", { children: d }) : d),
		_,
		f !== void 0 && /* @__PURE__ */ a(e, { children: f }),
		/* @__PURE__ */ a(t, { size: "lg" })
	] }), S = h && /* @__PURE__ */ a("div", {
		className: "card__media",
		children: /* @__PURE__ */ a("img", {
			src: h.src,
			alt: h.alt
		})
	}), C = m === "default" && !h ? x : /* @__PURE__ */ o(i, { children: [S, /* @__PURE__ */ a("div", {
		className: "card__body",
		children: x
	})] });
	return c({
		render: s,
		ref: y,
		enabled: s !== void 0,
		props: {
			className: b,
			...v,
			children: C
		}
	}) || (r === void 0 ? /* @__PURE__ */ a("div", {
		ref: y,
		className: b,
		...v,
		children: _
	}) : /* @__PURE__ */ a("a", {
		ref: y,
		href: r,
		className: b,
		...l ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		...v,
		children: C
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
