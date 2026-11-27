# Media

Web-ready copies of the project captures live in `apps/web/public/media/`. Originals stay in the local media folder and are never edited in place.

All processing was done with ffmpeg. Images: cropped, then WebP at quality 88. Videos: trimmed, scaled to 1280 px wide, 30 fps, audio removed (they play muted), H.264 (OpenH264, ~2.5 Mbps), `+faststart` so playback can begin before the whole file downloads. Each video has a `-poster.webp` (its first frame) to show before it plays.

## VoidAuto

| Output | Source | Edit |
|---|---|---|
| `voidauto/world-graph.webp` | in-game world graph screenshot | crop 1552×1008 from top-left: removes the capture-tools panel |
| `voidauto/combat.webp` | in-game combat screenshot | crop 1550×1007 from top-left: removes the capture-tools panel |
| `voidauto/world-graph-author.webp` | World Graph Author screenshot | crop 1919×910 at y=92: removes the Unity title/menu bars and the status bar (local file path) |
| `voidauto/encounter-author-formation.webp` | Encounter Author, encounters tab | same crop as above |
| `voidauto/encounter-author-rooms.webp` | Encounter Author, rooms tab | same crop as above |
| `voidauto/overview.mp4` | gameplay recording (39 s) | 1.5 s → 38.0 s: cuts the OBS window at both ends |

Not used yet: the Encounter Author screen recording. At web size the editor text is unreadable, so the two Encounter Author screenshots tell that story better.

## VoidFarm

| Output | Source | Edit |
|---|---|---|
| `voidfarm/garden.webp` | mature garden screenshot | crop to the lower 1920×720 (plant rows + card hand) |
| `voidfarm/loop.mp4` | gameplay clip (22 s) | 2.5 s → 21.2 s: cuts the OBS window at both ends |
| `voidfarm/summon-wave.mp4` | summon-wave showcase (33 s) | 1.2 s → 30.6 s: cuts OBS at the start, the window switcher and OBS at the end |

## Fatanis

| Output | Source | Edit |
|---|---|---|
| `fatanis/environment.webp` | screenshot | crop 1600×1080 from x=320: removes the FishingV2 debug overlay |
| `fatanis/traversal.mp4` | raw recording (77 s, 410 MB) | 36 s → 56 s, cropped 1600×900 from x=320 (removes the debug overlay). The darkness section reads as buggy, so it's a backup, not the main clip |
| `fatanis/pressure-plate.mp4` | same raw recording | 0.8 s → 6.35 s (pick up a cube, carry it, set it on a pressure plate), same crop. Starts after OBS, ends before the recording jumps scenes |

## Size

19.6 MB in total, most of it video. Videos will be set to load only when needed, so the first page load doesn't download all of it.

## To improve later

- This machine's ffmpeg is the cut-down copy bundled with Krita (no x264). A full ffmpeg build would give the same quality at a smaller size.
- The VoidAuto captures still show some prototype UI (accepted for v1).
