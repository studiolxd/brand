import './prev-next-nav.css';
import { Icon as e } from "./icon.js";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/PrevNextNav/PrevNextNav.tsx
function i({ href: i, onClick: a, label: o, title: s, disabled: c, direction: l, chevronSize: u, linkComponent: d }) {
	let f = [
		"prev-next-nav__btn",
		`prev-next-nav__btn--${l}`,
		s ? "prev-next-nav__btn--titled" : "",
		c ? "prev-next-nav__btn--disabled" : ""
	].filter(Boolean).join(" "), p = /* @__PURE__ */ n(e, {
		name: "chevron",
		size: u
	}), m = s ? /* @__PURE__ */ r(t, { children: [p, /* @__PURE__ */ r("span", {
		className: "prev-next-nav__text",
		children: [/* @__PURE__ */ n("span", {
			className: "prev-next-nav__eyebrow",
			children: o
		}), /* @__PURE__ */ n("span", {
			className: "prev-next-nav__title",
			children: s
		})]
	})] }) : p, h = s ? void 0 : o;
	return c ? /* @__PURE__ */ n("button", {
		type: "button",
		className: f,
		"aria-label": h,
		disabled: !0,
		children: m
	}) : i ? /* @__PURE__ */ n(d ?? "a", {
		href: i,
		className: f,
		"aria-label": h,
		onClick: a,
		children: m
	}) : /* @__PURE__ */ n("button", {
		type: "button",
		className: f,
		"aria-label": h,
		onClick: a,
		children: m
	});
}
function a({ prevHref: e, nextHref: t, prevOnClick: a, nextOnClick: o, prevLabel: s = "Anterior", nextLabel: c = "Siguiente", prevTitle: l, nextTitle: u, label: d, labelId: f, linkComponent: p, size: m = "md" }) {
	let h = m === "sm" ? "sm" : "md";
	return /* @__PURE__ */ r("div", {
		className: [
			"prev-next-nav",
			m === "sm" ? "prev-next-nav--sm" : "",
			l !== void 0 || u !== void 0 ? "prev-next-nav--titled" : ""
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n(i, {
				href: e,
				onClick: a,
				label: s,
				disabled: !e && !a,
				direction: "prev",
				title: l,
				chevronSize: h,
				linkComponent: p
			}),
			d !== void 0 && /* @__PURE__ */ n("strong", {
				id: f,
				className: "prev-next-nav__label",
				children: d
			}),
			/* @__PURE__ */ n(i, {
				href: t,
				onClick: o,
				label: c,
				disabled: !t && !o,
				direction: "next",
				title: u,
				chevronSize: h,
				linkComponent: p
			})
		]
	});
}
//#endregion
export { a as PrevNextNav };
