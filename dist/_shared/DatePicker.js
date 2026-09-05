import '../DatePicker.css';
import { Icon as e } from "../icon.js";
import { Input as t } from "../input.js";
import { Popover as n } from "../popover.js";
import { Calendar as r } from "../calendar.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useCallback as s, useId as c, useMemo as l, useRef as u, useState as d } from "react";
//#region src/stories/molecules/DatePicker/dateMask.ts
var f = {
	day: "dd",
	month: "mm",
	year: "aaaa"
}, p = /[‎‏؜]/g, m = new Date(2026, 8, 25);
function h(e, t) {
	return String(e).padStart(t, "0");
}
function g(e) {
	let t = new Intl.DateTimeFormat(e, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	}).formatToParts(m), n = t.filter((e) => e.type === "day" || e.type === "month" || e.type === "year").map((e) => e.type), r = t.find((e) => e.type === "literal" && e.value.replace(p, "").trim() !== "")?.value.replace(p, "").trim() || "/", i = {
		day: 2,
		month: 2,
		year: 4
	};
	function a(e) {
		let t = {
			day: e.getDate(),
			month: e.getMonth() + 1,
			year: e.getFullYear()
		};
		return n.map((e) => h(t[e], i[e])).join(r);
	}
	function o(e) {
		return n.map((t) => e[t]).join(r);
	}
	function s(e) {
		let t = e.replace(p, "").trim();
		if (/\p{L}/u.test(t)) return null;
		let r = t.split(/\D+/).filter(Boolean);
		if (r.length !== 3) return null;
		let i = {};
		if (n.forEach((e, t) => {
			i[e] = r[t];
		}), i.year.length !== 4 || i.day.length > 2 || i.month.length > 2) return null;
		let a = Number(i.year), o = Number(i.month), s = Number(i.day), c = new Date(a, o - 1, s);
		return c.getFullYear() !== a || c.getMonth() !== o - 1 || c.getDate() !== s ? null : c;
	}
	return {
		order: n,
		separator: r,
		format: a,
		mask: o,
		parse: s
	};
}
//#endregion
//#region src/stories/molecules/DatePicker/DatePicker.tsx
function _(e) {
	return `${String(e.getFullYear()).padStart(4, "0")}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
var v = o(function({ value: o, onChange: p, placeholder: m, maskLetters: h = f, invalidMessage: v = "Escribe una fecha completa, con el día, el mes y el año.", openCalendarLabel: y = "Abrir calendario", minDate: b, maxDate: x, disabledDates: S, size: C = "md", disabled: w, readOnly: T, error: E = !1, locale: D = "es-ES", id: O, name: k, describedBy: A, "aria-describedby": j, "aria-label": M, calendarLabel: N = "Calendario", onBlur: P, className: F }, I) {
	let [L, R] = d(!1), z = l(() => g(D), [D]), B = o instanceof Date ? z.format(o) : "", [V, H] = d(B), [U, W] = d(B);
	B !== U && (W(B), H(B));
	let G = u(null), K = s((e) => {
		G.current = e, typeof I == "function" ? I(e) : I && (I.current = e);
	}, [I]), q = V.trim(), J = q ? z.parse(V) : null, Y = q !== "" && !J, X = E || Y, Z = `${c()}-date-picker-invalid`, Q = [A ?? j, Y ? Z : void 0].filter(Boolean).join(" ") || void 0, $ = s((e) => {
		(T || w) && e || R(e);
	}, [w, T]), ee = s((e) => {
		let t = e.target.value;
		if (H(t), t.trim() === "") {
			p?.(null);
			return;
		}
		let n = z.parse(t);
		n && p?.(n);
	}, [z, p]), te = s((e) => {
		if (e.key === "ArrowDown" && !T && !w) {
			e.preventDefault(), R(!0);
			return;
		}
		e.key === "Escape" && L && (e.preventDefault(), R(!1));
	}, [
		w,
		L,
		T
	]), ne = s((e) => {
		H(z.format(e)), p?.(e), R(!1), requestAnimationFrame(() => G.current?.focus());
	}, [z, p]), re = /* @__PURE__ */ i("button", {
		type: "button",
		className: "date-picker__button",
		"aria-label": y,
		"aria-haspopup": "dialog",
		"aria-expanded": L,
		disabled: w,
		tabIndex: T ? -1 : void 0,
		children: /* @__PURE__ */ i(e, {
			name: "calendar",
			size: "sm",
			className: "date-picker__glyph"
		})
	});
	return /* @__PURE__ */ a("div", {
		className: [
			"date-picker",
			C === "md" ? "" : `date-picker--${C}`,
			F ?? ""
		].filter(Boolean).join(" "),
		children: [
			k && /* @__PURE__ */ i("input", {
				type: "hidden",
				name: k,
				value: o instanceof Date ? _(o) : ""
			}),
			/* @__PURE__ */ a("div", {
				className: "date-picker__control",
				children: [/* @__PURE__ */ i(t, {
					ref: K,
					id: O,
					className: "date-picker__input",
					type: "text",
					inputMode: "numeric",
					autoComplete: "off",
					size: C,
					error: X,
					value: V,
					placeholder: m ?? z.mask(h),
					disabled: w,
					readOnly: T,
					"aria-label": M,
					"aria-describedby": Q,
					onChange: ee,
					onKeyDown: te,
					onBlur: P
				}), /* @__PURE__ */ i(n, {
					trigger: re,
					label: N,
					open: L,
					onOpenChange: $,
					side: "bottom",
					align: "end",
					sideOffset: -1,
					className: "date-picker__popover",
					children: /* @__PURE__ */ i(r, {
						value: J ?? o ?? null,
						onChange: ne,
						gridLabel: N,
						minDate: b,
						maxDate: x,
						disabledDates: S,
						locale: D,
						size: C
					})
				})]
			}),
			Y && /* @__PURE__ */ i("span", {
				id: Z,
				className: "date-picker__message",
				role: "alert",
				children: v
			})
		]
	});
});
//#endregion
export { v as t };
