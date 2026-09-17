'use client';
import './card.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Arrow as t } from "./arrow.js";
import { Heading as n } from "./heading.js";
import { Paragraph as r } from "./paragraph.js";
import { forwardRef as i, useCallback as a, useRef as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import { useRender as u } from "@base-ui/react/use-render";
//#region src/stories/molecules/Card/Card.tsx
var d = i(function({ href: r, render: i, external: a = !1, title: o, description: d, ctaLabel: f, color: p = "outline", variant: m = "default", media: h, linkOverlay: g = !1, selectable: _ = !1, selected: v = !1, className: y, children: b, ...x }, S) {
	let C = [
		"card",
		`card--${p}`,
		m === "default" ? "" : `card--${m}`,
		g ? "card--link-overlay" : "",
		_ ? "card--selectable" : "",
		_ && v ? "card--selected" : "",
		y ?? ""
	].filter(Boolean).join(" "), w = /* @__PURE__ */ l(s, { children: [
		o !== void 0 && /* @__PURE__ */ c(n, {
			level: 2,
			size: 8,
			children: o
		}),
		d && (typeof d == "string" ? /* @__PURE__ */ c("p", { children: d }) : d),
		b,
		f !== void 0 && /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c(e, { children: f }), /* @__PURE__ */ c(t, { size: "lg" })] })
	] }), T = h && /* @__PURE__ */ c("div", {
		className: "card__media",
		children: /* @__PURE__ */ c("img", {
			src: h.src,
			alt: h.alt
		})
	}), E = m === "default" && !h ? w : /* @__PURE__ */ l(s, { children: [T, /* @__PURE__ */ c("div", {
		className: "card__body",
		children: w
	})] });
	return u({
		render: i,
		ref: S,
		enabled: i !== void 0,
		props: {
			className: C,
			...x,
			children: E
		}
	}) || (r === void 0 ? /* @__PURE__ */ c("div", {
		ref: S,
		className: C,
		...x,
		children: b
	}) : /* @__PURE__ */ c("a", {
		ref: S,
		href: r,
		className: C,
		...a ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		...x,
		children: E
	}));
}), f = i(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ c("div", {
		ref: n,
		className: ["card__header", e].filter(Boolean).join(" "),
		...t
	});
}), p = i(function({ level: e = 3, size: t = 4, className: r, children: i, ...a }, o) {
	return /* @__PURE__ */ c(n, {
		ref: o,
		level: e,
		size: t,
		className: ["card__title", r].filter(Boolean).join(" "),
		...a,
		children: i
	});
}), m = i(function({ size: e = "small", lines: t, className: n, children: i, ...a }, o) {
	return /* @__PURE__ */ c(r, {
		ref: o,
		size: e,
		className: [
			"card__description",
			t ? `card__description--lines-${t}` : "",
			n
		].filter(Boolean).join(" "),
		...a,
		children: i
	});
}), h = i(function({ isolate: e = !0, className: t, onClick: n, ...r }, i) {
	let s = o(null);
	return /* @__PURE__ */ c("div", {
		ref: a((e) => {
			s.current = e, typeof i == "function" ? i(e) : i && (i.current = e);
		}, [i]),
		className: ["card__action", t].filter(Boolean).join(" "),
		onClick: (t) => {
			if (e) {
				t.stopPropagation();
				let e = s.current;
				(e?.contains(t.target) ?? !1) && e?.parentElement?.closest("a[href], [role=\"link\"]") && t.preventDefault();
			}
			n?.(t);
		},
		...r
	});
}), g = i(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ c("div", {
		ref: n,
		className: ["card__content", e].filter(Boolean).join(" "),
		...t
	});
}), _ = i(function({ direction: e = "row", className: t, ...n }, r) {
	return /* @__PURE__ */ c("div", {
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
export { d as Card, h as CardAction, g as CardContent, m as CardDescription, _ as CardFooter, f as CardHeader, p as CardTitle };
