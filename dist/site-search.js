'use client';
import './site-search.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Spinner as t } from "./spinner.js";
import { Button as n } from "./button.js";
import { Skeleton as r } from "./skeleton.js";
import { t as i } from "./_shared/alert.js";
import { t as a } from "./_shared/default-render-link.js";
import { EmptyState as o } from "./empty-state.js";
import { t as s } from "./_shared/searchform.js";
import { forwardRef as c, useId as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/messages/es/siteSearch.ts
var f = {
	label: "Buscar en el sitio",
	placeholder: "¿Qué estás buscando?",
	submit: "Buscar",
	idle: "Escribe para buscar en todo el sitio",
	minLength: (e) => `Escribe al menos ${e} caracteres`,
	pending: "Pulsa Intro para buscar",
	loading: "Buscando…",
	results: (e, t) => e === 1 ? `1 resultado para «${t}»` : `${e} resultados para «${t}»`,
	resultsLabel: "Resultados de la búsqueda",
	emptyTitle: "Sin resultados",
	emptyDescription: "Revisa la ortografía o prueba con menos palabras.",
	suggestionsLabel: "Búsquedas frecuentes",
	errorTitle: "No se ha podido buscar",
	errorDescription: "El buscador no ha respondido. Vuelve a intentarlo en unos segundos.",
	retry: "Reintentar"
}, p = c(function({ query: c, onQueryChange: p, onSubmit: m, action: h, name: g = "q", status: _ = "idle", results: v = [], total: y, minLength: b = 2, suggestions: x, onSuggestionSelect: S, onRetry: C, toolbar: w, footer: T, headingLevel: E = 2, size: D, loadingRows: O = 3, onSelect: k, renderLink: A = a, label: j, labelHidden: M = !0, placeholder: N, submitLabel: P, resultsLabel: F, className: I, id: L, ...R }, z) {
	let B = e("siteSearch", f), V = l(), H = L ?? V, U = `${H}-input`, W = `${H}-status`, G = `${H}-results`, K = `h${E}`, q = c.trim(), J = y ?? v.length, Y = _ === "ready" && v.length > 0, X = _ === "idle" ? B("idle") : _ === "typing" ? q.length < b ? B("minLength")(b) : B("pending") : _ === "loading" ? B("loading") : _ === "error" ? null : B("results")(J, q);
	return /* @__PURE__ */ d("div", {
		className: ["site-search", I].filter(Boolean).join(" "),
		...R,
		children: [
			/* @__PURE__ */ u(s, {
				ref: z,
				className: "site-search__form",
				id: U,
				name: g,
				label: B("label", j),
				labelHidden: M,
				placeholder: B("placeholder", N),
				submitLabel: B("submit", P),
				value: c,
				onChange: (e) => p(e.target.value),
				...m ? { onSubmit: m } : {},
				action: h,
				describedBy: W,
				...Y ? { controls: G } : {},
				...D ? { size: D } : {}
			}),
			w ? /* @__PURE__ */ u("div", {
				className: "site-search__toolbar",
				children: w
			}) : null,
			/* @__PURE__ */ d("p", {
				className: "site-search__status",
				id: W,
				role: "status",
				"aria-live": "polite",
				children: [_ === "loading" ? /* @__PURE__ */ u(t, {
					size: "sm",
					"aria-hidden": !0
				}) : null, /* @__PURE__ */ u("span", {
					className: "site-search__status-text",
					children: X
				})]
			}),
			_ === "idle" && x && x.length > 0 && S ? /* @__PURE__ */ d("div", {
				className: "site-search__suggestions",
				children: [/* @__PURE__ */ u("span", {
					className: "site-search__suggestions-label",
					id: `${H}-suggestions`,
					children: B("suggestionsLabel")
				}), /* @__PURE__ */ u("ul", {
					className: "site-search__suggestions-list",
					"aria-labelledby": `${H}-suggestions`,
					children: x.map((e) => /* @__PURE__ */ u("li", { children: /* @__PURE__ */ u(n, {
						variant: "outline",
						size: "sm",
						onClick: () => S(e),
						children: e
					}) }, e))
				})]
			}) : null,
			_ === "loading" ? /* @__PURE__ */ u("div", {
				className: "site-search__loading",
				"aria-hidden": !0,
				children: Array.from({ length: O }, (e, t) => /* @__PURE__ */ d("div", {
					className: "site-search__ghost",
					children: [
						/* @__PURE__ */ u(r, { className: "site-search__ghost-section" }),
						/* @__PURE__ */ u(r, { className: "site-search__ghost-title" }),
						/* @__PURE__ */ u(r, {}),
						/* @__PURE__ */ u(r, { className: "site-search__ghost-url" })
					]
				}, t))
			}) : null,
			Y ? /* @__PURE__ */ u("ol", {
				className: "site-search__results",
				id: G,
				"aria-label": B("resultsLabel", F),
				children: v.map((e) => /* @__PURE__ */ d("li", {
					className: "site-search__result",
					children: [
						e.section ? /* @__PURE__ */ u("p", {
							className: "site-search__result-section",
							children: e.section
						}) : null,
						/* @__PURE__ */ u(K, {
							className: "site-search__result-title",
							children: A({
								href: e.href,
								className: "site-search__result-link",
								children: e.title,
								onClick: () => k?.(e)
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
			_ === "ready" && v.length === 0 ? /* @__PURE__ */ u(o, {
				className: "site-search__empty",
				title: B("emptyTitle"),
				description: B("emptyDescription")
			}) : null,
			_ === "error" ? /* @__PURE__ */ u(i, {
				className: "site-search__error",
				tone: "error",
				title: B("errorTitle"),
				description: B("errorDescription"),
				actions: C ? /* @__PURE__ */ u(n, {
					variant: "outline",
					onClick: C,
					children: B("retry")
				}) : void 0
			}) : null,
			T && Y ? /* @__PURE__ */ u("div", {
				className: "site-search__footer",
				children: T
			}) : null
		]
	});
});
//#endregion
export { p as SiteSearch };
