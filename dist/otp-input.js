'use client';
import './otp-input.css';
import { Input as e } from "./input.js";
import { forwardRef as t, useCallback as n, useRef as r, useState as i } from "react";
import { jsx as a } from "react/jsx-runtime";
//#region src/stories/atoms/OtpInput/OtpInput.tsx
var o = t(function({ length: t, value: o, defaultValue: s, onChange: c, onComplete: l, disabled: u, readOnly: d, error: f = !1, size: p = "md", describedBy: m, "aria-describedby": h, "aria-label": g, "aria-labelledby": _, id: v, name: y, onBlur: b, className: x, digitLabel: S = (e, t) => `Dígito ${e} de ${t}` }, C) {
	let w = o !== void 0, [T, E] = i(() => {
		let e = s ?? "";
		return Array.from({ length: t }, (t, n) => e[n] ?? "");
	}), D = r(null), O = w ? Array.from({ length: t }, (e, t) => o[t] ?? "") : T, k = n((e) => {
		let t = D.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), A = n((e) => {
		w || E(e);
		let n = e.join("");
		c?.(n), e.length === t && e.every((e) => e !== "") && l?.(n);
	}, [
		w,
		t,
		c,
		l
	]), j = n((e) => (n) => {
		let r = n.target.value.replace(/\D/g, "").slice(-1);
		if (!r) return;
		let i = [...O];
		i[e] = r, A(i), e < t - 1 && k(e + 1);
	}, [
		O,
		t,
		k,
		A
	]), M = n((e) => (n) => {
		if (n.key === "Backspace") {
			n.preventDefault();
			let t = [...O];
			t[e] === "" ? e > 0 && (t[e - 1] = "", A(t), k(e - 1)) : (t[e] = "", A(t));
		} else n.key === "ArrowLeft" ? (n.preventDefault(), e > 0 && k(e - 1)) : n.key === "ArrowRight" && (n.preventDefault(), e < t - 1 && k(e + 1));
	}, [
		O,
		t,
		k,
		A
	]), N = n((e) => (n) => {
		n.preventDefault();
		let r = n.clipboardData.getData("text").replace(/\D/g, "");
		if (!r) return;
		let i = [...O], a = e;
		for (let n = 0; n < r.length && e + n < t; n++) i[e + n] = r[n], a = e + n;
		A(i), k(Math.min(a + 1, t - 1));
	}, [
		O,
		t,
		k,
		A
	]);
	return /* @__PURE__ */ a("div", {
		ref: D,
		role: "group",
		"aria-label": _ ? void 0 : g,
		"aria-labelledby": _,
		"aria-describedby": m ?? h,
		"aria-invalid": f || void 0,
		className: x,
		"data-otp-input": "",
		"data-size": p,
		"data-error": String(f),
		"data-disabled": String(!!u),
		children: Array.from({ length: t }, (n, r) => /* @__PURE__ */ a(e, {
			ref: r === 0 ? C : void 0,
			id: v ? `${v}-${r}` : void 0,
			name: y ? `${y}-${r}` : void 0,
			type: "text",
			size: p,
			error: f,
			disabled: u,
			readOnly: d,
			"aria-describedby": r === 0 ? m ?? h : void 0,
			inputMode: "numeric",
			pattern: "\\d*",
			maxLength: 1,
			autoComplete: r === 0 ? "one-time-code" : "off",
			"aria-label": S(r + 1, t),
			value: O[r],
			onChange: j(r),
			onKeyDown: M(r),
			onPaste: N(r),
			onBlur: b
		}, r))
	});
});
//#endregion
export { o as OtpInput };
