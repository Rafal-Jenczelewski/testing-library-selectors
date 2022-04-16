import { screen as dtlScreen } from '@testing-library/dom';
import { enhanceQueries } from './enhanceQueries';

const screen = enhanceQueries(dtlScreen);

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

export { screen };
