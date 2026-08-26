'use client';
import './async-select.css';
import { Icon as e } from "./icon.js";
import { i as t, n, r, t as i } from "./_shared/PopoverPopup.js";
import { Spinner as a } from "./spinner.js";
import { useCallback as o, useId as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function f({ onSearch: f, value: p, onValueChange: m, selectedOption: h, placeholder: g = "Buscar…", disabled: _, readOnly: v, size: y = "md", id: b, "aria-label": x, "aria-describedby": S, emptyMessage: C = "Sin resultados", loadingLabel: ee = "Buscando…", clearLabel: w = "Limpiar selección", container: T }) {
	let [E, D] = l(!1), [O, k] = l(""), [A, j] = l(!1), [M, N] = l([]), [P, F] = l(!1), [I, L] = l(-1), [R, z] = l(null), [B, V] = l(null), H = c(null), U = c(null), W = c(null), G = s(), K = s(), q = p === void 0 ? R : p, J = h === void 0 ? B : h, Y = (e) => `${K}-opt-${e}`, X = o(async (e) => {
		j(!0), F(!1);
		try {
			N(await f(e)), L(-1);
		} catch {
			N([]), L(-1);
		} finally {
			j(!1), F(!0);
		}
	}, [f]);
	function Z(e) {
		let t = e.target.value;
		k(t), H.current && clearTimeout(H.current), H.current = setTimeout(() => void X(t), 300);
	}
	function Q(e) {
		_ || v || E || (e.preventDefault(), U.current?.focus(), L(-1), k(""), N([]), F(!1), D(!0), X(""));
	}
	function $(e) {
		p === void 0 && (z(e.value), V(e)), m?.(e.value, e), D(!1), L(-1), k("");
	}
	function te(e) {
		e.stopPropagation(), p === void 0 && (z(null), V(null)), m?.(null, null), k(""), N([]), F(!1), U.current?.focus();
	}
	function ne(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), E ? L((e) => Math.min(e + 1, M.length - 1)) : (D(!0), X(O))) : e.key === "ArrowUp" ? (e.preventDefault(), L((e) => Math.max(e - 1, -1))) : e.key === "Enter" && I >= 0 && M[I] ? (e.preventDefault(), $(M[I])) : e.key === "Escape" ? (D(!1), k(""), L(-1)) : e.key === "Tab" ? (D(!1), L(-1)) : !E && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), k(e.key), D(!0), N([]), F(!1), H.current && clearTimeout(H.current), H.current = setTimeout(() => void X(e.key), 300));
	}
	function re(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && W.current?.contains(e)) return;
			}
			D(!1), k(""), L(-1);
		}
	}
	let ie = E ? O : J?.label ?? "", ae = [
		"async-select",
		y === "md" ? "" : `async-select--${y}`,
		_ ? "async-select--disabled" : ""
	].filter(Boolean).join(" "), oe = ["async-select__content", y === "md" ? "" : `async-select__content--${y}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ d(t, {
		open: E,
		onOpenChange: re,
		children: [/* @__PURE__ */ d("div", {
			ref: W,
			className: ae,
			"data-popup-open": E || void 0,
			children: [
				/* @__PURE__ */ u("input", {
					ref: U,
					id: b,
					type: "text",
					className: "async-select__input",
					value: ie,
					onChange: Z,
					onPointerDown: Q,
					onKeyDown: ne,
					placeholder: g,
					disabled: _,
					readOnly: v,
					"aria-label": x ?? g,
					"aria-describedby": S,
					"aria-expanded": E,
					"aria-haspopup": "listbox",
					"aria-controls": G,
					"aria-activedescendant": I >= 0 ? Y(I) : void 0,
					autoComplete: "off",
					role: "combobox"
				}),
				A && /* @__PURE__ */ u(a, {
					size: "sm",
					"aria-hidden": !0
				}),
				!A && q && !_ && !v && /* @__PURE__ */ u("button", {
					type: "button",
					className: "async-select__clear",
					"aria-label": w,
					tabIndex: -1,
					onMouseDown: te,
					children: /* @__PURE__ */ u(e, {
						name: "close",
						size: "xs"
					})
				})
			]
		}), /* @__PURE__ */ u(r, {
			container: T,
			children: /* @__PURE__ */ u(n, {
				className: "async-select__positioner",
				anchor: W,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ u(i, {
					className: oe,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ d("div", {
						role: "listbox",
						"aria-label": x ?? g,
						id: G,
						children: [
							A && /* @__PURE__ */ u("div", {
								className: "async-select__loading",
								children: /* @__PURE__ */ u(a, {
									size: "sm",
									label: ee
								})
							}),
							!A && P && M.length === 0 && /* @__PURE__ */ u("div", {
								className: "async-select__empty",
								children: C
							}),
							!A && M.map((e, t) => {
								let n = e.value === q, r = I === t;
								return /* @__PURE__ */ u("div", {
									id: Y(t),
									role: "option",
									"aria-selected": n,
									className: [
										"async-select__item",
										n ? "async-select__item--selected" : "",
										r ? "async-select__item--active" : ""
									].filter(Boolean).join(" "),
									onPointerDown: (e) => e.preventDefault(),
									onClick: () => $(e),
									children: e.label
								}, e.value);
							})
						]
					})
				})
			})
		})]
	});
}
//#endregion
export { f as AsyncSelect };
