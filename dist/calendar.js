'use client';
import './calendar.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useCallback as r, useState as i } from "react";
//#region src/stories/molecules/Calendar/Calendar.tsx
function a(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function o(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth();
}
function s(e) {
	let t = new Date(e.getFullYear(), e.getMonth(), 1), n = t.getDay() - 1;
	n < 0 && (n = 6);
	let r = new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate(), i = Math.ceil((n + r) / 7) * 7, a = [];
	for (let e = n; e > 0; e--) {
		let n = new Date(t);
		n.setDate(n.getDate() - e), a.push({
			date: n,
			outside: !0
		});
	}
	for (let t = 1; t <= r; t++) a.push({
		date: new Date(e.getFullYear(), e.getMonth(), t),
		outside: !1
	});
	let o = i - a.length, s = a[a.length - 1].date;
	for (let e = 1; e <= o; e++) {
		let t = new Date(s);
		t.setDate(t.getDate() + e), a.push({
			date: t,
			outside: !0
		});
	}
	return a;
}
function c(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 7) t.push(e.slice(n, n + 7));
	return t;
}
function l({ value: l, onChange: u, defaultMonth: d, month: f, onMonthChange: p, navigable: m = !0, disabledDates: h, minDate: g, maxDate: _, locale: v = "es-ES", size: y = "md", className: b }) {
	let [x, S] = i(() => f ?? d ?? (l instanceof Date ? l : /* @__PURE__ */ new Date())), C = f ?? x, w = r((e) => {
		S(e), p?.(e);
	}, [p]), T = /* @__PURE__ */ new Date(), E = r((e) => g && e < g || _ && e > _ ? !0 : Array.isArray(h) ? h.some((t) => a(t, e)) : typeof h == "function" ? h(e) : !1, [
		h,
		g,
		_
	]), D = y === "sm" ? "xs" : y === "lg" ? "md" : "sm", O = new Intl.DateTimeFormat(v, {
		month: "long",
		year: "numeric"
	}).format(C), k = new Intl.DateTimeFormat(v, { weekday: "narrow" }), A = Array.from({ length: 7 }, (e, t) => {
		let n = new Date(2025, 0, 6 + t);
		return k.format(n);
	}), j = c(s(C)), M = new Date(C.getFullYear(), C.getMonth() - 1, 1), N = new Date(C.getFullYear(), C.getMonth() + 1, 1), P = g ? !o(M, g) && M < g : !1, F = _ ? !o(N, _) && N > _ : !1, I = `calendar-title-${C.getFullYear()}-${C.getMonth()}`;
	return /* @__PURE__ */ n("div", {
		className: [
			"calendar",
			`calendar--${y}`,
			b
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ n("div", {
			className: "calendar__header",
			children: [
				m && /* @__PURE__ */ t("button", {
					type: "button",
					className: "calendar__nav",
					"aria-label": "Mes anterior",
					disabled: P,
					onClick: () => w(M),
					children: /* @__PURE__ */ t(e, {
						name: "chevron",
						size: D,
						className: "calendar__chevron--prev"
					})
				}),
				/* @__PURE__ */ t("h2", {
					id: I,
					className: "calendar__title",
					"aria-live": "polite",
					children: O
				}),
				m && /* @__PURE__ */ t("button", {
					type: "button",
					className: "calendar__nav",
					"aria-label": "Mes siguiente",
					disabled: F,
					onClick: () => w(N),
					children: /* @__PURE__ */ t(e, {
						name: "chevron",
						size: D
					})
				})
			]
		}), /* @__PURE__ */ n("div", {
			className: "calendar__grid",
			role: "grid",
			"aria-labelledby": I,
			children: [/* @__PURE__ */ t("div", {
				role: "row",
				className: "calendar__row",
				children: A.map((e) => /* @__PURE__ */ t("div", {
					role: "columnheader",
					className: "calendar__weekday",
					"aria-label": e,
					children: e
				}, e))
			}), j.map((e, n) => /* @__PURE__ */ t("div", {
				role: "row",
				className: "calendar__row",
				children: e.map(({ date: e, outside: n }) => {
					let r = E(e), i = a(e, T), o = l instanceof Date ? a(e, l) : !1;
					return /* @__PURE__ */ t("button", {
						type: "button",
						role: "gridcell",
						className: [
							"calendar__day",
							n && "calendar__day--outside",
							i && "calendar__day--today",
							o && "calendar__day--selected",
							r && "calendar__day--disabled"
						].filter(Boolean).join(" "),
						"aria-selected": o,
						"aria-disabled": r ? "true" : void 0,
						"aria-current": i ? "date" : void 0,
						tabIndex: r ? -1 : 0,
						onClick: r ? void 0 : () => u?.(e),
						children: e.getDate()
					}, e.toISOString());
				})
			}, n))]
		})]
	});
}
//#endregion
export { l as Calendar };
