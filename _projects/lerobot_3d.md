---
title: "LeRobot 3D"
summary: "Easier 3D spatial reasoning for the LeRobot platform."
excerpt: "Multi-camera depth fusion, camera-to-robot calibration and 3D dataset recording for LeRobot SO101 arms."
date: 2026-01-01
repo: "https://github.com/SergioMOrozco/lerobot_3d"
thumbnail: "/images/projects/lerobot_3d_thumbnail.jpg"
tags: [Python, LeRobot, RealSense, point clouds, viser]
---

<img class="media" src="{{ site.baseurl }}/images/projects/lerobot_3d_overview.webp" alt="LeRobot 3D viewer showing fused point clouds of SO101 arms during teleoperation" width="640" height="411" loading="lazy">

LeRobot 3D adds 3D grounding to the [LeRobot](https://github.com/huggingface/lerobot) stack. It calibrates multiple depth cameras against the robot, fuses their views into a single point cloud, and tracks the robot's URDF geometry in the same coordinate frame. The goal is a reusable foundation for 3D-aware robot learning and teleoperation.

## Features

* **Teleop:** drive any number of SO101 leader/follower pairs and Intel RealSense cameras from a single YAML config, no code changes needed.
* **Live 3D viewer:** a browser UI built on [viser](https://viser.studio/) shows the fused scene, the robot point cloud and per-link point clouds as they update.
* **Calibration:** camera extrinsics come from aligning a masked robot point cloud to the URDF mesh, then refining with multi-scale ICP. Intrinsics are saved automatically.
* **Dataset recording:** episodes are saved as a `LeRobotDataset` with RGB, lossless depth, intrinsics, extrinsics and per-link robot points for every frame, ready to push to the Hugging Face Hub.
* **Extensible API:** `TeleopSystemConfig`, `TeleopPointCloudSystem` and `SystemStateViewer` support custom capture scripts.
* **Virtual robots:** with no hardware attached, it can pose several URDF robots on a grid from action input.

## Calibration

<img class="media" src="{{ site.baseurl }}/images/projects/lerobot_3d_calibration.webp" alt="Camera-to-robot calibration: a masked robot point cloud aligned to the URDF mesh" width="640" height="323" loading="lazy">
