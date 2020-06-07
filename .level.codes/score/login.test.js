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
import fetch from "isomorphic-unfetch";
import Level from "@level.codes/score";
import LoginPage from "../../pages/login";

// async function score(name, points) {
//   if (!process.env.GITHUB_ACTIONS) return;

//   const response = await fetch('https://test-level.now.sh/api/score', { method: 'POST', headers: { 'content-type': 'application/json' }, body: { name, points, repo: process.env.GITHUB_REPOSITORY, githubLogin: process.env.GITHUB_ACTOR } });

//   console.log(response.ok, await response.text());
// }

const score = Level.prepare();

describe("Login Page", () => {
  describe("Logging in", () => {
    it("should allow me to log in", async () => {
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

      score("Can log in", 100);

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
