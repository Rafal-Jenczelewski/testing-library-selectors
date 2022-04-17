import { screen as dtlScreen, within as dtlWithin } from '@testing-library/dom';
import { enhanceQueries } from './enhanceQueries';

const screen = enhanceQueries(dtlScreen);
const within = (element: HTMLElement) => enhanceQueries(dtlWithin(element));

export {
    byAltText,
    byText,
    byRole,
    byLabelText,
    byPlaceholderText,
    byDisplayValue,
    byTestId,
    byTitle,
} from './selectors';

export type {
    SupportedFilters,
    ByRoleSelector,
    SimpleQueryDefinition,
    QueryDefinition,
} from './selectors';

export { screen, within };
