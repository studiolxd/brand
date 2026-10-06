'use client';
import './site-search.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Spinner as t } from "./spinner.js";
import { Button as n } from "./button.js";
import { Skeleton as r } from "./skeleton.js";
import { Alert as i } from "./alert.js";
import { t as a } from "./_shared/default-render-link.js";
import { EmptyState as o } from "./empty-state.js";
import { SearchForm as s } from "./search-form.js";
import { forwardRef as c, useId as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/organisms/SiteSearch/SiteSearch.tsx
var f = c(function({ query: c, onQueryChange: f, onSubmit: p, action: m, name: h = "q", status: g = "idle", results: _ = [], total: v, minLength: y = 2, suggestions: b, onSuggestionSelect: x, onRetry: S, toolbar: C, footer: w, headingLevel: T = 2, size: E, loadingRows: D = 3, onSelect: O, renderLink: k = a, label: A, labelHidden: j = !0, placeholder: M, submitLabel: N, resultsLabel: P, className: F, id: I, ...L }, R) {
	let z = e("siteSearch"), B = l(), V = I ?? B, H = `${V}-input`, U = `${V}-status`, W = `${V}-results`, G = `h${T}`, K = c.trim(), q = v ?? _.length, J = g === "ready" && _.length > 0, Y = g === "idle" ? z("idle") : g === "typing" ? K.length < y ? z("minLength")(y) : z("pending") : g === "loading" ? z("loading") : g === "error" ? null : z("results")(q, K);
	return /* @__PURE__ */ d("div", {
		className: ["site-search", F].filter(Boolean).join(" "),
		...L,
		children: [
			/* @__PURE__ */ u(s, {
				ref: R,
				className: "site-search__form",
				id: H,
				name: h,
				label: z("label", A),
				labelHidden: j,
				placeholder: z("placeholder", M),
				submitLabel: z("submit", N),
				value: c,
				onChange: (e) => f(e.target.value),
				...p ? { onSubmit: p } : {},
				action: m,
				describedBy: U,
				...J ? { controls: W } : {},
				...E ? { size: E } : {}
			}),
			C ? /* @__PURE__ */ u("div", {
				className: "site-search__toolbar",
				children: C
			}) : null,
			/* @__PURE__ */ d("p", {
				className: "site-search__status",
				id: U,
				role: "status",
				"aria-live": "polite",
				children: [g === "loading" ? /* @__PURE__ */ u(t, {
					size: "sm",
					"aria-hidden": !0
				}) : null, /* @__PURE__ */ u("span", {
					className: "site-search__status-text",
					children: Y
				})]
			}),
			g === "idle" && b && b.length > 0 && x ? /* @__PURE__ */ d("div", {
				className: "site-search__suggestions",
				children: [/* @__PURE__ */ u("span", {
					className: "site-search__suggestions-label",
					id: `${V}-suggestions`,
					children: z("suggestionsLabel")
				}), /* @__PURE__ */ u("ul", {
					className: "site-search__suggestions-list",
					"aria-labelledby": `${V}-suggestions`,
					children: b.map((e) => /* @__PURE__ */ u("li", { children: /* @__PURE__ */ u(n, {
						variant: "outline",
						size: "sm",
						onClick: () => x(e),
						children: e
					}) }, e))
				})]
			}) : null,
			g === "loading" ? /* @__PURE__ */ u("div", {
				className: "site-search__loading",
				"aria-hidden": !0,
				children: Array.from({ length: D }, (e, t) => /* @__PURE__ */ d("div", {
					className: "site-search__ghost",
					children: [
						/* @__PURE__ */ u(r, { className: "site-search__ghost-section" }),
						/* @__PURE__ */ u(r, { className: "site-search__ghost-title" }),
						/* @__PURE__ */ u(r, {}),
						/* @__PURE__ */ u(r, { className: "site-search__ghost-url" })
					]
				}, t))
			}) : null,
			J ? /* @__PURE__ */ u("ol", {
				className: "site-search__results",
				id: W,
				"aria-label": z("resultsLabel", P),
				children: _.map((e) => /* @__PURE__ */ d("li", {
					className: "site-search__result",
					children: [
						e.section ? /* @__PURE__ */ u("p", {
							className: "site-search__result-section",
							children: e.section
						}) : null,
						/* @__PURE__ */ u(G, {
							className: "site-search__result-title",
							children: k({
								href: e.href,
								className: "site-search__result-link",
								children: e.title,
								onClick: () => O?.(e)
							})
						}),
						e.excerpt ? /* @__PURE__ */ u("p", {
							className: "site-search__result-excerpt",
							children: e.excerpt
						}) : null,
						e.displayUrl ? /* @__PURE__ */ u("p", {
							className: "site-search__result-url",
							children: e.displayUrl
						}) : null
					]
				}, e.href))
			}) : null,
			g === "ready" && _.length === 0 ? /* @__PURE__ */ u(o, {
				className: "site-search__empty",
				title: z("emptyTitle"),
				description: z("emptyDescription")
			}) : null,
			g === "error" ? /* @__PURE__ */ u(i, {
				className: "site-search__error",
				variant: "error",
				title: z("errorTitle"),
				description: z("errorDescription"),
				actions: S ? /* @__PURE__ */ u(n, {
					variant: "outline",
					onClick: S,
					children: z("retry")
				}) : void 0
			}) : null,
			w && J ? /* @__PURE__ */ u("div", {
				className: "site-search__footer",
				children: w
			}) : null
		]
	});
});
//#endregion
export { f as SiteSearch };
