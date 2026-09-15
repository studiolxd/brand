'use client';
import './carousel.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Button as r } from "./button.js";
import { t as i } from "./_shared/css-properties.js";
import { Children as a, useCallback as o, useEffect as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/molecules/Carousel/Carousel.tsx
function p({ children: p, label: m, roleDescription: h, trackLabel: g, slideSize: _, controls: v = !0, indicators: y = !1, autoplay: b, prevLabel: x, nextLabel: S, indicatorLabel: C, pauseLabel: w, playLabel: T, slideStatusLabel: E, className: D, id: O }) {
	let k = e("carousel"), A = c(null), [j, M] = l(0), N = c(0), [P, F] = l(!1), [I, L] = l(!1), R = a.count(p), z = b !== void 0 && !I, B = (e) => Array.from(e.children), V = o((e) => {
		let t = A.current;
		if (!t) return;
		let n = B(t);
		if (n.length === 0) return;
		let r = n[(e + n.length) % n.length], i = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		t.scrollTo({
			left: r.offsetLeft - n[0].offsetLeft,
			behavior: i ? "auto" : "smooth"
		});
	}, []);
	s(() => {
		let e = A.current;
		if (!e) return;
		let t = () => {
			let t = B(e);
			if (t.length === 0) return;
			let n = t[0].offsetLeft, r = 0, i = Infinity;
			t.forEach((t, a) => {
				let o = Math.abs(t.offsetLeft - n - e.scrollLeft);
				o < i && (i = o, r = a);
			}), N.current = r, M(r);
		};
		return t(), e.addEventListener("scroll", t, { passive: !0 }), () => e.removeEventListener("scroll", t);
	}, [p]), s(() => {
		if (!b || I || P || R < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let e = window.setInterval(() => V(N.current + 1), b);
		return () => window.clearInterval(e);
	}, [
		b,
		I,
		P,
		R,
		V
	]);
	let H = (e) => {
		e.key === "ArrowRight" ? (e.preventDefault(), V(j + 1)) : e.key === "ArrowLeft" && (e.preventDefault(), V(j - 1));
	};
	return /* @__PURE__ */ f("div", {
		id: O,
		ref: i({ "--carousel-slide-size": _ }),
		className: ["carousel", D].filter(Boolean).join(" "),
		role: "region",
		"aria-roledescription": k("roleDescription", h),
		"aria-label": k("label", m),
		onMouseEnter: () => F(!0),
		onMouseLeave: () => F(!1),
		onFocus: () => F(!0),
		onBlur: () => F(!1),
		children: [
			/* @__PURE__ */ d("div", {
				ref: A,
				className: "carousel__track",
				tabIndex: 0,
				role: "group",
				"aria-label": k("track", g),
				onKeyDown: H,
				children: p
			}),
			/* @__PURE__ */ d(n, {
				as: "div",
				role: "status",
				"aria-live": z ? "off" : "polite",
				"aria-atomic": "true",
				children: k("slideStatus", E)(j, R)
			}),
			(v || y || b !== void 0) && /* @__PURE__ */ f("div", {
				className: "carousel__controls",
				children: [y && /* @__PURE__ */ d("div", {
					className: "carousel__indicators",
					children: Array.from({ length: R }, (e, t) => /* @__PURE__ */ d("button", {
						type: "button",
						className: "carousel__indicator",
						"aria-label": k("indicator", C)(t),
						"aria-current": t === j ? "true" : void 0,
						onClick: () => V(t)
					}, t))
				}), (v || b !== void 0) && /* @__PURE__ */ f("div", {
					className: "carousel__buttons",
					children: [b !== void 0 && /* @__PURE__ */ d(r, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": z ? k("pause", w) : k("play", T),
						onClick: () => L((e) => !e),
						children: /* @__PURE__ */ d(t, { name: z ? "pause" : "play" })
					}), v && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d(r, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": k("previous", x),
						onClick: () => V(j - 1),
						children: /* @__PURE__ */ d(t, { name: "arrow-left" })
					}), /* @__PURE__ */ d(r, {
						variant: "ghost",
						iconOnly: !0,
						"aria-label": k("next", S),
						onClick: () => V(j + 1),
						children: /* @__PURE__ */ d(t, { name: "arrow" })
					})] })]
				})]
			})
		]
	});
}
function m({ roleDescription: t, className: n, children: r, ...i }) {
	let a = e("carousel");
	return /* @__PURE__ */ d("div", {
		className: ["carousel__slide", n].filter(Boolean).join(" "),
		role: "group",
		"aria-roledescription": a("slideRoleDescription", t),
		...i,
		children: r
	});
}
//#endregion
export { p as Carousel, m as CarouselSlide };
