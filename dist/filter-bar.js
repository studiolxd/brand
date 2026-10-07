'use client';
import './filter-bar.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Children as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/messages/es/filterBar.ts
var i = { label: "Filtros" };
//#endregion
//#region src/stories/molecules/FilterBar/FilterBar.tsx
function a({ search: a, children: o, actions: s, ariaLabel: c, className: l, ...u }) {
	let d = e("filterBar", i), f = t.toArray(o);
	return /* @__PURE__ */ r("div", {
		className: ["filter-bar", l].filter(Boolean).join(" "),
		role: "search",
		"aria-label": d("label", c),
		...u,
		children: [a && /* @__PURE__ */ n("div", {
			className: "filter-bar__search",
			children: a
		}), (f.length > 0 || s) && /* @__PURE__ */ r("div", {
			className: "filter-bar__row",
			children: [f.length > 0 && /* @__PURE__ */ n("div", {
				className: "filter-bar__filters",
				children: f.map((e, t) => /* @__PURE__ */ n("div", {
					className: "filter-bar__filter",
					children: e
				}, t))
			}), s && /* @__PURE__ */ n("div", {
				className: "filter-bar__actions",
				children: s
			})]
		})]
	});
}
//#endregion
export { a as FilterBar };
