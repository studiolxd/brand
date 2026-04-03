'use client';
import './carousel.css';
import { Chevron as e } from "./chevron.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import r from "embla-carousel-react";
//#region src/stories/atoms/Carousel/Carousel.tsx
function i({ children: i, options: a, plugins: o, hideButtons: s, className: c, slideSize: l, gradientColor: u }) {
	let [d, f] = r({
		loop: !0,
		...a
	}, o), p = {
		...l ? { "--carousel-slide-size": l } : {},
		...u ? { "--carousel-gradient-color": u } : {}
	};
	return /* @__PURE__ */ n("div", {
		className: ["carousel", c].filter(Boolean).join(" "),
		style: p,
		"aria-roledescription": "carousel",
		children: [
			!s && /* @__PURE__ */ t("button", {
				className: "carousel__btn carousel__btn--prev",
				onClick: () => f?.scrollPrev(),
				"aria-label": "Anterior",
				type: "button",
				children: /* @__PURE__ */ t(e, {
					className: "carousel__chevron carousel__chevron--prev",
					size: "lg"
				})
			}),
			/* @__PURE__ */ t("div", {
				className: "carousel__viewport",
				ref: d,
				children: /* @__PURE__ */ t("div", {
					className: "carousel__track",
					children: i
				})
			}),
			!s && /* @__PURE__ */ t("button", {
				className: "carousel__btn carousel__btn--next",
				onClick: () => f?.scrollNext(),
				"aria-label": "Siguiente",
				type: "button",
				children: /* @__PURE__ */ t(e, {
					className: "carousel__chevron",
					size: "lg"
				})
			})
		]
	});
}
function a({ children: e, className: n }) {
	return /* @__PURE__ */ t("div", {
		className: ["carousel__slide", n].filter(Boolean).join(" "),
		role: "group",
		"aria-roledescription": "slide",
		children: e
	});
}
//#endregion
export { i as Carousel, a as CarouselSlide };
