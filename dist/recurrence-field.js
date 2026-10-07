'use client';
import './recurrence-field.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Fieldset as t } from "./fieldset.js";
import { Toggle as n } from "./toggle.js";
import { ToggleGroup as r } from "./toggle-group.js";
import { n as i, t as a } from "./_shared/fieldshell.js";
import { SelectField as o } from "./select-field.js";
import { DatePickerField as s } from "./date-picker-field.js";
import { NumberInputField as c } from "./number-input-field.js";
import { useMemo as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/molecules/RecurrenceField/recurrenceRule.ts
var p = [
	"MO",
	"TU",
	"WE",
	"TH",
	"FR",
	"SA",
	"SU"
], m = {
	frequency: "weekly",
	interval: 1,
	weekdays: [],
	end: { type: "never" }
}, h = {
	legend: "Repetición",
	frequency: "Frecuencia",
	never: "No se repite",
	daily: "Cada día",
	weekly: "Cada semana",
	monthly: "Cada mes",
	yearly: "Cada año",
	interval: (e) => ({
		daily: "Cada cuántos días",
		weekly: "Cada cuántas semanas",
		monthly: "Cada cuántos meses",
		yearly: "Cada cuántos años"
	})[e],
	weekdays: "Días de la semana",
	end: "Termina",
	endNever: "Nunca",
	endUntil: "En una fecha",
	endCount: "Tras un número de veces",
	until: "Hasta",
	count: "Número de repeticiones"
}, g = [
	"daily",
	"weekly",
	"monthly",
	"yearly"
], _ = Date.UTC(2024, 0, 1);
function v({ value: v, onValueChange: y, id: b, legend: x, disabled: S, helperText: C, errorMessage: w, size: T, locale: E = "es-ES", weekStartsOn: D = "monday", minDate: O, maxDate: k, today: A, className: j, frequencyLabel: M, weekdaysLabel: N, endLabel: P }) {
	let F = e("recurrenceField", h), I = i({
		id: b,
		errorMessage: w,
		helperText: C
	}), { id: L } = I, R = l(() => {
		let e = new Intl.DateTimeFormat(E, {
			weekday: "short",
			timeZone: "UTC"
		}), t = new Intl.DateTimeFormat(E, {
			weekday: "long",
			timeZone: "UTC"
		}), n = p.map((n, r) => {
			let i = new Date(_ + r * 864e5);
			return {
				key: n,
				short: e.format(i),
				long: t.format(i)
			};
		});
		return D === "sunday" ? [n[6], ...n.slice(0, 6)] : n;
	}, [E, D]), z = (e) => {
		v && y({
			...v,
			...e
		});
	}, B = [{
		value: "",
		label: F("never")
	}, ...g.map((e) => ({
		value: e,
		label: F(e)
	}))], V = [
		{
			value: "never",
			label: F("endNever")
		},
		{
			value: "until",
			label: F("endUntil")
		},
		{
			value: "count",
			label: F("endCount")
		}
	], H = /* @__PURE__ */ f(a, {
		field: I,
		block: "recurrence-field",
		className: j,
		rootProps: !x && I.describedBy ? {
			role: "group",
			"aria-describedby": I.describedBy
		} : void 0,
		children: [/* @__PURE__ */ d(o, {
			id: `${L}-frequency`,
			label: F("frequency", M),
			options: B,
			value: v?.frequency ?? "",
			disabled: S,
			size: T,
			onValueChange: (e) => {
				if (!e) return y(null);
				y({
					...v ?? m,
					frequency: e
				});
			}
		}), v ? /* @__PURE__ */ f(u, { children: [
			/* @__PURE__ */ d("div", {
				className: "recurrence-field__row",
				children: /* @__PURE__ */ d(c, {
					id: `${L}-interval`,
					className: "recurrence-field__interval",
					label: F("interval")(v.frequency),
					value: v.interval,
					min: 1,
					max: 99,
					disabled: S,
					size: T,
					onChange: (e) => z({ interval: Number.isFinite(e) ? Math.max(1, e) : 1 })
				})
			}),
			v.frequency === "weekly" ? /* @__PURE__ */ f("div", { children: [/* @__PURE__ */ d("span", {
				className: "recurrence-field__weekdays-label",
				id: `${L}-weekdays-label`,
				children: F("weekdays", N)
			}), /* @__PURE__ */ d(r, {
				className: "recurrence-field__weekdays",
				multiple: !0,
				size: T,
				value: v.weekdays,
				"aria-labelledby": `${L}-weekdays-label`,
				onValueChange: (e) => z({ weekdays: e }),
				children: R.map((e) => /* @__PURE__ */ d(n, {
					value: e.key,
					"aria-label": e.long,
					disabled: S,
					children: e.short
				}, e.key))
			})] }) : null,
			/* @__PURE__ */ f("div", {
				className: "recurrence-field__row",
				children: [
					/* @__PURE__ */ d(o, {
						id: `${L}-end`,
						className: "recurrence-field__end",
						label: F("end", P),
						options: V,
						value: v.end.type,
						disabled: S,
						size: T,
						onValueChange: (e) => {
							if (e === "until") return z({ end: {
								type: "until",
								date: null
							} });
							if (e === "count") return z({ end: {
								type: "count",
								count: 10
							} });
							z({ end: { type: "never" } });
						}
					}),
					v.end.type === "until" ? /* @__PURE__ */ d(s, {
						id: `${L}-until`,
						className: "recurrence-field__end",
						label: F("until"),
						value: v.end.date,
						locale: E,
						minDate: O,
						maxDate: k,
						today: A,
						disabled: S,
						size: T,
						onChange: (e) => z({ end: {
							type: "until",
							date: e
						} })
					}) : null,
					v.end.type === "count" ? /* @__PURE__ */ d(c, {
						id: `${L}-count`,
						className: "recurrence-field__end",
						label: F("count"),
						value: v.end.count,
						min: 1,
						max: 999,
						disabled: S,
						size: T,
						onChange: (e) => z({ end: {
							type: "count",
							count: Number.isFinite(e) ? Math.max(1, e) : 1
						} })
					}) : null
				]
			})
		] }) : null]
	});
	return x ? /* @__PURE__ */ d(t, {
		legend: x,
		disabled: S,
		"aria-describedby": I.describedBy,
		children: H
	}) : H;
}
//#endregion
export { v as RecurrenceField };
