import './prev-next-nav.css';
import { Chevron as e } from "./chevron.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/PrevNextNav/PrevNextNav.tsx
function r({ href: n, onClick: r, label: i, disabled: a, direction: o, chevronSize: s }) {
	let c = [
		"prev-next-nav__btn",
		`prev-next-nav__btn--${o}`,
		a ? "prev-next-nav__btn--disabled" : ""
	].filter(Boolean).join(" "), l = /* @__PURE__ */ t(e, { size: s });
	return a ? /* @__PURE__ */ t("span", {
		className: c,
		"aria-label": i,
		"aria-disabled": "true",
		children: l
	}) : n ? /* @__PURE__ */ t("a", {
		href: n,
		className: c,
		"aria-label": i,
		children: l
	}) : /* @__PURE__ */ t("button", {
		type: "button",
		className: c,
		"aria-label": i,
		onClick: r,
		children: l
	});
}
function i({ prevHref: e, nextHref: i, prevOnClick: a, nextOnClick: o, prevLabel: s = "Anterior", nextLabel: c = "Siguiente", label: l, size: u = "md" }) {
	let d = u === "sm" ? "xs" : "sm";
	return /* @__PURE__ */ n("div", {
		className: ["prev-next-nav", u === "sm" ? "prev-next-nav--sm" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ t(r, {
				href: e,
				onClick: a,
				label: s,
				disabled: !e && !a,
				direction: "prev",
				chevronSize: d
			}),
			/* @__PURE__ */ t("strong", {
				className: "prev-next-nav__label",
				children: l
			}),
			/* @__PURE__ */ t(r, {
				href: i,
				onClick: o,
				label: c,
				disabled: !i && !o,
				direction: "next",
				chevronSize: d
			})
		]
	});
}
//#endregion
export { i as PrevNextNav };
