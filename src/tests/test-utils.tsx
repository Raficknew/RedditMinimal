import { BrowserRouter } from "react-router";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store/store";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export {
  render as rtlRender,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
export { customRender as render };
