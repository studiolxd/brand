'use client';
import './otp-input.css';
import { Input as e } from "./input.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r, useCallback as i, useEffect as a, useRef as o, useState as s } from "react";
//#region src/stories/atoms/OtpInput/OtpInput.tsx
var c = r(function({ length: r, value: c, defaultValue: l, onChange: u, onComplete: d, disabled: f, readOnly: p, error: m = !1, size: h = "md", describedBy: g, "aria-describedby": _, "aria-label": v, "aria-labelledby": y, groupLabel: b = "Código de verificación", id: x, name: S, onBlur: C, className: w, digitLabel: T = (e, t) => `Dígito ${e} de ${t}` }, E) {
	let D = c !== void 0, [O, k] = s(() => {
		let e = l ?? "";
		return Array.from({ length: r }, (t, n) => e[n] ?? "");
	}), A = o(null), j = D ? Array.from({ length: r }, (e, t) => c[t] ?? "") : O;
	a(() => {
		if (D) return;
		let e = A.current?.closest("form");
		if (!e) return;
		let t = () => {
			let e = l ?? "";
			k(Array.from({ length: r }, (t, n) => e[n] ?? ""));
		};
		return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
	}, [
		D,
		l,
		r
	]);
	let M = i((e) => {
		let t = A.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), N = i((e) => {
		D || k(e);
		let t = e.join("");
		u?.(t), e.length === r && e.every((e) => e !== "") && d?.(t);
	}, [
		D,
		r,
		u,
		d
	]), P = i((e) => (t) => {
		let n = t.target.value.replace(/\D/g, "").slice(-1);
		if (!n) return;
		let i = [...j];
		i[e] = n, N(i), e < r - 1 && M(e + 1);
	}, [
		j,
		r,
		M,
		N
	]), F = i((e) => (t) => {
		if (t.key === "Backspace") {
			t.preventDefault();
			let n = [...j];
			n[e] === "" ? e > 0 && (n[e - 1] = "", N(n), M(e - 1)) : (n[e] = "", N(n));
		} else t.key === "ArrowLeft" ? (t.preventDefault(), e > 0 && M(e - 1)) : t.key === "ArrowRight" && (t.preventDefault(), e < r - 1 && M(e + 1));
	}, [
		j,
		r,
		M,
		N
	]), I = i((e) => (t) => {
		t.preventDefault();
		let n = t.clipboardData.getData("text").replace(/\D/g, "");
		if (!n) return;
		let i = [...j], a = e;
		for (let t = 0; t < n.length && e + t < r; t++) i[e + t] = n[t], a = e + t;
		N(i), M(Math.min(a + 1, r - 1));
	}, [
		j,
		r,
		M,
		N
	]);
	return /* @__PURE__ */ n("div", {
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
		children: [Array.from({ length: r }, (n, i) => /* @__PURE__ */ t(e, {
			className: "otp-input__cell",
			ref: i === 0 ? E : void 0,
			id: x ? `${x}-${i}` : void 0,
			name: S ? `${S}-${i}` : void 0,
			type: "text",
			size: h,
			error: m,
			disabled: f,
			readOnly: p,
			"aria-describedby": i === 0 ? g ?? _ : void 0,
			inputMode: "numeric",
			pattern: "\\d*",
			maxLength: 1,
			autoComplete: i === 0 ? "one-time-code" : "off",
			"aria-label": T(i + 1, r),
			value: j[i],
			onChange: P(i),
			onKeyDown: F(i),
			onPaste: I(i),
			onBlur: C
		}, i)), S && /* @__PURE__ */ t("input", {
			type: "hidden",
			name: S,
			value: j.join("")
		})]
	});
});
//#endregion
export { c as OtpInput };
