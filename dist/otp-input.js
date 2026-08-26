'use client';
import './otp-input.css';
import { Input as e } from "./input.js";
import { useCallback as t, useRef as n, useState as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/stories/atoms/OtpInput/OtpInput.tsx
function a({ length: a, value: o, defaultValue: s, onChange: c, onComplete: l, disabled: u, readOnly: d, error: f = !1, size: p = "md", describedBy: m, id: h, name: g }) {
	let _ = o !== void 0, [v, y] = r(() => {
		let e = s ?? "";
		return Array.from({ length: a }, (t, n) => e[n] ?? "");
	}), b = n(null), x = _ ? Array.from({ length: a }, (e, t) => o[t] ?? "") : v, S = t((e) => {
		let t = b.current?.querySelectorAll("input");
		t?.[e] && t[e].focus();
	}, []), C = t((e) => {
		_ || y(e);
		let t = e.join("");
		c?.(t), e.length === a && e.every((e) => e !== "") && l?.(t);
	}, [
		_,
		a,
		c,
		l
	]), w = t((e) => (t) => {
		let n = t.target.value.replace(/\D/g, "").slice(-1);
		if (!n) return;
		let r = [...x];
		r[e] = n, C(r), e < a - 1 && S(e + 1);
	}, [
		x,
		a,
		S,
		C
	]), T = t((e) => (t) => {
		if (t.key === "Backspace") {
			t.preventDefault();
			let n = [...x];
			n[e] === "" ? e > 0 && (n[e - 1] = "", C(n), S(e - 1)) : (n[e] = "", C(n));
		} else t.key === "ArrowLeft" ? (t.preventDefault(), e > 0 && S(e - 1)) : t.key === "ArrowRight" && (t.preventDefault(), e < a - 1 && S(e + 1));
	}, [
		x,
		a,
		S,
		C
	]), E = t((e) => (t) => {
		t.preventDefault();
		let n = t.clipboardData.getData("text").replace(/\D/g, "");
		if (!n) return;
		let r = [...x], i = e;
		for (let t = 0; t < n.length && e + t < a; t++) r[e + t] = n[t], i = e + t;
		C(r), S(Math.min(i + 1, a - 1));
	}, [
		x,
		a,
		S,
		C
	]);
	return /* @__PURE__ */ i("div", {
		ref: b,
		role: "group",
		"aria-describedby": m,
		"data-otp-input": "",
		"data-size": p,
		"data-error": String(f),
		"data-disabled": String(!!u),
		children: Array.from({ length: a }, (t, n) => /* @__PURE__ */ i(e, {
			id: h ? `${h}-${n}` : void 0,
			name: g ? `${g}-${n}` : void 0,
			type: "text",
			size: p,
			error: f,
			disabled: u,
			readOnly: d,
			describedBy: n === 0 ? m : void 0,
			inputMode: "numeric",
			pattern: "\\d*",
			maxLength: 1,
			autoComplete: n === 0 ? "one-time-code" : "off",
			ariaLabel: `Dígito ${n + 1} de ${a}`,
			value: x[n],
			onChange: w(n),
			onKeyDown: T(n),
			onPaste: E(n)
		}, n))
	});
}
//#endregion
export { a as OtpInput };
