# GitHub Actions でリリース作成時の403エラー対処法

## **エラー内容**
GitHub Actions でリリース作成時に以下のエラーが発生：
```
⚠️ GitHub release failed with status: 403
```

## **原因**
`GITHUB_TOKEN` に **リリース作成用の権限 (Write)** が付与されていないことが原因。デフォルトでは **Read-Only 権限** のため、リリース作成時に拒否される。

---

## **解決策**

### **1. GitHub リポジトリの権限設定を確認・変更**

1. **リポジトリの設定を開く**  
   GitHub リポジトリ → `Settings` → `Actions`

2. **アクセス権限を変更する**
   - `Workflow permissions` を **Read and write permissions** に設定。
   - `Allow GitHub Actions to create and approve pull requests` にチェックを入れる。

3. **設定を保存**

### **2. 再実行**
設定変更後、以下を実行してワークフローを再実行：
```bash
# 空コミットを作成してPush
git commit --allow-empty -m "Retry release"
git push
```

---

## **補足: リリース作成用 YAML 設定例**

```yaml
name: Build and Release

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Archive dist folder
        run: zip -r indexof-image-viewer-$(date +'%Y%m%d%H%M%S').zip dist/

      - name: Upload Release Artifact
        uses: softprops/action-gh-release@v1
        with:
          files: indexof-image-viewer-$(date +'%Y%m%d%H%M%S').zip
          tag_name: v1.0.${{ github.run_number }}
          name: indexof-image-viewer Release ${{ github.run_number }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## **まとめ**
1. **権限を `Read and write permissions` に変更する。**
2. 設定変更後、ワークフローを再実行。
3. 上記 YAML 例を参考に構成。

この設定で GitHub Actions からのリリース作成が成功します。

