# Brief: los 14 fields «Por revisar» a definitivos (@studiolxd/brand)

Worktree de Orca `/Users/suvi/orca/workspaces/brand/fields-definitivos`, rama `fields-definitivos`, base `main` (v21.1.1). Trabaja SOLO aquí. Responde en español. Lee `CLAUDE.md` y `notes/` del repo antes. NO push, NO tag, NO tocar `version`/`CHANGELOG` (la release la hago yo). No arranques Storybook en 6006 (ocupado); si lo necesitas, otro puerto y ciérralo. No lances sub-agentes ni tareas en background.

## Objetivo
Cerrar la norma «en las apps siempre fields, nunca átomos sueltos»: los 14 fields que siguen en `Por revisar/` del Storybook pasan a definitivos con el MISMO contrato que ya tienen `InputField`, `TextareaField`, `PasswordField` y `CheckboxField` (míralos primero: son la referencia, con sus stories de contrato).

Fields: RadioField, SwitcherField, SelectField, NumberInputField, InputPhoneField, OtpField, FileUploadField, MultiSelectField, AsyncSelectField, AsyncMultiSelectField, DatePickerField, DateTimeField, TimeField, DropdownField (este último ya está en `Molecules/`; solo revisa contrato).
Átomos que llevan: Radio, Switcher, Select, NumberInput, InputPhone, OtpInput, FileUpload, MultiSelect, AsyncSelect, AsyncMultiSelect, TimeSelect (y DatePicker si es átomo/molécula aparte).

## El contrato (por field)
1. `id` (o generado con `useId` si falta), `label` + `labelHidden`, `helperText`, `error` + `errorMessage`: el control se marca en error con `error || !!errorMessage` (ya está hecho en v20.0.1: no lo deshagas), el mensaje va con `role="alert"`, ayuda y error enlazados por `aria-describedby`, `aria-invalid` en el control.
2. `size` por contexto (`useFormSize`, ya está): no lo toques salvo que falte.
3. **react-hook-form**: el field debe funcionar con `<FormField … render={({ field, fieldState }) => <XField {...field} errorMessage={fieldState.error?.message} />}`. Eso exige: `forwardRef` al control real y passthrough de las props nativas (`name`, `onBlur`, `disabled`, `aria-*`, `data-*`, `autoComplete`…) cuando el control es un elemento nativo (NumberInput, InputPhone, OtpInput, FileUpload). Para los controles de Base UI (Select, MultiSelect, Async*, Radio, Switcher, DatePicker/Time) el contrato es `value`/`onValueChange` (o `checked`/`onCheckedChange`) + `name` + `ref` al disparador para que RHF pueda enfocar en error; documenta en el MDX cómo se monta con `Controller`/`FormField` (un ejemplo real, no prosa).
4. `className` al contenedor. Nada de `data-slot`, nada de CSS de producto, BEM puro. Sin tokens con valores crudos.
5. Hereda la talla de texto de la superficie: si un field fija `font-size.2` como «cuerpo», pasa a `{text.font-size}` (regla de v20.0.0, ver Foundations → Tipografía). Los controles conservan su talla por `size`.

## Storybook (verdad absoluta)
- `title` de `Por revisar/Molecules/X` → `Molecules/X`; de `Por revisar/Atoms/Y` → `Atoms/Y` SOLO cuando hayas revisado ese átomo.
- Cada field: una story `Contrato` (`tags: ['!dev']`, con `play`) que compruebe: etiqueta enlazada, `errorMessage` marca el control (clase/atributo de error) y anuncia, `helperText` en `aria-describedby`, y que con `size="lg"` el control mide 48px (o lo que le corresponda). Y una story `ConReactHookForm` que monte el field con `FormProvider`+`FormField` reales y valide que un error del resolver llega al campo (mira `FormField.stories.tsx`/`.test.tsx`).
- MDX de cada uno al día (props, RHF, tokens). Sin stories «superficie oscura»/«móvil» sin `play`.
- No dejes nada a medias: si un átomo necesita un cambio de API para cumplir el contrato, hazlo (rompe si hace falta; lo anotas).

## Verificación
`pnpm build:tokens`, `pnpm lint`, `npx tsc -p tsconfig.lib.json --noEmit`, `pnpm test`, `pnpm test:stories` (≈740 stories, 2–4 min) en verde; `pnpm build:all` al final (dist se commitea).

## Entrega
Commits en español por familia (`feat: SelectField definitivo — …`). Borra este BRIEF al terminar (no lo commitees). Resumen final de 8–12 líneas: qué field/átomo cambió de API (rompe), cuáles quedan con dudas y por qué, y qué debería mirar a ojo en hub.
