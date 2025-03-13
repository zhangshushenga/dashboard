putGzipCss(){
    echo "putGzipCss\n"
    for file in $1/*
    do
        if test -f $file
        then
          gzip $file
          mv $file.gz $file
          aws s3api put-object --bucket $2 --key $file --body $file --content-type text/css --content-encoding gzip --acl public-read
          echo Uploaded-$file
        fi
    done
}

putGzipJs(){
    echo "putGzipJs\n"

    for file in $1/*
    do
        if test -f $file
        then
          gzip $file
          mv $file.gz $file
          aws s3api put-object --bucket $2 --key $file --body $file --content-type application/javascript --content-encoding gzip --acl public-read
          echo Uploaded-$file
        fi
    done
}

putGzipCss css $1
putGzipJs js $1
