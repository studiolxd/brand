'use client';
import './async-select.css';
import { Icon as e } from "./icon.js";
import { Spinner as t } from "./spinner.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useCallback as i, useId as a, useRef as o, useState as s } from "react";
import * as c from "@radix-ui/react-popover";
import { DismissableLayerBranch as l } from "@radix-ui/react-dismissable-layer";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function u({ onSearch: u, value: d, onValueChange: f, selectedOption: p, placeholder: m = "Buscar…", disabled: h, readOnly: g, size: _ = "md", id: v, "aria-label": y, "aria-describedby": b, emptyMessage: x = "Sin resultados", loadingLabel: S = "Buscando…", clearLabel: C = "Limpiar selección", container: w }) {
	let [T, E] = s(!1), [D, O] = s(""), [k, A] = s(!1), [j, M] = s([]), [N, P] = s(!1), [F, I] = s(-1), [L, R] = s(null), [z, B] = s(null), V = o(null), H = o(null), U = o(null), W = a(), G = a(), K = d === void 0 ? L : d, q = p === void 0 ? z : p, J = (e) => `${G}-opt-${e}`, Y = i(async (e) => {
		A(!0), P(!1);
		try {
			M(await u(e)), I(-1);
		} catch {
			M([]), I(-1);
		} finally {
			A(!1), P(!0);
		}
	}, [u]);
	function X(e) {
		let t = e.target.value;
		O(t), V.current && clearTimeout(V.current), V.current = setTimeout(() => void Y(t), 300);
	}
	function Z(e) {
		h || g || T || (e.preventDefault(), H.current?.focus(), I(-1), O(""), M([]), P(!1), E(!0), Y(""));
	}
	function Q(e) {
		d === void 0 && (R(e.value), B(e)), f?.(e.value, e), E(!1), I(-1), O("");
	}
	function $(e) {
		e.stopPropagation(), d === void 0 && (R(null), B(null)), f?.(null, null), O(""), M([]), P(!1), H.current?.focus();
	}
	function ee(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), T ? I((e) => Math.min(e + 1, j.length - 1)) : (E(!0), Y(D))) : e.key === "ArrowUp" ? (e.preventDefault(), I((e) => Math.max(e - 1, -1))) : e.key === "Enter" && F >= 0 && j[F] ? (e.preventDefault(), Q(j[F])) : e.key === "Escape" ? (E(!1), O(""), I(-1)) : e.key === "Tab" ? (E(!1), I(-1)) : !T && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), O(e.key), E(!0), M([]), P(!1), V.current && clearTimeout(V.current), V.current = setTimeout(() => void Y(e.key), 300));
	}
	let te = T ? D : q?.label ?? "", ne = [
		"async-select",
		_ === "md" ? "" : `async-select--${_}`,
		h ? "async-select--disabled" : ""
	].filter(Boolean).join(" "), re = ["async-select__content", _ === "md" ? "" : `async-select__content--${_}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(c.Root, {
		open: T,
		modal: !1,
		onOpenChange: () => {},
		children: [/* @__PURE__ */ n(c.Anchor, {
			asChild: !0,
			children: /* @__PURE__ */ r("div", {
				ref: U,
				className: ne,
				"data-state": T ? "open" : "closed",
				children: [
					/* @__PURE__ */ n("input", {
						ref: H,
						id: v,
						type: "text",
						className: "async-select__input",
						value: te,
						onChange: X,
						onPointerDown: Z,
						onKeyDown: ee,
						placeholder: m,
						disabled: h,
						readOnly: g,
						"aria-label": y ?? m,
						"aria-describedby": b,
						"aria-expanded": T,
						"aria-haspopup": "listbox",
						"aria-controls": W,
						"aria-activedescendant": F >= 0 ? J(F) : void 0,
						autoComplete: "off",
						role: "combobox"
					}),
					k && /* @__PURE__ */ n(t, {
						size: "sm",
						"aria-hidden": !0
					}),
					!k && K && !h && !g && /* @__PURE__ */ n("button", {
						type: "button",
						className: "async-select__clear",
						"aria-label": C,
						tabIndex: -1,
						onMouseDown: $,
						children: /* @__PURE__ */ n(e, {
							name: "close",
							size: "xs"
						})
					})
				]
			})
		}), /* @__PURE__ */ n(c.Portal, {
			container: w,
			children: /* @__PURE__ */ n(l, { children: /* @__PURE__ */ n(c.Content, {
				className: re,
				align: "start",
				sideOffset: -1,
				onOpenAutoFocus: (e) => e.preventDefault(),
				onInteractOutside: (e) => {
					U.current?.contains(e.target) || E(!1);
				},
				children: /* @__PURE__ */ r("div", {
					role: "listbox",
					"aria-label": y ?? m,
					id: W,
					children: [
						k && /* @__PURE__ */ n("div", {
							className: "async-select__loading",
							children: /* @__PURE__ */ n(t, {
								size: "sm",
								label: S
							})
						}),
						!k && N && j.length === 0 && /* @__PURE__ */ n("div", {
							className: "async-select__empty",
							children: x
						}),
						!k && j.map((e, t) => {
							let r = e.value === K, i = F === t;
							return /* @__PURE__ */ n("div", {
								id: J(t),
								role: "option",
								"aria-selected": r,
								className: [
									"async-select__item",
									r ? "async-select__item--selected" : "",
									i ? "async-select__item--active" : ""
								].filter(Boolean).join(" "),
								onPointerDown: (e) => e.preventDefault(),
								onClick: () => Q(e),
								children: e.label
							}, e.value);
						})
					]
				})
			}) })
		})]
	});
}
//#endregion
export { u as AsyncSelect };
