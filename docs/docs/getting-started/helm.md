---
sidebar_position: 1
title: ☸️ Start with Helm Chart
---

## 🚀 Getting Started with Helm Chart

:::tip 🔑 **Credentials**

The default credentials to sign in are:

- **Username:** admin
- **Password:** admin

:::

### 📦 Installing from Registry

1. Add OTWLD repository
    ```bash
    helm repo add otwld https://helm.otwld.com/
    ```

2. Update repository
    ```bash
    helm repo update
    ```

3. (Optional) Create a configuration file to override or extend default values.yaml
   :::info Optional
   You can use the default values.yaml provided in the chart.
   :::

   :::tip Environment Variables
   You can add [environment variables](/getting-started/environment-variables) in the values.yaml
      ```yaml
      env: []
      envFrom: []
      ``` 
   :::

4. Create a namespace
    ```bash
    kubectl create namespace velero-agent
    ```

5. Install the chart
    ```console
    helm install velero-agent otwld/velero-agent --namespace velero-agent
    ```

### 🖥️ Installing from Source

1. Clone the repository
  - Using SSH
      ```bash
      git clone git@github.com:otwld/velero-agent.git
      ```
  - Using HTTPS
     ```bash
      git clone https://github.com/otwld/velero-agent.git
      ```

2. Go to the chart directory
    ```bash
    cd velero-agent/kubernetes/chart
    ```
3. (Optional) Create a configuration file to override or extend default values.yaml
   :::info Optional
   You can use the default values.yaml provided in the chart.
   :::

   :::tip Environment Variables
   You can add [environment variables](/getting-started/environment-variables) in the values.yaml
      ```yaml
      env: []
      envFrom: []
      ``` 
   :::
4. Create a namespace
    ```bash
    kubectl create namespace velero-agent
    ```
5. Install the chart
    ```console
    helm install velero-agent . --namespace velero-agent
    ```

### 🔄 Upgrading

Make adjustments to your values as needed, then run `helm upgrade`:

1. Update repository
    ```bash
    helm repo update
    ```

2. Upgrade
    ```bash
   helm upgrade velero-agent olwld/velero-agent --namespace velero-agent --values values.yaml

### 🗑 Uninstalling

To uninstall/delete the velero-agent deployment in the velero-agent namespace:

```bash
helm delete velero-agent --namespace velero-agent
```

See `helm delete --help for a full reference on delete parameters and flags.
