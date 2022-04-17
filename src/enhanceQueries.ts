import type { BoundFunctions, waitForOptions } from '@testing-library/dom';
import { QueryDefinition } from './selectors';
import { within } from '@testing-library/dom';

export function enhanceQueries<Q extends BoundFunctions<unknown>>(queries: Q) {
    const newQueries = {
        ...queries,
        get: createSyncApi<HTMLElement>('get'),
        getAll: createSyncApi<HTMLElement[]>('getAll'),
        query: createSyncApi<HTMLElement | null>('query'),
        queryAll: createSyncApi<HTMLElement[]>('queryAll'),
        find: createAsyncApi<HTMLElement>('find'),
        findAll: createAsyncApi<HTMLElement[]>('findAll'),
    };

    function createSyncApi<R>(api: string) {
        return (definition: QueryDefinition): R => {
            const byQuery = `By${capitalize(definition.filter)}`;

            let query;
            if (definition.options?.insideOf === null) {
                throw new Error('Inside cannot be null');
            } else if (definition.options?.insideOf instanceof HTMLElement) {
                // @ts-ignore
                query = within(definition.options.insideOf)[`${api}${byQuery}`];
            } else if (definition.options?.insideOf?.filter) {
                // @ts-ignore
                query = within(newQueries.get(definition.options.insideOf))[
                    `${api}${byQuery}`
                ];
            } else {
                // @ts-ignore
                query = queries[`${api}${byQuery}`];
            }

            // @ts-ignore
            const result = query(definition.matcher, definition.options);
            return result as R;
        };
    }
    function createAsyncApi<R>(api: string) {
        return async (
            definition: QueryDefinition,
            waitForOptions?: waitForOptions
        ): Promise<R> => {
            const byQuery = `By${capitalize(definition.filter)}`;

            let query;
            if (definition.options?.insideOf === null) {
                throw new Error('Inside cannot be null');
            } else if (definition.options?.insideOf instanceof HTMLElement) {
                // @ts-ignore
                query = within(definition.options.insideOf)[`${api}${byQuery}`];
            } else if (definition.options?.insideOf?.filter) {
                // @ts-ignore
                query = within(
                    await newQueries.find(
                        definition.options.insideOf,
                        waitForOptions
                    )
                )[`${api}${byQuery}`];
            } else {
                // @ts-ignore
                query = queries[`${api}${byQuery}`];
            }

            // @ts-ignore
            const result = query(
                definition.matcher,
                definition.options,
                waitForOptions
            );
            return result as R;
        };
    }

    return newQueries;
}

function capitalize(s: string) {
    return s.replace(/^\w/, (c) => c.toUpperCase());
}
