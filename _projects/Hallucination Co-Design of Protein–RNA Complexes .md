---
layout: page
title: Hallucination Co-Design of Protein–RNA Complexes 
description: Exploring hallucination and model-inversion strategies for protein–RNA binder design.
img: assets/img/rna-binder-design-cover.png
importance: 2
category: work
giscus_comments: true
---

## Overview

This project explores generative co-design of protein–RNA complexes through a hallucination / model-inversion framework. The central idea is to use pretrained structure predictors as structure-aware scoring functions to guide interface generation and optimization.

This work is being carried out at the Chinese University of Hong Kong under the supervision of Prof. Yu Li.

## What I worked on

I have been prototyping a workflow for protein–RNA binder design inspired by hallucination-based and BindCraft-style optimization strategies. The project focuses on how multimodal structural information can be incorporated into iterative design.

## Methods / Pipeline

The design framework explores confidence- and geometry-based objectives, including:

- structure-confidence signals analogous to pLDDT / PAE
- interface contacts
- steric clashes
- multimodal interface quality constraints

The broader goal is to use these objectives to iteratively optimize candidate protein–RNA interfaces.

## Current status

This project is currently at the prototyping stage. It has helped me think more deeply about how pretrained complex predictors can be repurposed as differentiable or quasi-differentiable scoring modules for molecular design.

## Research significance

This direction is closely aligned with my long-term interests in AI-driven biomolecular design, especially beyond protein-only systems.
