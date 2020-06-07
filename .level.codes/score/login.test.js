jest.mock("isomorphic-unfetch", () =>
  jest.fn(() =>
    Promise.resolve({
      ok: true,
      text() {
        return null;
      },
    })
  )
);

import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Level from "@level.codes/score";
import fetch from "isomorphic-unfetch";
import LoginPage from "../../pages/login";

const score = Level.prepare();

describe("Login Page", () => {
  describe("Logging in", () => {
    it("should allow me to log in", async () => {
      score("Allows logging in.", 100);
      render(<LoginPage />);

      const email = "email@email.com";
      const password = "password";

      fireEvent.change(screen.getByLabelText("✉️ Email"), {
        target: {
          value: email,
        },
      });

      fireEvent.change(screen.getByLabelText("🔑 Password"), {
        target: {
          value: password,
        },
      });

      fireEvent.click(screen.getByText("Log in"));

      await waitFor(() =>
        expect(fetch).toHaveBeenCalledWith(
          "/api/authenticate",
          expect.objectContaining({
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "",
              email,
              password,
              isSignUp: false,
            }),
          })
        )
      );
    });

    it("should handle errors on login", async () => {
      const error = "There was an error";

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          text: () => Promise.resolve(error),
        })
      );

      render(<LoginPage />);

      const email = "email@email.com";
      const password = "password";

      fireEvent.change(screen.getByLabelText("✉️ Email"), {
        target: {
          value: email,
        },
      });

      fireEvent.change(screen.getByLabelText("🔑 Password"), {
        target: {
          value: password,
        },
      });

      fireEvent.click(screen.getByText("Log in"));

      await waitFor(() => expect(() => screen.getByText(error)).not.toThrow());
    });
  });

  describe("Sign up", () => {
    it("should allow me to sign up", async () => {
      render(<LoginPage />);

      const name = "name";
      const email = "email@email.com";
      const password = "password";

      fireEvent.click(screen.getByText("Sign up"));

      await waitFor(() => screen.getByLabelText("👩‍💻 Name"));

      fireEvent.change(screen.getByLabelText("👩‍💻 Name"), {
        target: {
          value: name,
        },
      });

      fireEvent.change(screen.getByLabelText("✉️ Email"), {
        target: {
          value: email,
        },
      });

      fireEvent.change(screen.getByLabelText("🔑 Password"), {
        target: {
          value: password,
        },
      });

      fireEvent.click(screen.getByText("Sign up"));

      await waitFor(() =>
        expect(fetch).toHaveBeenCalledWith(
          "/api/authenticate",
          expect.objectContaining({
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              isSignUp: true,
            }),
          })
        )
      );
    });

    it("should handle errors on sign up", async () => {
      const error = "There was an error";

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          text: () => Promise.resolve(error),
        })
      );

      render(<LoginPage />);

      const name = "name";
      const email = "email@email.com";
      const password = "password";

      fireEvent.click(screen.getByText("Sign up"));

      await waitFor(() => screen.getByLabelText("👩‍💻 Name"));

      fireEvent.change(screen.getByLabelText("👩‍💻 Name"), {
        target: {
          value: name,
        },
      });

      fireEvent.change(screen.getByLabelText("✉️ Email"), {
        target: {
          value: email,
        },
      });

      fireEvent.change(screen.getByLabelText("🔑 Password"), {
        target: {
          value: password,
        },
      });

      fireEvent.click(screen.getByText("Sign up"));

      await waitFor(() => expect(() => screen.getByText(error)).not.toThrow());
    });
  });
});
