import '../prevnextnav.css';
import { n as e } from "./env.js";
import { n as t } from "./brandmessagescontext.js";
import { Icon as n } from "../icon.js";
import { n as r, t as i } from "./default-render-link.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/prevNextNav.ts
var c = {
	previous: "Anterior",
	next: "Siguiente"
};
//#endregion
//#region src/stories/molecules/PrevNextNav/PrevNextNav.tsx
function l({ href: e, onClick: t, label: r, title: i, disabled: c, direction: l, chevronSize: u, renderLink: d }) {
	let f = [
		"prev-next-nav__btn",
		`prev-next-nav__btn--${l}`,
		i ? "prev-next-nav__btn--titled" : "",
		c ? "prev-next-nav__btn--disabled" : ""
	].filter(Boolean).join(" "), p = /* @__PURE__ */ o(n, {
		name: "chevron",
		size: u
	}), m = i ? /* @__PURE__ */ s(a, { children: [p, /* @__PURE__ */ s("span", {
		className: "prev-next-nav__text",
		children: [/* @__PURE__ */ o("span", {
			className: "prev-next-nav__eyebrow",
			children: r
		}), /* @__PURE__ */ o("span", {
			className: "prev-next-nav__title",
			children: i
		})]
	})] }) : p, h = i ? void 0 : r;
	return c ? /* @__PURE__ */ o("button", {
		type: "button",
		className: f,
		"aria-label": h,
		disabled: !0,
		children: m
	}) : e ? d({
		href: e,
		className: f,
		"aria-label": h,
		onClick: t,
		children: m
	}) : /* @__PURE__ */ o("button", {
		type: "button",
		className: f,
		"aria-label": h,
		onClick: t,
		children: m
	});
}
function u({ prevHref: n, nextHref: a, prevOnClick: u, nextOnClick: d, prevLabel: f, nextLabel: p, prevTitle: m, nextTitle: h, label: g, labelId: _, renderLink: v, linkComponent: y, size: b = "md", className: x }) {
	y !== void 0 && e("PrevNextNav", "linkComponent", "`renderLink`");
	let S = v ?? (y ? r(y) : i), C = t("prevNextNav", c), w = b === "sm" ? "sm" : "md";
	return /* @__PURE__ */ s("div", {
		className: [
			"prev-next-nav",
			b === "sm" ? "prev-next-nav--sm" : "",
			m !== void 0 || h !== void 0 ? "prev-next-nav--titled" : "",
			x
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o(l, {
				href: n,
				onClick: u,
				label: C("previous", f),
				disabled: !n && !u,
				direction: "prev",
				title: m,
				chevronSize: w,
				renderLink: S
			}),
			g !== void 0 && /* @__PURE__ */ o("strong", {
				id: _,
				className: "prev-next-nav__label",
				children: g
			}),
			/* @__PURE__ */ o(l, {
				href: a,
				onClick: d,
				label: C("next", p),
				disabled: !a && !d,
				direction: "next",
				title: h,
				chevronSize: w,
				renderLink: S
			})
		]
	});
}
//#endregion
export { u as t };
