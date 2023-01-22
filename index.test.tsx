import React from "react";
import { render } from "ink-testing-library";
import { test, expect } from "vitest";
import chalk from "chalk";
import { setTimeout } from "timers/promises";

import TextArea, { renderCursor } from "./src";

const RETURN = "\r";
const ARROW_UP = "\u001B[A";
const ARROW_DOWN = "\u001B[B";
const ARROW_RIGHT = "\u001B[C";
const ARROW_LEFT = "\u001B[D";
const BACKSPACE = "\u007F";

const waitAndAssert = async (lastFrame: () => string | undefined) => {
  await setTimeout(200);
  expect(lastFrame()).toMatchSnapshot();
};

test("TextArea", async () => {
  const { lastFrame } = render(
    <TextArea value={"Hello world"} setValue={() => {}} focus />
  );
  await waitAndAssert(lastFrame);
});

test("TextArea - cursorPosition", async () => {
  const { lastFrame, stdin } = render(
    <TextArea
      value={"Hello world"}
      setValue={() => {}}
      focus
      cursorPosition={3}
    />
  );
  await waitAndAssert(lastFrame);
  console.log(lastFrame());
  stdin.write(ARROW_LEFT);

  await waitAndAssert(lastFrame);
  console.log(lastFrame());
});

test("renderCursor", () => {
  expect(renderCursor("Cursor", 2)).toEqual(`Cu${chalk.inverse("r")}sor`);
  expect(renderCursor("Cursor\nOn a New line", 5)).toEqual(
    `Curso${chalk.inverse("r")}\nOn a New line`
  );
  expect(renderCursor("Cursor\nOn a New line", 6)).toEqual(
    `Cursor${chalk.inverse(" ")}\nOn a New line`
  );
  expect(renderCursor("Cursor\nOn a New line", 7)).toEqual(
    `Cursor\n${chalk.inverse("O")}n a New line`
  );
});

test("renderCursor - 2", () => {
  expect(renderCursor("Cursor\nOn\nthree lines", 9)).toEqual(
    `Cursor\nOn${chalk.inverse(" ")}\nthree lines`
  );
  expect(renderCursor("Cursor\nOn\nthree lines", 10)).toEqual(
    `Cursor\nOn\n${chalk.inverse("t")}hree lines`
  );
});
