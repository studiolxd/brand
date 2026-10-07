'use client';
import './recurrence-field.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Fieldset as t } from "./fieldset.js";
import { Toggle as n } from "./toggle.js";
import { ToggleGroup as r } from "./toggle-group.js";
import { n as i } from "./_shared/field-labels.js";
import { n as a, t as o } from "./_shared/fieldshell.js";
import { SelectField as s } from "./select-field.js";
import { DatePickerField as c } from "./date-picker-field.js";
import { NumberInputField as l } from "./number-input-field.js";
import { useMemo as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/stories/molecules/RecurrenceField/recurrenceRule.ts
var m = [
	"MO",
	"TU",
	"WE",
	"TH",
	"FR",
	"SA",
	"SU"
], h = {
	frequency: "weekly",
	interval: 1,
	weekdays: [],
	end: { type: "never" }
}, g = {
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
}, _ = [
	"daily",
	"weekly",
	"monthly",
	"yearly"
], v = Date.UTC(2024, 0, 1);
function y({ value: y, onValueChange: b, id: x, legend: S, labelHidden: C, disabled: w, helperText: T, errorMessage: E, size: D, locale: O = "es-ES", weekStartsOn: k = "monday", minDate: A, maxDate: j, today: M, className: N, frequencyLabel: P, weekdaysLabel: F, endLabel: I }) {
	let L = e("recurrenceField", g), R = i(C), z = a({
		id: x,
		errorMessage: E,
		helperText: T
	}), { id: B } = z, V = u(() => {
		let e = new Intl.DateTimeFormat(O, {
			weekday: "short",
			timeZone: "UTC"
		}), t = new Intl.DateTimeFormat(O, {
			weekday: "long",
			timeZone: "UTC"
		}), n = m.map((n, r) => {
			let i = new Date(v + r * 864e5);
			return {
				key: n,
				short: e.format(i),
				long: t.format(i)
			};
		});
		return k === "sunday" ? [n[6], ...n.slice(0, 6)] : n;
	}, [O, k]), H = (e) => {
		y && b({
			...y,
			...e
		});
	}, U = [{
		value: "",
		label: L("never")
	}, ..._.map((e) => ({
		value: e,
		label: L(e)
	}))], W = [
		{
			value: "never",
			label: L("endNever")
		},
		{
			value: "until",
			label: L("endUntil")
		},
		{
			value: "count",
			label: L("endCount")
		}
	], G = /* @__PURE__ */ p(o, {
		field: z,
		block: "recurrence-field",
		className: N,
		rootProps: !S && z.describedBy ? {
			role: "group",
			"aria-describedby": z.describedBy
		} : void 0,
		children: [/* @__PURE__ */ f(s, {
			id: `${B}-frequency`,
			label: L("frequency", P),
			options: U,
			value: y?.frequency ?? "",
			disabled: w,
			size: D,
			onValueChange: (e) => {
				if (!e) return b(null);
				b({
					...y ?? h,
					frequency: e
				});
			}
		}), y ? /* @__PURE__ */ p(d, { children: [
			/* @__PURE__ */ f("div", {
				className: "recurrence-field__row",
				children: /* @__PURE__ */ f(l, {
					id: `${B}-interval`,
					className: "recurrence-field__interval",
					label: L("interval")(y.frequency),
					value: y.interval,
					min: 1,
					max: 99,
					disabled: w,
					size: D,
					onChange: (e) => H({ interval: Number.isFinite(e) ? Math.max(1, e) : 1 })
				})
			}),
			y.frequency === "weekly" ? /* @__PURE__ */ p("div", { children: [/* @__PURE__ */ f("span", {
				className: "recurrence-field__weekdays-label",
				id: `${B}-weekdays-label`,
				children: L("weekdays", F)
			}), /* @__PURE__ */ f(r, {
				className: "recurrence-field__weekdays",
				multiple: !0,
				size: D,
				value: y.weekdays,
				"aria-labelledby": `${B}-weekdays-label`,
				onValueChange: (e) => H({ weekdays: e }),
				children: V.map((e) => /* @__PURE__ */ f(n, {
					value: e.key,
					"aria-label": e.long,
					disabled: w,
					children: e.short
				}, e.key))
			})] }) : null,
			/* @__PURE__ */ p("div", {
				className: "recurrence-field__row",
				children: [
					/* @__PURE__ */ f(s, {
						id: `${B}-end`,
						className: "recurrence-field__end",
						label: L("end", I),
						options: W,
						value: y.end.type,
						disabled: w,
						size: D,
						onValueChange: (e) => {
							if (e === "until") return H({ end: {
								type: "until",
								date: null
							} });
							if (e === "count") return H({ end: {
								type: "count",
								count: 10
							} });
							H({ end: { type: "never" } });
						}
					}),
					y.end.type === "until" ? /* @__PURE__ */ f(c, {
						id: `${B}-until`,
						className: "recurrence-field__end",
						label: L("until"),
						value: y.end.date,
						locale: O,
						minDate: A,
						maxDate: j,
						today: M,
						disabled: w,
						size: D,
						onChange: (e) => H({ end: {
							type: "until",
							date: e
						} })
					}) : null,
					y.end.type === "count" ? /* @__PURE__ */ f(l, {
						id: `${B}-count`,
						className: "recurrence-field__end",
						label: L("count"),
						value: y.end.count,
						min: 1,
						max: 999,
						disabled: w,
						size: D,
						onChange: (e) => H({ end: {
							type: "count",
							count: Number.isFinite(e) ? Math.max(1, e) : 1
						} })
					}) : null
				]
			})
		] }) : null]
	});
	return S ? /* @__PURE__ */ f(t, {
		legend: S,
		legendHidden: R,
		disabled: w,
		"aria-describedby": z.describedBy,
		children: G
	}) : G;
}
//#endregion
export { y as RecurrenceField };
