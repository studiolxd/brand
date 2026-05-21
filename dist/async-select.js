'use client';
import './async-select.css';
"use client";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useCallback as n, useEffect as r, useId as i, useRef as a, useState as o } from "react";
import * as s from "@radix-ui/react-popover";
import { DismissableLayerBranch as c } from "@radix-ui/react-dismissable-layer";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function l({ onSearch: l, value: u, onValueChange: d, selectedOption: f, placeholder: p = "Buscar…", disabled: m, readOnly: h, dark: g, size: _ = "md", id: v, "aria-label": y, "aria-describedby": b }) {
	let [x, S] = o(!1), [C, w] = o(""), [T, E] = o(!1), [D, O] = o([]), [k, A] = o(!1), [j, M] = o(-1), [N, P] = o(null), [F, I] = o(null), L = a(null), R = a(null), z = a(null), B = i(), V = i(), H = u === void 0 ? N : u, U = f === void 0 ? F : f, W = (e) => `${V}-opt-${e}`;
	r(() => {
		M(-1);
	}, [D]);
	let G = n(async (e) => {
		E(!0), A(!1);
		try {
			O(await l(e));
		} catch {
			O([]);
		} finally {
			E(!1), A(!0);
		}
	}, [l]);
	function K(e) {
		let t = e.target.value;
		w(t), L.current && clearTimeout(L.current), L.current = setTimeout(() => void G(t), 300);
	}
	function q(e) {
		m || h || x || (e.preventDefault(), R.current?.focus(), M(-1), w(""), O([]), A(!1), S(!0), G(""));
	}
	function J(e) {
		u === void 0 && (P(e.value), I(e)), d?.(e.value, e), S(!1), M(-1), w("");
	}
	function Y(e) {
		e.stopPropagation(), u === void 0 && (P(null), I(null)), d?.(null, null), w(""), O([]), A(!1), R.current?.focus();
	}
	function X(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), x ? M((e) => Math.min(e + 1, D.length - 1)) : (S(!0), G(C))) : e.key === "ArrowUp" ? (e.preventDefault(), M((e) => Math.max(e - 1, -1))) : e.key === "Enter" && j >= 0 && D[j] ? (e.preventDefault(), J(D[j])) : e.key === "Escape" ? (S(!1), w(""), M(-1)) : e.key === "Tab" ? (S(!1), M(-1)) : !x && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), w(e.key), S(!0), O([]), A(!1), L.current && clearTimeout(L.current), L.current = setTimeout(() => void G(e.key), 300));
	}
	let Z = x ? C : U?.label ?? "", Q = [
		"async-select",
		_ === "md" ? "" : `async-select--${_}`,
		m ? "async-select--disabled" : ""
	].filter(Boolean).join(" "), $ = [
		"async-select__content",
		_ === "md" ? "" : `async-select__content--${_}`,
		g ? "async-select__content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(s.Root, {
		open: x,
		modal: !1,
		onOpenChange: () => {},
		children: [/* @__PURE__ */ e(s.Anchor, {
			asChild: !0,
			children: /* @__PURE__ */ t("div", {
				ref: z,
				className: Q,
				"data-state": x ? "open" : "closed",
				children: [
					/* @__PURE__ */ e("input", {
						ref: R,
						id: v,
						type: "text",
						className: "async-select__input",
						value: Z,
						onChange: K,
						onPointerDown: q,
						onKeyDown: X,
						placeholder: p,
						disabled: m,
						readOnly: h,
						"aria-label": y ?? p,
						"aria-describedby": b,
						"aria-expanded": x,
						"aria-haspopup": "listbox",
						"aria-controls": B,
						"aria-activedescendant": j >= 0 ? W(j) : void 0,
						autoComplete: "off",
						role: "combobox"
					}),
					T && /* @__PURE__ */ e("span", {
						className: "async-select__spinner",
						"aria-hidden": "true"
					}),
					!T && H && !m && !h && /* @__PURE__ */ e("button", {
						type: "button",
						className: "async-select__clear",
						"aria-label": "Limpiar selección",
						tabIndex: -1,
						onMouseDown: Y,
						children: "×"
					})
				]
			})
		}), /* @__PURE__ */ e(s.Portal, { children: /* @__PURE__ */ e(c, { children: /* @__PURE__ */ e(s.Content, {
			className: $,
			align: "start",
			sideOffset: -1,
			onOpenAutoFocus: (e) => e.preventDefault(),
			onInteractOutside: (e) => {
				z.current?.contains(e.target) || S(!1);
			},
			children: /* @__PURE__ */ t("div", {
				role: "listbox",
				"aria-label": y ?? p,
				id: B,
				children: [
					T && /* @__PURE__ */ e("div", {
						className: "async-select__loading",
						role: "status",
						"aria-label": "Buscando…",
						children: /* @__PURE__ */ e("span", {
							className: "async-select__spinner",
							"aria-hidden": "true"
						})
					}),
					!T && k && D.length === 0 && /* @__PURE__ */ e("div", {
						className: "async-select__empty",
						children: "Sin resultados"
					}),
					!T && D.map((t, n) => {
						let r = t.value === H, i = j === n;
						return /* @__PURE__ */ e("div", {
							id: W(n),
							role: "option",
							"aria-selected": r,
							className: [
								"async-select__item",
								r ? "async-select__item--selected" : "",
								i ? "async-select__item--active" : ""
							].filter(Boolean).join(" "),
							onPointerDown: (e) => e.preventDefault(),
							onClick: () => J(t),
							children: t.label
						}, t.value);
					})
				]
			})
		}) }) })]
	});
}
//#endregion
export { l as AsyncSelect };
