'use client';
import './calendar.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { a as t, c as n, f as r, i, l as a, m as o, n as ee, o as s, s as te, t as c } from "./_shared/calendargrid.js";
import { useCallback as l, useEffect as u, useId as ne, useRef as d, useState as f } from "react";
import { jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/stories/molecules/Calendar/Calendar.tsx
var h = 12, g = 4;
function _(e) {
	return Math.floor(e / h) * h;
}
function v({ value: v, onChange: y, defaultMonth: re, month: b, onMonthChange: x, navigable: S = !0, disabledDates: C, minDate: w, maxDate: T, locale: E = "es-ES", previousMonthLabel: ie, nextMonthLabel: D, previousYearsLabel: O, nextYearsLabel: ae, yearGridLabel: oe, gridLabel: k, today: se, size: A = "md", className: j }) {
	let M = e("calendar"), N = o(se), [ce, le] = f(() => b ?? re ?? (v instanceof Date ? v : N)), P = b ?? ce, F = l((e) => {
		le(e), x?.(e);
	}, [x]), ue = l((e) => w && e < w || T && e > T ? !0 : Array.isArray(C) ? C.some((n) => t(n, e)) : typeof C == "function" ? C(e) : !1, [
		C,
		w,
		T
	]), I = r({
		month: P,
		onMonthChange: F,
		selected: v ?? null,
		today: N,
		minDate: w,
		maxDate: T
	}), [L, R] = f("days"), [z, B] = f(() => _(P.getFullYear())), [V, H] = f(() => P.getFullYear()), U = d(null), W = d(/* @__PURE__ */ new Map()), G = d(null), de = l(() => {
		let e = P.getFullYear();
		B(_(e)), H(e), G.current = "year", R("years");
	}, [P]), K = l(() => {
		G.current = "title", R("days");
	}, []), fe = l((e) => {
		F(new Date(e, P.getMonth(), 1)), K();
	}, [
		K,
		P,
		F
	]);
	u(() => {
		if (!G.current) return;
		let e = G.current;
		G.current = null, e === "title" ? U.current?.focus() : W.current.get(V)?.focus();
	}, [L, V]);
	let pe = A === "lg" ? "md" : "sm", me = new Intl.DateTimeFormat(E, {
		month: "long",
		year: "numeric"
	}).format(P), he = new Intl.DateTimeFormat(E, { year: "numeric" }), q = (e) => he.format(new Date(e, 0, 1)), ge = Array.from({ length: h }, (e, t) => z + t), _e = `${q(z)}–${q(z + h - 1)}`, ve = new Intl.DateTimeFormat(E, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}), ye = i(E, "narrow"), be = c(ee(P)), J = a(P, -1), Y = a(P, 1), xe = w ? !s(J, w) && J < w : !1, Se = T ? !s(Y, T) && Y > T : !1, Ce = (e) => (w ? e < w.getFullYear() : !1) || (T ? e > T.getFullYear() : !1), we = w ? z - 1 < w.getFullYear() : !1, Te = T ? z + h > T.getFullYear() : !1, X = L === "years", Z = V >= z && V <= z + h - 1 ? V : z, Ee = (e) => {
		(e < z || e > z + h - 1) && B(_(e)), G.current = "year", H(e);
	}, De = (e) => {
		let t = null;
		switch (e.key) {
			case "ArrowLeft":
				t = Z - 1;
				break;
			case "ArrowRight":
				t = Z + 1;
				break;
			case "ArrowUp":
				t = Z - g;
				break;
			case "ArrowDown":
				t = Z + g;
				break;
			case "Home":
				t = z;
				break;
			case "End":
				t = z + h - 1;
				break;
			case "PageUp":
				t = Z - h;
				break;
			case "PageDown":
				t = Z + h;
				break;
			case "Escape":
				e.preventDefault(), K();
				return;
			default: return;
		}
		e.preventDefault(), Ee(t);
	}, Q = ne(), $ = X ? `${Q}-calendar-title-${z}` : `${Q}-calendar-title-${P.getFullYear()}-${P.getMonth()}`;
	return /* @__PURE__ */ m("div", {
		className: [
			"calendar",
			`calendar--${A}`,
			j
		].filter(Boolean).join(" "),
		children: [te({
			block: "calendar",
			title: X ? _e : me,
			titleId: $,
			navigable: S,
			previousLabel: S ? X ? M("previousYears", O) : M("previousMonth", ie) : void 0,
			nextLabel: S ? X ? M("nextYears", ae) : M("nextMonth", D) : void 0,
			prevDisabled: X ? we : xe,
			nextDisabled: X ? Te : Se,
			onPrev: X ? () => B(z - h) : () => F(J),
			onNext: X ? () => B(z + h) : () => F(Y),
			chevronSize: pe,
			onTitleClick: X ? K : de,
			titleExpanded: X,
			titleRef: U
		}), X ? /* @__PURE__ */ p("div", {
			className: "calendar__years",
			role: "grid",
			"aria-label": M("yearGrid", oe),
			onKeyDown: De,
			children: Array.from({ length: h / g }, (e, t) => /* @__PURE__ */ p("div", {
				role: "row",
				className: "calendar__row",
				children: ge.slice(t * g, t * g + g).map((e) => {
					let t = Ce(e), n = e === N.getFullYear(), r = v instanceof Date ? v.getFullYear() === e : !1;
					return /* @__PURE__ */ p("button", {
						ref: (t) => {
							t ? W.current.set(e, t) : W.current.delete(e);
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
						onFocus: () => H(e),
						onClick: t ? void 0 : () => fe(e),
						children: q(e)
					}, e);
				})
			}, t))
		}) : /* @__PURE__ */ m("div", {
			className: "calendar__grid",
			role: "grid",
			"aria-label": k,
			"aria-labelledby": k ? void 0 : $,
			onKeyDown: I.onKeyDown,
			children: [n({
				block: "calendar",
				weekdays: ye
			}), be.map((e, n) => /* @__PURE__ */ p("div", {
				role: "row",
				className: "calendar__row",
				children: e.map(({ date: e, outside: n }) => {
					let r = ue(e), i = t(e, N), a = v instanceof Date ? t(e, v) : !1, o = [
						"calendar__day",
						n && "calendar__day--outside",
						i && "calendar__day--today",
						a && "calendar__day--selected",
						r && "calendar__day--disabled"
					].filter(Boolean).join(" ");
					return /* @__PURE__ */ p("button", {
						ref: I.cellRef(e),
						type: "button",
						role: "gridcell",
						className: o,
						"aria-label": ve.format(e),
						"aria-selected": a,
						"aria-disabled": r ? "true" : void 0,
						"aria-current": i ? "date" : void 0,
						tabIndex: I.isTabbable(e) ? 0 : -1,
						onFocus: () => I.onCellFocus(e),
						onClick: r ? void 0 : () => y?.(e),
						children: e.getDate()
					}, e.toISOString());
				})
			}, n))]
		})]
	});
}
//#endregion
export { v as Calendar };
