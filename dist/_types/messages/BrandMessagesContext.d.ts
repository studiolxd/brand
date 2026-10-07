import type { CompleteBrandMessages } from './BrandMessages';
/**
 * El catálogo montado por la aplicación, o `null` si no hay proveedor. Lo
 * pone `BrandMessagesProvider` y lo leen los componentes con
 * `useBrandMessages`.
 */
export declare const BrandMessagesContext: import("react").Context<{
    pagination?: {
        label?: string | undefined;
        pagesGroup?: string | undefined;
        previous?: string | undefined;
        next?: string | undefined;
        goToPage?: ((page: number) => string) | undefined;
        perPage?: string | undefined;
        total?: ((total: number) => string) | undefined;
        allOption?: string | undefined;
    } | undefined;
    table?: {
        actions?: string | undefined;
        sortable?: string | undefined;
        sortedAscending?: string | undefined;
        sortedDescending?: string | undefined;
    } | undefined;
    dataTable?: {
        empty?: string | undefined;
        search?: string | undefined;
    } | undefined;
    inputField?: {
        clear?: string | undefined;
    } | undefined;
    passwordField?: {
        show?: string | undefined;
        hide?: string | undefined;
    } | undefined;
    select?: {
        placeholder?: string | undefined;
    } | undefined;
    multiSelect?: {
        placeholder?: string | undefined;
        remove?: ((label: string) => string) | undefined;
    } | undefined;
    numberInput?: {
        decrement?: string | undefined;
        increment?: string | undefined;
    } | undefined;
    otpInput?: {
        group?: string | undefined;
        digit?: ((index: number, length: number) => string) | undefined;
    } | undefined;
    inputPhone?: {
        country?: string | undefined;
    } | undefined;
    asyncSelect?: {
        placeholder?: string | undefined;
        empty?: string | undefined;
        loading?: string | undefined;
        clear?: string | undefined;
    } | undefined;
    asyncMultiSelect?: {
        placeholder?: string | undefined;
        empty?: string | undefined;
        loading?: string | undefined;
        remove?: ((label: string) => string) | undefined;
    } | undefined;
    docsSearch?: {
        label?: string | undefined;
        placeholder?: string | undefined;
        results?: string | undefined;
        empty?: string | undefined;
        loading?: string | undefined;
    } | undefined;
    searchForm?: {
        label?: string | undefined;
        placeholder?: string | undefined;
        submit?: string | undefined;
    } | undefined;
    siteSearch?: {
        label?: string | undefined;
        placeholder?: string | undefined;
        submit?: string | undefined;
        idle?: string | undefined;
        minLength?: ((min: number) => string) | undefined;
        pending?: string | undefined;
        loading?: string | undefined;
        results?: ((count: number, query: string) => string) | undefined;
        resultsLabel?: string | undefined;
        emptyTitle?: string | undefined;
        emptyDescription?: string | undefined;
        suggestionsLabel?: string | undefined;
        errorTitle?: string | undefined;
        errorDescription?: string | undefined;
        retry?: string | undefined;
    } | undefined;
    filterBar?: {
        label?: string | undefined;
    } | undefined;
    calendar?: {
        previousMonth?: string | undefined;
        nextMonth?: string | undefined;
        previousYears?: string | undefined;
        nextYears?: string | undefined;
        yearGrid?: string | undefined;
    } | undefined;
    datePicker?: {
        openCalendar?: string | undefined;
        invalid?: string | undefined;
        calendar?: string | undefined;
        maskLetters?: {
            day?: string | undefined;
            month?: string | undefined;
            year?: string | undefined;
        } | undefined;
    } | undefined;
    colorPicker?: {
        trigger?: string | undefined;
        value?: ((hex: string) => string) | undefined;
        empty?: string | undefined;
        dialog?: string | undefined;
        area?: string | undefined;
        areaDescription?: string | undefined;
        areaValue?: ((saturation: number, brightness: number) => string) | undefined;
        hue?: string | undefined;
        alpha?: string | undefined;
        hex?: string | undefined;
        presets?: string | undefined;
        clear?: string | undefined;
    } | undefined;
    timeSelect?: {
        hours?: string | undefined;
        minutes?: string | undefined;
        maskHours?: string | undefined;
        maskMinutes?: string | undefined;
    } | undefined;
    fileUpload?: {
        dropzone?: string | undefined;
        dropzoneActive?: string | undefined;
        dropzoneHint?: string | undefined;
        maxSize?: ((maxSize: string) => string) | undefined;
        maxFiles?: ((maxFiles: number) => string) | undefined;
        files?: string | undefined;
        progress?: string | undefined;
        removeFile?: ((fileName: string) => string) | undefined;
        tooLarge?: ((maxSize: string) => string) | undefined;
        invalidType?: string | undefined;
        uploading?: string | undefined;
    } | undefined;
    imageCropDialog?: {
        loading?: string | undefined;
        error?: string | undefined;
    } | undefined;
    avatarUpload?: {
        button?: string | undefined;
        buttonFor?: ((subject: string) => string) | undefined;
        subject?: string | undefined;
        dropHint?: ((subject: string) => string) | undefined;
        dropActive?: ((subject: string) => string) | undefined;
        maxSize?: ((maxSize: string) => string) | undefined;
        invalidType?: ((formats: string) => string) | undefined;
        tooLarge?: ((maxSize: string) => string) | undefined;
        cropCancel?: string | undefined;
        cropConfirm?: string | undefined;
    } | undefined;
    modal?: {
        close?: string | undefined;
        fallbackTitle?: string | undefined;
    } | undefined;
    sheet?: {
        close?: string | undefined;
    } | undefined;
    confirmDialog?: {
        cancel?: string | undefined;
        pending?: string | undefined;
    } | undefined;
    alert?: {
        close?: string | undefined;
    } | undefined;
    banner?: {
        dismiss?: string | undefined;
    } | undefined;
    toaster?: {
        container?: string | undefined;
        close?: string | undefined;
    } | undefined;
    consent?: {
        title?: string | undefined;
        regionLabel?: string | undefined;
        acceptAll?: string | undefined;
        rejectAll?: string | undefined;
        preferences?: string | undefined;
        preferencesTitle?: string | undefined;
        alwaysOn?: string | undefined;
    } | undefined;
    commandPalette?: {
        title?: string | undefined;
        placeholder?: string | undefined;
        empty?: string | undefined;
        list?: string | undefined;
    } | undefined;
    appLauncher?: {
        open?: string | undefined;
        new?: string | undefined;
        title?: string | undefined;
    } | undefined;
    floatingDock?: {
        close?: string | undefined;
        badge?: ((count: number) => string) | undefined;
    } | undefined;
    notificationButton?: {
        label?: string | undefined;
        countLabel?: ((count: number) => string) | undefined;
    } | undefined;
    notificationPanel?: {
        panel?: string | undefined;
        unread?: string | undefined;
        empty?: string | undefined;
        all?: string | undefined;
        preferences?: string | undefined;
        markAllRead?: string | undefined;
    } | undefined;
    menuButton?: {
        open?: string | undefined;
        close?: string | undefined;
    } | undefined;
    appRoot?: {
        skipToContent?: string | undefined;
    } | undefined;
    appShell?: {
        skipToContent?: string | undefined;
    } | undefined;
    appHeader?: {
        logo?: string | undefined;
    } | undefined;
    sidebar?: {
        label?: string | undefined;
        resizer?: string | undefined;
        resizerValue?: ((width: number) => string) | undefined;
    } | undefined;
    sidebarNav?: {
        label?: string | undefined;
        empty?: string | undefined;
        emptyEntry?: ((label: string, empty: string) => string) | undefined;
    } | undefined;
    siteNav?: {
        label?: string | undefined;
    } | undefined;
    siteHeader?: {
        logo?: string | undefined;
    } | undefined;
    userMenu?: {
        trigger?: ((name: string) => string) | undefined;
        unread?: ((count: number) => string) | undefined;
    } | undefined;
    orgSwitcher?: {
        trigger?: ((name: string) => string) | undefined;
    } | undefined;
    breadcrumb?: {
        label?: string | undefined;
    } | undefined;
    tableOfContents?: {
        label?: string | undefined;
    } | undefined;
    prevNextNav?: {
        previous?: string | undefined;
        next?: string | undefined;
    } | undefined;
    publicPageShell?: {
        preferences?: string | undefined;
    } | undefined;
    onboardingShell?: {
        actions?: string | undefined;
    } | undefined;
    copy?: {
        label?: string | undefined;
        copied?: string | undefined;
        error?: string | undefined;
    } | undefined;
    codeBlock?: {
        copy?: string | undefined;
        region?: ((language?: string) => string) | undefined;
    } | undefined;
    dotsButton?: {
        label?: string | undefined;
    } | undefined;
    closeButton?: {
        label?: string | undefined;
    } | undefined;
    themeSwitcher?: {
        group?: string | undefined;
        light?: string | undefined;
        dark?: string | undefined;
        system?: string | undefined;
        trigger?: ((group: string, theme: string) => string) | undefined;
    } | undefined;
    statTile?: {
        up?: string | undefined;
        down?: string | undefined;
        flat?: string | undefined;
    } | undefined;
    progressBar?: {
        label?: string | undefined;
    } | undefined;
    spinner?: {
        label?: string | undefined;
    } | undefined;
    slider?: {
        value?: string | undefined;
        min?: string | undefined;
        max?: string | undefined;
        valueAt?: ((index: number) => string) | undefined;
    } | undefined;
    treeView?: {
        label?: string | undefined;
    } | undefined;
    clockWidget?: {
        title?: string | undefined;
        clockIn?: string | undefined;
        clockOut?: string | undefined;
        pending?: string | undefined;
        elapsed?: string | undefined;
        entries?: string | undefined;
        in?: string | undefined;
        out?: string | undefined;
        duration?: string | undefined;
        running?: string | undefined;
        total?: string | undefined;
        nonWorking?: string | undefined;
        vacation?: string | undefined;
        absence?: string | undefined;
        durationValue?: ((hours: number, minutes: number) => string) | undefined;
    } | undefined;
    heatmap?: {
        label?: string | undefined;
        empty?: string | undefined;
        scale?: string | undefined;
        midpoint?: ((value: string) => string) | undefined;
    } | undefined;
    orgChart?: {
        label?: string | undefined;
        managers?: string | undefined;
        members?: string | undefined;
        noManagers?: string | undefined;
        noMembers?: string | undefined;
        collapse?: ((name: string) => string) | undefined;
        expand?: ((name: string) => string) | undefined;
        zoomIn?: string | undefined;
        zoomOut?: string | undefined;
        zoomReset?: string | undefined;
    } | undefined;
    planningGrid?: {
        label?: string | undefined;
        cellLabel?: ((row: string, column: string) => string) | undefined;
        rowTotal?: string | undefined;
        columnTotal?: string | undefined;
        capacity?: string | undefined;
        remaining?: string | undefined;
        over?: string | undefined;
        saving?: string | undefined;
    } | undefined;
    recurrenceField?: {
        legend?: string | undefined;
        frequency?: string | undefined;
        never?: string | undefined;
        daily?: string | undefined;
        weekly?: string | undefined;
        monthly?: string | undefined;
        yearly?: string | undefined;
        interval?: ((frequency: import("../molecules/RecurrenceField/recurrenceRule").RecurrenceFrequency) => string) | undefined;
        weekdays?: string | undefined;
        end?: string | undefined;
        endNever?: string | undefined;
        endUntil?: string | undefined;
        endCount?: string | undefined;
        until?: string | undefined;
        count?: string | undefined;
    } | undefined;
    field?: {
        optional?: string | undefined;
        required?: string | undefined;
    } | undefined;
    timeline?: {
        label?: string | undefined;
        current?: string | undefined;
    } | undefined;
    uptimeBars?: {
        label?: string | undefined;
        noData?: string | undefined;
    } | undefined;
    chart?: {
        tableCaption?: string | undefined;
        tableHint?: string | undefined;
        category?: string | undefined;
        value?: string | undefined;
        share?: string | undefined;
        empty?: string | undefined;
    } | undefined;
    stepper?: {
        label?: string | undefined;
        compact?: ((current: number, total: number) => string) | undefined;
        completed?: string | undefined;
        current?: string | undefined;
        pending?: string | undefined;
    } | undefined;
    carousel?: {
        label?: string | undefined;
        roleDescription?: string | undefined;
        track?: string | undefined;
        previous?: string | undefined;
        next?: string | undefined;
        indicator?: ((index: number) => string) | undefined;
        pause?: string | undefined;
        play?: string | undefined;
        slideStatus?: ((index: number, total: number) => string) | undefined;
        slideRoleDescription?: string | undefined;
    } | undefined;
    languageSwitcher?: {
        label?: string | undefined;
    } | undefined;
    projectCard?: {
        tags?: string | undefined;
    } | undefined;
    legalFooter?: {
        label?: string | undefined;
    } | undefined;
    calendarRoster?: {
        name?: string | undefined;
        legend?: string | undefined;
        holiday?: string | undefined;
        vacation?: string | undefined;
        absence?: string | undefined;
        recovery?: string | undefined;
        birthday?: string | undefined;
        nonWorking?: string | undefined;
    } | undefined;
    calendarPlanner?: {
        more?: ((count: number) => string) | undefined;
        previousWeek?: string | undefined;
        nextWeek?: string | undefined;
        monthView?: string | undefined;
        weekView?: string | undefined;
        viewSwitcher?: string | undefined;
    } | undefined;
    notificationList?: {
        label?: string | undefined;
        unread?: string | undefined;
        markRead?: string | undefined;
    } | undefined;
    messageComposer?: {
        placeholder?: string | undefined;
        send?: string | undefined;
    } | undefined;
    conversationList?: {
        new?: string | undefined;
        nav?: string | undefined;
        delete?: ((label: string) => string) | undefined;
        empty?: string | undefined;
        error?: string | undefined;
    } | undefined;
    conversationThread?: {
        label?: string | undefined;
    } | undefined;
    typingIndicator?: {
        typing?: ((name: string) => string) | undefined;
    } | undefined;
    annotationThread?: {
        label?: string | undefined;
        open?: string | undefined;
        acknowledged?: string | undefined;
        resolved?: string | undefined;
        edited?: string | undefined;
        replies?: ((count: number) => string) | undefined;
    } | undefined;
    chatShell?: {
        list?: string | undefined;
        listTrigger?: string | undefined;
    } | undefined;
    untrustedText?: {
        expand?: string | undefined;
        collapse?: string | undefined;
        quotes?: [string, string] | undefined;
    } | undefined;
    connectorRequestSummary?: {
        client?: string | undefined;
        product?: string | undefined;
        account?: string | undefined;
        scope?: string | undefined;
        redirect?: string | undefined;
    } | undefined;
    connectorConsent?: {
        title?: string | undefined;
        deny?: string | undefined;
    } | undefined;
    connectorSignIn?: {
        title?: string | undefined;
        signIn?: string | undefined;
        fallbackProduct?: string | undefined;
    } | undefined;
    connectorExternalSignIn?: {
        title?: string | undefined;
        organization?: string | undefined;
        submit?: ((platform: string) => string) | undefined;
    } | undefined;
    connectorRejection?: {
        code?: string | undefined;
    } | undefined;
} | null>;
/**
 * `true` cuando la aplicación declaró con `<BrandMessagesProvider
 * fallback="es">` que el castellano de respaldo es intencionado (D71): el
 * lector sigue cayendo al castellano, pero sin avisar de cada clave que falta.
 */
