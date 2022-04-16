import { afterEach, expect, test, vi } from 'vitest';
import {
    byAltText,
    byDisplayValue,
    byLabelText,
    byPlaceholderText,
    byRole,
    byTestId,
    byText,
    byTitle,
    screen,
} from './index';
import { enhanceQueries } from './enhanceQueries';

function render(htmlString: string) {
    document.body.innerHTML = htmlString;
}

const invalidSelector = 'noop';

afterEach(() => {
    document.body.innerHTML = '';
});

test('get works with all selectors', () => {
    render(`
        <div>
            ${generateSpan()}
            ${generateInput()}
            ${generateLabel()}
            ${generateImg()}
        </div>
    `);

    const span = document.getElementById('span');
    const input = document.getElementById('input');
    const img = document.getElementById('img');

    expect(screen.get(byRole('searchbox'))).toEqual(input);
    expect(screen.get(byText('TEXT'))).toEqual(span);
    expect(screen.get(byTestId('TEST-ID'))).toEqual(input);
    expect(screen.get(byPlaceholderText('PLACEHOLDER'))).toEqual(input);
    expect(screen.get(byDisplayValue('VALUE'))).toEqual(input);
    expect(screen.get(byTitle('TITLE'))).toEqual(input);
    expect(screen.get(byLabelText('LABEL'))).toEqual(input);
    expect(screen.get(byAltText('ALT'))).toEqual(img);

    expect(() => screen.get(byRole(invalidSelector))).toThrow();
    expect(() => screen.get(byText(invalidSelector))).toThrow();
    expect(() => screen.get(byTestId(invalidSelector))).toThrow();
    expect(() => screen.get(byPlaceholderText(invalidSelector))).toThrow();
    expect(() => screen.get(byDisplayValue(invalidSelector))).toThrow();
    expect(() => screen.get(byTitle(invalidSelector))).toThrow();
    expect(() => screen.get(byLabelText(invalidSelector))).toThrow();
    expect(() => screen.get(byAltText(invalidSelector))).toThrow();
});

test('getAll works with all selectors', () => {
    render(`
        <div>
            ${generateInput('input1')}
            ${generateInput('input2')}
            ${generateLabel('input1')}
            ${generateLabel('input2')}
            ${generateSpan()}
            ${generateSpan()}
            ${generateImg()}
            ${generateImg()}
        </div>
    `);

    const inputs = document.querySelectorAll('input');
    const spans = document.querySelectorAll('span');
    const imgs = document.querySelectorAll('img');

    expect(screen.getAll(byRole('searchbox'))).toEqual(inputs);
    expect(screen.getAll(byText('TEXT'))).toEqual(spans);
    expect(screen.getAll(byTestId('TEST-ID'))).toEqual(inputs);
    expect(screen.getAll(byPlaceholderText('PLACEHOLDER'))).toEqual(inputs);
    expect(screen.getAll(byDisplayValue('VALUE'))).toEqual(inputs);
    expect(screen.getAll(byTitle('TITLE'))).toEqual(inputs);
    expect(screen.getAll(byLabelText('LABEL'))).toEqual(inputs);
    expect(screen.getAll(byAltText('ALT'))).toEqual(imgs);

    expect(() => screen.getAll(byRole(invalidSelector))).toThrow();
    expect(() => screen.getAll(byText(invalidSelector))).toThrow();
    expect(() => screen.getAll(byTestId(invalidSelector))).toThrow();
    expect(() => screen.getAll(byPlaceholderText(invalidSelector))).toThrow();
    expect(() => screen.getAll(byDisplayValue(invalidSelector))).toThrow();
    expect(() => screen.getAll(byTitle(invalidSelector))).toThrow();
    expect(() => screen.getAll(byLabelText(invalidSelector))).toThrow();
    expect(() => screen.getAll(byAltText(invalidSelector))).toThrow();
});

