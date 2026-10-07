'use client';
import './otp-input.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Input as t } from "./input.js";
import { forwardRef as n, useCallback as r, useEffect as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/atoms/OtpInput/OtpInput.tsx
var l = n(function({ length: n, value: l, defaultValue: u, onChange: d, onComplete: f, disabled: p, readOnly: m, required: h, error: g = !1, size: _ = "md", describedBy: v, "aria-describedby": y, "aria-label": b, "aria-labelledby": x, groupLabel: S, id: C, name: w, onBlur: T, className: E, digitLabel: D }, O) {
	let k = e("otpInput"), A = l !== void 0, [j, M] = o(() => {
		let e = u ?? "";
		return Array.from({ length: n }, (t, n) => e[n] ?? "");
	}), N = a(null), P = A ? Array.from({ length: n }, (e, t) => l[t] ?? "") : j;
	i(() => {
		if (A) return;
		let e = N.current?.closest("form");
		if (!e) return;
		let t = () => {
			let e = u ?? "";
			M(Array.from({ length: n }, (t, n) => e[n] ?? ""));
		};
		return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
	}, [
		A,
		u,
		n
	]);
	let F = r((e) => {
		let t = N.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), I = r((e) => {
		A || M(e);
		let t = e.join("");
		d?.(t), e.length === n && e.every((e) => e !== "") && f?.(t);
	}, [
		A,
		n,
		d,
		f
	]), L = r((e) => (t) => {
		let r = t.target.value.replace(/\D/g, "").slice(-1);
		if (!r) return;
		let i = [...P];
		i[e] = r, I(i), e < n - 1 && F(e + 1);
	}, [
		P,
		n,
		F,
		I
	]), R = r((e) => (t) => {
		if (t.key === "Backspace") {
			t.preventDefault();
			let n = [...P];
			n[e] === "" ? e > 0 && (n[e - 1] = "", I(n), F(e - 1)) : (n[e] = "", I(n));
		} else t.key === "ArrowLeft" ? (t.preventDefault(), e > 0 && F(e - 1)) : t.key === "ArrowRight" && (t.preventDefault(), e < n - 1 && F(e + 1));
	}, [
		P,
		n,
		F,
		I
	]), z = r((e) => (t) => {
		t.preventDefault();
		let r = t.clipboardData.getData("text").replace(/\D/g, "");
		if (!r) return;
		let i = [...P], a = e;
		for (let t = 0; t < r.length && e + t < n; t++) i[e + t] = r[t], a = e + t;
		I(i), F(Math.min(a + 1, n - 1));
	}, [
		P,
		n,
		F,
		I
	]);
	return /* @__PURE__ */ c("div", {
		ref: N,
		role: "group",
		"aria-label": x ? void 0 : b ?? k("group", S),
		"aria-labelledby": x,
		"aria-describedby": v ?? y,
		"aria-invalid": g || void 0,
		className: [
			"otp-input",
			_ === "md" ? "" : `otp-input--${_}`,
			g ? "otp-input--error" : "",
			p ? "otp-input--disabled" : "",
			E ?? ""
		].filter(Boolean).join(" "),
		children: [Array.from({ length: n }, (e, r) => /* @__PURE__ */ s(t, {
			className: "otp-input__cell",
			ref: r === 0 ? O : void 0,
			id: C ? `${C}-${r}` : void 0,
			name: w ? `${w}-${r}` : void 0,
			type: "text",
			size: _,
			error: g,
			disabled: p,
			readOnly: m,
			required: h,
			"aria-describedby": r === 0 ? v ?? y : void 0,
			inputMode: "numeric",
			pattern: "\\d*",
			maxLength: 1,
			autoComplete: r === 0 ? "one-time-code" : "off",
			"aria-label": k("digit", D)(r + 1, n),
			value: P[r],
			onChange: L(r),
			onKeyDown: R(r),
			onPaste: z(r),
			onBlur: T
		}, r)), w && /* @__PURE__ */ s("input", {
			type: "hidden",
			name: w,
			value: P.join("")
		})]
	});
});
//#endregion
export { l as OtpInput };
