'use client';
import './otp-input.css';
import { Input as e } from "./input.js";
import { forwardRef as t, useCallback as n, useEffect as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/atoms/OtpInput/OtpInput.tsx
var c = t(function({ length: t, value: c, defaultValue: l, onChange: u, onComplete: d, disabled: f, readOnly: p, error: m = !1, size: h = "md", describedBy: g, "aria-describedby": _, "aria-label": v, "aria-labelledby": y, groupLabel: b = "Código de verificación", id: x, name: S, onBlur: C, className: w, digitLabel: T = (e, t) => `Dígito ${e} de ${t}` }, E) {
	let D = c !== void 0, [O, k] = a(() => {
		let e = l ?? "";
		return Array.from({ length: t }, (t, n) => e[n] ?? "");
	}), A = i(null), j = D ? Array.from({ length: t }, (e, t) => c[t] ?? "") : O;
	r(() => {
		if (D) return;
		let e = A.current?.closest("form");
		if (!e) return;
		let n = () => {
			let e = l ?? "";
			k(Array.from({ length: t }, (t, n) => e[n] ?? ""));
		};
		return e.addEventListener("reset", n), () => e.removeEventListener("reset", n);
	}, [
		D,
		l,
		t
	]);
	let M = n((e) => {
		let t = A.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), N = n((e) => {
		D || k(e);
		let n = e.join("");
		u?.(n), e.length === t && e.every((e) => e !== "") && d?.(n);
	}, [
		D,
		t,
		u,
		d
	]), P = n((e) => (n) => {
		let r = n.target.value.replace(/\D/g, "").slice(-1);
		if (!r) return;
		let i = [...j];
		i[e] = r, N(i), e < t - 1 && M(e + 1);
	}, [
		j,
		t,
		M,
		N
	]), F = n((e) => (n) => {
		if (n.key === "Backspace") {
			n.preventDefault();
			let t = [...j];
			t[e] === "" ? e > 0 && (t[e - 1] = "", N(t), M(e - 1)) : (t[e] = "", N(t));
		} else n.key === "ArrowLeft" ? (n.preventDefault(), e > 0 && M(e - 1)) : n.key === "ArrowRight" && (n.preventDefault(), e < t - 1 && M(e + 1));
	}, [
		j,
		t,
		M,
		N
	]), I = n((e) => (n) => {
		n.preventDefault();
		let r = n.clipboardData.getData("text").replace(/\D/g, "");
		if (!r) return;
		let i = [...j], a = e;
		for (let n = 0; n < r.length && e + n < t; n++) i[e + n] = r[n], a = e + n;
		N(i), M(Math.min(a + 1, t - 1));
	}, [
		j,
		t,
		M,
		N
	]);
	return /* @__PURE__ */ s("div", {
		ref: A,
		role: "group",
		"aria-label": y ? void 0 : v ?? b,
		"aria-labelledby": y,
		"aria-describedby": g ?? _,
		"aria-invalid": m || void 0,
		className: [
			"otp-input",
			h === "md" ? "" : `otp-input--${h}`,
			m ? "otp-input--error" : "",
			f ? "otp-input--disabled" : "",
			w ?? ""
		].filter(Boolean).join(" "),
		children: [Array.from({ length: t }, (n, r) => /* @__PURE__ */ o(e, {
			className: "otp-input__cell",
			ref: r === 0 ? E : void 0,
			id: x ? `${x}-${r}` : void 0,
			name: S ? `${S}-${r}` : void 0,
			type: "text",
			size: h,
			error: m,
			disabled: f,
			readOnly: p,
			"aria-describedby": r === 0 ? g ?? _ : void 0,
			inputMode: "numeric",
			pattern: "\\d*",
			maxLength: 1,
			autoComplete: r === 0 ? "one-time-code" : "off",
			"aria-label": T(r + 1, t),
			value: j[r],
			onChange: P(r),
			onKeyDown: F(r),
			onPaste: I(r),
			onBlur: C
		}, r)), S && /* @__PURE__ */ o("input", {
			type: "hidden",
			name: S,
			value: j.join("")
		})]
	});
});
//#endregion
export { c as OtpInput };
