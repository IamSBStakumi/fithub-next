# FitHub-Next

## プロジェクト概要

FitHub-Next は、ユーザーの体重管理・運動記録を可視化し、習慣化を促進するためのフィットネスアプリケーションです。
エンジニアにとって親しみやすい GitHub ライクな UI/UX を採用し、開発者がコードを書くように、ユーザーが日々の健康活動を記録・コミット(Commit)していく体験を提供します。

### コンセプト

- "Commit your health": 毎日の体重記録や運動を「コミット」として扱い、GitHub の Contribution Graph のような可視化を行うことで、継続のモチベーションを高めます。
- Developer Experience (DX) for Health: シンプルで高速、キーボード操作に最適化された UI を目指します。

## 技術スタック

技術スタックは以下の通りです。

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI & Styling: React 19, Tailwind CSS v4
- State Management / Data Fetching: TanStack Query (React Query)
- Backend / Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Deployment: AWS EC2

## 機能要件

### 認証機能 (Authentication)

- ログイン/サインアップ: Supabase Auth を利用した認証。
- 保護されたルート: /dashboard, /weight 等のプライベートページへのアクセス制御。

### ダッシュボード (Dashboard)

- Contribution Graph (通称: 草):
  - ユーザーのトップ画面に、過去 1 年間の記録頻度を GitHub の Contribution Graph のように表示。
  - 記録した日には色がつき、継続することで「草を生やす」体験を提供。
- 直近の統計: 現在の体重、前日比、目標までの残り等のサマリー表示。

### 体重記録 (Weight Recording)

- 記録インターフェース: app/(private)/weight
  - 簡単な数値入力フォーム。
  - 体重 (weight) と体脂肪率 (bodyFat) の入力に対応。
  - 素早く入力できることに重点を置いた UI (Command Palette 的な入力も検討)。
- データ保存: API Route (api/weight) を通じて Supabase へ保存。

### ユーザープロファイル (Profile)

- プロフィール表示: ユーザー名、アバター画像の表示。
- 設定: 目標体重の設定など。

### データモデル (Database Schema)

Supabase (PostgreSQL) を利用。

#### profiles テーブル

ユーザー基本情報。auth.users と連携。

| Column Name | Type        | Description                     |
| ----------- | ----------- | ------------------------------- |
| id          | uuid        | PK, FK references auth.users.id |
| username    | text        | 表示名                          |
| avatar_url  | text        | プロフィール画像 URL            |
| goal_weight | float       | 目標体重 (Option)               |
| created_at  | timestamptz | 作成日時                        |

#### weight_logs テーブル

日々の体重記録。

| Column Name | Type        | Description                           |
| ----------- | ----------- | ------------------------------------- |
| id          | uuid        | PK                                    |
| user_id     | uuid        | FK references profiles.id             |
| weight      | float       | 体重 (kg)                             |
| body_fat    | float       | 体脂肪率 (%)                          |
| recorded_at | date        | 記録日 (同日複数回考慮なら timestamp) |
| created_at  | timestamptz | データ作成日時                        |

### UI/UX デザインガイドライン (GitHub-like)

- カラーパレット: GitHub Dark Mode / Light Mode に準拠した配色。
  - Background: #0d1117 (Dark)
  - Border: #30363d
  - Accent: #238636 (Green buttons), #3fb950 (Success text)
- タイポグラフィ: システムフォントスタック (San Francisco, Segoe UI 等) を使用し、可読性を重視。
- コンポーネント:
  - カード型のレイアウト (Bordered Box)。
  - タブ切り替えメニュー。
  - 控えめなアニメーション。
- GitHub のような「Timeline」表示で履歴を見せる。

### ディレクトリ構造 (Current Outline)

```directory architecture
/app
  /(login)      # Login page
  /(private)    # Protected routes
    /dashboard  # Main user dashboard
    /weight     # Weight input page
  /api          # API Routes (Next.js)
/lib/supabase   # Supabase Client setup
/components     # Shared UI components
/features       # Feature-specific logic (Recommended for scalability)
```
