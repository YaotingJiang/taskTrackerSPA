defmodule TaskTrackerSPAWeb.Router do
  use TaskTrackerSPAWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TaskTrackerSPAWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/tasks", PageController, :index
  end

  scope "/api/v1", TaskTrackerSPAWeb do
    pipe_through :api

    resources "/sessions", SessionController, only: [:create]
    delete "/sessions", SessionController, only: [:delete]

    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    post "/token", TokenController, :create
  end

  # Other scopes may use custom stacks.
  # scope "/api", TaskTrackerSPAWeb do
  #   pipe_through :api
  # end
end