test('query works with all selectors', () => {
    render(`
        <div>
            ${generateSpan()}
            ${generateInput()}
            ${generateLabel()}
            ${generateImg()}
        </div>
    `);

    const span = document.getElementById('span');
    const input = document.getElementById('input');
    const img = document.getElementById('img');

    expect(screen.query(byRole('searchbox'))).toEqual(input);
    expect(screen.query(byText('TEXT'))).toEqual(span);
    expect(screen.query(byTestId('TEST-ID'))).toEqual(input);
    expect(screen.query(byPlaceholderText('PLACEHOLDER'))).toEqual(input);
    expect(screen.query(byDisplayValue('VALUE'))).toEqual(input);
    expect(screen.query(byTitle('TITLE'))).toEqual(input);
    expect(screen.query(byLabelText('LABEL'))).toEqual(input);
    expect(screen.query(byAltText('ALT'))).toEqual(img);

    expect(screen.query(byRole(invalidSelector))).toEqual(null);
    expect(screen.query(byText(invalidSelector))).toEqual(null);
    expect(screen.query(byTestId(invalidSelector))).toEqual(null);
    expect(screen.query(byPlaceholderText(invalidSelector))).toEqual(null);
    expect(screen.query(byDisplayValue(invalidSelector))).toEqual(null);
    expect(screen.query(byTitle(invalidSelector))).toEqual(null);
    expect(screen.query(byLabelText(invalidSelector))).toEqual(null);
    expect(screen.query(byAltText(invalidSelector))).toEqual(null);
});

test('queryAll works with all selectors', () => {
    render(`
        <div>
            ${generateInput('input1')}
            ${generateInput('input2')}
            ${generateLabel('input1')}
            ${generateLabel('input2')}
            ${generateSpan()}
            ${generateSpan()}
            ${generateImg()}
            ${generateImg()}
        </div>
    `);

    const inputs = document.querySelectorAll('input');
    const spans = document.querySelectorAll('span');
    const imgs = document.querySelectorAll('img');

    expect(screen.queryAll(byRole('searchbox'))).toEqual(inputs);
    expect(screen.queryAll(byText('TEXT'))).toEqual(spans);
    expect(screen.queryAll(byTestId('TEST-ID'))).toEqual(inputs);
    expect(screen.queryAll(byPlaceholderText('PLACEHOLDER'))).toEqual(inputs);
    expect(screen.queryAll(byDisplayValue('VALUE'))).toEqual(inputs);
    expect(screen.queryAll(byTitle('TITLE'))).toEqual(inputs);
    expect(screen.queryAll(byLabelText('LABEL'))).toEqual(inputs);
    expect(screen.queryAll(byAltText('ALT'))).toEqual(imgs);

    expect(screen.queryAll(byRole(invalidSelector))).toEqual([]);
    expect(screen.queryAll(byText(invalidSelector))).toEqual([]);
    expect(screen.queryAll(byTestId(invalidSelector))).toEqual([]);
    expect(screen.queryAll(byPlaceholderText(invalidSelector))).toEqual([]);
    expect(screen.queryAll(byDisplayValue(invalidSelector))).toEqual([]);
    expect(screen.queryAll(byTitle(invalidSelector))).toEqual([]);
    expect(screen.queryAll(byLabelText(invalidSelector))).toEqual([]);
    expect(screen.queryAll(byAltText(invalidSelector))).toEqual([]);
});

test('find works with all selectors', async () => {
    render(`
        <div>
            ${generateSpan()}
            ${generateInput()}
            ${generateLabel()}
            ${generateImg()}
        </div>
    `);

    const span = document.getElementById('span');
    const input = document.getElementById('input');
    const img = document.getElementById('img');

    expect(await screen.find(byRole('searchbox'))).toEqual(input);
    expect(await screen.find(byText('TEXT'))).toEqual(span);
    expect(await screen.find(byTestId('TEST-ID'))).toEqual(input);
    expect(await screen.find(byPlaceholderText('PLACEHOLDER'))).toEqual(input);
    expect(await screen.find(byDisplayValue('VALUE'))).toEqual(input);
    expect(await screen.find(byTitle('TITLE'))).toEqual(input);
    expect(await screen.find(byLabelText('LABEL'))).toEqual(input);
    expect(await screen.find(byAltText('ALT'))).toEqual(img);

    expect(screen.find(byRole(invalidSelector))).rejects.toThrow();
    expect(screen.find(byText(invalidSelector))).rejects.toThrow();
    expect(screen.find(byTestId(invalidSelector))).rejects.toThrow();
    expect(screen.find(byPlaceholderText(invalidSelector))).rejects.toThrow();
    expect(screen.find(byDisplayValue(invalidSelector))).rejects.toThrow();
    expect(screen.find(byTitle(invalidSelector))).rejects.toThrow();
    expect(screen.find(byLabelText(invalidSelector))).rejects.toThrow();
    expect(screen.find(byAltText(invalidSelector))).rejects.toThrow();
});

