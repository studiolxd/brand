'use client';
import './carousel.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { t as r } from "./_shared/css-properties.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { Children as s, useCallback as c, useEffect as l, useRef as u, useState as d } from "react";
//#region src/stories/molecules/Carousel/Carousel.tsx
function f({ children: f, label: p = "Carrusel", roleDescription: m = "carrusel", trackLabel: h = "Diapositivas", slideSize: g, controls: _ = !0, indicators: v = !1, autoplay: y, prevLabel: b = "Anterior", nextLabel: x = "Siguiente", indicatorLabel: S = (e) => `Ir a la diapositiva ${e + 1}`, pauseLabel: C = "Pausar", playLabel: w = "Reproducir", slideStatusLabel: T = (e, t) => `Diapositiva ${e + 1} de ${t}`, className: E, id: D }) {
	let O = u(null), [k, A] = d(0), j = u(0), [M, N] = d(!1), [P, F] = d(!1), I = s.count(f), L = y !== void 0 && !P, R = (e) => Array.from(e.children), z = c((e) => {
		let t = O.current;
		if (!t) return;
		let n = R(t);
		if (n.length === 0) return;
		let r = n[(e + n.length) % n.length], i = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		t.scrollTo({
			left: r.offsetLeft - n[0].offsetLeft,
			behavior: i ? "auto" : "smooth"
		});
	}, []);
	l(() => {
		let e = O.current;
		if (!e) return;
		let t = () => {
			let t = R(e);
			if (t.length === 0) return;
			let n = t[0].offsetLeft, r = 0, i = Infinity;
			t.forEach((t, a) => {
				let o = Math.abs(t.offsetLeft - n - e.scrollLeft);
				o < i && (i = o, r = a);
			}), j.current = r, A(r);
		};
		return t(), e.addEventListener("scroll", t, { passive: !0 }), () => e.removeEventListener("scroll", t);
	}, [f]), l(() => {
		if (!y || P || M || I < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let e = window.setInterval(() => z(j.current + 1), y);
		return () => window.clearInterval(e);
	}, [
		y,
		P,
		M,
		I,
		z
	]);
	let B = (e) => {
		e.key === "ArrowRight" ? (e.preventDefault(), z(k + 1)) : e.key === "ArrowLeft" && (e.preventDefault(), z(k - 1));
	};
	return /* @__PURE__ */ o("div", {
		id: D,
		ref: r({ "--carousel-slide-size": g }),
		className: ["carousel", E].filter(Boolean).join(" "),
		role: "region",
		"aria-roledescription": m,
		"aria-label": p,
		onMouseEnter: () => N(!0),
		onMouseLeave: () => N(!1),
		onFocus: () => N(!0),
		onBlur: () => N(!1),
		children: [
			/* @__PURE__ */ a("div", {
				ref: O,
				className: "carousel__track",
				tabIndex: 0,
				role: "group",
				"aria-label": h,
				onKeyDown: B,
				children: f
			}),
			/* @__PURE__ */ a(t, {
				as: "div",
				role: "status",
				"aria-live": L ? "off" : "polite",
				"aria-atomic": "true",
				children: T(k, I)
			}),
			(_ || v || y !== void 0) && /* @__PURE__ */ o("div", {
				className: "carousel__controls",
				children: [v && /* @__PURE__ */ a("div", {
					className: "carousel__indicators",
					children: Array.from({ length: I }, (e, t) => /* @__PURE__ */ a("button", {
						type: "button",
						className: "carousel__indicator",
						"aria-label": S(t),
						"aria-current": t === k ? "true" : void 0,
						onClick: () => z(t)
					}, t))
				}), (_ || y !== void 0) && /* @__PURE__ */ o("div", {
					className: "carousel__buttons",
					children: [y !== void 0 && /* @__PURE__ */ a(n, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": L ? C : w,
						onClick: () => F((e) => !e),
						children: /* @__PURE__ */ a(e, { name: L ? "pause" : "play" })
					}), _ && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a(n, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": b,
						onClick: () => z(k - 1),
						children: /* @__PURE__ */ a(e, { name: "arrow-left" })
					}), /* @__PURE__ */ a(n, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": x,
						onClick: () => z(k + 1),
						children: /* @__PURE__ */ a(e, { name: "arrow" })
					})] })]
				})]
			})
		]
	});
}
function p({ roleDescription: e = "diapositiva", className: t, children: n, ...r }) {
	return /* @__PURE__ */ a("div", {
		className: ["carousel__slide", t].filter(Boolean).join(" "),
		role: "group",
		"aria-roledescription": e,
		...r,
		children: n
	});
}
//#endregion
export { f as Carousel, p as CarouselSlide };
