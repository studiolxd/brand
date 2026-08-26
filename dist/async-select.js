'use client';
import './async-select.css';
import { Icon as e } from "./icon.js";
import { Spinner as t } from "./spinner.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useCallback as i, useId as a, useRef as o, useState as s } from "react";
import { Popover as c } from "@base-ui-components/react/popover";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function l({ onSearch: l, value: u, onValueChange: d, selectedOption: f, placeholder: p = "Buscar…", disabled: m, readOnly: h, size: g = "md", id: _, "aria-label": v, "aria-describedby": y, emptyMessage: b = "Sin resultados", loadingLabel: x = "Buscando…", clearLabel: S = "Limpiar selección", container: C }) {
	let [w, T] = s(!1), [E, D] = s(""), [O, k] = s(!1), [A, j] = s([]), [M, N] = s(!1), [P, F] = s(-1), [I, L] = s(null), [R, z] = s(null), B = o(null), V = o(null), H = o(null), U = a(), W = a(), G = u === void 0 ? I : u, K = f === void 0 ? R : f, q = (e) => `${W}-opt-${e}`, J = i(async (e) => {
		k(!0), N(!1);
		try {
			j(await l(e)), F(-1);
		} catch {
			j([]), F(-1);
		} finally {
			k(!1), N(!0);
		}
	}, [l]);
	function Y(e) {
		let t = e.target.value;
		D(t), B.current && clearTimeout(B.current), B.current = setTimeout(() => void J(t), 300);
	}
	function X(e) {
		m || h || w || (e.preventDefault(), V.current?.focus(), F(-1), D(""), j([]), N(!1), T(!0), J(""));
	}
	function Z(e) {
		u === void 0 && (L(e.value), z(e)), d?.(e.value, e), T(!1), F(-1), D("");
	}
	function Q(e) {
		e.stopPropagation(), u === void 0 && (L(null), z(null)), d?.(null, null), D(""), j([]), N(!1), V.current?.focus();
	}
	function $(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), w ? F((e) => Math.min(e + 1, A.length - 1)) : (T(!0), J(E))) : e.key === "ArrowUp" ? (e.preventDefault(), F((e) => Math.max(e - 1, -1))) : e.key === "Enter" && P >= 0 && A[P] ? (e.preventDefault(), Z(A[P])) : e.key === "Escape" ? (T(!1), D(""), F(-1)) : e.key === "Tab" ? (T(!1), F(-1)) : !w && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), D(e.key), T(!0), j([]), N(!1), B.current && clearTimeout(B.current), B.current = setTimeout(() => void J(e.key), 300));
	}
	function ee(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && H.current?.contains(e)) return;
			}
			T(!1), D(""), F(-1);
		}
	}
	let te = w ? E : K?.label ?? "", ne = [
		"async-select",
		g === "md" ? "" : `async-select--${g}`,
		m ? "async-select--disabled" : ""
	].filter(Boolean).join(" "), re = ["async-select__content", g === "md" ? "" : `async-select__content--${g}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(c.Root, {
		open: w,
		onOpenChange: ee,
		children: [/* @__PURE__ */ r("div", {
			ref: H,
			className: ne,
			"data-popup-open": w || void 0,
			children: [
				/* @__PURE__ */ n("input", {
					ref: V,
					id: _,
					type: "text",
					className: "async-select__input",
					value: te,
					onChange: Y,
					onPointerDown: X,
					onKeyDown: $,
					placeholder: p,
					disabled: m,
					readOnly: h,
					"aria-label": v ?? p,
					"aria-describedby": y,
					"aria-expanded": w,
					"aria-haspopup": "listbox",
					"aria-controls": U,
					"aria-activedescendant": P >= 0 ? q(P) : void 0,
					autoComplete: "off",
					role: "combobox"
				}),
				O && /* @__PURE__ */ n(t, {
					size: "sm",
					"aria-hidden": !0
				}),
				!O && G && !m && !h && /* @__PURE__ */ n("button", {
					type: "button",
					className: "async-select__clear",
					"aria-label": S,
					tabIndex: -1,
					onMouseDown: Q,
					children: /* @__PURE__ */ n(e, {
						name: "close",
						size: "xs"
					})
				})
			]
		}), /* @__PURE__ */ n(c.Portal, {
			container: C,
			children: /* @__PURE__ */ n(c.Positioner, {
				className: "async-select__positioner",
				anchor: H,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ n(c.Popup, {
					className: re,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ r("div", {
						role: "listbox",
						"aria-label": v ?? p,
						id: U,
						children: [
							O && /* @__PURE__ */ n("div", {
								className: "async-select__loading",
								children: /* @__PURE__ */ n(t, {
									size: "sm",
									label: x
								})
							}),
							!O && M && A.length === 0 && /* @__PURE__ */ n("div", {
								className: "async-select__empty",
								children: b
							}),
							!O && A.map((e, t) => {
								let r = e.value === G, i = P === t;
								return /* @__PURE__ */ n("div", {
									id: q(t),
									role: "option",
									"aria-selected": r,
									className: [
										"async-select__item",
										r ? "async-select__item--selected" : "",
										i ? "async-select__item--active" : ""
									].filter(Boolean).join(" "),
									onPointerDown: (e) => e.preventDefault(),
									onClick: () => Z(e),
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
export { l as AsyncSelect };
