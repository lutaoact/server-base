basePath='/tmp/data'

if [ -d "$basePath" ]; then
  echo "$basePath directory exists";
  exit 0;
fi

echo "sudo mkdir -p $basePath"
sudo mkdir -p $basePath

echo "sudo chown -R $USER $basePath"
sudo chown -R "$USER" $basePath

echo "mkdir -p $basePath/log"
mkdir -p "$basePath/log"
