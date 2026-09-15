'use client';
import './prev-next-nav.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/PrevNextNav/PrevNextNav.tsx
function a({ href: e, onClick: a, label: o, title: s, disabled: c, direction: l, chevronSize: u, linkComponent: d }) {
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
function o({ prevHref: t, nextHref: n, prevOnClick: o, nextOnClick: s, prevLabel: c, nextLabel: l, prevTitle: u, nextTitle: d, label: f, labelId: p, linkComponent: m, size: h = "md" }) {
	let g = e("prevNextNav"), _ = h === "sm" ? "sm" : "md";
	return /* @__PURE__ */ i("div", {
		className: [
			"prev-next-nav",
			h === "sm" ? "prev-next-nav--sm" : "",
			u !== void 0 || d !== void 0 ? "prev-next-nav--titled" : ""
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ r(a, {
				href: t,
				onClick: o,
				label: g("previous", c),
				disabled: !t && !o,
				direction: "prev",
				title: u,
				chevronSize: _,
				linkComponent: m
			}),
			f !== void 0 && /* @__PURE__ */ r("strong", {
				id: p,
				className: "prev-next-nav__label",
				children: f
			}),
			/* @__PURE__ */ r(a, {
				href: n,
				onClick: s,
				label: g("next", l),
				disabled: !n && !s,
				direction: "next",
				title: d,
				chevronSize: _,
				linkComponent: m
			})
		]
	});
}
//#endregion
export { o as PrevNextNav };
