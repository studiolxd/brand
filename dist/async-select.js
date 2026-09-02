'use client';
import './async-select.css';
import { Icon as e } from "./icon.js";
import { Spinner as t } from "./spinner.js";
import { forwardRef as n, useCallback as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { Popover as u } from "@base-ui/react/popover";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function ee(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var d = n(function({ onSearch: n, value: d, onValueChange: f, selectedOption: p, placeholder: m = "Buscar…", disabled: h, readOnly: g, size: _ = "md", debounceMs: v = 300, id: y, name: b, error: x = !1, required: S, onBlur: C, className: w, "aria-label": T, "aria-describedby": E, emptyMessage: D = "Sin resultados", loadingLabel: te = "Buscando…", clearLabel: ne = "Limpiar selección", container: re }, ie) {
	let [O, k] = s(!1), [A, j] = s(""), [M, N] = s(!1), [P, F] = s([]), [ae, I] = s(!1), [L, R] = s(-1), [z, B] = s(null), [V, H] = s(null), U = o(null), W = o(0), G = o(null), K = o(null), q = a(), oe = a(), J = d === void 0 ? z : d, se = p === void 0 ? V : p, Y = (e) => `${oe}-opt-${e}`, X = r(async (e) => {
		let t = ++W.current;
		N(!0), I(!1);
		try {
			let r = await n(e);
			if (t !== W.current) return;
			F(r), R(-1);
		} catch {
			if (t !== W.current) return;
			F([]), R(-1);
		} finally {
			t === W.current && (N(!1), I(!0));
		}
	}, [n]);
	i(() => () => {
		W.current += 1, U.current && clearTimeout(U.current);
	}, []);
	function ce(e) {
		let t = e.target.value;
		j(t), U.current && clearTimeout(U.current), U.current = setTimeout(() => void X(t), v);
	}
	function Z(e) {
		h || g || O || (e.preventDefault(), G.current?.focus(), R(-1), j(""), F([]), I(!1), k(!0), X(""));
	}
	function Q(e) {
		d === void 0 && (B(e.value), H(e)), f?.(e.value, e), k(!1), R(-1), j("");
	}
	function $() {
		d === void 0 && (B(null), H(null)), f?.(null, null), j(""), F([]), I(!1), G.current?.focus();
	}
	function le(e) {
		e.stopPropagation(), $();
	}
	function ue(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), O ? R((e) => Math.min(e + 1, P.length - 1)) : (k(!0), X(A))) : e.key === "ArrowUp" ? (e.preventDefault(), R((e) => Math.max(e - 1, -1))) : e.key === "Enter" && L >= 0 && P[L] ? (e.preventDefault(), Q(P[L])) : e.key === "Escape" ? (k(!1), j(""), R(-1)) : e.key === "Tab" ? (k(!1), R(-1)) : (e.key === "Backspace" || e.key === "Delete") && A === "" && J && !h && !g ? (e.preventDefault(), $()) : !O && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), j(e.key), k(!0), F([]), I(!1), U.current && clearTimeout(U.current), U.current = setTimeout(() => void X(e.key), v));
	}
	function de(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && K.current?.contains(e)) return;
			}
			k(!1), j(""), R(-1);
		}
	}
	let fe = O ? A : se?.label ?? "", pe = [
		"async-select",
		_ === "md" ? "" : `async-select--${_}`,
		h ? "async-select--disabled" : "",
		x ? "async-select--error" : "",
		w ?? ""
	].filter(Boolean).join(" "), me = ["async-select__content", _ === "md" ? "" : `async-select__content--${_}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(u.Root, {
		open: O,
		onOpenChange: de,
		children: [/* @__PURE__ */ l("div", {
			ref: K,
			className: pe,
			"data-popup-open": O || void 0,
			children: [
				/* @__PURE__ */ c("input", {
					ref: (e) => {
						G.current = e, ee(ie, e);
					},
					id: y,
					type: "text",
					className: "async-select__input",
					value: fe,
					onChange: ce,
					onPointerDown: Z,
					onKeyDown: ue,
					placeholder: m,
					disabled: h,
					readOnly: g,
					"aria-label": T,
					"aria-describedby": E,
					"aria-invalid": x || void 0,
					"aria-required": S || void 0,
					"aria-expanded": O,
					"aria-haspopup": "listbox",
					"aria-controls": O ? q : void 0,
					"aria-activedescendant": L >= 0 ? Y(L) : void 0,
					autoComplete: "off",
					role: "combobox",
					"aria-autocomplete": "list",
					onBlur: C
				}),
				b && /* @__PURE__ */ c("input", {
					type: "hidden",
					name: b,
					value: J ?? ""
				}),
				M && /* @__PURE__ */ c(t, {
					size: "sm",
					"aria-hidden": !0
				}),
				!M && J && !h && !g && /* @__PURE__ */ c("button", {
					type: "button",
					className: "async-select__clear",
					"aria-label": ne,
					tabIndex: -1,
					onMouseDown: le,
					children: /* @__PURE__ */ c(e, {
						name: "close",
						size: "xs"
					})
				})
			]
		}), /* @__PURE__ */ c(u.Portal, {
			container: re,
			children: /* @__PURE__ */ c(u.Positioner, {
				className: "async-select__positioner",
				anchor: K,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ c(u.Popup, {
					className: me,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ l("div", {
						role: "listbox",
						"aria-label": T ?? m,
						id: q,
						children: [
							M && /* @__PURE__ */ c("div", {
								className: "async-select__loading",
								children: /* @__PURE__ */ c(t, {
									size: "sm",
									label: te
								})
							}),
							!M && ae && P.length === 0 && /* @__PURE__ */ c("div", {
								className: "async-select__empty",
								children: D
							}),
							!M && P.map((e, t) => {
								let n = e.value === J, r = L === t;
								return /* @__PURE__ */ c("div", {
									id: Y(t),
									role: "option",
									"aria-selected": n,
									className: [
										"async-select__item",
										n ? "async-select__item--selected" : "",
										r ? "async-select__item--active" : ""
									].filter(Boolean).join(" "),
									onPointerDown: (e) => e.preventDefault(),
									onClick: () => Q(e),
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
