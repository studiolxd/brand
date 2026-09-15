'use client';
import './async-select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Spinner as n } from "./spinner.js";
import { n as r } from "./_shared/portal-container.js";
import { forwardRef as i, useCallback as ee, useEffect as a, useId as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
import { Popover as d } from "@base-ui/react/popover";
//#region src/stories/atoms/AsyncSelect/AsyncSelect.tsx
function f(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var p = i(function({ onSearch: i, value: p, onValueChange: m, selectedOption: h, placeholder: g, disabled: _, readOnly: v, size: y = "md", debounceMs: b = 300, id: x, name: S, error: C = !1, required: te, onBlur: ne, className: w, "aria-label": T, "aria-describedby": re, emptyMessage: E, loadingLabel: D, clearLabel: ie, container: ae }, oe) {
	let O = e("asyncSelect"), se = r(ae), [k, A] = c(!1), [j, M] = c(""), [N, P] = c(!1), [F, I] = c([]), [ce, L] = c(!1), [R, z] = c(-1), [B, V] = c(null), [H, U] = c(null), W = s(null), G = s(0), K = s(null), q = s(null), J = o(), le = o(), Y = p === void 0 ? B : p, ue = h === void 0 ? H : h, X = (e) => `${le}-opt-${e}`, Z = ee(async (e) => {
		let t = ++G.current;
		P(!0), L(!1);
		try {
			let n = await i(e);
			if (t !== G.current) return;
			I(n), z(-1);
		} catch {
			if (t !== G.current) return;
			I([]), z(-1);
		} finally {
			t === G.current && (P(!1), L(!0));
		}
	}, [i]);
	a(() => () => {
		G.current += 1, W.current && clearTimeout(W.current);
	}, []);
	function de(e) {
		let t = e.target.value;
		M(t), W.current && clearTimeout(W.current), W.current = setTimeout(() => void Z(t), b);
	}
	function fe(e) {
		_ || v || k || (e.preventDefault(), K.current?.focus(), z(-1), M(""), I([]), L(!1), A(!0), Z(""));
	}
	function Q(e) {
		p === void 0 && (V(e.value), U(e)), m?.(e.value, e), A(!1), z(-1), M("");
	}
	function $() {
		p === void 0 && (V(null), U(null)), m?.(null, null), M(""), I([]), L(!1), K.current?.focus();
	}
	function pe(e) {
		e.stopPropagation(), $();
	}
	function me(e) {
		e.key === "ArrowDown" ? (e.preventDefault(), k ? z((e) => Math.min(e + 1, F.length - 1)) : (A(!0), Z(j))) : e.key === "ArrowUp" ? (e.preventDefault(), z((e) => Math.max(e - 1, -1))) : e.key === "Enter" && R >= 0 && F[R] ? (e.preventDefault(), Q(F[R])) : e.key === "Escape" ? (A(!1), M(""), z(-1)) : e.key === "Tab" ? (A(!1), z(-1)) : (e.key === "Backspace" || e.key === "Delete") && j === "" && Y && !_ && !v ? (e.preventDefault(), $()) : !k && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && (e.preventDefault(), M(e.key), A(!0), I([]), L(!1), W.current && clearTimeout(W.current), W.current = setTimeout(() => void Z(e.key), b));
	}
	function he(e, t) {
		if (!e) {
			if (t.reason === "outside-press") {
				let e = t.event?.target;
				if (e instanceof Node && q.current?.contains(e)) return;
			}
			A(!1), M(""), z(-1);
		}
	}
	let ge = k ? j : ue?.label ?? "", _e = [
		"async-select",
		y === "md" ? "" : `async-select--${y}`,
		_ ? "async-select--disabled" : "",
		C ? "async-select--error" : "",
		w ?? ""
	].filter(Boolean).join(" "), ve = ["async-select__content", y === "md" ? "" : `async-select__content--${y}`].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(d.Root, {
		open: k,
		onOpenChange: he,
		children: [/* @__PURE__ */ u("div", {
			ref: q,
			className: _e,
			"data-popup-open": k || void 0,
			children: [
				/* @__PURE__ */ l("input", {
					ref: (e) => {
						K.current = e, f(oe, e);
					},
					id: x,
					type: "text",
					className: "async-select__input",
					value: ge,
					onChange: de,
					onPointerDown: fe,
					onKeyDown: me,
					placeholder: O("placeholder", g),
					disabled: _,
					readOnly: v,
					"aria-label": T,
					"aria-describedby": re,
					"aria-invalid": C || void 0,
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
				S && /* @__PURE__ */ l("input", {
					type: "hidden",
					name: S,
					value: Y ?? ""
				}),
				N && /* @__PURE__ */ l(n, {
					size: "sm",
					"aria-hidden": !0
				}),
				!N && Y && !_ && !v && /* @__PURE__ */ l("button", {
					type: "button",
					className: "async-select__clear",
					"aria-label": O("clear", ie),
					tabIndex: -1,
					onMouseDown: pe,
					children: /* @__PURE__ */ l(t, {
						name: "close",
						size: "xs"
					})
				})
			]
		}), /* @__PURE__ */ l(d.Portal, {
			container: se,
			children: /* @__PURE__ */ l(d.Positioner, {
				className: "async-select__positioner",
				anchor: q,
				align: "start",
				sideOffset: -1,
				children: /* @__PURE__ */ l(d.Popup, {
					className: ve,
					initialFocus: !1,
					finalFocus: !1,
					children: /* @__PURE__ */ u("div", {
						role: "listbox",
						"aria-label": T ?? O("placeholder", g),
						id: J,
						children: [
							N && /* @__PURE__ */ l("div", {
								className: "async-select__loading",
								children: /* @__PURE__ */ l(n, {
									size: "sm",
									label: O("loading", D)
								})
							}),
							!N && ce && F.length === 0 && /* @__PURE__ */ l("div", {
								className: "async-select__empty",
								children: O("empty", E)
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
export { p as AsyncSelect };
