'use client';
import './async-select.css';
import { Icon as e } from "./icon.js";
import { Spinner as t } from "./spinner.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i, useCallback as a, useId as o, useRef as s, useState as c } from "react";
import { Popover as l } from "@base-ui-components/react/popover";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function u(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var d = i(function({ onSearch: i, value: d, onValueChange: f, selectedOption: p, placeholder: m = "Buscar…", disabled: h, readOnly: g, size: _ = "md", id: ee, name: v, error: y = !1, onBlur: b, className: te, "aria-label": x, "aria-describedby": S, emptyMessage: C = "Sin resultados", loadingLabel: w = "Buscando…", clearLabel: ne = "Limpiar selección", container: T }, E) {
	let [D, O] = c(!1), [k, A] = c(""), [j, M] = c(!1), [N, P] = c([]), [F, I] = c(!1), [L, R] = c(-1), [z, B] = c(null), [V, H] = c(null), U = s(null), W = s(null), G = s(null), K = o(), q = o(), J = d === void 0 ? z : d, Y = p === void 0 ? V : p, X = (e) => `${q}-opt-${e}`, Z = a(async (e) => {
		M(!0), I(!1);
		try {
			P(await i(e)), R(-1);
		} catch {
			P([]), R(-1);
		} finally {
			M(!1), I(!0);
		}
	}, [i]);
	function Q(e) {
		let t = e.target.value;
		A(t), U.current && clearTimeout(U.current), U.current = setTimeout(() => void Z(t), 300);
	}
	function re(e) {
		h || g || D || (e.preventDefault(), W.current?.focus(), R(-1), A(""), P([]), I(!1), O(!0), Z(""));
	}
	function $(e) {
		d === void 0 && (B(e.value), H(e)), f?.(e.value, e), O(!1), R(-1), A("");
	}
	function ie(e) {
		e.stopPropagation(), d === void 0 && (B(null), H(null)), f?.(null, null), A(""), P([]), I(!1), W.current?.focus();
	}
	function ae(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), D ? R((e) => Math.min(e + 1, N.length - 1)) : (O(!0), Z(k))) : e.key === "ArrowUp" ? (e.preventDefault(), R((e) => Math.max(e - 1, -1))) : e.key === "Enter" && L >= 0 && N[L] ? (e.preventDefault(), $(N[L])) : e.key === "Escape" ? (O(!1), A(""), R(-1)) : e.key === "Tab" ? (O(!1), R(-1)) : !D && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), A(e.key), O(!0), P([]), I(!1), U.current && clearTimeout(U.current), U.current = setTimeout(() => void Z(e.key), 300));
	}
	function oe(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && G.current?.contains(e)) return;
			}
			O(!1), A(""), R(-1);
		}
	}
	let se = D ? k : Y?.label ?? "", ce = [
		"async-select",
		_ === "md" ? "" : `async-select--${_}`,
		h ? "async-select--disabled" : "",
		y ? "async-select--error" : "",
		te ?? ""
	].filter(Boolean).join(" "), le = ["async-select__content", _ === "md" ? "" : `async-select__content--${_}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(l.Root, {
		open: D,
		onOpenChange: oe,
		children: [/* @__PURE__ */ r("div", {
			ref: G,
			className: ce,
			"data-popup-open": D || void 0,
			children: [
				/* @__PURE__ */ n("input", {
					ref: (e) => {
						W.current = e, u(E, e);
					},
					id: ee,
					type: "text",
					className: "async-select__input",
					value: se,
					onChange: Q,
					onPointerDown: re,
					onKeyDown: ae,
					placeholder: m,
					disabled: h,
					readOnly: g,
					"aria-label": x,
					"aria-describedby": S,
					"aria-invalid": y || void 0,
					"aria-expanded": D,
					"aria-haspopup": "listbox",
					"aria-controls": K,
					"aria-activedescendant": L >= 0 ? X(L) : void 0,
					autoComplete: "off",
					role: "combobox",
					onBlur: b
				}),
				v && /* @__PURE__ */ n("input", {
					type: "hidden",
					name: v,
					value: J ?? ""
				}),
				j && /* @__PURE__ */ n(t, {
					size: "sm",
					"aria-hidden": !0
				}),
				!j && J && !h && !g && /* @__PURE__ */ n("button", {
					type: "button",
					className: "async-select__clear",
					"aria-label": ne,
					tabIndex: -1,
					onMouseDown: ie,
					children: /* @__PURE__ */ n(e, {
						name: "close",
						size: "xs"
					})
				})
			]
		}), /* @__PURE__ */ n(l.Portal, {
			container: T,
			children: /* @__PURE__ */ n(l.Positioner, {
				className: "async-select__positioner",
				anchor: G,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ n(l.Popup, {
					className: le,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ r("div", {
						role: "listbox",
						"aria-label": x ?? m,
						id: K,
						children: [
							j && /* @__PURE__ */ n("div", {
								className: "async-select__loading",
								children: /* @__PURE__ */ n(t, {
									size: "sm",
									label: w
								})
							}),
							!j && F && N.length === 0 && /* @__PURE__ */ n("div", {
								className: "async-select__empty",
								children: C
							}),
							!j && N.map((e, t) => {
								let r = e.value === J, i = L === t;
								return /* @__PURE__ */ n("div", {
									id: X(t),
									role: "option",
									"aria-selected": r,
									className: [
										"async-select__item",
										r ? "async-select__item--selected" : "",
										i ? "async-select__item--active" : ""
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
});
//#endregion
export { d as AsyncSelect };
