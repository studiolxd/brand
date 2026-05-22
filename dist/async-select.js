'use client';
import './async-select.css';
"use client";
import { Icon as e } from "./icon.js";
import { Spinner as t } from "./spinner.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useCallback as i, useEffect as a, useId as o, useRef as s, useState as c } from "react";
import * as l from "@radix-ui/react-popover";
import { DismissableLayerBranch as u } from "@radix-ui/react-dismissable-layer";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function d({ onSearch: d, value: f, onValueChange: p, selectedOption: m, placeholder: h = "Buscar…", disabled: g, readOnly: _, dark: v, size: y = "md", id: b, "aria-label": x, "aria-describedby": S }) {
	let [C, w] = c(!1), [T, E] = c(""), [D, O] = c(!1), [k, A] = c([]), [j, M] = c(!1), [N, P] = c(-1), [F, I] = c(null), [L, R] = c(null), z = s(null), B = s(null), V = s(null), H = o(), U = o(), W = f === void 0 ? F : f, G = m === void 0 ? L : m, K = (e) => `${U}-opt-${e}`;
	a(() => {
		P(-1);
	}, [k]);
	let q = i(async (e) => {
		O(!0), M(!1);
		try {
			A(await d(e));
		} catch {
			A([]);
		} finally {
			O(!1), M(!0);
		}
	}, [d]);
	function J(e) {
		let t = e.target.value;
		E(t), z.current && clearTimeout(z.current), z.current = setTimeout(() => void q(t), 300);
	}
	function Y(e) {
		g || _ || C || (e.preventDefault(), B.current?.focus(), P(-1), E(""), A([]), M(!1), w(!0), q(""));
	}
	function X(e) {
		f === void 0 && (I(e.value), R(e)), p?.(e.value, e), w(!1), P(-1), E("");
	}
	function Z(e) {
		e.stopPropagation(), f === void 0 && (I(null), R(null)), p?.(null, null), E(""), A([]), M(!1), B.current?.focus();
	}
	function Q(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), C ? P((e) => Math.min(e + 1, k.length - 1)) : (w(!0), q(T))) : e.key === "ArrowUp" ? (e.preventDefault(), P((e) => Math.max(e - 1, -1))) : e.key === "Enter" && N >= 0 && k[N] ? (e.preventDefault(), X(k[N])) : e.key === "Escape" ? (w(!1), E(""), P(-1)) : e.key === "Tab" ? (w(!1), P(-1)) : !C && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), E(e.key), w(!0), A([]), M(!1), z.current && clearTimeout(z.current), z.current = setTimeout(() => void q(e.key), 300));
	}
	let $ = C ? T : G?.label ?? "", ee = [
		"async-select",
		y === "md" ? "" : `async-select--${y}`,
		g ? "async-select--disabled" : ""
	].filter(Boolean).join(" "), te = [
		"async-select__content",
		y === "md" ? "" : `async-select__content--${y}`,
		v ? "async-select__content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(l.Root, {
		open: C,
		modal: !1,
		onOpenChange: () => {},
		children: [/* @__PURE__ */ n(l.Anchor, {
			asChild: !0,
			children: /* @__PURE__ */ r("div", {
				ref: V,
				className: ee,
				"data-state": C ? "open" : "closed",
				children: [
					/* @__PURE__ */ n("input", {
						ref: B,
						id: b,
						type: "text",
						className: "async-select__input",
						value: $,
						onChange: J,
						onPointerDown: Y,
						onKeyDown: Q,
						placeholder: h,
						disabled: g,
						readOnly: _,
						"aria-label": x ?? h,
						"aria-describedby": S,
						"aria-expanded": C,
						"aria-haspopup": "listbox",
						"aria-controls": H,
						"aria-activedescendant": N >= 0 ? K(N) : void 0,
						autoComplete: "off",
						role: "combobox"
					}),
					D && /* @__PURE__ */ n(t, {
						size: "sm",
						"aria-hidden": !0
					}),
					!D && W && !g && !_ && /* @__PURE__ */ n("button", {
						type: "button",
						className: "async-select__clear",
						"aria-label": "Limpiar selección",
						tabIndex: -1,
						onMouseDown: Z,
						children: /* @__PURE__ */ n(e, {
							name: "close",
							size: "xs"
						})
					})
				]
			})
		}), /* @__PURE__ */ n(l.Portal, { children: /* @__PURE__ */ n(u, { children: /* @__PURE__ */ n(l.Content, {
			className: te,
			align: "start",
			sideOffset: -1,
			onOpenAutoFocus: (e) => e.preventDefault(),
			onInteractOutside: (e) => {
				V.current?.contains(e.target) || w(!1);
			},
			children: /* @__PURE__ */ r("div", {
				role: "listbox",
				"aria-label": x ?? h,
				id: H,
				children: [
					D && /* @__PURE__ */ n("div", {
						className: "async-select__loading",
						children: /* @__PURE__ */ n(t, {
							size: "sm",
							label: "Buscando…"
						})
					}),
					!D && j && k.length === 0 && /* @__PURE__ */ n("div", {
						className: "async-select__empty",
						children: "Sin resultados"
					}),
					!D && k.map((e, t) => {
						let r = e.value === W, i = N === t;
						return /* @__PURE__ */ n("div", {
							id: K(t),
							role: "option",
							"aria-selected": r,
							className: [
								"async-select__item",
								r ? "async-select__item--selected" : "",
								i ? "async-select__item--active" : ""
							].filter(Boolean).join(" "),
							onPointerDown: (e) => e.preventDefault(),
							onClick: () => X(e),
							children: e.label
						}, e.value);
					})
				]
			})
		}) }) })]
	});
}
//#endregion
export { d as AsyncSelect };
