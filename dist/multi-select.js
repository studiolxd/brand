'use client';
import './multi-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { forwardRef as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { Popover as u } from "@base-ui/react/popover";
//#region src/stories/atoms/MultiSelect/MultiSelect.tsx
function d(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var f = 500, p = r(function({ options: r, value: p, defaultValue: m = [], placeholder: h, disabled: g, readOnly: _, size: v = "md", onValueChange: y, id: b, name: x, error: S = !1, onBlur: C, className: w, "aria-label": T, "aria-labelledby": E, "aria-describedby": D, removeLabel: O, container: k }, A) {
	let j = e("multiSelect"), M = n(k), [N, P] = s(!1), [F, I] = s(m), [L, R] = s(-1), z = o(null), B = o(null), V = a(), H = a(), U = o(""), W = o(0), G = p === void 0 ? F : p, K = (e) => `${H}-opt-${e}`;
	function q(e) {
		let t = G.includes(e) ? G.filter((t) => t !== e) : [...G, e];
		p === void 0 && I(t), y?.(t);
	}
	function J(e) {
		g || _ || (P(!0), R(r.length === 0 ? -1 : e));
	}
	function Y() {
		P(!1), R(-1), U.current = "";
	}
	function X(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && z.current?.contains(e)) return;
			}
			Y();
		}
	}
	function Z(e) {
		if (r.length === 0) return;
		let t = Date.now(), n = t - W.current > f ? e : U.current + e;
		U.current = n, W.current = t;
		let i = n.length === 1 ? L + 1 : Math.max(L, 0), a = n.toLowerCase();
		for (let e = 0; e < r.length; e++) {
			let t = (i + e) % r.length;
			if (r[t].label.toLowerCase().startsWith(a)) {
				R(t), N || P(!0);
				return;
			}
		}
	}
	function Q(e) {
		if (g || _) return;
		let t = r.length - 1;
		if (e.key === "ArrowDown") e.preventDefault(), N ? R((e) => Math.min(e + 1, t)) : J(0);
		else if (e.key === "ArrowUp") e.preventDefault(), N ? R((e) => Math.max(e - 1, 0)) : J(t);
		else if (e.key === "Home") e.preventDefault(), N ? R(r.length === 0 ? -1 : 0) : J(0);
		else if (e.key === "End") e.preventDefault(), N ? R(t) : J(t);
		else if (e.key === "Enter" || e.key === " ") e.preventDefault(), N ? L >= 0 && L < r.length && q(r[L].value) : J(0);
		else if (e.key === "Escape") {
			if (!N) return;
			e.preventDefault(), Y();
		} else e.key === "Tab" ? N && Y() : e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), Z(e.key));
	}
	function $(e) {
		g || _ || e.target instanceof Element && e.target.closest(".multi-select__pill-remove") || (e.preventDefault(), B.current?.focus(), N ? Y() : J(0));
	}
	i(() => {
		!N || L < 0 || document.getElementById(K(L))?.scrollIntoView({ block: "nearest" });
	}, [
		N,
		L,
		H
	]);
	let ee = [
		"multi-select",
		v === "md" ? "" : `multi-select--${v}`,
		g ? "multi-select--disabled" : "",
		S ? "multi-select--error" : "",
		w ?? ""
	].filter(Boolean).join(" "), te = ["multi-select__content", v === "md" ? "" : `multi-select__content--${v}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(u.Root, {
		open: N,
		onOpenChange: X,
		children: [/* @__PURE__ */ l("div", {
			ref: z,
			className: ee,
			"data-popup-open": N || void 0,
			onPointerDown: $,
			children: [
				/* @__PURE__ */ l("div", {
					className: "multi-select__values",
					children: [G.map((e) => {
						let n = r.find((t) => t.value === e);
						return n ? /* @__PURE__ */ l("span", {
							className: "multi-select__pill",
							children: [/* @__PURE__ */ c("span", {
								className: "multi-select__pill-label",
								children: n.label
							}), !g && !_ && /* @__PURE__ */ c("button", {
								type: "button",
								className: "multi-select__pill-remove",
								"aria-label": j("remove", O)(n.label),
								tabIndex: -1,
								onClick: (t) => {
									t.stopPropagation(), q(e), B.current?.focus();
								},
								children: /* @__PURE__ */ c(t, {
									name: "close",
									size: "xs"
								})
							})]
						}, e) : null;
					}), /* @__PURE__ */ c("div", {
						ref: (e) => {
							B.current = e, d(A, e);
						},
						className: "multi-select__combobox",
						tabIndex: g ? -1 : 0,
						role: "combobox",
						"aria-expanded": N,
						"aria-haspopup": "listbox",
						"aria-controls": N ? V : void 0,
						"aria-activedescendant": N && L >= 0 ? K(L) : void 0,
						"aria-label": E ? void 0 : T ?? j("placeholder", h),
						"aria-labelledby": E,
						"aria-describedby": D,
						"aria-invalid": S || void 0,
						"aria-disabled": g || void 0,
						"aria-readonly": _ || void 0,
						id: b,
						onKeyDown: Q,
						onBlur: C,
						children: G.length === 0 && /* @__PURE__ */ c("span", {
							className: "multi-select__placeholder",
							children: j("placeholder", h)
						})
					})]
				}),
				/* @__PURE__ */ c(t, {
					name: "chevron",
					className: "multi-select__icon"
				}),
				x && G.map((e) => /* @__PURE__ */ c("input", {
					type: "hidden",
					name: x,
					value: e
				}, e))
			]
		}), /* @__PURE__ */ c(u.Portal, {
			container: M,
			children: /* @__PURE__ */ c(u.Positioner, {
				className: "multi-select__positioner",
				anchor: z,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ c(u.Popup, {
					className: te,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ c("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": T ?? h,
						id: V,
						children: r.map((e, t) => {
							let n = G.includes(e.value), r = L === t;
							return /* @__PURE__ */ l("div", {
								id: K(t),
								role: "option",
								"aria-selected": n,
								"aria-label": e["aria-label"] ?? e.label,
								className: [
									"multi-select__item",
									n ? "multi-select__item--selected" : "",
									r ? "multi-select__item--active" : ""
								].filter(Boolean).join(" "),
								onPointerDown: (e) => {
									e.preventDefault(), e.stopPropagation();
								},
								onClick: () => {
									q(e.value), R(t), B.current?.focus();
								},
								children: [/* @__PURE__ */ c("span", {
									className: "multi-select__item-check",
									"aria-hidden": "true",
									children: /* @__PURE__ */ c("span", { className: "multi-select__item-check-mark" })
								}), /* @__PURE__ */ c("span", { children: e.label })]
							}, e.value);
						})
					})
				})
			})
		})]
	});
});
//#endregion
export { p as MultiSelect };
