---
layout: page
title: De novo Helical Linker Design for MBP–DELE1 Fusion Proteins
description: Designing rigid helical linkers to stabilize flexible DELE1 constructs for cryo-EM using RFdiffusion, ProteinMPNN, and AlphaFold3.
img: assets/img/mbp-dele1-linker-cover.jpg
importance: 1
category: work
related_publications: false
---
## Overview

This project focused on a practical structural-biology problem: obtaining a more stable cryo-EM construct for **DELE1**, whose TPR region is highly flexible and therefore difficult to resolve clearly. To improve structural stability, we explored a fusion-protein strategy in which **maltose-binding protein (MBP)** was used as a rigid and cryo-EM-friendly tag. The central design challenge was to build a **helical linker** that could connect MBP and DELE1 in a structurally coherent way, ideally preserving a continuous alpha-helical geometry rather than introducing an additional flexible junction.

As an undergraduate researcher, I led the **computational design workflow** for this project, while collaborators carried out the downstream wet-lab validation.

## What I worked on

My main contribution was to establish and run the full design pipeline for MBP–DELE1 fusion construction. This included defining the geometric setup for the fusion, generating linker backbones, designing sequences, evaluating candidate structures, and prioritizing designs for experimental testing.

A key part of the project was that the linker was not treated as an arbitrary connecting segment. Instead, the design goal was to produce a **rigid, helix-like connection** between MBP and DELE1. To support this, I first aligned the relevant terminal helical regions so that the designed linker could extend the overall helical direction more naturally before entering the generative design stage.

In addition to the design workflow itself, I also helped make the pipeline more reusable within the lab by preparing internal documentation and giving a protein design training session for group members.

## Methods / Pipeline

The computational pipeline followed a staged **RFdiffusion → ProteinMPNN → AlphaFold3** workflow.

First, I performed a structural preprocessing step in which the helical segments near the intended fusion interface were manually aligned. This step was important because the project required a **single, stable helical connection**, not just a short linker inserted between two domains.

Next, I used **RFdiffusion** to generate candidate backbone solutions for the fusion region. These backbone designs were then passed to **ProteinMPNN** for sequence design. The resulting sequences were subsequently evaluated with **AlphaFold3**, which served as the main structure-confidence filter.

Candidate prioritization combined both automated and manual assessment. I first screened designs using AlphaFold3 confidence metrics, with particular attention to the **pLDDT of the linker region**, while also considering the model's overall confidence score. After narrowing the set computationally, I manually inspected the top candidates for structural plausibility, including side-chain packing and overall interface quality. This produced a shortlist of top designs for experimental follow-up.

## Results / Current Status

The full computational pipeline has been established and successfully run end-to-end. From the final shortlist, **six top candidates** were prioritized, and **three designs** were selected for wet-lab testing as an initial experimental trial.

At the current stage, the project should be viewed as a **computationally completed and experimentally ongoing** effort. The main outcome so far is the successful development of a practical design workflow for cryo-EM-oriented fusion stabilization, together with a set of candidate MBP–DELE1 constructs that are now being evaluated experimentally.

## Research Significance

Although this project was motivated by a specific DELE1 structural question, it also reflects a broader research direction that interests me: using **AI-driven protein design** to solve concrete problems in structural biology and molecular engineering.

Rather than treating generative protein design as an isolated modeling exercise, this work connected backbone generation, sequence design, and structure prediction to an experimentally relevant objective. It also highlighted how biomolecular machine learning methods can be used not only for de novo design in the abstract, but also for improving the tractability of difficult biological targets.

For my broader research development, this project was an important step toward working at the intersection of **computational biology, protein design, and biomolecular machine learning**.

---

## Lab Training and Documentation

As a byproduct of this project, I also organized the workflow into lab-facing training material and documentation for protein design practice. This included an internal tutorial and a Notion-based guide intended to make the pipeline easier to understand and reuse for other design tasks.

[Internal workflow notes / training page](https://cerulean-tune-0ae.notion.site/Protein-Design-Pipline-32493a77b1218088803ff24b3b1e813b#32493a77b121818088f2d13edf892c83)

## Design Iterations and Practical Notes

This project involved multiple rounds of practical iteration, including adjustments to connection geometry, helical alignment, and candidate selection criteria. One recurring challenge was balancing **helical continuity**, **global structural confidence**, and **local side-chain plausibility** at the fusion region.

The current workflow relies mainly on structure generation and prediction-based filtering. A more complete future version could incorporate additional physics-based or dynamics-aware evaluation, such as molecular dynamics screening, to better assess linker rigidity beyond static structure prediction alone.
