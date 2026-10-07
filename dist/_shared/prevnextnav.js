import '../prevnextnav.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/messages/es/prevNextNav.ts
var a = {
	previous: "Anterior",
	next: "Siguiente"
};
//#endregion
//#region src/stories/molecules/PrevNextNav/PrevNextNav.tsx
function o({ href: e, onClick: a, label: o, title: s, disabled: c, direction: l, chevronSize: u, linkComponent: d }) {
	let f = [
		"prev-next-nav__btn",
		`prev-next-nav__btn--${l}`,
		s ? "prev-next-nav__btn--titled" : "",
		c ? "prev-next-nav__btn--disabled" : ""
	].filter(Boolean).join(" "), p = /* @__PURE__ */ r(t, {
		name: "chevron",
		size: u
	}), m = s ? /* @__PURE__ */ i(n, { children: [p, /* @__PURE__ */ i("span", {
		className: "prev-next-nav__text",
		children: [/* @__PURE__ */ r("span", {
			className: "prev-next-nav__eyebrow",
			children: o
		}), /* @__PURE__ */ r("span", {
			className: "prev-next-nav__title",
			children: s
		})]
	})] }) : p, h = s ? void 0 : o;
	return c ? /* @__PURE__ */ r("button", {
		type: "button",
		className: f,
		"aria-label": h,
		disabled: !0,
		children: m
	}) : e ? /* @__PURE__ */ r(d ?? "a", {
		href: e,
		className: f,
		"aria-label": h,
		onClick: a,
		children: m
	}) : /* @__PURE__ */ r("button", {
		type: "button",
		className: f,
		"aria-label": h,
		onClick: a,
		children: m
	});
}
function s({ prevHref: t, nextHref: n, prevOnClick: s, nextOnClick: c, prevLabel: l, nextLabel: u, prevTitle: d, nextTitle: f, label: p, labelId: m, linkComponent: h, size: g = "md", className: _ }) {
	let v = e("prevNextNav", a), y = g === "sm" ? "sm" : "md";
	return /* @__PURE__ */ i("div", {
		className: [
			"prev-next-nav",
			g === "sm" ? "prev-next-nav--sm" : "",
			d !== void 0 || f !== void 0 ? "prev-next-nav--titled" : "",
			_
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(o, {
				href: t,
				onClick: s,
				label: v("previous", l),
				disabled: !t && !s,
				direction: "prev",
				title: d,
				chevronSize: y,
				linkComponent: h
			}),
			p !== void 0 && /* @__PURE__ */ r("strong", {
				id: m,
				className: "prev-next-nav__label",
				children: p
			}),
			/* @__PURE__ */ r(o, {
				href: n,
				onClick: c,
				label: v("next", u),
				disabled: !n && !c,
				direction: "next",
				title: f,
				chevronSize: y,
				linkComponent: h
			})
		]
	});
}
//#endregion
export { s as t };
