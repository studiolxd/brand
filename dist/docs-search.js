'use client';
import './docs-search.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Spinner as t } from "./spinner.js";
import { InputField as n } from "./input-field.js";
import "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { Autocomplete as o } from "@base-ui/react/autocomplete";
//#region src/stories/molecules/DocsSearch/DocsSearch.tsx
function s(e) {
	return /* @__PURE__ */ i("a", { ...e });
}
function c({ id: c = "docs-search", query: l, onQueryChange: u, results: d, loading: f = !1, label: p, labelHidden: m, placeholder: h, clearable: g = !0, clearLabel: _, resultsLabel: v, emptyLabel: y, loadingLabel: b, size: x, renderLink: S = s, onSelect: C, className: w }) {
	let T = e("docsSearch"), E = l.trim() !== "" && d.length === 0 ? f ? T("loading", b) : T("empty", y) : null;
	return /* @__PURE__ */ i(o.Root, {
		inline: !0,
		open: !0,
		items: d,
		filter: null,
		value: l,
		onValueChange: u,
		children: /* @__PURE__ */ a("div", {
			className: ["docs-search", w].filter(Boolean).join(" "),
			children: [
				/* @__PURE__ */ i(o.Input, {
					id: c,
					render: /* @__PURE__ */ i(n, {
						id: c,
						label: T("label", p),
						labelHidden: m,
						kind: "search",
						clearable: g,
						..._ === void 0 ? {} : { clearLabel: _ },
						placeholder: T("placeholder", h),
						...x ? { size: x } : {}
					})
				}),
				/* @__PURE__ */ i(o.List, {
					className: "docs-search__results",
					"aria-label": T("results", v),
					children: (e) => /* @__PURE__ */ i(o.Item, {
						value: e,
						className: "docs-search__result",
						onClick: () => C?.(e),
						render: (t) => S({
							...t,
							href: e.href,
							className: t.className ?? "docs-search__result",
							children: /* @__PURE__ */ a(r, { children: [
								e.product && /* @__PURE__ */ i("span", {
									className: "docs-search__result-product",
									children: e.product
								}),
								/* @__PURE__ */ i("span", {
									className: "docs-search__result-title",
									children: e.title
								}),
								e.excerpt && /* @__PURE__ */ i("span", {
									className: "docs-search__result-excerpt",
									children: e.excerpt
								})
							] })
						})
					}, e.href)
				}),
				E && /* @__PURE__ */ a("p", {
					className: "docs-search__status",
					role: "status",
					children: [f && /* @__PURE__ */ i(t, {
						size: "sm",
						"aria-hidden": !0
					}), E]
				})
			]
		})
	});
}
//#endregion
export { c as DocsSearch };
