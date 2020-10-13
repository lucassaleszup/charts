const fs = require('fs');
const teste = `
appName: testinho-2
appEntries:
    - name: teste
      value: teste
      circleId: teste
    - name: teste
      value: teste
      circleId: teste
`

const batata = {
  "apiVersion": "argoproj.io/v1alpha1",
  "kind": "Application",
  "metadata": {
      "name": "traffic-management-teste-5",
      "annotations": {
        "recipients.argocd-notifications.argoproj.io": "webhook:charlescd"
      }
  },
  "spec": {
      "destination": {
          "name": "",
          "namespace": "default",
          "server": "https://kubernetes.default.svc"
      },
      "source": {
          "path": ".",
          "repoURL": "https://github.com/lucassaleszup/charts",
          "targetRevision": "master",
          "helm": {
              "valueFiles": [
                  "values.yaml"
              ],
              "values": "appEntries:\n  - name: version-v4\n    value: v4\n    circleId: v4id\ndefaultVersion:\n    name: version-v5\n    value: v5\n    circleId: v5id\n",
              "parameters": [
                  {
                      "name": "virtualHost",
                      "value": "test.com.br"
                  }
              ]
          }
      },
      "project": "default",
      "syncPolicy": {
          "automated": {
              "prune": true,
              "selfHeal": false
          }
      }
  }
}

batata.spec.source.helm.values = teste

fs.createWriteStream("./teste.json", {encoding: "utf8"})
fs.appendFileSync("./teste.json", JSON.stringify(batata))