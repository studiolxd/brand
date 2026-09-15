import type { PaginationMessages } from '../molecules/Pagination/Pagination';
import type { TableMessages } from '../molecules/Table/Table';
import type { DataTableMessages } from '../organisms/DataTable/DataTable';
import type { InputFieldMessages } from '../molecules/InputField/InputField';
import type { PasswordFieldMessages } from '../molecules/PasswordField/PasswordField';
import type { SelectMessages } from '../atoms/Select/Select';
import type { MultiSelectMessages } from '../atoms/MultiSelect/MultiSelect';
import type { NumberInputMessages } from '../atoms/NumberInput/NumberInput';
import type { OtpInputMessages } from '../atoms/OtpInput/OtpInput';
import type { InputPhoneMessages } from '../atoms/InputPhone/InputPhone';
import type { AsyncSelectMessages } from '../atoms/AsyncSelect/AsyncSelect';
import type { AsyncMultiSelectMessages } from '../atoms/AsyncMultiSelect/AsyncMultiSelect';
import type { DocsSearchMessages } from '../molecules/DocsSearch/DocsSearch';
import type { SearchFormMessages } from '../molecules/SearchForm/SearchForm';
import type { FilterBarMessages } from '../molecules/FilterBar/FilterBar';

/**
 * El contrato de textos de la librería: un espacio por componente, y dentro
 * de cada espacio **todas las claves obligatorias**.
 *
 * El tipo nace aquí, en el DS, y es el catálogo de la aplicación el que lo
 * satisface — nunca al revés. Si el tipo se generase desde el JSON de una
 * suite concreta, el DS pasaría a depender de un paquete de producto para
 * declarar su propio contrato y dejaría de sostenerse solo.
 *
 * Anidado por componente, no plano: son 310 textos en 111 componentes, y una
 * lista plana de claves sueltas (`paginationPrevious`, `modalClose`…) no se
 * puede escribir ni revisar. Los espacios calcan además los que el catálogo
 * de la suite ya tiene (`pagination`, `table`, `common`…), así que montar el
 * proveedor es mapear namespaces, no inventarlos.
 *
 * Cada interfaz de espacio vive **junto a su componente** (como
 * `RecoveryCodesLabels`), no aquí: aquí solo se ensamblan. Un componente que
 * gana textos declara su interfaz al lado de sus props y añade una línea a
 * este tipo; a partir de ese momento, una aplicación que no la rellene no
 * compila.
 */
export interface BrandMessages {
  pagination: PaginationMessages;
  table: TableMessages;
  dataTable: DataTableMessages;
  inputField: InputFieldMessages;
  passwordField: PasswordFieldMessages;
  select: SelectMessages;
  multiSelect: MultiSelectMessages;
  numberInput: NumberInputMessages;
  otpInput: OtpInputMessages;
  inputPhone: InputPhoneMessages;
  asyncSelect: AsyncSelectMessages;
  asyncMultiSelect: AsyncMultiSelectMessages;
  docsSearch: DocsSearchMessages;
  searchForm: SearchFormMessages;
  filterBar: FilterBarMessages;
}

export type {
  PaginationMessages,
  TableMessages,
  DataTableMessages,
  InputFieldMessages,
  PasswordFieldMessages,
  SelectMessages,
  MultiSelectMessages,
  NumberInputMessages,
  OtpInputMessages,
  InputPhoneMessages,
  AsyncSelectMessages,
  AsyncMultiSelectMessages,
  DocsSearchMessages,
  SearchFormMessages,
  FilterBarMessages,
};
