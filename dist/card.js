'use client';
import './card.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Arrow as t } from "./arrow.js";
import { Heading as n } from "./heading.js";
import { t as r } from "./_shared/assign-ref.js";
import { Paragraph as i } from "./paragraph.js";
import { forwardRef as a, useCallback as o, useRef as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { useRender as d } from "@base-ui/react/use-render";
//#region src/stories/molecules/Card/Card.tsx
var f = a(function({ href: r, render: i, external: a = !1, title: o, description: s, ctaLabel: f, color: p = "outline", variant: m = "default", media: h, linkOverlay: g = !1, selectable: _ = !1, selected: v = !1, className: y, children: b, ...x }, S) {
	let C = [
		"card",
		`card--${p}`,
		m === "default" ? "" : `card--${m}`,
		g ? "card--link-overlay" : "",
		_ ? "card--selectable" : "",
		_ && v ? "card--selected" : "",
		y ?? ""
	].filter(Boolean).join(" "), w = /* @__PURE__ */ u(c, { children: [
		o !== void 0 && /* @__PURE__ */ l(n, {
			level: 2,
			size: 8,
			children: o
		}),
		s && (typeof s == "string" ? /* @__PURE__ */ l("p", { children: s }) : s),
		b,
		f !== void 0 && /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l(e, { children: f }), /* @__PURE__ */ l(t, { size: "lg" })] })
	] }), T = h && /* @__PURE__ */ l("div", {
		className: "card__media",
		children: /* @__PURE__ */ l("img", {
			src: h.src,
			alt: h.alt
		})
	}), E = m === "default" && !h ? w : /* @__PURE__ */ u(c, { children: [T, /* @__PURE__ */ l("div", {
		className: "card__body",
		children: w
	})] });
	return d({
		render: i,
		ref: S,
		enabled: i !== void 0,
		props: {
			className: C,
			...x,
			children: E
		}
	}) || (r === void 0 ? /* @__PURE__ */ l("div", {
		ref: S,
		className: C,
		...x,
		children: b
	}) : /* @__PURE__ */ l("a", {
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
});
function p(e, t, n) {
	return [
		e,
		t ? "card__interactive" : "",
		n
	].filter(Boolean).join(" ");
}
var m = a(function({ interactive: e, className: t, ...n }, r) {
	return /* @__PURE__ */ l("div", {
		ref: r,
		className: p("card__header", e, t),
		...n
	});
}), h = a(function({ level: e = 3, size: t = 4, className: r, children: i, ...a }, o) {
	return /* @__PURE__ */ l(n, {
		ref: o,
		level: e,
		size: t,
		className: ["card__title", r].filter(Boolean).join(" "),
		...a,
		children: i
	});
}), g = a(function({ size: e = "small", lines: t, className: n, children: r, ...a }, o) {
	return /* @__PURE__ */ l(i, {
		ref: o,
		size: e,
		className: [
			"card__description",
			t ? `card__description--lines-${t}` : "",
			n
		].filter(Boolean).join(" "),
		...a,
		children: r
	});
}), _ = a(function({ isolate: e = !0, className: t, onClick: n, ...i }, a) {
	let c = s(null);
	return /* @__PURE__ */ l("div", {
		ref: o((e) => {
			c.current = e, r(a, e);
		}, [a]),
		className: ["card__action", t].filter(Boolean).join(" "),
		onClick: (t) => {
			if (e) {
				t.stopPropagation();
				let e = c.current;
				(e?.contains(t.target) ?? !1) && e?.parentElement?.closest("a[href], [role=\"link\"]") && t.preventDefault();
			}
			n?.(t);
		},
		...i
	});
}), v = a(function({ isolate: e = !0, className: t, onClick: n, ...r }, i) {
	return /* @__PURE__ */ l("div", {
		ref: i,
		className: ["card__selection", t].filter(Boolean).join(" "),
		onClick: (t) => {
			e && t.stopPropagation(), n?.(t);
		},
		...r
	});
}), y = a(function({ interactive: e, className: t, ...n }, r) {
	return /* @__PURE__ */ l("div", {
		ref: r,
		className: p("card__content", e, t),
		...n
	});
}), b = a(function({ direction: e = "row", interactive: t, className: n, ...r }, i) {
	return /* @__PURE__ */ l("div", {
		ref: i,
		className: p("card__footer", t, [e === "column" ? "card__footer--column" : "", n].filter(Boolean).join(" ") || void 0),
		...r
	});
});
//#endregion
export { f as Card, _ as CardAction, y as CardContent, g as CardDescription, b as CardFooter, m as CardHeader, v as CardSelection, h as CardTitle };
