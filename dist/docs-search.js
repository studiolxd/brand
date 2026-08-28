'use client';
import './docs-search.css';
import { Spinner as e } from "./spinner.js";
import { InputField as t } from "./input-field.js";
import "react";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { Autocomplete as a } from "@base-ui-components/react/autocomplete";
//#region src/stories/molecules/DocsSearch/DocsSearch.tsx
function o(e) {
	return /* @__PURE__ */ r("a", { ...e });
}
function s({ id: s = "docs-search", query: c, onQueryChange: l, results: u, loading: d = !1, label: f = "Buscar en la documentación", labelHidden: p = !1, placeholder: m = "Buscar…", clearable: h = !0, clearLabel: g = "Borrar", resultsLabel: _ = "Resultados", emptyLabel: v = "Sin resultados.", loadingLabel: y = "Buscando…", size: b, renderLink: x = o, onSelect: S, className: C }) {
	let w = c.trim() !== "" && u.length === 0 ? d ? y : v : null;
	return /* @__PURE__ */ r(a.Root, {
		inline: !0,
		open: !0,
		items: u,
		filter: null,
		value: c,
		onValueChange: l,
		children: /* @__PURE__ */ i("div", {
			className: ["docs-search", C].filter(Boolean).join(" "),
			children: [
				/* @__PURE__ */ r(a.Input, {
					id: s,
					render: /* @__PURE__ */ r(t, {
						id: s,
						label: f,
						labelHidden: p,
						kind: "search",
						clearable: h,
						clearLabel: g,
						placeholder: m,
						...b ? { size: b } : {}
					})
				}),
				/* @__PURE__ */ r(a.List, {
					className: "docs-search__results",
					"aria-label": _,
					children: (e) => /* @__PURE__ */ r(a.Item, {
						value: e,
						className: "docs-search__result",
						onClick: () => S?.(e),
						render: (t) => x({
							...t,
							href: e.href,
							className: t.className ?? "docs-search__result",
							children: /* @__PURE__ */ i(n, { children: [
								e.product && /* @__PURE__ */ r("span", {
									className: "docs-search__result-product",
									children: e.product
								}),
								/* @__PURE__ */ r("span", {
									className: "docs-search__result-title",
									children: e.title
								}),
								e.excerpt && /* @__PURE__ */ r("span", {
									className: "docs-search__result-excerpt",
									children: e.excerpt
								})
							] })
						})
					}, e.href)
				}),
				w && /* @__PURE__ */ i("p", {
					className: "docs-search__status",
					role: "status",
					children: [d && /* @__PURE__ */ r(e, {
						size: "sm",
						"aria-hidden": !0
					}), w]
				})
			]
		})
	});
}
//#endregion
export { s as DocsSearch };
