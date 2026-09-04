'use client';
import './multi-select.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
import { Popover as c } from "@base-ui/react/popover";
//#region src/stories/atoms/MultiSelect/MultiSelect.tsx
function l(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var u = 500, d = r(function({ options: r, value: d, defaultValue: f = [], placeholder: p = "Seleccionar…", disabled: m, readOnly: h, size: g = "md", onValueChange: _, id: v, name: y, error: b = !1, onBlur: x, className: S, "aria-label": C, "aria-labelledby": w, "aria-describedby": T, removeLabel: E = (e) => `Quitar ${e}`, container: D }, O) {
	let [k, A] = s(!1), [j, M] = s(f), [N, P] = s(-1), F = o(null), I = o(null), L = a(), R = a(), z = o(""), B = o(0), V = d === void 0 ? j : d, H = (e) => `${R}-opt-${e}`;
	function U(e) {
		let t = V.includes(e) ? V.filter((t) => t !== e) : [...V, e];
		d === void 0 && M(t), _?.(t);
	}
	function W(e) {
		m || h || (A(!0), P(r.length === 0 ? -1 : e));
	}
	function G() {
		A(!1), P(-1), z.current = "";
	}
	function K(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && F.current?.contains(e)) return;
			}
			G();
		}
	}
	function q(e) {
		if (r.length === 0) return;
		let t = Date.now(), n = t - B.current > u ? e : z.current + e;
		z.current = n, B.current = t;
		let i = n.length === 1 ? N + 1 : Math.max(N, 0), a = n.toLowerCase();
		for (let e = 0; e < r.length; e++) {
			let t = (i + e) % r.length;
			if (r[t].label.toLowerCase().startsWith(a)) {
				P(t), k || A(!0);
				return;
			}
		}
	}
	function J(e) {
		if (m || h) return;
		let t = r.length - 1;
		if (e.key === "ArrowDown") e.preventDefault(), k ? P((e) => Math.min(e + 1, t)) : W(0);
		else if (e.key === "ArrowUp") e.preventDefault(), k ? P((e) => Math.max(e - 1, 0)) : W(t);
		else if (e.key === "Home") e.preventDefault(), k ? P(r.length === 0 ? -1 : 0) : W(0);
		else if (e.key === "End") e.preventDefault(), k ? P(t) : W(t);
		else if (e.key === "Enter" || e.key === " ") e.preventDefault(), k ? N >= 0 && N < r.length && U(r[N].value) : W(0);
		else if (e.key === "Escape") {
			if (!k) return;
			e.preventDefault(), G();
		} else e.key === "Tab" ? k && G() : e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), q(e.key));
	}
	function Y(e) {
		m || h || e.target instanceof Element && e.target.closest(".multi-select__pill-remove") || (e.preventDefault(), I.current?.focus(), k ? G() : W(0));
	}
	i(() => {
		!k || N < 0 || document.getElementById(H(N))?.scrollIntoView({ block: "nearest" });
	}, [
		k,
		N,
		R
	]);
	let X = [
		"multi-select",
		g === "md" ? "" : `multi-select--${g}`,
		m ? "multi-select--disabled" : "",
		b ? "multi-select--error" : "",
		S ?? ""
	].filter(Boolean).join(" "), Z = ["multi-select__content", g === "md" ? "" : `multi-select__content--${g}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(c.Root, {
		open: k,
		onOpenChange: K,
		children: [/* @__PURE__ */ n("div", {
			ref: F,
			className: X,
			"data-popup-open": k || void 0,
			onPointerDown: Y,
			children: [
				/* @__PURE__ */ n("div", {
					className: "multi-select__values",
					children: [V.map((i) => {
						let a = r.find((e) => e.value === i);
						return a ? /* @__PURE__ */ n("span", {
							className: "multi-select__pill",
							children: [/* @__PURE__ */ t("span", {
								className: "multi-select__pill-label",
								children: a.label
							}), !m && !h && /* @__PURE__ */ t("button", {
								type: "button",
								className: "multi-select__pill-remove",
								"aria-label": E(a.label),
								tabIndex: -1,
								onClick: (e) => {
									e.stopPropagation(), U(i), I.current?.focus();
								},
								children: /* @__PURE__ */ t(e, {
									name: "close",
									size: "xs"
								})
							})]
						}, i) : null;
					}), /* @__PURE__ */ t("div", {
						ref: (e) => {
							I.current = e, l(O, e);
						},
						className: "multi-select__combobox",
						tabIndex: m ? -1 : 0,
						role: "combobox",
						"aria-expanded": k,
						"aria-haspopup": "listbox",
						"aria-controls": k ? L : void 0,
						"aria-activedescendant": k && N >= 0 ? H(N) : void 0,
						"aria-label": w ? void 0 : C ?? p,
						"aria-labelledby": w,
						"aria-describedby": T,
						"aria-invalid": b || void 0,
						"aria-disabled": m || void 0,
						"aria-readonly": h || void 0,
						id: v,
						onKeyDown: J,
						onBlur: x,
						children: V.length === 0 && /* @__PURE__ */ t("span", {
							className: "multi-select__placeholder",
							children: p
						})
					})]
				}),
				/* @__PURE__ */ t(e, {
					name: "chevron",
					className: "multi-select__icon",
					size: g === "sm" ? "xs" : g === "lg" ? "md" : "sm"
				}),
				y && V.map((e) => /* @__PURE__ */ t("input", {
					type: "hidden",
					name: y,
					value: e
				}, e))
			]
		}), /* @__PURE__ */ t(c.Portal, {
			container: D,
			children: /* @__PURE__ */ t(c.Positioner, {
				className: "multi-select__positioner",
				anchor: F,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ t(c.Popup, {
					className: Z,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ t("div", {
						role: "listbox",
						"aria-multiselectable": "true",
						"aria-label": C ?? p,
						id: L,
						children: r.map((e, r) => {
							let i = V.includes(e.value), a = N === r;
							return /* @__PURE__ */ n("div", {
								id: H(r),
								role: "option",
								"aria-selected": i,
								"aria-label": e["aria-label"] ?? e.label,
								className: [
									"multi-select__item",
									i ? "multi-select__item--selected" : "",
									a ? "multi-select__item--active" : ""
								].filter(Boolean).join(" "),
								onPointerDown: (e) => {
									e.preventDefault(), e.stopPropagation();
								},
								onClick: () => {
									U(e.value), P(r), I.current?.focus();
								},
								children: [/* @__PURE__ */ t("span", {
									className: "multi-select__item-check",
									"aria-hidden": "true",
									children: /* @__PURE__ */ t("span", { className: "multi-select__item-check-mark" })
								}), /* @__PURE__ */ t("span", { children: e.label })]
							}, e.value);
						})
					})
				})
			})
		})]
	});
});
//#endregion
export { d as MultiSelect };
