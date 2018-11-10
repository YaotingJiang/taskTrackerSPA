#!/bin/bash

export MIX_ENV=prod
export PORT=4750

echo "Stopping old copy of app, if any..."

_build/prod/rel/taskTrackerSPA/bin/taskTrackerSPA stop || true

echo "Starting app..."

# TODO: You want start.

_build/prod/rel/taskTrackerSPA/bin/taskTrackerSPA start

# TODO: Add a cron rule or systemd service file
#       to start your app on system boot.
