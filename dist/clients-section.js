'use client';
import './clients-section.css';
import { Carousel as e, CarouselSlide as t } from "./carousel.js";
import { Heading as n } from "./heading.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import a from "embla-carousel-auto-scroll";
//#region src/stories/sections/ClientsSection/ClientsSection.tsx
function o({ title: o = "Hemos trabajado junto a...", clients: s }) {
	return /* @__PURE__ */ i("section", {
		className: "clients-section",
		children: [/* @__PURE__ */ r(n, {
			level: 2,
			weight: "semibold",
			children: o
		}), /* @__PURE__ */ r(e, {
			options: { align: "start" },
			plugins: [a({
				speed: 1,
				stopOnInteraction: !1
			})],
			hideButtons: !0,
			children: s.map((e) => /* @__PURE__ */ r(t, {
				className: "clients-section__slide",
				children: /* @__PURE__ */ r("img", {
					src: e.logo,
					alt: e.name,
					className: "clients-section__logo"
				})
			}, e.id))
		})]
	});
}
//#endregion
export { o as ClientsSection };
