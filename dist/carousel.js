'use client';
import './carousel.css';
import { Icon as e } from "./icon.js";
import { useEffect as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import i from "embla-carousel-react";
//#region src/stories/atoms/Carousel/Carousel.tsx
var a = typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function o({ children: o, options: s, plugins: c, hideButtons: l, className: u, slideSize: d, gradientColor: f, prevLabel: p = "Anterior", nextLabel: m = "Siguiente" }) {
	let h = a ? [] : c, [g, _] = i({
		loop: !0,
		...s
	}, h);
	t(() => {
		let e = _?.rootNode();
		if (!e) return;
		let t = _?.plugins(), n = () => {
			t?.autoScroll?.stop?.(), t?.autoplay?.stop?.();
		}, r = () => {
			t?.autoScroll?.play?.(), t?.autoplay?.play?.();
		};
		return e.addEventListener("mouseenter", n), e.addEventListener("mouseleave", r), e.addEventListener("focusin", n), e.addEventListener("focusout", r), () => {
			e.removeEventListener("mouseenter", n), e.removeEventListener("mouseleave", r), e.removeEventListener("focusin", n), e.removeEventListener("focusout", r);
		};
	}, [_]);
	let v = {
		...d ? { "--carousel-slide-size": d } : {},
		...f ? { "--carousel-gradient-color": f } : {}
	};
	return /* @__PURE__ */ r("div", {
		className: ["carousel", u].filter(Boolean).join(" "),
		style: v,
		role: "region",
		"aria-roledescription": "carousel",
		children: [
			!l && /* @__PURE__ */ n("button", {
				className: "carousel__btn carousel__btn--prev",
				onClick: () => _?.scrollPrev(),
				"aria-label": p,
				type: "button",
				children: /* @__PURE__ */ n(e, {
					name: "chevron",
					className: "carousel__chevron carousel__chevron--prev",
					size: "lg"
				})
			}),
			/* @__PURE__ */ n("div", {
				className: "carousel__viewport",
				ref: g,
				children: /* @__PURE__ */ n("div", {
					className: "carousel__track",
					children: o
				})
			}),
			!l && /* @__PURE__ */ n("button", {
				className: "carousel__btn carousel__btn--next",
				onClick: () => _?.scrollNext(),
				"aria-label": m,
				type: "button",
				children: /* @__PURE__ */ n(e, {
					name: "chevron",
					className: "carousel__chevron",
					size: "lg"
				})
			})
		]
	});
}
function s({ children: e, className: t }) {
	return /* @__PURE__ */ n("div", {
		className: ["carousel__slide", t].filter(Boolean).join(" "),
		role: "group",
		"aria-roledescription": "slide",
		children: e
	});
}
//#endregion
export { o as Carousel, s as CarouselSlide };
