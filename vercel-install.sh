npm install
yum install wget
wget https://github.com/madler/zlib/archive/v1.2.11.tar.gz
tar -zxvf v1.2.11.tar.gz
cd zlib-1.2.11
./configure --prefix=/bin/zlib/
make
make install
export LD_LIBRARY_PATH="/bin/zlib/lib":$LD_LIBRARY_PATH
yum install libuuid-devel libmount-devel zlib
cp /lib64/{libuuid,libmount,libblkid,libz}.so.1 node_modules/canvas/build/Release/