'use client';
import './async-select.css';
"use client";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useCallback as n, useId as r, useRef as i, useState as a } from "react";
import * as o from "@radix-ui/react-popover";
import { DismissableLayerBranch as s } from "@radix-ui/react-dismissable-layer";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function c({ onSearch: c, value: l, onValueChange: u, selectedOption: d, placeholder: f = "Buscar…", disabled: p, readOnly: m, dark: h, size: g = "md", id: _, "aria-label": v, "aria-describedby": y }) {
	let [b, x] = a(!1), [S, C] = a(""), [w, T] = a(!1), [E, D] = a([]), [O, k] = a(!1), [A, j] = a(null), [M, N] = a(null), P = i(null), F = i(null), I = r(), L = l === void 0 ? A : l, R = d === void 0 ? M : d, z = n(async (e) => {
		T(!0), k(!1);
		try {
			D(await c(e));
		} catch {
			D([]);
		} finally {
			T(!1), k(!0);
		}
	}, [c]);
	function B(e) {
		let t = e.target.value;
		C(t), P.current && clearTimeout(P.current), P.current = setTimeout(() => void z(t), 300);
	}
	function V() {
		p || m || (C(""), D([]), k(!1), x(!0), z(""));
	}
	function H() {
		requestAnimationFrame(() => {
			let e = document.activeElement, t = F.current === e, n = document.getElementById(I)?.contains(e);
			!t && !n && x(!1);
		});
	}
	function U(e) {
		l === void 0 && (j(e.value), N(e)), u?.(e.value, e), x(!1), C("");
	}
	function W(e) {
		e.stopPropagation(), l === void 0 && (j(null), N(null)), u?.(null, null), C(""), D([]), k(!1), F.current?.focus();
	}
	function G(e) {
		e.key === "Escape" ? (x(!1), C("")) : e.key === "ArrowDown" && b && (e.preventDefault(), (document.getElementById(I)?.querySelector("[role=\"option\"]"))?.focus());
	}
	let K = b ? S : R?.label ?? "", q = [
		"async-select",
		g === "md" ? "" : `async-select--${g}`,
		p ? "async-select--disabled" : ""
	].filter(Boolean).join(" "), J = [
		"async-select__content",
		g === "md" ? "" : `async-select__content--${g}`,
		h ? "async-select__content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(o.Root, {
		open: b,
		modal: !1,
		onOpenChange: (e) => {
			e || x(!1);
		},
		children: [/* @__PURE__ */ e(o.Anchor, {
			asChild: !0,
			children: /* @__PURE__ */ t("div", {
				className: q,
				"data-state": b ? "open" : "closed",
				children: [
					/* @__PURE__ */ e("input", {
						ref: F,
						id: _,
						type: "text",
						className: "async-select__input",
						value: K,
						onChange: B,
						onFocus: V,
						onBlur: H,
						onKeyDown: G,
						placeholder: f,
						disabled: p,
						readOnly: m,
						"aria-label": v ?? f,
						"aria-describedby": y,
						"aria-expanded": b,
						"aria-haspopup": "listbox",
						"aria-controls": I,
						autoComplete: "off",
						role: "combobox"
					}),
					w && /* @__PURE__ */ e("span", {
						className: "async-select__spinner",
						"aria-hidden": "true"
					}),
					!w && L && !p && !m && /* @__PURE__ */ e("button", {
						type: "button",
						className: "async-select__clear",
						"aria-label": "Limpiar selección",
						tabIndex: -1,
						onMouseDown: W,
						children: "×"
					})
				]
			})
		}), /* @__PURE__ */ e(o.Portal, { children: /* @__PURE__ */ e(s, { children: /* @__PURE__ */ e(o.Content, {
			className: J,
			align: "start",
			sideOffset: -1,
			onOpenAutoFocus: (e) => e.preventDefault(),
			onInteractOutside: () => x(!1),
			children: /* @__PURE__ */ t("div", {
				role: "listbox",
				"aria-label": v ?? f,
				id: I,
				onKeyDown: (e) => {
					let t = Array.from(e.currentTarget.querySelectorAll("[role=\"option\"]")), n = t.indexOf(document.activeElement);
					e.key === "ArrowDown" ? (e.preventDefault(), t[Math.min(n + 1, t.length - 1)]?.focus()) : e.key === "ArrowUp" ? (e.preventDefault(), n <= 0 ? F.current?.focus() : t[n - 1]?.focus()) : e.key === "Escape" && (x(!1), F.current?.focus());
				},
				children: [
					w && /* @__PURE__ */ e("div", {
						className: "async-select__loading",
						role: "status",
						"aria-label": "Buscando…",
						children: /* @__PURE__ */ e("span", {
							className: "async-select__spinner",
							"aria-hidden": "true"
						})
					}),
					!w && O && E.length === 0 && /* @__PURE__ */ e("div", {
						className: "async-select__empty",
						children: "Sin resultados"
					}),
					!w && E.map((t) => {
						let n = t.value === L;
						return /* @__PURE__ */ e("button", {
							type: "button",
							role: "option",
							"aria-selected": n,
							className: ["async-select__item", n ? "async-select__item--selected" : ""].filter(Boolean).join(" "),
							onMouseDown: (e) => e.preventDefault(),
							onClick: () => U(t),
							children: t.label
						}, t.value);
					})
				]
			})
		}) }) })]
	});
}
//#endregion
export { c as AsyncSelect };
