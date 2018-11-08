defmodule TaskTrackerSPAWeb.TaskController do
  use TaskTrackerSPAWeb, :controller

  alias TaskTrackerSPA.Tasks
  alias TaskTrackerSPA.Tasks.Task

  action_fallback TaskTrackerSPAWeb.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)
    result = Tasks.update_task(task, task_params)
    IO.inspect(result)

    with {:ok, %Task{} = task} <- result do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
      conn
      |> put_resp_header("location", Routes.task_path(conn, :index, task))
    end
  end
end
