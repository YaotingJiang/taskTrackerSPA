defmodule TaskTrackerSPAWeb.TaskView do
  use TaskTrackerSPAWeb, :view
  alias TaskTrackerSPAWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      desc: task.desc,
      time: task.time,
      completed: task.completed,
      user_id: task.user_id,
      user: render_one(task.user, TaskTrackerSPAWeb.UserView, "user.json")}
  end
end
