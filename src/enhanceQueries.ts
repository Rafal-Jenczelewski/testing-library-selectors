import type { BoundFunctions, waitForOptions } from '@testing-library/dom';
import { QueryDefinitionBase, SupportedFilters } from './selectors';

type DefinitionBase = QueryDefinitionBase<SupportedFilters, unknown, unknown>;

export function enhanceQueries<Q extends BoundFunctions<unknown>>(queries: Q) {
    function createSyncApi<R>(api: string) {
        return (definition: DefinitionBase) => {
            // @ts-ignore
            const result = queries[`${api}By${capitalize(definition.filter)}`](
                definition.matcher,
                definition.options
            );
            return result as R;
        };
    }

    function createAsyncApi<R>(api: string) {
        return (
            definition: DefinitionBase,
            waitForOptions?: waitForOptions
        ) => {
            // @ts-ignore
            const result = queries[`${api}By${capitalize(definition.filter)}`](
                definition.matcher,
                definition.options,
                waitForOptions
            );
            return result as Promise<R>;
        };
    }

    return {
        ...queries,
        get: createSyncApi<HTMLElement>('get'),
        getAll: createSyncApi<HTMLElement[]>('getAll'),
        query: createSyncApi<HTMLElement | null>('query'),
        queryAll: createSyncApi<HTMLElement[]>('queryAll'),
        find: createAsyncApi<HTMLElement>('find'),
        findAll: createAsyncApi<HTMLElement[]>('findAll'),
    };
}

function capitalize(s: string) {
    return s.replace(/^\w/, (c) => c.toUpperCase());
}
