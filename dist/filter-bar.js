import './filter-bar.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { Children as n } from "react";
//#region src/stories/molecules/FilterBar/FilterBar.tsx
function r({ search: r, children: i, actions: a, ariaLabel: o = "Filtros", className: s, ...c }) {
	let l = n.toArray(i);
	return /* @__PURE__ */ t("div", {
		className: ["filter-bar", s].filter(Boolean).join(" "),
		role: "search",
		"aria-label": o,
		...c,
		children: [r && /* @__PURE__ */ e("div", {
			className: "filter-bar__search",
			children: r
		}), (l.length > 0 || a) && /* @__PURE__ */ t("div", {
			className: "filter-bar__row",
			children: [l.length > 0 && /* @__PURE__ */ e("div", {
				className: "filter-bar__filters",
				children: l.map((t, n) => /* @__PURE__ */ e("div", {
					className: "filter-bar__filter",
					children: t
				}, n))
			}), a && /* @__PURE__ */ e("div", {
				className: "filter-bar__actions",
				children: a
			})]
		})]
	});
}
//#endregion
export { r as FilterBar };
