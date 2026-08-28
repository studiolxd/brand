'use client';
import './carousel.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { Children as i, useCallback as a, useEffect as o, useRef as s, useState as c } from "react";
//#region src/stories/molecules/Carousel/Carousel.tsx
function l({ children: l, label: u = "Carrusel", roleDescription: d = "carrusel", trackLabel: f = "Diapositivas", slideSize: p, controls: m = !0, indicators: h = !1, autoplay: g, prevLabel: _ = "Anterior", nextLabel: v = "Siguiente", indicatorLabel: y = (e) => `Ir a la diapositiva ${e + 1}`, className: b, id: x }) {
	let S = s(null), [C, w] = c(0), T = s(0), [E, D] = c(!1), O = i.count(l), k = (e) => Array.from(e.children), A = a((e) => {
		let t = S.current;
		if (!t) return;
		let n = k(t);
		if (n.length === 0) return;
		let r = n[(e + n.length) % n.length], i = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		t.scrollTo({
			left: r.offsetLeft - n[0].offsetLeft,
			behavior: i ? "auto" : "smooth"
		});
	}, []);
	o(() => {
		let e = S.current;
		if (!e) return;
		let t = () => {
			let t = k(e);
			if (t.length === 0) return;
			let n = t[0].offsetLeft, r = 0, i = Infinity;
			t.forEach((t, a) => {
				let o = Math.abs(t.offsetLeft - n - e.scrollLeft);
				o < i && (i = o, r = a);
			}), T.current = r, w(r);
		};
		return t(), e.addEventListener("scroll", t, { passive: !0 }), () => e.removeEventListener("scroll", t);
	}, [l]), o(() => {
		if (!g || E || O < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let e = window.setInterval(() => A(T.current + 1), g);
		return () => window.clearInterval(e);
	}, [
		g,
		E,
		O,
		A
	]);
	let j = (e) => {
		e.key === "ArrowRight" ? (e.preventDefault(), A(C + 1)) : e.key === "ArrowLeft" && (e.preventDefault(), A(C - 1));
	}, M = p ? { "--carousel-slide-size": p } : void 0;
	return /* @__PURE__ */ r("div", {
		id: x,
		className: ["carousel", b].filter(Boolean).join(" "),
		style: M,
		role: "region",
		"aria-roledescription": d,
		"aria-label": u,
		onMouseEnter: () => D(!0),
		onMouseLeave: () => D(!1),
		onFocus: () => D(!0),
		onBlur: () => D(!1),
		children: [/* @__PURE__ */ n("div", {
			ref: S,
			className: "carousel__track",
			tabIndex: 0,
			role: "group",
			"aria-label": f,
			onKeyDown: j,
			children: l
		}), (m || h) && /* @__PURE__ */ r("div", {
			className: "carousel__controls",
			children: [h && /* @__PURE__ */ n("div", {
				className: "carousel__indicators",
				children: Array.from({ length: O }, (e, t) => /* @__PURE__ */ n("button", {
					type: "button",
					className: "carousel__indicator",
					"aria-label": y(t),
					"aria-current": t === C ? "true" : void 0,
					onClick: () => A(t)
				}, t))
			}), m && /* @__PURE__ */ r("div", {
				className: "carousel__buttons",
				children: [/* @__PURE__ */ n(t, {
					variant: "ghost",
					iconOnly: !0,
					"aria-label": _,
					onClick: () => A(C - 1),
					children: /* @__PURE__ */ n(e, { name: "arrow-left" })
				}), /* @__PURE__ */ n(t, {
					variant: "ghost",
					iconOnly: !0,
					"aria-label": v,
					onClick: () => A(C + 1),
					children: /* @__PURE__ */ n(e, { name: "arrow" })
				})]
			})]
		})]
	});
}
function u({ roleDescription: e = "diapositiva", className: t, children: r, ...i }) {
	return /* @__PURE__ */ n("div", {
		className: ["carousel__slide", t].filter(Boolean).join(" "),
		role: "group",
		"aria-roledescription": e,
		...i,
		children: r
	});
}
//#endregion
export { l as Carousel, u as CarouselSlide };
