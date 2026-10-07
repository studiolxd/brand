'use client';
import './docs-search.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Spinner as t } from "./spinner.js";
import { t as n } from "./_shared/default-render-link.js";
import { t as r } from "./_shared/inputfield.js";
import { useId as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { Autocomplete as c } from "@base-ui/react/autocomplete";
//#region src/stories/messages/es/docsSearch.ts
var l = {
	label: "Buscar en la documentación",
	placeholder: "Buscar…",
	results: "Resultados",
	empty: "Sin resultados.",
	loading: "Buscando…"
};
//#endregion
//#region src/stories/molecules/DocsSearch/DocsSearch.tsx
function u({ id: u, query: d, onQueryChange: f, results: p, loading: m = !1, label: h, labelHidden: g, placeholder: _, clearable: v = !0, clearLabel: y, resultsLabel: b, emptyLabel: x, loadingLabel: S, size: C, renderLink: w = n, onSelect: T, className: E }) {
	let D = e("docsSearch", l), O = i(), k = u ?? O, A = d.trim() !== "" && p.length === 0 ? m ? D("loading", S) : D("empty", x) : null;
	return /* @__PURE__ */ o(c.Root, {
		inline: !0,
		open: !0,
		items: p,
		filter: null,
		value: d,
		onValueChange: f,
		children: /* @__PURE__ */ s("div", {
			className: ["docs-search", E].filter(Boolean).join(" "),
			children: [
				/* @__PURE__ */ o(c.Input, {
					id: k,
					render: /* @__PURE__ */ o(r, {
						id: k,
						label: D("label", h),
						labelHidden: g,
						kind: "search",
						clearable: v,
						...y === void 0 ? {} : { clearLabel: y },
						placeholder: D("placeholder", _),
						...C ? { size: C } : {}
					})
				}),
				/* @__PURE__ */ o(c.List, {
					className: "docs-search__results",
					"aria-label": D("results", b),
					children: (e) => /* @__PURE__ */ o(c.Item, {
						value: e,
						className: "docs-search__result",
						onClick: () => T?.(e),
						render: (t) => w({
							...t,
							href: e.href,
							className: t.className ?? "docs-search__result",
							children: /* @__PURE__ */ s(a, { children: [
								e.product && /* @__PURE__ */ o("span", {
									className: "docs-search__result-product",
									children: e.product
								}),
								/* @__PURE__ */ o("span", {
									className: "docs-search__result-title",
									children: e.title
								}),
								e.excerpt && /* @__PURE__ */ o("span", {
									className: "docs-search__result-excerpt",
									children: e.excerpt
								})
							] })
						})
					}, e.href)
				}),
				A && /* @__PURE__ */ s("p", {
					className: "docs-search__status",
					role: "status",
					children: [m && /* @__PURE__ */ o(t, {
						size: "sm",
						"aria-hidden": !0
					}), A]
				})
			]
		})
	});
}
//#endregion
export { u as DocsSearch };
