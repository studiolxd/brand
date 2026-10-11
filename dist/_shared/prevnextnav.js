import '../prevnextnav.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { t as n } from "./default-render-link.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/messages/es/prevNextNav.ts
var o = {
	previous: "Anterior",
	next: "Siguiente"
};
//#endregion
//#region src/stories/molecules/PrevNextNav/PrevNextNav.tsx
function s({ href: e, onClick: n, label: o, title: s, disabled: c, direction: l, chevronSize: u, renderLink: d }) {
	let f = [
		"prev-next-nav__btn",
		`prev-next-nav__btn--${l}`,
		s ? "prev-next-nav__btn--titled" : "",
		c ? "prev-next-nav__btn--disabled" : ""
	].filter(Boolean).join(" "), p = /* @__PURE__ */ i(t, {
		name: "chevron",
		size: u
	}), m = s ? /* @__PURE__ */ a(r, { children: [p, /* @__PURE__ */ a("span", {
		className: "prev-next-nav__text",
		children: [/* @__PURE__ */ i("span", {
			className: "prev-next-nav__eyebrow",
			children: o
		}), /* @__PURE__ */ i("span", {
			className: "prev-next-nav__title",
			children: s
		})]
	})] }) : p, h = s ? void 0 : o;
	return c ? /* @__PURE__ */ i("button", {
		type: "button",
		className: f,
		"aria-label": h,
		disabled: !0,
		children: m
	}) : e ? d({
		href: e,
		className: f,
		"aria-label": h,
		onClick: n,
		children: m
	}) : /* @__PURE__ */ i("button", {
		type: "button",
		className: f,
		"aria-label": h,
		onClick: n,
		children: m
	});
}
function c({ prevHref: t, nextHref: r, prevOnClick: c, nextOnClick: l, prevLabel: u, nextLabel: d, prevTitle: f, nextTitle: p, label: m, labelId: h, renderLink: g = n, size: _ = "md", className: v }) {
	let y = e("prevNextNav", o), b = _ === "sm" ? "sm" : "md";
	return /* @__PURE__ */ a("div", {
		className: [
			"prev-next-nav",
			_ === "sm" ? "prev-next-nav--sm" : "",
			f !== void 0 || p !== void 0 ? "prev-next-nav--titled" : "",
			v
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(s, {
				href: t,
				onClick: c,
				label: y("previous", u),
				disabled: !t && !c,
				direction: "prev",
				title: f,
				chevronSize: b,
				renderLink: g
			}),
			m !== void 0 && /* @__PURE__ */ i("strong", {
				id: h,
				className: "prev-next-nav__label",
				children: m
			}),
			/* @__PURE__ */ i(s, {
				href: r,
				onClick: l,
				label: y("next", d),
				disabled: !r && !l,
				direction: "next",
				title: p,
				chevronSize: b,
				renderLink: g
			})
		]
	});
}
//#endregion
export { c as t };
