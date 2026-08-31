'use client';
import './pagination.css';
import { Icon as e } from "./icon.js";
import { Select as t } from "./select.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/Pagination/Pagination.tsx
var i = [
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
		label: "Todos",
		value: "all"
	}
];
function a(e, t) {
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
function o({ mode: o = "pages", total: s = 0, pageCount: c, page: l = 1, pageSize: u = 10, hrefs: d, previousHref: f, nextHref: p, onPrevious: m, onNext: h, onPageChange: g, hrefBuilder: _, linkComponent: v, onPageSizeChange: y, pageSizeOptions: b = i, showTotal: x = !1, size: S = "md", ariaLabel: C = "Paginación", pageLabel: w = (e) => `Página ${e}`, previousLabel: T = "Página anterior", nextLabel: E = "Página siguiente", pagesGroupLabel: D = "Páginas", pageSizeLabel: O = "Registros por página", totalLabel: k = (e) => `${e} resultados`, className: A }) {
	let j = _ ?? (d ? (e) => d[e] : void 0), M = v ?? "a";
	if (o === "cursor") {
		let t = S === "sm" ? "xs" : S === "lg" ? "md" : "sm", i = (r) => {
			let i = r === "prev" ? f : p, a = r === "prev" ? m : h, o = !i && !a, s = r === "prev" ? T : E, c = /* @__PURE__ */ n(e, {
				name: "chevron",
				size: t,
				className: r === "prev" ? "pagination__chevron--prev" : void 0
			});
			return i ? /* @__PURE__ */ n(M, {
				href: i,
				className: "pagination__btn pagination__btn--nav",
				"aria-label": s,
				children: c
			}) : /* @__PURE__ */ n("button", {
				type: "button",
				className: "pagination__btn pagination__btn--nav",
				disabled: o,
				"aria-label": s,
				onClick: a,
				children: c
			});
		};
		return /* @__PURE__ */ n("nav", {
			className: [
				"pagination",
				`pagination--${S}`,
				A
			].filter(Boolean).join(" "),
			"aria-label": C,
			children: /* @__PURE__ */ r("div", {
				className: "pagination__controls",
				role: "group",
				"aria-label": D,
				children: [i("prev"), i("next")]
			})
		});
	}
	if (c === void 0 && s === 0) return null;
	let N = c ?? (u === "all" ? 1 : Math.ceil(s / u)), P = N > 1 ? a(l, N) : [];
	function F(e, t) {
		if (e === "...") return /* @__PURE__ */ n("span", {
			className: "pagination__ellipsis",
			"aria-hidden": "true",
			children: "…"
		}, `ellipsis-${t}`);
		let r = e === l, i = ["pagination__btn", r ? "pagination__btn--current" : ""].filter(Boolean).join(" ");
		return j && !r ? /* @__PURE__ */ n(M, {
			href: j(e),
			className: i,
			"aria-label": w(e),
			onClick: g ? (t) => {
				t.preventDefault(), g(e);
			} : void 0,
			children: e
		}, e) : /* @__PURE__ */ n("button", {
			type: "button",
			className: i,
			"aria-current": r ? "page" : void 0,
			"aria-label": w(e),
			onClick: r ? void 0 : () => g?.(e),
			children: e
		}, e);
	}
	function I(t, r, i) {
		let a = r === "prev" ? T : E, o = /* @__PURE__ */ n(e, {
			name: "chevron",
			size: S === "sm" ? "xs" : S === "lg" ? "md" : "sm",
			className: r === "prev" ? "pagination__chevron--prev" : void 0
		});
		return j && !i ? /* @__PURE__ */ n(M, {
			href: j(t),
			className: "pagination__btn pagination__btn--nav",
			"aria-label": a,
			onClick: g ? (e) => {
				e.preventDefault(), g(t);
			} : void 0,
			children: o
		}) : /* @__PURE__ */ n("button", {
			type: "button",
			className: "pagination__btn pagination__btn--nav",
			disabled: i,
			"aria-label": a,
			onClick: () => g?.(t),
			children: o
		});
	}
	let L = x || !!y;
	return /* @__PURE__ */ r("nav", {
		className: [
			"pagination",
			`pagination--${S}`,
			A
		].filter(Boolean).join(" "),
		"aria-label": C,
		children: [L && /* @__PURE__ */ r("div", {
			className: "pagination__meta",
			children: [x && /* @__PURE__ */ n("span", {
				className: "pagination__summary",
				children: k(s)
			}), y && /* @__PURE__ */ n("div", {
				className: "pagination__size-selector",
				children: /* @__PURE__ */ n(t, {
					options: b,
					value: u === "all" ? "all" : String(u),
					onValueChange: y,
					"aria-label": O,
					size: S
				})
			})]
		}), N > 1 && /* @__PURE__ */ r("div", {
			className: "pagination__controls",
			role: "group",
			"aria-label": D,
			children: [
				I(l - 1, "prev", l <= 1),
				P.map((e, t) => F(e, t)),
				I(l + 1, "next", l >= N)
			]
		})]
	});
}
//#endregion
export { o as Pagination };
