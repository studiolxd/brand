'use client';
import './calendar.css';
import { a as e, c as t, i as n, l as r, n as i, o as a, r as o, s as ee, t as s } from "./_shared/calendarGrid.js";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { useCallback as u, useEffect as te, useId as ne, useRef as d, useState as f } from "react";
//#region src/stories/molecules/Calendar/Calendar.tsx
var p = 12, m = 4;
function h(e) {
	return Math.floor(e / p) * p;
}
function g({ value: g, onChange: _, defaultMonth: v, month: y, onMonthChange: b, navigable: re = !0, disabledDates: x, minDate: S, maxDate: C, locale: w = "es-ES", previousMonthLabel: ie = "Mes anterior", nextMonthLabel: ae = "Mes siguiente", previousYearsLabel: T = "Años anteriores", nextYearsLabel: E = "Años siguientes", yearGridLabel: oe = "Elegir año", gridLabel: D, size: O = "md", className: k }) {
	let [A, se] = f(() => y ?? v ?? (g instanceof Date ? g : /* @__PURE__ */ new Date())), j = y ?? A, M = u((e) => {
		se(e), b?.(e);
	}, [b]), N = /* @__PURE__ */ new Date(), ce = u((e) => S && e < S || C && e > C ? !0 : Array.isArray(x) ? x.some((t) => n(t, e)) : typeof x == "function" ? x(e) : !1, [
		x,
		S,
		C
	]), P = r({
		month: j,
		onMonthChange: M,
		selected: g ?? null,
		minDate: S,
		maxDate: C
	}), [F, I] = f("days"), [L, R] = f(() => h(j.getFullYear())), [z, B] = f(() => j.getFullYear()), V = d(null), H = d(/* @__PURE__ */ new Map()), U = d(null), W = u(() => {
		let e = j.getFullYear();
		R(h(e)), B(e), U.current = "year", I("years");
	}, [j]), G = u(() => {
		U.current = "title", I("days");
	}, []), K = u((e) => {
		M(new Date(e, j.getMonth(), 1)), G();
	}, [
		G,
		j,
		M
	]);
	te(() => {
		if (!U.current) return;
		let e = U.current;
		U.current = null, e === "title" ? V.current?.focus() : H.current.get(z)?.focus();
	}, [F, z]);
	let le = O === "sm" ? "xs" : O === "lg" ? "md" : "sm", ue = new Intl.DateTimeFormat(w, {
		month: "long",
		year: "numeric"
	}).format(j), de = new Intl.DateTimeFormat(w, { year: "numeric" }), q = (e) => de.format(new Date(e, 0, 1)), fe = Array.from({ length: p }, (e, t) => L + t), pe = `${q(L)}–${q(L + p - 1)}`, me = new Intl.DateTimeFormat(w, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), he = o(w, "narrow"), ge = s(i(j)), J = t(j, -1), Y = t(j, 1), _e = S ? !e(J, S) && J < S : !1, ve = C ? !e(Y, C) && Y > C : !1, ye = (e) => (S ? e < S.getFullYear() : !1) || (C ? e > C.getFullYear() : !1), be = S ? L - 1 < S.getFullYear() : !1, xe = C ? L + p > C.getFullYear() : !1, X = F === "years", Z = z >= L && z <= L + p - 1 ? z : L, Se = (e) => {
		(e < L || e > L + p - 1) && R(h(e)), U.current = "year", B(e);
	}, Ce = (e) => {
		let t = null;
		switch (e.key) {
			case "ArrowLeft":
				t = Z - 1;
				break;
			case "ArrowRight":
				t = Z + 1;
				break;
			case "ArrowUp":
				t = Z - m;
				break;
			case "ArrowDown":
				t = Z + m;
				break;
			case "Home":
				t = L;
				break;
			case "End":
				t = L + p - 1;
				break;
			case "PageUp":
				t = Z - p;
				break;
			case "PageDown":
				t = Z + p;
				break;
			case "Escape":
				e.preventDefault(), G();
				return;
			default: return;
		}
		e.preventDefault(), Se(t);
	}, Q = ne(), $ = X ? `${Q}-calendar-title-${L}` : `${Q}-calendar-title-${j.getFullYear()}-${j.getMonth()}`;
	return /* @__PURE__ */ l("div", {
		className: [
			"calendar",
			`calendar--${O}`,
			k
		].filter(Boolean).join(" "),
		children: [a({
			block: "calendar",
			title: X ? pe : ue,
			titleId: $,
			navigable: re,
			previousLabel: X ? T : ie,
			nextLabel: X ? E : ae,
			prevDisabled: X ? be : _e,
			nextDisabled: X ? xe : ve,
			onPrev: X ? () => R(L - p) : () => M(J),
			onNext: X ? () => R(L + p) : () => M(Y),
			chevronSize: le,
			onTitleClick: X ? G : W,
			titleExpanded: X,
			titleRef: V
		}), X ? /* @__PURE__ */ c("div", {
			className: "calendar__years",
			role: "grid",
			"aria-label": oe,
			onKeyDown: Ce,
			children: Array.from({ length: p / m }, (e, t) => /* @__PURE__ */ c("div", {
				role: "row",
				className: "calendar__row",
				children: fe.slice(t * m, t * m + m).map((e) => {
					let t = ye(e), n = e === N.getFullYear(), r = g instanceof Date ? g.getFullYear() === e : !1;
					return /* @__PURE__ */ c("button", {
						ref: (t) => {
							t ? H.current.set(e, t) : H.current.delete(e);
						},
						type: "button",
						role: "gridcell",
						className: [
							"calendar__year",
							n && "calendar__year--current",
							r && "calendar__year--selected",
							t && "calendar__year--disabled"
						].filter(Boolean).join(" "),
						"aria-selected": r,
						"aria-disabled": t ? "true" : void 0,
						"aria-current": n ? "date" : void 0,
						tabIndex: e === Z ? 0 : -1,
						onFocus: () => B(e),
						onClick: t ? void 0 : () => K(e),
						children: q(e)
					}, e);
				})
			}, t))
		}) : /* @__PURE__ */ l("div", {
			className: "calendar__grid",
			role: "grid",
			"aria-label": D,
			"aria-labelledby": D ? void 0 : $,
			onKeyDown: P.onKeyDown,
			children: [ee({
				block: "calendar",
				weekdays: he
			}), ge.map((e, t) => /* @__PURE__ */ c("div", {
				role: "row",
				className: "calendar__row",
				children: e.map(({ date: e, outside: t }) => {
					let r = ce(e), i = n(e, N), a = g instanceof Date ? n(e, g) : !1, o = [
						"calendar__day",
						t && "calendar__day--outside",
						i && "calendar__day--today",
						a && "calendar__day--selected",
						r && "calendar__day--disabled"
					].filter(Boolean).join(" ");
					return /* @__PURE__ */ c("button", {
						ref: P.cellRef(e),
						type: "button",
						role: "gridcell",
						className: o,
						"aria-label": me.format(e),
						"aria-selected": a,
						"aria-disabled": r ? "true" : void 0,
						"aria-current": i ? "date" : void 0,
						tabIndex: P.isTabbable(e) ? 0 : -1,
						onFocus: () => P.onCellFocus(e),
						onClick: r ? void 0 : () => _?.(e),
						children: e.getDate()
					}, e.toISOString());
				})
			}, t))]
		})]
	});
}
//#endregion
export { g as Calendar };
