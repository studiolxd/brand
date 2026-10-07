'use client';
import './carousel.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { t as i } from "./_shared/css-properties.js";
import { Children as a, useCallback as o, useEffect as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/messages/es/carousel.ts
var p = {
	label: "Carrusel",
	roleDescription: "carrusel",
	track: "Diapositivas",
	previous: "Anterior",
	next: "Siguiente",
	indicator: (e) => `Ir a la diapositiva ${e + 1}`,
	pause: "Pausar",
	play: "Reproducir",
	slideStatus: (e, t) => `Diapositiva ${e + 1} de ${t}`,
	slideRoleDescription: "diapositiva"
};
//#endregion
//#region src/stories/molecules/Carousel/Carousel.tsx
function m({ children: m, label: h, roleDescription: g, trackLabel: _, slideSize: v, controls: y = !0, indicators: b = !1, autoplay: x, prevLabel: S, nextLabel: C, indicatorLabel: w, pauseLabel: T, playLabel: E, slideStatusLabel: D, className: O, id: k }) {
	let A = e("carousel", p), j = c(null), [M, N] = l(0), P = c(0), [F, I] = l(!1), [L, R] = l(!1), z = a.count(m), B = x !== void 0 && !L, V = (e) => Array.from(e.children), H = o((e) => {
		let t = j.current;
		if (!t) return;
		let n = V(t);
		if (n.length === 0) return;
		let r = n[(e + n.length) % n.length], i = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		t.scrollTo({
			left: r.offsetLeft - n[0].offsetLeft,
			behavior: i ? "auto" : "smooth"
		});
	}, []);
	s(() => {
		let e = j.current;
		if (!e) return;
		let t = () => {
			let t = V(e);
			if (t.length === 0) return;
			let n = t[0].offsetLeft, r = 0, i = Infinity;
			t.forEach((t, a) => {
				let o = Math.abs(t.offsetLeft - n - e.scrollLeft);
				o < i && (i = o, r = a);
			}), P.current = r, N(r);
		};
		return t(), e.addEventListener("scroll", t, { passive: !0 }), () => e.removeEventListener("scroll", t);
	}, [m]), s(() => {
		if (!x || L || F || z < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let e = window.setInterval(() => H(P.current + 1), x);
		return () => window.clearInterval(e);
	}, [
		x,
		L,
		F,
		z,
		H
	]);
	let U = (e) => {
		e.key === "ArrowRight" ? (e.preventDefault(), H(M + 1)) : e.key === "ArrowLeft" && (e.preventDefault(), H(M - 1));
	};
	return /* @__PURE__ */ f("div", {
		id: k,
		ref: i({ "--carousel-slide-size": v }),
		className: ["carousel", O].filter(Boolean).join(" "),
		role: "region",
		"aria-roledescription": A("roleDescription", g),
		"aria-label": A("label", h),
		onMouseEnter: () => I(!0),
		onMouseLeave: () => I(!1),
		onFocus: () => I(!0),
		onBlur: () => I(!1),
		children: [
			/* @__PURE__ */ d("div", {
				ref: j,
				className: "carousel__track",
				tabIndex: 0,
				role: "group",
				"aria-label": A("track", _),
				onKeyDown: U,
				children: m
			}),
			/* @__PURE__ */ d(n, {
				as: "div",
				role: "status",
				"aria-live": B ? "off" : "polite",
				"aria-atomic": "true",
				children: A("slideStatus", D)(M, z)
			}),
			(y || b || x !== void 0) && /* @__PURE__ */ f("div", {
				className: "carousel__controls",
				children: [b && /* @__PURE__ */ d("div", {
					className: "carousel__indicators",
					children: Array.from({ length: z }, (e, t) => /* @__PURE__ */ d("button", {
						type: "button",
						className: "carousel__indicator",
						"aria-label": A("indicator", w)(t),
						"aria-current": t === M ? "true" : void 0,
						onClick: () => H(t)
					}, t))
				}), (y || x !== void 0) && /* @__PURE__ */ f("div", {
					className: "carousel__buttons",
					children: [x !== void 0 && /* @__PURE__ */ d(r, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": B ? A("pause", T) : A("play", E),
						onClick: () => R((e) => !e),
						children: /* @__PURE__ */ d(t, { name: B ? "pause" : "play" })
					}), y && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d(r, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": A("previous", S),
						onClick: () => H(M - 1),
						children: /* @__PURE__ */ d(t, { name: "arrow-left" })
					}), /* @__PURE__ */ d(r, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": A("next", C),
						onClick: () => H(M + 1),
						children: /* @__PURE__ */ d(t, { name: "arrow" })
					})] })]
				})]
			})
		]
	});
}
function h({ roleDescription: t, className: n, children: r, ...i }) {
	let a = e("carousel", p);
	return /* @__PURE__ */ d("div", {
		className: ["carousel__slide", n].filter(Boolean).join(" "),
		role: "group",
		"aria-roledescription": a("slideRoleDescription", t),
		...i,
		children: r
	});
}
//#endregion
export { m as Carousel, h as CarouselSlide };
