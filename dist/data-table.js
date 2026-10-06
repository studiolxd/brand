'use client';
import './data-table.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Skeleton as n } from "./skeleton.js";
import { Pagination as r } from "./pagination.js";
import { Table as i, TableBody as a, TableCell as o, TableHead as s, TableHeader as c, TableRow as l } from "./table.js";
import { InputField as u } from "./input-field.js";
import { EmptyState as d } from "./empty-state.js";
import { useId as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
import { flexRender as g, getCoreRowModel as _, getFilteredRowModel as v, getPaginationRowModel as y, getSortedRowModel as b, useReactTable as x } from "@tanstack/react-table";
//#region src/stories/organisms/DataTable/DataTable.tsx
function S(e, t) {
	let n = t.columnDef.meta?.align;
	return n && n !== "start" ? `data-table__${e}--${n}` : "";
}
function C({ columns: C, data: w, ariaLabel: T, ariaLabelledBy: E, searchColumnId: D, search: O, searchPlaceholder: k, searchClearLabel: A, toolbar: j, footerActions: M, pageSize: N = 10, emptyMessage: P, emptyDescription: F, isLoading: I, pagination: L, headerLabels: R, paginationLabels: z, className: B }) {
	"use no memo";
	let V = e("dataTable"), [H, U] = p([]), [W, G] = p([]), K = x({
		data: w,
		columns: C,
		state: {
			sorting: H,
			columnFilters: W
		},
		onSortingChange: U,
		onColumnFiltersChange: G,
		getCoreRowModel: _(),
		getSortedRowModel: b(),
		getFilteredRowModel: v(),
		...L ? { manualPagination: !0 } : {
			getPaginationRowModel: y(),
			initialState: { pagination: { pageSize: N } }
		}
	}), q = L?.pageSize ?? N, J = D || O ? V("search", k) : "", Y = `${f()}-search`;
	return /* @__PURE__ */ h("div", {
		className: ["data-table", B].filter(Boolean).join(" "),
		children: [
			(D || O || j) && /* @__PURE__ */ h("div", {
				className: "data-table__toolbar",
				children: [O ? /* @__PURE__ */ m(u, {
					className: "data-table__search",
					id: Y,
					kind: "search",
					clearable: !0,
					label: J,
					labelHidden: !0,
					...A ? { clearLabel: A } : {},
					value: O.value,
					onChange: (e) => O.onChange(e.target.value)
				}) : D && /* @__PURE__ */ m(u, {
					className: "data-table__search",
					id: Y,
					kind: "search",
					clearable: !0,
					label: J,
					labelHidden: !0,
					...A ? { clearLabel: A } : {},
					value: K.getColumn(D)?.getFilterValue() ?? "",
					onChange: (e) => K.getColumn(D)?.setFilterValue(e.target.value)
				}), j && /* @__PURE__ */ m("div", {
					className: "data-table__toolbar-actions",
					children: j
				})]
			}),
			/* @__PURE__ */ m("div", {
				className: "data-table__scroll",
				children: /* @__PURE__ */ h(i, {
					"aria-label": T,
					"aria-labelledby": E,
					"aria-busy": I || void 0,
					children: [/* @__PURE__ */ m(s, { children: K.getHeaderGroups().map((e) => /* @__PURE__ */ m(l, { children: e.headers.map((e) => {
						let n = e.column.getIsSorted(), r = e.column.getCanSort(), i = S("header-cell", e.column), a = e.column.columnDef.meta?.headerHidden === !0, o = e.isPlaceholder ? null : g(e.column.columnDef.header, e.getContext());
						return /* @__PURE__ */ m(c, {
							className: ["data-table__header-cell", i].filter(Boolean).join(" "),
							sortable: r,
							sorted: n === "asc" || n === "desc" ? n : !1,
							onSort: r ? () => e.column.toggleSorting() : void 0,
							sticky: e.column.columnDef.meta?.sticky,
							...R,
							children: a ? /* @__PURE__ */ m(t, { children: o }) : o
						}, e.id);
					}) }, e.id)) }), /* @__PURE__ */ m(a, { children: I ? Array.from({ length: q }).map((e, t) => /* @__PURE__ */ m(l, {
						"aria-hidden": "true",
						children: C.map((e, t) => /* @__PURE__ */ m(o, { children: /* @__PURE__ */ m(n, {}) }, t))
					}, t)) : K.getRowModel().rows.length === 0 ? /* @__PURE__ */ m(l, { children: /* @__PURE__ */ m(o, {
						colSpan: C.length,
						children: /* @__PURE__ */ m(d, {
							size: "sm",
							title: V("empty", P),
							description: F
						})
					}) }) : K.getRowModel().rows.map((e) => /* @__PURE__ */ m(l, {
						selected: e.getIsSelected(),
						children: e.getVisibleCells().map((e) => /* @__PURE__ */ m(o, {
							className: ["data-table__cell", S("cell", e.column)].filter(Boolean).join(" "),
							sticky: e.column.columnDef.meta?.sticky,
							children: g(e.column.columnDef.cell, e.getContext())
						}, e.id))
					}, e.id)) })]
				})
			}),
			/* @__PURE__ */ m("div", {
				className: "data-table__footer",
				children: L ? /* @__PURE__ */ m(r, {
					total: L.total,
					page: L.page,
					pageSize: L.pageSize,
					onPageChange: L.onPageChange,
					onPageSizeChange: L.onPageSizeChange,
					showTotal: !0,
					afterPageSize: M,
					...z
				}) : /* @__PURE__ */ m(r, {
					total: K.getFilteredRowModel().rows.length,
					page: K.getState().pagination.pageIndex + 1,
					pageSize: K.getState().pagination.pageSize,
					onPageChange: (e) => K.setPageIndex(e - 1),
					afterPageSize: M,
					...z
				})
			})
		]
	});
}
//#endregion
export { C as DataTable };
