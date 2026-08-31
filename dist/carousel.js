'use client';
import './carousel.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { Children as r, useCallback as i, useEffect as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/molecules/Carousel/Carousel.tsx
function d({ children: d, label: f = "Carrusel", roleDescription: p = "carrusel", trackLabel: m = "Diapositivas", slideSize: h, controls: g = !0, indicators: _ = !1, autoplay: v, prevLabel: y = "Anterior", nextLabel: b = "Siguiente", indicatorLabel: x = (e) => `Ir a la diapositiva ${e + 1}`, pauseLabel: S = "Pausar", playLabel: C = "Reproducir", slideStatusLabel: w = (e, t) => `Diapositiva ${e + 1} de ${t}`, className: T, id: E }) {
	let D = o(null), [O, k] = s(0), A = o(0), [j, M] = s(!1), [N, P] = s(!1), F = r.count(d), I = v !== void 0 && !N, L = (e) => Array.from(e.children), R = i((e) => {
		let t = D.current;
		if (!t) return;
		let n = L(t);
		if (n.length === 0) return;
		let r = n[(e + n.length) % n.length], i = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		t.scrollTo({
			left: r.offsetLeft - n[0].offsetLeft,
			behavior: i ? "auto" : "smooth"
		});
	}, []);
	a(() => {
		let e = D.current;
		if (!e) return;
		let t = () => {
			let t = L(e);
			if (t.length === 0) return;
			let n = t[0].offsetLeft, r = 0, i = Infinity;
			t.forEach((t, a) => {
				let o = Math.abs(t.offsetLeft - n - e.scrollLeft);
				o < i && (i = o, r = a);
			}), A.current = r, k(r);
		};
		return t(), e.addEventListener("scroll", t, { passive: !0 }), () => e.removeEventListener("scroll", t);
	}, [d]), a(() => {
		if (!v || N || j || F < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let e = window.setInterval(() => R(A.current + 1), v);
		return () => window.clearInterval(e);
	}, [
		v,
		N,
		j,
		F,
		R
	]);
	let z = (e) => {
		e.key === "ArrowRight" ? (e.preventDefault(), R(O + 1)) : e.key === "ArrowLeft" && (e.preventDefault(), R(O - 1));
	}, B = h ? { "--carousel-slide-size": h } : void 0;
	return /* @__PURE__ */ u("div", {
		id: E,
		className: ["carousel", T].filter(Boolean).join(" "),
		style: B,
		role: "region",
		"aria-roledescription": p,
		"aria-label": f,
		onMouseEnter: () => M(!0),
		onMouseLeave: () => M(!1),
		onFocus: () => M(!0),
		onBlur: () => M(!1),
		children: [
			/* @__PURE__ */ l("div", {
				ref: D,
				className: "carousel__track",
				tabIndex: 0,
				role: "group",
				"aria-label": m,
				onKeyDown: z,
				children: d
			}),
			/* @__PURE__ */ l(t, {
				as: "div",
				role: "status",
				"aria-live": I ? "off" : "polite",
				"aria-atomic": "true",
				children: w(O, F)
			}),
			(g || _ || v !== void 0) && /* @__PURE__ */ u("div", {
				className: "carousel__controls",
				children: [_ && /* @__PURE__ */ l("div", {
					className: "carousel__indicators",
					children: Array.from({ length: F }, (e, t) => /* @__PURE__ */ l("button", {
						type: "button",
						className: "carousel__indicator",
						"aria-label": x(t),
						"aria-current": t === O ? "true" : void 0,
						onClick: () => R(t)
					}, t))
				}), (g || v !== void 0) && /* @__PURE__ */ u("div", {
					className: "carousel__buttons",
					children: [v !== void 0 && /* @__PURE__ */ l(n, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": I ? S : C,
						onClick: () => P((e) => !e),
						children: /* @__PURE__ */ l(e, { name: I ? "pause" : "play" })
					}), g && /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l(n, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": y,
						onClick: () => R(O - 1),
						children: /* @__PURE__ */ l(e, { name: "arrow-left" })
					}), /* @__PURE__ */ l(n, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": b,
						onClick: () => R(O + 1),
						children: /* @__PURE__ */ l(e, { name: "arrow" })
					})] })]
				})]
			})
		]
	});
}
function f({ roleDescription: e = "diapositiva", className: t, children: n, ...r }) {
	return /* @__PURE__ */ l("div", {
		className: ["carousel__slide", t].filter(Boolean).join(" "),
		role: "group",
		"aria-roledescription": e,
		...r,
		children: n
	});
}
//#endregion
export { d as Carousel, f as CarouselSlide };
