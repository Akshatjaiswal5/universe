// @flow

import create from '../create';

it('returns sx function', () => {
  expect(create({ aaa: { color: 'red' } })).toBeInstanceOf(Function);
});

it('returns correct style names', () => {
  const styles = create({
    aaa: {
      color: 'white',
    },
    bbb: {
      color: 'white',
      zIndex: 10,
    },
  });

  expect(styles('aaa')).toMatchInlineSnapshot(`"_20MWPt"`);
  expect(styles('bbb')).toMatchInlineSnapshot(`"_20MWPt _3eC2WW"`);
});

it('supports multiple styles', () => {
  // It's very important to merge the styles properly to solve their precedence (overwriting):
  //
  //  blue: { color: 'blue' },
  //  red: { color: 'red' },
  //   +
  //  <div className={styles('red', 'blue')}>blue</div>
  //  <div className={styles('blue', 'red')}>red</div>

  // Some values for reference:
  expect(create({ red: { color: 'red' }, blue: { color: 'blue' } })('red')).toMatchInlineSnapshot(
    `"wUqnh"`,
  );
  expect(create({ red: { color: 'red' }, blue: { color: 'blue' } })('blue')).toMatchInlineSnapshot(
    `"_4fo5TC"`,
  );

  expect(
    create({
      red: { color: 'red' },
      blue: { color: 'blue' },
    })('red', 'blue'),
  ).toMatchInlineSnapshot(`"_4fo5TC"`); // result should be only BLUE

  expect(
    create({
      red: { color: 'red' },
      blue: { color: 'blue' },
    })('blue', 'red'),
  ).toMatchInlineSnapshot(`"wUqnh"`); // result should be only RED

  // changed order of style definitions:
  expect(
    create({
      blue: { color: 'blue' },
      red: { color: 'red' },
    })('blue', 'red'),
  ).toMatchInlineSnapshot(`"wUqnh"`);

  expect(
    create({
      blue: { color: 'blue' },
      red: { color: 'red' },
    })('red', 'blue'),
  ).toMatchInlineSnapshot(`"_4fo5TC"`);

  // multiple styles:
  expect(
    create({
      red: { color: 'red', zIndex: 1 },
      blue: { color: 'blue' },
    })('red', 'blue'),
  ).toMatchInlineSnapshot(`"_4fo5TC _2FdJlr"`); // blue + zIndex

  expect(
    create({
      red: { color: 'red', zIndex: 1 },
      blue: { color: 'blue' },
    })('blue', 'red'),
  ).toMatchInlineSnapshot(`"wUqnh _2FdJlr"`); // red + zIndex
});

it('supports conditional calls', () => {
  const isDisabled = false;
  const isEnabled = !isDisabled;

  const styles = create({
    button: { color: 'red' }, // wUqnh
    disabled: { color: 'blue' }, // _4fo5TC
  });

  expect(styles('button', 'disabled')).toMatchInlineSnapshot(`"_4fo5TC"`); // disabled wins
  expect(styles('button', isDisabled ? 'disabled' : null)).toMatchInlineSnapshot(`"wUqnh"`);
  expect(styles('button', isDisabled ? 'disabled' : undefined)).toMatchInlineSnapshot(`"wUqnh"`);
  expect(styles('button', isDisabled && 'disabled')).toMatchInlineSnapshot(`"wUqnh"`);
  expect(styles('button', isEnabled && 'disabled')).toMatchInlineSnapshot(`"_4fo5TC"`);
});

it('validates incorrect usage', () => {
  create({
    aaa: {
      // useful to allow (with a warning though) when user wants to temporarily comment out the stylesheet
    },
  });

  expect(() => create({})).toThrowErrorMatchingInlineSnapshot(
    `"Function 'sx.create' cannot be called with empty stylesheet definition."`,
  );

  const styles = create({
    aaa: { color: 'red' },
    bbb: { color: 'blue' },
  });
  expect(() => styles()).toThrowErrorMatchingInlineSnapshot(
    `"SX must be called with at least one stylesheet name."`,
  );
  // $FlowExpectedError[incompatible-call] ccc
  expect(() => styles('bbc')).toThrowErrorMatchingInlineSnapshot(
    `"SX was called with 'bbc' stylesheet name but it doesn't exist. Did you mean 'bbb' instead?"`,
  );
  // $FlowExpectedError[incompatible-call] ccc
  expect(() => styles('ccc')).toThrowErrorMatchingInlineSnapshot(
    `"SX was called with 'ccc' stylesheet name but it doesn't exist. Did you mean 'aaa' instead?"`,
  );
});
