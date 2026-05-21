'use client';
import './async-multi-select.css';
"use client";
import { Close as e } from "./close.js";
import { Spinner as t } from "./spinner.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useCallback as i, useEffect as a, useId as o, useRef as s, useState as c } from "react";
import * as l from "@radix-ui/react-popover";
import { DismissableLayerBranch as u } from "@radix-ui/react-dismissable-layer";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function d({ onSearch: d, value: f, defaultValue: p = [], onValueChange: m, selectedOptions: h = [], placeholder: g = "Buscar…", disabled: _, readOnly: v, dark: y, size: b = "md", id: x, "aria-label": S, "aria-describedby": C }) {
	let [w, T] = c(!1), [E, D] = c(""), [O, k] = c(!1), [A, j] = c([]), [M, N] = c(!1), [P, F] = c(-1), [I, L] = c(p), R = s(null), z = s(null), B = s(null), V = o(), H = o(), U = f === void 0 ? I : f, W = (e) => `${H}-opt-${e}`;
	a(() => {
		F(-1);
	}, [A]);
	let G = i(async (e) => {
		k(!0), N(!1);
		try {
			j(await d(e));
		} catch {
			j([]);
		} finally {
			k(!1), N(!0);
		}
	}, [d]);
	function K(e) {
		let t = e.target.value;
		D(t), w || T(!0), R.current && clearTimeout(R.current), R.current = setTimeout(() => void G(t), 300);
	}
	function q(e) {
		_ || v || w || (e.preventDefault(), z.current?.focus(), F(-1), D(""), j([]), N(!1), T(!0), G(""));
	}
	function J(e) {
		let t = U.includes(e) ? U.filter((t) => t !== e) : [...U, e];
		f === void 0 && L(t), m?.(t);
	}
	function Y(e) {
		if (e.key === "ArrowDown") e.preventDefault(), w ? F((e) => Math.min(e + 1, A.length - 1)) : (T(!0), G(E));
		else if (e.key === "ArrowUp") e.preventDefault(), F((e) => Math.max(e - 1, -1));
		else if (e.key === "Enter" && P >= 0 && A[P]) e.preventDefault(), J(A[P].value), z.current?.focus();
		else if (e.key === "Escape") T(!1), D(""), F(-1);
		else if (e.key === "Tab") T(!1), F(-1);
		else if (e.key === "Backspace" && E === "" && U.length > 0) {
			let e = U[U.length - 1];
			J(e);
		}
	}
	let X = [
		"async-multi-select",
		b === "md" ? "" : `async-multi-select--${b}`,
		_ ? "async-multi-select--disabled" : "",
		w ? "async-multi-select--open" : ""
	].filter(Boolean).join(" "), Z = [
		"async-multi-select__content",
		b === "md" ? "" : `async-multi-select__content--${b}`,
		y ? "async-multi-select__content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(l.Root, {
		open: w,
		modal: !1,
		onOpenChange: () => {},
		children: [/* @__PURE__ */ n(l.Anchor, {
			asChild: !0,
			children: /* @__PURE__ */ r("div", {
				ref: B,
				className: X,
				"data-state": w ? "open" : "closed",
				children: [/* @__PURE__ */ r("div", {
					className: "async-multi-select__input-area",
					children: [h.map((t) => /* @__PURE__ */ r("span", {
						className: "async-multi-select__pill",
						children: [/* @__PURE__ */ n("span", {
							className: "async-multi-select__pill-label",
							children: t.label
						}), !_ && !v && /* @__PURE__ */ n("button", {
							type: "button",
							className: "async-multi-select__pill-remove",
							"aria-label": `Quitar ${t.label}`,
							tabIndex: -1,
							onMouseDown: (e) => {
								e.preventDefault(), J(t.value);
							},
							children: /* @__PURE__ */ n(e, { size: "xs" })
						})]
					}, t.value)), /* @__PURE__ */ n("input", {
						ref: z,
						id: x,
						type: "text",
						className: "async-multi-select__input",
						value: E,
						onChange: K,
						onPointerDown: q,
						onKeyDown: Y,
						placeholder: U.length === 0 ? g : void 0,
						disabled: _,
						readOnly: v,
						"aria-label": S ?? g,
						"aria-describedby": C,
						"aria-expanded": w,
						"aria-haspopup": "listbox",
						"aria-controls": V,
						"aria-activedescendant": P >= 0 ? W(P) : void 0,
						autoComplete: "off",
						role: "combobox"
					})]
				}), O && /* @__PURE__ */ n(t, {
					size: "sm",
					"aria-hidden": !0
				})]
			})
		}), /* @__PURE__ */ n(l.Portal, { children: /* @__PURE__ */ n(u, { children: /* @__PURE__ */ n(l.Content, {
			className: Z,
			align: "start",
			sideOffset: -1,
			onOpenAutoFocus: (e) => e.preventDefault(),
			onInteractOutside: (e) => {
				B.current?.contains(e.target) || T(!1);
			},
			children: /* @__PURE__ */ r("div", {
				role: "listbox",
				"aria-multiselectable": "true",
				"aria-label": S ?? g,
				id: V,
				children: [
					O && /* @__PURE__ */ n("div", {
						className: "async-multi-select__loading",
						children: /* @__PURE__ */ n(t, {
							size: "sm",
							label: "Buscando…"
						})
					}),
					!O && M && A.length === 0 && /* @__PURE__ */ n("div", {
						className: "async-multi-select__empty",
						children: "Sin resultados"
					}),
					!O && A.map((e, t) => {
						let i = U.includes(e.value), a = P === t;
						return /* @__PURE__ */ r("div", {
							id: W(t),
							role: "option",
							"aria-selected": i,
							className: [
								"async-multi-select__item",
								i ? "async-multi-select__item--selected" : "",
								a ? "async-multi-select__item--active" : ""
							].filter(Boolean).join(" "),
							onPointerDown: (e) => e.preventDefault(),
							onClick: () => {
								J(e.value), z.current?.focus();
							},
							children: [/* @__PURE__ */ n("span", {
								className: "async-multi-select__item-check",
								"aria-hidden": "true",
								children: /* @__PURE__ */ n("span", { className: "async-multi-select__item-check-mark" })
							}), /* @__PURE__ */ n("span", { children: e.label })]
						}, e.value);
					})
				]
			})
		}) }) })]
	});
}
//#endregion
export { d as AsyncMultiSelect };
