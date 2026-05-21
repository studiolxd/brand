'use client';
import './async-multi-select.css';
"use client";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useCallback as n, useId as r, useRef as i, useState as a } from "react";
import * as o from "@radix-ui/react-popover";
import { DismissableLayerBranch as s } from "@radix-ui/react-dismissable-layer";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function c({ onSearch: c, value: l, defaultValue: u = [], onValueChange: d, selectedOptions: f = [], placeholder: p = "Buscar…", disabled: m, readOnly: h, dark: g, size: _ = "md", id: v, "aria-label": y, "aria-describedby": b }) {
	let [x, S] = a(!1), [C, w] = a(""), [T, E] = a(!1), [D, O] = a([]), [k, A] = a(!1), [j, M] = a(u), N = i(null), P = i(null), F = i(null), I = r(), L = l === void 0 ? j : l, R = n(async (e) => {
		E(!0), A(!1);
		try {
			O(await c(e));
		} catch {
			O([]);
		} finally {
			E(!1), A(!0);
		}
	}, [c]);
	function z(e) {
		let t = e.target.value;
		w(t), N.current && clearTimeout(N.current), N.current = setTimeout(() => void R(t), 300);
	}
	function B() {
		m || h || (w(""), O([]), A(!1), S(!0), R(""));
	}
	function V() {
		requestAnimationFrame(() => {
			let e = document.activeElement, t = P.current === e, n = document.getElementById(I)?.contains(e);
			!t && !n && S(!1);
		});
	}
	function H(e) {
		let t = L.includes(e) ? L.filter((t) => t !== e) : [...L, e];
		l === void 0 && M(t), d?.(t);
	}
	function U(e) {
		if (e.key === "Escape") S(!1), w("");
		else if (e.key === "ArrowDown" && x) e.preventDefault(), (document.getElementById(I)?.querySelector("[role=\"option\"]"))?.focus();
		else if (e.key === "Backspace" && C === "" && L.length > 0) {
			let e = L[L.length - 1];
			H(e);
		}
	}
	let W = [
		"async-multi-select",
		_ === "md" ? "" : `async-multi-select--${_}`,
		m ? "async-multi-select--disabled" : "",
		x ? "async-multi-select--open" : ""
	].filter(Boolean).join(" "), G = [
		"async-multi-select__content",
		_ === "md" ? "" : `async-multi-select__content--${_}`,
		g ? "async-multi-select__content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(o.Root, {
		open: x,
		modal: !1,
		onOpenChange: (e) => {
			e || S(!1);
		},
		children: [/* @__PURE__ */ e(o.Anchor, {
			asChild: !0,
			children: /* @__PURE__ */ t("div", {
				ref: F,
				className: W,
				"data-state": x ? "open" : "closed",
				children: [/* @__PURE__ */ t("div", {
					className: "async-multi-select__input-area",
					children: [f.map((n) => /* @__PURE__ */ t("span", {
						className: "async-multi-select__pill",
						children: [/* @__PURE__ */ e("span", {
							className: "async-multi-select__pill-label",
							children: n.label
						}), !m && !h && /* @__PURE__ */ e("button", {
							type: "button",
							className: "async-multi-select__pill-remove",
							"aria-label": `Quitar ${n.label}`,
							tabIndex: -1,
							onMouseDown: (e) => {
								e.preventDefault(), H(n.value);
							},
							children: "×"
						})]
					}, n.value)), /* @__PURE__ */ e("input", {
						ref: P,
						id: v,
						type: "text",
						className: "async-multi-select__input",
						value: C,
						onChange: z,
						onFocus: B,
						onBlur: V,
						onKeyDown: U,
						placeholder: L.length === 0 ? p : void 0,
						disabled: m,
						readOnly: h,
						"aria-label": y ?? p,
						"aria-describedby": b,
						"aria-expanded": x,
						"aria-haspopup": "listbox",
						"aria-controls": I,
						autoComplete: "off",
						role: "combobox"
					})]
				}), T && /* @__PURE__ */ e("span", {
					className: "async-multi-select__spinner",
					"aria-hidden": "true"
				})]
			})
		}), /* @__PURE__ */ e(o.Portal, { children: /* @__PURE__ */ e(s, { children: /* @__PURE__ */ e(o.Content, {
			className: G,
			align: "start",
			sideOffset: -1,
			onOpenAutoFocus: (e) => e.preventDefault(),
			onInteractOutside: (e) => {
				F.current?.contains(e.target) || S(!1);
			},
			children: /* @__PURE__ */ t("div", {
				role: "listbox",
				"aria-multiselectable": "true",
				"aria-label": y ?? p,
				id: I,
				onKeyDown: (e) => {
					let t = Array.from(e.currentTarget.querySelectorAll("[role=\"option\"]")), n = t.indexOf(document.activeElement);
					e.key === "ArrowDown" ? (e.preventDefault(), t[Math.min(n + 1, t.length - 1)]?.focus()) : e.key === "ArrowUp" ? (e.preventDefault(), n <= 0 ? P.current?.focus() : t[n - 1]?.focus()) : e.key === "Escape" && (S(!1), P.current?.focus());
				},
				children: [
					T && /* @__PURE__ */ e("div", {
						className: "async-multi-select__loading",
						role: "status",
						"aria-label": "Buscando…",
						children: /* @__PURE__ */ e("span", {
							className: "async-multi-select__spinner",
							"aria-hidden": "true"
						})
					}),
					!T && k && D.length === 0 && /* @__PURE__ */ e("div", {
						className: "async-multi-select__empty",
						children: "Sin resultados"
					}),
					!T && D.map((n, r) => {
						let i = L.includes(n.value);
						return /* @__PURE__ */ t("button", {
							type: "button",
							role: "option",
							"aria-selected": i,
							className: ["async-multi-select__item", i ? "async-multi-select__item--selected" : ""].filter(Boolean).join(" "),
							tabIndex: r === 0 ? 0 : -1,
							onMouseDown: (e) => e.preventDefault(),
							onClick: () => {
								H(n.value), P.current?.focus();
							},
							children: [/* @__PURE__ */ e("span", {
								className: "async-multi-select__item-check",
								"aria-hidden": "true",
								children: /* @__PURE__ */ e("span", { className: "async-multi-select__item-check-mark" })
							}), /* @__PURE__ */ e("span", { children: n.label })]
						}, n.value);
					})
				]
			})
		}) }) })]
	});
}
//#endregion
export { c as AsyncMultiSelect };
