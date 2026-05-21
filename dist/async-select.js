'use client';
import './async-select.css';
"use client";
import { Close as e } from "./close.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useCallback as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
import * as c from "@radix-ui/react-popover";
import { DismissableLayerBranch as l } from "@radix-ui/react-dismissable-layer";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function u({ onSearch: u, value: d, onValueChange: f, selectedOption: p, placeholder: m = "Buscar…", disabled: h, readOnly: g, dark: _, size: v = "md", id: y, "aria-label": b, "aria-describedby": x }) {
	let [S, C] = s(!1), [w, T] = s(""), [E, D] = s(!1), [O, k] = s([]), [A, j] = s(!1), [M, N] = s(-1), [P, F] = s(null), [I, L] = s(null), R = o(null), z = o(null), B = o(null), V = a(), H = a(), U = d === void 0 ? P : d, W = p === void 0 ? I : p, G = (e) => `${H}-opt-${e}`;
	i(() => {
		N(-1);
	}, [O]);
	let K = r(async (e) => {
		D(!0), j(!1);
		try {
			k(await u(e));
		} catch {
			k([]);
		} finally {
			D(!1), j(!0);
		}
	}, [u]);
	function q(e) {
		let t = e.target.value;
		T(t), R.current && clearTimeout(R.current), R.current = setTimeout(() => void K(t), 300);
	}
	function J(e) {
		h || g || S || (e.preventDefault(), z.current?.focus(), N(-1), T(""), k([]), j(!1), C(!0), K(""));
	}
	function Y(e) {
		d === void 0 && (F(e.value), L(e)), f?.(e.value, e), C(!1), N(-1), T("");
	}
	function X(e) {
		e.stopPropagation(), d === void 0 && (F(null), L(null)), f?.(null, null), T(""), k([]), j(!1), z.current?.focus();
	}
	function Z(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), S ? N((e) => Math.min(e + 1, O.length - 1)) : (C(!0), K(w))) : e.key === "ArrowUp" ? (e.preventDefault(), N((e) => Math.max(e - 1, -1))) : e.key === "Enter" && M >= 0 && O[M] ? (e.preventDefault(), Y(O[M])) : e.key === "Escape" ? (C(!1), T(""), N(-1)) : e.key === "Tab" ? (C(!1), N(-1)) : !S && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), T(e.key), C(!0), k([]), j(!1), R.current && clearTimeout(R.current), R.current = setTimeout(() => void K(e.key), 300));
	}
	let Q = S ? w : W?.label ?? "", $ = [
		"async-select",
		v === "md" ? "" : `async-select--${v}`,
		h ? "async-select--disabled" : ""
	].filter(Boolean).join(" "), ee = [
		"async-select__content",
		v === "md" ? "" : `async-select__content--${v}`,
		_ ? "async-select__content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(c.Root, {
		open: S,
		modal: !1,
		onOpenChange: () => {},
		children: [/* @__PURE__ */ t(c.Anchor, {
			asChild: !0,
			children: /* @__PURE__ */ n("div", {
				ref: B,
				className: $,
				"data-state": S ? "open" : "closed",
				children: [
					/* @__PURE__ */ t("input", {
						ref: z,
						id: y,
						type: "text",
						className: "async-select__input",
						value: Q,
						onChange: q,
						onPointerDown: J,
						onKeyDown: Z,
						placeholder: m,
						disabled: h,
						readOnly: g,
						"aria-label": b ?? m,
						"aria-describedby": x,
						"aria-expanded": S,
						"aria-haspopup": "listbox",
						"aria-controls": V,
						"aria-activedescendant": M >= 0 ? G(M) : void 0,
						autoComplete: "off",
						role: "combobox"
					}),
					E && /* @__PURE__ */ t("span", {
						className: "async-select__spinner",
						"aria-hidden": "true"
					}),
					!E && U && !h && !g && /* @__PURE__ */ t("button", {
						type: "button",
						className: "async-select__clear",
						"aria-label": "Limpiar selección",
						tabIndex: -1,
						onMouseDown: X,
						children: /* @__PURE__ */ t(e, { size: "xs" })
					})
				]
			})
		}), /* @__PURE__ */ t(c.Portal, { children: /* @__PURE__ */ t(l, { children: /* @__PURE__ */ t(c.Content, {
			className: ee,
			align: "start",
			sideOffset: -1,
			onOpenAutoFocus: (e) => e.preventDefault(),
			onInteractOutside: (e) => {
				B.current?.contains(e.target) || C(!1);
			},
			children: /* @__PURE__ */ n("div", {
				role: "listbox",
				"aria-label": b ?? m,
				id: V,
				children: [
					E && /* @__PURE__ */ t("div", {
						className: "async-select__loading",
						role: "status",
						"aria-label": "Buscando…",
						children: /* @__PURE__ */ t("span", {
							className: "async-select__spinner",
							"aria-hidden": "true"
						})
					}),
					!E && A && O.length === 0 && /* @__PURE__ */ t("div", {
						className: "async-select__empty",
						children: "Sin resultados"
					}),
					!E && O.map((e, n) => {
						let r = e.value === U, i = M === n;
						return /* @__PURE__ */ t("div", {
							id: G(n),
							role: "option",
							"aria-selected": r,
							className: [
								"async-select__item",
								r ? "async-select__item--selected" : "",
								i ? "async-select__item--active" : ""
							].filter(Boolean).join(" "),
							onPointerDown: (e) => e.preventDefault(),
							onClick: () => Y(e),
							children: e.label
						}, e.value);
					})
				]
			})
		}) }) })]
	});
}
//#endregion
export { u as AsyncSelect };
