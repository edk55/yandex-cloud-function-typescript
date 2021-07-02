# Yandex.Cloud function typescript starter

This project is created for people who want to start creating the Yandex.Cloud functions using Typescript.

One of the advantages of creating cloud functions using TypeScript is that you can use new JavaScript features such as Nullish Coalescing Operator, etc.

## Includes

- Typescript
- Jest
- Eslint
- CI/CD using github actions

## How to begin

1. Clone repository
1. Remove `.git` folder: `rm -rf .git`
1. Set remote origin to your github repo
1. Setup secret tokens to deploy function using GitHub Actions

## How to deploy function to the Yandex.Cloud

### 1. Github Actions (the recommended way)

Deployment to the Yandex.Cloud is made using a third-party package: [Goodsmileduck/yandex-serverless-action](https://github.com/Goodsmileduck/yandex-serverless-action).

You can specify additional options for `Goodsmileduck/yandex-serverless-action` here: `./github/workflows/workflow.yml`

To start the automatic process CI / CD, you must specify some _Actions secrets_:

- `YC_TOKEN` - _Required_. Token to use Yandex.Cloud CLI. Copy it from [here](https://oauth.yandex.ru/authorize?response_type=token&client_id=1a6990aa636648e9b2ef855fa7bec2fb)
- `YC_FUNCTION_ID` - _Required_. The identifier of the function you want to deploy. (To begin with, you need to create it manually)
- `YC_SERVICE_ACCOUNT` - _Optional_. If you want to get a service account token in the function context parameter to access the YC API inside the function.

In the case of a successful setup, after _Push_ / _Pull request_ to the `main` branch, it will test the function, build it and deploy to the Yandex.Cloud.

### 2. Manual upload via Yandex.Cloud console

1. Build the function with `npm run build` script
1. Archive the content of the `dist` folder
1. Upload zip archive via Yandex.Cloud console

### 3. Create function via Yandex.Cloud CLI

1. Build the function with `npm run build` script
1. Run Yandex.Cloud CLI command (replace `${YOUR_FUNCTION_ID}` with yout function id):

```
yc serverless function version create \
--runtime nodejs12 \
--entrypoint index.handler \
--memory 128m \
--execution-timeout 3s \
--source-path ./dist \
--function-id ${YOUR_FUNCTION_ID}
```

## Some tips

### Create archive with build

You can run `npm run build:zip` script to build and pack function into zip archive.

### Exclude `devDependencies` from package.json

If you don't want to deploy `package.json` with `devDependecies` (to avoid limits for installing dependencies), then you can use [jq](https://stedolan.github.io/jq/download/) to delete `devDependecies` property from `package.json`:

`cat <<< $(jq 'del(.devDependencies)' package.json) > dist/package.json`

### Usage with yarn

If you are using Yarn, then to prevent CI/CD errors about differences in package versions, you need to update the `.github/workflows/workflow.yaml` to install packages with the `yarn install --frozen-lockfile` instead of `npm ci` command.