test('findAll works with all selectors', async () => {
    render(`
        <div>
            ${generateInput('input1')}
            ${generateInput('input2')}
            ${generateLabel('input1')}
            ${generateLabel('input2')}
            ${generateSpan()}
            ${generateSpan()}
            ${generateImg()}
            ${generateImg()}
        </div>
    `);

    const inputs = document.querySelectorAll('input');
    const spans = document.querySelectorAll('span');
    const imgs = document.querySelectorAll('img');

    expect(await screen.findAll(byRole('searchbox'))).toEqual(inputs);
    expect(await screen.findAll(byText('TEXT'))).toEqual(spans);
    expect(await screen.findAll(byTestId('TEST-ID'))).toEqual(inputs);
    expect(await screen.findAll(byPlaceholderText('PLACEHOLDER'))).toEqual(
        inputs
    );
    expect(await screen.findAll(byDisplayValue('VALUE'))).toEqual(inputs);
    expect(await screen.findAll(byTitle('TITLE'))).toEqual(inputs);
    expect(await screen.findAll(byLabelText('LABEL'))).toEqual(inputs);
    expect(await screen.findAll(byAltText('ALT'))).toEqual(imgs);

    expect(screen.findAll(byRole(invalidSelector))).rejects.toThrow();
    expect(screen.findAll(byText(invalidSelector))).rejects.toThrow();
    expect(screen.findAll(byTestId(invalidSelector))).rejects.toThrow();
    expect(
        screen.findAll(byPlaceholderText(invalidSelector))
    ).rejects.toThrow();
    expect(screen.findAll(byDisplayValue(invalidSelector))).rejects.toThrow();
    expect(screen.findAll(byTitle(invalidSelector))).rejects.toThrow();
    expect(screen.findAll(byLabelText(invalidSelector))).rejects.toThrow();
    expect(screen.findAll(byAltText(invalidSelector))).rejects.toThrow();
});

test('options are passed and proper functions are called', async () => {
    const mockedScreen = {
        getByRole: vi.fn(),
        queryByRole: vi.fn(),
        getAllByRole: vi.fn(),
        queryAllByRole: vi.fn(),
        findByRole: vi.fn(),
        findAllByRole: vi.fn(),
    };
    // @ts-ignore
    const screen = enhanceQueries(mockedScreen);
    const byRoleSelector = byRole('searchbox', { name: 'LABEL' });
    const expectedParameters = ['searchbox', { name: 'LABEL' }];

    screen.get(byRoleSelector);
    expect(mockedScreen.getByRole).toHaveBeenCalledWith(...expectedParameters);

    screen.getAll(byRoleSelector);
    expect(mockedScreen.getAllByRole).toHaveBeenCalledWith(
        ...expectedParameters
    );

    screen.query(byRoleSelector);
    expect(mockedScreen.queryByRole).toHaveBeenCalledWith(
        ...expectedParameters
    );

    screen.queryAll(byRoleSelector);
    expect(mockedScreen.queryAllByRole).toHaveBeenCalledWith(
        ...expectedParameters
    );

    const waitForOptions = {
        timeout: 5000,
    };

    await screen.find(byRoleSelector, waitForOptions);
    expect(mockedScreen.findByRole).toHaveBeenCalledWith(
        ...expectedParameters,
        waitForOptions
    );

    await screen.findAll(byRoleSelector, waitForOptions);
    expect(mockedScreen.findAllByRole).toHaveBeenCalledWith(
        ...expectedParameters,
        waitForOptions
    );
});

const generateSpan = (id = 'span') => `<span id=${id}>TEXT</span>`;
const generateInput = (id = 'input') =>
    `<input id=${id} data-testid="TEST-ID" placeholder="PLACEHOLDER" value="VALUE" title="TITLE"/>`;
const generateLabel = (htmlFor = 'input') =>
    `<label for=${htmlFor}>LABEL</label>`;
const generateImg = (id = 'img') => `<img id=${id} alt="ALT">`;
