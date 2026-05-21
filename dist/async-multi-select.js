'use client';
import './async-multi-select.css';
"use client";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useCallback as n, useId as r, useRef as i, useState as a } from "react";
import * as o from "@radix-ui/react-popover";
import { DismissableLayerBranch as s } from "@radix-ui/react-dismissable-layer";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function c({ onSearch: c, value: l, defaultValue: u = [], onValueChange: d, selectedOptions: f = [], placeholder: p = "Buscar…", disabled: m, readOnly: h, dark: g, size: _ = "md", id: v, "aria-label": y, "aria-describedby": b }) {
	let [x, S] = a(!1), [C, w] = a(""), [T, E] = a(!1), [D, O] = a([]), [k, A] = a(!1), [j, M] = a(u), N = i(null), P = i(null), F = r(), I = l === void 0 ? j : l, L = n(async (e) => {
		E(!0), A(!1);
		try {
			O(await c(e));
		} catch {
			O([]);
		} finally {
			E(!1), A(!0);
		}
	}, [c]);
	function R(e) {
		let t = e.target.value;
		w(t), N.current && clearTimeout(N.current), N.current = setTimeout(() => void L(t), 300);
	}
	function z() {
		m || h || (w(""), O([]), A(!1), S(!0), L(""));
	}
	function B() {
		requestAnimationFrame(() => {
			let e = document.activeElement, t = P.current === e, n = document.getElementById(F)?.contains(e);
			!t && !n && S(!1);
		});
	}
	function V(e) {
		let t = I.includes(e) ? I.filter((t) => t !== e) : [...I, e];
		l === void 0 && M(t), d?.(t);
	}
	function H(e) {
		if (e.key === "Escape") S(!1), w("");
		else if (e.key === "ArrowDown" && x) e.preventDefault(), (document.getElementById(F)?.querySelector("[role=\"option\"]"))?.focus();
		else if (e.key === "Backspace" && C === "" && I.length > 0) {
			let e = I[I.length - 1];
			V(e);
		}
	}
	let U = [
		"async-multi-select",
		_ === "md" ? "" : `async-multi-select--${_}`,
		m ? "async-multi-select--disabled" : "",
		x ? "async-multi-select--open" : ""
	].filter(Boolean).join(" "), W = [
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
				className: U,
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
								e.preventDefault(), V(n.value);
							},
							children: "×"
						})]
					}, n.value)), /* @__PURE__ */ e("input", {
						ref: P,
						id: v,
						type: "text",
						className: "async-multi-select__input",
						value: C,
						onChange: R,
						onFocus: z,
						onBlur: B,
						onKeyDown: H,
						placeholder: I.length === 0 ? p : void 0,
						disabled: m,
						readOnly: h,
						"aria-label": y ?? p,
						"aria-describedby": b,
						"aria-expanded": x,
						"aria-haspopup": "listbox",
						"aria-controls": F,
						autoComplete: "off",
						role: "combobox"
					})]
				}), T && /* @__PURE__ */ e("span", {
					className: "async-multi-select__spinner",
					"aria-hidden": "true"
				})]
			})
		}), /* @__PURE__ */ e(o.Portal, { children: /* @__PURE__ */ e(s, { children: /* @__PURE__ */ e(o.Content, {
			className: W,
			align: "start",
			sideOffset: -1,
			onOpenAutoFocus: (e) => e.preventDefault(),
			onInteractOutside: () => S(!1),
			children: /* @__PURE__ */ t("div", {
				role: "listbox",
				"aria-multiselectable": "true",
				"aria-label": y ?? p,
				id: F,
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
						let i = I.includes(n.value);
						return /* @__PURE__ */ t("button", {
							type: "button",
							role: "option",
							"aria-selected": i,
							className: ["async-multi-select__item", i ? "async-multi-select__item--selected" : ""].filter(Boolean).join(" "),
							tabIndex: r === 0 ? 0 : -1,
							onMouseDown: (e) => e.preventDefault(),
							onClick: () => {
								V(n.value), P.current?.focus();
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
