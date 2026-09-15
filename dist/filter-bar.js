'use client';
import './filter-bar.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Children as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/FilterBar/FilterBar.tsx
function i({ search: i, children: a, actions: o, ariaLabel: s, className: c, ...l }) {
	let u = e("filterBar"), d = t.toArray(a);
	return /* @__PURE__ */ r("div", {
		className: ["filter-bar", c].filter(Boolean).join(" "),
		role: "search",
		"aria-label": u("label", s),
		...l,
		children: [i && /* @__PURE__ */ n("div", {
			className: "filter-bar__search",
			children: i
		}), (d.length > 0 || o) && /* @__PURE__ */ r("div", {
			className: "filter-bar__row",
			children: [d.length > 0 && /* @__PURE__ */ n("div", {
				className: "filter-bar__filters",
				children: d.map((e, t) => /* @__PURE__ */ n("div", {
					className: "filter-bar__filter",
					children: e
				}, t))
			}), o && /* @__PURE__ */ n("div", {
				className: "filter-bar__actions",
				children: o
			})]
		})]
	});
}
//#endregion
export { i as FilterBar };