export declare const BrandMessagesFallbackContext: import("react").Context<boolean>;
/**
 * El espacio **entero** de un componente: el lector siempre devuelve un
 * texto, porque lo que no trae el catálogo sale del castellano de respaldo.
 */
export type BrandMessagesNamespace<K extends keyof CompleteBrandMessages> = CompleteBrandMessages[K];
/**
 * Lee un texto del espacio de un componente: `t('previous')` devuelve el del
 * proveedor (o el castellano de respaldo), y `t('previous', previousLabel)`
 * deja ganar a la prop cuando el consumidor la pasa.
 */
export interface BrandMessagesReader<K extends keyof CompleteBrandMessages> {
    <N extends keyof BrandMessagesNamespace<K>>(key: N, override?: BrandMessagesNamespace<K>[N] | null): BrandMessagesNamespace<K>[N];
}
/**
 * Olvida los avisos ya dados. **Solo para los tests**, que comprueban el aviso
 * de una clave que otro test del mismo proceso ya pudo disparar. No se publica
 * por `@studiolxd/brand/messages`.
 */
export declare function resetMissingMessageWarnings(): void;
/**
 * El lector del espacio de un componente. Se llama **en el punto donde el
 * texto se pinta**, no al principio del render: así un componente que no
 * enseña el selector de tamaño tampoco pide su texto.
 *
 * El orden de resolución de cada texto es **prop → catálogo → castellano**:
 *
 * 1. la prop suelta, si el consumidor la pasa (`t('previous', previousLabel)`);
 * 2. el catálogo montado con `BrandMessagesProvider`;
 * 3. el castellano de respaldo del espacio, que cada componente pasa como
 *    `fallback` (`useBrandMessages('pagination', paginationEs)`). Cada uno
 *    trae solo el suyo, así que el respaldo de un componente que la app no
 *    importa no viaja en su bundle. En desarrollo avisa una vez por clave,
 *    salvo que la app haya montado el proveedor con `fallback="es"` (D71).
 *
 * Sin `fallback` —un uso del lector fuera de la librería— un texto que falte
 * lanza, porque no hay castellano al que caer.
 */
export declare function useBrandMessages<K extends keyof CompleteBrandMessages>(namespace: K, fallback?: BrandMessagesNamespace<K>): BrandMessagesReader<K>;
