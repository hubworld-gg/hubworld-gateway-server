# https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html#configuration-layers-path
# Need to match the expected path when including a layer containing dependencies
env="dev"

for ARGUMENT in "$@"
do
  KEY=$(echo $ARGUMENT | cut -f1 -d=)
  VALUE=$(echo $ARGUMENT | cut -f2 -d=)   

  case "$KEY" in
    env) env=${VALUE} ;;
  *)   
  esac
done

if [ -z "$env" ]
then
  echo "[API] No environment specified. Exiting..."
  exit 1
else
  echo "[API] Environment is $env"
fi

echo '[API] Making directories...'
mkdir -p src/layer/nodejs
cp package.json src/layer/nodejs/

echo '[API] Installing packages...'
cd src/layer/nodejs
yarn install --prod

echo '[API] Deploying...'
cd ../../../
serverless --stage=$env deploy
