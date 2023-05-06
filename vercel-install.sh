npm install
yum install wget
yum install libuuid-devel libmount-devel zlib
wget https://github.com/madler/zlib/archive/v1.2.9.tar.gz
tar -zxvf v1.2.9.tar.gz
cd zlib-1.2.9
./configure --prefix=/bin/zlib/
make
make install
export LD_LIBRARY_PATH="/bin/zlib/lib":$LD_LIBRARY_PATH
cd ../
cp /lib64/{libuuid,libmount,libblkid,libz}.so.1 node_modules/canvas/build/Release/
cd /lib/x86_64-linux-gnu
ln -s -f /usr/local/lib/libz.so.1.2.9/lib libz.so.1