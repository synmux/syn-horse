---
path: /blog/prometheus-is-cool-and-good
date: 2025-01-16
title: "prometheus is cool and good"
description: "metrics, dashboards, and the sweet sound of a homelab finally telling on itself."
tags: ["ops"]
read: "12 min"
---

or, **_Monitoring Your Junk In The Age Of Containers_**
or, **_Keeping Your Good Zeus-Fearing Liver Away From Those Pesky Eagles_**

## Welcome to the New World

So you're probably here because you're running a ~~mature and stable~~ old and busted monitoring solution, you've heard all the cool kids talking about their Pokeymans and their Amojis and their shiny new ✨**Cloud Native✨** infra tooling. You're thinking that you spent all that time migrating from virtualisation to containerisation, so you should probably deal with your monitoring tech debt too.

This is a good idea. While you _can_ monitor a containerised estate with a more traditional solution like Nagios or Zabbix, it's a pain, and you'll spend hours writing and refining the configuration manually.

## Enter Prometheus

Unlike Nagios or Zabbix, Prometheus is a distributed system, made up of various independent components with their own binary. It stops short of a full microservice pattern, and you can tell it was designed when we were _on the way_ to microservices.

Each component has its own concerns, and in theory could be replaced with compatible alternatives without the other components needing to worry or even know about it.

The components are written in Go, an accessible systems programming language which produces static binaries with no external library dependencies. This makes them ideal candidates for containerisation.

## The big difference

A traditional monitoring system - again, thinking of examples like Nagios and Zabbix - does all of this in one application. It needs to provide all of the following on the same machine, and generally in the same process:

- a method of configuring what metrics to gather, where the targets are, and when to alert
- a way of gathering those metrics, usually through plugins or scripts
- a TSDB (time-series database) or other log of what happened, and when
- a way of sending alerts, again through plugins or scripts
- a user interface, be it just for observing status (Nagios) or for full-fledged operation (Zabbix)

Prometheus splits these concerns up.

## The Prometheus components

![The Prometheus distributed system. Click to embiggen. Components which are part of Prometheus proper are in red, and have the Prometheus logo at the top right.](Prometheus%20is%20Cool%20and%20Good%20ec212ad2a01e45dd92b9edf6e1ca4aa6/prom.png)

The Prometheus distributed system. Click to embiggen. Components which are part of Prometheus proper are in red, and have the Prometheus logo at the top right.

### Prometheus Server

The core of the system is the Prometheus Server. At heart it's a TSDB which can also pull targets and metrics, push alerts, and accept and respond to queries to the TSDB.

The big difference is that instead of an array of plugins and scripts for checks and alerts, it performs each task **a single, unified way**.

For metric fetches, that means an outbound HTTP request to an endpoint (usually `/metrics`) on one or more **Exporters** or **Push Gateways**.

The important backing storage for the system is attached to the **Prometheus Server** instance, and it is responsible for storing historical data for later query.

The **Prometheus Server** also maintains a list of targets, meaning `/metrics` endpoints. It can get these in a few ways. The most common is calling the Kubernetes API to read labels and annotations on running workloads, but it can also read a file written by a human or a machine, or even (rarely) take them as command-line parameters. This discovery system cuts down on constant human reconfiguration - because the **Prometheus Server** only needs to know where to fetch metrics and has a single method of doing so, automatic discovery of new targets is possible.

### Push Gateway

In some situations, you need something you're monitoring to _push_ metrics to the monitoring system instead of having the monitoring system pull them. An example might be a batch job, where you want to know about job successes and failures.

The **Prometheus Server** only knows how to pull metrics, so the **Push Gateway** exists for situations like this.

Jobs make an HTTP call to the **Push Gateway** when they want to send a metric. For a batch process, that would be events like "job started", maybe milestones throughout the job or details of any branching logic, and "job finished" with success or failure.

The **Push Gateway** then makes these metrics available on its own `/metrics` endpoint for the **Prometheus Server** to pull them.

Use of the **Push Gateway** should be treated as a last resort, and only used in situations where scraping metrics directly is entirely unsuitable.

### Alert Manager

Any good monitoring system needs to be able to send alerts when things go wrong. The **Alert Manager** provides a unified API for the **Prometheus Server** to use to send alerts, and handles getting those alerts sent out over various communication channels. It's also capable of deduplicating, grouping, and selectively routing the alerts.

The configuration for the **Alert Manager** does not include the alert thresholds themselves. They're configured on the **Prometheus Server**, as part of the configuration discovery process.

### Web UI

Prometheus also includes a first-party web UI, allowing PromQL queries to be issued and the results returned. It's extremely basic but it's good enough to check that metrics are coming in properly.

![The Web UI is extremely basic, but does the job in a pinch.](Prometheus%20is%20Cool%20and%20Good%20ec212ad2a01e45dd92b9edf6e1ca4aa6/Untitled.png)

The Web UI is extremely basic, but does the job in a pinch.

Most people replace it with something like **Grafana**, which we'll get to shortly.

## Third-party components

### Exporters

Exporters have one job - collect metrics from the system they're an Exporter for, then serve them over HTTP on the `/metrics` endpoint we mentioned earlier. The MySQL Exporter knows how to collect MySQL metrics and nothing else. Multiple Exporters will commonly run on the same host or in multiple sidecar containers. Each Exporter has a defined port, and a list is maintained to avoid clashes.

The Prometheus project maintains a range of Exporters, and third parties produce many more.

You can check out the port database - and thus get an idea of the breadth of Exporters out there - at [https://github.com/prometheus/prometheus/wiki/Default-port-allocations](https://github.com/prometheus/prometheus/wiki/Default-port-allocations)

Another category of Exporter operates independently and does not interact with anything local. These might be used to pull metrics from a SaaS API, and make them available to Prometheus.

The upshot is that the **Prometheus Server** doesn't have to care about how the metrics were fetched - just where to send HTTP requests.

You can write an **Exporter** in any language, though the official Go client library makes it particularly painless. To see how small one can be, check out the one I wrote at [https://github.com/daveio/aaisp-exporter](https://github.com/daveio/aaisp-exporter) which is fully functional in under 200 lines of Go.

### Grafana

[**Grafana**](https://grafana.com/) is a third-party tool by Grafana Labs. It's a data visualisation platform, which includes first-class support for Prometheus as a data source, among others.

![Grafana makes it easy to build attractive, real-time dashboards using the data from Prometheus.](Prometheus%20is%20Cool%20and%20Good%20ec212ad2a01e45dd92b9edf6e1ca4aa6/Untitled%201.png)

Grafana makes it easy to build attractive, real-time dashboards using the data from Prometheus.

It can be run on-premises for free, or hosted by Grafana Labs. The hosted service includes a free tier with fairly impressive limits for a free tier (10,000 time series, 50GB logs).

It includes its own implementation of alerting, separate from the **Alert Manager**. You can use either or both of them, as they're independent of each other.

Even though it's a third-party tool, many consider it a must-have part of any Prometheus deployment.
