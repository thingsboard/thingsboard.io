#!/bin/sh
# ThingsBoard CLI installer for macOS and Linux.
#
#   curl -LsSf https://thingsboard.io/cli/install.sh | sh
#
# Installs uv (if it is missing) and ThingsBoard CLI, or upgrades the CLI.
# Then, in an interactive terminal, starts the guided setup (`tb init --guided`).
# Without a terminal (CI, an AI agent), it only installs.
#
# Options: --no-init (or TB_NO_INIT=1) installs without starting the setup.

set -eu

NO_INIT="${TB_NO_INIT:-}"
for arg in "$@"; do
	case "$arg" in
	--no-init) NO_INIT=1 ;;
	*)
		echo "Unknown option: $arg" >&2
		exit 2
		;;
	esac
done

if ! command -v curl >/dev/null 2>&1; then
	echo "This installer needs curl. Install curl and try again." >&2
	exit 1
fi

if ! command -v uv >/dev/null 2>&1; then
	echo "Installing uv (Python package manager)..."
	curl -LsSf https://astral.sh/uv/install.sh | sh
	# The uv installer puts uv in one of these folders; make it usable now.
	PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
	export PATH
	if ! command -v uv >/dev/null 2>&1; then
		echo "uv was installed, but this shell cannot find it. Open a new terminal and run this command again." >&2
		exit 1
	fi
fi

echo "Installing ThingsBoard CLI..."
uv tool install --upgrade --quiet thingsboard-cli
uv tool update-shell >/dev/null 2>&1 || true

TB="$(uv tool dir --bin)/tb"
echo "OK ThingsBoard CLI installed"

if [ -n "$NO_INIT" ]; then
	echo "Run 'tb init' to create a project."
	exit 0
fi

# The script itself is read from a pipe, so the setup reads answers from the terminal.
if [ -t 1 ] && (: </dev/tty) 2>/dev/null; then
	echo
	exec "$TB" init --guided </dev/tty
fi

echo "Run 'tb init' in your project folder to continue."
