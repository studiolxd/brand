'use client';
import './async-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Spinner as n } from "./spinner.js";
import { forwardRef as r, useCallback as i, useEffect as a, useId as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
import { Popover as d } from "@base-ui/react/popover";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function ee(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var f = r(function({ onSearch: r, value: f, onValueChange: p, selectedOption: m, placeholder: h, disabled: g, readOnly: _, size: v = "md", debounceMs: y = 300, id: b, name: x, error: S = !1, required: te, onBlur: ne, className: C, "aria-label": w, "aria-describedby": T, emptyMessage: re, loadingLabel: ie, clearLabel: ae, container: E }, D) {
	let O = e("asyncSelect"), [k, A] = c(!1), [j, M] = c(""), [N, P] = c(!1), [F, I] = c([]), [oe, L] = c(!1), [R, z] = c(-1), [B, V] = c(null), [H, U] = c(null), W = s(null), G = s(0), K = s(null), q = s(null), J = o(), se = o(), Y = f === void 0 ? B : f, ce = m === void 0 ? H : m, X = (e) => `${se}-opt-${e}`, Z = i(async (e) => {
		let t = ++G.current;
		P(!0), L(!1);
		try {
			let n = await r(e);
			if (t !== G.current) return;
			I(n), z(-1);
		} catch {
			if (t !== G.current) return;
			I([]), z(-1);
		} finally {
			t === G.current && (P(!1), L(!0));
		}
	}, [r]);
	a(() => () => {
		G.current += 1, W.current && clearTimeout(W.current);
	}, []);
	function le(e) {
		let t = e.target.value;
		M(t), W.current && clearTimeout(W.current), W.current = setTimeout(() => void Z(t), y);
	}
	function ue(e) {
		g || _ || k || (e.preventDefault(), K.current?.focus(), z(-1), M(""), I([]), L(!1), A(!0), Z(""));
	}
	function Q(e) {
		f === void 0 && (V(e.value), U(e)), p?.(e.value, e), A(!1), z(-1), M("");
	}
	function $() {
		f === void 0 && (V(null), U(null)), p?.(null, null), M(""), I([]), L(!1), K.current?.focus();
	}
	function de(e) {
		e.stopPropagation(), $();
	}
	function fe(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), k ? z((e) => Math.min(e + 1, F.length - 1)) : (A(!0), Z(j))) : e.key === "ArrowUp" ? (e.preventDefault(), z((e) => Math.max(e - 1, -1))) : e.key === "Enter" && R >= 0 && F[R] ? (e.preventDefault(), Q(F[R])) : e.key === "Escape" ? (A(!1), M(""), z(-1)) : e.key === "Tab" ? (A(!1), z(-1)) : (e.key === "Backspace" || e.key === "Delete") && j === "" && Y && !g && !_ ? (e.preventDefault(), $()) : !k && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), M(e.key), A(!0), I([]), L(!1), W.current && clearTimeout(W.current), W.current = setTimeout(() => void Z(e.key), y));
	}
	function pe(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && q.current?.contains(e)) return;
			}
			A(!1), M(""), z(-1);
		}
	}
	let me = k ? j : ce?.label ?? "", he = [
		"async-select",
		v === "md" ? "" : `async-select--${v}`,
		g ? "async-select--disabled" : "",
		S ? "async-select--error" : "",
		C ?? ""
	].filter(Boolean).join(" "), ge = ["async-select__content", v === "md" ? "" : `async-select__content--${v}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(d.Root, {
		open: k,
		onOpenChange: pe,
		children: [/* @__PURE__ */ u("div", {
			ref: q,
			className: he,
			"data-popup-open": k || void 0,
			children: [
				/* @__PURE__ */ l("input", {
					ref: (e) => {
						K.current = e, ee(D, e);
					},
					id: b,
					type: "text",
					className: "async-select__input",
					value: me,
					onChange: le,
					onPointerDown: ue,
					onKeyDown: fe,
					placeholder: O("placeholder", h),
					disabled: g,
					readOnly: _,
					"aria-label": w,
					"aria-describedby": T,
					"aria-invalid": S || void 0,
					"aria-required": te || void 0,
					"aria-expanded": k,
					"aria-haspopup": "listbox",
					"aria-controls": k ? J : void 0,
					"aria-activedescendant": R >= 0 ? X(R) : void 0,
					autoComplete: "off",
					role: "combobox",
					"aria-autocomplete": "list",
					onBlur: ne
				}),
				x && /* @__PURE__ */ l("input", {
					type: "hidden",
					name: x,
					value: Y ?? ""
				}),
				N && /* @__PURE__ */ l(n, {
					size: "sm",
					"aria-hidden": !0
				}),
				!N && Y && !g && !_ && /* @__PURE__ */ l("button", {
					type: "button",
					className: "async-select__clear",
					"aria-label": O("clear", ae),
					tabIndex: -1,
					onMouseDown: de,
					children: /* @__PURE__ */ l(t, {
						name: "close",
						size: "xs"
					})
				})
			]
		}), /* @__PURE__ */ l(d.Portal, {
			container: E,
			children: /* @__PURE__ */ l(d.Positioner, {
				className: "async-select__positioner",
				anchor: q,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ l(d.Popup, {
					className: ge,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ u("div", {
						role: "listbox",
						"aria-label": w ?? O("placeholder", h),
						id: J,
						children: [
							N && /* @__PURE__ */ l("div", {
								className: "async-select__loading",
								children: /* @__PURE__ */ l(n, {
									size: "sm",
									label: O("loading", ie)
								})
							}),
							!N && oe && F.length === 0 && /* @__PURE__ */ l("div", {
								className: "async-select__empty",
								children: O("empty", re)
							}),
							!N && F.map((e, t) => {
								let n = e.value === Y, r = R === t;
								return /* @__PURE__ */ l("div", {
									id: X(t),
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
export { f as AsyncSelect };
