{{/*
Expand the name of the chart.
*/}}
{{- define "velero-agent.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "velero-agent.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "velero-agent.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "velero-agent.labels" -}}
helm.sh/chart: {{ include "velero-agent.chart" . }}
{{ include "velero-agent.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "velero-agent.selectorLabels" -}}
app.kubernetes.io/name: {{ include "velero-agent.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "velero-agent.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "velero-agent.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}


{{/*
Create the name for the passphrase secret.
*/}}
{{- define "velero-agent.passPhraseSecretName" -}}
{{- if .Values.configuration.general.secretPassPhrase.existingSecret -}}
  {{- .Values.configuration.general.secretPassPhrase.existingSecret -}}
{{- else -}}
  {{ default (print (include "velero-agent.fullname" .) "-passphrase") .Values.configuration.general.secretPassPhrase.name }}
{{- end -}}
{{- end -}}

{{/*
Create the name for the admin password secret.
*/}}
{{- define "velero-agent.authPasswordSecretName" -}}
{{- if .Values.configuration.auth.password.existingSecret -}}
  {{- .Values.configuration.auth.password.existingSecret -}}
{{- else -}}
  {{ default (print (include "velero-agent.fullname" .) "-auth") .Values.configuration.auth.password.name }}
{{- end -}}
{{- end -}}

{{/*
Create the name for the configmap.
*/}}
{{- define "velero-agent.configMapName" -}}
{{- if .Values.configuration.policies.existingConfigMap -}}
  {{- .Values.configuration.policies.existingConfigMap -}}
{{- else -}}
  {{ default (include "velero-agent.fullname" .) .Values.configuration.policies.name }}
{{- end -}}
{{- end -}}

