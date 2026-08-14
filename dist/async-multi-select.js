'use client';
import './async-multi-select.css';
"use client";
import { Icon as e } from "./icon.js";
import { Spinner as t } from "./spinner.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useCallback as i, useId as a, useRef as o, useState as s } from "react";
import * as c from "@radix-ui/react-popover";
import { DismissableLayerBranch as l } from "@radix-ui/react-dismissable-layer";
//#region src/stories/atoms/AsyncMultiSelect/AsyncMultiSelect.tsx
function u({ onSearch: u, value: d, defaultValue: f = [], onValueChange: p, selectedOptions: m = [], placeholder: h = "Buscar…", disabled: g, readOnly: _, size: v = "md", id: y, "aria-label": b, "aria-describedby": x, emptyMessage: S = "Sin resultados", loadingLabel: C = "Buscando…", container: w }) {
	let [T, E] = s(!1), [D, O] = s(""), [k, A] = s(!1), [j, M] = s([]), [N, P] = s(!1), [F, I] = s(-1), [L, R] = s(f), z = o(null), B = o(null), V = o(null), H = a(), U = a(), W = d === void 0 ? L : d, G = (e) => `${U}-opt-${e}`, K = i(async (e) => {
		A(!0), P(!1);
		try {
			M(await u(e)), I(-1);
		} catch {
			M([]), I(-1);
		} finally {
			A(!1), P(!0);
		}
	}, [u]);
	function q(e) {
		let t = e.target.value;
		O(t), T || E(!0), z.current && clearTimeout(z.current), z.current = setTimeout(() => void K(t), 300);
	}
	function J(e) {
		g || _ || T || (e.preventDefault(), B.current?.focus(), I(-1), O(""), M([]), P(!1), E(!0), K(""));
	}
	function Y(e) {
		let t = W.includes(e) ? W.filter((t) => t !== e) : [...W, e];
		d === void 0 && R(t), p?.(t);
	}
	function X(e) {
		if (e.key === "ArrowDown") e.preventDefault(), T ? I((e) => Math.min(e + 1, j.length - 1)) : (E(!0), K(D));
		else if (e.key === "ArrowUp") e.preventDefault(), I((e) => Math.max(e - 1, -1));
		else if (e.key === "Enter" && F >= 0 && j[F]) e.preventDefault(), Y(j[F].value), B.current?.focus();
		else if (e.key === "Escape") E(!1), O(""), I(-1);
		else if (e.key === "Tab") E(!1), I(-1);
		else if (e.key === "Backspace" && D === "" && W.length > 0) {
			let e = W[W.length - 1];
			Y(e);
		}
	}
	let Z = [
		"async-multi-select",
		v === "md" ? "" : `async-multi-select--${v}`,
		g ? "async-multi-select--disabled" : "",
		T ? "async-multi-select--open" : ""
	].filter(Boolean).join(" "), Q = ["async-multi-select__content", v === "md" ? "" : `async-multi-select__content--${v}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(c.Root, {
		open: T,
		modal: !1,
		onOpenChange: () => {},
		children: [/* @__PURE__ */ n(c.Anchor, {
			asChild: !0,
			children: /* @__PURE__ */ r("div", {
				ref: V,
				className: Z,
				"data-state": T ? "open" : "closed",
				children: [/* @__PURE__ */ r("div", {
					className: "async-multi-select__input-area",
					children: [m.map((t) => /* @__PURE__ */ r("span", {
						className: "async-multi-select__pill",
						children: [/* @__PURE__ */ n("span", {
							className: "async-multi-select__pill-label",
							children: t.label
						}), !g && !_ && /* @__PURE__ */ n("button", {
							type: "button",
							className: "async-multi-select__pill-remove",
							"aria-label": `Quitar ${t.label}`,
							tabIndex: -1,
							onMouseDown: (e) => {
								e.preventDefault(), Y(t.value);
							},
							children: /* @__PURE__ */ n(e, {
								name: "close",
								size: "xs"
							})
						})]
					}, t.value)), /* @__PURE__ */ n("input", {
						ref: B,
						id: y,
						type: "text",
						className: "async-multi-select__input",
						value: D,
						onChange: q,
						onPointerDown: J,
						onKeyDown: X,
						placeholder: W.length === 0 ? h : void 0,
						disabled: g,
						readOnly: _,
						"aria-label": b ?? h,
						"aria-describedby": x,
						"aria-expanded": T,
						"aria-haspopup": "listbox",
						"aria-controls": H,
						"aria-activedescendant": F >= 0 ? G(F) : void 0,
						autoComplete: "off",
						role: "combobox"
					})]
				}), k && /* @__PURE__ */ n(t, {
					size: "sm",
					"aria-hidden": !0
				})]
			})
		}), /* @__PURE__ */ n(c.Portal, {
			container: w,
			children: /* @__PURE__ */ n(l, { children: /* @__PURE__ */ n(c.Content, {
				className: Q,
				align: "start",
				sideOffset: -1,
				onOpenAutoFocus: (e) => e.preventDefault(),
				onInteractOutside: (e) => {
					V.current?.contains(e.target) || E(!1);
				},
				children: /* @__PURE__ */ r("div", {
					role: "listbox",
					"aria-multiselectable": "true",
					"aria-label": b ?? h,
					id: H,
					children: [
						k && /* @__PURE__ */ n("div", {
							className: "async-multi-select__loading",
							children: /* @__PURE__ */ n(t, {
								size: "sm",
								label: C
							})
						}),
						!k && N && j.length === 0 && /* @__PURE__ */ n("div", {
							className: "async-multi-select__empty",
							children: S
						}),
						!k && j.map((e, t) => {
							let i = W.includes(e.value), a = F === t;
							return /* @__PURE__ */ r("div", {
								id: G(t),
								role: "option",
								"aria-selected": i,
								className: [
									"async-multi-select__item",
									i ? "async-multi-select__item--selected" : "",
									a ? "async-multi-select__item--active" : ""
								].filter(Boolean).join(" "),
								onPointerDown: (e) => e.preventDefault(),
								onClick: () => {
									Y(e.value), B.current?.focus();
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
			}) })
		})]
	});
}
//#endregion
export { u as AsyncMultiSelect };
