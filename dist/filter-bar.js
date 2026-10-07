'use client';
import './filter-bar.css';
import { n as e } from "./_shared/env.js";
import { n as t } from "./_shared/brandmessagescontext.js";
import { Children as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/messages/es/filterBar.ts
var a = { label: "Filtros" };
//#endregion
//#region src/stories/molecules/FilterBar/FilterBar.tsx
function o({ search: o, children: s, actions: c, "aria-label": l, ariaLabel: u, className: d, ...f }) {
	u !== void 0 && e("FilterBar", "ariaLabel", "`aria-label`");
	let p = l ?? u, m = t("filterBar", a), h = n.toArray(s);
	return /* @__PURE__ */ i("div", {
		className: ["filter-bar", d].filter(Boolean).join(" "),
		role: "search",
		"aria-label": m("label", p),
		...f,
		children: [o && /* @__PURE__ */ r("div", {
			className: "filter-bar__search",
			children: o
		}), (h.length > 0 || c) && /* @__PURE__ */ i("div", {
			className: "filter-bar__row",
			children: [h.length > 0 && /* @__PURE__ */ r("div", {
				className: "filter-bar__filters",
				children: h.map((e, t) => /* @__PURE__ */ r("div", {
					className: "filter-bar__filter",
					children: e
				}, t))
			}), c && /* @__PURE__ */ r("div", {
				className: "filter-bar__actions",
				children: c
			})]
		})]
	});
}
//#endregion
export { o as FilterBar };
