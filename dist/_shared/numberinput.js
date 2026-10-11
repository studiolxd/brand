import '../numberinput.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { forwardRef as n, useCallback as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/messages/es/numberInput.ts
var s = {
	decrement: "Decrementar",
	increment: "Incrementar"
}, c = n(function({ value: n, defaultValue: c = 0, min: l, max: u, step: d = 1, decimal: f = !1, disabled: p = !1, readOnly: m = !1, size: h = "md", compact: g = !1, commitMode: _ = "change", error: v = !1, id: y, name: b, decrementLabel: x, incrementLabel: S, className: C, onChange: w, onEmpty: T, onBlur: E, onFocus: D, onKeyDown: O, "aria-describedby": k, ...A }, j) {
	let M = e("numberInput", s), N = n !== void 0, [P, F] = i(c), [I, L] = i(!1), [R, z] = i(null), B = N ? n : P, V = R === null ? B === null ? "" : String(B) : R, H = B ?? 0, U = r((e) => {
		let t = e;
		return l !== void 0 && (t = Math.max(l, t)), u !== void 0 && (t = Math.min(u, t)), t;
	}, [l, u]), W = r((e) => {
		let t = U(e);
		N || F(t), w?.(t);
	}, [
		U,
		N,
		w
	]), G = () => {
		p || m || (z(null), W(H - d));
	}, K = () => {
		p || m || (z(null), W(H + d));
	}, q = (e) => {
		let t = f ? e.replace(",", ".") : e, n = parseFloat(t);
		if (!isNaN(n)) {
			if (_ === "blur" && U(n) === B) return;
			W(n);
		} else if (T && e.trim() === "") {
			if (_ === "blur" && B === null) return;
			N || F(null), T();
		}
	}, J = (e) => {
		let t = e.target.value;
		z(t), _ === "change" && q(t);
	}, Y = (e) => {
		O?.(e), !(e.defaultPrevented || _ !== "blur" || R === null) && (e.key === "Enter" ? (q(R), z(null)) : e.key === "Escape" && (e.preventDefault(), z(null)));
	}, X = (e) => {
		L(!0), D?.(e);
	}, Z = (e) => {
		L(!1), _ === "blur" && R !== null && q(R), z(null), E?.(e);
	}, Q = [
		"number-input",
		g ? "number-input--compact" : h === "md" ? "" : `number-input--${h}`,
		v ? "number-input--error" : "",
		p ? "number-input--disabled" : "",
		I ? "number-input--focused" : "",
		C ?? ""
	].filter(Boolean).join(" "), $ = p || m || B !== null && l !== void 0 && B <= l, ee = p || m || B !== null && u !== void 0 && B >= u;
	return /* @__PURE__ */ o("div", {
		className: Q,
		children: [
			/* @__PURE__ */ a("button", {
				className: "number-input__btn number-input__btn--decrement",
				type: "button",
				onClick: G,
				disabled: $,
				"aria-label": M("decrement", x),
				tabIndex: -1,
				children: /* @__PURE__ */ a(t, {
					name: "minus",
					size: "sm"
				})
			}),
			/* @__PURE__ */ a("input", {
				ref: j,
				className: "number-input__field",
				type: "text",
				inputMode: f ? "decimal" : "numeric",
				pattern: f ? "[0-9]*[.,]?[0-9]*" : "[0-9]*",
				"aria-invalid": v || void 0,
				"aria-describedby": k,
				...A,
				id: y,
				name: b,
				value: V,
				disabled: p,
				readOnly: m,
				onChange: J,
				onKeyDown: Y,
				onFocus: X,
				onBlur: Z
			}),
			/* @__PURE__ */ a("button", {
				className: "number-input__btn number-input__btn--increment",
				type: "button",
				onClick: K,
				disabled: ee,
				"aria-label": M("increment", S),
				tabIndex: -1,
				children: /* @__PURE__ */ a(t, {
					name: "plus",
					size: "sm"
				})
			})
		]
	});
});
//#endregion
export { c as t };
