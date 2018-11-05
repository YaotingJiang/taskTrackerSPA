defmodule TaskTrackerSPAWeb.PageController do
  use TaskTrackerSPAWeb, :controller

  def index(conn, _params) do
    tasks = TaskTrackerSPA.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :title, :desc, :time, :completed])))
    render(conn, "index.html", tasks: tasks)
  end
end
