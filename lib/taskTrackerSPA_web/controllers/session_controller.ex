defmodule TaskTrackerSPAWeb.SessionController do
  use TaskTrackerSPAWeb, :controller

  action_fallback TaskTrackerSPAWeb.FallbackController
  alias TaskTrackerSPA.Users
  alias TaskTrackerSPA.Users.User

  def create(conn, %{"email" => email, "password" => password}) do
    with %User{} = user <- TaskTrackerSPA.Users.get_and_auth_user(email, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(TaskTrackerSPAWeb.Endpoint, "user_id", user.id),
          user_id: user.id,
        }
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
end
end
