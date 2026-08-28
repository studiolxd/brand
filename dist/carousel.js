'use client';
import './carousel.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Children as n, useCallback as r, useEffect as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/Carousel/Carousel.tsx
function l({ children: l, label: u = "Carrusel", roleDescription: d = "carrusel", trackLabel: f = "Diapositivas", slideSize: p, controls: m = !0, indicators: h = !1, autoplay: g, prevLabel: _ = "Anterior", nextLabel: v = "Siguiente", indicatorLabel: y = (e) => `Ir a la diapositiva ${e + 1}`, className: b, id: x }) {
	let S = a(null), [C, w] = o(0), T = a(0), [E, D] = o(!1), O = n.count(l), k = (e) => Array.from(e.children), A = r((e) => {
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
	i(() => {
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
	}, [l]), i(() => {
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
	return /* @__PURE__ */ c("div", {
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
		children: [/* @__PURE__ */ s("div", {
			ref: S,
			className: "carousel__track",
			tabIndex: 0,
			role: "group",
			"aria-label": f,
			onKeyDown: j,
			children: l
		}), (m || h) && /* @__PURE__ */ c("div", {
			className: "carousel__controls",
			children: [h && /* @__PURE__ */ s("div", {
				className: "carousel__indicators",
				children: Array.from({ length: O }, (e, t) => /* @__PURE__ */ s("button", {
					type: "button",
					className: "carousel__indicator",
					"aria-label": y(t),
					"aria-current": t === C ? "true" : void 0,
					onClick: () => A(t)
				}, t))
			}), m && /* @__PURE__ */ c("div", {
				className: "carousel__buttons",
				children: [/* @__PURE__ */ s(t, {
					variant: "ghost",
					iconOnly: !0,
					"aria-label": _,
					onClick: () => A(C - 1),
					children: /* @__PURE__ */ s(e, { name: "arrow-left" })
				}), /* @__PURE__ */ s(t, {
					variant: "ghost",
					iconOnly: !0,
					"aria-label": v,
					onClick: () => A(C + 1),
					children: /* @__PURE__ */ s(e, { name: "arrow" })
				})]
			})]
		})]
	});
}
function u({ roleDescription: e = "diapositiva", className: t, children: n, ...r }) {
	return /* @__PURE__ */ s("div", {
		className: ["carousel__slide", t].filter(Boolean).join(" "),
		role: "group",
		"aria-roledescription": e,
		...r,
		children: n
	});
}
//#endregion
export { l as Carousel, u as CarouselSlide };
