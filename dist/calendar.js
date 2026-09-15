'use client';
import './calendar.css';
import { a as e, c as t, i as n, l as r, n as i, o as a, r as o, s as ee, t as te } from "./_shared/calendargrid.js";
import { useCallback as s, useEffect as c, useId as ne, useRef as l, useState as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/molecules/Calendar/Calendar.tsx
var p = 12, m = 4;
function h(e) {
	return Math.floor(e / p) * p;
}
function g({ value: g, onChange: _, defaultMonth: v, month: y, onMonthChange: b, navigable: re = !0, disabledDates: x, minDate: S, maxDate: C, locale: w = "es-ES", previousMonthLabel: T = "Mes anterior", nextMonthLabel: ie = "Mes siguiente", previousYearsLabel: ae = "Años anteriores", nextYearsLabel: oe = "Años siguientes", yearGridLabel: se = "Elegir año", gridLabel: E, size: D = "md", className: O }) {
	let [k, A] = u(() => y ?? v ?? (g instanceof Date ? g : /* @__PURE__ */ new Date())), j = y ?? k, M = s((e) => {
		A(e), b?.(e);
	}, [b]), N = /* @__PURE__ */ new Date(), ce = s((e) => S && e < S || C && e > C ? !0 : Array.isArray(x) ? x.some((t) => n(t, e)) : typeof x == "function" ? x(e) : !1, [
		x,
		S,
		C
	]), P = r({
		month: j,
		onMonthChange: M,
		selected: g ?? null,
		minDate: S,
		maxDate: C
	}), [F, I] = u("days"), [L, R] = u(() => h(j.getFullYear())), [z, B] = u(() => j.getFullYear()), V = l(null), H = l(/* @__PURE__ */ new Map()), U = l(null), W = s(() => {
		let e = j.getFullYear();
		R(h(e)), B(e), U.current = "year", I("years");
	}, [j]), G = s(() => {
		U.current = "title", I("days");
	}, []), le = s((e) => {
		M(new Date(e, j.getMonth(), 1)), G();
	}, [
		G,
		j,
		M
	]);
	c(() => {
		if (!U.current) return;
		let e = U.current;
		U.current = null, e === "title" ? V.current?.focus() : H.current.get(z)?.focus();
	}, [F, z]);
	let ue = D === "sm" ? "xs" : D === "lg" ? "md" : "sm", de = new Intl.DateTimeFormat(w, {
		month: "long",
		year: "numeric"
	}).format(j), fe = new Intl.DateTimeFormat(w, { year: "numeric" }), K = (e) => fe.format(new Date(e, 0, 1)), pe = Array.from({ length: p }, (e, t) => L + t), me = `${K(L)}–${K(L + p - 1)}`, he = new Intl.DateTimeFormat(w, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), ge = o(w, "narrow"), _e = te(i(j)), q = t(j, -1), J = t(j, 1), Y = S ? !e(q, S) && q < S : !1, ve = C ? !e(J, C) && J > C : !1, ye = (e) => (S ? e < S.getFullYear() : !1) || (C ? e > C.getFullYear() : !1), be = S ? L - 1 < S.getFullYear() : !1, xe = C ? L + p > C.getFullYear() : !1, X = F === "years", Z = z >= L && z <= L + p - 1 ? z : L, Se = (e) => {
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
	return /* @__PURE__ */ f("div", {
		className: [
			"calendar",
			`calendar--${D}`,
			O
		].filter(Boolean).join(" "),
		children: [a({
			block: "calendar",
			title: X ? me : de,
			titleId: $,
			navigable: re,
			previousLabel: X ? ae : T,
			nextLabel: X ? oe : ie,
			prevDisabled: X ? be : Y,
			nextDisabled: X ? xe : ve,
			onPrev: X ? () => R(L - p) : () => M(q),
			onNext: X ? () => R(L + p) : () => M(J),
			chevronSize: ue,
			onTitleClick: X ? G : W,
			titleExpanded: X,
			titleRef: V
		}), X ? /* @__PURE__ */ d("div", {
			className: "calendar__years",
			role: "grid",
			"aria-label": se,
			onKeyDown: Ce,
			children: Array.from({ length: p / m }, (e, t) => /* @__PURE__ */ d("div", {
				role: "row",
				className: "calendar__row",
				children: pe.slice(t * m, t * m + m).map((e) => {
					let t = ye(e), n = e === N.getFullYear(), r = g instanceof Date ? g.getFullYear() === e : !1;
					return /* @__PURE__ */ d("button", {
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
						onClick: t ? void 0 : () => le(e),
						children: K(e)
					}, e);
				})
			}, t))
		}) : /* @__PURE__ */ f("div", {
			className: "calendar__grid",
			role: "grid",
			"aria-label": E,
			"aria-labelledby": E ? void 0 : $,
			onKeyDown: P.onKeyDown,
			children: [ee({
				block: "calendar",
				weekdays: ge
			}), _e.map((e, t) => /* @__PURE__ */ d("div", {
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
					return /* @__PURE__ */ d("button", {
						ref: P.cellRef(e),
						type: "button",
						role: "gridcell",
						className: o,
						"aria-label": he.format(e),
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
