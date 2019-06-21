
if [ $USER == "skelly" ]; then
  echo "User $USER running linter"
  yarn run vue-cli-service lint
fi

