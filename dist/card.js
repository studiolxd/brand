'use client';
import './card.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Arrow as t } from "./arrow.js";
import { Heading as n } from "./heading.js";
import { Paragraph as r } from "./paragraph.js";
import { forwardRef as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { useRender as c } from "@base-ui-components/react/use-render";
//#region src/stories/molecules/Card/Card.tsx
var l = i(function({ href: r, render: i, external: l = !1, title: u, description: d, ctaLabel: f, color: p = "outline", variant: m = "default", media: h, className: g, children: _, ...v }, y) {
	let b = [
		"card",
		`card--${p}`,
		m === "default" ? "" : `card--${m}`,
		g ?? ""
	].filter(Boolean).join(" "), x = /* @__PURE__ */ s(a, { children: [
		u !== void 0 && /* @__PURE__ */ o(n, {
			level: 2,
			size: 8,
			children: u
		}),
		d && (typeof d == "string" ? /* @__PURE__ */ o("p", { children: d }) : d),
		_,
		f !== void 0 && /* @__PURE__ */ o(e, { children: f }),
		/* @__PURE__ */ o(t, { size: "lg" })
	] }), S = h && /* @__PURE__ */ o("div", {
		className: "card__media",
		children: /* @__PURE__ */ o("img", {
			src: h.src,
			alt: h.alt
		})
	}), C = m === "default" && !h ? x : /* @__PURE__ */ s(a, { children: [S, /* @__PURE__ */ o("div", {
		className: "card__body",
		children: x
	})] });
	return c({
		render: i,
		ref: y,
		enabled: i !== void 0,
		props: {
			className: b,
			...v,
			children: C
		}
	}) || (r === void 0 ? /* @__PURE__ */ o("div", {
		ref: y,
		className: b,
		...v,
		children: _
	}) : /* @__PURE__ */ o("a", {
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
}), f = i(function({ size: e = "small", className: t, children: n, ...i }, a) {
	return /* @__PURE__ */ o(r, {
		ref: a,
		size: e,
		className: ["card__description", t].filter(Boolean).join(" "),
		...i,
		children: n
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
}), h = i(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ o("div", {
		ref: n,
		className: ["card__footer", e].filter(Boolean).join(" "),
		...t
	});
});
//#endregion
export { l as Card, p as CardAction, m as CardContent, f as CardDescription, h as CardFooter, u as CardHeader, d as CardTitle };
