git push すると、"next dev"を実行して開発サーバーを立ち上げると時折ルートディレクトリ(localhost:xxxx/)だけが 404error になるバグがある。
通常は .next/server/pages/ もしくは .next/static/chunks/pages/ に index.js が生成されるが、このバグが発生するとこの index.js が生成されなくなる。
そのためルートディレクトリが見つからず 404 になるのだろう。

対処法:
pages/index.tsx 　のファイル名を pages/xxx.tsx に変更した。その後"next dev"を実行すると、もちろん localhost:xxxx/ は 404 だが、
localhost:xxxx/xxx はアクセスできる。その後 xxx.tsx を　 index.tsx に戻し、再度"npm run dev"を実行すると　 localhost:xxxx/　が無事表示された。 .next/server/pages/ と .next/static/chunks/pages/ にも index.js が生成されていた。
