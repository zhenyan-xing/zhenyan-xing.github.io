---
layout: page
title: "BIRD: Biophysics Informed de novo RNA Binder Design"
description: "Designing RNA sequences for protein targets by optimizing structural confidence, RNA geometry, and interface chemistry."
img: assets/img/bird-8f5g-complex.png
img_alt: "BIRD protein–RNA complex: 8F5G C03, 62.3 ns snapshot"
img_pair: assets/img/bird-mark.png
img_pair_alt: Original bird illustration from the BIRD repository logo
hover_caption: BIRD · RNA binder design
importance: 1
category: research
related_publications: false
---

## Overview

BIRD designs RNA sequences for protein targets using a frozen Protenix structure predictor. It combines continuous sequence optimization with discrete mutation search, guided by objectives for RNA geometry and the chemistry of the protein–RNA interface.

I developed the design workflow at the Chinese University of Hong Kong under the supervision of Prof. Yu Li.

## My contribution

- Developed RNA geometry and interface chemistry objectives and integrated them into sequence optimization.
- Combined continuous optimization with discrete mutation search to refine candidate RNA binders.
- Evaluated BIRD alongside four other methods on 109 shared protein targets using AlphaFold 3, and conducted component ablations and molecular dynamics case studies.

## Evaluation

The matched comparison covers 301 target and design seed combinations. I examined interface confidence alongside recovery of experimentally determined binding poses. BIRD improved several confidence measures relative to some baselines, but these gains did not consistently extend to native pose recovery. This distinction shaped the evaluation and interpretation of the designs.

## Manuscript and code

**BIRD: Biophysics Informed de novo RNA Binder Design**

Zhenyan Xing, Dongchen He, Ziyan Zhuang, Yanruisheng Shao, and Yu Li.

To be submitted to _Bioinformatics_.

[View code](https://anonymous.4open.science/r/BIRD-5D34/)
