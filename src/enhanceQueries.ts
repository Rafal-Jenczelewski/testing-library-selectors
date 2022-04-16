import type { BoundFunctions, waitForOptions } from '@testing-library/dom';
import { queries as dtlQueries } from '@testing-library/dom';
import { QueryDefinitionBase, SupportedFilters } from './selectors';

type DefinitionBase = QueryDefinitionBase<SupportedFilters, unknown, unknown>;

export function enhanceQueries<Q extends BoundFunctions<typeof dtlQueries>>(
    queries: Q
) {
    return {
        ...queries,
        get: (definition: DefinitionBase): HTMLElement => {
            // @ts-ignore
            const result = queries['getBy' + capitalize(definition.filter)](
                definition.matcher,
                definition.options
            );
            return result as HTMLElement;
        },
        getAll: (definition: DefinitionBase): HTMLElement[] => {
            // @ts-ignore
            const result = queries['getAllBy' + capitalize(definition.filter)](
                definition.matcher,
                definition.options
            );
            return result as HTMLElement[];
        },
        find: async (
            definition: DefinitionBase,
            waitForOptions?: waitForOptions
        ): Promise<HTMLElement> => {
            // @ts-ignore
            const result = await queries[
                'findBy' + capitalize(definition.filter)
            ](definition.matcher, definition.options, waitForOptions);
            return result as HTMLElement;
        },
        findAll: async (
            definition: DefinitionBase,
            waitForOptions?: waitForOptions
        ): Promise<HTMLElement[]> => {
            // @ts-ignore
            const result = await queries[
                'findAllBy' + capitalize(definition.filter)
            ](definition.matcher, definition.options, waitForOptions);
            return result as HTMLElement[];
        },
        query: (definition: DefinitionBase): HTMLElement | null => {
            const methodToCall = 'queryBy' + capitalize(definition.filter);
            console.log(methodToCall);
            // @ts-ignore
            const result = queries[methodToCall](
                definition.matcher,
                definition.options
            );
            return result as HTMLElement | null;
        },
        queryAll: (definition: DefinitionBase): HTMLElement[] => {
            // @ts-ignore
            const result = queries[
                'queryAllBy' + capitalize(definition.filter)
            ](definition.matcher, definition.options);
            return result as HTMLElement[];
        },
    };
}

function capitalize(s: string) {
    return s.replace(/^\w/, (c) => c.toUpperCase());
}
