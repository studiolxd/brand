import './prev-next-nav.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/PrevNextNav/PrevNextNav.tsx
function r({ href: n, onClick: r, label: i, disabled: a, direction: o, chevronSize: s, linkComponent: c }) {
	let l = [
		"prev-next-nav__btn",
		`prev-next-nav__btn--${o}`,
		a ? "prev-next-nav__btn--disabled" : ""
	].filter(Boolean).join(" "), u = /* @__PURE__ */ t(e, {
		name: "chevron",
		size: s
	});
	return a ? /* @__PURE__ */ t("button", {
		type: "button",
		className: l,
		"aria-label": i,
		disabled: !0,
		children: u
	}) : n ? /* @__PURE__ */ t(c ?? "a", {
		href: n,
		className: l,
		"aria-label": i,
		onClick: r,
		children: u
	}) : /* @__PURE__ */ t("button", {
		type: "button",
		className: l,
		"aria-label": i,
		onClick: r,
		children: u
	});
}
function i({ prevHref: e, nextHref: i, prevOnClick: a, nextOnClick: o, prevLabel: s = "Anterior", nextLabel: c = "Siguiente", label: l, labelId: u, linkComponent: d, size: f = "md" }) {
	let p = f === "sm" ? "sm" : "md";
	return /* @__PURE__ */ n("div", {
		className: ["prev-next-nav", f === "sm" ? "prev-next-nav--sm" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ t(r, {
				href: e,
				onClick: a,
				label: s,
				disabled: !e && !a,
				direction: "prev",
				chevronSize: p,
				linkComponent: d
			}),
			/* @__PURE__ */ t("strong", {
				id: u,
				className: "prev-next-nav__label",
				children: l
			}),
			/* @__PURE__ */ t(r, {
				href: i,
				onClick: o,
				label: c,
				disabled: !i && !o,
				direction: "next",
				chevronSize: p,
				linkComponent: d
			})
		]
	});
}
//#endregion
export { i as PrevNextNav };
