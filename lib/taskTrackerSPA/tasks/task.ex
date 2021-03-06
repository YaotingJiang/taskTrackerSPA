defmodule TaskTrackerSPA.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :desc, :string
    field :time, :integer
    field :title, :string
    # field :user_id, :id
    belongs_to :user, TaskTrackerSPA.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :time, :completed, :user_id])
    |> validate_required([:title, :desc, :time, :completed, :user_id])
  end
end
