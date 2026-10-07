'use client';
import './card.css';
import { n as e } from "./_shared/env.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Arrow as n } from "./arrow.js";
import { Heading as r } from "./heading.js";
import { t as i } from "./_shared/assign-ref.js";
import { Paragraph as a } from "./paragraph.js";
import { forwardRef as o, useCallback as s, useRef as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
import { useRender as f } from "@base-ui/react/use-render";
//#region src/stories/molecules/Card/Card.tsx
var p = o(function({ href: i, render: a, external: o = !1, title: s, description: c, ctaLabel: p, tone: m, color: h, variant: g = "default", media: _, linkOverlay: v = !1, selectable: y = !1, selected: b = !1, className: x, children: S, ...C }, w) {
	h !== void 0 && e("Card", "color", "`tone`");
	let T = [
		"card",
		`card--${m ?? h ?? "outline"}`,
		g === "default" ? "" : `card--${g}`,
		v ? "card--link-overlay" : "",
		y ? "card--selectable" : "",
		y && b ? "card--selected" : "",
		x ?? ""
	].filter(Boolean).join(" "), E = /* @__PURE__ */ d(l, { children: [
		s !== void 0 && /* @__PURE__ */ u(r, {
			level: 2,
			size: 8,
			children: s
		}),
		c && (typeof c == "string" ? /* @__PURE__ */ u("p", { children: c }) : c),
		S,
		p !== void 0 && /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u(t, { children: p }), /* @__PURE__ */ u(n, { size: "lg" })] })
	] }), D = _ && /* @__PURE__ */ u("div", {
		className: "card__media",
		children: /* @__PURE__ */ u("img", {
			src: _.src,
			alt: _.alt
		})
	}), O = g === "default" && !_ ? E : /* @__PURE__ */ d(l, { children: [D, /* @__PURE__ */ u("div", {
		className: "card__body",
		children: E
	})] });
	return f({
		render: a,
		ref: w,
		enabled: a !== void 0,
		props: {
			className: T,
			...C,
			children: O
		}
	}) || (i === void 0 ? /* @__PURE__ */ u("div", {
		ref: w,
		className: T,
		...C,
		children: S
	}) : /* @__PURE__ */ u("a", {
		ref: w,
		href: i,
		className: T,
		...o ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		...C,
		children: O
	}));
});
function m(e, t, n) {
	return [
		e,
		t ? "card__interactive" : "",
		n
	].filter(Boolean).join(" ");
}
var h = o(function({ interactive: e, className: t, ...n }, r) {
	return /* @__PURE__ */ u("div", {
		ref: r,
		className: m("card__header", e, t),
		...n
	});
}), g = o(function({ level: e = 3, size: t = 4, className: n, children: i, ...a }, o) {
	return /* @__PURE__ */ u(r, {
		ref: o,
		level: e,
		size: t,
		className: ["card__title", n].filter(Boolean).join(" "),
		...a,
		children: i
	});
}), _ = o(function({ size: e = "sm", lines: t, className: n, children: r, ...i }, o) {
	return /* @__PURE__ */ u(a, {
		ref: o,
		size: e,
		className: [
			"card__description",
			t ? `card__description--lines-${t}` : "",
			n
		].filter(Boolean).join(" "),
		...i,
		children: r
	});
}), v = o(function({ isolate: e = !0, className: t, onClick: n, ...r }, a) {
	let o = c(null);
	return /* @__PURE__ */ u("div", {
		ref: s((e) => {
			o.current = e, i(a, e);
		}, [a]),
		className: ["card__action", t].filter(Boolean).join(" "),
		onClick: (t) => {
			if (e) {
				t.stopPropagation();
				let e = o.current;
				(e?.contains(t.target) ?? !1) && e?.parentElement?.closest("a[href], [role=\"link\"]") && t.preventDefault();
			}
			n?.(t);
		},
		...r
	});
}), y = o(function({ isolate: e = !0, className: t, onClick: n, ...r }, i) {
	return /* @__PURE__ */ u("div", {
		ref: i,
		className: ["card__selection", t].filter(Boolean).join(" "),
		onClick: (t) => {
			e && t.stopPropagation(), n?.(t);
		},
		...r
	});
}), b = o(function({ interactive: e, className: t, ...n }, r) {
	return /* @__PURE__ */ u("div", {
		ref: r,
		className: m("card__content", e, t),
		...n
	});
}), x = o(function({ direction: e = "row", interactive: t, className: n, ...r }, i) {
	return /* @__PURE__ */ u("div", {
		ref: i,
		className: m("card__footer", t, [e === "column" ? "card__footer--column" : "", n].filter(Boolean).join(" ") || void 0),
		...r
	});
});
//#endregion
export { p as Card, v as CardAction, b as CardContent, _ as CardDescription, x as CardFooter, h as CardHeader, y as CardSelection, g as CardTitle };
