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
    get "/users/:id", PageControler, :index
    get "/tasks", PageController, :index
    get "/tasks/edit/:id", PageController, :index
    get "/tasks/:id", PageController, :index
  end

  scope "/api/v1", TaskTrackerSPAWeb do
    pipe_through :api

    resources "/sessions", SessionController, only: [:create]
    delete "/sessions", SessionController, :delete

    resources "/users", UserController, except: [:new, :edit]
    post "/newuser", UserController, :create
    resources "/tasks", TaskController, except: [:new, :edit]
  end

  # Other scopes may use custom stacks.
  # scope "/api", TaskTrackerSPAWeb do
  #   pipe_through :api
  # end
end
