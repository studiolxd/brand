import { Icon as e } from "../icon.js";
import { useCallback as t, useEffect as n, useMemo as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/_shared/calendarGrid.tsx
function c(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function l(e, t) {
	return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth();
}
function u(e, t) {
	return new Date(e.getFullYear(), e.getMonth() + t, 1);
}
function d(e) {
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
function f(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 7) t.push(e.slice(n, n + 7));
	return t;
}
function p(e, t = "narrow") {
	let n = new Intl.DateTimeFormat(e, { weekday: t }), r = new Intl.DateTimeFormat(e, { weekday: "long" });
	return Array.from({ length: 7 }, (e, t) => {
		let i = new Date(2025, 0, 6 + t);
		return {
			short: n.format(i),
			long: r.format(i)
		};
	});
}
function m({ block: e, rowModifier: t, weekdays: n }) {
	return /* @__PURE__ */ o("div", {
		role: "row",
		className: [`${e}__row`, t && `${e}__row--${t}`].filter(Boolean).join(" "),
		children: n.map(({ short: t, long: n }) => /* @__PURE__ */ o("div", {
			role: "columnheader",
			className: `${e}__weekday`,
			"aria-label": n,
			children: /* @__PURE__ */ o("abbr", {
				title: n,
				children: t
			})
		}, n))
	});
}
function h({ block: t, title: n, titleId: r, navigable: i = !0, previousMonthLabel: a, nextMonthLabel: c, prevDisabled: l = !1, nextDisabled: u = !1, onPrev: d, onNext: f, chevronSize: p, children: m }) {
	return /* @__PURE__ */ s("div", {
		className: `${t}__header`,
		children: [
			i && /* @__PURE__ */ o("button", {
				type: "button",
				className: `${t}__nav`,
				"aria-label": a,
				disabled: l,
				onClick: d,
				children: /* @__PURE__ */ o(e, {
					name: "chevron",
					size: p,
					className: `${t}__chevron--prev`
				})
			}),
			/* @__PURE__ */ o("h2", {
				id: r,
				className: `${t}__title`,
				"aria-live": "polite",
				children: n
			}),
			i && /* @__PURE__ */ o("button", {
				type: "button",
				className: `${t}__nav`,
				"aria-label": c,
				disabled: u,
				onClick: f,
				children: /* @__PURE__ */ o(e, {
					name: "chevron",
					size: p
				})
			}),
			m
		]
	});
}
function g(e, t, n) {
	return t && e < t ? t : n && e > n ? n : e;
}
function _(e, t) {
	return new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
}
function v(e, t) {
	let n = new Date(e.getFullYear(), e.getMonth() + t, 1), r = new Date(n.getFullYear(), n.getMonth() + 1, 0).getDate();
	return new Date(n.getFullYear(), n.getMonth(), Math.min(e.getDate(), r));
}
function y(e) {
	return `${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`;
}
function b({ month: e, onMonthChange: o, selected: s, onActivate: u, minDate: d, maxDate: f }) {
	let [p, m] = a(() => s ?? /* @__PURE__ */ new Date()), h = i(/* @__PURE__ */ new Map()), b = i(!1), x = r(() => {
		if (l(p, e)) return p;
		if (s && l(s, e)) return s;
		let t = /* @__PURE__ */ new Date();
		return l(t, e) ? t : new Date(e.getFullYear(), e.getMonth(), 1);
	}, [
		p,
		e,
		s
	]);
	n(() => {
		b.current && (b.current = !1, h.current.get(y(x))?.focus());
	}, [x]);
	let S = t((t) => {
		let n = g(t, d, f);
		b.current = !0, m(n), l(n, e) || o(new Date(n.getFullYear(), n.getMonth(), 1));
	}, [
		f,
		d,
		e,
		o
	]), C = t((e) => {
		let t = x, n = null;
		switch (e.key) {
			case "ArrowLeft":
				n = _(t, -1);
				break;
			case "ArrowRight":
				n = _(t, 1);
				break;
			case "ArrowUp":
				n = _(t, -7);
				break;
			case "ArrowDown":
				n = _(t, 7);
				break;
			case "Home":
				n = _(t, -((t.getDay() + 6) % 7));
				break;
			case "End":
				n = _(t, 6 - (t.getDay() + 6) % 7);
				break;
			case "PageUp":
				n = v(t, e.shiftKey ? -12 : -1);
				break;
			case "PageDown":
				n = v(t, e.shiftKey ? 12 : 1);
				break;
			case "Enter":
			case " ":
				u && (e.preventDefault(), u(t));
				return;
			default: return;
		}
		e.preventDefault(), S(n);
	}, [
		x,
		S,
		u
	]), w = t((e) => (t) => {
		let n = y(e);
		t ? h.current.set(n, t) : h.current.delete(n);
	}, []);
	return {
		activeDate: x,
		isTabbable: t((e) => c(e, x), [x]),
		cellRef: w,
		onKeyDown: C,
		onCellFocus: t((e) => m(e), [])
	};
}
//#endregion
export { l as a, u as c, c as i, b as l, d as n, h as o, p as r, m as s, f as t };
