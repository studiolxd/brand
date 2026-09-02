'use client';
import './calendar.css';
import { a as e, c as t, i as n, l as r, n as i, o as a, r as o, s, t as c } from "./_shared/calendarGrid.js";
import { useCallback as l, useId as u, useState as d } from "react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/stories/molecules/Calendar/Calendar.tsx
function m({ value: m, onChange: h, defaultMonth: g, month: _, onMonthChange: v, navigable: y = !0, disabledDates: b, minDate: x, maxDate: S, locale: C = "es-ES", previousMonthLabel: w = "Mes anterior", nextMonthLabel: T = "Mes siguiente", gridLabel: E, size: D = "md", className: O }) {
	let [k, A] = d(() => _ ?? g ?? (m instanceof Date ? m : /* @__PURE__ */ new Date())), j = _ ?? k, M = l((e) => {
		A(e), v?.(e);
	}, [v]), N = /* @__PURE__ */ new Date(), P = l((e) => x && e < x || S && e > S ? !0 : Array.isArray(b) ? b.some((t) => n(t, e)) : typeof b == "function" ? b(e) : !1, [
		b,
		x,
		S
	]), F = r({
		month: j,
		onMonthChange: M,
		selected: m ?? null,
		minDate: x,
		maxDate: S
	}), I = D === "sm" ? "xs" : D === "lg" ? "md" : "sm", L = new Intl.DateTimeFormat(C, {
		month: "long",
		year: "numeric"
	}).format(j), R = new Intl.DateTimeFormat(C, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), z = o(C, "narrow"), B = c(i(j)), V = t(j, -1), H = t(j, 1), U = x ? !e(V, x) && V < x : !1, W = S ? !e(H, S) && H > S : !1, G = `${u()}-calendar-title-${j.getFullYear()}-${j.getMonth()}`;
	return /* @__PURE__ */ p("div", {
		className: [
			"calendar",
			`calendar--${D}`,
			O
		].filter(Boolean).join(" "),
		children: [a({
			block: "calendar",
			title: L,
			titleId: G,
			navigable: y,
			previousMonthLabel: w,
			nextMonthLabel: T,
			prevDisabled: U,
			nextDisabled: W,
			onPrev: () => M(V),
			onNext: () => M(H),
			chevronSize: I
		}), /* @__PURE__ */ p("div", {
			className: "calendar__grid",
			role: "grid",
			"aria-label": E,
			"aria-labelledby": E ? void 0 : G,
			onKeyDown: F.onKeyDown,
			children: [s({
				block: "calendar",
				weekdays: z
			}), B.map((e, t) => /* @__PURE__ */ f("div", {
				role: "row",
				className: "calendar__row",
				children: e.map(({ date: e, outside: t }) => {
					let r = P(e), i = n(e, N), a = m instanceof Date ? n(e, m) : !1, o = [
						"calendar__day",
						t && "calendar__day--outside",
						i && "calendar__day--today",
						a && "calendar__day--selected",
						r && "calendar__day--disabled"
					].filter(Boolean).join(" ");
					return /* @__PURE__ */ f("button", {
						ref: F.cellRef(e),
						type: "button",
						role: "gridcell",
						className: o,
						"aria-label": R.format(e),
						"aria-selected": a,
						"aria-disabled": r ? "true" : void 0,
						"aria-current": i ? "date" : void 0,
						tabIndex: F.isTabbable(e) ? 0 : -1,
						onFocus: () => F.onCellFocus(e),
						onClick: r ? void 0 : () => h?.(e),
						children: e.getDate()
					}, e.toISOString());
				})
			}, t))]
		})]
	});
}
//#endregion
export { m as Calendar };
