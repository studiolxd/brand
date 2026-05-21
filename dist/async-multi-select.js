'use client';
import './async-multi-select.css';
"use client";
import { Close as e } from "./close.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useCallback as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
import * as c from "@radix-ui/react-popover";
import { DismissableLayerBranch as l } from "@radix-ui/react-dismissable-layer";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function u({ onSearch: u, value: d, defaultValue: f = [], onValueChange: p, selectedOptions: m = [], placeholder: h = "Buscar…", disabled: g, readOnly: _, dark: v, size: y = "md", id: b, "aria-label": x, "aria-describedby": S }) {
	let [C, w] = s(!1), [T, E] = s(""), [D, O] = s(!1), [k, A] = s([]), [j, M] = s(!1), [N, P] = s(-1), [F, I] = s(f), L = o(null), R = o(null), z = o(null), B = a(), V = a(), H = d === void 0 ? F : d, U = (e) => `${V}-opt-${e}`;
	i(() => {
		P(-1);
	}, [k]);
	let W = r(async (e) => {
		O(!0), M(!1);
		try {
			A(await u(e));
		} catch {
			A([]);
		} finally {
			O(!1), M(!0);
		}
	}, [u]);
	function G(e) {
		let t = e.target.value;
		E(t), C || w(!0), L.current && clearTimeout(L.current), L.current = setTimeout(() => void W(t), 300);
	}
	function K(e) {
		g || _ || C || (e.preventDefault(), R.current?.focus(), P(-1), E(""), A([]), M(!1), w(!0), W(""));
	}
	function q(e) {
		let t = H.includes(e) ? H.filter((t) => t !== e) : [...H, e];
		d === void 0 && I(t), p?.(t);
	}
	function J(e) {
		if (e.key === "ArrowDown") e.preventDefault(), C ? P((e) => Math.min(e + 1, k.length - 1)) : (w(!0), W(T));
		else if (e.key === "ArrowUp") e.preventDefault(), P((e) => Math.max(e - 1, -1));
		else if (e.key === "Enter" && N >= 0 && k[N]) e.preventDefault(), q(k[N].value), R.current?.focus();
		else if (e.key === "Escape") w(!1), E(""), P(-1);
		else if (e.key === "Tab") w(!1), P(-1);
		else if (e.key === "Backspace" && T === "" && H.length > 0) {
			let e = H[H.length - 1];
			q(e);
		}
	}
	let Y = [
		"async-multi-select",
		y === "md" ? "" : `async-multi-select--${y}`,
		g ? "async-multi-select--disabled" : "",
		C ? "async-multi-select--open" : ""
	].filter(Boolean).join(" "), X = [
		"async-multi-select__content",
		y === "md" ? "" : `async-multi-select__content--${y}`,
		v ? "async-multi-select__content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(c.Root, {
		open: C,
		modal: !1,
		onOpenChange: () => {},
		children: [/* @__PURE__ */ t(c.Anchor, {
			asChild: !0,
			children: /* @__PURE__ */ n("div", {
				ref: z,
				className: Y,
				"data-state": C ? "open" : "closed",
				children: [/* @__PURE__ */ n("div", {
					className: "async-multi-select__input-area",
					children: [m.map((r) => /* @__PURE__ */ n("span", {
						className: "async-multi-select__pill",
						children: [/* @__PURE__ */ t("span", {
							className: "async-multi-select__pill-label",
							children: r.label
						}), !g && !_ && /* @__PURE__ */ t("button", {
							type: "button",
							className: "async-multi-select__pill-remove",
							"aria-label": `Quitar ${r.label}`,
							tabIndex: -1,
							onMouseDown: (e) => {
								e.preventDefault(), q(r.value);
							},
							children: /* @__PURE__ */ t(e, { size: "xs" })
						})]
					}, r.value)), /* @__PURE__ */ t("input", {
						ref: R,
						id: b,
						type: "text",
						className: "async-multi-select__input",
						value: T,
						onChange: G,
						onPointerDown: K,
						onKeyDown: J,
						placeholder: H.length === 0 ? h : void 0,
						disabled: g,
						readOnly: _,
						"aria-label": x ?? h,
						"aria-describedby": S,
						"aria-expanded": C,
						"aria-haspopup": "listbox",
						"aria-controls": B,
						"aria-activedescendant": N >= 0 ? U(N) : void 0,
						autoComplete: "off",
						role: "combobox"
					})]
				}), D && /* @__PURE__ */ t("span", {
					className: "async-multi-select__spinner",
					"aria-hidden": "true"
				})]
			})
		}), /* @__PURE__ */ t(c.Portal, { children: /* @__PURE__ */ t(l, { children: /* @__PURE__ */ t(c.Content, {
			className: X,
			align: "start",
			sideOffset: -1,
			onOpenAutoFocus: (e) => e.preventDefault(),
			onInteractOutside: (e) => {
				z.current?.contains(e.target) || w(!1);
			},
			children: /* @__PURE__ */ n("div", {
				role: "listbox",
				"aria-multiselectable": "true",
				"aria-label": x ?? h,
				id: B,
				children: [
					D && /* @__PURE__ */ t("div", {
						className: "async-multi-select__loading",
						role: "status",
						"aria-label": "Buscando…",
						children: /* @__PURE__ */ t("span", {
							className: "async-multi-select__spinner",
							"aria-hidden": "true"
						})
					}),
					!D && j && k.length === 0 && /* @__PURE__ */ t("div", {
						className: "async-multi-select__empty",
						children: "Sin resultados"
					}),
					!D && k.map((e, r) => {
						let i = H.includes(e.value), a = N === r;
						return /* @__PURE__ */ n("div", {
							id: U(r),
							role: "option",
							"aria-selected": i,
							className: [
								"async-multi-select__item",
								i ? "async-multi-select__item--selected" : "",
								a ? "async-multi-select__item--active" : ""
							].filter(Boolean).join(" "),
							onPointerDown: (e) => e.preventDefault(),
							onClick: () => {
								q(e.value), R.current?.focus();
							},
							children: [/* @__PURE__ */ t("span", {
								className: "async-multi-select__item-check",
								"aria-hidden": "true",
								children: /* @__PURE__ */ t("span", { className: "async-multi-select__item-check-mark" })
							}), /* @__PURE__ */ t("span", { children: e.label })]
						}, e.value);
					})
				]
			})
		}) }) })]
	});
}
//#endregion
export { u as AsyncMultiSelect };
