import '../pagination.css';
import { n as e } from "./env.js";
import { r as t } from "./brandmessagescontext.js";
import { Icon as n } from "../icon.js";
import { t as r } from "./select.js";
import { n as i, t as a } from "./default-render-link.js";
import { Fragment as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/messages/es/pagination.ts
var l = {
	label: "Paginación",
	pagesGroup: "Páginas",
	previous: "Página anterior",
	next: "Página siguiente",
	goToPage: (e) => `Página ${e}`,
	perPage: "Registros por página",
	total: (e) => `${e} resultados`,
	allOption: "Todos"
};
//#endregion
//#region src/stories/molecules/Pagination/Pagination.tsx
function u(e) {
	return [
		{
			label: "10",
			value: "10"
		},
		{
			label: "20",
			value: "20"
		},
		{
			label: "50",
			value: "50"
		},
		{
			label: "100",
			value: "100"
		},
		{
			label: e,
			value: "all"
		}
	];
}
function d(e, t) {
	return t <= 3 ? Array.from({ length: t }, (e, t) => t + 1) : e <= 3 ? [
		1,
		2,
		3,
		"..."
	] : e >= t - 2 ? [
		"...",
		t - 2,
		t - 1,
		t
	] : [
		"...",
		e - 1,
		e,
		e + 1,
		"..."
	];
}
function f({ mode: f = "pages", total: p, pageCount: m, page: h = 1, pageSize: g = 10, hrefs: _, previousHref: v, nextHref: y, onPrevious: b, onNext: x, onPageChange: S, hrefBuilder: C, renderLink: w, linkComponent: T, onPageSizeChange: E, pageSizeOptions: D, afterPageSize: O, showTotal: k = !1, size: A = "md", "aria-label": j, ariaLabel: M, pageLabel: N, previousLabel: P, nextLabel: F, pagesGroupLabel: I, pageSizeLabel: L, totalLabel: R, className: z }) {
	M !== void 0 && e("Pagination", "ariaLabel", "`aria-label`");
	let B = j ?? M, V = t("pagination", l), H = C ?? (_ ? (e) => _[e] : void 0);
	T !== void 0 && e("Pagination", "linkComponent", "`renderLink`");
	let U = w ?? (T ? i(T) : a);
	if (f === "cursor") {
		let e = A === "lg" ? "md" : "sm", t = (t) => {
			let r = t === "prev" ? v : y, i = t === "prev" ? b : x, a = !r && !i, o = t === "prev" ? V("previous", P) : V("next", F), c = /* @__PURE__ */ s(n, {
				name: "chevron",
				size: e,
				className: t === "prev" ? "pagination__chevron--prev" : void 0
			});
			return r ? U({
				href: r,
				className: "pagination__btn pagination__btn--nav",
				"aria-label": o,
				children: c
			}) : /* @__PURE__ */ s("button", {
				type: "button",
				className: "pagination__btn pagination__btn--nav",
				disabled: a,
				"aria-label": o,
				onClick: i,
				children: c
			});
		};
		return /* @__PURE__ */ s("nav", {
			className: [
				"pagination",
				`pagination--${A}`,
				z
			].filter(Boolean).join(" "),
			"aria-label": V("label", B),
			children: /* @__PURE__ */ c("div", {
				className: "pagination__controls",
				role: "group",
				"aria-label": V("pagesGroup", I),
				children: [t("prev"), t("next")]
			})
		});
	}
	if (p === 0 || m === 0 || p === void 0 && (m ?? 1) <= 1 && !O) return null;
	let W = p ?? 0, G = m ?? (g === "all" ? 1 : Math.ceil(W / g)), K = G > 1 ? d(h, G) : [];
	function q(e, t) {
		if (e === "...") return /* @__PURE__ */ s("span", {
			className: "pagination__ellipsis",
			"aria-hidden": "true",
			children: "…"
		}, `ellipsis-${t}`);
		let n = e === h, r = ["pagination__btn", n ? "pagination__btn--current" : ""].filter(Boolean).join(" ");
		return H && !n ? /* @__PURE__ */ s(o, { children: U({
			href: H(e),
			className: r,
			"aria-label": V("goToPage", N)(e),
			onClick: S ? (t) => {
				t.preventDefault(), S(e);
			} : void 0,
			children: e
		}) }, e) : /* @__PURE__ */ s("button", {
			type: "button",
			className: r,
			"aria-current": n ? "page" : void 0,
			"aria-label": V("goToPage", N)(e),
			onClick: n ? void 0 : () => S?.(e),
			children: e
		}, e);
	}
	function J(e, t, r) {
		let i = t === "prev" ? V("previous", P) : V("next", F), a = /* @__PURE__ */ s(n, {
			name: "chevron",
			size: A === "lg" ? "md" : "sm",
			className: t === "prev" ? "pagination__chevron--prev" : void 0
		});
		return H && !r ? U({
			href: H(e),
			className: "pagination__btn pagination__btn--nav",
			"aria-label": i,
			onClick: S ? (t) => {
				t.preventDefault(), S(e);
			} : void 0,
			children: a
		}) : /* @__PURE__ */ s("button", {
			type: "button",
			className: "pagination__btn pagination__btn--nav",
			disabled: r,
			"aria-label": i,
			onClick: () => S?.(e),
			children: a
		});
	}
	let Y = k || !!E || !!O;
	return /* @__PURE__ */ c("nav", {
		className: [
			"pagination",
			`pagination--${A}`,
			z
		].filter(Boolean).join(" "),
		"aria-label": V("label", B),
		children: [Y && /* @__PURE__ */ c("div", {
			className: "pagination__meta",
			children: [
				k && /* @__PURE__ */ s("span", {
					className: "pagination__summary",
					children: V("total", R)(W)
				}),
				E && /* @__PURE__ */ s("div", {
					className: "pagination__size-selector",
					children: /* @__PURE__ */ s(r, {
						options: D ?? u(V("allOption")),
						value: g === "all" ? "all" : String(g),
						onValueChange: E,
						"aria-label": V("perPage", L),
						size: A
					})
				}),
				O && /* @__PURE__ */ s("div", {
					className: "pagination__after-page-size",
					children: O
				})
			]
		}), G > 1 && /* @__PURE__ */ c("div", {
			className: "pagination__controls",
			role: "group",
			"aria-label": V("pagesGroup", I),
			children: [
				J(h - 1, "prev", h <= 1),
				K.map((e, t) => q(e, t)),
				J(h + 1, "next", h >= G)
			]
		})]
	});
}
//#endregion
export { f as t };
