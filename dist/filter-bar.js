import './filter-bar.css';
import { Children as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/FilterBar/FilterBar.tsx
function r({ search: r, children: i, actions: a, ariaLabel: o = "Filtros", className: s, ...c }) {
	let l = e.toArray(i);
	return /* @__PURE__ */ n("div", {
		className: ["filter-bar", s].filter(Boolean).join(" "),
		role: "search",
		"aria-label": o,
		...c,
		children: [r && /* @__PURE__ */ t("div", {
			className: "filter-bar__search",
			children: r
		}), (l.length > 0 || a) && /* @__PURE__ */ n("div", {
			className: "filter-bar__row",
			children: [l.length > 0 && /* @__PURE__ */ t("div", {
				className: "filter-bar__filters",
				children: l.map((e, n) => /* @__PURE__ */ t("div", {
					className: "filter-bar__filter",
					children: e
				}, n))
			}), a && /* @__PURE__ */ t("div", {
				className: "filter-bar__actions",
				children: a
			})]
		})]
	});
}
//#endregion
export { r as FilterBar };
