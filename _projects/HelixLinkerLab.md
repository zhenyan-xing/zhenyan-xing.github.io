---
layout: page
title: "HelixLinkerLab: An Automated Pipeline for Protein Linker Design"
description: "A reusable pipeline for designing de novo helical linkers with structure prediction and inverse folding."
img: assets/img/logicofHelixLinkerLab.png
importance: 3
category: research
related_publications: false
---

HelixLinkerLab is a lab-facing pipeline for de novo helical linker design. The goal is to connect a target protein to MBP, a rigid cryo-EM-friendly fusion partner, while reducing unwanted disorder in the connection region.

The project grew out of my MBP-DELE1 linker-design work. Instead of relying only on manual linker design and mutation trials, the workflow standardizes structure preprocessing, linker generation, sequence design, and structure-based screening.

At a high level, the pipeline identifies flexible or disordered terminal regions, defines a fusion geometry, generates candidate linker backbones, designs sequences, and ranks candidates using structure-prediction confidence and manual inspection.

The implementation is currently private due to institutional regulations, but I hope to share more details publicly when possible.
