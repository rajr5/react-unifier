import * as React from "react";
import {create} from "react-test-renderer";
import {fireEvent, render} from "@testing-library/react";
import Tooltip from "./Tooltip";
import Link from "./Link";
import Text from "./Text";

test("Tooltip renders", () => {
  const component = create(
    <Tooltip text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Tooltip renders the link when hovered", () => {
  const {container, getByText} = render(
    <Tooltip
      link={
        <Link href="https://pinterest.com" target="blank">
          <Text color="white" size="sm" weight="bold">
            Learn more about logout
          </Text>
        </Link>
      }
      text="This is a tooltip"
    >
      <div>Hi</div>
    </Tooltip>
  );

  fireEvent.mouseEnter(container.querySelector("[aria-label]"));
  const {body} = document;
  const element = getByText("Learn more about logout");
  expect(body && body.contains(element)).toBeTruthy();
});

test("Tooltip should render as expected when hovered", () => {
  const {container, getByText} = render(
    <Tooltip text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>
  );

  fireEvent.mouseEnter(container.querySelector("[aria-label]"));
  expect(getByText("This is a tooltip")).toBeVisible();
});

test("Tooltip renders with idealDirection", () => {
  const component = create(
    <Tooltip text="This is a tooltip" idealDirection="up">
      <div>Hi</div>
    </Tooltip>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
