'use client';
import './otp-input.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Input as t } from "./input.js";
import { forwardRef as n, useCallback as r, useEffect as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/atoms/OtpInput/OtpInput.tsx
var l = n(function({ length: n, value: l, defaultValue: u, onChange: d, onComplete: f, disabled: p, readOnly: m, error: h = !1, size: g = "md", describedBy: _, "aria-describedby": v, "aria-label": y, "aria-labelledby": b, groupLabel: x, id: S, name: C, onBlur: w, className: T, digitLabel: E }, D) {
	let O = e("otpInput"), k = l !== void 0, [A, j] = o(() => {
		let e = u ?? "";
		return Array.from({ length: n }, (t, n) => e[n] ?? "");
	}), M = a(null), N = k ? Array.from({ length: n }, (e, t) => l[t] ?? "") : A;
	i(() => {
		if (k) return;
		let e = M.current?.closest("form");
		if (!e) return;
		let t = () => {
			let e = u ?? "";
			j(Array.from({ length: n }, (t, n) => e[n] ?? ""));
		};
		return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
	}, [
		k,
		u,
		n
	]);
	let P = r((e) => {
		let t = M.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), F = r((e) => {
		k || j(e);
		let t = e.join("");
		d?.(t), e.length === n && e.every((e) => e !== "") && f?.(t);
	}, [
		k,
		n,
		d,
		f
	]), I = r((e) => (t) => {
		let r = t.target.value.replace(/\D/g, "").slice(-1);
		if (!r) return;
		let i = [...N];
		i[e] = r, F(i), e < n - 1 && P(e + 1);
	}, [
		N,
		n,
		P,
		F
	]), L = r((e) => (t) => {
		if (t.key === "Backspace") {
			t.preventDefault();
			let n = [...N];
			n[e] === "" ? e > 0 && (n[e - 1] = "", F(n), P(e - 1)) : (n[e] = "", F(n));
		} else t.key === "ArrowLeft" ? (t.preventDefault(), e > 0 && P(e - 1)) : t.key === "ArrowRight" && (t.preventDefault(), e < n - 1 && P(e + 1));
	}, [
		N,
		n,
		P,
		F
	]), R = r((e) => (t) => {
		t.preventDefault();
		let r = t.clipboardData.getData("text").replace(/\D/g, "");
		if (!r) return;
		let i = [...N], a = e;
		for (let t = 0; t < r.length && e + t < n; t++) i[e + t] = r[t], a = e + t;
		F(i), P(Math.min(a + 1, n - 1));
	}, [
		N,
		n,
		P,
		F
	]);
	return /* @__PURE__ */ c("div", {
		ref: M,
		role: "group",
		"aria-label": b ? void 0 : y ?? O("group", x),
		"aria-labelledby": b,
		"aria-describedby": _ ?? v,
		"aria-invalid": h || void 0,
		className: [
			"otp-input",
			g === "md" ? "" : `otp-input--${g}`,
			h ? "otp-input--error" : "",
			p ? "otp-input--disabled" : "",
			T ?? ""
		].filter(Boolean).join(" "),
		children: [Array.from({ length: n }, (e, r) => /* @__PURE__ */ s(t, {
			className: "otp-input__cell",
			ref: r === 0 ? D : void 0,
			id: S ? `${S}-${r}` : void 0,
			name: C ? `${C}-${r}` : void 0,
			type: "text",
			size: g,
			error: h,
			disabled: p,
			readOnly: m,
			"aria-describedby": r === 0 ? _ ?? v : void 0,
			inputMode: "numeric",
			pattern: "\\d*",
			maxLength: 1,
			autoComplete: r === 0 ? "one-time-code" : "off",
			"aria-label": O("digit", E)(r + 1, n),
			value: N[r],
			onChange: I(r),
			onKeyDown: L(r),
			onPaste: R(r),
			onBlur: w
		}, r)), C && /* @__PURE__ */ s("input", {
			type: "hidden",
			name: C,
			value: N.join("")
		})]
	});
});
//#endregion
export { l as OtpInput };
