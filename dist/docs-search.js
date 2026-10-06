'use client';
import './docs-search.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Spinner as t } from "./spinner.js";
import { t as n } from "./_shared/default-render-link.js";
import { InputField as r } from "./input-field.js";
import { useId as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { Autocomplete as c } from "@base-ui/react/autocomplete";
//#region src/stories/molecules/DocsSearch/DocsSearch.tsx
function l({ id: l, query: u, onQueryChange: d, results: f, loading: p = !1, label: m, labelHidden: h, placeholder: g, clearable: _ = !0, clearLabel: v, resultsLabel: y, emptyLabel: b, loadingLabel: x, size: S, renderLink: C = n, onSelect: w, className: T }) {
	let E = e("docsSearch"), D = i(), O = l ?? D, k = u.trim() !== "" && f.length === 0 ? p ? E("loading", x) : E("empty", b) : null;
	return /* @__PURE__ */ o(c.Root, {
		inline: !0,
		open: !0,
		items: f,
		filter: null,
		value: u,
		onValueChange: d,
		children: /* @__PURE__ */ s("div", {
			className: ["docs-search", T].filter(Boolean).join(" "),
			children: [
				/* @__PURE__ */ o(c.Input, {
					id: O,
					render: /* @__PURE__ */ o(r, {
						id: O,
						label: E("label", m),
						labelHidden: h,
						kind: "search",
						clearable: _,
						...v === void 0 ? {} : { clearLabel: v },
						placeholder: E("placeholder", g),
						...S ? { size: S } : {}
					})
				}),
				/* @__PURE__ */ o(c.List, {
					className: "docs-search__results",
					"aria-label": E("results", y),
					children: (e) => /* @__PURE__ */ o(c.Item, {
						value: e,
						className: "docs-search__result",
						onClick: () => w?.(e),
						render: (t) => C({
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
				k && /* @__PURE__ */ s("p", {
					className: "docs-search__status",
					role: "status",
					children: [p && /* @__PURE__ */ o(t, {
						size: "sm",
						"aria-hidden": !0
					}), k]
				})
			]
		})
	});
}
//#endregion
export { l as DocsSearch };
