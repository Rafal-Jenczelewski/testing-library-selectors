import type {
    ByRoleMatcher,
    ByRoleOptions,
    Matcher,
    SelectorMatcherOptions,
} from '@testing-library/dom';

export type SupportedFilters =
    | 'text'
    | 'role'
    | 'labelText'
    | 'placeholderText'
    | 'altText'
    | 'title'
    | 'displayValue'
    | 'testId';

type InsideOptions = { insideOf?: HTMLElement | QueryDefinition | null };
export type QueryDefinitionBase<
    Filter extends SupportedFilters,
    Matcher,
    Options
> = {
    filter: Filter;
    matcher: Matcher;
    options?: Options & InsideOptions;
};

export type QueryDefinition = QueryDefinitionBase<
    SupportedFilters,
    unknown,
    unknown
>;

export type SimpleQueryDefinition = QueryDefinitionBase<
    SupportedFilters,
    Matcher,
    SelectorMatcherOptions
>;
export type ByRoleSelector = QueryDefinitionBase<
    'role',
    ByRoleMatcher,
    ByRoleOptions
>;

function createSimpleSelector(filter: SupportedFilters) {
    return (
        matcher: Matcher,
        options?: SelectorMatcherOptions & InsideOptions
    ): SimpleQueryDefinition => ({
        filter,
        matcher,
        options,
    });
}

export const byText = createSimpleSelector('text');
export const byPlaceholderText = createSimpleSelector('placeholderText');
export const byAltText = createSimpleSelector('altText');
export const byLabelText = createSimpleSelector('labelText');
export const byTitle = createSimpleSelector('title');
export const byDisplayValue = createSimpleSelector('displayValue');
export const byTestId = createSimpleSelector('testId');
export const byRole = (
    matcher: ByRoleMatcher,
    options?: ByRoleOptions & InsideOptions
): ByRoleSelector => ({
    filter: 'role',
    matcher,
    options,
});
