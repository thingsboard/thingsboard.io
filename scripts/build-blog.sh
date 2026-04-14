#!/bin/bash
# Fast blog-only build — empties docs content + sidebar so Starlight has nothing to render
# Usage: pnpm build:blog && pnpm preview

set -e

DOCS_DIR="src/content/docs"
DOCS_BAK="/tmp/tb-docs-backup-$$"
SIDEBAR_FILE="astro.sidebar.ts"
SIDEBAR_BAK="/tmp/tb-sidebar-backup-$$"

echo "Moving docs + sidebar aside for fast build..."
mv "$DOCS_DIR" "$DOCS_BAK"
mkdir -p "$DOCS_DIR"
echo '---
title: placeholder
---
placeholder' > "$DOCS_DIR/index.mdx"

cp "$SIDEBAR_FILE" "$SIDEBAR_BAK"
cat > "$SIDEBAR_FILE" << 'STUB'
export const sidebar = [];
export const sidebarTabLinksByPrefix = [];
export type SidebarTabLinks = Record<string, any>;
STUB

cleanup() {
    echo "Restoring docs + sidebar..."
    rm -rf "$DOCS_DIR"
    mv "$DOCS_BAK" "$DOCS_DIR"
    mv "$SIDEBAR_BAK" "$SIDEBAR_FILE"
}
trap cleanup EXIT

echo "Building (blog + landing pages only)..."
SKIP_OG=true NODE_OPTIONS=--max-old-space-size=6144 pnpm astro build 2>&1

echo "Done! Run 'pnpm preview' to preview."
